import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { probeAudioDuration } from "./probe-audio-duration.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const narrationPathArg = process.argv[2] || "samples/final_narration.md";
const ttsResultPathArg = process.argv[3] || "assets/tts_result.json";
const narrationPath = path.resolve(projectRoot, narrationPathArg);
const ttsResultPath = path.resolve(projectRoot, ttsResultPathArg);
const outputDir = path.join(projectRoot, "AI_VIDEO_COMPONENT_LIBRARY/examples/audio_master");
const captionBeatsPath = path.join(outputDir, "caption_beats.json");
const compiledTimelinePath = path.join(outputDir, "compiled.timeline.json");

function fail(message) {
  console.error("audio master timeline compile failed:");
  console.error(`- ${message}`);
  process.exit(1);
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`${label} not found: ${path.relative(projectRoot, filePath)}`);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function resolveProjectRelative(maybeRelativePath, baseFile) {
  if (!isNonEmptyString(maybeRelativePath)) return null;
  if (path.isAbsolute(maybeRelativePath)) return maybeRelativePath;
  const projectRelative = path.resolve(projectRoot, maybeRelativePath);
  if (fs.existsSync(projectRelative)) return projectRelative;
  if (baseFile) {
    const baseRelative = path.resolve(path.dirname(baseFile), maybeRelativePath);
    if (fs.existsSync(baseRelative)) return baseRelative;
  }
  return projectRelative;
}

