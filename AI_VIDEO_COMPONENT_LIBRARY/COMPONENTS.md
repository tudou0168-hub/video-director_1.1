---
title: P008 Component Library
version: 0.2
product_id: P008
---

# P008 Component Library

## 首批组件

| component | 用途 | 触发 |
|---|---|---|
| HookScene | 开头强钩子和结果承诺 | 为什么、不是、卡住、赚不到、时间不够 |
| ProblemAlert | 放大痛点和损失 | 焦虑、无力、没反馈、对不上、启动不了 |
| TopicCard | 主题解释和核心观点 | 正确做法、核心、关键、方法 |
| KPIWidget | 数字、时间、效率、收益 | 数字、分钟、小时、倍、百分比 |
| AgentDashboard | 工具链、流程、系统运行感 | Hermes、Obsidian、llm-wiki、Codex、HyperFrames |
| SubtitleSystem | 全片中文字幕 | 所有 segments |

## 字段契约

每个 segment 至少包含：

```json
{
  "start": 0,
  "end": 3,
  "text": "用户原句",
  "caption_line": "中文字幕",
  "component": "HookScene",
  "component_props": {},
  "layout_slot": "center",
  "density": "high",
  "animation": "scale_blur_in",
  "emphasis_keyword": "关键词"
}
```

兼容旧字段：`visual_module` 会被映射到对应 component。

## 选择顺序

1. 先判断文案语义：痛点、数字、流程、证据、CTA。
2. 再选组件。
3. 再选布局位置。
4. 最后选动画。

不要先想“用什么特效”，要先问“这句话要让用户看懂什么”。
