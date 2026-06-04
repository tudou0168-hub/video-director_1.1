---
title: Layout Safe Zones
version: 0.1
product_id: P008
---

# Layout Safe Zones

横屏基准：`1920x1080`。

## Zones

| zone | x | y | use |
|---|---:|---:|---|
| TOP_LEFT_LABEL_ZONE | 48-720 | 55-140 | TopSectionLabel |
| TOP_RIGHT_STATUS_ZONE | 1280-1840 | 55-170 | StepBadge |
| LEFT_HERO_ZONE | 55-760 | 150-680 | MegaTitle / MegaNumber |
| CENTER_OVERLAY_ZONE | 360-1500 | 170-700 | Pipeline / table |
| RIGHT_PROOF_ZONE | 1050-1820 | 170-720 | screenshot / proof |
| BOTTOM_SUBTITLE_ZONE | 360-1560 | 820-1015 | BottomChineseSubtitle |
| FACE_CRITICAL_ZONE | 720-1180 | 180-560 | 禁止长文本 |
| HAND_DYNAMIC_ZONE | 650-1350 | 520-820 | 允许短动效经过 |

## Default Talking Head Layout

- 如果人物在左侧，HUD 放右侧。
- 如果人物中偏右，主标题放左侧。
- 字幕永远在底部安全区。
- 背景可以覆盖，但不能遮挡脸和长时间遮挡手势。
