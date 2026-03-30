#!/usr/bin/env node

/**
 * @file branch-manager.js
 * @description 分支管理工具
 * @author YYC³ Team
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// 分支策略配置
const BRANCH_STRATEGY = {
  main: {
    description: '主分支 - 生产环境代码',
    protected: true,
    autoDeploy: 'production',
    requirePR: true,
    reviewers: 2,
  },
  develop: {
    description: '开发分支 - 集成测试环境',
    protected: true,
    autoDeploy: 'staging',
    requirePR: true,
    reviewers: 1,
  },
  staging: {
    description: '预发布分支 - 预发布环境',
    protected: true,
    autoDeploy: 'staging',
    requirePR: true,
    reviewers: 2,
  },
  'feature/*': {
    description: '功能分支 - 新功能开发',
    protected: false,
    baseBranch: 'develop',
    namingConvention: 'feature/<issue-id>-<description>',
  },
  'bugfix/*': {
    description: '修复分支 - Bug修复',
    protected: false,
    baseBranch: 'develop',
    namingConvention: 'bugfix/<issue-id>-<description>',
  },
  'hotfix/*': {
    description: '紧急修复分支 - 生产环境紧急修复',
    protected: false,
    baseBranch: 'main',
    namingConvention: 'hotfix/<issue-id>-<description>',
  },
  'release/*': {
    description: '发布分支 - 版本发布准备',
    protected: true,
    baseBranch: 'develop',
    namingConvention: 'release/<version>',
  },
};

// 获取所有分支
function getAllBranches() {
  try {
    const output = execSync('git branch -a', { encoding: 'utf-8' });
    const branches = output.split('\n').map(b => b.trim().replace('* ', '').replace('remotes/origin/', ''));
    return {
      local: branches.filter(b => !b.startsWith('remotes/')),
      remote: branches.filter(b => b.startsWith('remotes/')),
    };
  } catch (error) {
    return { local: [], remote: [] };
  }
}

// 获取当前分支
function getCurrentBranch() {
  return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
}

// 检查分支是否存在
function branchExists(branchName, remote = false) {
  try {
    if (remote) {
      execSync(`git rev-parse --verify origin/${branchName}`, { stdio: 'pipe' });
    } else {
      execSync(`git rev-parse --verify ${branchName}`, { stdio: 'pipe' });
    }
    return true;
  } catch {
    return false;
  }
}

// 创建新分支
function createBranch(branchName, baseBranch = 'main') {
  try {
    if (branchExists(branchName)) {
      console.log(`${colors.yellow}⚠ 分支已存在: ${branchName}${colors.reset}`);
      return false;
    }
    
    execSync(`git checkout -b ${branchName} ${baseBranch}`, { stdio: 'inherit' });
    console.log(`${colors.green}✓ 创建并切换到分支: ${branchName}${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ 创建分支失败: ${error.message}${colors.reset}`);
    return false;
  }
}

// 删除分支
function deleteBranch(branchName, force = false) {
  try {
    const flag = force ? '-D' : '-d';
    execSync(`git branch ${flag} ${branchName}`, { stdio: 'inherit' });
    console.log(`${colors.green}✓ 已删除分支: ${branchName}${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ 删除分支失败: ${error.message}${colors.reset}`);
    return false;
  }
}

// 合并分支
function mergeBranch(sourceBranch, targetBranch, noFF = true) {
  try {
    const currentBranch = getCurrentBranch();
    
    // 切换到目标分支
    execSync(`git checkout ${targetBranch}`, { stdio: 'inherit' });
    
    // 合并
    const ffFlag = noFF ? '--no-ff' : '--ff';
    execSync(`git merge ${ffFlag} ${sourceBranch}`, { stdio: 'inherit' });
    
    console.log(`${colors.green}✓ 已合并 ${sourceBranch} 到 ${targetBranch}${colors.reset}`);
    
    // 切回原分支
    execSync(`git checkout ${currentBranch}`, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ 合并失败: ${error.message}${colors.reset}`);
    return false;
  }
}

// 分析分支状态
function analyzeBranches() {
  console.log(`
${colors.cyan}
╔════════════════════════════════════════╗
║     分支状态分析                       ║
╚════════════════════════════════════════╝
${colors.reset}
`);

  const branches = getAllBranches();
  const currentBranch = getCurrentBranch();
  
  console.log(`${colors.white}当前分支:${colors.reset} ${colors.green}${currentBranch}${colors.reset}\n`);
  
  console.log(`${colors.white}本地分支 (${branches.local.length}):${colors.reset}`);
  branches.local.forEach(branch => {
    const strategy = Object.keys(BRANCH_STRATEGY).find(key => {
      if (key.includes('*')) {
        const prefix = key.replace('*', '');
        return branch.startsWith(prefix);
      }
      return branch === key;
    });
    
    const isProtected = strategy ? BRANCH_STRATEGY[strategy].protected : false;
    const icon = branch === currentBranch ? '→' : ' ';
    const protectionIcon = isProtected ? '🔒' : '  ';
    
    console.log(`  ${icon} ${protectionIcon} ${branch}`);
    if (strategy && BRANCH_STRATEGY[strategy].description) {
      console.log(`      ${colors.blue}${BRANCH_STRATEGY[strategy].description}${colors.reset}`);
    }
  });
  
  console.log(`\n${colors.white}远程分支 (${branches.remote.length}):${colors.reset}`);
  branches.remote.slice(0, 10).forEach(branch => {
    console.log(`    ${branch}`);
  });
  
  if (branches.remote.length > 10) {
    console.log(`    ${colors.yellow}... 还有 ${branches.remote.length - 10} 个分支${colors.reset}`);
  }
}

// 生成分支报告
function generateReport() {
  const reportPath = path.join(process.cwd(), '.codebuddy', 'branch-reports', `branches-${Date.now()}.json`);
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  const branches = getAllBranches();
  const currentBranch = getCurrentBranch();
  
  const report = {
    timestamp: new Date().toISOString(),
    currentBranch,
    branches: {
      local: branches.local.map(branch => {
        const strategy = Object.keys(BRANCH_STRATEGY).find(key => {
          if (key.includes('*')) {
            const prefix = key.replace('*', '');
            return branch.startsWith(prefix);
          }
          return branch === key;
        });
        
        return {
          name: branch,
          type: strategy || 'custom',
          protected: strategy ? BRANCH_STRATEGY[strategy].protected : false,
          description: strategy ? BRANCH_STRATEGY[strategy].description : '',
        };
      }),
      remote: branches.remote,
    },
    strategy: BRANCH_STRATEGY,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n${colors.cyan}报告已保存到: ${reportPath}${colors.reset}\n`);
  
  return report;
}

// 显示帮助信息
function showHelp() {
  console.log(`
${colors.cyan}
╔════════════════════════════════════════╗
║     YYC³ 分支管理工具                 ║
╚════════════════════════════════════════╝
${colors.reset}

用法:
  node scripts/branch-manager.js <command> [options]

命令:
  list, ls          列出所有分支
  current           显示当前分支
  create <name>     创建新分支
  delete <name>     删除分支
  merge <source>    合并分支到当前分支
  analyze           分析分支状态
  report            生成分支报告
  help              显示帮助信息

选项:
  --base <branch>   基础分支 (默认: main)
  --force           强制删除分支
  --no-ff           使用 --no-ff 合并 (默认)
  --ff              使用 --ff 合并

示例:
  node scripts/branch-manager.js list
  node scripts/branch-manager.js create feature/123-new-ui --base develop
  node scripts/branch-manager.js delete feature/old-feature
  node scripts/branch-manager.js merge feature/123-new-ui
  node scripts/branch-manager.js analyze
  node scripts/branch-manager.js report

分支策略:
  ${Object.entries(BRANCH_STRATEGY).map(([key, value]) => {
    return `${colors.green}${key.padEnd(15)}${colors.reset} - ${value.description}`;
  }).join('\n  ')}
`);
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    showHelp();
    return;
  }
  
  switch (command) {
    case 'list':
    case 'ls':
      analyzeBranches();
      break;
      
    case 'current':
      console.log(`\n当前分支: ${colors.green}${getCurrentBranch()}${colors.reset}\n`);
      break;
      
    case 'create': {
      const branchName = args[1];
      const baseIndex = args.indexOf('--base');
      const baseBranch = baseIndex > -1 ? args[baseIndex + 1] : 'main';
      createBranch(branchName, baseBranch);
      break;
    }
      
    case 'delete': {
      const branchName = args[1];
      const force = args.includes('--force');
      deleteBranch(branchName, force);
      break;
    }
      
    case 'merge': {
      const sourceBranch = args[1];
      const noFF = !args.includes('--ff');
      mergeBranch(sourceBranch, getCurrentBranch(), noFF);
      break;
    }
      
    case 'analyze':
      analyzeBranches();
      break;
      
    case 'report':
      analyzeBranches();
      generateReport();
      break;
      
    default:
      console.log(`${colors.red}未知命令: ${command}${colors.reset}`);
      showHelp();
      process.exit(1);
  }
}

main().catch(error => {
  console.error(`${colors.red}分支管理工具异常:${colors.reset}`, error);
  process.exit(1);
});
