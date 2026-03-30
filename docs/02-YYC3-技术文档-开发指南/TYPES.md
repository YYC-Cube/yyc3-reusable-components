# 类型定义文档

YYC³组件库使用TypeScript提供完整的类型定义，确保类型安全和更好的开发体验。

## 目录

- [核心类型](#核心类型)
- [UI组件类型](#ui组件类型)
- [业务组件类型](#业务组件类型)
- [Hooks类型](#hooks类型)
- [工具函数类型](#工具函数类型)
- [服务类型](#服务类型)

## 核心类型

### I18n相关类型

```typescript
export interface I18nConfig {
  defaultLocale: string;
  supportedLocales: string[];
  fallbackLocale: string;
  localeDetection: 'browser' | 'cookie' | 'storage' | 'manual';
}

export type Locale = 'zh' | 'en' | 'ar';

export interface Translation {
  [key: string]: string | Translation;
}

export class I18nManager {
  setLocale(locale: Locale): void;
  getLocale(): Locale;
  t(key: string, params?: Record<string, any>): string;
}
```

### 性能监控类型

```typescript
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold?: number;
  timestamp: Date;
}

export interface PerformanceAlert {
  metricName: string;
  currentValue: number;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  message: string;
}

export interface PerformanceBenchmark {
  name: string;
  duration: number;
  memory: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}
```

### 日志类型

```typescript
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export const createLogger = (context: string) => new Logger(context);
```

### 任务跟踪类型

```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  assignee?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export class TaskTracker {
  addTask(task: Task): void;
  getTask(id: string): Task | undefined;
  updateTask(id: string, updates: Partial<Task>): void;
  completeTask(id: string): void;
  getTasksByStatus(status: Task['status']): Task[];
  getTasksByPriority(priority: Task['priority']): Task[];
  exportTasks(): string;
}
```

## UI组件类型

### 基础组件类型

```typescript
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface SelectProps<T = string> {
  label?: string;
  placeholder?: string;
  value?: T;
  onChange?: (value: T) => void;
  options: Array<{ label: string; value: T }>;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
```

### 数据展示组件类型

```typescript
export interface TableProps<T = any> {
  columns: Array<{
    key: string;
    title: string;
    render?: (value: any, record: T, index: number) => React.ReactNode;
  }>;
  data: T[];
  onRowClick?: (record: T, index: number) => void;
  loading?: boolean;
  className?: string;
}

export interface CardProps {
  children?: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
}

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  children?: React.ReactNode;
  className?: string;
}

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

### 反馈组件类型

```typescript
export interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  className?: string;
}

export interface TooltipProps {
  content?: string;
  children?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}
```

## 业务组件类型

### 客户管理类型

```typescript
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomersProps {
  customers: Customer[];
  onAdd?: () => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customerId: string) => void;
  loading?: boolean;
}
```

### 订单管理类型

```typescript
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrdersProps {
  orders: Order[];
  onCreate?: () => void;
  onUpdate?: (order: Order) => void;
  loading?: boolean;
}
```

### 库存管理类型

```typescript
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryProps {
  products: Product[];
  onAdd?: () => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  loading?: boolean;
}
```

### 员工管理类型

```typescript
export type EmployeeRole = 'admin' | 'manager' | 'employee';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: EmployeeRole;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeesProps {
  employees: Employee[];
  onAdd?: () => void;
  onEdit?: (employee: Employee) => void;
  onDelete?: (employeeId: string) => void;
  loading?: boolean;
}
```

### 仪表板类型

```typescript
export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  userGrowth: Array<{ date: string; count: number }>;
  orderStats: Array<{ status: string; count: number }>;
  revenue: Array<{ date: string; amount: number }>;
  recentActivity: Array<{
    id: string;
    type: string;
    message: string;
    time: string;
  }>;
}

export interface DashboardProps {
  data: DashboardData;
  onRefresh?: () => void;
  loading?: boolean;
}
```

## Hooks类型

### 状态管理Hooks

```typescript
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void];

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void];

export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void];
```

### 通知Hooks

```typescript
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export function useNotifications(): {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};
```

### 响应式Hooks

```typescript
export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

export function useResponsive(): ResponsiveState;

export function useMediaQuery(query: string): boolean;
```

### 异步Hooks

```typescript
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate?: boolean
): AsyncState<T> & { execute: () => Promise<void> };

export function useFetch<T>(
  url: string,
  options?: RequestInit
): AsyncState<T> & { refetch: () => Promise<void> };
```

### 生命周期Hooks

```typescript
export function useMount(fn: () => void): void;
export function useUnmount(fn: () => void): void;
export function useUpdate(fn: () => void): void;
export function useFirstMountState(): boolean;
```

### 表单Hooks

```typescript
export interface FormField<T = any> {
  value: T;
  error?: string;
  touched: boolean;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T
): {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  handleChange: (name: keyof T, value: any) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void;
  resetForm: () => void;
  setFieldValue: (name: keyof T, value: any) => void;
  setFieldError: (name: keyof T, error: string) => void;
};
```

## 工具函数类型

### 类名工具

```typescript
export function cn(...classes: (string | undefined | null | false)[]): string;
```

### 日期工具

```typescript
export function formatDate(date: Date | string, format?: string): string;

export function parseDate(dateString: string, format?: string): Date;

export function addDays(date: Date, days: number): Date;

export function diffDays(date1: Date, date2: Date): number;
```

### 字符串工具

```typescript
export function truncate(str: string, length: number): string;

export function capitalize(str: string): string;

export function camelCase(str: string): string;
export function kebabCase(str: string): string;
export function snakeCase(str: string): string;
```

### 数组工具

```typescript
export function chunk<T>(array: T[], size: number): T[][];

export function unique<T>(array: T[]): T[];

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]>;
```

### 对象工具

```typescript
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K>;

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>;

export function merge<T extends object>(...objects: Partial<T>[]): T;
```

### 函数工具

```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void;

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void;

export function memoize<T extends (...args: any[]) => any>(func: T): T;
```

### 验证工具

```typescript
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export function validate(value: any, rules: ValidationRule): string | null;

export function validateEmail(email: string): boolean;
export function validatePhone(phone: string): boolean;
export function validateURL(url: string): boolean;
```

## 服务类型

### API服务类型

```typescript
export interface APIClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
  patch<T>(url: string, data?: any): Promise<T>;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
  code?: number;
}

export interface APIError {
  message: string;
  code?: number;
  details?: any;
}
```

### 存储服务类型

```typescript
export interface StorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
}
```

### 事件服务类型

```typescript
export type EventHandler<T = any> = (data: T) => void;

export interface EventBus {
  on<T>(event: string, handler: EventHandler<T>): void;
  off<T>(event: string, handler: EventHandler<T>): void;
  emit<T>(event: string, data: T): void;
  once<T>(event: string, handler: EventHandler<T>): void;
  clear(): void;
}
```

## 使用示例

### 类型导入

```typescript
import type { ButtonProps, Customer, usePersistedState } from '@yyc3/ui';
import type { I18nConfig, Logger } from '@yyc3/core';
```

### 类型断言

```typescript
const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  onClick: () => console.log('clicked'),
};

const customer: Customer = {
  id: '1',
  name: '张三',
  email: 'zhangsan@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

### 类型守卫

```typescript
function isCustomer(obj: any): obj is Customer {
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}
```

---

<div align="center">

> 「**_YanYuCloudCube_**」「**_<admin@0379.email>_**」「**_Words Initiate
> Quadrants, Language Serves as Core for Future_**」

</div>
