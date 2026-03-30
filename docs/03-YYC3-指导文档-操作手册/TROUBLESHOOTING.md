# 故障排除指南

本文档提供了YYC³组件库常见问题的解决方案和故障排除方法。

## 目录

- [安装问题](#安装问题)
- [构建问题](#构建问题)
- [运行时问题](#运行时问题)
- [性能问题](#性能问题)
- [样式问题](#样式问题)
- [类型错误](#类型错误)
- [测试问题](#测试问题)

## 安装问题

### 问题：依赖安装失败

**症状**：

```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**解决方案**：

1. 清除npm缓存

```bash
npm cache clean --force
```

2. 删除node_modules和package-lock.json

```bash
rm -rf node_modules package-lock.json
```

3. 重新安装

```bash
npm install
```

4. 如果使用pnpm

```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

### 问题：TypeScript类型错误

**症状**：

```typescript
Could not find a declaration file for module '@yyc3/ui'
```

**解决方案**：

1. 确保已安装类型定义

```bash
npm install --save-dev @types/react @types/react-dom
```

2. 检查tsconfig.json配置

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

3. 重启TypeScript服务器

```bash
# VSCode
Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

## 构建问题

### 问题：构建失败

**症状**：

```bash
Module not found: Error: Can't resolve '@yyc3/ui'
```

**解决方案**：

1. 检查包是否正确安装

```bash
npm list @yyc3/ui
```

2. 确保在package.json中正确声明依赖

```json
{
  "dependencies": {
    "@yyc3/ui": "^1.0.0"
  }
}
```

3. 清除构建缓存

```bash
rm -rf .next dist build
npm run build
```

### 问题：样式丢失

**症状**：组件样式没有正确应用

**解决方案**：

1. 确保导入了样式文件

```tsx
import '@yyc3/ui/dist/styles.css';
```

2. 检查Tailwind CSS配置

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './node_modules/@yyc3/ui/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
};
```

3. 确保CSS处理器正确配置

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 运行时问题

### 问题：组件不渲染

**症状**：组件导入成功但页面空白

**解决方案**：

1. 检查React版本兼容性

```bash
npm list react react-dom
```

确保React版本 >= 18.0.0

2. 检查控制台错误

```bash
# 打开浏览器开发者工具
# 查看Console标签页
```

3. 验证组件导入

```tsx
// ✅ 正确
import { Button } from '@yyc3/ui';

// ❌ 错误
import Button from '@yyc3/ui';
```

### 问题：事件处理函数不工作

**症状**：点击事件没有触发

**解决方案**：

1. 检查事件处理函数定义

```tsx
// ✅ 正确
const handleClick = () => {
  console.log('clicked');
};

<Button onClick={handleClick}>点击</Button>

// ❌ 错误
<Button onClick={handleClick()}>点击</Button>
```

2. 检查事件绑定

```tsx
// ✅ 正确
<Button onClick={() => console.log('clicked')}>点击</Button>

// ❌ 错误
<Button onclick={() => console.log('clicked')}>点击</Button>
```

## 性能问题

### 问题：组件渲染缓慢

**症状**：页面加载或更新时卡顿

**解决方案**：

1. 使用React.memo优化组件

```tsx
import { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{/* 复杂渲染逻辑 */}</div>;
});
```

2. 使用useMemo和useCallback

```tsx
import { useMemo, useCallback } from 'react';

function MyComponent({ items }) {
  const sortedItems = useMemo(() => items.sort((a, b) => a.id - b.id), [items]);

  const handleClick = useCallback((id) => {
    console.log('clicked', id);
  }, []);

  return <div>{/* 渲染 */}</div>;
}
```

3. 使用虚拟滚动

```tsx
import { VirtualList } from '@yyc3/ui';

<VirtualList
  items={largeList}
  itemHeight={50}
  renderItem={(item) => <div>{item.name}</div>}
/>;
```

### 问题：内存泄漏

**症状**：浏览器内存持续增长

**解决方案**：

1. 清理副作用

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

2. 取消未完成的请求

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetchData((signal) => controller.signal);

  return () => {
    controller.abort();
  };
}, []);
```

3. 清理事件监听器

```tsx
useEffect(() => {
  const handleResize = () => {
    console.log('resized');
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

## 样式问题

### 问题：Tailwind CSS类名不生效

**症状**：添加的Tailwind类名没有效果

**解决方案**：

1. 检查Tailwind配置

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@yyc3/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

2. 确保CSS文件被导入

```tsx
// main.tsx
import './index.css';
```

3. 检查PostCSS配置

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 问题：响应式设计不工作

**症状**：在不同屏幕尺寸下布局不正确

**解决方案**：

1. 使用响应式工具类

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 内容 */}
</div>
```

2. 使用响应式Hook

```tsx
import { useResponsive } from '@yyc3/hooks';

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TableView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

## 类型错误

### 问题：TypeScript类型不匹配

**症状**：

```typescript
Type 'string' is not assignable to type 'number'
```

**解决方案**：

1. 使用类型断言

```tsx
const value = '123' as unknown as number;
```

2. 使用类型守卫

```tsx
function isNumber(value: any): value is number {
  return typeof value === 'number';
}

if (isNumber(value)) {
  console.log(value.toFixed(2));
}
```

3. 使用泛型

```tsx
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>('hello');
```

### 问题：Props类型错误

**症状**：

```typescript
Property 'onClick' does not exist on type 'IntrinsicAttributes & { children?: ReactNode; }'
```

**解决方案**：

1. 正确定义Props接口

```tsx
interface MyComponentProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

function MyComponent({ onClick, children }: MyComponentProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

2. 扩展HTML属性

```tsx
interface MyComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customProp?: string;
}

function MyComponent({ customProp, ...props }: MyComponentProps) {
  return <button {...props}>{customProp}</button>;
}
```

## 测试问题

### 问题：测试失败

**症状**：

```
Expected: "Hello"
Received: "World"
```

**解决方案**：

1. 检查测试断言

```tsx
// ✅ 正确
expect(screen.getByText('Hello')).toBeInTheDocument();

// ❌ 错误
expect(screen.getByText('World')).toBeInTheDocument();
```

2. 使用正确的查询方法

```tsx
// 按文本查找
screen.getByText('Submit');

// 按角色查找
screen.getByRole('button');

// 按测试ID查找
screen.getByTestId('submit-button');
```

3. 等待异步操作

```tsx
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### 问题：测试覆盖率低

**症状**：代码覆盖率低于80%

**解决方案**：

1. 添加更多测试用例

```tsx
describe('MyComponent', () => {
  it('renders correctly', () => {
    // 测试基本渲染
  });

  it('handles click events', () => {
    // 测试事件处理
  });

  it('displays error message', () => {
    // 测试错误状态
  });

  it('shows loading state', () => {
    // 测试加载状态
  });
});
```

2. 测试边界情况

```tsx
it('handles empty data', () => {
  render(<MyComponent data={[]} />);
  expect(screen.getByText('No data')).toBeInTheDocument();
});

it('handles null values', () => {
  render(<MyComponent data={null} />);
  expect(screen.getByText('Error')).toBeInTheDocument();
});
```

3. 测试异步操作

```tsx
it('loads data asynchronously', async () => {
  render(<MyComponent />);
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

## 获取帮助

如果以上解决方案无法解决您的问题，请：

1. 查看文档
   - [API文档](./API.md)
   - [使用示例](./EXAMPLES.md)
   - [贡献指南](./CONTRIBUTING.md)

2. 搜索已知问题
   - [GitHub Issues](https://github.com/YYC-Cube/yyc3-reusable-components/issues)

3. 提交新问题
   - 创建GitHub Issue
   - 提供详细的错误信息
   - 包含复现步骤
   - 说明环境信息

4. 联系支持
   - 邮箱: support@0379.email
   - 工作时间: 周一至周五 9:00-18:00

---

<div align="center">

> 「**_YanYuCloudCube_**」「**_<admin@0379.email>_**」「**_Words Initiate
> Quadrants, Language Serves as Core for Future_**」

</div>
