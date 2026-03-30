# 使用示例

本文档提供了YYC³组件库的详细使用示例，帮助您快速上手。

## 目录

- [快速开始](#快速开始)
- [UI组件示例](#ui组件示例)
- [业务组件示例](#业务组件示例)
- [Hooks示例](#hooks示例)
- [工具函数示例](#工具函数示例)
- [完整应用示例](#完整应用示例)

## 快速开始

### 安装

```bash
# 安装UI组件包
npm install @yyc3/ui

# 安装业务组件包
npm install @yyc3/business

# 安装Hooks包
npm install @yyc3/hooks

# 安装工具函数包
npm install @yyc3/utils
```

### 基本使用

```tsx
import { Button, Input, Dialog } from '@yyc3/ui';
import { Dashboard } from '@yyc3/business';
import { usePersistedState } from '@yyc3/hooks';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = usePersistedState('theme', 'light');

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>打开对话框</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <p>这是一个对话框</p>
      </Dialog>
    </div>
  );
}
```

## UI组件示例

### 表单示例

```tsx
import { useState } from 'react';
import { Button, Input, Select, Checkbox } from '@yyc3/ui';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password, remember });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        label="邮箱"
        placeholder="请输入邮箱"
        value={email}
        onChange={setEmail}
        required
      />
      <Input
        type="password"
        label="密码"
        placeholder="请输入密码"
        value={password}
        onChange={setPassword}
        required
      />
      <Checkbox checked={remember} onChange={setRemember} label="记住我" />
      <Button type="submit" variant="primary">
        登录
      </Button>
    </form>
  );
}
```

### 表格示例

```tsx
import { Table } from '@yyc3/ui';

const columns = [
  { key: 'name', title: '姓名' },
  { key: 'email', title: '邮箱' },
  { key: 'role', title: '角色' },
];

const data = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
];

function UserTable() {
  return (
    <Table
      columns={columns}
      data={data}
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  );
}
```

### 卡片示例

```tsx
import { Card, Badge, Avatar } from '@yyc3/ui';

function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <div className="flex items-center space-x-4">
        <Avatar src={user.avatar} name={user.name} />
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
          <Badge variant="primary">{user.role}</Badge>
        </div>
      </div>
    </Card>
  );
}
```

## 业务组件示例

### 仪表板示例

```tsx
import { Dashboard } from '@yyc3/business';

const dashboardData = {
  totalUsers: 1234,
  totalOrders: 5678,
  totalRevenue: 123456.78,
  recentActivity: [
    { id: 1, type: 'order', message: '新订单 #1234', time: '5分钟前' },
    { id: 2, type: 'user', message: '新用户注册', time: '10分钟前' },
  ],
};

function AppDashboard() {
  return (
    <Dashboard
      data={dashboardData}
      onRefresh={() => console.log('Refreshing...')}
    />
  );
}
```

### 客户管理示例

```tsx
import { useState } from 'react';
import { Customers } from '@yyc3/business';

function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: '新客户',
      email: 'new@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCustomers([...customers, newCustomer]);
  };

  const handleEditCustomer = (customer: Customer) => {
    console.log('Edit customer:', customer);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((c) => c.id !== customerId));
  };

  return (
    <Customers
      customers={customers}
      onAdd={handleAddCustomer}
      onEdit={handleEditCustomer}
      onDelete={handleDeleteCustomer}
    />
  );
}
```

### 订单管理示例

```tsx
import { useState } from 'react';
import { Orders } from '@yyc3/business';

function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleCreateOrder = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      customerId: '1',
      items: [],
      total: 0,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrders([...orders, newOrder]);
  };

  return (
    <Orders
      orders={orders}
      onCreate={handleCreateOrder}
      onUpdate={(order) => console.log('Update order:', order)}
    />
  );
}
```

## Hooks示例

### 持久化状态示例

```tsx
import { usePersistedState } from '@yyc3/hooks';

function Settings() {
  const [theme, setTheme] = usePersistedState('theme', 'light');
  const [language, setLanguage] = usePersistedState('language', 'zh');

  return (
    <div>
      <h2>设置</h2>
      <div>
        <label>主题:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </div>
      <div>
        <label>语言:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}
```

### 通知示例

```tsx
import { useNotifications } from '@yyc3/hooks';
import { Button } from '@yyc3/ui';

function NotificationDemo() {
  const { addNotification } = useNotifications();

  const showSuccess = () => {
    addNotification({
      type: 'success',
      message: '操作成功',
      duration: 3000,
    });
  };

  const showError = () => {
    addNotification({
      type: 'error',
      message: '操作失败',
      duration: 5000,
    });
  };

  const showWarning = () => {
    addNotification({
      type: 'warning',
      message: '请注意',
      duration: 4000,
    });
  };

  return (
    <div>
      <Button onClick={showSuccess}>成功通知</Button>
      <Button onClick={showError} variant="danger">
        错误通知
      </Button>
      <Button onClick={showWarning} variant="outline">
        警告通知
      </Button>
    </div>
  );
}
```

### 响应式设计示例

```tsx
import { useResponsive } from '@yyc3/hooks';

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div>
      {isMobile && <p>移动端视图</p>}
      {isTablet && <p>平板视图</p>}
      {isDesktop && <p>桌面端视图</p>}
    </div>
  );
}
```

## 工具函数示例

### 类名合并示例

```tsx
import { cn } from '@yyc3/utils';

function MyComponent({
  isActive,
  isDisabled,
}: {
  isActive: boolean;
  isDisabled: boolean;
}) {
  const className = cn(
    'base-class',
    isActive && 'active-class',
    isDisabled && 'disabled-class',
    'custom-class'
  );

  return <div className={className}>内容</div>;
}
```

### 日期格式化示例

```tsx
import { formatDate } from '@yyc3/utils';

function DateDisplay({ date }: { date: Date }) {
  const formattedDate = formatDate(date, 'YYYY年MM月DD日 HH:mm');
  return <span>{formattedDate}</span>;
}
```

### 防抖示例

```tsx
import { useState } from 'react';
import { debounce } from '@yyc3/utils';
import { Input } from '@yyc3/ui';

function SearchComponent() {
  const [query, setQuery] = useState('');

  const handleSearch = debounce((searchQuery: string) => {
    console.log('Searching for:', searchQuery);
  }, 300);

  const handleChange = (value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  return <Input placeholder="搜索..." value={query} onChange={handleChange} />;
}
```

## 完整应用示例

### 简单的CRM应用

```tsx
import { useState } from 'react';
import { Button, Input, Dialog, Table } from '@yyc3/ui';
import { Customers, Orders } from '@yyc3/business';
import { usePersistedState, useNotifications } from '@yyc3/hooks';
import { formatDate } from '@yyc3/utils';

function CRMApp() {
  const [activeTab, setActiveTab] = usePersistedState('activeTab', 'customers');
  const { addNotification } = useNotifications();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: '新客户',
      email: 'new@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCustomers([...customers, newCustomer]);
    addNotification({
      type: 'success',
      message: '客户添加成功',
    });
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button onClick={() => setActiveTab('customers')}>客户</Button>
        <Button onClick={() => setActiveTab('orders')} variant="outline">
          订单
        </Button>
      </div>

      {activeTab === 'customers' && (
        <div>
          <div className="mb-4">
            <Button onClick={handleAddCustomer}>添加客户</Button>
          </div>
          <Table
            columns={[
              { key: 'name', title: '姓名' },
              { key: 'email', title: '邮箱' },
              { key: 'createdAt', title: '创建时间' },
            ]}
            data={customers.map((c) => ({
              ...c,
              createdAt: formatDate(c.createdAt),
            }))}
          />
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <Orders orders={orders} />
        </div>
      )}
    </div>
  );
}
```

### 仪表板应用

```tsx
import { useState, useEffect } from 'react';
import { Dashboard } from '@yyc3/business';
import { Card, Chart } from '@yyc3/ui';
import { useNotifications } from '@yyc3/hooks';

function DashboardApp() {
  const { addNotification } = useNotifications();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dashboard');
      const dashboardData = await response.json();
      setData(dashboardData);
      addNotification({
        type: 'success',
        message: '数据刷新成功',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: '数据加载失败',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button onClick={fetchData} disabled={loading}>
          {loading ? '加载中...' : '刷新'}
        </Button>
      </div>

      {data && <Dashboard data={data} onRefresh={fetchData} />}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <h3>用户增长</h3>
          <Chart data={data?.userGrowth} type="line" />
        </Card>
        <Card>
          <h3>订单统计</h3>
          <Chart data={data?.orderStats} type="bar" />
        </Card>
        <Card>
          <h3>收入分析</h3>
          <Chart data={data?.revenue} type="area" />
        </Card>
      </div>
    </div>
  );
}
```

---

<div align="center">

> 「**_YanYuCloudCube_**」「**_<admin@0379.email>_**」「**_Words Initiate
> Quadrants, Language Serves as Core for Future_**」

</div>
