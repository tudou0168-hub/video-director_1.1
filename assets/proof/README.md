# Proof Assets

这个目录放 `ProofScreenshotOverlay` 使用的真实截图资产。

## 命名规则

- `hermes-collection-YYYYMMDD.png`: Hermes 采集结果
- `obsidian-topic-bank-YYYYMMDD.png`: Obsidian 选题库或产品库
- `llm-wiki-search-YYYYMMDD.png`: llm-wiki 检索或编译结果
- `data-dashboard-YYYYMMDD.png`: 数据台账或复盘表
- `p008-render-proof-YYYYMMDD.png`: P008 渲染或 snapshot 证明

## 使用规则

在 `timeline.json` 的 `ProofScreenshotOverlay.component_props` 中填写:

```json
{
  "title": "真实输出证明",
  "asset_path": "assets/proof/hermes-collection-20260526.png",
  "asset_label": "Hermes 采集结果",
  "asset_alt": "Hermes 采集结果截图",
  "asset_status": "ASSET_READY"
}
```

## 硬规则

- 不伪造平台 UI。
- 没有真实截图时，保留 `TODO_ASSET_REQUIRED` 或 `DEMO_RENDER_SNAPSHOT`。
- 正式 render 前，不能只保留演示截图。
- 截图里如果出现 token、手机号、微信号、私密路径，必须先打码。
