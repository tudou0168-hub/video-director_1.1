# AGENTS.md

## 项目身份
`video-director_1.1` 是 P008「真人口播 HUD 包装系统（Creator Overlay Pro）」的工程仓库，目标是把已有真人口播视频包装成可复用、可验证、可交付的中文 HUD Creator Overlay 模板。

目标链路（只负责稳定执行，不在这里做泛化导演系统）：
```
talking-head video / audio + script
-> prepare:talking-head
-> storyboard
-> timeline.json
-> HyperFrames runtime (HTML/CSS/GSAP)
-> snapshot
-> inspect
-> render
-> QA
```

## 项目边界
- **不要** 把“文案生成视频”混用进来（那属于 `video-director-script`）
- **不要** 把 renderer 重写、不要带回旧的废弃路线
- **不要** 在 snapshot/inspect 之前 render 最终 MP4 当结果

## 产物与入库
- **严禁**把 `outputs/`、`renders/`、`review_frames/`、`contact-sheet.jpg` 等媒体产物提交到 Git
- 允许提交：代码、配置、模板、规则、schema

## QA
- snapshot 必须先过：中文主视觉要强、HUD 不遮挡人脸和字幕、安全区正确
- 结构检查必须通过：validate/lint/组件注册/模板契约等
