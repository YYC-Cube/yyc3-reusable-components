# YYC³ 组件库 - 构建配置规范

> **规范版本**: v1.0.0
> **创建日期**: 2024年3月28日
> **适用范围**: YYC³组件库所有包的构建配置

---

## 📋 规范概述

本规范定义了YYC³组件库所有包的构建配置，确保构建过程统一、高效、可维护。

### 目标

- ✅ 统一所有包的构建脚本配置
- ✅ 提供一致的构建体验
- ✅ 支持高效的增量构建
- ✅ 便于CI/CD集成

---

## 🎯 构建脚本配置

### 标准构建脚本

所有包的package.json必须包含以下标准构建脚本：

```json
{
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "test": "vitest",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  }
}
```

### 脚本说明

| 脚本 | 命令 | 说明 |
|------|------|------|
| `dev` | `tsup --watch` | 开发模式，监听文件变化自动构建 |
| `build` | `tsup` | 生产构建，生成优化的产物 |
| `test` | `vitest` | 运行测试 |
| `lint` | `eslint src --ext .ts,.tsx` | 代码检查 |
| `typecheck` | `tsc --noEmit` | 类型检查 |
| `clean` | `rm -rf dist` | 清理构建产物 |

---

## 📦 包配置模板

### UI组件包模板

```json
{
  "name": "@yyc3/ui",
  "version": "1.0.0",
  "description": "YYC³ UI基础组件库 - 统一的UI组件集合",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "test": "vitest",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### Hooks包模板

```json
{
  "name": "@yyc3/hooks",
  "version": "1.0.0",
  "description": "YYC³ 自定义Hooks - 高质量的自定义React Hooks",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "test": "vitest",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### 服务层包模板

```json
{
  "name": "@yyc3/services",
  "version": "1.0.0",
  "description": "YYC³ 服务层 - 业务逻辑服务",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "test": "vitest",
    "lint": "eslint src --ext .ts",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

---

## 🛠 构建工具配置

### tsup 配置

创建`tsup.config.ts`文件：

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  target: 'es2020',
  external: ['react', 'react-dom'],
});
```

### TypeScript 配置

创建`tsconfig.json`文件：

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"]
}
```

---

## 🚀 构建工作流

### 本地开发

```bash
# 1. 进入包目录
cd packages/ui

# 2. 启动开发模式
pnpm dev

# 3. 修改代码，自动重新构建
```

### 构建包

```bash
# 1. 进入包目录
cd packages/ui

# 2. 运行构建
pnpm build

# 3. 检查构建产物
ls -la dist/
```

### 测试包

```bash
# 1. 进入包目录
cd packages/ui

# 2. 运行测试
pnpm test

# 3. 查看测试覆盖率
pnpm test -- --coverage
```

### 代码检查

```bash
# 1. 进入包目录
cd packages/ui

# 2. 运行lint
pnpm lint

# 3. 运行类型检查
pnpm typecheck
```

### 清理构建产物

```bash
# 1. 进入包目录
cd packages/ui

# 2. 清理构建产物
pnpm clean
```

---

## 📊 Monorepo 构建配置

### Turborepo 配置

在根目录创建`turbo.json`：

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
```

### 根目录 package.json

```json
{
  "name": "yyc3-reusable-components",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "tsup": "^8.0.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0",
    "eslint": "^8.55.0"
  }
}
```

---

## 🎯 构建优化

### 增量构建

使用Turborepo的缓存机制，只重新构建变更的包：

```bash
# 强制重新构建
pnpm build --force

# 跳过缓存
pnpm build --no-cache
```

### 并行构建

Turborepo自动并行构建独立的包：

```bash
# 并行构建所有包
pnpm build

# 限制并行数量
pnpm build --parallel=false
```

### 构建顺序

Turborepo根据依赖关系自动确定构建顺序：

```
@yyc3/utils (无依赖)
    ↓
@yyc3/ui (依赖 @yyc3/utils)
    ↓
@yyc3/business (依赖 @yyc3/ui)
    ↓
@yyc3/ai-management (依赖 @yyc3/business)
```

---

## 📝 构建检查清单

在提交代码前，请确保：

- [ ] 所有包的scripts配置一致
- [ ] 所有包都有tsconfig.json
- [ ] 所有包都有tsup.config.ts
- [ ] 构建产物正确生成
- [ ] 类型检查通过
- [ ] 代码检查通过
- [ ] 测试通过
- [ ] 构建产物包含必要的文件

---

## 🔧 故障排查

### 构建失败

#### 问题：类型错误

```bash
# 解决方案：运行类型检查
pnpm typecheck
```

#### 问题：依赖错误

```bash
# 解决方案：重新安装依赖
pnpm install
```

#### 问题：缓存问题

```bash
# 解决方案：清理缓存
pnpm build --force
```

### 测试失败

#### 问题：测试超时

```bash
# 解决方案：增加测试超时时间
pnpm test -- --timeout=10000
```

#### 问题：测试覆盖率低

```bash
# 解决方案：查看覆盖率报告
pnpm test -- --coverage
```

---

## 📚 参考资料

- [Turborepo 文档](https://turbo.build/repo/docs)
- [tsup 文档](https://tsup.egoist.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)

---

**规范维护**: YYC³ Team  
**最后更新**: 2024年3月28日
