-- ════════════════════════════════════════════════════════════════════
-- YYC³ AI Family - PostgreSQL 15 本地数据库 Schema
-- YYC³ AI Family - PostgreSQL 15 Local Database Schema
-- ════════════════════════════════════════════════════════════════════
-- 版本 / Version: 0.9.4 (Personalize)
-- 数据库 / Database: yyc3_family
-- 编码 / Encoding: UTF-8
-- 时区 / Timezone: UTC
-- ════════════════════════════════════════════════════════════════════

-- ┌───────────────────────────────────────────────────┐
-- │  1. 初始化 / Initialization                       │
-- └───────────────────────────────────────────────────┘

-- 创建数据库（在 psql 中执行，不在事务内）
-- Create database (run in psql, not inside a transaction)
-- CREATE DATABASE yyc3_family
--   WITH ENCODING 'UTF8'
--   LC_COLLATE = 'en_US.UTF-8'
--   LC_CTYPE = 'en_US.UTF-8'
--   TEMPLATE = template0;

-- 创建专用角色 / Create dedicated role
-- CREATE ROLE yyc3_admin WITH LOGIN PASSWORD 'your_secure_password';
-- GRANT ALL PRIVILEGES ON DATABASE yyc3_family TO yyc3_admin;

-- 连接到目标数据库后执行以下语句
-- Execute the following after connecting to the target database

-- 启用必要扩展 / Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ┌───────────────────────────────────────────────────┐
-- │  2. 核心表结构 / Core Tables                       │
-- └───────────────────────────────────────────────────┘

-- ──────────────────── 2.1 聊天记录 / Chat Records ────────────────────────

