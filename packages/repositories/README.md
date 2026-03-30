# @yyc3/repositories

> YYC³ Repositories库 - 数据访问层

## 📦 简介

`@yyc3/repositories` 提供了数据访问层实现，封装了数据存储和检索逻辑。

## 🎯 特性

- ✅ **2个仓库** - 核心数据仓库
- 🗄️ **数据访问** - 统一的数据访问接口
- 🔄 **缓存支持** - 内置缓存机制
- 🛡️ **类型安全** - TypeScript类型定义
- 📊 **查询优化** - 优化的查询性能

## 📥 安装

```bash
# npm
npm install @yyc3/repositories

# yarn
yarn add @yyc3/repositories

# pnpm
pnpm add @yyc3/repositories
```

## 🚀 快速开始

```tsx
import { UserRepository, ConfigRepository } from '@yyc3/repositories';

function App() {
  const userRepo = new UserRepository();
  const configRepo = new ConfigRepository();
  
  // 用户操作
  const users = await userRepo.findAll();
  const user = await userRepo.findById('123');
  await userRepo.create({ name: 'John', email: 'john@example.com' });
  
  // 配置操作
  const config = await configRepo.get('app.theme');
  await configRepo.set('app.theme', 'dark');
  
  return <div>App</div>;
}
```

## 📚 仓库列表

### 用户仓库
- UserRepository - 用户数据仓库
  - findAll - 查找所有用户
  - findById - 根据ID查找
  - findByEmail - 根据邮箱查找
  - create - 创建用户
  - update - 更新用户
  - delete - 删除用户

### 配置仓库
- ConfigRepository - 配置数据仓库
  - get - 获取配置
  - set - 设置配置
  - delete - 删除配置
  - list - 列出配置
  - batchGet - 批量获取

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
