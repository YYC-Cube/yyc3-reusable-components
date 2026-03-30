# @yyc3/navigation

> YYC³ Navigation组件库 - 导航和布局组件

## 📦 简介

`@yyc3/navigation` 提供了1个导航组件，专注于应用导航和布局管理。

## 🎯 特性

- ✅ **1个导航组件** - 核心导航功能
- 🎨 **响应式设计** - 适配各种设备
- 🔧 **可配置** - 灵活的导航配置
- 🎯 **路由集成** - 支持多种路由方案
- 🔄 **TypeScript支持** - 完整类型定义

## 📥 安装

```bash
# npm
npm install @yyc3/navigation

# yarn
yarn add @yyc3/navigation

# pnpm
pnpm add @yyc3/navigation
```

## 🚀 快速开始

```tsx
import { Navigation } from '@yyc3/navigation';

function App() {
  const navItems = [
    { label: '首页', path: '/', icon: <Home /> },
    { label: '关于', path: '/about', icon: <Info /> },
    { label: '联系', path: '/contact', icon: <Mail /> },
  ];

  return <Navigation items={navItems} />;
}
```

## 📚 组件列表

### 导航

- Navigation - 主导航组件

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 类型检查
pnpm typecheck

# Lint
pnpm lint
```

## 📖 API文档

详细的API文档请查看 [Storybook](链接待补充)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](../../CONTRIBUTING.md)

## 📄 许可证

MIT © YYC³ Team

## 🔗 相关链接

- [YYC³组件库](../..)
- [更新日志](./CHANGELOG.md)
- [问题反馈](https://github.com/YYC-Cube/yyc3-reusable-components/issues)
