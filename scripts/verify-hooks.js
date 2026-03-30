#!/usr/bin/env node

/**
 * @file verify-hooks.js
 * @description 验证 Git Hooks 配置
 * @author YYC³ Team
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

console.log(`
${colors.cyan}
╔═══════════════════════════════════════════════════════════╗
║          YYC³ Git Hooks 验证系统                        ║
║          Git Hooks Verification System                   ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}
`);

const hooksDir = path.join(process.cwd(), '.git', 'hooks');
const requiredHooks = ['pre-commit', 'pre-push', 'commit-msg'];

console.log(`${colors.blue}📋 检查 Git Hooks 配置...${colors.reset}\n`);

let allOk = true;

requiredHooks.forEach((hookName) => {
  const hookPath = path.join(hooksDir, hookName);

  if (fs.existsSync(hookPath)) {
    const stats = fs.statSync(hookPath);
    const isExecutable = (stats.mode & parseInt('111', 8)) !== 0;

    if (isExecutable) {
      console.log(`${colors.green}✅ ${hookName}${colors.reset}`);
      console.log(`   路径: ${hookPath}`);
      console.log(`   权限: 可执行 ✓\n`);
    } else {
      console.log(`${colors.yellow}⚠️  ${hookName}${colors.reset}`);
      console.log(`   路径: ${hookPath}`);
      console.log(`   权限: 不可执行 ✗\n`);
      allOk = false;
    }
  } else {
    console.log(`${colors.yellow}❌ ${hookName} 未找到${colors.reset}\n`);
    allOk = false;
  }
});

// 检查脚本文件
console.log(`${colors.blue}\n📄 检查检测脚本...${colors.reset}\n`);

const scripts = [
  'scripts/pre-commit-check.js',
  'scripts/pre-push-check.js',
  'scripts/smart-check.js',
];

scripts.forEach((script) => {
  const scriptPath = path.join(process.cwd(), script);
  if (fs.existsSync(scriptPath)) {
    console.log(`${colors.green}✅ ${script}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}❌ ${script} 未找到${colors.reset}`);
    allOk = false;
  }
});

console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

if (allOk) {
  console.log(`${colors.green}✨ Git Hooks 配置完美！${colors.reset}\n`);

  console.log(`${colors.cyan}📝 使用方式:${colors.reset}`);
  console.log(`  • git commit - 自动运行提交前检查`);
  console.log(`  • git push   - 自动运行推送前检查\n`);

  console.log(`${colors.cyan}🔧 手动触发:${colors.reset}`);
  console.log(`  • pnpm check:quick  - 快速检查`);
  console.log(`  • pnpm check:push   - 完整检查\n`);

  console.log(`${colors.green}🎉 自动检测系统已激活！${colors.reset}\n`);
} else {
  console.log(`${colors.yellow}⚠️  部分配置需要修复${colors.reset}`);
  console.log(`运行以下命令修复: node scripts/setup-git-hooks.js\n`);
}

process.exit(allOk ? 0 : 1);
