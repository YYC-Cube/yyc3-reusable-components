# YYC³ 组件库 - 版本管理规范

> **规范版本**: v1.0.0 **创建日期**: 2024年3月28日 **适用范围**:
> YYC³组件库所有包的版本管理

---

## 📋 规范概述

本规范定义了YYC³组件库的版本管理策略，确保所有包的版本管理统一、规范、可追溯。

### 目标

- ✅ 统一所有包的版本管理策略
- ✅ 建立版本依赖关系规范
- ✅ 支持自动化版本发布
- ✅ 便于版本回溯和问题追踪

---

## 🎯 版本管理策略

### 语义化版本 (SemVer)

YYC³组件库严格遵循[语义化版本规范](https://semver.org/lang/zh-CN/)，版本号格式为：`主版本号.次版本号.修订号`

#### 版本号规则

| 版本号类型   | 格式  | 说明                 | 示例  |
| ------------ | ----- | -------------------- | ----- |
| **主版本号** | X.0.0 | 不兼容的API修改      | 2.0.0 |
| **次版本号** | 1.X.0 | 向下兼容的功能性新增 | 1.1.0 |
| **修订号**   | 1.0.X | 向下兼容的问题修正   | 1.0.1 |

#### 版本号示例

```json
{
  "name": "@yyc3/ui",
  "version": "1.0.0"
}
```

### 版本发布流程

```
开发分支 (develop)
    ↓
功能开发完成
    ↓
创建PR到主分支
    ↓
代码审查通过
    ↓
合并到主分支
    ↓
自动触发版本发布流程
    ↓
生成Changeset
    ↓
自动更新版本号
    ↓
发布到npm
    ↓
创建Git Tag
```

---

## 📦 包版本管理

### 包版本同步策略

#### 1. 统一版本策略 (推荐)

所有包使用统一的版本号，便于管理和发布。

**适用场景**:

- 包之间有强依赖关系
- 需要统一发布
- 团队规模较小

**示例**:

```json
// @yyc3/ui/package.json
{
  "version": "1.0.0"
}

// @yyc3/business/package.json
{
  "version": "1.0.0"
}

// @yyc3/hooks/package.json
{
  "version": "1.0.0"
}
```

#### 2. 独立版本策略

每个包独立管理版本号，根据实际变更更新。

**适用场景**:

- 包之间依赖关系较弱
- 需要独立发布
- 团队规模较大

**示例**:

```json
// @yyc3/ui/package.json
{
  "version": "1.2.0"
}

// @yyc3/business/package.json
{
  "version": "0.8.3"
}

// @yyc3/hooks/package.json
{
  "version": "2.1.0"
}
```

### YYC³组件库版本策略

YYC³组件库采用**独立版本策略**，原因如下：

1. **灵活性**: 每个包可以根据实际变更独立发布
2. **效率**: 避免因某个包的变更导致所有包都需要发布
3. **清晰**: 版本号更准确地反映包的实际变更

---

## 🔗 版本依赖关系规范

### 依赖版本范围

#### 1. 精确版本 (不推荐)

```json
{
  "dependencies": {
    "@yyc3/ui": "1.0.0"
  }
}
```

**问题**: 无法自动更新，需要手动维护

#### 2. 脱字符范围 (推荐用于依赖)

```json
{
  "dependencies": {
    "@yyc3/ui": "^1.0.0"
  }
}
```

**说明**: 允许更新到1.x.x的最新版本，但不包括2.0.0

#### 3. 波浪号范围 (推荐用于依赖)

```json
{
  "dependencies": {
    "@yyc3/ui": "~1.0.0"
  }
}
```

**说明**: 允许更新到1.0.x的最新版本，但不包括1.1.0

#### 4. 星号范围 (不推荐)

```json
{
  "dependencies": {
    "@yyc3/ui": "*"
  }
}
```

**问题**: 允许更新到任何版本，风险太高

### YYC³依赖版本规范

#### 依赖包 (dependencies)

使用脱字符范围 (`^`)，允许自动更新补丁和次版本。

```json
{
  "dependencies": {
    "@yyc3/ui": "^1.0.0",
    "@yyc3/hooks": "^1.2.0",
    "@yyc3/utils": "^1.0.0"
  }
}
```

#### 对等依赖 (peerDependencies)

使用脱字符范围 (`^`)，要求使用者安装兼容版本。

```json
{
  "peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@yyc3/ui": "^1.0.0"
  }
}
```

#### 开发依赖 (devDependencies)

使用脱字符范围 (`^`)，允许自动更新。

```json
{
  "devDependencies": {
    "typescript": "^5.3.0",
    "vite": "^6.3.5",
    "vitest": "^4.1.0"
  }
}
```

---

## 🛠 Changesets 配置

### 安装 Changesets

```bash
pnpm add -Dw @changesets/cli
pnpm changeset init
```

### Changesets 配置文件

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### 使用 Changesets

#### 1. 创建 Changeset

```bash
pnpm changeset
```

选择变更类型：

- `major`: 不兼容的API修改
- `minor`: 向下兼容的功能性新增
- `patch`: 向下兼容的问题修正

#### 2. 更新版本号

```bash
pnpm changeset version
```

#### 3. 发布包

```bash
pnpm changeset publish
```

### Changesets 工作流

```bash
# 1. 开发新功能
git checkout -b feature/new-component

# 2. 完成开发后创建Changeset
pnpm changeset
# 选择: minor
# 输入: 添加新的Button组件

# 3. 提交代码
git add .
git commit -m "feat: 添加新的Button组件"
git push origin feature/new-component

# 4. 创建PR并合并到main分支

# 5. 更新版本号
pnpm changeset version
git add .
git commit -m "chore: 更新版本号"
git push

# 6. 发布到npm
pnpm changeset publish
```

---

## 📊 版本依赖关系图

### YYC³组件库依赖关系

```
@yyc3/ui (基础UI组件)
    ↑
    ├── @yyc3/business (业务组件)
    ├── @yyc3/smart (智能组件)
    ├── @yyc3/effects (特效组件)
    ├── @yyc3/navigation (导航组件)
    ├── @yyc3/ai (AI组件)
    ├── @yyc3/ai-management-ui (AI管理UI)
    ├── @yyc3/karbon-ui (Karbon UI)
    └── @yyc3/ai-designer-ui (AI-Designer UI)

@yyc3/hooks (自定义Hooks)
    ↑
    ├── @yyc3/ai-management-hooks (AI管理Hooks)
    └── @yyc3/ai-designer-hooks (AI-Designer Hooks)

@yyc3/utils (工具函数)
    ↑
    ├── @yyc3/ai-designer-utils (AI-Designer工具函数)
    └── @yyc3/services (服务层)

@yyc3/stores (状态管理)
    ↑
    └── @yyc3/ai-designer-stores (AI-Designer状态管理)

@yyc3/core (核心组件)
    ↑
    ├── @yyc3/panels (面板组件)
    ├── @yyc3/pages (页面组件)
    └── @yyc3/settings (设置组件)
```

### 版本更新影响范围

| 包             | 直接依赖 | 间接依赖 | 更新影响 |
| -------------- | -------- | -------- | -------- |
| @yyc3/ui       | 7个包    | 15+个包  | 🔴 高    |
| @yyc3/hooks    | 2个包    | 5+个包   | 🟡 中    |
| @yyc3/utils    | 2个包    | 8+个包   | 🟡 中    |
| @yyc3/core     | 3个包    | 10+个包  | 🟡 中    |
| @yyc3/business | 0个包    | 0个包    | 🟢 低    |
| @yyc3/smart    | 0个包    | 0个包    | 🟢 低    |

---

## 🎯 版本发布检查清单

在发布新版本前，请确保：

- [ ] 所有代码已提交到主分支
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] CHANGELOG.md已更新
- [ ] 版本号符合语义化版本规范
- [ ] 依赖版本范围正确
- [ ] 创建了Changeset
- [ ] 代码审查通过

