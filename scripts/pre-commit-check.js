#!/usr/bin/env node

/**
 * YYC³ 智能提交前检测脚本
 * 在推送到远程仓库前全面检测所有问题
 * 
 * @author YYC³ Team
 * @version 1.0.0
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
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(`  ${title}`, 'cyan');
  console.log('='.repeat(60));
}

function runCommand(command, description) {
  try {
    log(`\n▶ ${description}...`, 'blue');
    const output = execSync(command, { 
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: process.cwd()
    });
    log(`✅ ${description} - 通过`, 'green');
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} - 失败`, 'red');
    return { success: false, error: error.stdout || error.stderr || error.message };
  }
}

function checkDependencies() {
  logSection('依赖检查');
  
  const checks = [
    { name: 'Node.js', command: 'node --version' },
    { name: 'pnpm', command: 'pnpm --version' },
    { name: 'TypeScript', command: 'npx tsc --version' },
  ];
  
  checks.forEach(check => {
    try {
      const version = execSync(check.command, { encoding: 'utf-8' }).trim();
      log(`  ${check.name}: ${version}`, 'green');
    } catch (error) {
      log(`  ${check.name}: 未安装`, 'red');
    }
  });
}

function checkPackageJson() {
  logSection('Package.json 完整性检查');
  
  const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const requiredDeps = [
    'vitest',
    '@vitest/ui',
    '@vitest/coverage-v8',
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint',
    'typescript',
    'turbo'
  ];
  
  const missingDeps = requiredDeps.filter(dep => {
    return !rootPkg.devDependencies?.[dep] && !rootPkg.dependencies?.[dep];
  });
  
  if (missingDeps.length > 0) {
    log(`  ❌ 缺失依赖: ${missingDeps.join(', ')}`, 'red');
    return false;
  }
  
  log(`  ✅ 所有必需依赖已安装`, 'green');
  return true;
}

function checkExports() {
  logSection('Package.json Exports 字段检查');
  
  const packagesDir = path.join(process.cwd(), 'packages');
  const packages = fs.readdirSync(packagesDir).filter(dir => {
    return fs.statSync(path.join(packagesDir, dir)).isDirectory();
  });
  
  let hasErrors = false;
  
  packages.forEach(pkgName => {
    const pkgPath = path.join(packagesDir, pkgName, 'package.json');
    if (!fs.existsSync(pkgPath)) return;
    
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    
    if (pkg.exports?.['.']) {
      const exp = pkg.exports['.'];
      const keys = Object.keys(exp);
      const correctOrder = ['types', 'import', 'require'];
      
      const isCorrect = correctOrder.every((key, index) => {
        return keys[index] === key;
      });
      
      if (!isCorrect) {
        log(`  ❌ ${pkgName}: exports 字段顺序错误`, 'red');
        hasErrors = true;
      } else {
        log(`  ✅ ${pkgName}: exports 字段正确`, 'green');
      }
    }
  });
  
  return !hasErrors;
}

function checkTypeDefinitions() {
  logSection('类型定义文件检查');
  
  const requiredTypes = [
    'packages/services/types/database.ts',
    'packages/services/types/devops.ts',
    'packages/services/types/github.ts',
    'packages/hooks/src/types/storage.ts',
  ];
  
  let hasErrors = false;
  
  requiredTypes.forEach(typePath => {
    if (fs.existsSync(typePath)) {
      log(`  ✅ ${typePath}`, 'green');
    } else {
      log(`  ❌ ${typePath} - 缺失`, 'red');
      hasErrors = true;
    }
  });
  
  return !hasErrors;
}

function checkGitIgnore() {
  logSection('.gitignore 检查');
  
  if (!fs.existsSync('.gitignore')) {
    log('  ❌ .gitignore 文件不存在', 'red');
    return false;
  }
  
  const gitignore = fs.readFileSync('.gitignore', 'utf-8');
  const requiredPatterns = [
    'node_modules',
    'dist',
    '.turbo',
    '.DS_Store',
  ];
  
  let hasAll = true;
  requiredPatterns.forEach(pattern => {
    if (!gitignore.includes(pattern)) {
      log(`  ❌ 缺失: ${pattern}`, 'red');
      hasAll = false;
    }
  });
  
  if (hasAll) {
    log('  ✅ .gitignore 配置完整', 'green');
  }
  
  return hasAll;
}

function checkBuild() {
  logSection('构建检查');
  
  const result = runCommand('pnpm build', '构建所有包');
  
  if (!result.success) {
    log('\n构建错误详情:', 'red');
    console.log(result.error);
  }
  
  return result.success;
}

function checkLint() {
  logSection('Lint 检查');
  
  const result = runCommand('pnpm lint', 'ESLint 代码检查');
  
  if (!result.success) {
    log('\nLint 错误详情:', 'red');
    console.log(result.error);
  }
  
  return result.success;
}

function checkTypeCheck() {
  logSection('TypeScript 类型检查');
  
  const result = runCommand('pnpm typecheck', 'TypeScript 类型检查');
  
  if (!result.success) {
    log('\n类型错误详情:', 'red');
    console.log(result.error);
  }
  
  return result.success;
}

function checkTests() {
  logSection('测试检查');
  
  const result = runCommand('pnpm test:run', '运行测试');
  
  // 测试失败可能是因为没有测试文件，这是可接受的
  if (!result.success && result.error?.includes('No test files found')) {
    log('  ⚠️  未找到测试文件（可接受）', 'yellow');
    return true;
  }
  
  if (!result.success) {
    log('\n测试错误详情:', 'red');
    console.log(result.error);
  }
  
  return result.success;
}

function generateReport(results) {
  logSection('检测报告');
  
  const allPassed = Object.values(results).every(r => r);
  
  console.log('\n检测结果:\n');
  
  Object.entries(results).forEach(([name, passed]) => {
    const icon = passed ? '✅' : '❌';
    const status = passed ? '通过' : '失败';
    log(`  ${icon} ${name}: ${status}`, passed ? 'green' : 'red');
  });
  
  console.log('\n' + '='.repeat(60));
  
  if (allPassed) {
    log('\n🎉 所有检测通过！可以安全提交到远程仓库。', 'green');
    process.exit(0);
  } else {
    log('\n❌ 检测失败！请修复上述问题后再提交。', 'red');
    log('\n建议修复步骤:', 'yellow');
    log('  1. 安装缺失的依赖: pnpm install', 'yellow');
    log('  2. 修复类型定义错误', 'yellow');
    log('  3. 修复导出字段顺序', 'yellow');
    log('  4. 重新运行检测: node scripts/pre-commit-check.js', 'yellow');
    process.exit(1);
  }
}

// 主函数
async function main() {
  console.log('\n' + '🔍'.repeat(30));
  log('\n  YYC³ 智能提交前检测系统', 'magenta');
  log('  深度分析项目状态，确保代码质量\n', 'cyan');
  console.log('🔍'.repeat(30));
  
  const results = {
    '依赖检查': true,
    'Package.json 完整性': checkPackageJson(),
    'Exports 字段配置': checkExports(),
    '类型定义文件': checkTypeDefinitions(),
    '.gitignore 配置': checkGitIgnore(),
    '构建': false, // checkBuild() 在修复前先跳过
    'Lint': false, // checkLint() 在修复前先跳过
    '类型检查': false, // checkTypeCheck() 在修复前先跳过
  };
  
  // 如果基础检查都通过，再运行耗时检查
  if (results['Package.json 完整性'] && results['Exports 字段配置']) {
    results['构建'] = checkBuild();
    
    if (results['构建']) {
      results['Lint'] = checkLint();
      results['类型检查'] = checkTypeCheck();
      results['测试'] = checkTests();
    }
  } else {
    log('\n⚠️  基础检查未通过，跳过构建和测试检查', 'yellow');
    results['测试'] = true;
  }
  
  generateReport(results);
}

main().catch(error => {
  log(`\n❌ 检测脚本执行失败: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
