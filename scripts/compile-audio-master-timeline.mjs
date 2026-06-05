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
const hudCopyRulesPath = path.join(projectRoot, "AI_VIDEO_COMPONENT_LIBRARY/registry/audio-master-hud-copy-rules.json");
const layoutRulesPath = path.join(projectRoot, "AI_VIDEO_COMPONENT_LIBRARY/registry/audio-master-layout-rules.json");

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

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadHudCopyRules() {
  if (!fs.existsSync(hudCopyRulesPath)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(hudCopyRulesPath, "utf8"));
  } catch (error) {
    fail(`hud copy rules are not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const hudCopyRules = loadHudCopyRules();
const defaultLayoutRules = {
  default_overlay_side: "right",
  default_face_position: "center",
  min_hud_segment_seconds: 5,
  recommended_tool_segment_seconds: [8, 14],
  no_switch_within_seconds: 3,
  hud_groups: [
    { key: "hook_problem", startBeatIndex: 0, endBeatIndex: 3 },
    { key: "root_cause", startBeatIndex: 4, endBeatIndex: 7 },
    { key: "workflow", startBeatIndex: 8, endBeatIndex: 13 },
    { key: "tool_stack", startBeatIndex: 14, endBeatIndex: 17 },
    { key: "proof_standard", startBeatIndex: 18, endBeatIndex: 20 },
    { key: "result_next_step", startBeatIndex: 21, endBeatIndex: 25 }
  ]
};

function loadLayoutRules() {
  if (!fs.existsSync(layoutRulesPath)) {
    return clone(defaultLayoutRules);
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(layoutRulesPath, "utf8"));
    return {
      ...clone(defaultLayoutRules),
      ...parsed,
      hud_groups: Array.isArray(parsed.hud_groups) && parsed.hud_groups.length > 0 ? parsed.hud_groups : clone(defaultLayoutRules.hud_groups)
    };
  } catch (error) {
    fail(`layout rules are not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const layoutRules = loadLayoutRules();

function semanticRoleFor(text, index, total) {
  if (index === 0) return "pain_hook";
  if (index === total - 1 || /回复|领取|下载|购买|关键词/.test(text)) return "cta";
  if (/一条可以发的口播视频|可发布口播视频|发布的口播视频|成片|结果/.test(text)) return "result";
  if (/30\s*分钟|判断标准|检查清单|能不能|检查/.test(text)) return "proof";
  if (/Hermes|Obsidian|llm-wiki|Codex|HyperFrames/.test(text) || /工具链/.test(text)) return "tool_stack";
  if (/输入|处理|输出|流程|节点|步骤|采集|沉淀|编译|包装|闭环/.test(text)) return "workflow";
  if (/不是你不努力|一直在学看起来很有用的东西|每天收藏教程|时间被消耗|结果没有沉淀/.test(text)) return "wrong_path";
  if (/真正的问题|没有真正提高效率|缺的不是工具|不在工具|流程模板|真正的问题/.test(text)) return "problem";
  return "problem";
}

function buildRoleCopy(role, index, sentence) {
  const rule = hudCopyRules[role] || hudCopyRules.problem || hudCopyRules.wrong_path;
  if (!rule) {
    fail(`missing HUD copy rule for role: ${role}`);
  }
  const merged = clone(rule);
  const step = String(index + 1).padStart(2, "0");
  const componentProps = Object.assign({}, merged.component_props || {}, { step });

  if (merged.component === "BigKineticTitle") {
    componentProps.headline = merged.component_props?.headline || merged.primaryText || sentence;
    componentProps.subline = merged.component_props?.subline || merged.subtitleCN || sentence;
  }

  if (merged.component === "ProblemAlert") {
    componentProps.problem = merged.component_props?.problem || merged.primaryText || sentence;
    componentProps.loss = merged.component_props?.loss || merged.subtitleCN || sentence;
  }

  if (merged.component === "DetailsTableOverlay") {
    componentProps.title = merged.component_props?.title || merged.primaryText || sentence;
    componentProps.rows = merged.component_props?.rows || [[merged.primaryText || sentence, merged.subtitleCN || sentence]];
  }

  if (merged.component === "TopicCard") {
    componentProps.title = merged.component_props?.title || merged.primaryText || sentence;
    componentProps.body = merged.component_props?.body || merged.subtitleCN || sentence;
  }

  if (merged.component === "CTABigEnding") {
    componentProps.keyword = merged.component_props?.keyword || merged.primaryText || sentence;
    componentProps.result = merged.component_props?.result || merged.subtitleCN || sentence;
    if (merged.component_props?.button) componentProps.button = merged.component_props.button;
  }

  if (merged.component === "KPIWidget") {
    componentProps.value = merged.component_props?.value || "45s";
    componentProps.label = merged.component_props?.label || merged.primaryText || sentence;
    componentProps.unit = merged.component_props?.unit || merged.subtitleCN || "真实音频驱动";
  }

  return {
    ...merged,
    component_props: componentProps,
    step,
    sentence
  };
}

function beatMidpoint(beat) {
  return (beat.start + beat.end) / 2;
}

function hudGroupForBeat(beat) {
  const midpoint = beatMidpoint(beat);
  const groups = layoutRules.hud_groups || [];
  const group = groups.find((item) => midpoint >= item.startTime && midpoint < item.endTime) || groups[groups.length - 1];
  return group?.key || "result_next_step";
}

function componentForGroup(groupKey) {
  return (hudCopyRules[groupKey] && hudCopyRules[groupKey].component)
    || (hudCopyRules.result_next_step && hudCopyRules.result_next_step.component)
    || (hudCopyRules.problem && hudCopyRules.problem.component)
    || "TopicCard";
}

function buildGroupCopy(groupKey, index, sentence) {
  const rule = hudCopyRules[groupKey] || hudCopyRules.result_next_step || hudCopyRules.problem || hudCopyRules.wrong_path;
  if (!rule) {
    fail(`missing HUD copy rule for group: ${groupKey}`);
  }
  const merged = clone(rule);
  const step = String(index + 1).padStart(2, "0");
  const componentProps = Object.assign({}, merged.component_props || {}, { step });

  if (merged.component === "BigKineticTitle") {
    componentProps.headline = merged.component_props?.headline || merged.primaryText || sentence;
    componentProps.subline = merged.component_props?.subline || merged.subtitleCN || sentence;
  }

  if (merged.component === "ProblemAlert") {
    componentProps.problem = merged.component_props?.problem || merged.primaryText || sentence;
    componentProps.loss = merged.component_props?.loss || merged.subtitleCN || sentence;
  }

  if (merged.component === "DetailsTableOverlay") {
    componentProps.title = merged.component_props?.title || merged.primaryText || sentence;
    componentProps.rows = merged.component_props?.rows || [[merged.primaryText || sentence, merged.subtitleCN || sentence]];
  }

  if (merged.component === "TopicCard") {
    componentProps.title = merged.component_props?.title || merged.primaryText || sentence;
    componentProps.body = merged.component_props?.body || merged.subtitleCN || sentence;
  }

  if (merged.component === "CTABigEnding") {
    componentProps.keyword = merged.component_props?.keyword || merged.primaryText || sentence;
    componentProps.result = merged.component_props?.result || merged.subtitleCN || sentence;
    if (merged.component_props?.button) componentProps.button = merged.component_props.button;
  }

  if (merged.component === "KPIWidget") {
    componentProps.value = merged.component_props?.value || "45s";
    componentProps.label = merged.component_props?.label || merged.primaryText || sentence;
    componentProps.unit = merged.component_props?.unit || merged.subtitleCN || "真实音频驱动";
  }

  if (merged.component === "MultiAgentPanel") {
    componentProps.title = merged.component_props?.title || merged.primaryText || sentence;
    componentProps.agents = merged.component_props?.agents || [["Hermes", "采集素材"], ["Obsidian", "沉淀资料"], ["llm-wiki", "检索编译"], ["HyperFrames", "包装视频"]];
  }

  return {
    ...merged,
    component_props: componentProps,
    step,
    sentence
  };
}

function buildHudSegments(beats, duration) {
  const groups = [];
  const groupConfigs = layoutRules.hud_groups || [];

  beats.forEach((beat, index) => {
    const groupKey = hudGroupForBeat(beat);
    const captionItem = {
      beat_id: beat.beat_id,
      start: beat.start,
      end: beat.end,
      text: beat.text,
      caption_line: beat.caption_line,
      semantic_role: beat.semantic_role
    };
    const targetGroup = groupConfigs.find((item) => item.key === groupKey) || groupConfigs[groupConfigs.length - 1] || { key: groupKey };
    let currentGroup = groups.find((item) => item.groupKey === groupKey);
    if (!currentGroup) {
      currentGroup = {
        groupKey,
        start: typeof targetGroup.startTime === "number" ? targetGroup.startTime : beat.start,
        end: typeof targetGroup.endTime === "number" ? targetGroup.endTime : beat.end,
        captionItems: []
      };
      groups.push(currentGroup);
    }
    currentGroup.captionItems.push(captionItem);
  });

  const overlaySide = layoutRules.default_overlay_side || "right";
  const facePosition = layoutRules.default_face_position || "center";

  return groups.map((group, index) => {
    const start = typeof group.start === "number" ? group.start : group.captionItems[0].start;
    const end = typeof group.end === "number" ? group.end : group.captionItems[group.captionItems.length - 1].end;
    const durationSeconds = end - start;
    if (durationSeconds < (layoutRules.min_hud_segment_seconds || 5)) {
      fail(`hud segment ${group.groupKey} is too short: ${durationSeconds.toFixed(2)}s`);
    }
    const hudCopy = buildGroupCopy(group.groupKey, index, group.captionItems.map((item) => item.text).join(" / "));
    const component = componentForGroup(group.groupKey);
    const snapshotAt = Number((start + (durationSeconds / 2)).toFixed(3));
    const firstCaption = group.captionItems[0]?.caption_line || group.captionItems[0]?.text || "";
    return {
      start: Number(start.toFixed(3)),
      end: Number(end.toFixed(3)),
      text: group.captionItems.map((item) => item.text).join(" / "),
      caption_line: firstCaption,
      caption_items: group.captionItems,
      captions: group.captionItems.map((item) => item.caption_line),
      visual_module: component,
      component,
      component_props: {
        ...hudCopy.component_props,
        layout: overlaySide,
        overlay_side: overlaySide,
        face_position: facePosition
      },
      layout_slot: overlaySide === "right" ? "right" : overlaySide,
      overlay_side: overlaySide,
      safe_zone: overlaySide === "right" ? "default" : overlaySide,
      animation: hudCopy.animation || "panel_expand",
      emphasis_keyword: hudCopy.primaryText || firstCaption.slice(-8),
      density: hudCopy.density || "medium",
      semantic_role: group.groupKey,
      semantic_group: group.groupKey,
      proof_point: hudCopy.proof_point || "先看问题，再看流程",
      cta_type: hudCopy.cta_type || "none",
      template: hudCopy.template || "TOPIC_CARD",
      components: ["TopSectionLabel", "StepBadge", component, "BottomChineseSubtitle"],
      primaryText: hudCopy.primaryText,
      subtitleCN: hudCopy.subtitleCN,
      hud_theme: group.groupKey,
      caption_count: group.captionItems.length,
      snapshotAt
    };
  });
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
      semantic_role: semanticRoleFor(sentence, index, sentences.length),
      hud_group: hudGroupForBeat(index)
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
  const segments = buildHudSegments(beats, duration);
  const snapshot_at = segments.map((segment) => segment.snapshotAt);
  return {
    mode: "article_tts",
    width: 1920,
    height: 1080,
    duration,
    overlay_side: layoutRules.default_overlay_side || "right",
    layout_policy: {
      mode: "tts_only",
      overlay_side: layoutRules.default_overlay_side || "right",
      face_position: layoutRules.default_face_position || "center"
    },
    media: {
      audio: ttsResult.audio_path,
      video: null
    },
    product_id: "P008",
    recipe: "Audio_Master_Narration_Explainer",
    caption_beats: beats,
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
