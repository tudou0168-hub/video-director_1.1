---
title: P008 AI Video Component Library
version: 0.2
product_id: P008
---

# P008 AI Video Component Library

这是 P008 V0.2 的视频组件库。它的目标不是让 Codex 随机写酷炫动画，而是让 Codex 按规则把文案编译成可渲染的视频结构。

## 工作流

```text
文案/字幕
-> compile-storyboard
-> storyboard.json
-> timeline.json
-> index.html runtime
-> HyperFrames render
-> lint/inspect/抽帧检查
```

## 核心文件

| 文件 | 作用 |
|---|---|
| `REFERENCE_EXTRACTION_REPORT.md` | 外部参考项目提炼报告 |
| `DESIGN.md` | 画面风格规则 |
| `MOTION.md` | 动效和音画同步规则 |
| `COMPONENTS.md` | 组件选择规则 |
| `STORYBOARD_RULES.md` | 文案到分镜规则 |
| `RENDER_CHECKLIST.md` | 发布前检查 |
| `registry/*.json` | 组件注册表、触发规则、场景配方 |
| `scripts/compile-storyboard.mjs` | 文案到 storyboard/timeline |
| `scripts/validate-component-usage.mjs` | timeline 组件使用校验 |

## 快速运行

```bash
node AI_VIDEO_COMPONENT_LIBRARY/scripts/compile-storyboard.mjs
npm run validate
npm run validate:components
npx hyperframes lint
npx hyperframes inspect
npx hyperframes render --quality high --workers 1
```

## Creator Overlay 30 秒小样

最终口播包装系统先跑 snapshot，不直接 render：

```bash
npm run compile:creator30
cp AI_VIDEO_COMPONENT_LIBRARY/examples/creator_overlay_30s/compiled.timeline.json timeline.json
npm run validate
npm run validate:components
npx hyperframes lint
npm run snapshot:creator30
npx hyperframes inspect
```

验收规则见 `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/12_snapshot_acceptance_rubric.md`。平均分低于 85，不进入 render。

## 真人口播输入规范

- 默认输入文件：`assets/talking-head-input.mp4`
- 默认主时钟音频：`assets/talking-head-audio-master.wav`
- 构图建议：人物在左侧或中偏左，右侧留白给 HUD
- HUD 规则：真人模式优先透明底、线框感、中文底部字幕
- 关键帧规则：必须把输入视频重编码为 30fps 且 `-g 30 -keyint_min 30 -sc_threshold 0`

推荐先跑标准化脚本：

```bash
npm run prepare:talking-head -- /Users/muzi/Downloads/IMG_8136.mov 60
npm run validate:media-sync
```

脚本会生成:

- `assets/talking-head-real.mp4`: 带音频的 30fps 参考文件
- `assets/talking-head-input.mp4`: HyperFrames 使用的视频层
- `assets/talking-head-audio-master.wav`: 音频主时钟，PCM 格式用于减少编码时长误差

手工命令参考：

```bash
ffmpeg -y -i assets/talking-head-real.mp4 \
  -c:v libx264 -pix_fmt yuv420p -r 30 -g 30 -keyint_min 30 -sc_threshold 0 \
  -preset medium -crf 18 -movflags +faststart -c:a copy \
  assets/talking-head-input.mp4
```

如果不按这个规则处理，HyperFrames 在抽帧时容易出现 seek 失败、画面冻结、人物层不显示。

## 交付边界

这是模板系统，不是剪辑代工。用户拿到的是组件库、规则编译器、可运行样例和排障流程。
