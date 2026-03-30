# API 文档

本文档提供 YYC³ 组件库的完整 API 参考。

---

## 📦 包索引

### 核心包

| 包名 | 说明 | 文档链接 |
|------|------|----------|
| `@yyc3/ui` | UI 基础组件 | [API 参考](./packages/ui/README.md) |
| `@yyc3/business` | 业务组件 | [API 参考](./packages/business/README.md) |
| `@yyc3/smart` | AI 智能组件 | [API 参考](./packages/smart/README.md) |
| `@yyc3/ai` | AI 聊天组件 | [API 参考](./packages/ai/README.md) |
| `@yyc3/themes` | 主题系统 | [API 参考](./packages/themes/README.md) |
| `@yyc3/core` | 核心功能 | [API 参考](./packages/core/README.md) |

### 工具包

| 包名 | 说明 | 文档链接 |
|------|------|----------|
| `@yyc3/hooks` | React Hooks | [API 参考](./packages/hooks/README.md) |
| `@yyc3/utils` | 工具函数 | [API 参考](./packages/utils/README.md) |
| `@yyc3/services` | 服务层 | [API 参考](./packages/services/README.md) |
| `@yyc3/repositories` | 数据访问层 | [API 参考](./packages/repositories/README.md) |

---

## 🎨 @yyc3/ui

### 安装

```bash
pnpm add @yyc3/ui
```

### 快速开始

```tsx
import { Button, Dialog, Card } from '@yyc3/ui';

function App() {
  return (
    <Card>
      <Button variant="primary">点击我</Button>
    </Card>
  );
}
```

### 组件列表

#### 基础组件

| 组件 | 说明 | Props |
|------|------|-------|
| `Button` | 按钮 | `variant`, `size`, `disabled` |
| `Input` | 输入框 | `type`, `placeholder`, `value` |
| `Textarea` | 文本域 | `rows`, `cols`, `maxLength` |
| `Label` | 标签 | `htmlFor`, `required` |
| `Checkbox` | 复选框 | `checked`, `indeterminate` |
| `RadioGroup` | 单选组 | `value`, `onChange` |
| `Switch` | 开关 | `checked`, `onCheckedChange` |
| `Select` | 选择器 | `value`, `options`, `multiple` |
| `Slider` | 滑块 | `value`, `min`, `max`, `step` |

#### 布局组件

| 组件 | 说明 | Props |
|------|------|-------|
| `Card` | 卡片 | `variant`, `elevation` |
| `Separator` | 分隔线 | `orientation` |
| `AspectRatio` | 宽高比容器 | `ratio` |
| `ScrollArea` | 滚动区域 | `orientation`, `scrollHideDelay` |
| `Resizable` | 可调整大小 | `direction` |

#### 反馈组件

| 组件 | 说明 | Props |
|------|------|-------|
| `Dialog` | 对话框 | `open`, `onOpenChange` |
| `AlertDialog` | 警告对话框 | `open`, `onOpenChange` |
| `Sheet` | 抽屉 | `side`, `open`, `onOpenChange` |
| `Drawer` | 抽屉（底部） | `open`, `onOpenChange` |
| `Toast` | 轻提示 | `variant`, `duration` |
| `Progress` | 进度条 | `value`, `max` |
| `Skeleton` | 骨架屏 | `width`, `height` |
| `Spinner` | 加载中 | `size`, `color` |

#### 导航组件

| 组件 | 说明 | Props |
|------|------|-------|
| `Tabs` | 标签页 | `value`, `onValueChange` |
| `NavigationMenu` | 导航菜单 | `items`, `orientation` |
| `Breadcrumb` | 面包屑 | `items` |
| `Pagination` | 分页 | `total`, `pageSize`, `current` |
| `Menubar` | 菜单栏 | `items` |

#### 数据展示

| 组件 | 说明 | Props |
|------|------|-------|
| `Table` | 表格 | `columns`, `dataSource` |
| `Badge` | 徽章 | `variant`, `count` |
| `Avatar` | 头像 | `src`, `alt`, `fallback` |
| `Tooltip` | 提示 | `content`, `side` |
| `Popover` | 气泡卡片 | `content`, `trigger` |
| `HoverCard` | 悬浮卡片 | `content` |

