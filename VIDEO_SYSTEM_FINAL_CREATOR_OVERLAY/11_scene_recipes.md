# 11 Scene Recipes

## AI_Content_System_60s

| Time | Template | Components | Primary |
|---|---|---|---|
| 0-5s | Big Title Hook | TopSectionLabel + BigKineticTitle + BottomChineseSubtitle | 工具越多，越累 |
| 5-12s | OPTION_SPLIT_CARD | OptionSplitCard + StepBadge + BottomChineseSubtitle | 手动刷热点 vs Hermes 自动采集 |
| 12-20s | THREE_STEP_PIPELINE | ThreeStepPipeline + StepBadge + BottomChineseSubtitle | Hermes -> Obsidian -> llm-wiki |
| 20-28s | DETAILS_TABLE_OVERLAY | DetailsTableOverlay + ScoringDimensionPanel + BottomChineseSubtitle | 选题库 / 打分 / 9 维筛选 |
| 28-36s | MULTI_AGENT_COLLABORATION | MultiAgentPanel + MegaNumber + BottomChineseSubtitle | 多 Agent 协作 |
| 36-44s | MULTI_AGENT_COLLABORATION | MultiAgentPanel + StepBadge + BottomChineseSubtitle | AI 团队分工 |
| 44-52s | PROOF_SCREENSHOT_OVERLAY | ProofScreenshotOverlay + TopSectionLabel + BottomChineseSubtitle | 真实输出截图 |
| 52-60s | CTA_BIG_ENDING | CTABigEnding + BottomChineseSubtitle | 回复“系统”领取流程图 |

## Additional Recipes

- AI_Tool_Tutorial_60s: 安装、配置、API Key、部署、连接手机。
- Knowledge_Explainer_60s: Prompt、Agent、多模态、RAG、Workflow。
- Product_Proof_60s: 案例证明、市场验证、产品演示。

## JSON Fields

每段必须包含 `start`、`duration`、`layout`、`template`、`components`、`primaryText`、`subtitleCN`、`colorTheme`、`safeZone`、`motion`、`snapshotAt`。当前 60 秒样例使用 8 个关键帧：`1s / 6s / 14s / 24s / 32s / 40s / 48s / 56s`，确保主视觉变化间隔不超过 8 秒。
