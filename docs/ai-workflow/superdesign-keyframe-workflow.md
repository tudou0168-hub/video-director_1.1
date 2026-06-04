# SuperDesign Keyframe Workflow

SuperDesign is treated as a keyframe planning workflow, not a required project dependency.

## Goal

Before rendering a full HyperFrames video, define what the important frames should look like. This keeps Codex from creating a technically valid video that still feels generic.

## Required 60s Keyframes

Use these checkpoints for the current Creator Overlay sample:

| Time | Visual Intent | Required Module |
|---|---|---|
| `1s` | 痛点命中，大中文标题 | `BigKineticTitle` |
| `6s` | 两种路径对比 | `OptionSplitCard` |
| `14s` | 三步系统流程 | `ThreeStepPipeline` |
| `24s` | 选题 / 评分 / 表格证明 | `DetailsTableOverlay` |
| `32s` | 多 Agent 协作 | `MultiAgentPanel` |
| `40s` | 团队分工或流程深化 | `MultiAgentPanel` / `KPIBigNumberOverlay` |
| `48s` | 真实输出证明 | `ProofScreenshotOverlay` |
| `56s` | 结果型 CTA | `CTABigEnding` |

## Keyframe Brief Template

```text
视频主题：
目标用户：
用户痛点：
目标结果：

关键帧：
- 时间：
- 主视觉：
- 中文标题：
- HUD 模块：
- 语义色：
- 人脸安全区：
- 字幕：
- 禁止项：
```

## Visual Acceptance

Each keyframe must pass:

- One clear visual center.
- Large Chinese title or number is readable on mobile.
- TopSectionLabel is visible.
- StepBadge/status is visible.
- HUD is transparent line-frame.
- Face and bottom subtitle are not covered.
- No English translation subtitle.
- No fake platform screenshot.

## Handoff To HyperFrames

Convert approved keyframes into `timeline.json` fields:

- `template`
- `component`
- `component_props`
- `components`
- `safe_zone`
- `animation`
- `snapshotAt`

Then run `npm run snapshot:creator60` and compare `snapshots/contact-sheet.jpg` with the keyframe brief.

## Artifact Rule

Generated keyframe images, screenshots, and design drafts stay local only. Do not commit them to Git.
