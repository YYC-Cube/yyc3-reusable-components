# @yyc3/hooks

> YYC³ Hooks库 - 自定义React Hooks

## 📦 简介

`@yyc3/hooks` 提供了13个高质量的自定义React Hooks，帮助开发者快速实现常见功能模式。

## 🎯 特性

- ✅ **13个自定义Hooks** - 涵盖状态管理、响应式、AI、数据库等场景
- 🔄 **TypeScript支持** - 完整类型定义
- 🧪 **测试覆盖** - 核心功能有单元测试
- 📚 **Storybook文档** - 交互式文档和示例
- 🪝 **易于使用** - 简洁的API设计

## 📥 安装

```bash
# npm
npm install @yyc3/hooks

# yarn
yarn add @yyc3/hooks

# pnpm
pnpm add @yyc3/hooks
```

## 🚀 快速开始

```tsx
import { useAI, useResponsive, usePersistedState } from '@yyc3/hooks';

function App() {
  // AI配置管理
  const { config, updateConfig } = useAI();
  
  // 响应式设计
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  // 持久化状态
  const [theme, setTheme] = usePersistedState('theme', 'dark');
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>
    </div>
  );
}
```

## 📚 Hooks列表

### 状态管理
- `usePersistedState` - 持久化状态到localStorage
- `useUISettings` - UI设置管理

### 响应式
- `useResponsive` - 响应式设计断点检测

### AI相关
- `useAI` - AI配置管理
- `useChatPersistence` - 聊天记录持久化

### 数据库和配置
- `useDatabaseConfig` - 数据库配置管理
- `useSupabaseSync` - Supabase数据同步

### 导航
- `useChannelConfig` - 频道配置
- `useChannelManager` - 频道管理
- `useNavigationContext` - 导航上下文

### 业务功能
- `useDevOps` - DevOps工具集成
- `useNotifications` - 通知管理

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
