/**
 * @file index.ts
 * @description @yyc3/hooks包入口文件
 * @author YYC³ Team
 * @version 1.0.0
 * @license MIT
 * @copyright 2024 YanYuCloudCube
 */

export { usePersistedState } from './usePersistedState';
export { useResponsive } from './useResponsive';
export { useChannelConfig } from './useChannelConfig';
export { useChannelManager } from './useChannelManager';
export { useNavigationContext } from './useNavigationContext';

// AI相关Hooks
export { useAI } from './useAI';
export { useChatPersistence } from './useChatPersistence';

// 数据库和配置Hooks
export { useDatabaseConfig } from './useDatabaseConfig';
export { useSupabaseSync } from './useSupabaseSync';
export { useUISettings } from './useUISettings';

// 业务功能Hooks
export { useDevOps } from './useDevOps';
export { useNotifications } from './useNotifications';
