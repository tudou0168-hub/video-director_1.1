---
title: P008 Storyboard Rules
version: 0.2
product_id: P008
---

# P008 Storyboard Rules

## 输入

- 公众号文章
- 短视频口播稿
- Whisper 中文字幕
- TTS 句子时间戳

## 输出

- `storyboard.json`：导演层。
- `timeline.json`：执行层。

## Storyboard 字段

```json
{
  "beat_id": "B01",
  "time": "0-3",
  "narration": "为什么你学了很多 AI 工具，还是没有真正提高效率？",
  "viewer_feeling": "你在说我",
  "semantic_role": "pain_hook",
  "component": "HookScene",
  "layout_slot": "center",
  "motion": "scale_blur_in",
  "sfx": "soft_hit",
  "proof_or_action": "先命中问题"
}
```

## 规则

- 前 150 字或前 3 秒必须让用户知道“这条视频解决什么问题”。
- 每个 beat 只能服务一个主要语义。
- 每个 beat 都要写清 viewer_feeling，而不是只写布局。
- CTA 必须写清：现在能领什么、买到什么、少走什么弯路。
- 渲染前先检查 storyboard，再生成 timeline。

## 语义角色

| role | 含义 |
|---|---|
| pain_hook | 痛点钩子 |
| loss_amplifier | 放大损失 |
| reason | 解释原因 |
| process | 给流程 |
| proof | 给判断标准或证据 |
| boundary | 说明不解决什么 |
| cta | 免费一步 / 付费结果 |
