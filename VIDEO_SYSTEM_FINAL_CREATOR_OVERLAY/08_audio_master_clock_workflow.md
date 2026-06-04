# Audio Master Clock Workflow

## 原则

真人口播模式里，音频是主时钟。视频、字幕、HUD 动画都必须贴着同一条音频时间轴走。

## 标准流程

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

## 输出文件

| 文件 | 作用 |
|---|---|
| `assets/talking-head-real.mp4` | 30fps 带音频参考文件 |
| `assets/talking-head-input.mp4` | HyperFrames 使用的视频层 |
| `assets/talking-head-audio-master.wav` | 音频主时钟，PCM 格式，和 timeline 时长对齐 |

## 为什么要拆音视频

- 视频层只负责画面，不让原视频音轨和单独音频重复播放。
- 音频层单独清洗、压响度、裁切时长。
- HyperFrames snapshot/render 时只跟一条音频主时钟对齐。

## 中文转写规则

如果需要从真人音频生成字幕，必须使用中文转写:

```bash
whisper-cli -m /path/to/ggml-small.bin -l zh -oj -osrt -of transcripts/talking-head-60s assets/talking-head-audio-master.wav
```

不要使用 `.en` 模型，不要输出英文翻译字幕。

## 验收标准

- V0.2 先跑通流程，`timeline.duration`、视频时长、音频时长误差允许 `1-2s`。
- V0.3 再进入精修，把音画同步误差收紧到 `0.08s` 以内。
- 字幕只保留中文，工具名可保留 `Hermes`、`Codex`、`HyperFrames`。
- 抽查 `0s / 3s / 15s / 30s / 45s / CTA`，字幕和口播语义一致。
- 正式 render 前必须通过 `npm run validate:media-sync`。