CREATE TABLE IF NOT EXISTS chats (
  id            TEXT PRIMARY KEY,
  channel_id    TEXT NOT NULL DEFAULT 'main',
  title         TEXT NOT NULL DEFAULT 'New Chat',
  messages      JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_starred    BOOLEAN NOT NULL DEFAULT FALSE,
  metadata      JSONB DEFAULT '{}'::jsonb,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE chats IS '聊天会话记录 / Chat session records';
COMMENT ON COLUMN chats.channel_id IS '所属频道 ID / Owning channel ID';
COMMENT ON COLUMN chats.messages IS '消息数组 (JSON) / Message array (JSON)';
COMMENT ON COLUMN chats.metadata IS '扩展元数据 / Extended metadata';

CREATE INDEX idx_chats_channel ON chats (channel_id);
CREATE INDEX idx_chats_starred ON chats (is_starred) WHERE is_starred = TRUE;
CREATE INDEX idx_chats_updated ON chats (updated_at DESC);
CREATE INDEX idx_chats_messages_gin ON chats USING GIN (messages);

-- ──────────────────── 2.2 频道配置 / Channel Configs ────────────────────────

CREATE TABLE IF NOT EXISTS channels (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  preset        TEXT DEFAULT 'General',
  is_encrypted  BOOLEAN NOT NULL DEFAULT FALSE,
  ai_config     JSONB DEFAULT '{}'::jsonb,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE channels IS '频道/存储分区配置 / Channel/storage partition configuration';
COMMENT ON COLUMN channels.ai_config IS 'AI 模型配置 (provider, model, temperature 等) / AI model config';

-- 插入默认频道 / Insert default channel
INSERT INTO channels (id, name, preset) 
VALUES ('main', 'Main Console', 'General')
ON CONFLICT (id) DO NOTHING;

-- ──────────────────── 2.3 AI 家族成员 / AI Family Agents ────────────────────────

CREATE TABLE IF NOT EXISTS agents (
  id            SERIAL PRIMARY KEY,
  agent_id      TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  version       TEXT NOT NULL DEFAULT 'v1.0.0',
  role          TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'standby' CHECK (status IN ('active', 'standby', 'offline', 'error')),
  capabilities  JSONB DEFAULT '[]'::jsonb,
  config        JSONB DEFAULT '{}'::jsonb,
  last_active   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE agents IS 'AI 家族智能体注册表 / AI Family agent registry';
COMMENT ON COLUMN agents.agent_id IS '智能体唯一标识 (如 ARCHITECT_PRIME) / Agent unique identifier';
COMMENT ON COLUMN agents.capabilities IS '能力列表 JSON / Capability list JSON';

CREATE INDEX idx_agents_status ON agents (status);

-- 插入默认 AI 家族成员 / Insert default AI Family members
INSERT INTO agents (agent_id, name, version, role, status) VALUES
  ('ARCHITECT_PRIME', 'ARCHITECT_PRIME', 'v4.2.0', 'System Architecture & Patterns', 'active'),
  ('CODE_WEAVER', 'CODE_WEAVER', 'v3.1.5', 'Frontend Implementation Specialist', 'active'),
  ('DATA_NEXUS', 'DATA_NEXUS', 'v2.8.0', 'Database Optimization & Schema', 'standby'),
  ('SECURE_SENTINEL', 'SECURE_SENTINEL', 'v5.0.1', 'Vulnerability Scanning & Auth', 'active')
ON CONFLICT (agent_id) DO NOTHING;

-- ──────────────────── 2.4 工作流 / Workflows ────────────────────────

CREATE TABLE IF NOT EXISTS workflows (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  description   TEXT,
  status        TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'error')),
  steps         INTEGER NOT NULL DEFAULT 0,
  trigger_type  TEXT DEFAULT 'manual' CHECK (trigger_type IN ('manual', 'auto', 'scheduled', 'webhook')),
  config        JSONB DEFAULT '{}'::jsonb,
  last_run      TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE workflows IS '自动化工作流配置 / Automation workflow configuration';

INSERT INTO workflows (name, status, steps) VALUES
  ('CODE_REVIEW_AUTO', 'active', 4),
  ('DEPLOY_TO_PROD', 'inactive', 7),
  ('SECURITY_SCAN_DAILY', 'active', 3)
ON CONFLICT DO NOTHING;

-- ──────────────────── 2.5 系统配置 / System Configs ────────────────────────

CREATE TABLE IF NOT EXISTS system_configs (
  key           TEXT PRIMARY KEY,
  value         JSONB NOT NULL,
  description   TEXT,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE system_configs IS '系统级键值配置 / System-level key-value configuration';

INSERT INTO system_configs (key, value, description) VALUES
  ('ui_settings', '{"theme": "P1 (Green)", "themeColorId": "green", "fontSize": "md", "fontId": "vt323", "bgOpacity": 95, "scanlines": 15, "curvature": true, "animations": true, "topBarText": "CODE | AI | FAMILY", "systemDisplayName": "YYC³ AI Family"}'::jsonb, 'UI/UX 偏好设置 / UI/UX preferences'),
  ('system_version', '"0.9.4"'::jsonb, '当前系统版本 / Current system version'),
  ('codename', '"Personalize"'::jsonb, '版本代号 / Version codename')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ──────────────────── 2.6 MCP 连接记录 / MCP Connection Records ────────────────────────

CREATE TABLE IF NOT EXISTS mcp_connections (
  id            SERIAL PRIMARY KEY,
  server_name   TEXT NOT NULL,
  server_type   TEXT NOT NULL DEFAULT 'generic',
  status        TEXT NOT NULL DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  endpoint_url  TEXT,
  latency_ms    INTEGER,
  capabilities  JSONB DEFAULT '[]'::jsonb,
  last_verified TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE mcp_connections IS 'MCP 协议服务器连接状态 / MCP protocol server connection status';

INSERT INTO mcp_connections (server_name, server_type, status, latency_ms) VALUES
  ('Filesystem_Access', 'filesystem', 'connected', 12),
  ('GitHub_Repositories', 'github', 'connected', 45),
  ('Google_Workspace', 'google', 'connected', 145)
ON CONFLICT DO NOTHING;

-- ──────────────────── 2.7 GitHub 仓库缓存 / GitHub Repo Cache ────────────────────────

CREATE TABLE IF NOT EXISTS github_repo_cache (
  id            INTEGER PRIMARY KEY,
  full_name     TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  description   TEXT,
  is_private    BOOLEAN NOT NULL DEFAULT FALSE,
  default_branch TEXT DEFAULT 'main',
  language      TEXT,
  stars         INTEGER DEFAULT 0,
  forks         INTEGER DEFAULT 0,
  open_issues   INTEGER DEFAULT 0,
  topics        JSONB DEFAULT '[]'::jsonb,
  archived      BOOLEAN DEFAULT FALSE,
  html_url      TEXT,
  pushed_at     TIMESTAMPTZ,
  synced_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE github_repo_cache IS 'GitHub 仓库数据本地缓存 / GitHub repository data local cache';

CREATE INDEX idx_github_repo_language ON github_repo_cache (language);
CREATE INDEX idx_github_repo_stars ON github_repo_cache (stars DESC);
CREATE INDEX idx_github_repo_synced ON github_repo_cache (synced_at DESC);

-- ──────────────────── 2.8 迁移日志 / Migration Log ────────────────────────

CREATE TABLE IF NOT EXISTS migration_log (
  version       TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'rolled_back')),
  checksum      TEXT NOT NULL,
  executed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE migration_log IS '数据库迁移版本记录 / Database migration version records';

INSERT INTO migration_log (version, name, status, checksum) VALUES
  ('0.9.0', 'initial_schema', 'completed', md5('initial_schema')),
  ('0.9.3', 'intelligence_layer', 'completed', md5('intelligence_layer')),
  ('0.9.4', 'personalize_layer', 'completed', md5('personalize_layer'))
ON CONFLICT (version) DO NOTHING;

-- ┌───────────────────────────────────────────────────┐
-- │  3. 触发器与函数 / Triggers & Functions            │
-- └───────────────────────────────────────────────────┘

-- 自动更新 updated_at 触发器函数
-- Auto-update updated_at trigger function
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有核心表创建 updated_at 触发器
-- Create updated_at trigger for all core tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'chats', 'channels', 'agents', 'workflows',
    'system_configs', 'mcp_connections', 'github_repo_cache'
  ])
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_timestamp ON %I; 
       CREATE TRIGGER set_timestamp BEFORE UPDATE ON %I 
       FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- ┌───────────────────────────────────────────────────┐
-- │  4. 视图 / Views                                   │
-- └───────────────────────────────────────────────────┘

-- 聊天统计视图 / Chat statistics view
CREATE OR REPLACE VIEW v_chat_stats AS
SELECT
  channel_id,
  COUNT(*) AS total_chats,
  SUM(CASE WHEN is_starred THEN 1 ELSE 0 END) AS starred_chats,
  MAX(updated_at) AS last_activity,
  SUM(jsonb_array_length(messages)) AS total_messages
FROM chats
GROUP BY channel_id;

COMMENT ON VIEW v_chat_stats IS '各频道聊天统计 / Per-channel chat statistics';

-- AI 家族概况视图 / AI Family overview view
CREATE OR REPLACE VIEW v_agent_overview AS
SELECT
  status,
  COUNT(*) AS agent_count,
  array_agg(name) AS agent_names
FROM agents
GROUP BY status;

COMMENT ON VIEW v_agent_overview IS 'AI 家族成员状态概况 / AI Family agent status overview';

-- ┌───────────────────────────────────────────────────┐
-- │  5. 安全策略 / Security Policies                   │
-- └───────────────────────────────────────────────────┘

-- 注意：本地开发环境暂不启用 RLS
-- Note: RLS is not enabled for local development environment

-- 生产环境请取消注释以下行：
-- For production, uncomment the following:

-- ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- ┌───────────────────────────────────────────────────┐
-- │  6. 验证 / Verification                            │
-- └───────────────────────────────────────────────────┘

-- 运行以下查询验证安装 / Run to verify installation
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
-- SELECT version();
-- SELECT * FROM v_chat_stats;
-- SELECT * FROM v_agent_overview;
