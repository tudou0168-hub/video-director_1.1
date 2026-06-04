# HyperFrames HUD Standard

## Positioning

This project creates Chinese Creator Overlay videos for AI content systems, agent workflows, and practical self-media operations.

The visual style is:

```text
dark talking-head video
+ transparent line-frame HUD
+ large Chinese title
+ top section label
+ top-right StepBadge
+ semantic color
+ bottom Chinese captions
+ timeline-driven entry / active / exit motion
```

## HUD Visual Standard

- HUD background alpha: `0.04-0.12`.
- Prefer borders, glow, line frames, large type, and semantic color.
- Avoid large solid panels.
- Avoid thick dashboard cards.
- One keyframe should have one primary visual center.

## Recording Standard

- Face must be clear.
- Background should be slightly darker than the speaker.
- Leave usable negative space for overlays.
- Avoid bright white walls and messy backgrounds.
- Hands may briefly pass through HUD but must not block long text.

## Subtitle Standard

- Chinese only.
- No English translation subtitles.
- Tool names can keep original names, such as `Codex`, `Hermes`, `HyperFrames`.
- Bottom captions should not replace the main visual title.

## Motion Timeline

Every module needs:

1. Entry: fade, slide, blur reveal, scale pop.
2. Active: subtle pulse, glow, scan, number change, focus.
3. Exit: fade, lift, shrink, or de-emphasis.

Motion must follow the audio/timeline clock, not random CSS delays.

## Forbidden

- React/Vue as the main video runtime.
- Fake screenshots.
- Bilingual captions.
- Thick dashboard fill.
- Covering the face.
- Rendering before snapshot and inspect.

## Copyable Video Prompt Template

```text
生成一个中文 AI 科技感口播包装视频。

主体：真人口播，人物清晰，背景略暗。
场景：室内工作区，带弱科技氛围，但不要花哨。
镜头：横版 1920x1080，人物偏左/偏右，给 HUD 留空间。
HUD：透明线框，低透明度背景，蓝/绿/黄/红/紫按语义使用。
主视觉：每 5-8 秒出现一次大中文标题、对比卡、流程卡、评分表、证据截图或 CTA。
字幕：底部纯中文字幕，不要英文翻译。
动效：每个模块都有入场、停留强调、退出，跟随口播时间轴。
节奏：前 3 秒命中痛点，中段给流程和证据，结尾给结果型 CTA。
禁止：厚重 Dashboard、实心大卡片、遮挡人脸、英文字幕、伪造平台截图、无意义常驻 HUD。
```
