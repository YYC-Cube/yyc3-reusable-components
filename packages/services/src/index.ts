/**
 * @file index.ts
 * @description @yyc3/services包入口文件
 * @author YYC³ Team
 * @version 1.0.0
 * @license MIT
 * @copyright 2024 YanYuCloudCube
 */

export { databaseService } from './DatabaseService';
export { devOpsService } from './DevOpsService';
export { gitHubService } from './GitHubService';

// 类型导出
export type {
  DatabaseConfig,
  DatabaseConnection,
  DatabaseStats,
  QueryResult,
} from './types/database';
export type { DevOpsConfig, Pipeline, Deployment, DevOpsMetrics } from './types/devops';
export type {
  GitHubConfig,
  GitHubRepository,
  GitHubIssue,
  GitHubPullRequest,
} from './types/github';
