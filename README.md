# YYC³ 组件库

> **_YanYuCloudCube_** _言启象限 | 语枢未来_ **_Words Initiate Quadrants,
> Language Serves as Core for Future_** _万象归元于云枢 | 深栈智启新纪元_ **_All
> things converge in cloud pivot; Deep stacks ignite a new era of
> intelligence_**

[![npm version](https://img.shields.io/npm/v/@yyc3/ui.svg)](https://www.npmjs.com/package/@yyc3/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-green.svg)](https://reactjs.org/)

---

## 📋 目录导航

- [项目概述](#-项目概述)
- [架构设计](#-架构设计)
- [目录结构](#-目录结构)
- [快速开始](#-快速开始)
- [包列表](#-包列表)
- [开发指南](#-开发指南)
- [发布流程](#-发布流程)
- [文档索引](#-文档索引)

---

## 🎯 项目概述

YYC³ 组件库是一个**企业级 React 组件库**，采用 Monorepo 架构，提供 200+ 高质量组件，支持 AI 驱动的智能业务场景。

### 核心特点

| 特性               | 说明                           |
| ------------------ | ------------------------------ |
| 🎨 **12 个独立包** | 按功能分类，独立发布，按需安装 |
| 📦 **200+ 组件**   | 覆盖 UI、业务、AI、特效等场景  |
| 🔷 **TypeScript**  | 完整类型定义，智能提示         |
| ⚡ **高性能**      | Tree-shaking，按需加载         |
| 🎭 **主题系统**    | Cyberpunk、Liquid Glass 等主题 |
| 🌍 **国际化**      | 内置中英文支持                 |
| 📖 **完善文档**    | API 文档、示例代码、最佳实践   |
| ✅ **测试覆盖**    | 单元测试、E2E 测试             |

---

## 🏗️ 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                     YYC³ Component Library                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │
│  │  @yyc3  │  │  @yyc3  │  │  @yyc3  │  │     @yyc3       │ │
│  │   /ui   │  │/business│  │  /smart │  │/themes /core    │ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────────┬────────┘ │
│       │            │            │                  │         │
│  ┌────┴────────────┴────────────┴──────────────────┴───────┐│
│  │                    @yyc3/hooks                          ││
│  └────────────────────────┬────────────────────────────────┘│
│                           │                                 │
│  ┌────────────────────────┴────────────────────────────────┐│
│  │  @yyc3/utils │ @yyc3/services │ @yyc3/repositories      ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 目录结构

```
YYC3-组件库/
├── 📦 packages/                    # 核心组件包 (12个)
│   ├── 🎨 ui/                      # UI 基础组件
│   ├── 💼 business/                 # 业务组件
│   ├── 🤖 smart/                   # AI 智能组件
│   ├── ✨ effects/                 # 3D 特效组件
│   ├── 🧭 navigation/              # 导航组件
│   ├── 🤖 ai/                      # AI 聊天组件
│   ├── 🎭 themes/                  # 主题系统
│   ├── 🔧 core/                    # 核心功能 (i18n, 监控)
│   ├── 🪝 hooks/                   # React Hooks
│   ├── 🔧 utils/                   # 工具函数
│   ├── 📡 services/                # 服务层
│   └── 📊 repositories/            # 数据访问层
│
├── 🌐 api-proxy/                   # API 代理服务
├── 📚 docs/                        # 文档目录
│   ├── 01-YYC3-规范文档-标准规范/
│   ├── 02-YYC3-技术文档-开发指南/
│   ├── 03-YYC3-指导文档-操作手册/
│   ├── 04-YYC3-项目文档-分析报告/
│   ├── 05-YYC3-分析总结-优化阶段/
│   └── 06-YYC3-AI-Family-技术文档/
│
├── ⚙️ config/                      # 配置文件
├── 🧪 scripts/                     # 构建脚本
├── 📄 根目录文件/
│   ├── package.json                # 根包配置
│   ├── pnpm-workspace.yaml         # workspace 配置
│   ├── turbo.json                  # Turborepo 配置
│   ├── tsconfig.json               # TypeScript 配置
│   ├── vitest.config.ts            # 测试配置
│   ├── .github/                    # GitHub Actions
│   ├── .editorconfig               # 编辑器配置
│   └── .nvmrc                      # Node 版本锁定
│
└── 📜 文档文件/
    ├── README.md                   # 项目说明
    ├── CHANGELOG.md                # 变更日志
    ├── CONTRIBUTING.md             # 贡献指南
    ├── SECURITY.md                 # 安全策略
    ├── LICENSE                     # MIT 许可证
    └── RELEASE.md                  # 发布说明
```

---

## 🚀 快速开始

### 环境要求

| 依赖    | 版本要求  |
| ------- | --------- |
| Node.js | >= 18.0.0 |
| pnpm    | >= 8.0.0  |
| React   | >= 18.0.0 |

### 安装

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 克隆仓库
git clone https://github.com/YYC-Cube/yyc3-reusable-components.git
cd yyc3-reusable-components

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动所有包的开发模式
pnpm dev

# 启动特定包
pnpm --filter @yyc3/ui dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @yyc3/ui build
```

### 测试

```bash
# 运行所有测试
pnpm test

# 运行测试并生成覆盖率
pnpm test:coverage

# 运行性能测试
pnpm test:performance
```

---

## 📦 包列表

### 核心包

| 包名               | 说明        | 组件数 | 安装命令                    |
| ------------------ | ----------- | ------ | --------------------------- |
| `@yyc3/ui`         | UI 基础组件 | 50+    | `pnpm add @yyc3/ui`         |
| `@yyc3/business`   | 业务组件    | 35+    | `pnpm add @yyc3/business`   |
| `@yyc3/smart`      | AI 智能组件 | 20+    | `pnpm add @yyc3/smart`      |
| `@yyc3/ai`         | AI 聊天组件 | 12+    | `pnpm add @yyc3/ai`         |
| `@yyc3/effects`    | 3D 特效组件 | 3+     | `pnpm add @yyc3/effects`    |
| `@yyc3/navigation` | 导航组件    | 1+     | `pnpm add @yyc3/navigation` |

### 主题与核心

| 包名           | 说明                               | 安装命令                |
| -------------- | ---------------------------------- | ----------------------- |
| `@yyc3/themes` | 主题系统 (Cyberpunk, Liquid Glass) | `pnpm add @yyc3/themes` |
| `@yyc3/core`   | 核心功能 (i18n, 性能监控)          | `pnpm add @yyc3/core`   |

### 工具包

| 包名                 | 说明        | 导出数 |
| -------------------- | ----------- | ------ |
| `@yyc3/hooks`        | React Hooks | 13+    |
| `@yyc3/utils`        | 工具函数    | 8+     |
| `@yyc3/services`     | 服务层      | 3+     |
| `@yyc3/repositories` | 数据访问层  | 2+     |

---

## 🔧 开发指南

### 创建新组件

```bash
# 在 packages/ui/src/components 下创建组件
mkdir -p packages/ui/src/components/NewComponent

# 组件文件结构
NewComponent/
├── NewComponent.tsx        # 组件实现
├── NewComponent.test.tsx   # 单元测试
├── NewComponent.stories.tsx # Storybook 文档
├── index.ts                # 导出
└── README.md               # 组件文档
```

### 组件模板

````tsx
import * as React from 'react';
import { cn } from '@yyc3/utils';

export interface NewComponentProps {
  /** 组件内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/**
 * 新组件 - 简短描述
 *
 * @example
 * ```tsx
 * <NewComponent>内容</NewComponent>
 * ```
 */
export const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('base-class', className)} {...props}>
        {children}
      </div>
    );
  }
);

NewComponent.displayName = 'NewComponent';
````

### Git 提交规范

```bash
# 提交格式
<type>(<scope>): <subject>

# 类型说明
feat:     新功能
fix:      Bug 修复
docs:     文档更新
style:    代码格式
refactor: 代码重构
test:     测试相关
chore:    构建/工具
perf:     性能优化
```

---

## 🚀 发布流程

### 1. 版本管理

使用 Changesets 管理版本：

```bash
# 创建变更记录
pnpm changeset

# 版本升级
pnpm version-packages

# 发布到 npm
pnpm release
```

### 2. CI/CD 自动化

项目配置了 GitHub Actions 自动化：

- **CI**: Push/PR 自动运行测试、构建、类型检查
- **CD**: main 分支合并自动发布到 npm

### 3. 发布检查清单

- [ ] 所有测试通过
- [ ] 构建成功
- [ ] 类型检查无错误
- [ ] CHANGELOG 已更新
- [ ] 版本号已更新
- [ ] 文档已同步

---

## 📚 文档索引

### 📖 开发文档

| 文档                                                   | 说明         |
| ------------------------------------------------------ | ------------ |
| [CONTRIBUTING.md](CONTRIBUTING.md)                     | 贡献指南     |
| [YYC3-项目规范-全面标准.md](YYC3-项目规范-全面标准.md) | 项目规范标准 |

### 📋 API 文档

| 包             | API 文档                                     |
| -------------- | -------------------------------------------- |
| @yyc3/ui       | [API Reference](packages/ui/README.md)       |
| @yyc3/business | [API Reference](packages/business/README.md) |
| @yyc3/themes   | [API Reference](packages/themes/README.md)   |
| @yyc3/core     | [API Reference](packages/core/README.md)     |

### 🔧 技术文档

- [YYC3-项目组件-分类讲解](docs/02-YYC3-技术文档-开发指南/)
- [YYC3-项目组件-拆分原则](docs/02-YYC3-技术文档-开发指南/)
- [YYC3-拆分组件-独立单元](docs/02-YYC3-技术文档-开发指南/)

---

## 📊 项目统计

| 指标           | 数量  |
| -------------- | ----- |
| **包数量**     | 12 个 |
| **组件总数**   | 200+  |
| **Hooks**      | 13+   |
| **工具函数**   | 8+    |
| **服务**       | 3+    |
| **测试覆盖率** | >80%  |
| **文档数量**   | 60+   |

---

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 获取详细信息。

### 快速贡献

```bash
# 1. Fork 仓库
# 2. 创建分支
git checkout -b feature/amazing-feature

# 3. 开发并测试
pnpm dev
pnpm test

# 4. 提交代码
git commit -m "feat: add amazing feature"

# 5. 推送并创建 PR
git push origin feature/amazing-feature
```

---

## 📄 许可证

[MIT License](LICENSE) © 2024 YYC³ Team

---

## 📞 联系方式

| 渠道      | 信息                                                                         |
| --------- | ---------------------------------------------------------------------------- |
| 📧 Email  | admin@0379.email                                                             |
| 🐛 Issues | [GitHub Issues](https://github.com/YYC-Cube/yyc3-reusable-components/issues) |
| 📦 NPM    | [@yyc3](https://www.npmjs.com/search?q=%40yyc3)                              |

---

## 🌟 致谢

感谢所有为 YYC³ 组件库做出贡献的开发者！

---

<div align="center">

**YYC³ 组件库**

**版本**: v1.0.0  
**作者**: YYC³ Team  
**更新日期**: 2026-03-30

**项目状态**: ✅ 生产就绪  
**包数量**: 12 个  
**组件总数**: 200+

---

> _「言启象限 | 语枢未来」_ _Words Initiate Quadrants, Language Serves as Core
> for Future_

</div>
