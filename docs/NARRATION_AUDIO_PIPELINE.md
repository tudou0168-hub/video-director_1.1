# Narration Audio Pipeline

## 目的

这份文档只做代码盘点、契约设计和方向固化，不实现 TTS，不改播放器，不改渲染，不迁移 V3 模板。

它的目标是为 `video-director_1.1` 建立一条最小 narration audio pipeline 契约，让项目后续可以从：

```text
文案 -> 口播稿 -> TTS 音频 -> 真实时长 -> timeline / 字幕 / HUD 同步
```

逐步落地。

## 一、当前已存在能力

- Markdown / 文案已经可以被 `compile-storyboard.mjs` 拆成 storyboard / timeline。
- 已有真人口播视频可以通过 `prepare:talking-head` 标准化成 video layer + audio master。
- `validate:timeline-contract` 已能检查 timeline 自身闭合。
- `check:creator-overlay` 已恢复通过。

## 二、当前缺口

- 没有文案改写成最终口播稿模块。
- 没有 TTS provider。
- 没有 TTS 输出音频后的 `ffprobe` 时长回填。
- 没有基于真实 TTS 时长重排 segments 的 compiler。
- 没有真正的 caption beats 时间轴。

## 三、目标主线

```text
文案
-> final_narration.md
-> male TTS
-> assets/narration-master.wav
-> ffprobe 读取真实音频时长
-> timeline.duration = audio duration
-> caption beats 覆盖完整 duration
-> HUD segments 跟随 caption / semantic beats
-> snapshot_at 自动或一致生成
-> snapshot / inspect / render
```

说明：

- `timeline.duration` 的来源必须是最终 audio master 的真实时长。
- caption / HUD / snapshot 必须围绕音频主时钟同步。
- 固定 30s / 60s recipe 只能作为 demo 或 legacy preset，不能作为正式主时钟。

## 四、兼容入口

```text
已有真人口播视频
-> prepare:talking-head
-> talking-head-audio-master.wav
-> 同样进入 audio master clock timeline
```

两个入口的共同核心是：

- 最终口播音频 / TTS 音频是真正主时钟。
- 音频多长，视频多长，字幕和 HUD 就同步到多长。

## 五、建议新增的未来契约文件

- `final_narration.md`
- `tts_result.json`
- `caption_beats.json`
- `compiled.timeline.json`

这些文件未来可以把“文案 -> 口播稿 -> TTS -> 真实时长 -> timeline”拆成可验证的中间件契约。

## 六、未来命令规划

这里只写规划，不实现：

- `npm run compile:narration`
- `npm run tts:narration`
- `npm run compile:audio-master-timeline`
- `npm run validate:timeline-contract`
- `npm run validate:media-sync`

## 七、P3 最小接入

当前已经进入最小 TTS 接入阶段时，推荐的最小落地链路是：

```text
samples/final_narration.md
-> scripts/generate-narration-tts.mjs
-> assets/narration-master.wav
-> assets/tts_result.json
-> probeAudioDuration / ffprobe
```

要求：

- `tts_result.json` 的 `duration` 必须来自 `ffprobe`，不能写死。
- 如果没有可用 TTS provider，脚本必须清晰失败，不能生成假 duration。
- `tts_result.json` 只记录 TTS 结果，不承担 timeline 重排职责。
- 这一步仍然不重排 timeline，不生成 caption beats，不改 HUD，不改播放器。

## 八、TTS 结果契约

TTS 输出结果的最小可校验契约已经拆出为：

- `schemas/tts_result.schema.json`
- `scripts/validate-tts-result.mjs`
- `samples/tts_result.example.json`

对应的校验命令是：

```text
npm run validate:tts-result
```

校验规则：

- 必须包含 `source_text_path`、`audio_path`、`duration`、`voice`、`provider`、`generated_at`
- `duration` 必须大于 0
- `audio_path` 指向的音频文件必须存在
- 音频文件存在时，必须用 `ffprobe` 复核真实 duration
- `tts_result.duration` 与 `ffprobe` duration 的误差允许 0.05 秒

这个契约只负责约束 TTS 结果文件，不负责 timeline 重排。

## 九、当前 timeline 需要支持的字段

当前 `timeline.json` 已经依赖这些字段来支持 audio master clock：

- `duration`
- `media.audio`
- `media.video`
- `segments`
- `segments[].start`
- `segments[].end`
- `segments[].caption_line`
- `segments[].snapshotAt`
- `snapshot_at`

这些字段足以让现阶段的契约层判断 timeline 是否闭合，但还不足以表达“最终 TTS 音频已回填并驱动重排”的完整链路。

未来如果要更清晰地表达 audio master 来源，可以再考虑补充：

- `audio_master.duration`
- `audio_master.source`
- `narration_source`
- `caption_beats`

但这些都属于下一阶段，不在本次实现范围内。

## 十、禁止事项

- 不实现 TTS provider。
- 不改 `index.html`。
- 不改播放机制。
- 不引入 `window.__hf`。
- 不引入 `audio.timeupdate`。
- 不恢复 `combined/index.html`。
- 不 render MP4。
- 不迁移 V3 大 pipeline。
- 不提交媒体产物。

## 十一、验收标准

当未来链路完成时，至少应该满足：

- 能从文案稳定产出 final narration。
- 能把 narration 交给 TTS，得到真实音频。
- 能通过真实音频时长驱动 timeline.duration。
- 能让 caption beats、HUD segments、snapshot_at 与音频主时钟闭合。
- 能继续通过 `validate:timeline-contract` 和 `check:creator-overlay`。
