/**
 * @file index.ts
 * @description @yyc3/utils包入口文件
 * @author YYC³ Team
 * @version 1.0.0
 * @license MIT
 * @copyright 2024 YanYuCloudCube
 */

export {
  cn,
  formatDate,
  formatCurrency,
  debounce,
  generateId,
  isEmpty,
  safeJsonParse,
  getStatusColor,
  isValidEmail,
  formatFileSize,
  getGradientColor,
  truncate,
  calculatePercentage,
} from './utils';
export * from './animations';
export * from './colors';
export { createLogger, Logger, LogLevel } from './logger';
export { taskTracker, TaskTracker, Task } from './taskTracker';
export {
  register as registerServiceWorker,
  unregister as unregisterServiceWorker,
  checkForUpdates,
  skipWaiting,
} from './serviceWorkerRegistration';
