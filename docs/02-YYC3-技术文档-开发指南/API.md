# API 文档

YYC³组件库提供完整的API接口，支持灵活的组件定制和扩展。

## 目录

- [UI组件](#ui组件)
- [业务组件](#业务组件)
- [Hooks](#hooks)
- [工具函数](#工具函数)
- [服务](#服务)

## UI组件

### Button

按钮组件，支持多种样式和尺寸。

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
```

**Props**:

- `variant`: 按钮样式变体，默认为 `'primary'`
- `size`: 按钮尺寸，默认为 `'md'`
- `disabled`: 是否禁用，默认为 `false`
- `loading`: 是否显示加载状态，默认为 `false`
- `onClick`: 点击事件处理函数
- `children`: 按钮内容
- `className`: 自定义类名

**示例**:

```tsx
import { Button } from '@yyc3/ui';

<Button variant="primary" onClick={() => console.log('clicked')}>
  点击我
</Button>;
```

### Input

输入框组件，支持多种输入类型和验证。

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
}
```

**Props**:

- `type`: 输入类型，默认为 `'text'`
- `placeholder`: 占位符文本
- `value`: 输入值
- `onChange`: 值变化回调
- `disabled`: 是否禁用
- `error`: 错误信息
- `label`: 标签文本
- `required`: 是否必填
- `className`: 自定义类名

**示例**:

```tsx
import { Input } from '@yyc3/ui';

<Input
  type="email"
  label="邮箱"
  placeholder="请输入邮箱"
  value={email}
  onChange={setEmail}
  error={error}
/>;
```

### Dialog

对话框组件，用于显示模态内容。

```typescript
interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}
```

**Props**:

- `open`: 是否打开对话框
- `onClose`: 关闭回调
- `title`: 对话框标题
- `children`: 对话框内容
- `showCloseButton`: 是否显示关闭按钮
- `className`: 自定义类名

**示例**:

```tsx
import { Dialog } from '@yyc3/ui';

<Dialog open={isOpen} onClose={() => setIsOpen(false)} title="确认">
  <p>确定要删除此项目吗？</p>
  <Button onClick={() => setIsOpen(false)}>取消</Button>
  <Button variant="danger" onClick={handleDelete}>
    删除
  </Button>
</Dialog>;
```

## 业务组件

### Dashboard

仪表板组件，提供数据概览和统计。

```typescript
interface DashboardProps {
  data?: DashboardData;
  onRefresh?: () => void;
  className?: string;
}

interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  recentActivity: Activity[];
}
```

**Props**:

- `data`: 仪表板数据
- `onRefresh`: 刷新回调
- `className`: 自定义类名

**示例**:

```tsx
import { Dashboard } from '@yyc3/business';

<Dashboard data={dashboardData} onRefresh={() => fetchDashboardData()} />;
```

### Customers

客户管理组件，提供客户列表和操作。

```typescript
interface CustomersProps {
  customers?: Customer[];
  onAdd?: () => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customerId: string) => void;
  className?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Props**:

- `customers`: 客户列表
- `onAdd`: 添加客户回调
- `onEdit`: 编辑客户回调
- `onDelete`: 删除客户回调
- `className`: 自定义类名

**示例**:

```tsx
import { Customers } from '@yyc3/business';

<Customers
  customers={customers}
  onAdd={handleAddCustomer}
  onEdit={handleEditCustomer}
  onDelete={handleDeleteCustomer}
/>;
```

## Hooks

### usePersistedState

持久化状态Hook，将状态保存到localStorage。

```typescript
function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void];
```

**参数**:

- `key`: localStorage键名
- `initialValue`: 初始值

**返回值**:

- `[state, setState]`: 状态和设置函数

**示例**:

```tsx
import { usePersistedState } from '@yyc3/hooks';

const [theme, setTheme] = usePersistedState('theme', 'light');
```

### useNotifications

通知Hook，用于显示和管理通知。

```typescript
function useNotifications(): {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};
```

**返回值**:

- `notifications`: 通知列表
- `addNotification`: 添加通知
- `removeNotification`: 移除通知
- `clearNotifications`: 清除所有通知

**示例**:

```tsx
import { useNotifications } from '@yyc3/hooks';

const { addNotification } = useNotifications();

addNotification({
  type: 'success',
  message: '操作成功',
  duration: 3000,
});
```

## 工具函数

### cn

类名合并工具，支持Tailwind CSS类名。

```typescript
function cn(...classes: (string | undefined | null | false)[]): string;
```

**示例**:

```tsx
import { cn } from '@yyc3/utils';

const className = cn('base-class', isActive && 'active-class', customClass);
```

### formatDate

日期格式化工具。

```typescript
function formatDate(date: Date | string, format?: string): string;
```

**参数**:

- `date`: 日期对象或字符串
- `format`: 格式字符串，默认为 `'YYYY-MM-DD'`

**示例**:

```tsx
import { formatDate } from '@yyc3/utils';

const formattedDate = formatDate(new Date(), 'YYYY年MM月DD日');
```

### debounce

防抖函数。

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void;
```

**参数**:

- `func`: 要防抖的函数
- `wait`: 等待时间（毫秒）

**示例**:

```tsx
import { debounce } from '@yyc3/utils';

const debouncedSearch = debounce((query: string) => {
  search(query);
}, 300);
```

## 服务

### DatabaseService

数据库服务，提供数据库操作接口。

```typescript
class DatabaseService {
  static async connect(config: DatabaseConfig): Promise<void>;
  static async query<T>(sql: string, params?: any[]): Promise<T[]>;
  static async execute(sql: string, params?: any[]): Promise<void>;
  static async disconnect(): Promise<void>;
}
```

**方法**:

- `connect`: 连接数据库
- `query`: 执行查询
- `execute`: 执行命令
- `disconnect`: 断开连接

**示例**:

```tsx
import { DatabaseService } from '@yyc3/services';

await DatabaseService.connect({
  host: 'localhost',
  database: 'mydb',
  user: 'user',
  password: 'password',
});

const users = await DatabaseService.query<User>('SELECT * FROM users');
```

### DevOpsService

DevOps服务，提供CI/CD操作接口。

```typescript
class DevOpsService {
  static async deploy(config: DeployConfig): Promise<DeployResult>;
  static async rollback(deploymentId: string): Promise<void>;
  static async getStatus(deploymentId: string): Promise<DeploymentStatus>;
}
```

**方法**:

- `deploy`: 部署应用
- `rollback`: 回滚部署
- `getStatus`: 获取部署状态

**示例**:

```tsx
import { DevOpsService } from '@yyc3/services';

const result = await DevOpsService.deploy({
  environment: 'production',
  version: '1.0.0',
  branch: 'main',
});
```

---

<div align="center">

> 「**_YanYuCloudCube_**」「**_<admin@0379.email>_**」「**_Words Initiate
> Quadrants, Language Serves as Core for Future_**」

</div>
