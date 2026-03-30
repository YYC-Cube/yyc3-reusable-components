/**
 * @file storage.ts
 * @description 存储相关类型定义
 * @author YYC³ Team
 * @version 1.0.0
 * @license MIT
 */

// AI 配置类型
export interface AIConfig {
  provider: 'ollama' | 'openai' | 'anthropic';
  apiKey: string;
  baseUrl: string;
  model: string;
  temperature: number;
  version: number;
}

// UI 设置类型
export interface UISettings {
  theme: 'light' | 'dark' | 'system';
  themeColorId?: string;
  bgOpacity?: number;
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  fontId?: string;
  fontFamily: string;
  reducedMotion: boolean;
  highContrast: boolean;
  scanlines?: number;
  curvature?: boolean;
  animations?: boolean;
  topBarText?: string;
  systemDisplayName?: string;
  version?: number;
}

// 主题颜色选项
export const THEME_COLORS = [
  { name: '默认蓝', value: '#3b82f6' },
  { name: '科技紫', value: '#8b5cf6' },
  { name: '赛博绿', value: '#10b981' },
  { name: '警示红', value: '#ef4444' },
  { name: '霓虹橙', value: '#f97316' },
  { name: '暗夜金', value: '#eab308' },
] as const;

// 字体选项
export const FONT_OPTIONS = [
  { name: '系统默认', value: 'system-ui' },
  { name: '思源黑体', value: 'Noto Sans SC' },
  { name: '微软雅黑', value: 'Microsoft YaHei' },
  { name: '等宽字体', value: 'monospace' },
] as const;

// 字体大小选项
export const FONT_SIZE_OPTIONS = [
  { name: '小', value: 'small' },
  { name: '中', value: 'medium' },
  { name: '大', value: 'large' },
] as const;

// 聊天消息类型
export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  isStarred?: boolean;
}

// 聊天消息
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

// 通知类型
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

// 响应式状态
export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}
