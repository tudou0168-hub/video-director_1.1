# Motion Director Components V0.8

## 设计原则

组件不是视觉装饰，而是解释口播内容的视觉语言。

## Text Motion

### HeadlineReveal

用途：观点、结论、开场钩子。

动画：
- blur reveal
- slide
- scale emphasis

## Process Motion

### FlowReveal

用途：步骤、Agent流程、工作链路。

结构：

Node → Connector → Active State

## Data Motion

### MetricCounter

用途：效率、速度、数量变化。

动画：
- number count
- progress
- pulse

## Interface Motion

### UIExplode

用途：展示软件、AI工作台。

动作：
- window split
- panel reveal
- connection

## HUD Motion

### HUDFrame

用途：科技包装。

规则：
HUD作为辅助，不作为主要信息承载。

## Scene Composition

优先：

内容关系 > 组件选择 > 动效 > 装饰
