---
title: Transparent HUD Style
version: 0.1
product_id: P008
---

# Transparent HUD Style

## CSS Tokens

```css
:root {
  --creator-hud-bg: rgba(8, 12, 20, 0.10);
  --creator-hud-bg-light: rgba(8, 12, 20, 0.06);
  --creator-hud-border: rgba(103, 232, 249, 0.72);
  --creator-hud-border-green: rgba(53, 245, 154, 0.72);
  --creator-hud-border-yellow: rgba(251, 191, 36, 0.76);
  --creator-subtitle-bg: rgba(17, 17, 20, 0.30);
}
```

## Component Rules

- `TopSectionLabel`：无背景或极轻背景，左侧竖线，固定左上。
- `StepBadge`：右上透明线框胶囊，数字或状态高亮。
- `BigKineticTitle`：大中文标题，靠字号、阴影和语义色成为主视觉。
- `OptionSplitCard`：左右线框卡，中间 OR，背景几乎透明。
- `ThreeStepPipeline`：线框节点、箭头、当前节点发光。
- `BottomChineseSubtitle`：底部磨砂黑底，中文大字。

## Failure Conditions

- 背景不透明。
- 字号太小。
- 卡片比人物更重。
- 线框不清晰。
- 人脸被遮挡。
