import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("../", import.meta.url).pathname);
const file = process.argv[2] || path.resolve(root, "../timeline.json");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/component-registry.json"), "utf8"));
const layoutRulesPath = path.join(root, "registry/audio-master-layout-rules.json");
const layoutRules = fs.existsSync(layoutRulesPath)
  ? JSON.parse(fs.readFileSync(layoutRulesPath, "utf8"))
  : {};
const timeline = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];
const warnings = [];

const components = registry.components;
const legacyMap = registry.legacy_visual_module_map || {};
const allowedEnglish = ["AI", "HUD", "TTS", "Codex", "Hermes", "HyperFrames", "timeline", "Obsidian", "llm-wiki", "px"];

const defaultMaxSeconds = 8.05;
const groupMaxSeconds = {
  hook_problem: 8.05,
  root_cause: 8.05,
  workflow: 14.05,
  tool_stack: 14.05,
  proof_standard: 8.05,
  result_next_step: 10.05,
  cta: 10.05,
};

for (const group of layoutRules.hud_groups || []) {
  if (group?.key && typeof group.endTime === "number" && typeof group.startTime === "number") {
    groupMaxSeconds[group.key] = Math.max(groupMaxSeconds[group.key] || 0, group.endTime - group.startTime + 0.05);
  }
}

function resolveSemanticGroup(segment) {
  return segment.semantic_group || segment.semantic_role || "default";
}

function getMaxSecondsForSegment(segment) {
  const key = resolveSemanticGroup(segment);
  return groupMaxSeconds[key] ?? defaultMaxSeconds;
}

function resolveComponent(segment) {
  return segment.component || legacyMap[segment.visual_module] || segment.visual_module;
}

for (const [index, segment] of (timeline.segments || []).entries()) {
  const component = resolveComponent(segment);
  if (!components[component]) {
    errors.push(`segments[${index}] uses unknown component: ${component}`);
    continue;
  }

  const props = { ...(segment.component_props || {}), caption_line: segment.caption_line };
  for (const prop of components[component].required_props || []) {
    if (props[prop] === undefined || props[prop] === "" || (Array.isArray(props[prop]) && props[prop].length === 0)) {
      errors.push(`segments[${index}] component ${component} missing component_props.${prop}`);
    }
  }

  if (segment.layout_slot === "caption" && !["SubtitleSystem", "BottomChineseSubtitle"].includes(component)) {
    errors.push(`segments[${index}] non-subtitle component cannot use caption layout slot`);
  }

  if (timeline.mode === "talking_head_overlay" && ["center", "bottom"].includes(segment.layout_slot)) {
    warnings.push(`segments[${index}] talking_head_overlay should avoid ${segment.layout_slot} unless manually verified`);
  }

  const words = (segment.caption_line || "").match(/[A-Za-z][A-Za-z0-9_-]*/g) || [];
  const badWords = words.filter((word) => !allowedEnglish.includes(word));
  if (badWords.length > 0) {
    errors.push(`segments[${index}] caption_line may contain English subtitle text: ${badWords.join(", ")}`);
  }
}

for (let i = 0; i < (timeline.segments || []).length; i += 1) {
  const segment = timeline.segments[i];
  const duration = Number(segment.end) - Number(segment.start);
  const maxSeconds = getMaxSecondsForSegment(segment);
  if (duration > maxSeconds) {
    warnings.push(`segments[${i}] ${resolveSemanticGroup(segment)} lasts ${duration.toFixed(3)}s, above recommended ${maxSeconds.toFixed(3)}s`);
  }
}

if (!timeline.segments?.some((segment) => (segment.semantic_role || "").includes("cta") || segment.cta_type === "comment_keyword")) {
  warnings.push("timeline has no explicit CTA segment");
}

if (warnings.length > 0) {
  console.warn("component usage warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error("component usage validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`component usage ok: ${file}`);
