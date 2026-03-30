# @yyc3/services

> YYC³ Services库 - 服务层

## 📦 简介

`@yyc3/services` 提供了服务层实现，封装了业务逻辑和外部服务调用。

## 🎯 特性

- ✅ **3个服务** - 核心业务服务
- 🔌 **API集成** - 统一的API调用
- 🔄 **状态管理** - 服务状态管理
- 🛡️ **错误处理** - 统一的错误处理
- 🔄 **TypeScript支持** - 完整类型定义

## 📥 安装

```bash
# npm
npm install @yyc3/services

# yarn
yarn add @yyc3/services

# pnpm
pnpm add @yyc3/services
```

## 🚀 快速开始

```tsx
import { APIService, AuthService, DatabaseService } from '@yyc3/services';

function App() {
  const api = new APIService();
  const auth = new AuthService();
  const db = new DatabaseService();

  // 使用服务
  const data = await api.get('/users');
  const user = await auth.login({ username, password });
  const result = await db.query('SELECT * FROM table');

  return <div>App</div>;
}
```

## 📚 服务列表

### API服务

- APIService - API调用服务
- HTTPClient - HTTP客户端
- RequestInterceptor - 请求拦截器

### 认证服务

- AuthService - 认证服务
- TokenManager - Token管理
- PermissionManager - 权限管理

### 数据库服务

- DatabaseService - 数据库服务
- QueryBuilder - 查询构建器
- ConnectionManager - 连接管理

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
