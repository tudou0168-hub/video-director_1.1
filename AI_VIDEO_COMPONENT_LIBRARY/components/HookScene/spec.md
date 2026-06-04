---
component: HookScene
version: 0.2
---

# HookScene

## 用途

前 3 秒命中用户痛点或结果承诺，让用户感觉“你在说我”。

## 触发词

为什么、不是、卡住、赚不到、时间不够、学了很多、还是没有。

## 必填字段

- `caption_line`
- `emphasis_keyword`
- `component_props.headline`
- `component_props.subline`

## 布局

默认中心偏左，大字 + 关键词扫描线。TTS 模式可居中；真人模式只允许短暂居中或上方。

## 动效

`scale_blur_in -> keyword_flash -> soft_exit`

## 禁用

不要用来解释工具功能；HookScene 只能用于痛点、损失或结果。
