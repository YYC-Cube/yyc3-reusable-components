/**
 * @file devops.ts
 * @description DevOps 服务类型定义
 * @author YYC³ Team
 * @version 1.1.0
 */

export interface DevOpsConfig {
  apiUrl: string;
  apiKey: string;
  environment: 'development' | 'staging' | 'production';
  enabled: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  branch: string;
  commit: string;
  author: string;
  startedAt?: Date;
  finishedAt?: Date;
  duration?: number;
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  startedAt?: Date;
  finishedAt?: Date;
  logs?: string[];
}

export interface Deployment {
  id: string;
  name: string;
  environment: string;
  status: 'pending' | 'deploying' | 'success' | 'failed' | 'rolled-back';
  version: string;
  deployedAt?: Date;
  deployedBy?: string;
  rollbackVersion?: string;
}

export interface DevOpsMetrics {
  totalServices: number;
  healthyServices: number;
  degradedServices: number;
  downServices: number;
  registeredTools: number;
  activeWorkflows: number;
  todayExecutions: number;
  todaySuccessRate: number;
  unresolvedIssues: number;
  avgLatency: number;
}

// MCP Server Types
export interface MCPServer {
  id: string;
  name: string;
  description: string;
  status: MCPServerStatus;
  endpoint?: string;
  tools: MCPTool[];
  transport?: 'http' | 'stdio' | 'websocket';
  latency?: number;
  lastHeartbeat?: Date | string | null;
  isBuiltIn?: boolean;
  autoConnect?: boolean;
  version?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type MCPServerStatus =
  | 'online'
  | 'offline'
  | 'disconnected'
  | 'error'
  | 'maintenance'
  | 'connected'
  | 'probing';

export interface MCPTool {
  id: string;
  name: string;
  description: string;
  category: string;
  params: MCPToolParam[];
  isDangerous: boolean;
  requiresConfirmation: boolean;
  estimatedDuration: number;
}

export interface MCPToolParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: unknown;
}

export interface MCPToolResult {
  toolId: string;
  serverId?: string;
  success: boolean;
  result?: unknown;
  output?: string | null;
  error?: string | null;
  duration: number;
  timestamp: Date | string;
}

// Workflow Types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status?: WorkflowExecutionStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy?: string;
  category?: string;
  trigger?: {
    type: string;
    config: Record<string, unknown>;
    enabled: boolean;
  };
  enabled?: boolean;
  executionStatus?: WorkflowExecutionStatus;
  lastExecutedAt?: Date | string | null;
  lastDuration?: number;
  executionCount?: number;
  successCount?: number;
  isBuiltIn?: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'tool' | 'mcp_tool' | 'script' | 'approval' | 'notification' | 'delay' | 'loop';
  config: Record<string, unknown>;
  order: number;
  toolId?: string | null;
  dependencies?: string[];
  timeout?: number;
  retryCount?: number;
  onFailure?: 'stop' | 'continue' | 'retry';
  condition?: string | null;
  executionStatus?: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  executionOutput?: string | null;
  executionDuration?: number;
}

export type WorkflowExecutionStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'paused'
  | 'idle';

export interface WorkflowLogEntry {
  id: string;
  workflowId: string;
  stepId: string;
  timestamp: Date | string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, unknown>;
}

// Infrastructure Service Types
export interface InfraService {
  id: string;
  name: string;
  type:
    | 'database'
    | 'api'
    | 'cache'
    | 'queue'
    | 'storage'
    | 'compute'
    | 'proxy'
    | 'frontend'
    | 'docker';
  status?: ServiceHealthStatus;
  endpoint: string;
  health?: ServiceHealthStatus;
  latency?: number;
  lastCheckAt?: Date | string;
  consecutiveHealthy?: number;
  consecutiveFailures?: number;
  uptimePercent?: number;
  healthCheck?: {
    lastChecked: Date | string;
    responseTime: number;
    isHealthy: boolean;
  };
  metadata?: Record<string, unknown>;
}

export type ServiceHealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | 'down';

export interface DiagnosticIssue {
  id: string;
  serviceId?: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp?: Date | string;
  source?: string;
  suggestion?: string;
  autoFixCommand?: string | null;
  isAutoFixable?: boolean;
  detectedAt?: Date | string;
  resolved: boolean;
  resolvedAt?: Date | string;
  metadata?: Record<string, unknown>;
}

export interface OpsLogEntry {
  id: string;
  timestamp: Date | string;
  level: 'info' | 'warning' | 'error' | 'critical' | 'success' | 'debug';
  source: string;
  message: string;
  detail?: string | null;
  metadata?: Record<string, unknown>;
}
