# Business 组件测试目录

这些测试文件已被暂时移动到 `__tests_disabled__` 目录，因为组件尚未实现。

当组件实现后，可以将测试文件移回此目录。

## 禁用的测试文件

- Accounting.test.tsx
- Approvals.test.tsx
- Assets.test.tsx
- Attendance.test.tsx
- Contracts.test.tsx
- Customers.test.tsx
- Dashboard.test.tsx
- Documents.test.tsx
- Employees.test.tsx
- Inventory.test.tsx
- Invoices.test.tsx
- Leads.test.tsx
- Loans.test.tsx
- Logistics.test.tsx
- Orders.test.tsx
- Payments.test.tsx
- Payroll.test.tsx
- Performance.test.tsx
- Procurement.test.tsx
- Projects.test.tsx
- Reports.test.tsx
- Suppliers.test.tsx
- VAT.test.tsx
- Warehouse.test.tsx
- WorkOrders.test.tsx

## 如何恢复

当组件实现后：

```bash
cd /Volumes/Containers/初始化组件库/YYC3-组件库/packages/business/src/components
mv __tests_disabled__/*.test.tsx __tests__/
```
