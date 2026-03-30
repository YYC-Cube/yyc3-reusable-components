# YYC³ 智能检测系统 - 快速参考

## 🚀 常用命令

### 代码检查
```bash
pnpm check           # 标准检查（推荐）
pnpm check:quick     # 快速检查（跳过测试）
pnpm check:full      # 完整检查（所有测试）
```

### Git Hooks
```bash
git commit          # 自动运行 pre-commit
git push            # 自动运行 pre-push
```

### 分支管理
```bash
pnpm branch:list    # 列出所有分支
pnpm branch:analyze # 分析分支状态
pnpm branch:report  # 生成分支报告
```

### 初始化
```bash
node scripts/setup-smart-check.js  # 初始化智能检测系统
```

## 📊 检测项目

| 项目 | Pre-Commit | Pre-Push | CI/CD |
|------|-----------|----------|-------|
| ESLint | ✓ | ✓ | ✓ |
| TypeScript | ✓ | ✓ | ✓ |
| Prettier | ✓ | ✓ | ✓ |
| 单元测试 | ✗ | ✓ | ✓ |
| 构建 | ✗ | ✓ | ✓ |
| 安全检查 | ✗ | ✓ | ✓ |
| 性能测试 | ✗ | 可选 | 可选 |

## 🎯 分支策略

| 分支类型 | 用途 | 受保护 |
|---------|------|--------|
| `main` | 生产环境 | ✓ |
| `develop` | 开发环境 | ✓ |
| `staging` | 预发布环境 | ✓ |
| `feature/*` | 功能开发 | ✗ |
| `bugfix/*` | Bug修复 | ✗ |
| `hotfix/*` | 紧急修复 | ✗ |
| `release/*` | 版本发布 | ✓ |

## 📝 提交信息格式

```
<type>(<scope>): <subject>

类型:
  feat     新功能
  fix      修复bug
  docs     文档
  style    格式
  refactor 重构
  perf     性能
  test     测试
  build    构建
  ci       CI配置
  chore    其他
  revert   回退
```

## 🔍 故障排查

### Pre-commit 失败
1. 查看 `check-reports/` 下的报告
2. 运行 `pnpm check:quick`
3. 修复问题后重新提交

### Pre-push 失败
1. 查看错误详情
2. 运行 `pnpm check:full`
3. 确保所有测试通过

### 跳过检查（不推荐）
```bash
git commit --no-verify
git push --no-verify
```

## 📁 报告位置

- `.codebuddy/check-reports/` - 检测报告
- `.codebuddy/branch-reports/` - 分支报告
- `.codebuddy/performance-reports/` - 性能报告

## 🔗 相关文档

- [完整文档](./docs/智能检测系统.md)
- [项目规范](./YYC3-项目规范-全面标准.md)
- [贡献指南](./CONTRIBUTING.md)

---

**YYC³ Team** | admin@0379.email
