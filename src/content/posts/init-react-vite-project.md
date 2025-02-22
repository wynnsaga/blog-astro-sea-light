---
title: "创建并配置React+Vite项目"
notice: ""
image: "https://assets-global.website-files.com/61b9e37d1106b57eaa076efd/629df2647290ef3b75d74f2c_a2bc81309136b0c1864f582b1af95307_546c60cadefd5c0f5e78014543c554cb.png"
date:
  publish: 2025-02-22
categories: ["React"]
tags: ["react", "vite"]
draft: false
pin: false
---

## 使用 vite 创建 react 项目

```npm
npm create vite@latest
```

## 配置项目别名

1. 安装 @types/node

```npm
npm install -D @types/node
```

2. 配置 vite.config

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // npm install -D @types/node

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

> 配置完上述内容就可以通过 import x from "@/x" 导入了，但是 vscode 中可能没有路径提示

3. 路径提示

在 jsconfig.json / tsconfig.json 中配置

```js
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
        "@/*": ["src/*"]
    }
},
```

> 对于最新的项目会存在 jsconfig.json、jsconfig.app.json、jsconfig.node.json 三个文件，通常对于浏览器项目需要在 app 文件中进行配置

## 安装 Tailwind css

> 该步不是必须的，根据需要配置，了解 [Tailwind css](https://v3.tailwindcss.com/)

> 官方安装文档：[https://v3.tailwindcss.com/docs/guides/vite](https://v3.tailwindcss.com/docs/guides/vite)

> 目前 Tailwind css 已发布 v4 版本，以下是 Tailwind css 3 的安装过程

1. 安装

```npm
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

2. tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. 在 css 文件中

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```
