# YYC³ 组件库 - 测试规范

> **规范版本**: v1.0.0 **创建日期**: 2024年3月28日 **适用范围**:
> YYC³组件库所有包的测试

---

## 📋 规范概述

本规范定义了YYC³组件库的测试策略和最佳实践，确保代码质量和可维护性。

### 目标

- ✅ 确保代码质量
- ✅ 提高测试覆盖率
- ✅ 降低维护成本
- ✅ 支持持续集成

### 测试原则

- **快速**: 测试应该快速执行
- **可靠**: 测试结果应该一致
- **可维护**: 测试代码应该易于理解和修改
- **独立**: 测试之间应该相互独立

---

## 🎯 测试类型

### 1. 单元测试 (Unit Tests)

测试单个函数、组件或类的功能。

**适用场景**:

- 工具函数
- 自定义Hooks
- 独立组件

**示例**:

```typescript
import { describe, it, expect } from 'vitest';
import { add } from './utils';

describe('add', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should handle negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});
```

### 2. 集成测试 (Integration Tests)

测试多个组件或模块之间的交互。

**适用场景**:

- 组件组合
- 状态管理
- 服务层集成

**示例**:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ThemeProvider } from './ThemeProvider';

describe('Button with ThemeProvider', () => {
  it('should render with theme', () => {
    render(
      <ThemeProvider theme="dark">
        <Button>Click me</Button>
      </ThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveClass('dark');
  });
});
```

### 3. E2E测试 (End-to-End Tests)

测试完整的用户流程。

**适用场景**:

- 关键用户路径
- 跨页面交互
- 复杂业务流程

**示例**:

```typescript
import { test, expect } from '@playwright/test';

test('user can login and view dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

---

## 🛠 测试工具

### Vitest

Vitest是一个快速的单元测试框架，与Vite完美集成。

**配置**:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Testing Library

Testing Library提供了一组用于测试React组件的工具。

**核心原则**:

- 测试用户行为，而不是实现细节
- 模拟真实用户交互
- 使用可访问性查询

**示例**:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Playwright

Playwright用于E2E测试，支持多浏览器。

**配置**:

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

---

## 📦 测试配置

### 包测试配置

每个包的package.json应该包含测试脚本：

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

### 测试文件结构

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── test/
│       ├── setup.ts
│       ├── Button.test.tsx
│       └── Input.test.tsx
```

### 测试设置文件

```typescript
// src/test/setup.ts
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

---

## 🎯 组件测试最佳实践

### 1. 测试用户行为

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('should allow user to login', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password',
    });
  });
});
```

### 2. 测试边界情况

```typescript
describe('Pagination', () => {
  it('should handle first page', () => {
    render(<Pagination currentPage={1} totalPages={10} />);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('should handle last page', () => {
    render(<Pagination currentPage={10} totalPages={10} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should handle single page', () => {
    render(<Pagination currentPage={1} totalPages={1} />);
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});
```

### 3. 测试异步操作

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { fetchData } from './api';

vi.mock('./api');

describe('DataLoader', () => {
  it('should show loading state', () => {
    vi.mocked(fetchData).mockImplementation(() => new Promise(() => {}));
    render(<DataLoader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show data after loading', async () => {
    vi.mocked(fetchData).mockResolvedValue({ data: 'test' });
    render(<DataLoader />);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });
});
```

### 4. 测试错误处理

```typescript
describe('ErrorBoundary', () => {
  it('should catch errors and show fallback', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
```

---

## 🪝 Hooks测试最佳实践

### 1. 测试自定义Hooks

```typescript
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });
});
```

### 2. 测试异步Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

vi.mock('./api');

describe('useFetch', () => {
  it('should fetch data', async () => {
    const mockData = { id: 1, name: 'Test' };
    vi.mocked(fetchData).mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle errors', async () => {
    vi.mocked(fetchData).mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => useFetch('/api/data'));

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.loading).toBe(false);
    });
  });
});
```

---

## 🗄 Store测试最佳实践

### 1. 测试Zustand Store

```typescript
import { create } from 'zustand';
import { useCounterStore } from './counterStore';

describe('counterStore', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  it('should initialize with default state', () => {
    const state = useCounterStore.getState();
    expect(state.count).toBe(0);
  });

  it('should increment count', () => {
    useCounterStore.getState().increment();
    const state = useCounterStore.getState();
    expect(state.count).toBe(1);
  });

  it('should decrement count', () => {
    useCounterStore.setState({ count: 5 });
    useCounterStore.getState().decrement();
    const state = useCounterStore.getState();
    expect(state.count).toBe(4);
  });

  it('should reset count', () => {
    useCounterStore.setState({ count: 10 });
    useCounterStore.getState().reset();
    const state = useCounterStore.getState();
    expect(state.count).toBe(0);
  });
});
```

---

## 📊 测试覆盖率

### 覆盖率目标

| 类型           | 目标 | 说明               |
| -------------- | ---- | ------------------ |
| **语句覆盖率** | >80% | 执行的代码语句比例 |
| **分支覆盖率** | >75% | 执行的代码分支比例 |
| **函数覆盖率** | >90% | 调用的函数比例     |
| **行覆盖率**   | >80% | 执行的代码行比例   |

### 生成覆盖率报告

```bash
# 生成覆盖率报告
pnpm test:coverage

# 查看HTML报告
open coverage/index.html
```

### 覆盖率配置

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 90,
        branches: 75,
        statements: 80,
      },
    },
  },
});
```

---

## 🚀 CI/CD测试流程

### GitHub Actions配置

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run lint
        run: pnpm lint

      - name: Run typecheck
        run: pnpm typecheck

      - name: Run tests
        run: pnpm test:run

      - name: Generate coverage
        run: pnpm test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella
```

### Pre-commit Hook

```bash
#!/bin/bash
# .husky/pre-commit

pnpm lint
pnpm typecheck
pnpm test:run
```

---

## 📝 测试检查清单

在提交代码前，请确保：

- [ ] 测试文件命名正确（`.test.ts`或`.test.tsx`）
- [ ] 测试描述清晰明确
- [ ] 测试覆盖了正常情况
- [ ] 测试覆盖了边界情况
- [ ] 测试覆盖了错误情况
- [ ] 测试使用了正确的断言
- [ ] 测试没有依赖外部状态
- [ ] 测试可以独立运行
- [ ] 测试覆盖率满足要求
- [ ] Mock使用正确

---

## 🔧 故障排查

### 测试失败

#### 问题：测试超时

```typescript
// 解决方案：增加超时时间
it('should load data', async () => {
  await waitFor(
    () => {
      expect(screen.getByText('Loaded')).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
});
```

#### 问题：Mock不工作

```typescript
// 解决方案：使用vi.mocked
import { fetchData } from './api';
vi.mock('./api');

vi.mocked(fetchData).mockResolvedValue({ data: 'test' });
```

#### 问题：测试不稳定

```typescript
// 解决方案：使用waitFor
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

---

## 📚 参考资料

- [Vitest 文档](https://vitest.dev/)
- [Testing Library 文档](https://testing-library.com/)
- [Playwright 文档](https://playwright.dev/)
- [React Testing Library 最佳实践](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**规范维护**: YYC³ Team  
**最后更新**: 2024年3月28日
