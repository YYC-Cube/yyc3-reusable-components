# YYC³ AI Family - PostgreSQL 15 Local Database Setup Guide

# YYC³ AI 家族 - PostgreSQL 15 本地数据库对接操作流程

> Version: 0.9.4 [Personalize]  
> Architecture: Browser → REST API Proxy (:3721) → PostgreSQL 15 (:5432)  
> Server Code: `/server/yyc3-api-proxy.ts`

---

## 1. Prerequisites / 前置条件

### 1.1 Required Software / 必需软件

| Software   | Version        | Purpose               |
| ---------- | -------------- | --------------------- |
| PostgreSQL | 15.x           | Local database engine |
| Node.js    | 18+ LTS        | API proxy runtime     |
| npm/pnpm   | Latest         | Package management    |
| psql       | 15.x (bundled) | CLI database client   |

### 1.2 Verify Installation / 验证安装

```bash
# 检查 PostgreSQL 版本 / Check PostgreSQL version
psql --version
# Expected: psql (PostgreSQL) 15.x

# 检查 PostgreSQL 服务状态 / Check PostgreSQL service status
# macOS (Homebrew):
brew services list | grep postgresql

# Linux (systemd):
sudo systemctl status postgresql

# Windows:
pg_isready
```

---

## 2. Database Initialization / 数据库初始化

### 2.1 Create Database & Role / 创建数据库和角色

```bash
# 以超级用户连接 / Connect as superuser
psql -U postgres

# 在 psql 终端内执行 / Execute inside psql terminal:
```

```sql
-- 创建专用角色 / Create dedicated role
CREATE ROLE yyc3_admin WITH LOGIN PASSWORD 'your_secure_password_here';

-- 创建数据库 / Create database
CREATE DATABASE yyc3_family
  WITH ENCODING 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8'
  TEMPLATE = template0
  OWNER = yyc3_admin;

-- 授权 / Grant privileges
GRANT ALL PRIVILEGES ON DATABASE yyc3_family TO yyc3_admin;

-- 退出 psql / Exit psql
\q
```

### 2.2 Execute DDL Schema / 执行建表脚本

```bash
# 使用 yyc3_admin 角色连接并执行 DDL
# Connect with yyc3_admin role and execute DDL
psql -U yyc3_admin -d yyc3_family -f docs/postgresql-15-schema.sql

# 如果遇到权限问题，先用 postgres 超级用户执行：
# If permission issues, first execute with postgres superuser:
psql -U postgres -d yyc3_family -f docs/postgresql-15-schema.sql
```

### 2.3 Verify Schema / 验证表结构

```bash
psql -U yyc3_admin -d yyc3_family
```

```sql
-- 列出所有表 / List all tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY table_name;

-- 预期输出 / Expected output:
--  table_name
-- --------------------
--  agents
--  channels
--  chats
--  github_repo_cache
--  mcp_connections
--  migration_log
--  system_configs
--  workflows

-- 查看聊天统计视图 / View chat statistics
SELECT * FROM v_chat_stats;

-- 查看 AI 家族概况 / View AI Family overview
SELECT * FROM v_agent_overview;

-- 检查默认数据 / Check default data
SELECT id, name, preset FROM channels;
SELECT agent_id, name, status FROM agents;
SELECT version, name, status FROM migration_log;
```

---

## 3. API Proxy Service Setup / API 代理服务搭建

### 3.1 Architecture Overview / 架构概览

```
┌──────────────────┐    HTTP/REST     ┌──────────────────┐    TCP/SSL     ┌──────────────────┐
│  YYC³ Frontend   │ ──────────────→  │   API Proxy      │ ────────────→ │   PostgreSQL 15  │
│  (Browser)       │ ←──────────────  │   :3721          │ ←──────────── │   :5432          │
│                  │    JSON          │   Express/Fastify │    pg pool    │   yyc3_family    │
└──────────────────┘                  └──────────────────┘               └──────────────────┘
```

### 3.2 Install Proxy Dependencies / 安装代理依赖

The proxy server code is already in `/server/yyc3-api-proxy.ts` with its
`package.json`.

```bash
# 进入 server 目录并安装依赖
# Enter server directory and install dependencies
cd server
npm install
```

### 3.3 Environment Variables / 环境变量配置

Create a `.env` file in the server directory (optional, defaults work for local
dev):

**`server/.env`**

```env
# PostgreSQL 连接配置 / PostgreSQL connection config
YYC3_PG_HOST=localhost
YYC3_PG_PORT=5432
YYC3_PG_DATABASE=yyc3_family
YYC3_PG_USER=yyc3_admin
YYC3_PG_PASSWORD=your_secure_password_here
YYC3_PG_SSL=prefer
YYC3_PG_POOL_SIZE=10

# API 代理配置 / API proxy config
YYC3_PORT=3721
YYC3_CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:5174
YYC3_AUTH_TOKEN=
YYC3_LOG_LEVEL=info
```