function cleanText(text) {
  return String(text)
    .replace(/^---[\s\S]*?---/m, "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line && !/^#+\s*/.test(line))
    .join("")
    .trim();
}

function splitNarration(text) {
  const cleaned = cleanText(text);
  return cleaned
    .split(/[。！？!?；;：:，,、]/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

function charWeight(text) {
  return text.replace(/\s+/g, "").length || 1;
}

function truncateCaption(text, max = 18) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return cleaned.slice(0, max).replace(/[，,。！？!?；;：:、]+$/g, "");
}

function semanticRoleFor(text, index, total) {
  const lower = text.toLowerCase();
  if (index === 0) return "pain_hook";
  if (index === total - 1 || /回复|领取|下载|购买|关键词/.test(text)) return "cta";
  if (/流程|节点|步骤|输入|处理|输出|采集|沉淀|编译|时长|音频|同步/.test(text) || lower.includes("flow")) return "workflow";
  return "explain";
}

function componentFor(role) {
  if (role === "pain_hook") return "BigKineticTitle";
  if (role === "workflow") return "ThreeStepPipeline";
  if (role === "cta") return "CTABigEnding";
  return "TopicCard";
}

function componentPropsFor(component, captionLine, sentence, index) {
  if (component === "BigKineticTitle") {
    return {
      headline: captionLine,
      subline: "先看问题，再看流程",
      label_en: "NARRATION",
      label_cn: "口播入口",
      step: String(index + 1).padStart(2, "0"),
      step_label: "HOOK",
      layout: "impact-left"
    };
  }
  if (component === "ThreeStepPipeline") {
    const steps = sentence
      .split(/[、，,：:]/g)
      .map((part) => part.trim())
      .filter(Boolean)
      .slice(0, 3);
    while (steps.length < 3) steps.push(steps.length === 0 ? captionLine : `步骤${steps.length + 1}`);
    return {
      steps,
      label_en: "AUDIO FLOW",
      label_cn: "音频流程",
      step: String(index + 1).padStart(2, "0"),
      step_label: "FLOW",
      layout: "impact-wide"
    };
  }
  if (component === "CTABigEnding") {
    const keyword = (sentence.match(/回复|领取|下载|购买|关键词|系统/) || ["领取"])[0];
    return {
      keyword,
      result: sentence,
      label_en: "NEXT STEP",
      label_cn: "下一步",
      step: String(index + 1).padStart(2, "0"),
      step_label: "CTA",
      layout: "impact-cta"
    };
  }
  return {
    title: "正确做法",
    body: captionLine,
    label_en: "EXPLAIN",
    label_cn: "解释",
    step: String(index + 1).padStart(2, "0"),
    step_label: "EXPLAIN",
    layout: "right"
  };
}

function buildCaptionBeats(sentences, totalDuration) {
  const weights = sentences.map((sentence) => charWeight(sentence));
  const totalWeight = weights.reduce((sum, value) => sum + value, 0) || 1;
  const beats = [];
  let start = 0;

  sentences.forEach((sentence, index) => {
    const weight = weights[index];
    const rawDuration = totalDuration * (weight / totalWeight);
    const end = index === sentences.length - 1
      ? totalDuration
      : Number((start + rawDuration).toFixed(2));
    const beat = {
      beat_id: `B${String(index + 1).padStart(2, "0")}`,
      start: Number(start.toFixed(2)),
      end: Number(end.toFixed(2)),
      text: sentence,
      caption_line: truncateCaption(sentence, 18),
      semantic_role: semanticRoleFor(sentence, index, sentences.length)
    };
    beats.push(beat);
    start = end;
  });

  if (beats.length > 0) {
    beats[0].start = 0;
    beats[beats.length - 1].end = totalDuration;
  }

  return beats;
}

function buildTimeline(beats, ttsResult, duration) {
  const segments = beats.map((beat, index) => {
    const semanticRole = beat.semantic_role;
    const component = componentFor(semanticRole);
    const snapshotAt = Number((beat.start + ((beat.end - beat.start) / 2)).toFixed(2));
    const captionLine = beat.caption_line;
    return {
      start: beat.start,
      end: beat.end,
      text: beat.text,
      caption_line: captionLine,
      visual_module: component,
      component,
      component_props: componentPropsFor(component, captionLine, beat.text, index),
      layout_slot:
        semanticRole === "pain_hook"
          ? "impact-left"
          : semanticRole === "workflow"
            ? "impact-wide"
            : semanticRole === "cta"
              ? "impact-cta"
              : "right",
      safe_zone: "default",
      animation:
        semanticRole === "pain_hook"
          ? "kinetic_title_in"
          : semanticRole === "workflow"
            ? "node_cascade"
            : semanticRole === "cta"
              ? "cta_focus"
              : "panel_expand",
      emphasis_keyword: captionLine.slice(-8),
      density: semanticRole === "pain_hook" || semanticRole === "cta" ? "high" : "medium",
      semantic_role: semanticRole,
      proof_point: semanticRole === "cta" ? "关键词领取清单" : "音频主时钟对齐",
      cta_type: semanticRole === "cta" ? "comment_keyword" : "none",
      template:
        semanticRole === "pain_hook"
          ? "BIG_TITLE_HOOK"
          : semanticRole === "workflow"
            ? "THREE_STEP_PIPELINE"
            : semanticRole === "cta"
              ? "CTA_BIG_ENDING"
              : "TOPIC_CARD",
      components: ["TopSectionLabel", "StepBadge", component, "BottomChineseSubtitle"],
      primaryText: captionLine,
      subtitleCN: captionLine,
      snapshotAt
    };
  });

  const snapshot_at = segments.map((segment) => segment.snapshotAt);
  return {
    mode: "article_tts",
    width: 1920,
    height: 1080,
    duration,
    media: {
      audio: ttsResult.audio_path,
      video: null
    },
    product_id: "P008",
    recipe: "Audio_Master_Narration_Explainer",
    snapshot_at,
    segments
  };
}

const narrationText = fs.readFileSync(narrationPath, "utf8");
const ttsResult = readJson(ttsResultPath, "tts result");

for (const field of ["source_text_path", "audio_path", "duration", "voice", "provider", "generated_at"]) {
  if (!(field in ttsResult)) {
    fail(`tts result missing required field: ${field}`);
  }
}

const sourceTextPath = resolveProjectRelative(ttsResult.source_text_path, ttsResultPath);
if (!sourceTextPath || !fs.existsSync(sourceTextPath)) {
  fail(`source narration file not found: ${ttsResult.source_text_path}`);
}
if (path.relative(projectRoot, sourceTextPath) !== path.relative(projectRoot, narrationPath)) {
  fail(`source text path mismatch: cli=${path.relative(projectRoot, narrationPath)} tts_result=${ttsResult.source_text_path}`);
}

const audioPath = resolveProjectRelative(ttsResult.audio_path, ttsResultPath);
if (!audioPath || !fs.existsSync(audioPath)) {
  fail(`audio file not found: ${ttsResult.audio_path}`);
}

const probedDuration = probeAudioDuration(audioPath);
const durationDelta = Math.abs(probedDuration - ttsResult.duration);
if (durationDelta > 0.05) {
  fail(`tts duration mismatch: tts_result=${ttsResult.duration} ffprobe=${probedDuration} delta=${durationDelta}`);
}

const sentences = splitNarration(narrationText);
if (sentences.length === 0) {
  fail(`no caption beats could be generated from: ${path.relative(projectRoot, narrationPath)}`);
}

const captionBeats = buildCaptionBeats(sentences, probedDuration);
const timeline = buildTimeline(captionBeats, {
  ...ttsResult,
  audio_path: path.relative(projectRoot, audioPath).split(path.sep).join("/")
}, probedDuration);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(captionBeatsPath, JSON.stringify(captionBeats, null, 2));
fs.writeFileSync(compiledTimelinePath, JSON.stringify(timeline, null, 2));

console.log(`caption beats written: ${path.relative(projectRoot, captionBeatsPath)}`);
console.log(`compiled timeline written: ${path.relative(projectRoot, compiledTimelinePath)}`);
console.log(`duration=${probedDuration}`);
