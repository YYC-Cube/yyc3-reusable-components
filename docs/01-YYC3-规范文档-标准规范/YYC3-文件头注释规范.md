# YYC³ 组件库 - 文件头注释规范

> **规范版本**: v1.0.0 **创建日期**: 2024年3月28日 **适用范围**:
> YYC³组件库所有源代码文件

---

## 📋 规范概述

本规范定义了YYC³组件库所有源代码文件的文件头注释格式，确保代码的可维护性、可读性和一致性。

### 目标

- ✅ 统一所有文件的文件头注释格式
- ✅ 提供完整的文件元信息
- ✅ 便于代码审查和维护
- ✅ 支持自动化检查

---

## 🎯 文件头注释格式

### TypeScript/JavaScript 文件

```typescript
/**
 * @file 文件名.tsx
 * @description 文件描述 - 简要描述文件的功能和用途
 * @author 作者名称
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 */
```

### 示例

```typescript
/**
 * @file Button.tsx
 * @description YYC³ UI基础组件 - 按钮组件，支持多种样式和变体
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 */

import React from 'react';

export const Button = () => {
  return <button>Click me</button>;
};
```

---

## 📝 字段说明

### 必填字段

| 字段           | 说明     | 示例                         |
| -------------- | -------- | ---------------------------- |
| `@file`        | 文件名   | `Button.tsx`                 |
| `@description` | 文件描述 | `YYC³ UI基础组件 - 按钮组件` |
| `@author`      | 作者     | `YYC³ Team`                  |
| `@version`     | 版本号   | `1.0.0`                      |
| `@date`        | 创建日期 | `2024-03-28`                 |
| `@license`     | 许可证   | `MIT`                        |

### 可选字段

| 字段        | 说明     | 示例                              |
| ----------- | -------- | --------------------------------- |
| `@package`  | 所属包名 | `@yyc3/ui`                        |
| `@category` | 组件分类 | `UI Components`                   |
| `@tags`     | 标签     | `button, ui, interactive`         |
| `@see`      | 相关文件 | `@see ./ButtonGroup.tsx`          |
| `@example`  | 使用示例 | `@example <Button>Click</Button>` |

---

## 🎨 不同类型文件的注释格式

### 组件文件 (.tsx)

```typescript
/**
 * @file Button.tsx
 * @description YYC³ UI基础组件 - 按钮组件，支持多种样式和变体
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 * @package @yyc3/ui
 * @category UI Components
 * @tags button, ui, interactive
 */
```

### Hook文件 (.ts)

```typescript
/**
 * @file useTheme.ts
 * @description YYC³ 自定义Hooks - 主题切换Hook，支持亮色/暗色模式切换
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 * @package @yyc3/hooks
 * @category Hooks
 * @tags theme, hook, state
 */
```

### Store文件 (.ts)

```typescript
/**
 * @file themeStore.ts
 * @description YYC³ 状态管理 - 主题状态Store，管理应用主题状态
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 * @package @yyc3/stores
 * @category State Management
 * @tags theme, store, zustand
 */
```

### Service文件 (.ts)

```typescript
/**
 * @file gitBridgeService.ts
 * @description YYC³ 服务层 - Git桥接服务，提供Git操作接口
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 * @package @yyc3/services
 * @category Services
 * @tags git, service, bridge
 */
```

### 工具函数文件 (.ts)

```typescript
/**
 * @file utils.ts
 * @description YYC³ 工具函数 - 通用工具函数集合
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 * @package @yyc3/utils
 * @category Utilities
 * @tags utils, helper, common
 */
```

### 配置文件 (.json)

```json
{
  "_comment": "YYC³ 组件库配置文件",
  "name": "@yyc3/ui",
  "version": "1.0.0",
  "description": "YYC³ UI基础组件库"
}
```

---

## 🔍 注释内容规范

### @description 规范

- **长度**: 不超过200个字符
- **格式**: `[包名] [分类] - [功能描述]`
- **示例**:
  - ✅ `YYC³ UI基础组件 - 按钮组件，支持多种样式和变体`
  - ❌ `这是一个按钮组件` (缺少包名和分类)
  - ❌
    `YYC³ UI基础组件 - 按钮组件，支持多种样式和变体，包括主要按钮、次要按钮、文本按钮、图标按钮等，可以自定义颜色、大小、圆角等属性`
    (太长)

