/**
 * @file database.ts
 * @description 数据库服务类型定义
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
}

export interface LocalAPIProxyConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
}

export interface DatabaseQuery {
  sql: string;
  params?: any[];
  timeout?: number;
}

export interface DatabaseResult<T = any> {
  rows: T[];
  rowCount: number;
  fields?: string[];
  duration?: number;
  success?: boolean;
  error?: string;
}

export interface ConnectionHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency?: number;
  lastCheck?: Date;
  error?: string;
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export interface DatabaseConnection {
  id: string;
  name: string;
  config: DatabaseConfig;
  status: ConnectionStatus;
  lastConnected?: Date;
  error?: string;
}

export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  fields?: string[];
  duration?: number;
}

export interface DatabaseStats {
  totalConnections: number;
  activeConnections: number;
  queries: number;
  slowQueries: number;
  errors: number;
}
