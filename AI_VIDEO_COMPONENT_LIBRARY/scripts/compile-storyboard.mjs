import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("../", import.meta.url).pathname);
const inputFile = process.argv[2] || path.join(root, "examples/sample_input_article.md");
const outputDir = process.argv[3] || path.join(root, "examples");
const mode = process.argv[4] || "article_tts";

const rules = JSON.parse(fs.readFileSync(path.join(root, "registry/trigger-rules.json"), "utf8")).rules;
const fallback = JSON.parse(fs.readFileSync(path.join(root, "registry/trigger-rules.json"), "utf8")).fallback;
const recipes = JSON.parse(fs.readFileSync(path.join(root, "registry/scene-recipes.json"), "utf8")).recipes;

function normalizeText(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---/m, "")
    .split(/\n+/)
    .filter((line) => !/^#+\s*/.test(line.trim()))
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("|") && !line.startsWith("- "))
    .join("。")
    .replace(/。+/g, "。");
}

function visualUnits(token) {
  return /[A-Za-z]/.test(token) ? token.length + 1 : token.length;
}

function tokenizeClause(clause) {
  return clause.match(/HyperFrames|Claude Code|llm-wiki|Obsidian|Hermes|Codex|timeline|HUD|TTS|AI|[0-9]+(?:px|分钟|小时|天|倍|%|％)?|[A-Za-z]+(?:-[A-Za-z]+)*|[\u4e00-\u9fa5]+|[、]/g) || [];
}

function pushToken(chunks, current, token, limit = 20) {
  if (token === "、") {
    if (current.text) {
      current.text += token;
    }
    return;
  }

  const nextSize = current.size + visualUnits(token);
  if (nextSize <= limit) {
    current.text += token;
    current.size = nextSize;
    return;
  }

  if (current.text) {
    chunks.push(current.text);
    current.text = "";
    current.size = 0;
  }

  if (visualUnits(token) <= limit || /[A-Za-z0-9-]/.test(token)) {
    current.text = token;
    current.size = visualUnits(token);
    return;
  }

  let rest = token;
  while (rest.length) {
    const slice = rest.slice(0, limit);
    chunks.push(slice);
    rest = rest.slice(limit);
  }
}

function chunkClause(clause) {
  if (clause.length <= 22) return [clause];
  const tokens = tokenizeClause(clause);
  if (!tokens.length) return [clause];

  const chunks = [];
  const current = { text: "", size: 0 };
  for (const token of tokens) {
    pushToken(chunks, current, token);
  }
  if (current.text) chunks.push(current.text);
  return chunks.filter(Boolean);
}

function splitSentences(text) {
  const clauses = text
    .split(/[。！？!?，,：:；;]\s*/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const beats = clauses.flatMap((clause) => chunkClause(clause));

  const ctaBeat = beats.find((beat) => /回复|领取|下载|购买|关键词/.test(beat));
  const selected = beats.slice(0, 18);
  if (ctaBeat && !selected.includes(ctaBeat)) {
    selected[selected.length - 1] = ctaBeat;
  }
  return selected;
}

function selectRule(sentence, index) {
  const ctaRule = rules.find((rule) => rule.semantic_role === "cta");
  if (ctaRule?.keywords.some((keyword) => sentence.includes(keyword))) return ctaRule;
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => sentence.includes(keyword))) return rule;
  }
  if (index === 0) return rules.find((rule) => rule.semantic_role === "pain_hook");
  return fallback;
}

