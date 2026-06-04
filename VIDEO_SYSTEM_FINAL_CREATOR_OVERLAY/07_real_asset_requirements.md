# Real Asset Requirements

## 目的

`ProofScreenshotOverlay` 只做一件事: 证明这套系统真的跑过，而不是只展示概念。

## 最小资产清单

正式发布或作为付费样例前，至少准备 3 类真实截图:

| 资产 | 说明 | 推荐位置 |
|---|---|---|
| Hermes 采集结果 | 展示关键词、来源、抓取结果或情报列表 | `assets/proof/hermes-collection-YYYYMMDD.png` |
| Obsidian/llm-wiki 编译结果 | 展示素材进入知识库后的结构化沉淀 | `assets/proof/llm-wiki-search-YYYYMMDD.png` |
| 内容输出或数据台账 | 展示选题库、评分表、复盘表、成片关键帧 | `assets/proof/data-dashboard-YYYYMMDD.png` |

## Timeline 字段

```json
{
  "component": "ProofScreenshotOverlay",
  "component_props": {
    "title": "真实输出证明",
    "asset_path": "assets/proof/hermes-collection-20260526.png",
    "asset_label": "Hermes 采集结果",
    "asset_alt": "Hermes 采集结果截图",
    "asset_status": "ASSET_READY"
  }
}
```

## 验收规则

- `asset_path` 必须在 `assets/` 目录内。
- 正式 render 前运行 `npm run validate:proof-assets`。
- `ASSET_READY` 表示可发布真实截图。
- `DEMO_RENDER_SNAPSHOT` 只允许用于演示模板效果。
- `TODO_ASSET_REQUIRED` 表示还不能进入正式成片。
- 截图必须先打码敏感信息，包括 token、手机号、微信号、私密路径、未公开订单。

## 当前状态

当前仓库已提供 `assets/proof/demo-proof-output.png` 作为演示截图，用于验证组件支持真实图片渲染。它不是最终商业样例，后续应替换为 Hermes、Obsidian、llm-wiki、数据台账中的真实截图。
