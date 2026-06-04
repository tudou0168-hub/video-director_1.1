---
title: P008 Render Checklist
version: 0.2
product_id: P008
---

# P008 Render Checklist

## 渲染前

- [ ] `storyboard.json` 已生成。
- [ ] `timeline.json` 已通过校验。
- [ ] component 全部来自注册表。
- [ ] 字幕只有中文，工具名除外。
- [ ] 真人视频已标记安全区或使用默认右侧 HUD。
- [ ] GSAP timeline 使用 `{ paused: true }`。
- [ ] 不直接动画 video 元素尺寸。

## 命令

```bash
npm run validate
npm run validate:components
npx hyperframes lint
npx hyperframes inspect
npx hyperframes render --quality high --workers 1
```

## 抽帧检查

首版用 ffmpeg 抽帧，检查：

- 0s：开头是否有痛点。
- 3s：是否进入解释或损失放大。
- 15s：是否有一次呼吸缓冲或场景切换。
- 30s：是否有流程/证据。
- 45s：是否有视觉高潮。
- CTA：关键词和结果是否清楚。

## 失败即返工

- 前 3 秒只讲工具名。
- 字幕太长或有英文翻译。
- HUD 遮挡脸、手、字幕。
- 画面 5 秒以上没有语义变化。
- 组件和文案语义不匹配。
