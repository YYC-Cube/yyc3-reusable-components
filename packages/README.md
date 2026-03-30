# YYC³ Component Library

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence*

---

## 📋 项目概述

YYC³ Component Library 是一个统一的 Monorepo 架构，整合了 YYC³ AI Assistant 和 Futuristic Business Management 两个项目的所有组件，提供完整的组件库解决方案。

### 🎯 项目特点

- ✅ **统一管理**: 使用 Monorepo 架构统一管理所有组件
- ✅ **模块化设计**: 按功能分类为独立的包
- ✅ **标准化开发**: 遵循 YYC³ 标准化规范
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **高性能**: 使用 Turborepo 优化构建性能
- ✅ **易于复用**: 独立发布到 npm，便于复用

---

## 📦 包结构

```
yyc3-reusable-components/
├── packages/                          # 📦 组件包目录
│   ├── ui/                          # 🎨 UI基础组件包
│   │   ├── src/
│   │   │   ├── components/          # UI组件源码
│   │   │   └── index.ts             # 包入口
│   │   └── package.json
│   │
│   ├── business/                     # 💼 业务组件包
│   │   ├── src/
│   │   │   ├── components/          # 业务组件源码
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── smart/                        # 🤖 Smart组件包
│   │   ├── src/
│   │   │   ├── components/          # Smart组件源码
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── effects/                      # ✨ 特效组件包
│   │   ├── src/
│   │   │   ├── components/          # 特效组件源码
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── navigation/                   # 🧭 导航组件包
│   │   ├── src/
│   │   │   ├── components/          # 导航组件源码
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ai/                          # 🤖 AI组件包
│   │   ├── src/
│   │   │   ├── components/          # AI组件源码
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── hooks/                       # 🪝 Hooks包
│   │   ├── src/
│   │   │   ├── usePersistedState.ts
│   │   │   ├── useNavigationContext.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── utils/                       # 🔧 工具函数包
│   │   ├── src/
│   │   │   ├── cn.ts
│   │   │   ├── formatDate.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── services/                    # 📡 服务层包
│   │   ├── src/
│   │   │   ├── DatabaseService.ts
│   │   │   ├── DevOpsService.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── repositories/                 # 📊 数据访问层包
│       ├── src/
│       │   ├── DatabaseRepository.ts
│       │   ├── GitHubRepository.ts
│       │   └── index.ts
│       └── package.json
│
├── pnpm-workspace.yaml              # pnpm工作空间配置
├── package.json                    # 根包配置
├── turbo.json                     # Turborepo配置
└── README.md                      # 项目说明
```

---

## 🚀 快速开始

### 安装依赖

```bash
# 安装pnpm（如果还没有安装）
npm install -g pnpm

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动所有包的开发模式
pnpm dev

# 启动特定包的开发模式
pnpm --filter @yyc3/ui dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @yyc3/ui build
```

### 测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @yyc3/ui test
```

---

## 📦 包列表

### @yyc3/ui

UI基础组件库，包含所有基础UI组件。

**安装**:
```bash
npm install @yyc3/ui
```

**使用**:
```tsx
import { Button, Input, Dialog } from '@yyc3/ui';

function App() {
  return (
    <div>
      <Button>点击按钮</Button>
      <Input placeholder="请输入内容" />
      <Dialog>
        <DialogContent>对话框内容</DialogContent>
      </Dialog>
    </div>
  );
}
```

**包含组件**:
- Button, Input, Dialog, Card, Table, Badge, Avatar, Tooltip, Alert, Skeleton
- Tabs, Select, Checkbox, RadioGroup, Switch, Slider, Progress
- DropdownMenu, Popover, Accordion, Collapsible, Sheet, Drawer
- AlertDialog, Label, Textarea, Command, ContextMenu, Menubar
- NavigationMenu, Breadcrumb, Pagination, ScrollArea, Resizable
- AspectRatio, HoverCard, Toggle, ToggleGroup, Calendar, Carousel
- Chart, Sonner, InputOTP, GlassCard, Sidebar, use-mobile, cn

---

### @yyc3/business

业务组件库，包含企业管理相关的业务组件。

**安装**:
```bash
npm install @yyc3/business
```

**使用**:
```tsx
import { Dashboard, Customers, Orders } from '@yyc3/business';

function App() {
  return (
    <div>
      <Dashboard currentLanguage="zh" onNavigate={() => {}} />
      <Customers />
      <Orders />
    </div>
  );
}
```

**包含组件**:
- Dashboard, Customers, Orders, Inventory, Employees, Suppliers
- Projects, Contracts, Payments, Invoices, Leads, Loans
- Logistics, Warehouse, WorkOrders, Accounting, Approvals
- Attendance, Payroll, Reconciliation, VAT, Procurement
- Assets, EquipmentManager, DataManagement, DataMining
- Reports, Performance, MarketIntelligence, InventoryCheck
- TalentProfile, ProcessAutomation, WorkflowDesigner, PermissionManager, Documents

---

### @yyc3/smart

Smart组件库，包含AI智能组件。

**安装**:
```bash
npm install @yyc3/smart
```

**使用**:
```tsx
import { SmartSales, SmartPrediction, SmartAlert } from '@yyc3/smart';

