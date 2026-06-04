# V3 Asset Migration Rules

## 目的

这份文档只定义哪些 V3 资产可以参考、哪些需要改造、哪些不该迁移、哪些绝对禁止。

它的作用是帮 `video-director_1.1` 吸收可复用规则，但不把 V3 的整套主线搬进来。

`video-director_1.1` 的定位是口播音频主时钟驱动的 Creator Overlay，V3 只提供视觉资产、语义色、QA 和模板规则参考。

## 可直接迁移

这些资产可以直接变成 1.1 的规则、token 或校验条件：

- 语义色系统
- 字幕安全区规则
- HUD token
- snapshot QA 思路
- placeholder / proof / CTA 合规规则
- `TODO_ASSET_REQUIRED` / `DEMO_RENDER_SNAPSHOT` 占位策略

## 需要改造后迁移

这些资产有价值，但不能原样照搬，必须先映射到 1.1 的现有结构：

- template contracts
- motion preset
- template registry 思路
- layout / caption / ending 的策略化分层

改造原则：

- 先规则化
- 再映射到现有 segment / recipe
- 不改播放机制
- 不改 renderer 主线

## 不建议迁移

这些资产会把 1.1 拉向 V3 的完整语义导演结构，不适合当前阶段：

- `studio_native_project_builder`
- V3 原生项目主线
- `publish_templates`
- V3 的完整 scene_pack 驱动渲染链

## 禁止迁移

这些内容不要迁进 1.1：

- `outputs`
- `renders`
- `review_frames`
- `contact-sheet`
- `contact-sheet.jpg`
- `combined/index.html`
- `window.__hf`
- `audio.timeupdate`
- 自定义 seek loop
- render 前 MP4

## 迁移判断

如果一项资产会导致以下任意结果，就不要直接迁移：

1. 把 1.1 变成 script-to-video 系统。
2. 把 1.1 变成 TTS 主线系统。
3. 把 1.1 变成 V3 的完整 pipeline 镜像。
4. 把渲染机制改成新的播放控制机制。

## 实施顺序建议

1. 先吸收规则
2. 再吸收 token
3. 再吸收 contract
4. 最后才考虑少量模板层面的局部增强