function caption(sentence) {
  const tokens = sentence.match(/HyperFrames|Claude Code|llm-wiki|Obsidian|Hermes|Codex|timeline|HUD|TTS|AI|[0-9]+(?:px|分钟|小时|天|倍|%|％)?|[\u4e00-\u9fa5]+/g) || [];
  const parts = [];
  let size = 0;
  for (const token of tokens) {
    const isLatin = /[A-Za-z]/.test(token);
    const tokenSize = isLatin ? token.length + 1 : token.length;
    if (size + tokenSize > 20) {
      if (!isLatin && size < 12) parts.push(token.slice(0, Math.max(2, 20 - size)));
      break;
    }
    parts.push(token);
    size += tokenSize;
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function propsFor(component, sentence, role) {
  const keyword = caption(sentence).slice(-6);
  if (component === "HookScene") {
    return { kicker: "问题命中", headline: caption(sentence), subline: "先看问题，再看工具" };
  }
  if (component === "ProblemAlert") {
    return { problem: caption(sentence), loss: "时间被消耗，结果没沉淀" };
  }
  if (component === "KPIWidget") {
    const value = sentence.match(/\d+[%％倍天小时分钟单]?/)?.[0] || "3步";
    return { value, label: "把抽象努力变成可检查结果", unit: "" };
  }
  if (component === "AgentDashboard") {
    return { nodes: ["Hermes", "Obsidian", "llm-wiki", "Codex", "HyperFrames"], status: "running" };
  }
  return { title: role === "cta" ? "下一步" : "正确做法", body: caption(sentence) };
}

function writeOutputs(outputDir, mode, duration, storyboard, timeline) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "compiled.storyboard.json"), JSON.stringify({ mode, duration, storyboard }, null, 2));
  fs.writeFileSync(path.join(outputDir, "compiled.timeline.json"), JSON.stringify(timeline, null, 2));

  console.log(`compiled storyboard: ${path.join(outputDir, "compiled.storyboard.json")}`);
  console.log(`compiled timeline: ${path.join(outputDir, "compiled.timeline.json")}`);
}

function creatorOverlay30s(outputDir) {
  const recipe = recipes.AI_Content_System_30s_Snapshot;
  const beats = [
    {
      start: 0,
      end: 5,
      component: "BigKineticTitle",
      template: "BIG_TITLE_HOOK",
      label_en: "AI TOOLS",
      label_cn: "工具焦虑",
      step: "01",
      step_label: "PROBLEM",
      text: "为什么你学了很多 AI 工具，还是没有真正提高效率？",
      caption_line: "你学了很多 AI 工具",
      primaryText: "工具越多，越累",
      component_props: {
        headline: "工具越多，越累",
        subline: "不是你不努力，是没有内容系统",
        label_en: "AI TOOLS",
        label_cn: "工具焦虑",
        step: "01",
        step_label: "PROBLEM"
      }
    },
    {
      start: 5,
      end: 12,
      component: "OptionSplitCard",
      template: "OPTION_SPLIT_CARD",
      label_en: "CHOICE",
      label_cn: "两种路径",
      step: "01",
      step_label: "采集",
      text: "你现在不是缺工具，而是在手动刷热点和系统采集之间没有做选择。",
      caption_line: "不是你不努力，是流程太散",
      primaryText: "手动刷热点 vs Hermes 自动采集",
      component_props: {
        left: "手动刷热点",
        right: "Hermes 自动采集",
        label_en: "CHOICE",
        label_cn: "两种路径",
        step: "01",
        step_label: "采集"
      }
    },
    {
      start: 12,
      end: 20,
      component: "ThreeStepPipeline",
      template: "THREE_STEP_PIPELINE",
      label_en: "SYSTEM FLOW",
      label_cn: "系统流程",
      step: "02",
      step_label: "编译",
      text: "我的做法是 Hermes 采集，Obsidian 沉淀，llm-wiki 编译。",
      caption_line: "先采集，再沉淀，再编译",
      primaryText: "Hermes -> Obsidian -> llm-wiki",
      component_props: {
        steps: ["Hermes", "Obsidian", "llm-wiki"],
        label_en: "SYSTEM FLOW",
        label_cn: "系统流程",
        step: "02",
        step_label: "编译"
      }
    },
    {
      start: 20,
      end: 27,
      component: "DetailsTableOverlay",
      template: "DETAILS_TABLE_OVERLAY",
      label_en: "SCORING",
      label_cn: "判断标准",
      step: "03",
      step_label: "评分",
      text: "每条素材都要进入选题库，用痛点、复用、转化三个字段打分。",
      caption_line: "每条素材都要有判断标准",
      primaryText: "选题库打分",
      component_props: {
        title: "选题库打分",
        rows: [["痛点", "9.2"], ["复用", "8.8"], ["转化", "8.5"]],
        label_en: "SCORING",
        label_cn: "判断标准",
        step: "03",
        step_label: "评分"
      }
    },
    {
      start: 27,
      end: 30,
      component: "CTABigEnding",
      template: "CTA_BIG_ENDING",
      label_en: "NEXT STEP",
      label_cn: "领取资料",
      step: "OK",
      step_label: "领取",
      text: "你可以先回复系统，领取一张流程图，照着把第一版搭起来。",
      caption_line: "先领流程图，照着搭起来",
      primaryText: "回复 系统",
      component_props: {
        keyword: "系统",
        result: "领取一张流程图，先照着搭起来",
        label_en: "NEXT STEP",
        label_cn: "领取资料",
        step: "OK",
        step_label: "领取"
      }
    }
  ];

  const storyboard = beats.map((beat, index) => ({
    beat_id: `B${String(index + 1).padStart(2, "0")}`,
    time: `${beat.start}-${beat.end}`,
    template: beat.template,
    components: ["TopSectionLabel", "StepBadge", beat.component, "BottomChineseSubtitle"],
    primaryText: beat.primaryText,
    narration: beat.text,
    subtitleCN: beat.caption_line,
    colorTheme: index === 3 ? "yellow-value" : "blue-info",
    safeZone: recipe.beats[index]?.safeZone || "right_overlay_when_face_left",
    motion: index === 0 ? "kinetic_title_in" : index === 1 ? "split_slide_in" : index === 2 ? "node_cascade" : index === 3 ? "table_reveal" : "cta_focus",
    snapshotAt: recipe.snapshot_frames[index]
  }));

  const segments = beats.map((beat, index) => ({
    start: beat.start,
    end: beat.end,
    text: beat.text,
    caption_line: beat.caption_line,
    visual_module: beat.component,
    component: beat.component,
    component_props: beat.component_props,
    layout_slot: "right",
    safe_zone: recipe.beats[index]?.safeZone || "right_overlay_when_face_left",
    animation: storyboard[index].motion,
    emphasis_keyword: beat.primaryText,
    density: index === 0 || index === 4 ? "high" : "medium",
    semantic_role: index === 0 ? "pain_hook" : index === 1 ? "option_compare" : index === 2 ? "workflow" : index === 3 ? "proof" : "cta",
    proof_point: index === 4 ? "评论关键词领取流程图" : "给出一个可执行判断",
    cta_type: index === 4 ? "comment_keyword" : "none",
    template: beat.template,
    components: storyboard[index].components,
    primaryText: beat.primaryText,
    subtitleCN: beat.caption_line,
    snapshotAt: storyboard[index].snapshotAt
  }));

  const timeline = {
    mode: "talking_head_overlay",
    width: 1920,
    height: 1080,
    duration: 30,
    media: { audio: "assets/talking-head-audio-master.wav", video: "assets/talking-head-input.mp4" },
    product_id: "P008",
    recipe: "AI_Content_System_30s_Snapshot",
    snapshot_frames: recipe.snapshot_frames,
    segments
  };

  writeOutputs(outputDir, "creator_overlay_30s", 30, storyboard, timeline);
}

