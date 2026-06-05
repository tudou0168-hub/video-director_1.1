import fs from "node:fs";

const file = process.argv[2] || "timeline.json";
const timeline = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

if (!["article_tts", "talking_head_overlay"].includes(timeline.mode)) {
  errors.push("mode must be article_tts or talking_head_overlay");
}

if (!isNumber(timeline.duration) || timeline.duration <= 0) {
  errors.push("duration must be a positive number");
}

if (!Array.isArray(timeline.segments) || timeline.segments.length === 0) {
  errors.push("segments must be a non-empty array");
}

if (timeline.mode === "article_tts" && !timeline.media?.audio) {
  errors.push("article_tts mode requires media.audio");
}

if (timeline.mode === "talking_head_overlay" && !timeline.media?.video) {
  errors.push("talking_head_overlay mode requires media.video");
}

const required = [
  "start",
  "end",
  "text",
  "caption_line",
  "visual_module",
  "animation",
  "emphasis_keyword"
];

const allowedEnglish = ["AI", "HUD", "TTS", "Codex", "Hermes", "HyperFrames", "timeline", "Obsidian", "llm-wiki", "px"];
const allowedSlots = [
  "center",
  "left",
  "right",
  "wide",
  "top_left",
  "top_right",
  "caption",
  "default",
  "impact-left",
  "impact-wide",
  "impact-table",
  "impact-checklist",
  "impact-cta",
  "side_hero_overlay",
  "side_topic_card",
  "side_process_panel",
  "side_tool_stack_panel",
  "side_scorecard_panel",
  "side_result_panel"
];

let previousEnd = 0;
for (const [index, segment] of (timeline.segments || []).entries()) {
  for (const key of required) {
    if (segment[key] === undefined || segment[key] === "") {
      errors.push(`segments[${index}].${key} is required`);
    }
  }

  if (!isNumber(segment.start) || !isNumber(segment.end)) {
    errors.push(`segments[${index}] start/end must be numbers`);
    continue;
  }

  if (segment.start < previousEnd - 0.05) {
    errors.push(`segments[${index}] overlaps previous segment`);
  }

  if (segment.end <= segment.start) {
    errors.push(`segments[${index}] end must be greater than start`);
  }

  if (segment.end > timeline.duration + 0.05) {
    errors.push(`segments[${index}] exceeds duration`);
  }

  if (/[A-Za-z]{4,}/.test(segment.caption_line || "")) {
    const words = (segment.caption_line.match(/[A-Za-z][A-Za-z0-9_-]*/g) || [])
      .filter((word) => !allowedEnglish.includes(word));
    if (words.length > 0) {
      errors.push(`segments[${index}] caption_line may contain English subtitle text: ${words.join(", ")}`);
    }
  }

  if (segment.layout_slot && !allowedSlots.includes(segment.layout_slot)) {
    errors.push(`segments[${index}].layout_slot is not supported: ${segment.layout_slot}`);
  }

  if (segment.component && typeof segment.component_props !== "object") {
    errors.push(`segments[${index}].component_props must be an object when component is present`);
  }

  previousEnd = segment.end;
}

if (errors.length > 0) {
  console.error("timeline validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`timeline ok: ${file}`);
console.log(`mode=${timeline.mode}, duration=${timeline.duration}s, segments=${timeline.segments.length}`);
