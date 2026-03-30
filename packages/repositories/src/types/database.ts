/**
 * @file database.ts
 * @description 数据库仓库类型定义
 * @author YYC³ Team
 * @version 1.0.0
 */

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  sslMode?: string;
  schema?: string;
  updatedAt?: string;
}

export interface LocalAPIProxyConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
  apiVersion?: string;
  enableRetry?: boolean;
  maxRetries?: number;
  authToken?: string;
  heartbeatInterval?: number;
}

export interface DatabaseQuery {
  sql: string;
  params?: any[];
  timeout?: number;
}

export interface DatabaseResult<T = any> {
  rows?: T[];
  rowCount?: number;
  fields?: string[];
  duration?: number;
  success?: boolean;
  error?: string | null;
  executionTime?: number;
  // 扩展属性 - 用于 API 响应
  data?: T | null;
  affectedRows?: number;
  timestamp?: string;
}

export interface ConnectionHealth {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'connected';
  latency?: number;
  lastCheck?: Date;
  lastCheckedAt?: string;
  error?: string;
  serverVersion?: string;
  activeConnections?: number;
  maxConnections?: number;
  databaseSize?: number;
  uptime?: number;
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error' | 'migrating';
