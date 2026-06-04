# 04 Chinese Subtitle Rules

## Hard Rules

- 只允许中文字幕。
- 禁止英文字幕和双语字幕。
- 工具名可保留原名: `Hermes`、`Codex`、`HyperFrames`、`Obsidian`、`llm-wiki`。
- 字幕固定在 `BOTTOM_SUBTITLE_ZONE`。
- 字号 46-56px，字重 800+。
- 最多两行，每行尽量 8-18 个中文字。
- 字幕只辅助理解，不能替代主视觉大标题。

## Style

- 白字。
- 半透明黑色磨砂底，推荐 rgba alpha `0.18-0.28`。
- 圆角 16-22px。
- 边框极淡。
- text-shadow 必须存在。

## Motion

- entry: fade in 0.15s。
- active: stable，不做打字机。
- exit: fade out 0.12s。
- 可对关键词做轻微 pop，但不能影响阅读。

## Fail Conditions

- 出现英文翻译行。
- 字幕遮挡人脸或主 HUD。
- 字幕成为全片唯一信息层。
- 单行过长或字号低于 46px。
