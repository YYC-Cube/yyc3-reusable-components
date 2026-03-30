#!/usr/bin/env node

/**
 * @file smart-check.js
 * @description YYC³ 智能代码检测脚本
 * @author YYC³ Team
 * @version 1.0.0
 * 
 * 功能：
 * - 语法检查 (ESLint)
 * - 类型检查 (TypeScript)
 * - 代码格式检查 (Prettier)
 * - 测试运行 (Vitest)
 * - 构建检查 (Turbo)
 * - 依赖安全检查
 * - 代码质量分析
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// 日志工具
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}\n${colors.cyan}${msg}${colors.reset}\n${colors.cyan}${'='.repeat(60)}${colors.reset}\n`),
};

// 检查结果统计
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  checks: [],
};

// 执行命令并捕获输出
function runCommand(command, options = {}) {
  const { ignoreError = false, silent = false } = options;
  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit',
      ...options,
    });
    return { success: true, output };
  } catch (error) {
    if (ignoreError) {
      return { success: false, output: error.stdout || error.stderr || error.message };
    }
    throw error;
  }
}

// 检查是否有未提交的更改
function hasUncommittedChanges() {
  const result = runCommand('git status --porcelain', { silent: true });
  return result.output && result.output.trim().length > 0;
}

// 获取更改的文件
function getChangedFiles() {
  try {
    const staged = execSync('git diff --cached --name-only --diff-filter=ACMR', { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean);
    const unstaged = execSync('git diff --name-only --diff-filter=ACMR', { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean);
    return [...new Set([...staged, ...unstaged])];
  } catch {
    return [];
  }
}

// 检查函数：ESLint
async function checkESLint() {
  log.section('ESLint 代码检查');
  const startTime = Date.now();
  
  try {
    const changedFiles = getChangedFiles();
    const tsFiles = changedFiles.filter(f => f.match(/\.(ts|tsx)$/));
    
    if (tsFiles.length === 0) {
      log.info('没有需要检查的 TypeScript 文件');
      return true;
    }

    log.info(`检查 ${tsFiles.length} 个文件...`);
    const result = runCommand(`pnpm lint ${tsFiles.join(' ')}`, { ignoreError: true });
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      log.success(`ESLint 检查通过 (${duration}ms)`);
      results.passed++;
      results.checks.push({ name: 'ESLint', status: 'passed', duration });
      return true;
    } else {
      log.error(`ESLint 检查失败 (${duration}ms)`);
      results.failed++;
      results.checks.push({ name: 'ESLint', status: 'failed', duration });
      return false;
    }
  } catch (error) {
    log.error(`ESLint 检查异常: ${error.message}`);
    results.failed++;
    results.checks.push({ name: 'ESLint', status: 'error', error: error.message });
    return false;
  }
}

// 检查函数：TypeScript
async function checkTypeScript() {
  log.section('TypeScript 类型检查');
  const startTime = Date.now();
  
  try {
    log.info('执行 TypeScript 类型检查...');
    const result = runCommand('pnpm typecheck', { ignoreError: true });
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      log.success(`TypeScript 类型检查通过 (${duration}ms)`);
      results.passed++;
      results.checks.push({ name: 'TypeScript', status: 'passed', duration });
      return true;
    } else {
      log.error(`TypeScript 类型检查失败 (${duration}ms)`);
      results.failed++;
      results.checks.push({ name: 'TypeScript', status: 'failed', duration });
      return false;
    }
  } catch (error) {
    log.error(`TypeScript 检查异常: ${error.message}`);
    results.failed++;
    results.checks.push({ name: 'TypeScript', status: 'error', error: error.message });
    return false;
  }
}

// 检查函数：Prettier
async function checkPrettier() {
  log.section('Prettier 代码格式检查');
  const startTime = Date.now();
  
  try {
    log.info('检查代码格式...');
    const result = runCommand('pnpm format:check', { ignoreError: true, silent: true });
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      log.success(`Prettier 格式检查通过 (${duration}ms)`);
      results.passed++;
      results.checks.push({ name: 'Prettier', status: 'passed', duration });
      return true;
    } else {
      log.warning(`Prettier 格式检查发现问题，尝试自动修复...`);
      runCommand('pnpm format', { ignoreError: true });
      log.warning(`已自动格式化代码，请检查更改 (${duration}ms)`);
      results.warnings++;
      results.checks.push({ name: 'Prettier', status: 'fixed', duration });
      return true;
    }
  } catch (error) {
    log.error(`Prettier 检查异常: ${error.message}`);
    results.failed++;
    results.checks.push({ name: 'Prettier', status: 'error', error: error.message });
    return false;
  }
}

// 检查函数：单元测试
async function checkTests() {
  log.section('单元测试运行');
  const startTime = Date.now();
  
  try {
    log.info('运行测试套件...');
    const result = runCommand('pnpm test:run', { ignoreError: true });
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      log.success(`所有测试通过 (${duration}ms)`);
      results.passed++;
      results.checks.push({ name: 'Tests', status: 'passed', duration });
      return true;
    } else {
      log.error(`测试失败 (${duration}ms)`);
      results.failed++;
      results.checks.push({ name: 'Tests', status: 'failed', duration });
      return false;
    }
  } catch (error) {
    log.error(`测试运行异常: ${error.message}`);
    results.failed++;
    results.checks.push({ name: 'Tests', status: 'error', error: error.message });
    return false;
  }
}

// 检查函数：构建
async function checkBuild() {
  log.section('构建检查');
  const startTime = Date.now();
  
  try {
    log.info('执行构建...');
    const result = runCommand('pnpm build', { ignoreError: true });
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      log.success(`构建成功 (${duration}ms)`);
      results.passed++;
      results.checks.push({ name: 'Build', status: 'passed', duration });
      return true;
    } else {
      log.error(`构建失败 (${duration}ms)`);
      results.failed++;
      results.checks.push({ name: 'Build', status: 'failed', duration });
      return false;
    }
  } catch (error) {
    log.error(`构建异常: ${error.message}`);
    results.failed++;
    results.checks.push({ name: 'Build', status: 'error', error: error.message });
    return false;
  }
}

// 检查函数：依赖安全
async function checkDependencies() {
  log.section('依赖安全检查');
  const startTime = Date.now();
  
  try {
    log.info('检查依赖安全性...');
    const result = runCommand('pnpm audit --audit-level=moderate', { ignoreError: true, silent: true });
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      log.success(`依赖安全检查通过 (${duration}ms)`);
      results.passed++;
      results.checks.push({ name: 'Dependencies', status: 'passed', duration });
      return true;
    } else {
      log.warning(`发现依赖安全问题 (${duration}ms)`);
      log.warning('运行 pnpm audit 查看详情');
      results.warnings++;
      results.checks.push({ name: 'Dependencies', status: 'warning', duration });
      return true; // 不阻止提交，但发出警告
    }
  } catch (error) {
    log.error(`依赖检查异常: ${error.message}`);
    results.warnings++;
    results.checks.push({ name: 'Dependencies', status: 'error', error: error.message });
    return true; // 不阻止提交
  }
}

// 检查函数：性能测试（可选）
async function checkPerformance() {
  const configPath = path.join(process.cwd(), 'vitest.performance.config.ts');
  if (!fs.existsSync(configPath)) {
    log.info('跳过性能测试（未找到配置文件）');
    return true;
  }
  
  log.section('性能测试');
  const startTime = Date.now();
  
  try {
    log.info('运行性能测试...');
    const result = runCommand('pnpm test:performance', { ignoreError: true });
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      log.success(`性能测试通过 (${duration}ms)`);
      results.passed++;
      results.checks.push({ name: 'Performance', status: 'passed', duration });
      return true;
    } else {
      log.warning(`性能测试发现问题 (${duration}ms)`);
      results.warnings++;
      results.checks.push({ name: 'Performance', status: 'warning', duration });
      return true; // 不阻止提交，但发出警告
    }
  } catch (error) {
    log.warning(`性能测试异常: ${error.message}`);
    results.warnings++;
    results.checks.push({ name: 'Performance', status: 'error', error: error.message });
    return true;
  }
}

// 生成报告
function generateReport() {
  log.section('检测报告');
  
  const totalChecks = results.passed + results.failed + results.warnings;
  const successRate = totalChecks > 0 ? ((results.passed / totalChecks) * 100).toFixed(1) : 0;
  
  console.log(`
${colors.white}检测结果总览:${colors.reset}
  ${colors.green}✓ 通过: ${results.passed}${colors.reset}
  ${colors.red}✗ 失败: ${results.failed}${colors.reset}
  ${colors.yellow}⚠ 警告: ${results.warnings}${colors.reset}
  ${colors.blue}总计: ${totalChecks}${colors.reset}
  ${colors.cyan}成功率: ${successRate}%${colors.reset}

${colors.white}详细检查结果:${colors.reset}
${results.checks.map(check => {
  const icon = check.status === 'passed' ? '✓' : check.status === 'failed' ? '✗' : '⚠';
  const color = check.status === 'passed' ? colors.green : check.status === 'failed' ? colors.red : colors.yellow;
  return `  ${color}${icon} ${check.name} - ${check.status} (${check.duration || 0}ms)${colors.reset}`;
}).join('\n')}
  `);
  
  // 写入报告文件
  const reportPath = path.join(process.cwd(), '.codebuddy', 'check-reports', `check-${Date.now()}.json`);
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings,
      total: totalChecks,
      successRate: parseFloat(successRate),
    },
    checks: results.checks,
    git: {
      branch: execSync('git branch --show-current', { encoding: 'utf-8' }).trim(),
      commit: execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim(),
      changedFiles: getChangedFiles(),
    },
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log.info(`报告已保存到: ${reportPath}`);
  
  return results.failed === 0;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const quickMode = args.includes('--quick');
  const fullMode = args.includes('--full');
  const skipTests = args.includes('--skip-tests');
  
  console.log(`
${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║          YYC³ 智能代码检测系统 v1.0.0                    ║
║          Smart Code Quality Checker                        ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}
  `);
  
  const startTime = Date.now();
  
  // 基础检查（始终执行）
  await checkESLint();
  await checkTypeScript();
  await checkPrettier();
  
  if (!skipTests) {
    await checkTests();
  }
  
  // 完整模式下的额外检查
  if (fullMode || !quickMode) {
    await checkBuild();
    await checkDependencies();
    await checkPerformance();
  }
  
  const totalDuration = Date.now() - startTime;
  
  // 生成报告
  const success = generateReport();
  
  console.log(`\n${colors.cyan}总耗时: ${totalDuration}ms${colors.reset}\n`);
  
  // 退出状态
  if (!success) {
    log.error('检测未通过，请修复上述问题后再提交');
    process.exit(1);
  } else {
    log.success('所有检测通过！');
    process.exit(0);
  }
}

// 运行
main().catch(error => {
  log.error(`检测脚本异常: ${error.message}`);
  console.error(error);
  process.exit(1);
});
