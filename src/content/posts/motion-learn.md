---
title: "Motion 使用基础"
notice: ""
image: "https://assets-global.website-files.com/61b9e37d1106b57eaa076efd/629df2647290ef3b75d74f2c_a2bc81309136b0c1864f582b1af95307_546c60cadefd5c0f5e78014543c554cb.png"
date:
    publish: 2025-02-22
categories: ["React"]
tags: ["react", "motion"]
draft: false
pin: false
---

# React Motion

## 动画分类

1. 进入动画 Enter Motion 当元素进入页面是的动画效果
   元素进入页面会自动开始动画效果 `animation`，可以设置初始状态 `initial`
2. 手势动画 Gesture Motion 鼠标手势触发动画
   悬浮，点击，聚焦，拖拽等手势触发动画效果 `while-`
3. 滚动动画 Scroll Motion
   页面滚动触发动画效果 `whileInView`
4. 布局动画 Layout Motion
   元素布局变化时的动画
5. 退出动画 Exit Motion
   元素从 DOM 移除时的动画效果 `exit` ，在 React 中需要借助 AnimatePresence 组件，提供退出出口

## 动画设置

### 动画工具

Motion 提供了动画工具<motion/>，将其作用于需要动画的 HTML 元素上，例如：

```js
import { motion } from "motion/react";

export function Test() {
    return <motion.div> div为需要进行动画的元素 </motion.div>;
}
```

### 动画状态

initial/style 设置初始状态
animation 设置终态状态，通过 transition 对象设置过渡效果

### 动画效果

1. 变换类型

> 动画效果值可以设置为任何可用的 css 值

平移 Translate: x, y, z
缩放 Scale: scale, scaleX, scaleY
旋转 Rotate: rotate, rotateX, rotateY, rotateZ
倾斜 Skew: skew, skewX, skewY
透视 Perspective: transformPerspective

除了上述，也可以直接使用 `transform` 想 css 那样设置变换

2. 变换中心

> 默认变换中心为元素左上角

originX [0-1]
originY [0-1]
originZ 像素值

3. 关键帧

当为动画效果设置数组时，Motion 将会按数组顺序生成关键帧动画

```js
<motion.div
    animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
    }}
    transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
    }}
/>
```

### 动画过渡

> 过渡是指从初始状态到终止状态的中间过渡状态，Motion 默认会自动添加合适的过渡效果，可以通过 transition 属性进行自定义设置

过渡类型分为三种："Tween" 补间动画，"Spring" 弹性效果，"Inertia" 惯性效果，通过 transition.type 设置

1. 补间动画

```js
transition{
    type, // "Tween"
    ease, // "linear", "easeIn", "easeOut", "easeInOut", "circIn", "circOut", "circInOut", "backIn", "backOut", "backInOut","anticipate"
    duration, // 5
    from, // 过渡起点
    times, // 过渡时间分段数组（元素取值为 0-1，表示 duration 占比）
}
```

2. 弹性效果

```js
transition{
    type, // "Spring"
    duration, // 5
    bounce, // 弹性程度
    damping, // 反方向的阻力
    mass, // 模拟物体的质量大小的值
    stiffness, // 决定弹性表现硬度的数值
    velocity, //弹性动画开始时的初始速度
    restSpeed, // 设定一个临界速度值，低于这个变化速度就停止动画
    restDelta, // 设定一个临界速度值，剩余需要变化的值低于它就让变化停止
}
```

3. 惯性效果

```js
transition{
    type, // "Inertia"
    modifyTarget(v), // 这个一个函数，传入的参数是预算出的目标值,
    // ...visit official site to learn more
}
```

## 动画触发

> 通过 animation 设置的动画是默认触发的，如果需要进行一些动作识别，则需要在另外的属性上进行设置

### 手势识别

whileHover 鼠标悬浮触发
whileTag 点击触发
whileDrag 拖拽触发
whileFocus 聚焦触发
whileInView 进入视口触发
onPen 平移触发，查看官网了解更多

### 屏幕滚动

1. 触发
   使用 whileInView 即可触发当元素进入视口时的动画

2. 滚动容器
   默认元素的滚动区域被视为视口 ViewPoint，但是也可以通过 ref 设置滚动容器（需要该容器可滚动，即 overflow scroll）

3. 滚动进度
   使用 useScroll() hook 可以获取滚动进度值
   使用 useTransform() hook 可以为不同进度混合不同的取值
    ```js
    // 为不同进度取不同颜色
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#f00", "#0f0", "#00f"]
    );
    return <motion.div style={{ backgroundColor }} />;
    ```

### 布局变化

在动画元素上设置 layout 即可为元素设置布局变化，当布局变化时触发动画效果
布局变化可以是任何东西，改变宽度/高度，网格列数，重新排序列表，或添加/删除新项目

更多内容查看官网