---

## 🎭 @yyc3/themes

### 安装

```bash
pnpm add @yyc3/themes
```

### 使用

```tsx
import { ThemeManager, cyberpunkTheme } from '@yyc3/themes';

// 方式 1: 导入 CSS
import '@yyc3/themes/styles/cyberpunk.css';

// 方式 2: 使用主题管理器
const manager = new ThemeManager();
manager.applyTheme('cyberpunk');
```

### 可用主题

| 主题 | CSS 文件 | 说明 |
|------|----------|------|
| Default | `theme.css` | 默认主题 |
| Cyberpunk | `cyberpunk.css` | 赛博朋克风格 |
| Liquid Glass | `liquid-glass.css` | 液态玻璃风格 |

### CSS 变量

```css
:root {
  /* 颜色 */
  --primary: #3b82f6;
  --secondary: #64748b;
  --background: #ffffff;
  --foreground: #0f172a;
  
  /* 圆角 */
  --radius: 0.5rem;
  
  /* 间距 */
  --spacing: 1rem;
}
```

---

## 🔧 @yyc3/core

### 安装

```bash
pnpm add @yyc3/core
```

### 国际化 (i18n)

```tsx
import { i18nManager, t, zhMessages, enMessages } from '@yyc3/core';

// 初始化
i18nManager.init({
  locale: 'zh',
  messages: {
    zh: zhMessages,
    en: enMessages,
  },
});

// 使用
t('common.submit'); // "提交"
t('common.cancel'); // "取消"
```

### 性能监控

```tsx
import { performanceMonitor } from '@yyc3/core';

// 开始监控
performanceMonitor.start('component-render');

// 结束监控
performanceMonitor.end('component-render');

// 获取指标
const metrics = performanceMonitor.getMetrics();
```

---

## 🪝 @yyc3/hooks

### 安装

```bash
pnpm add @yyc3/hooks
```

### Hooks 列表

| Hook | 说明 | 返回值 |
|------|------|--------|
| `usePersistedState` | 持久化状态 | `[value, setValue]` |
| `useResponsive` | 响应式布局 | `{ isMobile, isTablet, isDesktop }` |
| `useGestures` | 手势识别 | `{ onTouchStart, onTouchMove, onTouchEnd }` |
| `useAI` | AI 功能 | `{ chat, isStreaming, config }` |
| `useNotifications` | 通知管理 | `{ notify, dismiss }` |
| `useChatPersistence` | 聊天持久化 | `{ save, load, clear }` |
| `useDatabaseConfig` | 数据库配置 | `{ config, updateConfig }` |
| `useSupabaseSync` | Supabase 同步 | `{ sync, status }` |

### 示例

```tsx
import { usePersistedState, useResponsive } from '@yyc3/hooks';

function MyComponent() {
  const [value, setValue] = usePersistedState('key', 'default');
  const { isMobile, isDesktop } = useResponsive();

  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

---

## 🔧 @yyc3/utils

### 安装

```bash
pnpm add @yyc3/utils
```

### 工具函数

| 函数 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `cn` | 类名合并 | `...strings` | `string` |
| `formatDate` | 日期格式化 | `date, format` | `string` |
| `formatNumber` | 数字格式化 | `num, options` | `string` |
| `debounce` | 防抖 | `fn, delay` | `Function` |
| `throttle` | 节流 | `fn, limit` | `Function` |

### 示例

```tsx
import { cn, formatDate, debounce } from '@yyc3/utils';

// 类名合并
cn('btn', 'btn-primary', { 'btn-disabled': disabled });

// 日期格式化
formatDate(new Date(), 'YYYY-MM-DD');

// 防抖
const handleSearch = debounce((query) => {
  // 搜索逻辑
}, 300);
```

---

## 📚 更多文档

- [Storybook 组件演示](https://yyc3-reusable-components.storybook.app)
- [GitHub 仓库](https://github.com/YYC-Cube/yyc3-reusable-components)
- [更新日志](./CHANGELOG.md)

---

<div align="center">

**YYC³ 组件库 - 企业级 React 组件库**

</div>
