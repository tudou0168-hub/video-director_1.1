---
title: P008 Video Design System
version: 0.2
product_id: P008
---

# P008 Video Design System

## Visual Position

P008 的视频不是 AI 教程字幕片，也不是纯 HUD 炫技片。它的画面应该像“普通人正在使用一套 AI 内容操作系统”：清晰、可信、有科技感、能快速看懂。

## Style Tokens

```yaml
canvas:
  width: 1920
  height: 1080
  fps: 30
colors:
  bg: "#05070b"
  surface: "rgba(9, 16, 30, 0.78)"
  surface_strong: "rgba(15, 23, 42, 0.86)"
  text: "#f8fafc"
  muted: "#94a3b8"
  cyan: "#67e8f9"
  green: "#35f59a"
  amber: "#fbbf24"
  danger: "#fb7185"
type:
  display: "sans-serif"
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
radius:
  panel: 8
  chip: 999
spacing:
  safe_edge: 96
  caption_bottom: 74
  caption_height: 132
```

## Layout Rules

- 字幕固定在底部安全区，HUD 主信息不进入底部 180px。
- 真人口播默认把 HUD 放在人物反侧，无法判断人脸位置时使用右侧栏和上角模块。
- TTS 视频可以使用中部大字、全幅流程、左右对比，但每屏只保留一个主焦点。
- 数字必须配视觉重量：进度条、扫描线、计数、状态灯，不能只放一个数字。
- 面板圆角控制在 8px 内，避免“模板卡片堆叠感”。

## Do

- 用真实痛点做 Hook。
- 用数字、流程、验证状态增强可信度。
- 每个 scene 至少有背景层、中景信息层、前景强调层。
- 保持中文大字可读，标题不小于 54px，字幕不小于 42px。

## Don't

- 不用紫蓝渐变白底做默认 AI 风。
- 不让所有元素居中同权重。
- 不堆 6 个以上仪表盘小卡片。
- 不用英文字幕翻译中文口播。
- 不做电竞 RGB、过载霓虹、廉价故障风。