### @author 规范

- **格式**: `YYC³ Team` 或 `作者姓名 <email>`
- **示例**:
  - ✅ `YYC³ Team`
  - ✅ `张三 <zhangsan@yyc3.com>`
  - ❌ `zhangsan` (缺少团队或邮箱)

### @version 规范

- **格式**: 遵循语义化版本 (SemVer)
- **格式**: `主版本号.次版本号.修订号`
- **示例**:
  - ✅ `1.0.0`
  - ✅ `2.1.3`
  - ❌ `v1.0.0` (不需要v前缀)
  - ❌ `1.0` (缺少修订号)

### @date 规范

- **格式**: `YYYY-MM-DD`
- **示例**:
  - ✅ `2024-03-28`
  - ❌ `2024/03/28` (使用斜杠)
  - ❌ `2024年3月28日` (使用中文)

---

## 🚀 自动化检查工具

### ESLint 规则

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'yyc3/file-header': [
      'error',
      {
        pattern:
          '^\\s*\\/\\*\\*\\n' +
          '( \\* @file .+\\n)+' +
          '( \\* @description .+\\n)+' +
          '( \\* @author .+\\n)+' +
          '( \\* @version \\d+\\.\\d+\\.\\d+\\n)+' +
          '( \\* @date \\d{4}-\\d{2}-\\d{2}\\n)+' +
          '( \\* @license .+\\n)+' +
          ' \\*\\/\\s*$',
      },
    ],
  },
};
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# 检查文件头注释
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$')

if [ -n "$FILES" ]; then
  echo "检查文件头注释..."
  node scripts/check-file-header.js $FILES
  if [ $? -ne 0 ]; then
    echo "❌ 文件头注释检查失败，请修复后重新提交"
    exit 1
  fi
  echo "✅ 文件头注释检查通过"
fi
```

### 自动化脚本

```javascript
// scripts/check-file-header.js
const fs = require('fs');
const path = require('path');

const FILE_HEADER_PATTERN =
  /^\/\*\*\n \* @file .+\n \* @description .+\n \* @author .+\n \* @version \d+\.\d+\.\d+\n \* @date \d{4}-\d{2}-\d{2}\n \* @license .+\n \*\/\n/;

function checkFileHeader(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const header = content.split('\n').slice(0, 8).join('\n') + '\n';

  if (!FILE_HEADER_PATTERN.test(header)) {
    console.error(`❌ ${filePath}: 文件头注释格式不正确`);
    return false;
  }

  console.log(`✅ ${filePath}: 文件头注释检查通过`);
  return true;
}

const files = process.argv.slice(2);
let allPassed = true;

files.forEach((file) => {
  if (!checkFileHeader(file)) {
    allPassed = false;
  }
});

process.exit(allPassed ? 0 : 1);
```

---

## 📚 使用示例

### 创建新组件

```typescript
/**
 * @file Button.tsx
 * @description YYC³ UI基础组件 - 按钮组件，支持多种样式和变体
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 * @package @yyc3/ui
 * @category UI Components
 * @tags button, ui, interactive
 */

import React from 'react';
import { cn } from './utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-md font-medium transition-colors',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
            'hover:bg-gray-100': variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

### 创建新Hook

```typescript
/**
 * @file useTheme.ts
 * @description YYC³ 自定义Hooks - 主题切换Hook，支持亮色/暗色模式切换
 * @author YYC³ Team
 * @version 1.0.0
 * @date 2024-03-28
 * @license MIT
 * @package @yyc3/hooks
 * @category Hooks
 * @tags theme, hook, state
 */

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
```

---

## 🎯 检查清单

在提交代码前，请确保：

- [ ] 文件头注释包含所有必填字段
- [ ] @description 格式正确且不超过200字符
- [ ] @author 格式正确
- [ ] @version 遵循语义化版本规范
- [ ] @date 格式为 YYYY-MM-DD
- [ ] 文件头注释位于文件最顶部
- [ ] 文件头注释与代码之间有一个空行

---

## 📖 参考资料

- [YYC³ 组件库开发规范](../规范文档/YYC3-组件库开发规范.md)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [JSDoc 文档](https://jsdoc.app/)

---

**规范维护**: YYC³ Team  
**最后更新**: 2024年3月28日
