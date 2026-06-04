---
title: P008 TTS Video Override
version: 0.2
---

# TTS Video Override

## 适用

文案 -> TTS -> 动画视频。

## 画面策略

- 可以使用中心大字和全幅 HUD。
- Hook 段用 `HookScene + ProblemAlert` 连续打痛点。
- 中段用 `AgentDashboard` 展示流程。
- 结尾用 `TopicCard` 或 CTA 样式承接免费领取/付费结果。

## 限制

- 不做纯文字 PPT。
- 每个 segment 都必须触发组件状态变化。
- 画面不能依赖真人画面提供信任感，必须靠流程、证据和判断标准建立可信度。
