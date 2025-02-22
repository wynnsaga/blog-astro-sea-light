---
title: "React Hooks"
notice: ""
image: "https://assets-global.website-files.com/61b9e37d1106b57eaa076efd/629df2647290ef3b75d74f2c_a2bc81309136b0c1864f582b1af95307_546c60cadefd5c0f5e78014543c554cb.png"
date:
    publish: 2025-02-19
categories: ["React"]
tags: ["react"]
draft: false
pin: false
---

## Hooks

### 1. useState

用于创建一个组件状态变量，此类变量的变化会引起组件的重新渲染（为了呈现最新的状态数据）。

```js
const [state, setState] = useState(init | () => init);

const [count, setCount] = useState(0);

const [count, setCount] = useState(() => {
    // some complex operation
    return 0;
});
```

### 2. useEffect

用于管理组件渲染副作用（指除组件渲染相关外的动作或行为，例如网络请求，事件监听，更新 DOM，修改全局变量等）。
useEffect 允许接受依赖项数组，当数组内的数据发生变化时触发副作用函数。不传入参数默认每次组件渲染时触发；空数组表示没有依赖项，组件仅在挂在时触发副作用函数；有依赖项的数组，当依赖项变化时触发副作用函数。

```js
useEffect(fn, deps?); // 两个参数分别为副作用函数和依赖项数组

useEffect(() => {
    // 副作用逻辑
    return () => {
    // 清理逻辑
    };
}, [dependencies]);
```

Note: 如果 useEffect 的依赖项是状态或 props，并且你在副作用中更新了这些状态或 props，可能会导致无限循环。确保你正确地管理依赖项。

试想如下场景：组件具有一个状态 a 以及一个调用 setA 的副作用。假设如下：

1. 默认不传入依赖：当 a 变化时会触发组件渲染，组件渲染会调用副作用函数，副作用函数为 a 赋值，再次触发组件渲染... 陷入无限循环
2. 传入空数组[]：仅当组件挂载时（首次渲染）触发
3. 传入具有依赖项的数组：当依赖项变化时触发。假设依赖项是 a，则陷入循环。
