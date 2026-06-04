# Codex Engineering Startup Template

Use this when starting a new Codex session for `video-director`.

```text
你现在接管本地项目：

/Users/muzi/video-director

请按照项目已有规则执行，不要复制外部长提示词，不要全量安装 ECC。

必须先读：
- AGENTS.md
- .codex/project-rules.md
- docs/ai-workflow/verification-checklist.md
- docs/ai-workflow/hyperframes-hud-standard.md

项目目标：
这是 P008 AI 视频导演系统，用于生产中文知识博主 Creator Overlay 口播包装视频。

核心约束：
- HyperFrames + HTML/CSS/GSAP。
- 透明线框 HUD，不要厚重 Dashboard。
- 纯中文字幕，不要英文翻译字幕。
- 顶部栏目标签和右上 StepBadge 必须存在。
- 每 5-8 秒有一个主视觉变化。
- 先 snapshot，再 inspect，最后才 render。
- 不提交视频、音频、截图、snapshot、render 等媒体产物。

本次任务：
【填入你要 Codex 做什么】

范围限制：
【填入允许修改的目录或文件】

验收标准：
1. 说明修改了哪些文件。
2. 说明规则如何落地。
3. 运行相关验证命令。
4. 标出仍需人工检查的地方。
```

## Use Cases

- 开新会话时，让 Codex 快速进入 P008 项目语境。
- 交给另一个 agent 前，减少重复解释。
- 做复杂修改前，统一约束和验收口径。

## Do Not Include

- 不复制 `/Users/muzi/LLM_Knowledge2.0/Outputs/codex完整工程化启动提示词.md` 原文。
- 不要求创建 `.codex/skills/`。
- 不要求安装 Continue、MCP、SuperDesign、Repomix。
- 不要求创建媒体资产目录。
