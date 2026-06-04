---
title: P008 Final Creator Overlay
version: 0.1
product_id: P008
---

# P008 Final Creator Overlay

本目录定义 P008 口播视频包装系统的最终升级方向：先做 30 秒 snapshot 小样，再扩展 60 秒成片。

## 工作流

```text
文案/口播
-> creator overlay storyboard
-> timeline.json
-> snapshot
-> 85 分验收
-> render
```

## 第一轮只做 30 秒

固定检查点：

- 1s：开场大标题
- 6s：手动 vs 系统
- 14s：三步流程
- 22s：选题库/评分证明
- 29s：CTA 结尾

## 硬规则

- 必须有顶部栏目标签。
- 必须有右上 StepBadge 或状态徽章。
- 每个关键帧必须有一个主视觉：大标题、大数字、对比卡、流程卡、表格或 CTA。
- HUD 使用透明线框，不使用厚重 Dashboard。
- 字幕只用中文，固定底部安全区。
- 人脸不能被长文本遮挡。
- snapshot 平均分低于 85，不进入 render。
