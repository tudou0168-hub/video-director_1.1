import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const results = [];

function read(file) {
  return fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), "utf8") : "";
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function add(name, pass, detail = "") {
  results.push({ name, pass, detail });
}

const registry = read("AI_VIDEO_COMPONENT_LIBRARY/registry/component-registry.json");
const recipes = read("AI_VIDEO_COMPONENT_LIBRARY/registry/scene-recipes.json");
const index = read("index.html");
const packageJson = read("package.json");
const timelineSource = read("timeline.json");
let registryJson = null;
let timelineJson = null;

try {
  registryJson = JSON.parse(registry);
  add("component registry parses as JSON", true);
} catch (error) {
  add("component registry parses as JSON", false, error.message);
}

try {
  timelineJson = JSON.parse(timelineSource);
  add("active timeline parses as JSON", true);
} catch (error) {
  add("active timeline parses as JSON", false, error.message);
}

const requiredRuleFiles = [
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/00_README.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/01_reference_style_definition.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/02_recording_requirements.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/03_transparent_hud_style.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/04_chinese_subtitle_rules.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/05_layout_safe_zones.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/06_typography_tokens.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/07_color_semantics.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/08_creator_overlay_templates.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/09_component_upgrade_specs.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/10_motion_timing_rules.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/11_scene_recipes.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/12_snapshot_acceptance_rubric.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/13_codex_execution_plan.md",
  "VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/14_test_storyboard_60s.md"
];

for (const file of requiredRuleFiles) {
  add(`rule file exists: ${file}`, exists(file), file);
}

const requiredV04Files = [
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/01_reference_image_taxonomy.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/02_reference_visual_grammar.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/03_overlay_layout_patterns.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/04_typography_extraction_rules.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/05_color_semantics.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/06_module_upgrade_map.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/07_reference_scoring_rubric.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/08_codex_component_upgrade_prompt.md",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/reference_dataset/reference_index.json",
  "VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/reference_dataset/annotated_examples.md"
];

for (const file of requiredV04Files) {
  add(`v0.4 distillation file exists: ${file}`, exists(file), file);
}

const requiredEccLiteFiles = [
  ".codex/project-rules.md",
  "docs/ai-workflow/codex-usage.md",
  "docs/ai-workflow/verification-checklist.md",
  "docs/ai-workflow/hyperframes-hud-standard.md",
  "docs/ai-workflow/contentforge-architecture.md",
  "docs/ai-workflow/superdesign-keyframe-workflow.md",
  "docs/ai-workflow/mcp-browser-tools.md",
  "docs/ai-workflow/repomix-context-pack.md",
  "prompts/codex-task-template.md",
  "prompts/hyperframes-video-template.md",
  "prompts/xiaohongshu-content-template.md",
  "prompts/codex-engineering-startup-template.md",
  "scripts/pack_context.sh"
];

for (const file of requiredEccLiteFiles) {
  add(`ecc-lite file exists: ${file}`, exists(file), file);
}

const requiredV05Files = [
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/00_README.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/01_reference_batch_analysis.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/02_template_registry.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/03_layout_zones.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/04_typography_tokens.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/05_color_semantics.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/06_component_specs.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/07_scene_recipes.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/08_motion_rules.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/09_snapshot_acceptance_rubric.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/10_codex_execution_prompt.md",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/recipes/ai_content_system_60s.json",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/recipes/agent_tool_tutorial_60s.json",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/recipes/knowledge_explainer_60s.json",
  "VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/recipes/product_proof_60s.json"
];

for (const file of requiredV05Files) {
  add(`v0.5 file exists: ${file}`, exists(file), file);
}

const requiredComponents = [
  "TopSectionLabel",
  "StepBadge",
  "BigKineticTitle",
  "OptionSplitCard",
  "ThreeStepPipeline",
  "DebugWindowOverlay",
  "ProofScreenshotOverlay",
  "KPIBigNumberOverlay",
  "ScoringDimensionPanel",
  "DetailsTableOverlay",
  "MultiAgentPanel",
  "TermExplainerPanel",
  "ViralSourceCarousel",
  "APIHandoffCard",
  "PhoneIntegrationCards",
  "CTABigEnding",
  "BottomChineseSubtitle"
];

for (const component of requiredComponents) {
  add(`required component registered: ${component}`, registry.includes(`"${component}"`), component);
  add(`v0.5 component spec exists: ${component}`, exists(`VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/components_to_build/${component}.md`), component);
}

const requiredTemplates = [
  "COMPLETION_SCORE_ENDING",
  "API_HANDOFF_CARD",
  "PHONE_INTEGRATION_CARDS",
  "VIRAL_SOURCE_CAROUSEL",
  "SOURCE_SCORING_DASHBOARD",
  "DIMENSION_SCORING_LIST",
  "DETAILS_TABLE_OVERLAY",
  "MULTI_AGENT_COLLABORATION",
  "TERM_EXPLAINER",
  "FINAL_AGENT_CHART"
];

const v05Registry = read("VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/02_template_registry.md");
for (const template of requiredTemplates) {
  add(`v0.5 template registered: ${template}`, v05Registry.includes(template), template);
}

