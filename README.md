# Creator Overlay Pro

`video-director_1.1` 是口播稿 / TTS / 真人口播音频驱动的 Creator Overlay 系统，也是 Creator Overlay Pro 的本地主干。

它的目标不是做通用文案生成视频系统，而是稳定把口播音频驱动的内容包装成可复用、可验证、可交付的中文 Creator Overlay 样片。

## 当前能力

- 文案 / 口播稿输入
- 已有真人口播视频输入
- 真人口播视频标准化为 30fps 横版素材
- 中文底部字幕
- 透明线框 HUD
- 顶部栏目标签和右上 StepBadge
- 30 秒 / 60 秒 Creator Overlay recipe
- 证据截图位 `ProofScreenshotOverlay`
- Snapshot 优先验收
- 音频主时钟约束下的样片 render

## 项目主线

```text
文案 / 口播稿
→ 口播稿
→ 男声 TTS
→ 读取真实 TTS 音频时长
→ timeline.duration = 真实音频时长
→ 根据口播稿生成 caption beats
→ 根据 caption / semantic beats 生成 HUD segments
→ snapshot_at 从 segments 自动或一致生成
→ snapshot
→ inspect
→ render
```

兼容入口：

```text
已有真人口播视频
→ prepare:talking-head
→ 提取 / 标准化 audio master
→ 同样进入 audio master clock timeline
```

这两条入口最终都必须进入 audio master clock。`render` 必须在 `snapshot` 和 `inspect` 之后执行。

## 边界声明

- 这不是 `video-director-script` 那种完整多平台文案生成视频系统。
- 这不是复杂纯视觉短视频生成器。
- 这不是 V3 大 pipeline 的本地搬运版。
- 这也不是“只支持已有真人视频包装”的窄化系统。

## 方向说明

- `timeline.duration` 必须来自最终口播音频或 TTS 音频的真实时长。
- 字幕、HUD segments、`snapshot_at` 必须围绕真实音频时长生成。
- 当前阶段尚未完整实现 TTS 生成链路，TTS 是下一阶段能力。
- 现阶段已有真人口播视频只是兼容入口，不是项目唯一入口。

## 快速验证

```bash
npm run prepare:talking-head -- /path/to/talking-head.mov 60
npm run compile:creator60
cp AI_VIDEO_COMPONENT_LIBRARY/examples/creator_overlay_60s/compiled.timeline.json timeline.json
npm run validate
npm run validate:components
npm run validate:proof-assets
npm run validate:media-sync
npx hyperframes lint
npm run snapshot:creator60
npx hyperframes inspect
```

## Render

Snapshot 和 inspect 通过后再 render:

```bash
npx hyperframes render --quality standard --workers 1 --output outputs/samples/creator-overlay-v02-flow-through.mp4
```

## 产物管理

视频、音频、截图、snapshot、render 输出只保存在本地，不进入 Git。仓库只管理代码、规则、模板和检查脚本。

本地可自行生成:

- `outputs/samples/creator-overlay-v02-flow-through.mp4`
- `outputs/qa/render-frames/`

## 关键文档

- `.codex/project-rules.md`
- `docs/NARRATION_AUDIO_PIPELINE.md`
- `docs/ai-workflow/codex-usage.md`
- `docs/ai-workflow/verification-checklist.md`
- `docs/ai-workflow/hyperframes-hud-standard.md`
- `docs/ai-workflow/superdesign-keyframe-workflow.md`
- `docs/ai-workflow/mcp-browser-tools.md`
- `docs/ai-workflow/repomix-context-pack.md`
- `prompts/codex-engineering-startup-template.md`
- `VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/01_reference_image_taxonomy.md`
- `VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/07_reference_scoring_rubric.md`
- `VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/00_README.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/09_v02_flow_through_acceptance.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/10_product_delivery_checklist.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/12_snapshot_acceptance_rubric.md`

## V0.2 原则

先保证完整流程跑通，允许字幕、动画、音频存在 `1-2s` 以内误差。V0.3 再用 Whisper 中文转写做精细时间轴。
