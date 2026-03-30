#!/usr/bin/env node

/**
 * @file clean-branches.js
 * @description 清理远程 Dependabot 分支
 * @author YYC³ Team
 */

const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log(`
${colors.cyan}
╔════════════════════════════════════════╗
║     YYC³ 分支清理工具                 ║
╚════════════════════════════════════════╝
${colors.reset}
`);

// 获取所有远程分支
function getRemoteBranches() {
  try {
    const output = execSync('git ls-remote --heads origin', { encoding: 'utf-8' });
    return output
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const parts = line.split('\t');
        return {
          sha: parts[0],
          branch: parts[1].replace('refs/heads/', ''),
        };
      });
  } catch (error) {
    console.error(`${colors.red}获取远程分支失败${colors.reset}`);
    return [];
  }
}

// 检查 PR 状态
function checkPRStatus(branchName) {
  try {
    // 使用 gh CLI 检查 PR 状态
    const output = execSync(
      `gh pr list --head "${branchName}" --state all --json number,state,title`,
      {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    );

    const prs = JSON.parse(output);
    if (prs.length > 0) {
      return {
        hasPR: true,
        number: prs[0].number,
        state: prs[0].state,
        title: prs[0].title,
      };
    }
    return { hasPR: false };
  } catch (error) {
    // 如果 gh CLI 不可用，返回未知状态
    return { hasPR: false, error: true };
  }
}

// 删除远程分支
function deleteRemoteBranch(branchName) {
  try {
    execSync(`git push origin --delete ${branchName}`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    return true;
  } catch (error) {
    return false;
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const all = args.includes('--all');
  const merged = args.includes('--merged');
  const closed = args.includes('--closed');

  console.log(`${colors.blue}获取远程分支列表...${colors.reset}\n`);

  const branches = getRemoteBranches();

  if (branches.length === 0) {
    console.log(`${colors.yellow}没有找到远程分支${colors.reset}`);
    return;
  }

  console.log(`${colors.cyan}找到 ${branches.length} 个远程分支${colors.reset}\n`);

  // 分类分支
  const mainBranches = branches.filter(
    (b) =>
      b.branch === 'main' ||
      b.branch === 'master' ||
      b.branch === 'develop' ||
      b.branch === 'staging'
  );

  const dependabotBranches = branches.filter((b) => b.branch.startsWith('dependabot/'));

  const otherBranches = branches.filter(
    (b) => !mainBranches.includes(b) && !dependabotBranches.includes(b)
  );

  // 显示分支统计
  console.log(`${colors.white}分支统计:${colors.reset}`);
  console.log(`  ${colors.green}主分支: ${mainBranches.length}${colors.reset}`);
  console.log(`  ${colors.yellow}Dependabot 分支: ${dependabotBranches.length}${colors.reset}`);
  console.log(`  ${colors.blue}其他分支: ${otherBranches.length}${colors.reset}\n`);

  // 分析 Dependabot 分支
  if (dependabotBranches.length > 0) {
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.cyan}Dependabot 分支分析:${colors.reset}\n`);

    const toDelete = [];

    for (const branch of dependabotBranches) {
      const prStatus = checkPRStatus(branch.branch);

      let status = '';
      let color = colors.reset;

      if (prStatus.hasPR) {
        if (prStatus.state === 'MERGED') {
          status = '✅ 已合并';
          color = colors.green;
          toDelete.push(branch);
        } else if (prStatus.state === 'CLOSED') {
          status = '❌ 已关闭';
          color = colors.red;
          if (closed || all) {
            toDelete.push(branch);
          }
        } else if (prStatus.state === 'OPEN') {
          status = '🔵 打开中';
          color = colors.blue;
        }
      } else {
        status = '⚪ 无 PR';
        color = colors.yellow;
        if (all) {
          toDelete.push(branch);
        }
      }

      console.log(`${color}  ${branch.branch.padEnd(50)} ${status}${colors.reset}`);
    }

    if (toDelete.length > 0) {
      console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
      console.log(`${colors.yellow}准备删除 ${toDelete.length} 个分支:${colors.reset}\n`);

      toDelete.forEach((b) => {
        console.log(`  ${colors.red}✗ ${b.branch}${colors.reset}`);
      });

      if (dryRun) {
        console.log(`\n${colors.yellow}[模拟运行] 不会实际删除分支${colors.reset}`);
        console.log(
          `${colors.yellow}要实际删除，请运行: node scripts/clean-branches.js${colors.reset}`
        );
      } else {
        console.log(`\n${colors.yellow}确认删除这些分支吗？ (y/N)${colors.reset}`);

        // 这里可以添加用户确认逻辑
        // 但为了安全起见，我们要求用户明确指定参数
        console.log(`${colors.yellow}\n提示: 添加 --confirm 参数来执行删除${colors.reset}`);
        console.log(`${colors.yellow}或使用 --dry-run 进行模拟运行${colors.reset}`);
      }
    } else {
      console.log(`\n${colors.green}没有需要删除的分支${colors.reset}`);
    }
  }

  // 显示其他分支
  if (otherBranches.length > 0) {
    console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.cyan}其他分支:${colors.reset}\n`);

    otherBranches.forEach((branch) => {
      console.log(`  ${colors.blue}• ${branch.branch}${colors.reset}`);
    });
  }

  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.white}使用说明:${colors.reset}`);
  console.log(`  ${colors.blue}--dry-run${colors.reset}    模拟运行（不实际删除）`);
  console.log(`  ${colors.blue}--all${colors.reset}        删除所有已合并/关闭的 Dependabot 分支`);
  console.log(`  ${colors.blue}--merged${colors.reset}     仅删除已合并的分支`);
  console.log(`  ${colors.blue}--closed${colors.reset}     仅删除已关闭的分支`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
}

main().catch((error) => {
  console.error(`${colors.red}清理脚本异常:${colors.reset}`, error);
  process.exit(1);
});
