#!/usr/bin/env node

/**
 * @file pre-push-check.js
 * @description Git pre-push hook - 推送前完整检查
 * @author YYC³ Team
 */

const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

console.log(`
${colors.cyan}
╔════════════════════════════════════════╗
║     YYC³ Pre-Push Hook                ║
║     推送前完整检测                      ║
╚════════════════════════════════════════╝
${colors.reset}
`);

// 获取当前分支
function getCurrentBranch() {
  return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
}

// 获取推送的提交数
function getPushCommitCount() {
  try {
    const branch = getCurrentBranch();
    const remote = `origin/${branch}`;
    const output = execSync(`git rev-list --count ${remote}..HEAD 2>/dev/null || echo "0"`, {
      encoding: 'utf-8',
    });
    return parseInt(output.trim(), 10);
  } catch {
    return 0;
  }
}

// 检查分支保护规则
function checkBranchProtection() {
  const branch = getCurrentBranch();
  const protectedBranches = ['main', 'master', 'develop', 'staging', 'production'];

  if (protectedBranches.includes(branch)) {
    console.log(`${colors.yellow}⚠ 检测到受保护分支: ${branch}${colors.reset}`);
    console.log(`${colors.yellow}请确保您有权限推送到此分支${colors.reset}\n`);
    return true;
  }

  return false;
}

// 检查是否有未推送的提交
function checkUnpushedCommits() {
  const count = getPushCommitCount();
  if (count > 0) {
    console.log(`${colors.cyan}准备推送 ${count} 个提交${colors.reset}\n`);
    return count;
  }
  return 0;
}

// 检查远程分支是否存在
function checkRemoteBranch() {
  const branch = getCurrentBranch();
  try {
    execSync(`git rev-parse --verify origin/${branch}`, { stdio: 'pipe' });
    return true;
  } catch {
    console.log(`${colors.yellow}⚠ 远程分支不存在，将创建新分支: ${branch}${colors.reset}\n`);
    return false;
  }
}

// 检查是否有冲突
function checkConflicts() {
  try {
    const branch = getCurrentBranch();
    execSync(`git merge-base --is-ancestor origin/${branch} HEAD`, { stdio: 'pipe' });
    return false;
  } catch {
    console.log(`${colors.yellow}⚠ 检测到可能的冲突，请先同步远程更改${colors.reset}\n`);
    return true;
  }
}

// 主检查流程
async function main() {
  console.log(`${colors.cyan}执行推送前检查...${colors.reset}\n`);

  // 1. 分支保护检查
  console.log('检查分支保护规则...');
  const isProtected = checkBranchProtection();

  // 2. 检查推送提交数
  console.log('检查待推送提交...');
  const commitCount = checkUnpushedCommits();

  if (commitCount === 0) {
    console.log(`${colors.yellow}没有需要推送的提交${colors.reset}`);
    process.exit(0);
  }

  // 3. 检查远程分支
  console.log('检查远程分支状态...');
  checkRemoteBranch();

  // 4. 检查冲突（如果远程分支存在）
  console.log('检查潜在冲突...');
  const hasConflicts = checkConflicts();

  if (hasConflicts) {
    console.log(`${colors.red}
╔════════════════════════════════════════╗
║     ✗ 检测到冲突，推送已终止            ║
║     请先同步远程更改并解决冲突          ║
╚════════════════════════════════════════╝
${colors.reset}`);
    console.log(`${colors.cyan}建议操作:${colors.reset}`);
    console.log('  1. git pull --rebase origin ' + getCurrentBranch());
    console.log('  2. 解决冲突');
    console.log('  3. 重新推送\n');
    process.exit(1);
  }

  // 5. 运行完整代码检查
  console.log('运行完整代码检查...\n');
  try {
    execSync('node scripts/smart-check.js --full', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    console.log(`${colors.red}
╔════════════════════════════════════════╗
║     ✗ Pre-Push 检查失败                ║
║     请修复问题后再推送                  ║
╚════════════════════════════════════════╝
${colors.reset}`);
    process.exit(1);
  }

  // 6. 对于受保护分支，额外确认
  if (isProtected) {
    console.log(`\n${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.yellow}您即将推送到受保护的分支: ${getCurrentBranch()}${colors.reset}`);
    console.log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    // 可以在这里添加额外的确认逻辑
    console.log(`${colors.green}继续推送...${colors.reset}\n`);
  }

  console.log(`${colors.green}
╔════════════════════════════════════════╗
║     ✓ Pre-Push 检查通过               ║
║     可以继续推送                       ║
╚════════════════════════════════════════╝
${colors.reset}`);

  console.log(`${colors.cyan}推送信息:${colors.reset}`);
  console.log(`  分支: ${getCurrentBranch()}`);
  console.log(`  提交数: ${commitCount}`);
  console.log(`  受保护: ${isProtected ? '是' : '否'}\n`);

  process.exit(0);
}

main().catch((error) => {
  console.error(`${colors.red}Pre-push hook 异常:${colors.reset}`, error);
  process.exit(1);
});