add("BottomChineseSubtitle exists", /BottomChineseSubtitle/.test(registry + recipes + index));
add("BottomBilingualSubtitle forbidden", !/BottomBilingualSubtitle/.test(registry + recipes + index));
add("English subtitle fields forbidden", !/(englishSubtitle|subtitleEN|subtitle_en|enSubtitle)/.test(registry + recipes + index + timelineSource));
add("TopSectionLabel exists", /TopSectionLabel/.test(registry + recipes + index));
add("StepBadge exists", /StepBadge/.test(registry + recipes + index));
add("BigKineticTitle or MegaNumber exists", /(BigKineticTitle|MegaNumber)/.test(registry + recipes + index));
add("scene recipes contain snapshotAt", /snapshot[_-]?at|snapshotAt/i.test(recipes));
add("render is not first package script", !/\"scripts\"\s*:\s*\{\s*\"render\"/.test(packageJson));

const v04Rules = requiredV04Files.map(read).join("\n");
add("v0.4 defines five reference classes", /(Big Word Impact|大字爆点)/.test(v04Rules) && /(Chart Explanation|图表解释)/.test(v04Rules) && /(Comparison Card|对比卡)/.test(v04Rules) && /(Evidence|证据)/.test(v04Rules) && /(Product|产品)/.test(v04Rules));
add("v0.4 forbids raw reference copying", /(not copy|不要.*抄|not direct visual copying)/i.test(v04Rules));
add("v0.4 enforces one visual center", /(one visual center|一个视觉中心)/i.test(v04Rules));
add("v0.4 maps references to component upgrades", /BigKineticTitle/.test(v04Rules) && /OptionSplitCard/.test(v04Rules) && /ProofScreenshotOverlay/.test(v04Rules));

const eccLiteRules = requiredEccLiteFiles.map(read).join("\n");
add("ecc-lite forbids full ECC copy", /(不全量安装 ECC|不全量复制 ECC|not ECC weight|Do not adopt by default)/i.test(eccLiteRules));
add("ecc-lite requires verification loop", /npm run check:creator-overlay/.test(eccLiteRules) && /npm run validate:components/.test(eccLiteRules));
add("ecc-lite keeps Chinese-first prompts", /(Chinese first|中文优先|纯中文字幕)/i.test(eccLiteRules));
add("ecc-lite forbids media artifacts", /(media artifacts|视频、音频、截图|render 产物)/i.test(eccLiteRules));
add("ecc-lite includes copyable task templates", /任务目标/.test(eccLiteRules) && /HyperFrames 口播视频导演/.test(eccLiteRules) && /小红书/.test(eccLiteRules));
add("startup template references existing project rules", /AGENTS\.md/.test(eccLiteRules) && /\.codex\/project-rules\.md/.test(eccLiteRules));
add("superdesign workflow is documentation-only", /not a required project dependency/i.test(eccLiteRules) && /Generated keyframe images.*stay local only/i.test(eccLiteRules));
add("mcp notes do not require installation", /does not require extra MCP installation/i.test(eccLiteRules) && /optional debugging tools only/i.test(eccLiteRules));
add("repomix output stays ignored", /work-repomix/.test(eccLiteRules) && /work-\*/.test(read(".gitignore")));

if (registryJson && timelineJson) {
  const registeredComponents = new Set(Object.keys(registryJson.components || {}));
  const segments = Array.isArray(timelineJson.segments) ? timelineJson.segments : [];
  const segmentIssues = [];
  const componentIssues = [];
  const subtitleIssues = [];
  const overlayIssues = [];
  const timingIssues = [];
  const snapshotIssues = [];

  for (const [index, segment] of segments.entries()) {
    const label = `segments[${index}]`;
    if (typeof segment.start !== "number" || typeof segment.end !== "number" || segment.end <= segment.start) {
      timingIssues.push(`${label} invalid start/end`);
    }
    if (index > 0 && segment.start < segments[index - 1].end) {
      timingIssues.push(`${label} overlaps previous segment`);
    }
    if (!segment.template) segmentIssues.push(`${label} missing template`);
    if (!segment.component) segmentIssues.push(`${label} missing component`);
    if (!segment.component_props) segmentIssues.push(`${label} missing component_props`);
    if (!segment.primaryText) segmentIssues.push(`${label} missing primaryText`);
    if (!segment.snapshotAt) snapshotIssues.push(`${label} missing snapshotAt`);
    if (!segment.safe_zone && !segment.safeZone) segmentIssues.push(`${label} missing safe zone`);
    if (!segment.animation && !segment.motion) segmentIssues.push(`${label} missing animation/motion`);
    if (!segment.caption_line || !segment.subtitleCN) subtitleIssues.push(`${label} missing Chinese caption fields`);
    if (segment.subtitleEN || segment.englishSubtitle || segment.enSubtitle) subtitleIssues.push(`${label} has English subtitle field`);
    if (!registeredComponents.has(segment.component)) componentIssues.push(`${label} component not registered: ${segment.component}`);
    const declaredComponents = Array.isArray(segment.components) ? segment.components : [];
    for (const component of declaredComponents) {
      if (!registeredComponents.has(component)) componentIssues.push(`${label} declared component not registered: ${component}`);
    }
    if (!declaredComponents.includes("BottomChineseSubtitle")) subtitleIssues.push(`${label} missing BottomChineseSubtitle`);
    if (!declaredComponents.includes("TopSectionLabel")) overlayIssues.push(`${label} missing TopSectionLabel`);
    if (!declaredComponents.includes("StepBadge")) overlayIssues.push(`${label} missing StepBadge`);
  }

  const snapshotSet = new Set(Array.isArray(timelineJson.snapshot_at) ? timelineJson.snapshot_at : []);
  for (const segment of segments) {
    if (segment.snapshotAt && !snapshotSet.has(segment.snapshotAt)) {
      snapshotIssues.push(`segment snapshotAt ${segment.snapshotAt} not listed in timeline snapshot_at`);
    }
  }

  add("active timeline has segments", segments.length > 0, `${segments.length} segment(s)`);
  add("active timeline fields are complete", segmentIssues.length === 0, segmentIssues.join("; "));
  add("active timeline components are registered", componentIssues.length === 0, componentIssues.join("; "));
  add("active timeline uses pure Chinese subtitle system", subtitleIssues.length === 0, subtitleIssues.join("; "));
  add("active timeline includes TopSectionLabel and StepBadge per segment", overlayIssues.length === 0, overlayIssues.join("; "));
  add("active timeline timing is monotonic", timingIssues.length === 0, timingIssues.join("; "));
  add("active timeline snapshotAt values are wired", snapshotIssues.length === 0, snapshotIssues.join("; "));
  add("active timeline is bounded by declared duration", segments.every((segment) => segment.end <= timelineJson.duration), `duration=${timelineJson.duration}`);
}

const mediaTracked = (() => {
  try {
    return execFileSync("git", ["ls-files"], { encoding: "utf8" })
      .split("\n")
      .filter((file) => /\.(mp4|mov|m4a|mp3|wav|png|jpg|jpeg|webp|gif)$/i.test(file));
  } catch {
    return [];
  }
})();
add("media outputs are not tracked by git", mediaTracked.length === 0, mediaTracked.join(", "));

const hudAlphaIssues = [];
const cssSources = [
  ["index.html", index],
  ["AI_VIDEO_COMPONENT_LIBRARY/components/AgentDashboard/style.css", read("AI_VIDEO_COMPONENT_LIBRARY/components/AgentDashboard/style.css")],
  ["AI_VIDEO_COMPONENT_LIBRARY/components/SubtitleSystem/style.css", read("AI_VIDEO_COMPONENT_LIBRARY/components/SubtitleSystem/style.css")]
];

for (const [file, source] of cssSources) {
  const regex = /background:\s*rgba\([^)]*,\s*([0-9.]+)\)/g;
  for (const match of source.matchAll(regex)) {
    const alpha = Number(match[1]);
    const before = source.slice(Math.max(0, match.index - 260), match.index);
    const isSubtitle = /(caption|subtitle|vf-caption)/i.test(before);
    const isProofCaption = /(proof-caption|creator-proof-caption)/i.test(before);
    const isDecor = /bar|line|grid/i.test(before);
    if (!isSubtitle && !isProofCaption && !isDecor && alpha > 0.12) {
      hudAlphaIssues.push(`${file}: alpha ${alpha}`);
    }
  }
}
add("HUD backgrounds alpha <= 0.12", hudAlphaIssues.length === 0, hudAlphaIssues.join("; "));

