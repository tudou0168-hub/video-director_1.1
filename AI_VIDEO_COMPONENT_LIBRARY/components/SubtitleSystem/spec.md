---
component: SubtitleSystem
version: 0.2
---

# SubtitleSystem

## 用途

全片中文字幕系统。

## 规则

- 只保留中文；AI、HUD、TTS、Codex、Hermes、HyperFrames、timeline 可保留。
- 每行 8-16 个中文字优先，最长不超过 22 个中文字。
- 底部居中，背景半透明高对比。
- 不遮挡 HUD 主信息。

## 动效

`caption_cut_in -> hold -> caption_cut_out`

## 禁用

不要生成英文翻译字幕，不用花哨字体，不用低对比描边。
