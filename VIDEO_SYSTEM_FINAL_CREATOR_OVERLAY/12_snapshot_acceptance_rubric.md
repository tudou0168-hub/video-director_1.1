---
title: Snapshot Acceptance Rubric
version: 0.7
product_id: P008
---

# Snapshot Acceptance Rubric

满分 100，每张 snapshot 单独评分，任一关键帧低于 85 不 render。

## V07 Visual Impact Rules

- 每张 snapshot 必须至少有一个 90px 以上中文主视觉。
- 开场、误区、结尾必须有 120px 以上 MegaTitle 或 MegaNumber。
- 小卡片不能作为主视觉，TopicCard 只能辅助。
- A/B 对比必须占画面宽度 55%-75%。
- ThreeStepPipeline 节点文字不低于 34px。
- DetailsTableOverlay 表格文字不低于 32px。
- 中文字幕字号 48-56px，字重 800+。
- 左侧必须承担主视觉，右上角只放 StepBadge / 小状态。
- 每张 snapshot 必须有“第一眼答案”。

| item | score |
|---|---:|
| 第一眼答案明确 | 20 |
| 90px+ 中文主视觉，关键帧 120px+ | 20 |
| 左侧主视觉空间被充分使用 | 15 |
| 组件结构足够大，不是小 HUD 装饰 | 15 |
| HUD 透明线框有力量，不是厚卡片 | 10 |
| 色彩语义有对比 | 8 |
| 人脸无遮挡 | 7 |
| 底部纯中文字幕清晰 | 5 |

## One-Vote Failures

- 没有大标题。
- 没有顶部栏目标签。
- 没有底部中文字幕。
- 出现英文翻译字幕。
- 全是小卡片。
- 卡片背景太厚。
- 主视觉只在右上角。
- A/B、流程、表格小到需要细看。
- 像 PPT、会议字幕或厚 Dashboard。
- 没有 snapshot 检查直接 render。

## Snapshot Points

30 秒小样：

- `1s`
- `6s`
- `14s`
- `22s`
- `29s`

60 秒样例：

- `1s`
- `8s`
- `15s`
- `21s`
- `29s`
- `36s`
- `43s`
- `50s`
- `57s`
