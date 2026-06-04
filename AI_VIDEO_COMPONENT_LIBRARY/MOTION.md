---
title: P008 Motion System
version: 0.2
product_id: P008
---

# P008 Motion System

## 主时钟

- `article_tts`：TTS 音频是主时钟。
- `talking_head_overlay`：原始口播视频音轨是主时钟。
- GSAP timeline 必须 `{ paused: true }`，由 HyperFrames runtime 控制播放。
- 禁止手动调用 `play()`、`pause()`、`currentTime`。

## 节奏曲线

| 时间段 | 密度 | 规则 |
|---|---|---|
| 0-15s | high | 每 2 秒有视觉变化，必须出现痛点或结果 |
| 15-18s | low | 呼吸缓冲，减少信息量 |
| 18-45s | medium | 每 3-5 秒切换流程、卡片、对比或证据 |
| 45-55s | high | 视觉高潮，3 个以上模块联动 |
| 结尾 | medium | 关键词、免费步骤、付费结果 |

## 组件生命周期

`appear -> active -> react -> exit`

- appear：0.35-0.55s，slide/scale/blur 组合。
- active：1.2-3s，包含扫描线、数字滚动、状态灯、细微漂移。
- react：关键词出现后 0.2-0.5s 强调。
- exit：0.25-0.45s，退出要比进入更快。

## 动效映射

| 语义 | 动效 |
|---|---|
| 痛点 | alert flash、shake 1 次、红/琥珀边框 |
| 数字 | count-up、progress fill、pulse |
| 流程 | step cascade、line draw、node activate |
| 证据 | check sweep、stamp、green glow |
| CTA | focus ring、keyword zoom、soft pulse |

## 禁止

- 禁止所有模块串行动画排队。
- 禁止画面静止超过 5 秒。
- 禁止动画直接改变 video 元素宽高位置；真人视频缩放必须动画 wrapper。
- 禁止为了炫技使用与语义无关的转场。