const motionFiles = [
  "AI_VIDEO_COMPONENT_LIBRARY/components/AgentDashboard/motion.js",
  "AI_VIDEO_COMPONENT_LIBRARY/components/HookScene/motion.js",
  "AI_VIDEO_COMPONENT_LIBRARY/components/KPIWidget/motion.js",
  "AI_VIDEO_COMPONENT_LIBRARY/components/ProblemAlert/motion.js",
  "AI_VIDEO_COMPONENT_LIBRARY/components/SubtitleSystem/motion.js",
  "AI_VIDEO_COMPONENT_LIBRARY/components/TopicCard/motion.js"
];

for (const file of motionFiles) {
  const source = read(file);
  const hasEntry = /(from|fromTo|entry|opacity:\s*0)/.test(source);
  const hasActive = /(pulse|repeat|active|scale|boxShadow|yoyo)/.test(source);
  const hasExit = /(to|exit|opacity:\s*0)/.test(source);
  add(`motion lifecycle: ${file}`, hasEntry && hasActive && hasExit, "needs entry/active/exit evidence");
}

let failed = 0;
for (const item of results) {
  const mark = item.pass ? "PASS" : "FAIL";
  if (!item.pass) failed += 1;
  console.log(`${mark} ${item.name}${item.detail ? ` ${item.detail}` : ""}`);
}

if (failed > 0) {
  console.error(`creator overlay compliance failed: ${failed} issue(s)`);
  process.exit(1);
}

console.log("creator overlay compliance ok");
