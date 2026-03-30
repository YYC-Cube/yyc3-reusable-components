#!/usr/bin/env node

/**
 * @file push-and-monitor.js
 * @description 推送代码并监控 CI/CD 状态
 * @author YYC³ Team
 */

const { execSync, spawn } = require('child_process');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

function log(msg, color = colors.reset) {
  console.log(`${color}${msg}${colors.reset}`);
}

function logSection(msg) {
  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}${msg}${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

// 执行命令
function runCommand(command, options = {}) {
  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      ...options,
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout || '' };
  }
}

// 获取当前分支
function getCurrentBranch() {
  return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
}

// 获取最近提交
function getRecentCommits() {
  return execSync('git log --oneline -5', { encoding: 'utf-8' }).trim().split('\n');
}

// 推送代码
async function pushCode() {
  logSection('📤 推送代码到远程');

  const branch = getCurrentBranch();
  log(`当前分支: ${branch}`, colors.cyan);

  log('\n即将推送的提交:', colors.yellow);
  const commits = getRecentCommits();
  commits.forEach((commit, i) => {
    log(`  ${commit}`, i === 0 ? colors.green : colors.white);
  });

  log('\n开始推送...', colors.yellow);

  try {
    execSync('git push origin ' + branch, { stdio: 'inherit' });
    log('\n✅ 推送成功！', colors.green);
    return true;
  } catch (error) {
    log(`\n❌ 推送失败: ${error.message}`, colors.red);
    return false;
  }
}

// 获取 GitHub Actions 状态
function getGitHubActionsStatus() {
  logSection('🔄 检查 CI/CD 状态');

  try {
    const result = execSync(
      'gh run list --limit 3 --json databaseId,status,conclusion,workflowName,headBranch,createdAt',
      {
        encoding: 'utf-8',
      }
    );

    const runs = JSON.parse(result);

    if (runs.length === 0) {
      log('暂无 CI/CD 运行记录', colors.yellow);
      return [];
    }

    log('\n最近的 CI/CD 运行:', colors.cyan);

    runs.forEach((run, index) => {
      const statusIcon =
        run.status === 'completed'
          ? run.conclusion === 'success'
            ? '✅'
            : run.conclusion === 'failure'
              ? '❌'
              : '⚠️'
          : '🔄';

      const statusColor =
        run.conclusion === 'success'
          ? colors.green
          : run.conclusion === 'failure'
            ? colors.red
            : colors.yellow;

      log(`\n${index + 1}. ${statusIcon} ${run.workflowName}`, statusColor);
      log(`   分支: ${run.headBranch}`, colors.white);
      log(`   状态: ${run.status} (${run.conclusion || 'running'})`, colors.white);
      log(`   时间: ${new Date(run.createdAt).toLocaleString('zh-CN')}`, colors.white);
      log(`   ID: ${run.databaseId}`, colors.white);
    });

    return runs;
  } catch (error) {
    log(`无法获取 CI/CD 状态: ${error.message}`, colors.yellow);
    log('提示: 请确保已安装 GitHub CLI (gh) 并已登录', colors.yellow);
    return [];
  }
}

// 等待 CI/CD 完成
async function waitForCICD(maxAttempts = 30, interval = 10000) {
  logSection('⏳ 等待 CI/CD 完成');

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    log(`检查状态 (${attempt}/${maxAttempts})...`, colors.yellow);

    try {
      const result = execSync('gh run list --limit 1 --json databaseId,status,conclusion', {
        encoding: 'utf-8',
      });

      const runs = JSON.parse(result);

      if (runs.length === 0) {
        log('等待新的 CI/CD 运行...', colors.yellow);
        await new Promise((resolve) => setTimeout(resolve, interval));
        continue;
      }

      const run = runs[0];

      if (run.status === 'completed') {
        log(`\nCI/CD 已完成！`, colors.cyan);
        log(`结论: ${run.conclusion}`, run.conclusion === 'success' ? colors.green : colors.red);
        return run.conclusion === 'success';
      }

      log(`当前状态: ${run.status}`, colors.cyan);
      log(`等待 ${interval / 1000} 秒后再次检查...\n`, colors.white);

      await new Promise((resolve) => setTimeout(resolve, interval));
    } catch (error) {
      log(`检查失败: ${error.message}`, colors.yellow);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }

  log(`\n⚠️ 等待超时 (${(maxAttempts * interval) / 1000} 秒)`, colors.yellow);
  return false;
}

// 主函数
async function main() {
  console.log(`
${colors.magenta}
╔════════════════════════════════════════════════════════════╗
║          YYC³ CI/CD 推送监控工具                            ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}
  `);

  // 1. 推送代码
  const pushSuccess = await pushCode();

  if (!pushSuccess) {
    log('\n推送失败，终止流程', colors.red);
    process.exit(1);
  }

  // 2. 检查 CI/CD 状态
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 等待 3 秒让 CI/CD 启动
  const runs = getGitHubActionsStatus();

  if (runs.length === 0) {
    log('\n提示: 手动查看 CI/CD 状态:', colors.yellow);
    log('  1. 访问 GitHub Actions 页面', colors.white);
    log('  2. 或使用命令: gh run list --limit 5', colors.white);
    process.exit(0);
  }

  // 3. 询问是否等待 CI/CD 完成
  const latestRun = runs[0];
  if (latestRun.status !== 'completed') {
    log('\n是否等待 CI/CD 完成？', colors.cyan);
    log('提示: 可以使用 Ctrl+C 中断等待', colors.yellow);

    try {
      const success = await waitForCICD();

      if (success) {
        logSection('✅ 全部成功');
        log('CI/CD 检查全部通过！', colors.green);
      } else {
        logSection('❌ 检查失败');
        log('CI/CD 检查未通过，请查看详情', colors.red);
      }
    } catch (error) {
      log(`\n等待被中断: ${error.message}`, colors.yellow);
    }
  } else {
    if (latestRun.conclusion === 'success') {
      logSection('✅ 全部成功');
      log('CI/CD 检查已通过！', colors.green);
    } else {
      logSection('❌ 检查失败');
      log('CI/CD 检查未通过，请查看详情', colors.red);
    }
  }

  log('\n推送信息:', colors.cyan);
  log(`  分支: ${getCurrentBranch()}`, colors.white);
  log(`  最新运行: ${latestRun.databaseId}`, colors.white);
  log(`\n查看详情: gh run view ${latestRun.databaseId}`, colors.cyan);
}

main().catch((error) => {
  log(`\n❌ 异常: ${error.message}`, colors.red);
  console.error(error);
  process.exit(1);
});