function creatorOverlay60s(outputDir) {
  const recipe = recipes.AI_Content_System_60s;
  const beats = [
    {
      start: 0,
      end: 5,
      component: "BigKineticTitle",
      template: "BIG_TITLE_HOOK",
      text: "为什么你学了很多 AI 工具，还是没有真正提高效率？",
      caption_line: "你学了很多 AI 工具",
      primaryText: "工具越多，越累",
      component_props: {
        headline: "工具越多，越累",
        subline: "不是你不努力，是没有内容系统",
        label_en: "AI TOOLS",
        label_cn: "工具焦虑",
        step: "01",
        step_label: "PROBLEM"
      }
    },
    {
      start: 5,
      end: 12,
      component: "OptionSplitCard",
      template: "OPTION_SPLIT_CARD",
      text: "你现在不是缺工具，而是在手动刷热点和系统采集之间没有做选择。",
      caption_line: "不是你不努力，是流程太散",
      primaryText: "手动刷热点 vs Hermes 自动采集",
      component_props: {
        left: "手动刷热点",
        right: "Hermes 自动采集",
        label_en: "CHOICE",
        label_cn: "两种路径",
        step: "01",
        step_label: "采集"
      }
    },
    {
      start: 12,
      end: 20,
      component: "ThreeStepPipeline",
      template: "THREE_STEP_PIPELINE",
      text: "我的做法是 Hermes 采集，Obsidian 沉淀，llm-wiki 编译。",
      caption_line: "先采集，再沉淀，再编译",
      primaryText: "Hermes -> Obsidian -> llm-wiki",
      component_props: {
        steps: ["Hermes", "Obsidian", "llm-wiki"],
        label_en: "SYSTEM FLOW",
        label_cn: "系统流程",
        step: "02",
        step_label: "编译"
      }
    },
    {
      start: 20,
      end: 28,
      component: "DetailsTableOverlay",
      template: "DETAILS_TABLE_OVERLAY",
      text: "每条素材都要进入选题库，用痛点、复用、转化三个字段打分。",
      caption_line: "每条素材都要有判断标准",
      primaryText: "选题库打分",
      component_props: {
        title: "选题库打分",
        rows: [["痛点", "9.2"], ["复用", "8.8"], ["转化", "8.5"]],
        label_en: "SCORING",
        label_cn: "判断标准",
        step: "03",
        step_label: "评分"
      }
    },
    {
      start: 28,
      end: 36,
      component: "MultiAgentPanel",
      template: "MULTI_AGENT_COLLABORATION",
      text: "后面不是一个助手在干活，而是 Hermes、Codex、Claude Code 一起分工。",
      caption_line: "不是一个助手，是一支队伍",
      primaryText: "一套系统，多 Agent 协作",
      component_props: {
        title: "多 Agent 协作",
        agents: [["Hermes", "采集"], ["Codex", "产出"], ["Claude Code", "执行"], ["HyperFrames", "包装"]],
        label_en: "MULTI AGENT",
        label_cn: "协作分工",
        step: "04",
        step_label: "协作"
      }
    },
    {
      start: 36,
      end: 44,
      component: "MultiAgentPanel",
      template: "MULTI_AGENT_COLLABORATION",
      text: "一个负责采集，一个负责编译，一个负责产出，一个负责视频包装。",
      caption_line: "一个负责采集，一个负责产出",
      primaryText: "AI 团队开始分工",
      component_props: {
        title: "AI 团队分工",
        agents: [["Hermes", "情报"], ["llm-wiki", "编译"], ["Codex", "内容"], ["HyperFrames", "视频"]],
        label_en: "AI TEAM",
        label_cn: "分工",
        step: "05",
        step_label: "团队"
      }
    },
    {
      start: 44,
      end: 52,
      component: "ProofScreenshotOverlay",
      template: "PROOF_SCREENSHOT_OVERLAY",
      text: "这一段后面要接真实截图，不够素材时只放抽象占位，不伪造平台界面。",
      caption_line: "后面要接真实截图资产",
      primaryText: "真实输出证明",
      component_props: {
        title: "真实输出证明",
        asset_path: "assets/proof/demo-proof-output.png",
        asset_label: "演示截图，正式发版请替换",
        asset_alt: "P008 60 秒小样关键帧截图",
        asset_status: "DEMO_RENDER_SNAPSHOT",
        label_en: "PROOF",
        label_cn: "证据资产",
        step: "06",
        step_label: "证明"
      }
    },
    {
      start: 52,
      end: 60,
      component: "CTABigEnding",
      template: "CTA_BIG_ENDING",
      text: "你可以先回复系统，领取一张流程图，照着把第一版搭起来。",
      caption_line: "先领流程图，照着搭起来",
      primaryText: "回复 系统",
      component_props: {
        keyword: "系统",
        result: "领取一张流程图，先照着搭起来",
        label_en: "NEXT STEP",
        label_cn: "领取资料",
        step: "OK",
        step_label: "领取"
      }
    }
  ];

  const motionByComponent = {
    BigKineticTitle: "kinetic_title_in",
    OptionSplitCard: "split_slide_in",
    ThreeStepPipeline: "node_cascade",
    DetailsTableOverlay: "table_reveal",
    MultiAgentPanel: "agent_stack",
    ProofScreenshotOverlay: "proof_drop",
    CTABigEnding: "cta_focus"
  };
  const roleByComponent = {
    BigKineticTitle: "pain_hook",
    OptionSplitCard: "option_compare",
    ThreeStepPipeline: "workflow",
    DetailsTableOverlay: "proof",
    MultiAgentPanel: "multi_agent",
    ProofScreenshotOverlay: "screenshot_proof",
    CTABigEnding: "cta"
  };

  const storyboard = beats.map((beat, index) => ({
    beat_id: `B${String(index + 1).padStart(2, "0")}`,
    time: `${beat.start}-${beat.end}`,
    template: beat.template,
    components: ["TopSectionLabel", "StepBadge", beat.component, "BottomChineseSubtitle"],
    primaryText: beat.primaryText,
    narration: beat.text,
    subtitleCN: beat.caption_line,
    colorTheme: beat.component === "CTABigEnding" ? "yellow-value" : beat.component === "MultiAgentPanel" ? "purple-agent" : "blue-info",
    safeZone: recipe.beats[index]?.safeZone || "right_overlay_when_face_left",
    motion: motionByComponent[beat.component],
    snapshotAt: recipe.snapshot_at[index]
  }));

  const segments = beats.map((beat, index) => ({
    start: beat.start,
    end: beat.end,
    text: beat.text,
    caption_line: beat.caption_line,
    visual_module: beat.component,
    component: beat.component,
    component_props: beat.component_props,
    layout_slot: "right",
    safe_zone: recipe.beats[index]?.safeZone || "right_overlay_when_face_left",
    animation: storyboard[index].motion,
    emphasis_keyword: beat.primaryText,
    density: ["BigKineticTitle", "CTABigEnding"].includes(beat.component) ? "high" : "medium",
    semantic_role: roleByComponent[beat.component],
    proof_point: beat.component === "ProofScreenshotOverlay" ? "TODO_ASSET_REQUIRED" : "给出一个可执行判断",
    cta_type: beat.component === "CTABigEnding" ? "comment_keyword" : "none",
    template: beat.template,
    components: storyboard[index].components,
    primaryText: beat.primaryText,
    subtitleCN: beat.caption_line,
    snapshotAt: storyboard[index].snapshotAt
  }));

  const timeline = {
    mode: "talking_head_overlay",
    width: 1920,
    height: 1080,
    duration: 60,
    media: { audio: "assets/talking-head-audio-master.wav", video: "assets/talking-head-input.mp4" },
    product_id: "P008",
    recipe: "AI_Content_System_60s",
    snapshot_at: recipe.snapshot_at,
    segments
  };

  writeOutputs(outputDir, "creator_overlay_60s", 60, storyboard, timeline);
}

