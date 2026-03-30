#!/usr/bin/env node

/**
 * @file pre-commit-check.js
 * @description Git pre-commit hook - 提交前快速检查
 * @author YYC³ Team
 */

const { execSync } = require('child_process');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

console.log(`
${colors.cyan}
╔════════════════════════════════════════╗
║     YYC³ Pre-Commit Hook              ║
║     提交前智能检测                      ║
╚════════════════════════════════════════╝
${colors.reset}
`);

// 获取暂存的文件
function getStagedFiles() {
  try {
    return execSync('git diff --cached --name-only --diff-filter=ACMR', { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

// 检查是否有大文件
function checkLargeFiles(files) {
  const maxSize = 1024 * 1024; // 1MB
  const largeFiles = [];

  files.forEach((file) => {
    try {
      const stats = require('fs').statSync(file);
      if (stats.size > maxSize) {
        largeFiles.push({ file, size: stats.size });
      }
    } catch {}
  });

  return largeFiles;
}

// 检查敏感信息
function checkSensitiveInfo(files) {
  const sensitivePatterns = [
    /password\s*=\s*['"][^'"]+['"]/gi,
    /api[_-]?key\s*=\s*['"][^'"]+['"]/gi,
    /secret\s*=\s*['"][^'"]+['"]/gi,
    /private[_-]?key\s*=\s*['"][^'"]+['"]/gi,
  ];

  const warnings = [];

  files.forEach((file) => {
    if (!file.match(/\.(ts|tsx|js|jsx|json)$/)) return;

    try {
      const content = require('fs').readFileSync(file, 'utf-8');
      sensitivePatterns.forEach((pattern) => {
        if (pattern.test(content)) {
          warnings.push({ file, pattern: pattern.source });
        }
      });
    } catch {}
  });

  return warnings;
}

// 主检查流程
async function main() {
  const files = getStagedFiles();

  if (files.length === 0) {
    console.log(`${colors.yellow}没有暂存的文件，跳过检查${colors.reset}`);
    process.exit(0);
  }

  console.log(`${colors.cyan}检查 ${files.length} 个文件...${colors.reset}\n`);

  // 1. 检查大文件
  console.log('检查文件大小...');
  const largeFiles = checkLargeFiles(files);
  if (largeFiles.length > 0) {
    console.log(`${colors.yellow}⚠ 发现大文件:${colors.reset}`);
    largeFiles.forEach(({ file, size }) => {
      console.log(`  ${file} (${(size / 1024 / 1024).toFixed(2)} MB)`);
    });
    console.log(`${colors.yellow}建议使用 Git LFS 管理大文件${colors.reset}\n`);
  } else {
    console.log(`${colors.green}✓ 文件大小检查通过${colors.reset}\n`);
  }

  // 2. 检查敏感信息
  console.log('检查敏感信息...');
  const sensitiveWarnings = checkSensitiveInfo(files);
  if (sensitiveWarnings.length > 0) {
    console.log(`${colors.red}✗ 发现可能的敏感信息:${colors.reset}`);
    sensitiveWarnings.forEach(({ file, pattern }) => {
      console.log(`  ${file}: ${pattern}`);
    });
    console.log(`${colors.red}请移除敏感信息后再提交${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}✓ 敏感信息检查通过${colors.reset}\n`);
  }

  // 3. 运行快速代码检查
  console.log('运行代码快速检查...');
  try {
    execSync('node scripts/smart-check.js --quick --skip-tests', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log(`${colors.green}✓ 代码检查通过${colors.reset}\n`);
  } catch (error) {
    console.log(`${colors.red}✗ 代码检查失败${colors.reset}\n`);
    process.exit(1);
  }

  console.log(`${colors.green}
╔════════════════════════════════════════╗
║     ✓ Pre-Commit 检查通过             ║
║     可以继续提交                       ║
╚════════════════════════════════════════╝
${colors.reset}`);

  process.exit(0);
}

main().catch((error) => {
  console.error(`${colors.red}Pre-commit hook 异常:${colors.reset}`, error);
  process.exit(1);
});
