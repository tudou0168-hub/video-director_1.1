---
component: AgentDashboard
version: 0.2
---

# AgentDashboard

## 用途

展示 Hermes、Obsidian、llm-wiki、Codex、HyperFrames 等工具链如何协作。

## 触发词

Hermes、Obsidian、llm-wiki、Codex、Claude Code、HyperFrames、流程、系统、自动化。

## 必填字段

- `component_props.nodes`
- `component_props.status`

## 布局

全幅流程或侧边系统面板。真人模式使用侧栏，不遮挡人物。

## 动效

`node_cascade -> line_draw -> status_activate`

## 禁用

不要塞入 6 个以上节点；超过 6 个先合并为阶段。
