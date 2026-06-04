# 09 Component Upgrade Specs

## Required Components

TopSectionLabel, StepBadge, MegaNumber, BigKineticTitle, OptionSplitCard, ThreeStepPipeline, DebugWindowOverlay, ProofScreenshotOverlay, ScoringDimensionPanel, DetailsTableOverlay, MultiAgentPanel, TermExplainerPanel, ViralSourceCarousel, APIHandoffCard, PhoneIntegrationCards, CTABigEnding, BottomChineseSubtitle.

## Upgrade Old Components

- HookScene -> TopSectionLabel + BigKineticTitle + MegaNumber.
- KPIWidget -> MegaNumber + BarChart + ProofLabel.
- AgentDashboard -> ThreeStepPipeline / MultiAgentPanel.
- SubtitleSystem -> BottomChineseSubtitle.
- TopicCard -> 只能做辅助，不能作为主视觉。

## Component Contract

每个组件必须声明:

- 用途
- 输入字段
- 推荐位置
- 禁止位置
- entry / active / exit animation
- CSS token
- motion timing
- snapshot 验收
- 失败条件

## Hard Rules

- HUD 背景几乎透明。
- 框线清晰，发光克制。
- 文字要大。
- 颜色语义明确。
- 避开人脸。
- 跟随口播出现和退出。
- 不允许无意义常驻。
