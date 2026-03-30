#!/usr/bin/env node

/**
 * @file setup-smart-check.js
 * @description YYC³ 智能检测系统初始化脚本
 * @author YYC³ Team
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

console.log(`
${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          YYC³ 智能代码检测系统                              ║
║          Smart Code Quality Checker                        ║
║                                                            ║
║          版本: 1.0.0                                       ║
║          作者: YYC³ Team                                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}
`);

// 检查环境
function checkEnvironment() {
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}步骤 1/5: 检查环境${colors.reset}\n`);

  // 检查 Node.js 版本
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

  if (majorVersion < 18) {
    console.log(`${colors.red}✗ Node.js 版本过低 (${nodeVersion})，需要 >= 18${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.green}✓ Node.js 版本: ${nodeVersion}${colors.reset}`);

  // 检查 pnpm
  try {
    const pnpmVersion = execSync('pnpm --version', { encoding: 'utf-8' }).trim();
    console.log(`${colors.green}✓ pnpm 版本: ${pnpmVersion}${colors.reset}`);
  } catch {
    console.log(`${colors.red}✗ 未安装 pnpm${colors.reset}`);
    console.log(`${colors.yellow}  请运行: npm install -g pnpm${colors.reset}`);
    process.exit(1);
  }

  // 检查 Git
  try {
    const gitVersion = execSync('git --version', { encoding: 'utf-8' }).trim();
    console.log(`${colors.green}✓ Git: ${gitVersion}${colors.reset}`);
  } catch {
    console.log(`${colors.red}✗ 未安装 Git${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.green}✓ 环境检查通过${colors.reset}\n`);
}

// 创建必要的目录
function createDirectories() {
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}步骤 2/5: 创建必要的目录${colors.reset}\n`);

  const dirs = [
    '.codebuddy',
    '.codebuddy/check-reports',
    '.codebuddy/branch-reports',
    '.codebuddy/performance-reports',
  ];

  dirs.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`${colors.green}✓ 创建目录: ${dir}${colors.reset}`);
    } else {
      console.log(`${colors.blue}ℹ 目录已存在: ${dir}${colors.reset}`);
    }
  });

  console.log(`${colors.green}✓ 目录创建完成${colors.reset}\n`);
}

// 安装 Git Hooks
function installGitHooks() {
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}步骤 3/5: 安装 Git Hooks${colors.reset}\n`);

  try {
    execSync('node scripts/setup-git-hooks.js', { stdio: 'inherit' });
    console.log(`${colors.green}✓ Git Hooks 安装完成${colors.reset}\n`);
  } catch (error) {
    console.log(`${colors.yellow}⚠ Git Hooks 安装失败，但可以继续${colors.reset}\n`);
  }
}

// 安装依赖
function installDependencies() {
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}步骤 4/5: 安装依赖${colors.reset}\n`);

  try {
    console.log(`${colors.blue}运行 pnpm install...${colors.reset}`);
    execSync('pnpm install', { stdio: 'inherit' });
    console.log(`${colors.green}✓ 依赖安装完成${colors.reset}\n`);
  } catch (error) {
    console.log(`${colors.red}✗ 依赖安装失败${colors.reset}`);
    console.log(`${colors.yellow}  请手动运行: pnpm install${colors.reset}\n`);
  }
}

// 运行测试检查
function runTestCheck() {
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}步骤 5/5: 运行测试检查${colors.reset}\n`);

  console.log(`${colors.blue}运行快速检查...${colors.reset}`);
  try {
    execSync('node scripts/smart-check.js --quick', { stdio: 'inherit' });
    console.log(`${colors.green}✓ 测试检查通过${colors.reset}\n`);
  } catch (error) {
    console.log(`${colors.yellow}⚠ 测试检查失败，请检查上述错误${colors.reset}\n`);
  }
}

// 显示使用说明
function showInstructions() {
  console.log(`
${colors.green}
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          ✅ 智能检测系统初始化完成                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}

${colors.cyan}使用说明:${colors.reset}

${colors.magenta}1. 手动运行检查:${colors.reset}
   ${colors.blue}pnpm check${colors.reset}          - 运行标准检查（推荐）
   ${colors.blue}pnpm check:quick${colors.reset}    - 快速检查（跳过测试）
   ${colors.blue}pnpm check:full${colors.reset}     - 完整检查（包含所有测试）

${colors.magenta}2. Git Hooks:${colors.reset}
   ${colors.blue}git commit${colors.reset}          - 自动运行 pre-commit 检查
   ${colors.blue}git push${colors.reset}            - 自动运行 pre-push 检查
   ${colors.blue}git commit --no-verify${colors.reset} - 跳过检查（不推荐）

${colors.magenta}3. 分支管理:${colors.reset}
   ${colors.blue}pnpm branch${colors.reset}         - 查看帮助
   ${colors.blue}pnpm branch:list${colors.reset}    - 列出所有分支
   ${colors.blue}pnpm branch:analyze${colors.reset} - 分析分支状态

${colors.magenta}4. CI/CD 集成:${colors.reset}
   - 已创建 .github/workflows/smart-check.yml
   - 自动在推送和 PR 时运行检查
   - 支持受保护分支策略

${colors.cyan}检测项目:${colors.reset}
  ${colors.green}✓${colors.reset} ESLint 代码质量检查
  ${colors.green}✓${colors.reset} TypeScript 类型检查
  ${colors.green}✓${colors.reset} Prettier 格式检查
  ${colors.green}✓${colors.reset} 单元测试
  ${colors.green}✓${colors.reset} 构建检查
  ${colors.green}✓${colors.reset} 依赖安全检查
  ${colors.green}✓${colors.reset} 性能测试（可选）

${colors.cyan}检测时机:${colors.reset}
  ${colors.green}•${colors.reset} 提交前 (pre-commit)
  ${colors.green}•${colors.reset} 推送前 (pre-push)
  ${colors.green}•${colors.reset} CI/CD 流程
  ${colors.green}•${colors.reset} 手动触发

${colors.yellow}提示:${colors.reset}
  - 首次提交可能需要较长时间，后续会利用缓存加速
  - 可以通过 --no-verify 跳过检查，但不推荐
  - 建议在本地先运行 pnpm check 确保通过

${colors.magenta}下一步:${colors.reset}
  1. 运行 ${colors.blue}pnpm check${colors.reset} 验证系统
  2. 尝试提交代码测试 pre-commit hook
  3. 推送到远程测试 pre-push hook

${colors.green}祝您编码愉快！${colors.reset}
`);
}

// 主函数
async function main() {
  const startTime = Date.now();

  try {
    checkEnvironment();
    createDirectories();
    installGitHooks();
    installDependencies();
    runTestCheck();

    const duration = Date.now() - startTime;

    console.log(`${colors.cyan}总耗时: ${(duration / 1000).toFixed(2)}秒${colors.reset}\n`);

    showInstructions();
  } catch (error) {
    console.error(`${colors.red}初始化失败:${colors.reset}`, error);
    process.exit(1);
  }
}

// 运行
main();
