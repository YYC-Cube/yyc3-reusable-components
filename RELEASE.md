# 发布流程文档

本文档详细说明了YYC³组件库的发布流程，包括版本管理、发布步骤、回滚流程等。

## 目录

- [版本管理](#版本管理)
- [发布准备](#发布准备)
- [发布流程](#发布流程)
- [发布后验证](#发布后验证)
- [回滚流程](#回滚流程)
- [发布检查清单](#发布检查清单)

## 版本管理

### 语义化版本 (SemVer)

YYC³组件库遵循[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)规范：

```
主版本号.次版本号.修订号 (MAJOR.MINOR.PATCH)
```

- **主版本号 (MAJOR)**: 不兼容的API修改
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

### 版本号示例

```
1.0.0 - 初始版本
1.0.1 - 修复bug
1.1.0 - 新增功能
2.0.0 - 重大变更，不兼容
```

### 预发布版本

```
1.0.0-alpha.1 - Alpha版本
1.0.0-beta.1 - Beta版本
1.0.0-rc.1 - Release Candidate版本
```

## 发布准备

### 发布前检查

在发布新版本之前，请确保：

1. **代码质量**
   - [ ] 所有代码通过ESLint检查
   - [ ] 所有代码通过Prettier格式化
   - [ ] 所有测试通过（覆盖率 >= 80%）
   - [ ] 没有TypeScript类型错误

2. **文档更新**
   - [ ] 更新CHANGELOG.md
   - [ ] 更新README.md（如有必要）
   - [ ] 更新API.md（如有API变更）
   - [ ] 更新EXAMPLES.md（如有新增示例）

3. **功能验证**
   - [ ] 所有新功能已测试
   - [ ] 所有bug已修复
   - [ ] 性能测试通过
   - [ ] 安全扫描通过

4. **依赖检查**
   - [ ] 所有依赖已更新到最新稳定版本
   - [ ] 没有已知的安全漏洞
   - [ ] 依赖版本已锁定

### 创建发布分支

```bash
# 从main分支创建发布分支
git checkout main
git pull origin main
git checkout -b release/v1.0.0

# 更新版本号
npm version 1.0.0

# 提交版本更新
git add .
git commit -m "chore: bump version to 1.0.0"
git push origin release/v1.0.0
```

### 更新CHANGELOG.md

```markdown
## [1.0.0] - 2024-01-01

### Added
- 新增Button组件
- 新增Input组件
- 新增usePersistedState Hook

### Changed
- 优化组件性能
- 更新文档结构

### Fixed
- 修复Button组件样式问题
- 修复usePersistedState类型错误

### Security
- 修复XSS漏洞
```

## 发布流程

### 1. 构建和测试

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 运行构建
pnpm build

# 运行代码质量检查
pnpm lint
pnpm format:check
```

### 2. 发布到npm

```bash
# 登录npm
npm login

# 发布所有包
pnpm -r publish

# 或发布特定包
pnpm --filter @yyc3/ui publish
pnpm --filter @yyc3/business publish
```

### 3. 创建GitHub Release

```bash
# 创建Git标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 在GitHub上创建Release
# 访问 https://github.com/YYC-Cube/yyc3-reusable-components/releases/new
# 填写Release信息：
# - Tag: v1.0.0
# - Title: Release v1.0.0
# - Description: 从CHANGELOG.md复制发布说明
```

### 4. 合并到main分支

```bash
# 合并发布分支到main
git checkout main
git merge release/v1.0.0

# 推送到远程
git push origin main

# 删除发布分支
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

### 5. 部署文档站点

```bash
# 构建Storybook
pnpm build:storybook

# 部署到GitHub Pages
pnpm deploy:storybook
```

## 发布后验证

### 验证步骤

1. **npm包验证**
   ```bash
   # 检查包是否发布成功
   npm view @yyc3/ui
   npm view @yyc3/business
   
   # 在新项目中测试安装
   npm install @yyc3/ui
   ```

2. **文档验证**
   - 访问在线文档站点
   - 检查所有文档链接
   - 验证示例代码是否可运行

3. **功能验证**
   - 创建测试项目
   - 安装新版本
   - 运行示例代码
   - 验证所有功能正常

4. **性能验证**
   - 运行性能测试
   - 对比性能基准
   - 确认性能没有下降

### 通知用户

发布完成后，通过以下渠道通知用户：

1. **GitHub Release**
   - 发布说明
   - 变更内容
   - 升级指南

2. **邮件通知**
   - 发送给订阅用户
   - 包含重要变更
   - 提供升级指南

3. **社交媒体**
   - Twitter/X
   - LinkedIn
   - 技术社区

## 回滚流程

### 回滚条件

遇到以下情况时考虑回滚：

1. **严重Bug**
   - 核心功能无法使用
   - 数据丢失或损坏
   - 安全漏洞

2. **性能问题**
   - 性能严重下降
   - 内存泄漏
   - 崩溃问题

3. **兼容性问题**
   - 与主流框架不兼容
   - 破坏性变更未文档化

### 回滚步骤

```bash
# 1. 回滚npm包
npm dist-tag add @yyc3/ui@1.0.0 latest
npm dist-tag add @yyc3/business@1.0.0 latest

# 2. 回滚代码
git checkout main
git revert HEAD
git push origin main

# 3. 创建新版本（修复版本）
npm version 1.0.1

# 4. 发布修复版本
pnpm -r publish

# 5. 通知用户
# 更新GitHub Release
# 发送邮件通知
```

### 回滚验证

1. 验证npm包版本
2. 测试回滚版本
3. 确认问题已解决
4. 通知用户回滚完成

## 发布检查清单

### 发布前

- [ ] 所有测试通过
- [ ] 代码覆盖率 >= 80%
- [ ] ESLint检查通过
- [ ] Prettier格式化完成
- [ ] TypeScript无错误
- [ ] CHANGELOG.md已更新
- [ ] README.md已更新
- [ ] API.md已更新（如有API变更）
- [ ] EXAMPLES.md已更新（如有新增示例）
- [ ] 依赖已更新
- [ ] 安全扫描通过
- [ ] 性能测试通过
- [ ] 文档站点已构建
- [ ] Storybook已更新

### 发布中

- [ ] 版本号已更新
- [ ] 发布分支已创建
- [ ] 构建成功
- [ ] 测试通过
- [ ] npm包已发布
- [ ] GitHub Release已创建
- [ ] Git标签已推送
- [ ] 代码已合并到main
- [ ] 文档站点已部署

### 发布后

- [ ] npm包验证成功
- [ ] 文档站点可访问
- [ ] 功能验证通过
- [ ] 性能验证通过
- [ ] 用户已通知
- [ ] 监控已启用
- [ ] 反馈渠道已建立

## 自动化发布

### GitHub Actions工作流

使用GitHub Actions自动化发布流程：

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Build
        run: pnpm build
      
      - name: Publish to npm
        run: pnpm -r publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

### 自动化检查

```yaml
name: Pre-release Check

on:
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm typecheck
      
      - name: Test
        run: pnpm test
      
      - name: Build
        run: pnpm build
```

## 版本策略

### 发布频率

- **主版本**: 每季度或重大变更时
- **次版本**: 每月或功能新增时
- **修订版本**: 每周或bug修复时

### 支持策略

- **当前版本**: 完全支持，持续更新
- **上一版本**: 安全更新，不添加新功能
- **更早版本**: 不再支持

### 弃用策略

1. 在CHANGELOG中标记弃用
2. 在代码中添加弃用警告
3. 在文档中说明替代方案
4. 在下一个主版本中移除

## 发布团队

### 发布负责人

- 负责发布流程的执行
- 确保所有检查项完成
- 处理发布中的问题

### 发布审查人

- 审查发布内容
- 验证发布质量
- 批准发布

### 发布通知人

- 通知相关团队
- 发布发布公告
- 收集用户反馈

## 发布日历

### 2024年发布计划

| 版本 | 计划日期 | 类型 | 说明 |
|------|----------|------|------|
| 1.0.0 | 2024-01-01 | 主版本 | 初始发布 |
| 1.1.0 | 2024-02-01 | 次版本 | 新增业务组件 |
| 1.2.0 | 2024-03-01 | 次版本 | 新增Hooks |
| 1.3.0 | 2024-04-01 | 次版本 | 性能优化 |
| 2.0.0 | 2024-07-01 | 主版本 | 重大架构变更 |

## 联系方式

### 发布团队

- **发布负责人**: release@0379.email
- **发布审查人**: review@0379.email
- **发布通知人**: announce@0379.email

### 技术支持

- **GitHub Issues**: https://github.com/YYC-Cube/yyc3-reusable-components/issues
- **邮件支持**: support@0379.email

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」

</div>
