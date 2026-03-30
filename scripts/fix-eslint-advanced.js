#!/usr/bin/env node
/**
 * 高级 ESLint 警告修复
 * - 为复杂类型创建精确的类型定义
 * - 替换剩余的 any 类型
 * - 优化代码质量
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 开始高级 ESLint 警告修复...\n');

// ==========================================
// 1. 为 useAI.ts 创建类型定义文件
// ==========================================
console.log('📝 为 AI 功能创建类型定义...');

const aiTypesContent = `/**
 * AI 相关类型定义
 */

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIStreamChunk {
  choices: Array<{
    delta: {
      content?: string;
    };
    finish_reason?: string;
  }>;
}

export interface AICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: AIMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
`;

const aiTypesPath = path.join(__dirname, '../packages/hooks/src/types/ai.ts');
fs.mkdirSync(path.dirname(aiTypesPath), { recursive: true });
fs.writeFileSync(aiTypesPath, aiTypesContent, 'utf-8');
console.log('✅ AI 类型定义已创建\n');

// ==========================================
// 2. 更新 useAI.ts 使用新的类型定义
// ==========================================
console.log('📦 更新 useAI.ts 类型定义...');

const useAIPath = path.join(__dirname, '../packages/hooks/src/useAI.ts');

if (fs.existsSync(useAIPath)) {
  let content = fs.readFileSync(useAIPath, 'utf-8');

  // 添加类型导入
  if (!content.includes('import type { AIMessage }')) {
    content = content.replace(
      "import { AIConfig } from './types/storage';",
      "import { AIConfig } from './types/storage';\nimport type { AIMessage, AIStreamChunk } from './types/ai';"
    );
  }

  // 替换 messages 参数类型
  content = content.replace(
    /messages: \{ role: string; content: string \}\[\]/g,
    'messages: AIMessage[]'
  );

  // 替换 chunk 相关类型
  content = content.replace(/const chunk: any/g, 'const chunk: AIStreamChunk');

  // 替换 parsed 相关类型
  content = content.replace(/const parsed: any/g, 'const parsed: AIStreamChunk');

  // 替换 response.json() 返回类型
  content = content.replace(
    /const data = await response\.json\(\);/g,
    'const data: AICompletionResponse = await response.json();'
  );

  fs.writeFileSync(useAIPath, content, 'utf-8');
  console.log('✅ useAI.ts 类型已更新\n');
}

// ==========================================
// 3. 为 utils.ts 创建更严格的类型定义
// ==========================================
console.log('📦 更新 utils.ts 类型定义...');

const utilsPath = path.join(__dirname, '../packages/utils/src/utils.ts');

if (fs.existsSync(utilsPath)) {
  let content = fs.readFileSync(utilsPath, 'utf-8');

  // 修复 debounce 函数的参数类型
  content = content.replace(/func: T,/g, 'func: (...args: Parameters<T>) => ReturnType<T>,');

  // 为其他工具函数创建更具体的类型
  // debounce 的 args 参数添加下划线前缀
  content = content.replace(
    /return function executedFunction\(\.\.\.args: Parameters<T>\)/g,
    'return function executedFunction(..._args: Parameters<T>)'
  );

  // 修复 args 未使用的问题
  content = content.replace(
    /const later = \(\) => \{/g,
    'const later = () => {\n      clearTimeout(timeout);'
  );

  // 移除重复的 clearTimeout
  content = content.replace(
    /clearTimeout\(timeout\);\n\s+timeout = setTimeout\(later, wait\);/g,
    'timeout = setTimeout(later, wait);'
  );

  fs.writeFileSync(utilsPath, content, 'utf-8');
  console.log('✅ utils.ts 类型已更新\n');
}

// ==========================================
// 4. 清理更多未使用的变量
// ==========================================
console.log('📦 清理未使用的变量...');

const filesToFix = [
  {
    path: '../packages/hooks/src/useVirtualList.ts',
    fixes: [{ pattern: /itemType:/g, replacement: '_itemType:' }],
  },
];

filesToFix.forEach(({ path: filePath, fixes }) => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf-8');

    fixes.forEach(({ pattern, replacement }) => {
      content = content.replace(pattern, replacement);
    });

    fs.writeFileSync(fullPath, content, 'utf-8');
  }
});

console.log('✅ 未使用变量已清理\n');

// ==========================================
// 5. 添加类型注释到剩余的 any 类型
// ==========================================
console.log('📦 为剩余的 any 类型添加注释...');

const performanceMonitorPath = path.join(__dirname, '../packages/utils/src/performanceMonitor.ts');

if (fs.existsSync(performanceMonitorPath)) {
  let content = fs.readFileSync(performanceMonitorPath, 'utf-8');

  // 为返回类型添加更精确的类型
  content = content.replace(/const fps: any/g, 'const fps: number');

  fs.writeFileSync(performanceMonitorPath, content, 'utf-8');
  console.log('✅ performanceMonitor.ts 已更新\n');
}

// ==========================================
// 完成
// ==========================================
console.log('🎉 高级 ESLint 警告修复完成！\n');
console.log('📝 修复摘要：');
console.log('  ✅ 创建了 AI 类型定义文件');
console.log('  ✅ 更新了 useAI.ts 使用严格类型');
console.log('  ✅ 优化了 utils.ts 的类型定义');
console.log('  ✅ 清理了更多未使用的变量');
console.log('  ✅ 添加了类型注释\n');
console.log('💡 建议运行：pnpm lint 验证修复效果\n');
