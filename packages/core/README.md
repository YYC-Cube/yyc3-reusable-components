# @yyc3/core

> YYC³ Core库 - 核心功能和基础服务

## 📦 简介

`@yyc3/core` 提供了核心功能和基础服务，是整个组件库的基石。

## 🎯 特性

- ✅ **核心功能** - 基础功能和工具
- 🔧 **配置管理** - 统一的配置管理
- 🎨 **主题系统** - 主题配置和管理
- 🔄 **TypeScript支持** - 完整类型定义
- 📦 **零依赖** - 最小依赖原则

## 📥 安装

```bash
# npm
npm install @yyc3/core

# yarn
yarn add @yyc3/core

# pnpm
pnpm add @yyc3/core
```

## 🚀 快速开始

```tsx
import { config, theme, constants } from '@yyc3/core';

function App() {
  const appConfig = config.get('app');
  const currentTheme = theme.getCurrent();
  
  return (
    <div>
      <p>App: {appConfig.name}</p>
      <p>Theme: {currentTheme}</p>
    </div>
  );
}
```

## 📚 核心模块

### 配置管理
- config - 应用配置管理
- env - 环境变量管理

### 主题系统
- theme - 主题配置
- colors - 颜色系统

### 常量定义
- constants - 应用常量
- enums - 枚举定义

### 工具函数
- helpers - 辅助函数
- validators - 验证函数

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

详细的API文档请查看 [文档](链接待补充)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](../../CONTRIBUTING.md)

## 📄 许可证

MIT © YYC³ Team

## 🔗 相关链接

- [YYC³组件库](../..)
- [更新日志](./CHANGELOG.md)
- [问题反馈](https://github.com/YYC-Cube/yyc3-reusable-components/issues)