### 3.4 Start the Proxy / 启动代理

```bash
# 开发模式（热重载） / Dev mode (hot reload)
npm run dev

# 或生产模式 / Or production mode
npm start
```

### 3.5 API Endpoint Reference / API 端点清单

| Endpoint                    | Method | Description                             |
| --------------------------- | ------ | --------------------------------------- |
| `/api/v1/health`            | GET    | Health check with PG stats              |
| `/api/v1/query`             | POST   | Structured query (DatabaseQuery format) |
| `/api/v1/data/:table`       | GET    | List records with pagination            |
| `/api/v1/data/:table`       | POST   | Insert record                           |
| `/api/v1/data/:table/:id`   | GET    | Get single record                       |
| `/api/v1/data/:table/:id`   | PUT    | Update record                           |
| `/api/v1/data/:table/:id`   | DELETE | Delete record                           |
| `/api/v1/tables`            | GET    | List all tables with metadata           |
| `/api/v1/migrations/status` | GET    | Migration version status                |
| `/api/v1/migrations/run`    | POST   | Execute pending migrations              |

### 3.6 Security Features / 安全特性

- **Table whitelist**: Only predefined tables are accessible (chats, channels,
  agents, etc.)
- **Safe identifier validation**: Column names are checked against
  `^[a-zA-Z_][a-zA-Z0-9_]*$`
- **Parameterized queries**: All user input is parameterized (no string
  concatenation)
- **Optional Bearer token auth**: Set `YYC3_AUTH_TOKEN` to require
  authentication
- **DELETE requires conditions**: Prevents accidental full-table deletion
- **Structured JSON logging**: No console.log, all output is structured JSON to
  stdout

---

## 4. End-to-End Connection Flow / 端到端联调流程

### 4.1 Step-by-Step Startup / 逐步启动

```bash
# ── Step 1: 确保 PostgreSQL 正在运行 / Ensure PostgreSQL is running ──
# macOS:
brew services start postgresql@15

# Linux:
sudo systemctl start postgresql

# ── Step 2: 初始化数据库（首次） / Initialize database (first time) ──
psql -U postgres -c "CREATE ROLE yyc3_admin WITH LOGIN PASSWORD 'your_secure_password';"
psql -U postgres -c "CREATE DATABASE yyc3_family OWNER yyc3_admin;"
psql -U yyc3_admin -d yyc3_family -f docs/postgresql-15-schema.sql

# ── Step 3: 启动 API 代理 / Start API proxy ──
cd server
npm install
npm run dev

# ── Step 4: 验证代理健康 / Verify proxy health ──
curl -s http://localhost:3721/api/v1/health | jq .

# ── Step 5: 验证表清单 / Verify table listing ──
curl -s http://localhost:3721/api/v1/tables | jq .

# ── Step 6: 启动前端 / Start frontend ──
# 回到项目根目录 / Return to project root
cd ..
npm run dev
```

### 4.2 Health Check Verification / 健康检查验证

```bash
# 完整健康检查 / Full health check
curl -s http://localhost:3721/api/v1/health | jq .

# 预期响应 / Expected response:
# {
#   "success": true,
#   "data": {
#     "status": "connected",
#     "latency": 12,
#     "serverVersion": "PostgreSQL 15.8 ...",
#     "activeConnections": 3,
#     "maxConnections": 100,
#     "databaseSize": 28672000,
#     "lastCheckedAt": "2026-02-14T...",
#     "uptime": 86400
#   },
#   "affectedRows": 0,
#   "error": null,
#   "executionTime": 15,
#   "timestamp": "2026-02-14T..."
# }
```

### 4.3 API Endpoint Testing / API 端点测试

```bash
# ── 查询 agents 表 / Query agents table ──
curl -s http://localhost:3721/api/v1/data/agents | jq .

# ── 查询 channels 表 / Query channels table ──
curl -s http://localhost:3721/api/v1/data/channels | jq .

# ── 结构化查询（前端 DatabaseQuery 格式） / Structured query (frontend format) ──
curl -s -X POST http://localhost:3721/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{
    "table": "agents",
    "action": "SELECT",
    "columns": ["agent_id", "name", "status"],
    "conditions": [{"column": "status", "operator": "=", "value": "active"}],
    "orderBy": [{"column": "name", "direction": "ASC"}],
    "limit": 10
  }' | jq .

# ── 插入测试数据 / Insert test data ──
curl -s -X POST http://localhost:3721/api/v1/data/chats \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-001",
    "channel_id": "main",
    "title": "Test Chat from API",
    "messages": "[]"
  }' | jq .

# ── 更新测试数据 / Update test data ──
curl -s -X PUT http://localhost:3721/api/v1/data/chats/test-001 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Chat Title"}' | jq .

# ── 删除测试数据 / Delete test data ──
curl -s -X DELETE http://localhost:3721/api/v1/data/chats/test-001 | jq .

# ── 查看表清单 / List tables ──
curl -s http://localhost:3721/api/v1/tables | jq .

# ── 迁移状态 / Migration status ──
curl -s http://localhost:3721/api/v1/migrations/status | jq .
```

