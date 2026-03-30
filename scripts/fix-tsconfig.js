#!/usr/bin/env node

/**
 * @file fix-tsconfig.js
 * @description 批量修复所有包的 tsconfig 配置
 * @author YYC³ Team
 */

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(process.cwd(), 'packages');
const packages = fs.readdirSync(packagesDir).filter((name) => {
  return fs.statSync(path.join(packagesDir, name)).isDirectory();
});

console.log('\n🔧 修复所有包的 tsconfig 配置...\n');

let fixedCount = 0;

packages.forEach((pkg) => {
  const tsconfigPath = path.join(packagesDir, pkg, 'tsconfig.json');

  if (!fs.existsSync(tsconfigPath)) {
    return;
  }

  try {
    const content = fs.readFileSync(tsconfigPath, 'utf-8');
    const config = JSON.parse(content);

    // 检查是否排除了测试文件
    if (
      config.exclude &&
      (config.exclude.includes('**/*.test.ts') ||
        config.exclude.includes('**/*.test.tsx') ||
        config.exclude.includes('**/*.spec.ts') ||
        config.exclude.includes('**/*.spec.tsx'))
    ) {
      // 移除测试文件的排除
      config.exclude = config.exclude.filter(
        (item) => !item.includes('.test.') && !item.includes('.spec.')
      );

      // 写回文件
      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2) + '\n');
      console.log(`✅ 已修复: ${pkg}/tsconfig.json`);
      fixedCount++;
    }
  } catch (error) {
    console.log(`⚠️  跳过: ${pkg}/tsconfig.json (${error.message})`);
  }
});

console.log(`\n✨ 完成！修复了 ${fixedCount} 个文件\n`);
