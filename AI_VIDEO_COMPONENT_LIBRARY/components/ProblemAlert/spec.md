---
component: ProblemAlert
version: 0.2
---

# ProblemAlert

## 用途

放大损失、卡点和错误努力，让用户明确“我为什么一直没结果”。

## 触发词

焦虑、无力、没反馈、对不上、启动不了、越学越乱、第二份工作。

## 必填字段

- `caption_line`
- `component_props.problem`
- `component_props.loss`

## 布局

侧边警报面板或左下信息条。真人模式默认人物反侧。

## 动效

`alert_flash -> border_scan -> settle`

## 禁用

不要连续使用超过 2 次，避免压迫感过强。
