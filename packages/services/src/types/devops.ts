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
}
