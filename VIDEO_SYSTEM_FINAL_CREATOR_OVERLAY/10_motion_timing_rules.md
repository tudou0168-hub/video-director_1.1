# 10 Motion Timing Rules

## Global

- 每个模块必须绑定口播句子。
- 口播开始前 0.15s 入场。
- 关键词出现时 active。
- 句子结束后 0.2-0.4s 退出。
- 每 5-8s 切换一个主视觉模块。
- 每 2-3s 可有小状态变化。
- 同屏最多 3 个主要 overlay 组。
- BottomChineseSubtitle 全程跟随口播。

## Component Motion

- TopSectionLabel: slide from left + fade, subtle glow, fade.
- StepBadge: scale pop, glow pulse, fade upward.
- BigKineticTitle: blur reveal + scale 0.92 to 1, keyword glow, fade upward.
- MegaNumber: count-up + scale pop, glow pulse, fade.
- OptionSplitCard: left/right slide, border pulse, fade + blur.
- ThreeStepPipeline: node stagger, current node pulse, arrows draw, fade.
- DebugWindowOverlay: expand, message stagger, collapse.
- ProofScreenshotOverlay: drop in + slight rotate, shadow pulse, slide out.
- BottomChineseSubtitle: fade in, stable, fade out.

## Forbidden

过度 glitch、随机闪烁、赛博朋克爆炸、复杂粒子、影响阅读的逐字打字机、所有元素同时动。
