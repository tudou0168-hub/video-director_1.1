---
component: KPIWidget
version: 0.2
---

# KPIWidget

## 用途

展示时间、效率、数量、收入、转化等数字，让抽象结果可视化。

## 触发词

数字、分钟、小时、天、倍、百分比、收入、播放、下载、购买。

## 必填字段

- `component_props.value`
- `component_props.label`
- `component_props.unit`

## 布局

左侧大数字或三联指标。每屏最多 3 个 KPI。

## 动效

`count_up -> progress_fill -> pulse`

## 禁用

不用饼图、多轴图、6 宫格 dashboard。
