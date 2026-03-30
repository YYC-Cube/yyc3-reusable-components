#!/usr/bin/env node

/**
 * @file fix-all-tsconfig.js
 * @description 最终修复所有 tsconfig
 * @author YYC³ Team
 */

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(process.cwd(), 'packages');
const packages = fs.readdirSync(packagesDir).filter((name) => {
  return fs.statSync(path.join(packagesDir, name)).isDirectory();
});

console.log('\n🔧 修复所有包的 tsconfig...\n');

let fixedCount = 0;

packages.forEach((pkg) => {
  const tsconfigPath = path.join(packagesDir, pkg, 'tsconfig.json');

  if (!fs.existsSync(tsconfigPath)) {
    return;
  }

  try {
    const content = fs.readFileSync(tsconfigPath, 'utf-8');
    const config = JSON.parse(content);

    // 确保 exclude 包含测试文件
    if (!config.exclude) {
      config.exclude = [];
    }

    const testPatterns = ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'];

    let needsUpdate = false;
    testPatterns.forEach((pattern) => {
      if (!config.exclude.includes(pattern)) {
        config.exclude.push(pattern);
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2) + '\n');
      console.log(`✅ 已修复: ${pkg}/tsconfig.json`);
      fixedCount++;
    }
  } catch (error) {
    console.log(`⚠️  跳过: ${pkg}/tsconfig.json`);
  }
});

console.log(`\n✨ 完成！修复了 ${fixedCount} 个文件\n`);
