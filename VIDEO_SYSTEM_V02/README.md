---
title: P008 Video System V0.2
version: 0.2
product_id: P008
---

# P008 Video System V0.2

V0.2 把原来的“双模式时间轴模板”升级为“组件库 + 规则编译器 + 质检流程”。

## 组成

- `AI_VIDEO_COMPONENT_LIBRARY/`：组件库和规则编译器。
- `timeline.schema.json`：时间轴字段规范。
- `index.html`：组件驱动 Runtime。
- `scripts/validate-timeline.mjs`：基础时间轴校验。

## 验收

- 能从文案生成 `storyboard.json` 和 `timeline.json`。
- 能通过 timeline 与组件校验。
- 能通过 HyperFrames lint/inspect。
- 能渲染出 60 秒横版样例。

## 商业化定位

免费层提供分镜检查清单和样例说明。付费层交付完整工程、组件库、规则编译器、新手安装教程和排障清单。
