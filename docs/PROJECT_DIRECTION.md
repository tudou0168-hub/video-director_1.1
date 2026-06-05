# Project Direction

## 项目定位

`video-director_1.1` 是 `Creator Overlay Pro` 的本地主干，也是 `Audio-Master-Clock Driven Narration Overlay System` 的稳定实现仓库。

它负责把口播音频驱动的内容包装成稳定、可验证、可交付的中文 Creator Overlay 样片，而不是做通用文案生成视频系统。

一句话定位：

> audio-master clock 驱动的 Creator Overlay 系统。

## 当前主线

```text
文案
→ 口播稿
→ 男声 TTS
→ 读取真实 TTS 音频时长
→ timeline.duration = 真实音频时长
→ 根据口播稿生成 caption beats
→ 根据 caption / semantic beats 生成 HUD segments
→ snapshot_at 从 segments 自动或一致生成
→ snapshot
→ inspect
→ render
```

说明：

- `render` 必须在 `snapshot` 和 `inspect` 之后执行。
- `snapshot` 和 `inspect` 是发布前的前置门槛，不是可选步骤。
- 固定 30s / 60s recipe 只能作为 demo 或 legacy preset，不能作为正式主时钟。

## 两类输入入口

### 主入口 A：文案 / 口播稿输入

- 输入中文文案、口播稿或等价脚本。
- 当前仓库已经具备从 Markdown 文案提取句段并生成 storyboard / timeline 的能力。
- 未来会接入 TTS provider，把最终口播音频作为主时钟。
- talking-head 不是主线，只是兼容入口。

### 主入口 B：已有真人口播视频输入

- 通过 `prepare:talking-head` 标准化已有真人口播视频。
- 导出 `talking-head-input.mp4` 和 `talking-head-audio-master.wav`。
- 这个入口只是兼容入口，最终和主入口 A 汇合到同一条 audio master clock 主线。
- 在 TTS-only 模式下，`media.video` 可以为空，或由占位背景承担，不要求一定存在真人视频素材。

## 输入 / 中间产物 / 输出

### 输入

- 中文文案 / 口播稿
- 已有真人口播视频
- 未来的 TTS 音频
- 中文字幕来源

### 中间产物

- 30fps 标准化素材
- `timeline.json`
- storyboard / recipe 类中间描述
- 口播稿生成结果
- TTS 音频文件
- 真实音频时长
- snapshot 结果
- inspect 结果

### 输出

- 本地 preview
- 本地 render 结果
- 本地 QA 产物

## 当前已具备能力

- 从 Markdown 文案提取句段并生成 storyboard / timeline。
- 读取既有 `timeline.json` 并通过契约校验。
- 对已有真人口播视频执行标准化，导出 audio master 相关素材。
- 以 snapshot / inspect 作为 render 前门槛。
- 维持中文字幕、HUD、safe-zone 和 QA 约束。
- `docs/NARRATION_AUDIO_PIPELINE.md` 已定义最小 narration audio pipeline 契约。

## 当前缺口

- 还没有真正的文案改写成最终口播稿模块。
- 还没有 TTS provider 接入。
- 还没有基于 TTS 真实时长自动重排 timeline 的完整编译链路。
- 现阶段只是建立规则和契约，不能把未实现能力写成已完成。

## 下一阶段目标

- 将文案稳定转成可投喂 TTS 的最终口播稿。
- 接入一个可控的 TTS provider，产出真实音频主时钟。
- 让 `timeline.duration`、caption beats、HUD segments、`snapshot_at` 自动围绕真实音频时长闭合。
- 在不改变 renderer 的前提下，继续增强 QA 与模板契约。

## 和 `video-director-script` 的边界

- `video-director_1.1` 不负责 script-to-video 的完整内容工厂。
- `video-director_1.1` 不负责复杂多平台内容生产主线。
- `video-director_1.1` 负责的是 audio-master clock 驱动的 Creator Overlay，不是完整内容工厂。

## 和 `video-director-v3` 的关系

`video-director-v3` 里的部分资产可以作为视觉、语义色、QA 和模板规则参考，但本仓库不是 V3 的完整落地副本。

适合的关系是：

- 1.1 作为稳定主干
- V3 作为可复用资产来源
- 迁移必须先规则化，再局部吸收

不接受的关系是：

- 把 V3 整个 pipeline 搬进来
- 把 V3 的原生主线替换成 1.1
- 把渲染壳改成 V3 的项目结构

## 禁止事项

- 不把当前仓库缩回成“只支持已有真人视频包装”的系统
- 不做 script-to-video 的完整内容工厂
- 不做 TTS provider 实现层开发
- 不迁移 V3 大 pipeline
- 不引入 `window.__hf`
- 不引入 `audio.timeupdate`
- 不恢复 `combined/index.html`
- 不绕过 snapshot / inspect
- 不在 snapshot / inspect 之前先 render MP4
- 不提交 `outputs/`、`renders/`、`review_frames/`、`contact-sheet/`、`contact-sheet.jpg` 或其他媒体产物

## 验收标准

迁移和维护必须满足：

1. 能处理文案 / 口播稿输入，也能兼容已有真人口播视频输入。
2. 能以真实口播音频或 TTS 音频作为主时钟。
3. 能让 `timeline.duration`、字幕、HUD segments、`snapshot_at` 围绕真实音频时长闭合。
4. 能先 snapshot，再 inspect，最后 render。
5. 不出现开发标签、假截图、英文字幕翻译和遮挡安全区的问题。
6. 不把媒体产物提交进 Git。