---

## 📝 版本发布模板

### PR 模板

```markdown
## 📦 版本发布

### 发布版本

- 包名: @yyc3/ui
- 版本: 1.0.0 → 1.1.0

### 变更类型

- [ ] major (不兼容的API修改)
- [x] minor (向下兼容的功能性新增)
- [ ] patch (向下兼容的问题修正)

### 变更内容

- 添加新的Button组件
- 添加新的Input组件
- 优化Card组件性能

### 影响范围

- 直接依赖: @yyc3/business, @yyc3/smart
- 间接依赖: 5+个包

### 测试

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试通过

### 文档

- [ ] README已更新
- [ ] CHANGELOG已更新
- [ ] API文档已更新
```

### CHANGELOG 模板

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-03-28

### Added

- 新增Button组件，支持多种样式和变体
- 新增Input组件，支持验证和格式化
- 新增Card组件，支持多种布局

### Changed

- 优化Button组件性能
- 重构Card组件内部实现

### Fixed

- 修复Button组件在Safari上的样式问题
- 修复Input组件的验证逻辑

### Deprecated

- 无

### Removed

- 无

### Security

- 无

## [1.0.0] - 2024-03-01

### Added

- 初始版本发布
- 包含50+基础UI组件
```

---

## 🔧 工具和脚本

### 自动化版本检查脚本

```javascript
// scripts/check-versions.js
const fs = require('fs');
const path = require('path');
const semver = require('semver');

function checkVersion(filePath) {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const version = pkg.version;

  if (!semver.valid(version)) {
    console.error(`❌ ${filePath}: 版本号格式不正确: ${version}`);
    return false;
  }

  console.log(`✅ ${filePath}: 版本号检查通过 ${version}`);
  return true;
}

function checkDependencies(filePath) {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.peerDependencies };
  let allValid = true;

  for (const [name, range] of Object.entries(deps)) {
    if (!semver.validRange(range)) {
      console.error(`❌ ${filePath}: 依赖版本范围不正确 ${name}: ${range}`);
      allValid = false;
    }
  }

  if (allValid) {
    console.log(`✅ ${filePath}: 依赖版本检查通过`);
  }

  return allValid;
}

const packagesDir = path.join(__dirname, '../packages');
const packageDirs = fs.readdirSync(packagesDir);

let allPassed = true;

packageDirs.forEach((dir) => {
  const pkgPath = path.join(packagesDir, dir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    if (!checkVersion(pkgPath)) allPassed = false;
    if (!checkDependencies(pkgPath)) allPassed = false;
  }
});

process.exit(allPassed ? 0 : 1);
```

### 版本同步脚本

```javascript
// scripts/sync-versions.js
const fs = require('fs');
const path = require('path');

const TARGET_VERSION = '1.0.0';

function updateVersion(filePath) {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  pkg.version = TARGET_VERSION;
  fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2));
  console.log(`✅ ${filePath}: 版本已更新到 ${TARGET_VERSION}`);
}

const packagesDir = path.join(__dirname, '../packages');
const packageDirs = fs.readdirSync(packagesDir);

packageDirs.forEach((dir) => {
  const pkgPath = path.join(packagesDir, dir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    updateVersion(pkgPath);
  }
});

console.log('✅ 所有包版本已同步');
```

---

## 📚 参考资料

- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [Changesets 文档](https://github.com/changesets/changesets)
- [npm 版本管理](https://docs.npmjs.com/cli/v6/using-npm/semver)

---

**规范维护**: YYC³ Team  
**最后更新**: 2024年3月28日