function App() {
  return (
    <div>
      <SmartSales currentLanguage="zh" />
      <SmartPrediction />
      <SmartAlert />
    </div>
  );
}
```

**包含组件**:
- SmartSales, SmartPrediction, SmartAlert, SmartRisk, SmartBudget
- SmartDecision, SmartDocs, SmartSearch, SmartNLP, SmartChatbot
- SmartTraining, SmartRecruitment, SmartScheduling, SmartProduction
- SmartFulfillment, SmartAcquisition, SmartReimbursement, SmartVision
- SmartMeetings, SmartRecommendation, SmartAudit

---

### @yyc3/effects

特效组件库，包含3D和动画特效组件。

**安装**:
```bash
npm install @yyc3/effects
```

**使用**:
```tsx
import { _3DEffects, MicroInteractions, ParallaxScroll } from '@yyc3/effects';

function App() {
  return (
    <div>
      <_3DEffects />
      <MicroInteractions />
      <ParallaxScroll />
    </div>
  );
}
```

**包含组件**:
- _3DEffects, MicroInteractions, ParallaxScroll

---

### @yyc3/navigation

导航组件库，包含导航和路由组件。

**安装**:
```bash
npm install @yyc3/navigation
```

**使用**:
```tsx
import { TabNavigation } from '@yyc3/navigation';

function App() {
  return <TabNavigation />;
}
```

**包含组件**:
- TabNavigation

---

### @yyc3/ai

AI组件库，包含AI助手和聊天组件。

**安装**:
```bash
npm install @yyc3/ai
```

**使用**:
```tsx
import { Chat, ChatContainer, ChatInput, ChatMessage } from '@yyc3/ai';

function App() {
  return (
    <ChatContainer>
      <Chat />
      <ChatInput />
      <ChatMessage />
    </ChatContainer>
  );
}
```

**包含组件**:
- Chat, ChatContainer, ChatInput, ChatMessage, ChatSidebar
- ClaudeSidebar, ClaudeWelcome, SettingsModal, SystemStartup
- TypingIndicator, AsciiArt, ArtifactsPanel, YYC3Background

---

### @yyc3/hooks

自定义React Hooks库。

**安装**:
```bash
npm install @yyc3/hooks
```

**使用**:
```tsx
import { usePersistedState, useNavigationContext, useNotifications } from '@yyc3/hooks';

function App() {
  const [state, setState] = usePersistedState('key', 'default');
  const { navigate } = useNavigationContext();
  const { notify } = useNotifications();

  return <div>{/* 组件内容 */}</div>;
}
```

**包含Hooks**:
- usePersistedState, useNavigationContext, useNotifications
- useResponsive, useGestures, useAI, useChannelConfig
- useChannelManager, useChatPersistence, useDatabaseConfig
- useDevOps, useSupabaseSync, useUISettings

---

### @yyc3/utils

工具函数库，包含通用工具函数。

**安装**:
```bash
npm install @yyc3/utils
```

**使用**:
```tsx
import { cn, formatDate, formatNumber, debounce, throttle } from '@yyc3/utils';

function App() {
  const className = cn('base-class', 'additional-class');
  const date = formatDate(new Date());
  const number = formatNumber(1234.56);

  return <div className={className}>{date} - {number}</div>;
}
```

**包含函数**:
- cn, formatDate, formatNumber, debounce, throttle
- animations, colors, performanceMonitor, serviceWorkerRegistration

---

### @yyc3/services

服务层库，包含业务逻辑服务。

**安装**:
```bash
npm install @yyc3/services
```

**使用**:
```tsx
import { DatabaseService, DevOpsService, GitHubService } from '@yyc3/services';

const dbService = new DatabaseService();
const devOpsService = new DevOpsService();
const gitHubService = new GitHubService();
```

**包含服务**:
- DatabaseService, DevOpsService, GitHubService

---

### @yyc3/repositories

数据访问层库，包含数据库和API仓库。

**安装**:
```bash
npm install @yyc3/repositories
```

**使用**:
```tsx
import { DatabaseRepository, GitHubRepository } from '@yyc3/repositories';

const dbRepo = new DatabaseRepository();
const githubRepo = new GitHubRepository();
```

**包含仓库**:
- DatabaseRepository, GitHubRepository

---

## 🔧 开发指南

### 添加新组件

1. 在对应的包中创建组件文件
2. 在 `src/components/index.ts` 中导出组件
3. 运行 `pnpm build` 构建包
4. 运行 `pnpm test` 测试组件

### 发布包

```bash
# 更新版本
pnpm version-packages

# 发布到npm
pnpm release

# 或者单独发布某个包
cd packages/ui
npm publish
```

---

## 📚 文档

- [组件文档索引](../YYC3-组件拆分规范/COMPONENT_INDEX.md)
- [组件测试体系](../YYC3-组件拆分规范/TESTING_FRAMEWORK.md)
- [组件保存复用指南](../YYC3-组件拆分规范/YYC3-组件保存复用指南.md)

---

## 🤝 贡献

欢迎贡献！请查看[贡献指南](../YYC3-组件拆分规范/CONTRIBUTING.md)。

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

## 👨‍💻 作者

YYC³ Team <admin@0379.email>

---

## 🌟 致谢

感谢所有为 YYC³ Component Library 做出贡献的开发者！

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

---

**📦 YYC³ Component Library**

**📅 版本**: v1.0.0  
**👨‍💻 作者**: YYC³ Team  
**📅 更新日期**: 2024年3月27日

**📊 项目状态**: ✅ 已完成  
**🎯 包数量**: 9个  
**🧩 组件总数**: 200+

---

**🙏 感谢YYC³团队的辛勤付出和卓越贡献！**

</div>
