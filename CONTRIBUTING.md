# 贡献指南

感谢您对 YYC³ 组件库的关注！本文档将帮助您参与项目开发。

---

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境](#开发环境)
- [项目结构](#项目结构)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [测试规范](#测试规范)
- [文档规范](#文档规范)
- [提交规范](#提交规范)
- [发布流程](#发布流程)

---

## 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- 使用包容性语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性化的语言或图像
- 骚扰、侮辱/贬损评论
- 未经许可发布他人私人信息
- 其他不道德或不专业的行为

---

## 如何贡献

### 报告 Bug

1. **搜索现有 Issues** - 避免重复报告
2. **收集信息** - 版本、环境、复现步骤
3. **创建 Issue** - 使用 Bug 报告模板

**Bug 报告模板**:

```markdown
## Bug 描述
[清晰简洁的描述]

## 复现步骤
1. ...
2. ...

## 期望行为
[描述您期望发生的事情]

## 实际行为
[描述实际发生的事情]

## 环境
- 包名: @yyc3/ui@x.x.x
- React 版本: x.x.x
- Node 版本: x.x.x
- 操作系统: [e.g. macOS, Windows, Linux]
- 浏览器: [e.g. Chrome, Safari, Firefox]

## 截图
[如有必要，添加截图]

## 其他
[其他相关信息]
```

### 提交功能请求

1. **检查 Roadmap** - 查看是否已计划
2. **创建讨论** - 在 GitHub Discussions 中讨论
3. **提交 Proposal** - 使用功能请求模板

### 提交代码

```bash
# 1. Fork 仓库
git clone https://github.com/YOUR_USERNAME/yyc3-reusable-components.git

# 2. 创建分支
git checkout -b feature/amazing-feature

# 3. 开发
pnpm install
pnpm dev

# 4. 测试
pnpm test
pnpm lint
pnpm typecheck

# 5. 提交
git add .
git commit -m "feat: add amazing feature"

# 6. 推送
git push origin feature/amazing-feature

# 7. 创建 Pull Request
```

---

## 开发环境

### 必备工具

| 工具 | 版本 | 说明 |
|------|------|------|
| Node.js | >= 18.0.0 | 运行环境 |
| pnpm | >= 8.0.0 | 包管理器 |
| Git | >= 2.0.0 | 版本控制 |
| VS Code | 最新版 | 推荐 IDE |

### 推荐 VS Code 扩展

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "orta.vscode-jest",
    "styled-components.vscode-styled-components"
  ]
}
```

### 初始化项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行 Storybook
pnpm storybook
```

---

## 项目结构

```
packages/
├── ui/                 # UI 基础组件
│   ├── src/
│   │   ├── components/ # 组件源码
│   │   └── index.ts    # 导出入口
│   ├── package.json
│   └── tsconfig.json
├── business/           # 业务组件
├── smart/             # AI 组件
└── ...                # 其他包
```

---

## 开发流程

### 创建新组件

```bash
# 1. 创建组件目录
mkdir -p packages/ui/src/components/NewComponent

# 2. 创建组件文件
touch packages/ui/src/components/NewComponent/NewComponent.tsx
touch packages/ui/src/components/NewComponent/NewComponent.test.tsx
touch packages/ui/src/components/NewComponent/NewComponent.stories.tsx
touch packages/ui/src/components/NewComponent/index.ts
```

### 组件文件结构

```
NewComponent/
├── NewComponent.tsx        # 组件实现
├── NewComponent.test.tsx   # 单元测试
├── NewComponent.stories.tsx # Storybook
├── index.ts                # 导出
└── README.md               # 文档
```

### 组件代码模板

```tsx
import * as React from 'react';
import { cn } from '@yyc3/utils';

/**
 * NewComponent 属性
 */
export interface NewComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 子元素 */
  children?: React.ReactNode;
  /** 变体样式 */
  variant?: 'default' | 'primary' | 'secondary';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 新组件
 * 
 * @example
 * ```tsx
 * <NewComponent variant="primary">
 *   Hello World
 * </NewComponent>
 * ```
 */
export const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

NewComponent.displayName = 'NewComponent';
```

---

## 代码规范

### TypeScript 规范

```tsx
// ✅ 推荐
interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled }) => {
  return <button onClick={onClick} disabled={disabled} />;
};

// ❌ 避免
export const Button = (props: any) => {
  return <button {...props} />;
};
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `Button`, `DatePicker` |
| 函数 | camelCase | `formatDate`, `parseJSON` |
| 常量 | UPPER_SNAKE_CASE | `MAX_SIZE`, `API_BASE_URL` |
| 文件 | PascalCase | `Button.tsx`, `DatePicker.tsx` |
| 目录 | kebab-case | `date-picker/`, `form-control/` |

### 样式规范

```tsx
// 使用 Tailwind CSS + class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        outline: 'border border-primary',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

---

## 测试规范

### 测试覆盖率要求

| 类型 | 要求 |
|------|------|
| 语句覆盖率 | >= 80% |
| 分支覆盖率 | >= 75% |
| 函数覆盖率 | >= 80% |
| 行覆盖率 | >= 80% |

### 测试示例

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });
});
```

---

## 文档规范

### JSDoc 注释

```tsx
/**
 * 计算两个数的和
 * 
 * @param a - 第一个数
 * @param b - 第二个数
 * @returns 两数之和
 * 
 * @example
 * ```ts
 * const result = sum(1, 2); // 3
 * ```
 */
