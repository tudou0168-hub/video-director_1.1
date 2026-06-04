# 07 Color Semantics

## Variables

| Variable | Use | Components |
|---|---|---|
| `--blue-info` | 工具、流程、技术、Agent 信息 | TopSectionLabel, ThreeStepPipeline |
| `--green-success` | 完成、正向结果、Done | StepBadge, active node |
| `--yellow-value` | 钱、产品、价值、结果、KPI | CTABigEnding, MegaNumber |
| `--red-warning` | 错误、风险、反面 | ProblemAlert |
| `--purple-agent` | 多 Agent、辅助模块、复合能力 | MultiAgentPanel |
| `--black-card` | 透明 HUD 底色 | all HUD |
| `--subtitle-bg` | 中文字幕底板 | BottomChineseSubtitle |

## Hard Rules

- 颜色必须服务语义，不随机上色。
- 同屏强调色不超过 3 个。
- 主色优先蓝、绿、黄。
- 红色只用于风险、警告、错误、反面。
- 紫色只用于多 Agent 或辅助信息。

## Recommended CSS

```css
--blue-info: #67e8f9;
--green-success: #35f59a;
--yellow-value: #fbbf24;
--red-warning: #fb7185;
--purple-agent: #c084fc;
--black-card: rgba(8, 12, 20, 0.04);
--subtitle-bg: rgba(17, 17, 20, 0.22);
```