---

## 5. Frontend Configuration / 前端配置

### 5.1 Settings Modal Configuration / 设置面板配置

在 YYC³ 前端界面中：

1. 打开 **Settings** (齿轮图标)
2. 导航到 **PG_DATABASE** 标签页
3. 填写连接参数：
   - **HOST**: `localhost`
   - **PORT**: `5432`
   - **DATABASE**: `yyc3_family`
   - **USERNAME**: `yyc3_admin`
   - **PASSWORD**: (your password)
   - **SSL_MODE**: `disable` (local dev)
4. 配置 **LOCAL_API_PROXY**：
   - **PROXY_BASE_URL**: `http://localhost:3721`
   - **API_VERSION**: `v1`
5. 点击 **TEST** 按钮验证连接
6. 点击 **CONNECT** 建立连接

### 5.2 Sync Strategy / 同步策略

在 **SYNC_STRATEGY** 区域：

| Setting          | Recommended Value | Description                 |
| ---------------- | ----------------- | --------------------------- |
| DIRECTION        | `BIDIRECTIONAL`   | localStorage 和 PG 双向同步 |
| CONFLICT_RESOLVE | `LATEST_WINS`     | 最后修改者胜出              |

---

## 6. Troubleshooting / 故障排查

### Common Issues / 常见问题

| Issue                                   | Cause             | Solution                            |
| --------------------------------------- | ----------------- | ----------------------------------- |
| `ECONNREFUSED :5432`                    | PostgreSQL 未运行 | `brew services start postgresql@15` |
| `role "yyc3_admin" does not exist`      | 角色未创建        | 执行 Step 2.1 创建角色              |
| `database "yyc3_family" does not exist` | 数据库未创建      | 执行 Step 2.1 创建数据库            |
| `CORS blocked`                          | 前端域不在白名单  | 检查 `.env` 中的 `CORS_ORIGIN`      |
| `relation does not exist`               | DDL 脚本未执行    | 执行 Step 2.2                       |
| `API proxy :3721 not responding`        | 代理服务未启动    | `cd server && npm run dev`          |
| `permission denied`                     | 权限不足          | 用 postgres 超级用户授权            |

### Debug Commands / 调试命令

```bash
# 检查端口占用 / Check port usage
lsof -i :3721
lsof -i :5432

# 查看 PG 连接状态 / View PG connection status
psql -U yyc3_admin -d yyc3_family -c "SELECT * FROM pg_stat_activity WHERE datname = 'yyc3_family';"

# 检查表数据量 / Check table row counts
psql -U yyc3_admin -d yyc3_family -c "
  SELECT schemaname, relname, n_live_tup
  FROM pg_stat_user_tables
  ORDER BY n_live_tup DESC;
"

# 查看迁移记录 / View migration records
psql -U yyc3_admin -d yyc3_family -c "SELECT * FROM migration_log ORDER BY executed_at;"
```

---

## 7. Architecture Notes / 架构备注

### Data Flow / 数据流

```
localStorage (Browser)
    ↕ JSON
useDatabaseConfig.ts (Hook)
    ↕ fetch()
DatabaseRepository.ts (Repository Layer)
    ↕ HTTP/REST
API Proxy (Express :3721)
    ↕ pg Pool
PostgreSQL 15 (:5432)
```

### File Reference / 文件索引

| File                                  | Layer      | Purpose                       |
| ------------------------------------- | ---------- | ----------------------------- |
| `/types/database.ts`                  | Type       | Database type definitions     |
| `/repositories/DatabaseRepository.ts` | Repository | REST API client               |
| `/services/DatabaseService.ts`        | Service    | Business logic                |
| `/hooks/useDatabaseConfig.ts`         | Hook       | React state management        |
| `/components/SettingsModal.tsx`       | UI         | Configuration panel           |
| `/docs/postgresql-15-schema.sql`      | DDL        | Database schema               |
| `/server/yyc3-api-proxy.ts`           | Proxy      | Express API proxy server      |
| `/server/types.ts`                    | Type       | Server-side type definitions  |
| `/server/package.json`                | Config     | Server dependencies & scripts |

---

_Last Updated: 2026-02-14 | YYC³ AI Family v0.9.4 [Personalize]_