export function sum(a: number, b: number): number {
  return a + b;
}
```

### README 模板

```markdown
# @yyc3/package-name

简短描述

## 安装

\`\`\`bash
pnpm add @yyc3/package-name
\`\`\`

## 使用

\`\`\`tsx
import { Component } from '@yyc3/package-name';

function App() {
  return <Component />;
}
\`\`\`

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| prop | string | - | 说明 |

## License

MIT
```

---

## 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | feat(ui): add Button component |
| `fix` | Bug 修复 | fix(ui): fix Button click handler |
| `docs` | 文档更新 | docs: update README |
| `style` | 代码格式 | style: format code |
| `refactor` | 代码重构 | refactor: extract utility |
| `test` | 测试相关 | test: add Button tests |
| `chore` | 构建/工具 | chore: update dependencies |
| `perf` | 性能优化 | perf: optimize render |
| `ci` | CI/CD | ci: add GitHub Actions |

### 示例

```bash
# 新功能
git commit -m "feat(ui): add DatePicker component"

# Bug 修复
git commit -m "fix(ui): correct DatePicker timezone handling"

# Breaking Change
git commit -m "feat(ui)!: change Button API

BREAKING CHANGE: Button onClick now receives event as first argument"
```

---

## 发布流程

### 使用 Changesets

```bash
# 1. 创建变更记录
pnpm changeset

# 选择变更类型
# - patch: Bug 修复
# - minor: 新功能
# - major: Breaking change

# 2. 版本升级
pnpm version-packages

# 3. 发布
pnpm release
```

### 版本号规则

遵循 [语义化版本](https://semver.org/lang/zh-CN/):

- **主版本号 (MAJOR)**: 不兼容的 API 修改
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

---

## Pull Request 流程

### PR 检查清单

- [ ] 代码通过 ESLint 检查
- [ ] 代码通过 TypeScript 类型检查
- [ ] 测试覆盖率满足要求
- [ ] 文档已更新
- [ ] CHANGELOG 已更新
- [ ] 提交信息符合规范

### PR 审查

1. **自动检查** - CI 自动运行 lint、test、build
2. **代码审查** - 至少一位维护者审查
3. **测试验证** - 在本地验证功能
4. **合并** - Squash merge 到 main 分支

---

## 获取帮助

| 渠道 | 信息 |
|------|------|
| 📧 Email | admin@0379.email |
| 💬 Discussions | [GitHub Discussions](https://github.com/YYC-Cube/yyc3-reusable-components/discussions) |
| 🐛 Issues | [GitHub Issues](https://github.com/YYC-Cube/yyc3-reusable-components/issues) |

---

## 许可证

贡献的代码将以 MIT 许可证发布。

---

<div align="center">

**感谢您的贡献！**

> *「言启象限 | 语枢未来」*

</div>