if (mode === "creator_overlay_30s") {
  creatorOverlay30s(outputDir);
  process.exit(0);
}

if (mode === "creator_overlay_60s") {
  creatorOverlay60s(outputDir);
  process.exit(0);
}

const text = normalizeText(fs.readFileSync(inputFile, "utf8"));
const sentences = splitSentences(text);
const duration = 60;
const segmentDuration = Number((duration / Math.max(sentences.length, 1)).toFixed(2));

const storyboard = [];
const segments = sentences.map((sentence, index) => {
  const rule = selectRule(sentence, index);
  const start = Number((index * segmentDuration).toFixed(2));
  const end = index === sentences.length - 1 ? duration : Number(((index + 1) * segmentDuration).toFixed(2));
  const component = rule.component;
  const semanticRole = rule.semantic_role || "explain";
  const item = {
    beat_id: `B${String(index + 1).padStart(2, "0")}`,
    time: `${start}-${end}`,
    narration: sentence,
    viewer_feeling: semanticRole === "pain_hook" ? "你在说我" : semanticRole === "cta" ? "我知道下一步拿什么" : "这一步有用",
    semantic_role: semanticRole,
    component,
    layout_slot: component === "AgentDashboard" ? "wide" : component === "KPIWidget" ? "left" : component === "HookScene" && mode !== "talking_head_overlay" ? "center" : "right",
    motion: rule.animation,
    sfx: semanticRole === "pain_hook" ? "soft_hit" : "subtle_tick",
    proof_or_action: semanticRole === "cta" ? "评论关键词领取清单" : "给出一个可执行判断"
  };
  storyboard.push(item);

  return {
    start,
    end,
    text: sentence,
    caption_line: caption(sentence),
    visual_module: component,
    component,
    component_props: propsFor(component, sentence, semanticRole),
    layout_slot: item.layout_slot,
    safe_zone: mode === "talking_head_overlay" ? "opposite_of_face" : "default",
    animation: rule.animation,
    emphasis_keyword: caption(sentence).slice(-6),
    density: rule.density,
    semantic_role: semanticRole,
    proof_point: item.proof_or_action,
    cta_type: semanticRole === "cta" ? "comment_keyword" : "none"
  };
});

const timeline = {
  mode,
  width: 1920,
  height: 1080,
  duration,
  media: mode === "talking_head_overlay"
    ? { audio: "assets/talking-head-audio-master.wav", video: "assets/talking-head-input.mp4" }
    : { audio: "assets/narration.mp3", video: null },
  product_id: "P008",
  recipe: mode === "talking_head_overlay" ? "TalkingHead_HUD_60s" : "TTS_60s_Explainer",
  segments
};

writeOutputs(outputDir, mode, duration, storyboard, timeline);
