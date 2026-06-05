# Creator Overlay Pro

`video-director_1.1` 是 `creator_overlay` 驱动的 Creator Overlay 系统，也是 `Creator Overlay Pro` 的本地主干。

它的目标不是做通用文案生成视频系统，而是稳定把口播稿 / TTS / 真人口播音频驱动的内容包装成可复用、可验证、可交付的中文 Creator Overlay 样片。当前主线是 `creator_overlay / tts_preview`，`talking_head` 只是兼容入口，不是主线。

## 当前能力

- 文案 / 口播稿输入
- 已有真人口播视频输入
- 文案 / 口播稿 / TTS 音频主时钟 / 真人口播音频主时钟
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
final_narration.md
→ tts:narration
→ validate:tts-result
→ compile:audio-master-timeline
→ validate:audio-master-timeline
→ promote:audio-master-timeline
→ snapshot:audio-master
→ inspect
→ render:audio-master
```

兼容入口：

```text
已有真人口播视频
→ prepare:talking-head
→ 提取 / 标准化 audio master
→ 同样进入 audio master clock timeline
```

这两条入口最终都必须进入 audio master clock。`render` 必须在 `snapshot` 和 `inspect` 之后执行。`talking-head` 只是兼容入口，不是必需资产；在 `tts_preview` 模式下，`media.video` 可以为空或由占位背景承担，但视觉逻辑仍然保持 Creator Overlay 侧边叠层，而不是全屏信息视频。

## 边界声明

- 这不是 `video-director-script` 那种完整多平台文案生成视频系统。
- 这不是复杂纯视觉短视频生成器。
- 这不是 `video-director-script` 的全画布信息视频主线。
- 这不是 V3 大 pipeline 的本地搬运版。
- 这也不是“只支持已有真人视频包装”的窄化系统。

## 方向说明

- `timeline.duration` 必须来自最终口播音频或 TTS 音频的真实时长。
- 字幕、HUD segments、`snapshot_at` 必须围绕真实音频时长生成。
- 当前阶段尚未完整实现通用口播改写到最终口播稿的完整内容工厂，但 TTS 音频主线已经具备最小接入能力。视觉主线始终是 `creator_overlay`，不是全屏信息视频。
- 现阶段已有真人口播视频只是兼容入口，不是项目唯一入口；`tts_preview` 只是无真人视频时的预览壳，不是新的全画布主线。

## 快速验证

```bash
npm run tts:narration
npm run validate:tts-result
npm run compile:audio-master-timeline
npm run validate:audio-master-timeline
npm run promote:audio-master-timeline:dry-run
npm run validate:timeline-contract
npm run check:creator-overlay
npm run validate
npm run validate:components
npm run snapshot:audio-master
npx hyperframes inspect
```

### 兼容入口

已有真人口播视频仍可通过 `prepare:talking-head` 标准化后进入同一条 audio master clock 主线。

```bash
npm run prepare:talking-head -- /path/to/talking-head.mov 60
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
