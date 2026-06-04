# Video Director

AI 科技感口播视频包装系统。当前版本以 HyperFrames + HTML/CSS/GSAP 为底座，支持把真人口播视频包装成 Creator Overlay 样片。

## 当前能力

- 真人口播视频标准化为 30fps 横版素材
- 中文底部字幕
- 透明线框 HUD
- 顶部栏目标签和右上 StepBadge
- 30 秒 / 60 秒 Creator Overlay recipe
- 证据截图位 `ProofScreenshotOverlay`
- Snapshot 优先验收
- 60 秒样片 render

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
