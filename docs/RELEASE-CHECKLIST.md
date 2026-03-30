# 发包检查清单

> 发布前必须完成的所有检查项

---

## 📋 发布前检查

### 代码质量

- [ ] 所有 ESLint 检查通过
- [ ] 所有 TypeScript 类型检查通过
- [ ] 所有单元测试通过
- [ ] 测试覆盖率 >= 80%
- [ ] 无 console.log 或 debugger 语句
- [ ] 无 TODO 或 FIXME 注释（或已处理）

### 构建验证

- [ ] 所有包构建成功 (`pnpm build`)
- [ ] dist 目录正确生成
- [ ] 类型定义文件 (.d.ts) 正确生成
- [ ] Source map 文件正确生成
- [ ] 无构建警告或错误

### 包配置

- [ ] package.json 版本号已更新
- [ ] package.json name 正确（@yyc3/\*）
- [ ] package.json main/module/exports 正确
- [ ] package.json types 指向正确
- [ ] package.json files 包含 dist
- [ ] package.json repository 正确
- [ ] package.json license 为 MIT
- [ ] package.json publishConfig.access 为 public
- [ ] package.json dependencies 版本正确

### 文档完整性

- [ ] README.md 存在且完整
- [ ] CHANGELOG.md 已更新
- [ ] LICENSE 文件存在
- [ ] API 文档已更新
- [ ] 示例代码可运行
- [ ] 安装说明准确

### CI/CD

- [ ] GitHub Actions CI 通过
- [ ] GitHub Actions Release 配置正确
- [ ] NPM_TOKEN 已配置到 GitHub Secrets
- [ ] Changesets 配置正确

---

## 🚀 发布流程

### 1. 本地验证

```bash
# 安装依赖
pnpm install

# 运行 lint
pnpm lint

# 运行类型检查
pnpm typecheck

# 运行测试
pnpm test:run

# 构建所有包
pnpm build

# 验证构建产物
ls packages/*/dist
```

### 2. 创建变更记录

```bash
# 创建 changeset
pnpm changeset

# 选择变更类型
# - patch: 0.0.x (Bug 修复)
# - minor: 0.x.0 (新功能)
# - major: x.0.0 (Breaking change)

# 描述变更
# 例如: "feat(ui): add DatePicker component"
```

### 3. 版本升级

```bash
# 自动升级版本号
pnpm version-packages

# 检查变更
git diff

# 确认 CHANGELOG 已更新
cat packages/*/CHANGELOG.md
```

### 4. 提交变更

```bash
# 提交版本变更
git add .
git commit -m "chore: version packages"

# 推送到远程
git push origin main
```

### 5. 发布到 npm

#### 自动发布（推荐）

```bash
# 合并到 main 分支后自动触发
# GitHub Actions 会自动发布
```

#### 手动发布

```bash
# 登录 npm
npm login

# 发布所有包
pnpm release

# 或单独发布
cd packages/ui
npm publish
```

### 6. 验证发布

```bash
# 检查包是否发布成功
npm info @yyc3/ui

# 测试安装
npm install @yyc3/ui@latest
```

---

## ⚠️ 常见问题

### 发布失败：403 Forbidden

**原因**: 没有发布权限或包名冲突

**解决**:

```bash
# 检查是否有权限
npm whoami

# 检查包名是否已存在
npm info @yyc3/package-name
```

### 发布失败：版本已存在

**原因**: 相同版本号已发布

**解决**:

```bash
# 检查当前版本
npm info @yyc3/ui version

# 升级版本号
pnpm version-packages
```

### 构建失败：类型错误

**原因**: TypeScript 类型定义错误

**解决**:

```bash
# 检查类型错误
pnpm typecheck

# 修复类型错误后重新构建
pnpm build
```

### Changeset 未生效

**原因**: .changeset 目录有未提交的文件

**解决**:

```bash
# 检查 changeset 状态
ls .changeset/*.md

# 提交所有 changeset
git add .changeset
git commit -m "chore: add changeset"
```

---

## 📊 包信息核对表

### 核心包

| 包名           | 当前版本 | dist 存在 | CHANGELOG | README |
| -------------- | -------- | --------- | --------- | ------ |
| @yyc3/ui       | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/business | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/smart    | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/ai       | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/themes   | 1.0.0    | ⬜        | ✅        | ✅     |
| @yyc3/core     | 1.0.0    | ⬜        | ⬜        | ⬜     |

### 工具包

| 包名               | 当前版本 | dist 存在 | CHANGELOG | README |
| ------------------ | -------- | --------- | --------- | ------ |
| @yyc3/hooks        | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/utils        | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/services     | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/repositories | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/effects      | 1.0.0    | ⬜        | ⬜        | ⬜     |
| @yyc3/navigation   | 1.0.0    | ⬜        | ⬜        | ⬜     |

---

## ✅ 发布成功检查

发布完成后确认：

- [ ] 所有包在 npm 上可访问
- [ ] `npm install @yyc3/ui` 正常工作
- [ ] TypeScript 类型正确导入
- [ ] 无运行时错误
- [ ] GitHub Release 已创建
- [ ] 文档站点已更新

---

<div align="center">

**发布流程完成！**

</div>
