# YYC3 AI Family - Project Guidelines / 项目开发规范

> Version: 0.9.4 [Personalize] Creed: CODE | AI | FAMILY

---

## 1. Core Principles / 核心信条

- **CODE**: 代码质量优先，严格类型安全
- **AI**: 智能体协作驱动开发
- **FAMILY**: 团队协作，统一规范

---

## 2. TypeScript Rules / TypeScript 规则

- Strict mode enabled - 禁止 `any` 类型，使用具体类型或 `unknown`
- Use `interface` for object shapes, `type` for unions/intersections
- All public functions and methods must have JSDoc comments (bilingual: Chinese
  first, then English)
- No `console.log` in production code - use structured logger
  (`process.stdout.write` for server)
- No `TODO` comments in committed code - track in issues instead
- Prefer `const` over `let`, never use `var`

---

## 3. Architecture / 分层架构

```
Controller (UI Component / Route Handler)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Model (Type Definitions)
```

- Each layer only depends on the layer directly below
- Types are defined in `/types/*.ts`
- Repositories are in `/repositories/*.ts`
- Services are in `/services/*.ts`
- React Hooks bridge Service layer to UI: `/hooks/*.ts`

---

## 4. API Design / API 设计规范

- RESTful endpoints: `GET /api/v1/data/:table`, `POST /api/v1/query`
- Standard response format:
  `{ success, data, affectedRows, error, executionTime, timestamp }`
- Parameterized SQL only - never concatenate user input into queries
- Table whitelist validation on every request
- Column name regex validation: `^[a-zA-Z_][a-zA-Z0-9_]*$`

---

## 5. Naming Conventions / 命名规范

| Item               | Convention                   | Example                   |
| ------------------ | ---------------------------- | ------------------------- |
| Files (components) | PascalCase                   | `ChatMessage.tsx`         |
| Files (hooks)      | camelCase with `use` prefix  | `useDatabaseConfig.ts`    |
| Files (services)   | PascalCase + `Service`       | `DatabaseService.ts`      |
| Files (repos)      | PascalCase + `Repository`    | `DatabaseRepository.ts`   |
| Files (types)      | camelCase                    | `database.ts`             |
| CSS classes        | Tailwind utility-first       | `text-green-500 bg-black` |
| DB tables          | snake_case                   | `system_configs`          |
| DB columns         | snake_case                   | `created_at`              |
| Constants          | UPPER_SNAKE_CASE             | `ALLOWED_TABLES`          |
| Env vars           | `YYC3_` prefix + UPPER_SNAKE | `YYC3_PG_HOST`            |

---

## 6. Bilingual Output / 双语输出

- All JSDoc comments: Chinese first, then English separated by `/`
- All error messages: `"ENGLISH_CODE / 中文描述"`
- All UI labels: Uppercase English (hacker terminal aesthetic)

---

## 7. UI/UX Guidelines / 界面规范

- Terminal/hacker aesthetic with monospace fonts
- Primary color: configurable via CSS variables (default: green-500)
- All text: uppercase where possible
- Grid background with scanline effect
- Font options: VT323, Fira Code, JetBrains Mono, Source Code Pro, IBM Plex Mono
- Do not use Tailwind `text-*` size or `font-*` weight classes unless user
  specifically requests

---

## 8. Server Directory Structure / 服务端目录结构

```
/server/
  ├── yyc3-api-proxy.ts    # Express API proxy (main entry)
  ├── types.ts             # Server-side type definitions
  ├── package.json         # Server dependencies & scripts
  ├── tsconfig.json        # TypeScript configuration
  ├── .env.example         # Environment variable template
  └── .env                 # Local environment (gitignored)
```

---

## 9. Database Conventions / 数据库规范

- PostgreSQL 15 with UTF-8 encoding
- All tables have `created_at` and `updated_at` TIMESTAMPTZ columns
- Auto-update `updated_at` via trigger function `trigger_set_timestamp()`
- Use `uuid-ossp` and `pgcrypto` extensions
- JSONB for flexible data (messages, configs, capabilities)
- Indexes on frequently queried columns
- `ON CONFLICT DO NOTHING` for idempotent inserts

---

## 10. Security / 安全规范

- Never store plaintext passwords in frontend localStorage
- Bearer token auth optional for local dev, required for production
- Table name whitelist prevents SQL injection via table parameter
- All query values parameterized ($1, $2, etc.)
- DELETE operations require WHERE conditions (prevent accidental full-table
  deletion)
- CORS restricted to known origins
- No PII collection without explicit user consent
