# AGENTS.md

## 项目身份

`video-director_1.1` 是 `Creator Overlay Pro` 的本地工程仓库，也是 `Audio-Master-Clock Driven Narration Overlay System` 的稳定主干。

它的核心目标不是泛化软件开发，也不是把自己退化成“只支持已有真人视频包装”的狭义工具，而是稳定生产可复用、可验证、可交付的中文 Creator Overlay 样片：

```text
文案 / 口播稿 / TTS / 真人口播音频
-> storyboard
-> timeline.json
-> HyperFrames HTML/CSS/GSAP runtime
-> snapshot
-> inspect
-> render
-> QA
```

本项目吸收 ECC 的工程思想，但不全量安装 ECC，不复制无关 agent、hooks、memory 或外部框架。规则整合采用轻量方式：

- `AGENTS.md`：Codex 总入口。
- `.codex/project-rules.md`：轻量 ECC 工程规则。
- `docs/ai-workflow/`：使用、架构、验证和视频标准。
- `prompts/`：可直接复制的任务模板。
- `scripts/check_creator_overlay_compliance.js`：规则落地检查。

## Codex 工作原则

每次执行任务前，Codex 必须：

1. 先读任务目标和相关项目文件。
2. 判断任务属于代码、规则、提示词、文档、视频样例还是验证链路。
3. 只做与文案 / 口播稿 / TTS 音频 / 真人口播音频 / timeline / 字幕 / HUD 同步相关的最小改动。
4. 让新增规则可复用、可执行、可验证。
5. 修改后运行相关验证；无法运行时说明原因和人工检查方法。

Codex 不得：

- 未分析项目结构就直接大改。
- 做 script-to-video 的文案生成主线。
- 把 TTS 作为主线去改造系统。
- 把项目退回成“只支持已有真人视频包装”的窄化系统。
- 迁移 V3 大 pipeline 到 1.1。
- 全量复制 ECC 或任何外部项目。
- 引入复杂依赖、hooks 或新框架。
- 删除已有内容而不说明理由。
- 引入 `window.__hf`。
- 引入 `audio.timeupdate`。
- 恢复 `combined/index.html` 作为主线。
- 不绕过 snapshot / inspect。
- 把视频、音频、截图、snapshot、render 输出提交到 Git。
- 把 `outputs/`、`renders/`、`review_frames/`、`contact-sheet/`、`contact-sheet.jpg` 或其他媒体产物提交到 Git。
- 输出不可执行、不可复用的空泛建议。

## 内容与产品原则

所有内容、脚本、视频模板都服务于「口播音频主时钟驱动的 Creator Overlay」：

- 利他优先，先解决问题，再考虑转化。
- 从焦虑、卡点、时间不够、启动不了、没有正反馈出发。
- 不做纯工具教程，不做空泛知识号。
- 每条内容要有痛点、原因、动作、判断标准或前后对比。
- CTA 指向领取资料、下载模板、购买结果型产品，不默认引导重咨询。

## 方向边界

- 可以围绕文案 / 口播稿、TTS 音频、真人口播音频、timeline、字幕、HUD 同步做最小改动。
- 当前阶段可以兼容已有真人口播视频，但不能把仓库退化成只有真人视频包装的狭义工具。
- 也不能把仓库扩成 `video-director-script` 那种完整多平台文案生成视频系统。
- `prepare:talking-head` 只作为已有真人口播视频的兼容入口，不是主线。
- TTS provider 接入、口播稿生成、真实音频时长驱动的完整重排链路，仍然是下一阶段能力，不要在未实现时假装完成。

## Mandatory Video Rules

Follow these files before changing video behavior:

- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/01_reference_style_definition.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/02_recording_requirements.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/03_transparent_hud_style.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/04_chinese_subtitle_rules.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/05_layout_safe_zones.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/06_typography_tokens.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/07_color_semantics.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/08_creator_overlay_templates.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/09_component_upgrade_specs.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/10_motion_timing_rules.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/11_scene_recipes.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/07_real_asset_requirements.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/08_audio_master_clock_workflow.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/12_snapshot_acceptance_rubric.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/13_codex_execution_plan.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/14_test_storyboard_60s.md`
- `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/15_rule_implementation_audit.md`
- `VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/01_reference_image_taxonomy.md`
- `VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/00_README.md`
- `.codex/project-rules.md`

## Hard Constraints

- Do not render before snapshot and inspect pass.
- Use Chinese subtitles only.
- Do not generate bilingual subtitles.
- HUD cards use transparent line-frame style.
- Face, hand gestures, and bottom subtitle safe zone must not be covered.
- Do not fake platform screenshots. Use `TODO_ASSET_REQUIRED` or `DEMO_RENDER_SNAPSHOT` until real assets exist.
- Use plain HTML + CSS + GSAP.
- Do not introduce React or Vue.
- Do not make script-to-video the mainline.
- Do not make TTS the mainline.
- Do not migrate the V3 full pipeline.
- Do not introduce `window.__hf`.
- Do not introduce `audio.timeupdate`.
- Do not restore `combined/index.html`.
- Do not bypass snapshot / inspect.
- V0.2 allows `1-2s` media sync tolerance to keep the full workflow moving.
- V0.3 should tighten sync with Whisper Chinese transcription.
- Do not commit videos, audio files, screenshots, snapshots, render outputs, or other media artifacts.
- Do not commit `outputs/`, `renders/`, `review_frames/`, `contact-sheet/`, `contact-sheet.jpg`, or any other media artifacts.
- All viewer-facing subtitles must be Chinese only.
- TopSectionLabel, StepBadge, a primary visual module, and BottomChineseSubtitle must be present in active Creator Overlay timeline segments.
- Main visual rhythm should change every 5-8 seconds for 60s samples.
- Existing V0.5 bilingual wording is superseded by final Chinese-only rules.

## Required Validation Before Render

```bash
npm run check:creator-overlay
npm run validate
npm run validate:components
npm run validate:proof-assets
npm run validate:media-sync
npx hyperframes lint
npm run snapshot:creator60
npx hyperframes inspect
```

## Render Command

```bash
npx hyperframes render --quality standard --workers 1 --output outputs/samples/creator-overlay-v02-flow-through.mp4
```

## Current Verified Output

- `outputs/samples/creator-overlay-v02-flow-through.mp4`
- `outputs/qa/render-frames/`

These are local artifacts only. They must stay ignored by Git.

## Completion Report Format

When finishing a task, report:

1. Modified files.
2. What changed and why.
3. Verification commands and results.
4. Remaining warnings or manual checks.
5. Commit/push status when Git changes were requested or appropriate.
