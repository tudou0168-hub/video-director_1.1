# Codex Usage Guide

Use Codex as a project engineer, not a generic chat assistant.

## Good Task Format

```text
请按照 AGENTS.md 和 .codex/project-rules.md 执行。

任务：
说明要改什么。

范围：
只修改哪些目录或文件。

要求：
1. 先核对相关规则。
2. 不引入复杂依赖。
3. 不提交视频、截图、音频等产物。
4. 修改后运行项目验证。
5. 输出修改文件、验证结果、剩余风险。
```

## Add A Feature

```text
请为 P008 增加一个新的 Creator Overlay 组件。

组件目标：
解决什么表达问题。

要求：
- 更新组件注册表。
- 更新 V0.5 组件规格。
- 更新 scene recipe 或 timeline 示例。
- 更新检查脚本。
- 运行完整验证。
```

## Improve Video Look

```text
请优化当前 60 秒口播包装样例。

目标：
更接近透明线框 HUD + 大中文标题 + 参考图级 Creator Overlay。

约束：
- 不要厚重 Dashboard。
- 不要英文字幕。
- 不遮挡人脸和中文字幕。
- 先 snapshot，不直接 render。
```

## Check Rule Implementation

```text
请核对某个规则文件是否真正进入视频生成链路。

检查：
- 文档是否存在。
- registry 是否登记。
- timeline 是否使用。
- index.html 是否渲染。
- check 脚本是否能阻止跑偏。
- snapshot 是否能看到效果。
```

## Prevent Drift

When Codex starts to overbuild, restate:

```text
只做轻量整合，不安装 ECC，不引入 hooks，不新建无关 agent，不重构项目架构。
```
