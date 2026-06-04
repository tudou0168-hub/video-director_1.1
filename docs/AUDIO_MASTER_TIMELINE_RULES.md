# AUDIO MASTER TIMELINE RULES

## 目的

本项目的时间轴规则从“固定 30 秒 / 60 秒模板”逐步升级为 `audio master clock driven`，但不改变当前播放机制，也不引入新的 TTS 主线。

这份规则只约束时间轴、字幕、HUD 分段和 snapshot 节点的生成关系。

## 核心原则

### 1. `timeline.duration` 必须来自真实音频时长

- `timeline.duration` 不是经验值。
- `timeline.duration` 必须以最终 audio master 的真实时长为准。
- 这个 audio master 可以来自已有真人口播视频，也可以来自未来的 TTS 音频。
- 如果音频发生变化，`timeline.duration` 必须随之更新。
- 不能先写死 30 秒、60 秒再去裁剪内容适配时长。
- 固定 30s / 60s recipe 只能作为 demo 或 legacy preset，不能作为正式主时钟。

### 2. caption beats 必须覆盖完整音频

- `caption_line` 对应的 caption beat 必须覆盖整段音频。
- 不允许音频尾部没有字幕节拍，或字幕提前结束。
- caption 的切分可以服务于叙事节奏，但不能漏覆盖音频时长。

### 3. HUD segments 必须跟随 caption / semantic beats

- HUD segment 的 start / end 应跟随字幕节拍和语义节拍，而不是独立漂移。
- 一个 segment 应表达一个稳定的语义动作或视觉意图。
- 允许局部压缩或拉伸，但不能破坏字幕与视觉模块的同步关系。

### 4. `snapshot_at` 必须自动或一致生成

- `snapshot_at` 不能只手工维护一部分。
- 顶层 `snapshot_at` 必须与各 segment 的 `snapshotAt` 保持一致。
- 如果使用脚本生成，必须保证生成逻辑是单一来源。
- 如果暂时手工维护，必须保证列表完整、唯一、可校验。
- 新的 segment 或 caption beat 变化后，`snapshot_at` 必须同步更新。

### 5. render duration 必须与 `timeline.duration` 一致

- render 前的最终时长必须等于 `timeline.duration`。
- preview、snapshot、inspect、render 看到的时间范围必须一致。
- 不允许 render 侧再偷偷截断或拉长 duration。

## 当前约束

- 不改播放机制。
- 不引入 TTS 主线。
- 不迁移 V3 大 pipeline。
- 不提前 render MP4。

## 现阶段推荐做法

- 先把真实音频时长作为时间轴基准。
- 再让 caption、HUD segment、snapshot 点位围绕音频统一生成。
- 保持 `timeline.json` 是当前验收入口，`check:creator-overlay` 只负责拦截明显的不一致。
- `validate:timeline-contract` 只检查 timeline 自身闭合。
- 当真实音频文件存在时，还必须继续跑 `validate:media-sync` 检查媒体是否就位。

## 验收条件

当一条时间轴满足以下条件时，才算进入音频主时钟模式：

- `timeline.duration` 与真实音频时长一致。
- 所有 `segment.end` 不超过 `timeline.duration`。
- 所有 `caption_line` 覆盖音频完整叙事。
- `snapshot_at` 与 `segments[].snapshotAt` 一致。
- snapshot / inspect 通过后再执行 render。
