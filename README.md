# D-UI

基于 Vue 3、Element Plus 的组件库 Monorepo。

## 技术栈

- **Vue 3** - 渐进式前端框架
- **Vite** - 构建工具
- **Element Plus** - UI 组件库
- **Pinia** - 状态管理
- **lodash-es** - 工具库
- **pnpm** - 包管理器
- **Turborepo** - Monorepo 构建编排

## 项目结构

```
d-ui/
├── apps/
│   └── dev/              # 开发演示应用
├── packages/
│   └── d-ui/             # 组件库 @d-ui/core
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 构建组件库（watch 模式）并启动开发服务
pnpm dev
```

或分别执行：

```bash
# 终端 1：构建组件库
pnpm --filter @d-ui/core dev

# 终端 2：启动演示应用
pnpm --filter @d-ui/dev dev
```

### 构建

```bash
pnpm build
```

### 发布到 npm

1. 在 `packages/d-ui/package.json` 中更新 `name`（如需发布到私有 scope）
2. 进入 `packages/d-ui` 执行：

```bash
cd packages/d-ui
pnpm build
pnpm publish
```

## 使用组件库

```bash
pnpm add @d-ui/core
```

```ts
// main.ts
import { createApp } from "vue";
import DUI from "@d-ui/core";
import "@d-ui/core/style.css";

app.use(DUI);
```

```vue
<template>
  <DHelloWorld msg="Hello" />
</template>
```

或按需导入：

```ts
import { HelloWorld } from "@d-ui/core";
```

## 添加新组件

1. 在 `packages/d-ui/src/components/` 下创建组件
2. 在 `packages/d-ui/src/index.ts` 中导出

## 组件文档

- [DForm 动态表单](./packages/d-ui/docs/DForm.md) - 配置化表单组件，支持多种控件类型、响应式布局、校验与插槽自定义
