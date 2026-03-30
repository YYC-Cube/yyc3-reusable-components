#!/usr/bin/env node

/**
 * @file quick-fix.js
 * @description 快速修复常见问题
 * @author YYC³ Team
 */

const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
};

console.log(`
${colors.cyan}
╔════════════════════════════════════════╗
║     YYC³ Quick Fix                    ║
║     快速修复常见问题                    ║
╚════════════════════════════════════════╝
${colors.reset}
`);

console.log(`${colors.cyan}1. 更新依赖...${colors.reset}`);
try {
  execSync('pnpm install', { stdio: 'inherit' });
  console.log(`${colors.green}✓ 依赖更新完成${colors.reset}\n`);
} catch (error) {
  console.log(`${colors.yellow}⚠ 依赖更新跳过${colors.reset}\n`);
}

console.log(`${colors.cyan}2. 格式化代码...${colors.reset}`);
try {
  execSync('pnpm format', { stdio: 'inherit' });
  console.log(`${colors.green}✓ 代码格式化完成${colors.reset}\n`);
} catch (error) {
  console.log(`${colors.yellow}⚠ 格式化跳过${colors.reset}\n`);
}

console.log(`${colors.green}
╔════════════════════════════════════════╗
║     ✓ 快速修复完成                    ║
╚════════════════════════════════════════╝
${colors.reset}
`);
