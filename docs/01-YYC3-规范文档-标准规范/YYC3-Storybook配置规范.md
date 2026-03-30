# YYC³ 组件库 - Storybook配置规范

## 1. 概述

Storybook是YYC³组件库的文档和开发环境，用于：

- 组件可视化展示和交互测试
- 组件文档自动生成
- 设计系统一致性验证
- 开发者协作和组件复用

## 2. 技术栈

- **Storybook**: ^8.0.0
- **构建工具**: Vite
- **框架**: React 18+
- **样式**: Tailwind CSS
- **插件**:
  - `@storybook/addon-essentials`: 核心插件集合
  - `@storybook/addon-interactions`: 交互测试
  - `@storybook/addon-a11y`: 可访问性检查
  - `@storybook/addon-themes`: 主题切换
  - `@storybook/addon-docs`: 文档增强

## 3. 配置结构

### 3.1 根目录配置

```
YYC3-组件库/
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
├── packages/
│   ├── ui/
│   │   └── src/
│   │       └── components/
│   │           ├── button.tsx
│   │           └── button.stories.tsx
│   ├── hooks/
│   │   └── src/
│   │       └── usePersistedState.stories.tsx
│   └── ...
```

### 3.2 Storybook主配置 (main.ts)

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../packages/ui/src/**/*.mdx',
    '../packages/ui/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/hooks/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/business/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/ai/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/smart/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/effects/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/navigation/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
```

### 3.3 全局预览配置 (preview.ts)

```typescript
import type { Preview } from '@storybook/react';
import '../packages/ui/src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#09090b',
        },
      ],
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      return (
        <div className={theme === 'dark' ? 'dark' : 'light'}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
```

### 3.4 管理器配置 (manager.ts)

```typescript
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'YYC³ Component Library',
    brandUrl: 'https://github.com/YYC-Cube/yyc3-reusable-components',
    brandImage: '/logo.svg',
  }),
});
```

## 4. Story编写规范

### 4.1 基础Story结构

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span className="mr-2">🎨</span>
        With Icon
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
```

### 4.2 Hooks Story结构

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { usePersistedState } from './usePersistedState';

const meta: Meta = {
  title: 'Hooks/usePersistedState',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function PersistedStateDemo() {
  const [value, setValue] = usePersistedState('demo-key', 'default value');

  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-semibold">Current Value: {value}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded px-3 py-2"
        placeholder="Type something..."
      />
      <button
        onClick={() => setValue('')}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Clear
      </button>
    </div>
  );
}

export const Default: Story = {
  render: () => <PersistedStateDemo />,
};
```

### 4.3 复杂组件Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              This is a dialog description
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>Open Controlled Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog is controlled by state
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  },
};
```

## 5. Story分类规范

### 5.1 按包分类

- **UI组件**: `UI/[ComponentName]`
- **Hooks**: `Hooks/[HookName]`
- **业务组件**: `Business/[ComponentName]`
- **AI组件**: `AI/[ComponentName]`
- **智能组件**: `Smart/[ComponentName]`
- **特效组件**: `Effects/[ComponentName]`
- **导航组件**: `Navigation/[ComponentName]`

### 5.2 按功能分类

- **基础组件**: Button, Input, Card等
- **布局组件**: Dialog, Sheet, Drawer等
- **表单组件**: Form, Checkbox, Select等
- **反馈组件**: Alert, Toast, Badge等
- **导航组件**: Tabs, Breadcrumb, Menubar等
- **数据展示**: Table, Chart, Carousel等

## 6. 文档规范

### 6.1 组件文档

每个Story应包含：

- **标题**: 清晰描述组件功能
- **描述**: 组件用途和使用场景
- **示例**: 展示不同状态和变体
- **Props文档**: 自动生成，确保类型定义完整
- **使用示例**: 代码示例和最佳实践

### 6.2 交互测试

使用`@storybook/addon-interactions`进行交互测试：

```typescript
import { within, userEvent } from '@storybook/test';

export const WithInteraction: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};
```

### 6.3 可访问性测试

使用`@storybook/addon-a11y`进行可访问性检查：

```typescript
export const Accessible: Story = {
  args: {
    children: 'Accessible Button',
    'aria-label': 'Click to perform action',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

## 7. 性能优化

### 7.1 Story分割

- 按组件包分割Story文件
- 使用动态导入减少初始加载时间
- 配置Storybook缓存策略

### 7.2 构建优化

```typescript
// main.ts
export default {
  // ...其他配置
  viteFinal: async (config) => {
    return {
      ...config,
      optimizeDeps: {
        include: ['react-dom', 'react'],
      },
    };
  },
};
```

## 8. 部署配置

### 8.1 静态部署

```bash
# 构建Storybook
npm run build-storybook

# 部署到GitHub Pages
npm run deploy-storybook
```

### 8.2 Chromatic集成

```bash
# 安装Chromatic CLI
npm install -D chromatic

# 运行Chromatic
npx chromatic --project-token=<your-token>
```

## 9. 最佳实践

### 9.1 命名规范

- Story文件: `[component].stories.tsx`
- 导出名称: PascalCase (Default, Large, WithIcon等)
- 标题: 使用层级结构 `Category/Component`

### 9.2 代码组织

- 保持Story文件简洁
- 复杂逻辑提取到辅助函数
- 使用TypeScript确保类型安全
- 遵循组件库设计规范

### 9.3 维护建议

- 定期更新Story和文档
- 添加新组件时同步创建Story
- 使用Chromatic进行视觉回归测试
- 收集用户反馈改进Story质量

## 10. 故障排除

### 10.1 常见问题

1. **样式不显示**: 检查全局CSS导入路径
2. **类型错误**: 确保TypeScript配置正确
3. **构建失败**: 检查依赖版本兼容性
4. **性能问题**: 优化Story数量和复杂度

### 10.2 调试技巧

- 使用Storybook调试工具
- 检查浏览器控制台错误
- 验证依赖安装完整性
- 清理缓存重新构建

## 11. 参考资源

- [Storybook官方文档](https://storybook.js.org/docs)
- [React Storybook指南](https://storybook.js.org/docs/react/get-started/introduction)
- [YYC³组件库设计规范](./YYC3-组件设计规范.md)
- [YYC³测试规范](./YYC3-测试规范.md)
