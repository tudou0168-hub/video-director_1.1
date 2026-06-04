---
title: P008 Design System Master
version: 0.2
---

# P008 Design System Master

## 统一定位

普通人用 AI 解决现实问题的视频系统。视觉表达要服务于“少走弯路、节省时间、提高启动率”，不是展示工具列表。

## Master Tokens

```yaml
style: ai-native-editorial-hud
surface: dark-technical
accent: cyan-green
density: medium-high
caption_language: zh
caption_safe_zone: bottom_180px
corner_radius: 8px
```

## Master Rules

- 使用暗色技术底，但避免纯黑和紫蓝 AI 渐变。
- UI 面板像“运行状态”，不是静态 PPT 卡片。
- 每个组件必须有状态变化：扫描、计数、激活、验证、完成。
- 每个视频只选择一种主情绪：焦虑拆解、效率提升、流程可信、结果承诺。

## Overrides

- `pages/tts-video.md`：更允许中心大字、全幅流程、强节奏转场。
- `pages/talking-head-hud.md`：优先保护人物，HUD 退到侧边和角落。
