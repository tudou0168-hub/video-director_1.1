---
title: P008 Talking Head HUD Override
version: 0.2
---

# Talking Head HUD Override

## 适用

真人口播视频 -> HUD 动画叠加 -> 中文字幕增强。

## 画面策略

- 人是主角，HUD 是解释层。
- 字幕固定底部，HUD 避开底部 180px。
- 默认侧边栏、上角卡片、半透明状态条。
- 痛点和 CTA 可以短暂居中，但不能遮挡脸和手。

## 安全区

```json
{
  "caption": "bottom_180px",
  "face": "manual_or_detected",
  "hands": "manual_or_detected",
  "preferred_hud": "opposite_side"
}
```

## 限制

- 不在人物嘴部和眼部区域放文字。
- 不把真人画面压暗到看不清表情。
- 不用连续高密度 HUD 抢口播注意力。
