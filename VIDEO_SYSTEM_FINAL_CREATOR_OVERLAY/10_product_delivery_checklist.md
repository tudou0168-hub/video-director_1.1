# P008 Product Delivery Checklist

## 产品定位

`P008 AI 科技感口播视频自动化生成包`

帮知识博主、自媒体副业创作者，把一段普通真人口播包装成有科技感、信息密度和中文可读性的短视频样片。

## 交付文件

| 模块 | 状态 | 说明 |
|---|---|---|
| Creator Overlay 规则层 | 已有 | `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/` |
| 组件注册表 | 已有 | `AI_VIDEO_COMPONENT_LIBRARY/registry/component-registry.json` |
| 触发规则 | 已有 | `AI_VIDEO_COMPONENT_LIBRARY/registry/trigger-rules.json` |
| 30 秒 recipe | 已有 | `compile:creator30` |
| 60 秒 recipe | 已有 | `compile:creator60` |
| Runtime | 已有 | `index.html` |
| 真人素材标准化脚本 | 已有 | `prepare:talking-head` |
| 证据资产校验 | 已有 | `validate:proof-assets` |
| 媒体同步校验 | 已有 | `validate:media-sync` |
| Snapshot 验收 | 已有 | `snapshot:creator30` / `snapshot:creator60` |

## 用户最小使用流程

```bash
npm run prepare:talking-head -- /path/to/talking-head.mov 60
npm run compile:creator60
cp AI_VIDEO_COMPONENT_LIBRARY/examples/creator_overlay_60s/compiled.timeline.json timeline.json
npm run validate
npm run validate:components
npm run validate:proof-assets
npm run validate:media-sync
npx hyperframes lint
npm run snapshot:creator60
npx hyperframes inspect
```

## 正式发布前还要补

- 新手安装教程: Node.js、ffmpeg、HyperFrames、网络下载失败处理。
- 真实截图替换教程: Hermes、Obsidian、llm-wiki、台账截图如何打码和放入 `assets/proof/`。
- 中文转写教程: Whisper 中文模型、SRT/JSON 输出、如何回填 timeline。
- Render 教程: snapshot 通过后如何导出 60 秒样片。
- 常见问题: 黑屏、视频盖住人像、音频卡顿、字幕乱码、证据图不显示。

## 售卖边界

免费层可以给:

- 口播拍摄安全区清单
- 30 秒 snapshot 验收表
- 一张样例截图

付费层提供:

- 完整组件库
- 规则编译器
- 30 秒/60 秒 Creator Overlay recipe
- 真人素材标准化脚本
- 证据资产校验和媒体同步校验
- 可运行样例
- 安装与排障文档
