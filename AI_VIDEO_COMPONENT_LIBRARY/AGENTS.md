---
title: P008 Agent Instructions
version: 0.2
product_id: P008
---

# P008 Agent Instructions

## 你在构建什么

你在构建一个中文内容视频自动化模板：把公众号文章、短视频口播稿或 Whisper 中文字幕，编译成 HyperFrames 可渲染的科技感 HUD 视频。

## 必须遵守

- 先读 `DESIGN.md`、`MOTION.md`、`COMPONENTS.md`、`STORYBOARD_RULES.md`。
- 不使用 React、Vue、TSX 作为主线。
- 不复制外部项目品牌视觉。
- 不生成英文翻译字幕。
- 不手动控制媒体播放。
- 真人视频模式不遮挡人脸、手势和底部字幕。

## 实施顺序

1. 分析文案：痛点、数字、流程、证据、CTA。
2. 生成 storyboard。
3. 按 registry 选择组件。
4. 生成 timeline。
5. 校验 timeline 和组件使用。
6. 渲染并抽帧检查。

## 质量标准

用户看完应该觉得：这不是在教工具，而是在帮我少走弯路。
