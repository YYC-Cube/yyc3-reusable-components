# YYC3 AI Family - Local Development Operations / 本地开发操作手册

> Version: 0.9.4 [Personalize] 快速参考卡片，所有操作均在项目根目录执行

---

## Quick Start / 一键启动（首次）

```bash
# ════════════════════════════════════════════════════════
#  Phase 1: 数据库初始化 / Database Initialization
# ════════════════════════════════════════════════════════

# 1.1 确保 PostgreSQL 15 正在运行
# macOS:
brew services start postgresql@15
# Linux:
sudo systemctl start postgresql
# Windows:
pg_ctl start -D "C:\Program Files\PostgreSQL\15\data"

# 1.2 创建角色和数据库（首次执行一次即可）
psql -U postgres -c "CREATE ROLE yyc3_admin WITH LOGIN PASSWORD 'your_password';"
psql -U postgres -c "CREATE DATABASE yyc3_family OWNER yyc3_admin;"
psql -U postgres -d yyc3_family -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO yyc3_admin;"

# 1.3 执行 DDL 建表脚本
psql -U postgres -d yyc3_family -f docs/postgresql-15-schema.sql

# 1.4 验证表结构
psql -U yyc3_admin -d yyc3_family -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"

# ════════════════════════════════════════════════════════
#  Phase 2: API 代理服务 / API Proxy Service
# ════════════════════════════════════════════════════════

# 2.1 进入服务端目录，一键初始化
cd server
npm run setup
# 这会执行: npm install → 复制 .env.example → .env

# 2.2 编辑 .env 填入密码
#     打开 server/.env，修改 YYC3_PG_PASSWORD=your_password

# 2.3 启动代理（开发模式，热重载）
npm run dev

# ════════════════════════════════════════════════════════
#  Phase 3: 验证联调 / Verify End-to-End
# ════════════════════════════════════════════════════════

# 新开一个终端窗口（保持代理运行）
# 3.1 健康检查
curl -s http://localhost:3721/api/v1/health | jq .

# 3.2 查看表清单
curl -s http://localhost:3721/api/v1/tables | jq .

# 3.3 查询 AI 家族成员
curl -s http://localhost:3721/api/v1/data/agents | jq .

# ════════════════════════════════════════════════════════
#  Phase 4: 前端启动 / Frontend Start
# ════════════════════════════════════════════════════════

# 回到项目根目录
cd ..
npm run dev
# 然后在 Settings → PG_DATABASE 面板中点击 CONNECT
```

---

## Daily Startup / 日常启动（非首次）

```bash
# 终端 1: 启动代理
cd server && npm run dev

# 终端 2: 启动前端
cd .. && npm run dev

# 终端 3: 监控（可选）
cd server && npm run health
```

---

## NPM Scripts Reference / 脚本速查

在 `server/` 目录下执行：

| Command                 | Description                  |
| ----------------------- | ---------------------------- |
| `npm run setup`         | 一键初始化（install + .env） |
| `npm run dev`           | 开发模式启动（热重载）       |
| `npm start`             | 生产模式启动                 |
| `npm run build`         | TypeScript 编译              |
| `npm run typecheck`     | 类型检查（不生成文件）       |
| `npm run db:create`     | 创建数据库和角色             |
| `npm run db:init`       | 用 yyc3_admin 执行 DDL       |
| `npm run db:init:super` | 用 postgres 超级用户执行 DDL |
| `npm run db:reset`      | 删除并重建数据库             |
| `npm run db:verify`     | 验证表结构                   |
| `npm run db:stats`      | 查看表行数统计               |
| `npm run health`        | 检查代理健康状态             |
| `npm run tables`        | 列出所有表                   |
| `npm run e2e:test`      | E2E 自动验证全部 10 个端点   |

---

## Docker Compose / 容器化一键编排

```bash
# ════════════════════════════════════════════════════════
#  Docker 模式（替代手动安装 PG + Node）
# ════════════════════════════════════════════════════════

# 首次启动（构建镜像 + 初始化数据库 + 启动三容器）
docker compose up -d --build

# 查看全部容器状态
docker compose ps

# 查看代理日志（实时）
docker compose logs -f yyc3-proxy

# 验证健康
curl -s http://localhost:3721/api/v1/health | jq .

# E2E 测试（在宿主机上执行）
cd server && npm run e2e:test

# 停止全部
docker compose down

# 停止并删除数据卷（重置数据库，慎用！）
docker compose down -v
```

### 容器架构 / Container Architecture

