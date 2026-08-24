# Creator Overlay Pro V0.8 Motion Director Upgrade

## 目标

从 Creator Overlay（视频叠加包装）升级为 Motion Director（内容驱动动态视觉导演）。

保留原有：
- audio master clock
- timeline
- HUD overlay
- snapshot 验收
- HyperFrames render

新增中间层：

口播内容 → Beat 分析 → Visual Plan → Motion Components → HyperFrames

## 核心变化

### 1. 不再以卡片作为默认表达

旧：

内容 → 卡片 → 动画

新：

内容 → 视觉关系 → 动效组件

表达优先级：

1. 关键文字
2. 流程关系
3. 数据变化
4. UI拆解
5. HUD装饰

### 2. 新增 Motion Grammar

组件拥有生命周期：

- enter
- active
- transform
- exit

避免静态元素堆叠。

### 3. 新增 Scene Beat

每3-5秒形成一个视觉节拍：

Hook
Problem
Insight
Process
Result

每个 Beat 独立选择视觉组件。

## 第一批组件方向

- HeadlineReveal
- FlowReveal
- MetricCounter
- NodeActivation
- UIExplode
- ComparisonScene
- HUDFrame

## 第一轮测试目标

输入一段60秒AI主题口播，输出：

- 视觉分镜计划
- HyperFrames组件选择
- 动效时间轴
- 最终视频样片

重点验证：

不是增加更多HUD，而是减少卡片化。