---
title: P008 V0.2 Reference Extraction Report
version: 0.2
product_id: P008
updated: 2026-05-26
---

# P008 V0.2 Reference Extraction Report

## 结论

这些外部参考不是用来复制视觉外观的，而是用来建立一套可执行的视频生产约束：

`文案/口播 -> 问题识别 -> 分镜导演 -> 组件选择 -> timeline.json -> HyperFrames 渲染 -> 抽帧质检 -> 产品化交付`

P008 V0.2 的重点不是“更炫”，而是让每条视频都稳定做到：

- 前 3 秒命中一个现实问题。
- 中文字幕清楚，不混英文翻译。
- 每 2-5 秒有一个语义驱动的视觉变化。
- HUD 不遮挡人脸、手势、字幕。
- Codex 按组件库和触发规则组合，不自由堆特效。

## 可吸收规则

| 来源 | 吸收内容 | 落地到 P008 | 禁止做法 |
|---|---|---|---|
| VoltAgent/awesome-design-md | DESIGN.md、设计 token、Do/Don't、AGENTS/DESIGN 分工 | 建立 DESIGN/MOTION/COMPONENTS/STORYBOARD 规则文档 | 复制品牌视觉或做仿站库 |
| frontend-slides | 单 HTML、16:9、反 AI 味、动效和情绪绑定 | 建立风格选择器、反 AI 味检查、单文件可交付模板 | 做成 PPT 工具或滚动页面 |
| ui-ux-pro-max-skill | Master + Overrides、风格推理、反模式过滤 | 建立 MASTER + tts/talking-head 页面 override | 引入 React/Tailwind 多端复杂度 |
| HyperFrames | plain HTML/CSS/GSAP、data-*、paused timeline、lint/inspect/render | Runtime 保持 HyperFrames 原生机制 | 手动 play/pause/currentTime，直接动画 video 元素尺寸 |
| HyperFrames Launch Storyboard | beat-by-beat 导演稿、概念/情绪/镜头/SFX | 渲染前必须产出 storyboard.json/storyboard.md | 纯炫技、脱离问题解决号 |

## P008 专属原则

1. 先解决用户问题，再展示技术能力。
2. 组件为语义服务：痛点、数字、流程、证据、CTA。
3. 动画跟音频走，所有触发点写进时间轴。
4. 视觉要像“运行中的 AI 操作系统”，但不能像廉价赛博模板。
5. 付费资产交付的不是炫酷效果，而是少走时间轴、字幕、HUD 遮挡、组件选择这几段弯路。

## V0.2 最小闭环

- 6 个核心组件：HookScene、ProblemAlert、TopicCard、KPIWidget、AgentDashboard、SubtitleSystem。
- 3 个注册表：component-registry、trigger-rules、scene-recipes。
- 2 个样例：TTS 讲解、真人口播 HUD。
- 2 个校验脚本：timeline 校验、组件使用校验。
- 1 个可渲染 Runtime：index.html 从 timeline 读取组件字段并渲染。