```
┌───────────────────────────────────────────────────────────┐
│                  docker compose                           │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ yyc3-postgres│  │ yyc3-proxy   │  │yyc3-frontend │   │
│  │ PG 15 :5432  │←─│ Express :3721│←─│ Vite :5173   │   │
│  │              │  │              │  │              │   │
│  │ Auto-init:   │  │ depends_on:  │  │ depends_on:  │   │
│  │ schema.sql   │  │ pg (healthy) │  │ proxy(healthy│   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│         ↕                  ↕                  ↕          │
│    yyc3_pgdata        host:3721          host:5173       │
└───────────────────────────────────────────────────────────┘
```

---

## E2E Endpoint Testing / 端到端测试

```bash
# 前提：API 代理正在运行（本地或 Docker 模式）
cd server

# 默认测试 localhost:3721
npm run e2e:test

# 自定义目标地址
npx tsx e2e-test.ts http://192.168.1.100:3721
```

### 测试覆盖的 10 个端点 / 10 Endpoints Covered

| #   | Method | Endpoint           | Test Action      |
| --- | ------ | ------------------ | ---------------- |
| 01  | GET    | /health            | 健康检查         |
| 02  | GET    | /tables            | 表清单           |
| 03  | GET    | /migrations/status | 迁移状态         |
| 04  | POST   | /migrations/run    | 执行迁移         |
| 05  | POST   | /data/chats        | 插入测试记录     |
| 06  | GET    | /data/chats        | 列表查询         |
| 07  | GET    | /data/chats/:id    | 单条查询         |
| 08  | PUT    | /data/chats/:id    | 更新记录         |
| 09  | POST   | /query             | 结构化查询       |
| 10  | DELETE | /data/chats/:id    | 删除记录（清理） |

---

## Auto-Reconnect / 自动重连机制

前端断线降级和自动恢复流程：

```
┌──────────┐  connect ok  ┌───────────┐  heartbeat fail  ┌────────────┐
│DISCONNECT│ ──────────→  │ CONNECTED │ ──────────────→  │ MOCK MODE  │
└──────────┘              └───────────┘                  └──────┬─────┘
      ↑                         ↑                               │
      │                         │  2 consecutive probes ok       │
      │                         └───────────────────────────────┘
      │                              probe timer (5s → 60s 退避)
```

### 机制说明 / Mechanism

1. **正常连接** → 心跳每 30s 检测一次代理可用性
2. **心跳失败** → 自动进入 Mock 模式（前端使用本地模拟数据）
3. **Mock 模式** → 启动重连探针（5s 初始间隔，指数退避至 60s 封顶）
4. **探针成功 2 次** → 确认恢复，退出 Mock 模式，恢复心跳
5. **前端 UI** → 通过 `useDatabaseConfig().isMockMode` 和 `reconnectStats`
   显示状态

### Hook API

```typescript
const {
  isMockMode, // boolean - 是否模拟模式
  reconnectStats, // { attempts, probeInterval, consecutiveSuccess }
  connectionStatus, // "disconnected" | "connecting" | "connected" | "error" | "migrating"
} = useDatabaseConfig();
```

---

## File Inventory / 文件清单 (v0.9.4)

### Frontend Layer / 前端层

```
/types/database.ts              ← 数据库类型定义
/repositories/DatabaseRepository.ts  ← REST API 客户端 + 自动重连
/services/DatabaseService.ts    ← 业务逻辑层 + 状态事件透传
/hooks/useDatabaseConfig.ts     ← React 状态管理 + isMockMode/reconnectStats
/components/SettingsModal.tsx    ← 配置 UI 面板
```

### Server Layer / 服务端层

```
/server/yyc3-api-proxy.ts       ← Express 代理入口 (10 endpoints)
/server/types.ts                ← 服务端类型定义
/server/e2e-test.ts             ← E2E 端点自动化测试
/server/Dockerfile              ← 代理容器镜像
/server/package.json            ← 依赖与脚本
/server/tsconfig.json           ← TypeScript 配置
/server/.env.example            ← 环境变量模板
```

### Database Layer / 数据库层

```
/docs/postgresql-15-schema.sql  ← DDL 建表脚本 (8 tables)
/docs/DATABASE_SETUP_GUIDE.md   ← 完整安装指南
/docs/LOCAL_DEV_OPERATIONS.md   ← 本文件（操作手册）
```

### DevOps / 运维

```
/docker-compose.yml             ← 三容器编排 (PG + Proxy + Frontend)
/.dockerignore                  ← Docker 构建排除
/guidelines/Guidelines.md       ← 项目开发规范
```

---

_Last Updated: 2026-02-14 | YYC3 AI Family v0.9.4 [Personalize]_
