#!/usr/bin/env node

/**
 * @file setup-git-hooks.js
 * @description 安装 Git Hooks
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
};

console.log(`
${colors.cyan}
╔════════════════════════════════════════╗
║     YYC³ Git Hooks 安装               ║
╚════════════════════════════════════════╝
${colors.reset}
`);

const hooksDir = path.join(process.cwd(), '.git', 'hooks');
const scriptsDir = path.join(process.cwd(), 'scripts');

// 创建 pre-commit hook
const preCommitHook = path.join(hooksDir, 'pre-commit');
const preCommitContent = `#!/bin/sh
# YYC³ Pre-Commit Hook
# 自动生成，请勿手动修改

node scripts/pre-commit-check.js
`;

// 创建 pre-push hook
const prePushHook = path.join(hooksDir, 'pre-push');
const prePushContent = `#!/bin/sh
# YYC³ Pre-Push Hook
# 自动生成，请勿手动修改

node scripts/pre-push-check.js
`;

// 创建 commit-msg hook（可选，用于检查提交信息格式）
const commitMsgHook = path.join(hooksDir, 'commit-msg');
const commitMsgContent = `#!/bin/sh
# YYC³ Commit Message Hook
# 检查提交信息格式

commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# 检查提交信息格式
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?: .{1,}"; then
  echo ""
  echo "提交信息格式不正确！"
  echo ""
  echo "正确格式: <type>(<scope>): <subject>"
  echo ""
  echo "类型(type):"
  echo "  feat:     新功能"
  echo "  fix:      修复bug"
  echo "  docs:     文档更改"
  echo "  style:    代码格式（不影响代码运行的变动）"
  echo "  refactor: 重构（既不是新增功能，也不是修改bug的代码变动）"
  echo "  perf:     性能优化"
  echo "  test:     增加测试"
  echo "  build:    构建过程或辅助工具的变动"
  echo "  ci:       CI配置文件和脚本的变动"
  echo "  chore:    其他不修改src或测试文件的更改"
  echo "  revert:   回退"
  echo ""
  echo "示例:"
  echo "  feat(ui): 添加新的Button组件"
  echo "  fix(hooks): 修复useChannelConfig的bug"
  echo "  docs(readme): 更新安装说明"
  echo ""
  exit 1
fi
`;

// 写入 hooks
function writeHook(hookPath, content, name) {
  try {
    fs.writeFileSync(hookPath, content, { encoding: 'utf-8', mode: 0o755 });
    console.log(`${colors.green}✓ 已安装 ${name} hook${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.yellow}⚠ 安装 ${name} hook 失败: ${error.message}${colors.reset}`);
    return false;
  }
}

// 检查是否是 Git 仓库
if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
  console.log(`${colors.yellow}⚠ 当前目录不是 Git 仓库${colors.reset}`);
  process.exit(1);
}

// 确保 hooks 目录存在
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

// 安装 hooks
console.log(`${colors.blue}安装 Git Hooks...${colors.reset}\n`);

const results = [
  writeHook(preCommitHook, preCommitContent, 'pre-commit'),
  writeHook(prePushHook, prePushContent, 'pre-push'),
  writeHook(commitMsgHook, commitMsgContent, 'commit-msg'),
];

const successCount = results.filter(Boolean).length;

console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(
  `${colors.green}成功安装 ${successCount}/${results.length} 个 Git Hooks${colors.reset}`
);
console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

console.log(`${colors.blue}已安装的 Hooks:${colors.reset}`);
console.log(`  • pre-commit: 提交前快速检查（语法、类型、格式）`);
console.log(`  • pre-push: 推送前完整检查（包含测试和构建）`);
console.log(`  • commit-msg: 提交信息格式检查\n`);

console.log(`${colors.yellow}提示:${colors.reset}`);
console.log(`  - 可以通过 git commit --no-verify 跳过 pre-commit 检查`);
console.log(`  - 可以通过 git push --no-verify 跳过 pre-push 检查`);
console.log(`  - 不建议跳过检查，除非明确知道后果\n`);

console.log(`${colors.green}✓ Git Hooks 安装完成！${colors.reset}\n`);
