# @yyc3/ui

> YYC³ UI基础组件库 - 统一的UI组件集合

## 📦 简介

`@yyc3/ui` 是YYC³组件库的基础层，提供了54个高质量的UI组件，基于Radix
UI和Tailwind CSS构建，支持完整的可访问性和主题定制。

## 🎯 特性

- ✅ **54个UI组件** - 涵盖表单、布局、导航、反馈等场景
- 🎨 **主题定制** - 支持Tailwind CSS主题配置
- ♿ **可访问性** - 基于Radix UI，符合WCAG标准
- 📱 **响应式** - 完全响应式设计
- 🌙 **暗色模式** - 内置暗色模式支持
- 📦 **Tree-shakable** - 按需导入，优化包体积

## 📥 安装

```bash
# npm
npm install @yyc3/ui

# yarn
yarn add @yyc3/ui

# pnpm
pnpm add @yyc3/ui
```

## 🚀 快速开始

```tsx
import { Button, Card, Input } from '@yyc3/ui';
import '@yyc3/ui/styles.css';

function App() {
  return (
    <Card>
      <Input placeholder="请输入内容" />
      <Button variant="default">提交</Button>
    </Card>
  );
}
```

## 📚 组件列表

### 表单组件

- Button - 按钮
- Input - 输入框
- Checkbox - 复选框
- Select - 下拉选择
- Form - 表单容器
- RadioGroup - 单选组
- Slider - 滑块
- Switch - 开关
- Textarea - 文本域

### 布局组件

- Card - 卡片
- Dialog - 对话框
- Sheet - 抽屉
- Sidebar - 侧边栏
- Tabs - 标签页
- Accordion - 折叠面板

### 导航组件

- NavigationMenu - 导航菜单
- Menubar - 菜单栏
- Breadcrumb - 面包屑
- Pagination - 分页

### 数据展示

- Table - 表格
- Badge - 徽章
- Avatar - 头像
- Progress - 进度条
- Skeleton - 骨架屏
- Chart - 图表

### 反馈组件

- Alert - 警告
- Tooltip - 提示
- Sonner - Toast通知
- Progress - 进度条

## 🎨 主题定制

### CSS变量

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... 更多变量 */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... 更多变量 */
}
```

### Tailwind配置

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@yyc3/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
    },
  },
};
```

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
