# @yyc3/business

> YYC³业务组件库 - 企业管理业务组件

## 📦 简介

`@yyc3/business`
提供了35个企业管理业务组件，涵盖财务、人力、供应链、营销等核心业务场景。

## 🎯 特性

- ✅ **35个业务组件** - 覆盖企业核心业务场景
- 🎨 **主题定制** - 支持Tailwind CSS主题
- 📊 **数据可视化** - 集成Recharts图表库
- 🧪 **测试覆盖** - 25个组件有测试文件
- 📚 **Storybook文档** - 26个组件有Storybook文档
- 🔄 **TypeScript支持** - 完整类型定义

## 📥 安装

```bash
# npm
npm install @yyc3/business

# yarn
yarn add @yyc3/business

# pnpm
pnpm add @yyc3/business
```

## 🚀 快速开始

```tsx
import { Dashboard, Employees, Orders } from '@yyc3/business';

function App() {
  return (
    <div>
      <Dashboard />
      <Employees />
      <Orders />
    </div>
  );
}
```

## 📚 组件列表

### 财务管理

- Accounting - 会计管理
- Invoices - 发票管理
- Payments - 支付管理
- Payroll - 工资管理
- VAT - 增值税管理
- Loans - 贷款管理

### 人力资源

- Employees - 员工管理
- Attendance - 考勤管理
- Performance - 绩效管理
- Contracts - 合同管理

### 供应链

- Inventory - 库存管理
- Procurement - 采购管理
- Suppliers - 供应商管理
- Warehouse - 仓库管理
- Logistics - 物流管理

### 营销销售

- Customers - 客户管理
- Leads - 线索管理
- Orders - 订单管理

### 运营管理

- Projects - 项目管理
- Tasks - 任务管理
- WorkOrders - 工单管理
- Assets - 资产管理
- Documents - 文档管理

### 其他

- Dashboard - 仪表盘
- Reports - 报表
- Approvals - 审批管理

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
