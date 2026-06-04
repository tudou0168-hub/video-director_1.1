# V0.2 Flow-Through Acceptance

## 当前目标

V0.2 的目标不是做到最终级音画精修，而是让完整链路先跑通:

`真人口播素材 -> 标准化音视频 -> 60s timeline -> 证据截图位 -> snapshot -> inspect`

## 已跑通命令

```bash
npm run prepare:talking-head -- /Users/muzi/Downloads/IMG_8136.mov 60
npm run compile:creator60
cp AI_VIDEO_COMPONENT_LIBRARY/examples/creator_overlay_60s/compiled.timeline.json timeline.json
npm run validate
npm run validate:components
npm run validate:proof-assets
npm run validate:media-sync
npx hyperframes lint
npm run snapshot:creator60
npx hyperframes inspect
```

## 验收结果

- 真人视频已标准化为 `assets/talking-head-input.mp4`
- 音频主时钟已生成: `assets/talking-head-audio-master.wav`
- 60 秒 timeline: 通过
- 组件注册表: 通过
- 证据资产路径: 通过，当前仍为演示截图 `DEMO_RENDER_SNAPSHOT`
- 媒体同步: 通过，V0.2 允许 `1-2s` 误差
- HyperFrames lint: `0 errors, 0 warnings`
- Snapshot: 7 张关键帧已生成
- Inspect: `0 layout issues`

## 当前保留问题

| 问题 | V0.2 处理 | V0.3 处理 |
|---|---|---|
| 音频/字幕/动画存在 1-2s 以内误差 | 允许，先保证流程闭环 | 用 Whisper 中文转写重新生成精确 timeline |
| 证据图仍是演示截图 | 允许用于模板验证 | 替换为 Hermes/Obsidian/llm-wiki/台账真实截图 |
| 口播文本与 HUD 文案不是逐字对齐 | 允许，先做语义级同步 | 按真实转写字幕逐句切 segment |
| 未 render 正片 | 暂不强求 | Snapshot 通过后再 render 60 秒样片 |

## V0.2 结论

流程已经走通，可以进入“先产出可看样片”的阶段。下一步不再继续扩规则，而是:

1. 替换真实截图资产。
2. 用真实转写字幕生成更贴近口播的 timeline。
3. Render 一条 60 秒横版样片。
4. 抽帧和听感检查后再做 V0.3 精修。
