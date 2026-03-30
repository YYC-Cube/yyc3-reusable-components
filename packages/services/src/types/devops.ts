/**
 * @file devops.ts
 * @description DevOps 服务类型定义
 * @author YYC³ Team
 * @version 1.0.0
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
  pipelines: number;
  successfulDeployments: number;
  failedDeployments: number;
  averageDeploymentTime: number;
  totalServices?: number;
  healthyServices?: number;
  degradedServices?: number;
}

// MCP Server Types
export interface MCPServer {
  id: string;
  name: string;
  description: string;
  status: MCPServerStatus;
  endpoint?: string;
  tools: MCPTool[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type MCPServerStatus = 'online' | 'offline' | 'disconnected' | 'error' | 'maintenance';

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
  serverId: string;
  success: boolean;
  result?: unknown;
  error?: string;
  duration: number;
  timestamp: Date;
}

// Workflow Types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: WorkflowExecutionStatus;
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
  executionStatus?: string;
  lastExecutedAt?: Date | string | null;
  lastDuration?: number;
  executionCount?: number;
  successCount?: number;
  isBuiltIn?: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'tool' | 'mcp_tool' | 'script' | 'approval' | 'notification';
  config: Record<string, unknown>;
  order: number;
  dependencies?: string[];
  timeout?: number;
  retryCount?: number;
}

export type WorkflowExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';

export interface WorkflowLogEntry {
  id: string;
  workflowId: string;
  stepId: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, unknown>;
}

// Infrastructure Service Types
export interface InfraService {
  id: string;
  name: string;
  type: 'database' | 'api' | 'cache' | 'queue' | 'storage' | 'compute';
  status: ServiceHealthStatus;
  endpoint: string;
  healthCheck?: {
    lastChecked: Date;
    responseTime: number;
    isHealthy: boolean;
  };
  metadata?: Record<string, unknown>;
}

export type ServiceHealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

export interface DiagnosticIssue {
  id: string;
  serviceId: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: Date | string;
  resolved: boolean;
  resolvedAt?: Date | string;
  metadata?: Record<string, unknown>;
}

export interface OpsLogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  message: string;
  metadata?: Record<string, unknown>;
}
