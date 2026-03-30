# YYC3 Local Storage & Data Persistence Architecture

## 1. Overview
The YYC3 Hacker Chatbot uses a **Local-First** strategy. Data is primarily stored in the user's browser (`localStorage`) for immediate access and zero-latency interactions. Optional synchronization with Supabase (running on NAS or Cloud) provides cross-device capabilities.

## 2. Data Stores
We use specific keys in `localStorage` to manage different data types.

### 2.1 Chat History (`yyc3_chat_history`)
- **Format**: JSON Array of `Chat` objects.
- **Key**: `yyc3_chat_history`
- **Structure**:
  ```typescript
  interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    isStarred: boolean;
  }
  ```
- **Management**: Managed via `useChatPersistence` hook.
- **Limit**: Recommend pruning messages older than 30 days or archiving them to filesystem (via MCP) if size exceeds 5MB.

### 2.2 System Configuration (`yyc3_ai_config`)
- **Key**: `yyc3_ai_config`
- **Purpose**: Stores AI model preferences, endpoint URLs, and API keys.
- **Structure**:
  ```typescript
  interface AIConfig {
    provider: 'openai' | 'ollama' | 'anthropic';
    apiKey: string;
    baseUrl: string; // Crucial for Local M4 Max connection
    model: string;
    temperature: number;
  }
  ```
- **Security Note**: API keys are stored in plaintext in localStorage. This is acceptable for local-only tools but users should be warned if deploying publicly.

### 2.3 UI/UX Preferences (`yyc3_ui_settings`)
- **Key**: `yyc3_ui_settings`
- **Purpose**: Persist visual customization (theme, font size, CRT effects).
- **Structure**:
  ```typescript
  interface UISettings {
    theme: string;
    scanlines: number;
    curvature: boolean;
    fontSize: 'small' | 'medium' | 'large';
    animations: boolean;
  }
  ```

## 3. Synchronization Loop (The "Closed Loop")

### Load Cycle (App Startup)
1. `App.tsx` / `SettingsModal.tsx` mounts.
2. `useEffect` checks `localStorage.getItem('KEY')`.
3. If data exists, hydrate React State.
4. If no data, fall back to default constants.

### Save Cycle (User Action)
1. User modifies setting or sends message.
2. React State updates immediately (Optimistic UI).
3. `useEffect` or specific handler (e.g., `handleSave`) triggers `localStorage.setItem('KEY', JSON.stringify(newState))`.
4. (Optional) Background sync to Supabase/NAS.

## 4. Best Practices for Developers
- **Hooks**: Always use the provided hooks (`useChatPersistence`, `useAI`) rather than raw `localStorage` calls to ensure state consistency.
- **Validation**: Always try/catch `JSON.parse` operations to handle corrupted data gracefully.
- **Versioning**: If data structure changes, increment a `version` field in the object and implement a migration utility in the hydration logic.

## 5. PostgreSQL 15 Local Channel (v0.9.3+)

### 5.1 Architecture
The local PostgreSQL 15 data channel introduces a three-tier data flow:

```
┌─────────────┐   REST API    ┌──────────────┐   TCP/SSL    ┌──────────────┐
│  YYC3 Front │ ────────────→ │  API Proxy   │ ──────────→ │ PostgreSQL   │
│  (Browser)  │ ←──────────── │  :3721       │ ←────────── │ 15 (:5432)   │
└─────────────┘               └──────────────┘             └──────────────┘
```

Since browsers cannot connect directly to PostgreSQL, a lightweight local API proxy (Express/Fastify) on port 3721 mediates all database operations via RESTful endpoints.

### 5.2 Layered Architecture
- **Hook Layer** (`useDatabaseConfig`): React state management for DB config and connection status.
- **Service Layer** (`DatabaseService`): Business logic for connection lifecycle, sync strategy, health monitoring.
- **Repository Layer** (`DatabaseRepository`): Raw data access via local API proxy with retry/timeout logic.
- **Type Layer** (`types/database.ts`): Full type definitions for config, queries, results, migrations.

### 5.3 Data Sync Strategy
- **Direction**: `local-to-pg` | `pg-to-local` | `bidirectional`
- **Conflict Resolution**: `latest-wins` | `local-wins` | `remote-wins`
- **Tables**: `chats`, `configs`, `agents`, `channels`, `ui_settings`
- **Auto-Sync**: Optional interval-based sync (default: 60s)

### 5.4 Schema
See `/docs/postgresql-15-schema.sql` for the full PostgreSQL 15 DDL including:
- `chats`, `channels`, `agents`, `workflows`, `system_configs`
- `mcp_connections`, `github_repo_cache`, `migration_log`
- Triggers for auto `updated_at`, GIN indexes for JSONB, and statistics views.

### 5.5 Configuration Storage Keys
- `yyc3_db_config` — Database connection parameters
- `yyc3_db_proxy_config` — Local API proxy settings
- `yyc3_db_conn_history` — Connection history records (last 50)

## 6. Future Expansion: NAS Sync
To enable the "Data Center" role of the NAS:
1. Implement `useSupabaseSync` hook.
2. On `localStorage` write, push a copy to Supabase `chats` table.
3. Use Supabase Realtime to listen for changes from other devices (e.g., iMac, Huawei) and update local state.
