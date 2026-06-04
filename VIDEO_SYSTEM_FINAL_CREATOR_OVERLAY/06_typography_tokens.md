# 06 Typography Tokens

## Fonts

- `--font-display-cn`: 中文大标题，粗、短、硬，优先系统黑体。
- `--font-mono-en`: 英文栏目标签、状态、编号，使用 monospace。

## Scale

| Token | Size | Use |
|---|---:|---|
| MegaNumber | 150-220px | 大数字、评分、金额、倍数 |
| MegaTitle | 96-150px | 短视频主标题 |
| HeroTitle | 72-108px | 段落主标题 |
| CardTitle | 40-64px | 卡片标题 |
| TopLabelEN | 24-34px | 左上英文栏目 |
| TopLabelCN | 20-30px | 左上中文栏目 |
| StepBadgeNumber | 44-68px | 右上步骤数字 |
| BottomSubtitleCN | 46-56px | 底部中文字幕 |

## Hard Rules

- 每个关键帧至少一个 MegaNumber / MegaTitle / HeroTitle。
- 整屏最大字号不能低于 64px。
- 主视觉标题必须明显大于底部字幕。
- 中文大标题字重 800-950。
- 英文标签必须有 letter-spacing。
- 大字必须有 text-shadow 或 stroke。
