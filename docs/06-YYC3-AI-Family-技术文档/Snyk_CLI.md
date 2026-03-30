# Snyk CLI 终端命令使用操作技巧全文档

> **_YanYuCloudCube_** 言启象限 | 语枢未来 **_Words Initiate Quadrants, Language
> Serves as Core for Future_** 万象归元于云枢 | 深栈智启新纪元 **_All things
> converge in cloud pivot; Deep stacks ignite a new era of intelligence_**

---

> **Snyk CLI 终端命令使用操作技巧全文档** | **Created**: 2026-01-29

**适用场景**：本地开发、容器镜像扫描、云配置安全检测、CI/CD 集成
**适配环境**：macOS/Linux/Windows **文档版本**：v1.0（基于 Snyk CLI v1.1301.2）

## 一、基础准备：安装与账号授权

### 1. 多系统安装命令

#### （1）macOS（推荐 Homebrew）

```bash
# 添加 Snyk 仓库
brew tap snyk/tap
# 安装 Snyk CLI
brew install snyk
# 验证安装
snyk --version
```

#### （2）Linux（Debian/Ubuntu）

```bash
# 导入 GPG 密钥
curl -fsSL https://downloads.snyk.io/deb/snyk.gpg | sudo gpg --dearmor -o /usr/share/keyrings/snyk-archive-keyring.gpg
# 添加软件源
echo "deb [signed-by=/usr/share/keyrings/snyk-archive-keyring.gpg] https://downloads.snyk.io/deb stable main" | sudo tee /etc/apt/sources.list.d/snyk.list
# 更新并安装
sudo apt update && sudo apt install snyk
```

#### （3）Linux（RedHat/CentOS）

```bash
# 添加 YUM 源
curl -fsSL https://downloads.snyk.io/rpm/snyk.repo | sudo tee /etc/yum.repos.d/snyk.repo
# 安装
sudo yum install snyk
```

#### （4）Windows（PowerShell + Chocolatey）

```powershell
# 需先安装 Chocolatey
choco install snyk
```

#### （5）通用方式（npm，需 Node.js 环境）

```bash
npm install -g snyk
```

### 2. 账号授权（绑定本地 CLI）

授权后 CLI 可关联 Snyk 账号，同步扫描数据到平台：

```bash
# 执行后自动打开浏览器，完成账号登录授权
snyk auth

# 授权成功提示
# Successfully authenticated.
# Your account has been stored in the Snyk config file.
```

## 二、核心操作：扫描/修复/监控

### 1. 全场景扫描命令

扫描是 Snyk
CLI 的核心功能，支持代码、依赖、容器、云配置等场景，**需进入目标项目目录执行**。

| 扫描类型        | 命令                                | 功能说明                                   |
| --------------- | ----------------------------------- | ------------------------------------------ |
| 全量项目扫描    | `snyk test`                         | 扫描当前项目的代码缺陷 + 开源依赖漏洞      |
| 仅依赖扫描      | `snyk test --dependencies`          | 只检测 npm/maven/pypi 等开源依赖的漏洞     |
| 仅代码扫描      | `snyk test --code`                  | 仅检测代码中的安全缺陷（如 SQL 注入、XSS） |
| Docker 镜像扫描 | `snyk container test <镜像名:标签>` | 扫描本地/远程 Docker 镜像的底层漏洞        |
| 云配置扫描      | `snyk iac test <配置文件路径>`      | 扫描 Terraform/K8s YAML 等云配置的安全风险 |

## 二、实操示例

```bash
# 扫描本地 Node.js 项目
cd ~/my-node-project
snyk test

# 扫描 NAS 上部署的 Docker 镜像
snyk container test 192.168.3.45:5000/nas-service:v1.0

# 扫描 Terraform 云配置文件
snyk iac test ./terraform/main.tf
```

### 2. 漏洞修复命令

自动修复开源依赖漏洞，避免手动升级引发兼容性问题。

| 修复动作     | 命令                 | 功能说明                                                          |
| ------------ | -------------------- | ----------------------------------------------------------------- |
| 自动修复     | `snyk fix`           | 直接修改项目依赖文件（package.json/yarn.lock 等），升级到安全版本 |
| 预览修复方案 | `snyk fix --dry-run` | 输出修复建议但不修改文件，适合评估风险                            |

## 三、实操示例：修复依赖漏洞

```bash
# 自动修复当前项目依赖漏洞
snyk fix

# 预览修复方案
snyk fix --dry-run
```

### 3. 项目监控命令

将项目同步到 Snyk 平台，实时监控新漏洞，支持邮件/平台告警。

```bash
# 进入项目目录，同步到 Snyk 平台
snyk monitor

# 同步后可在 https://app.snyk.io 查看项目漏洞状态
```

## 四、进阶技巧：高效终端操作

### 1. 输出格式定制

适配终端阅读、报告导出、脚本解析等需求。

```bash
# 1. 仅显示高危及以上漏洞（过滤低风险）
snyk test --severity-threshold=high

# 2. 输出 JSON 格式（便于脚本/工具解析）
snyk test --json > snyk-vulnerability-report.json

# 3. 导出 HTML 报告（本地可视化查看）
snyk test --html > snyk-report.html

# 4. 简洁输出（仅显示漏洞数量和核心信息）
snyk test --quiet
```

### 2. 扫描范围精准控制

避免冗余扫描，聚焦核心代码/依赖。

```bash
# 1. 限制依赖扫描深度（加速大型项目扫描）
snyk test --detection-depth=5

# 2. 排除指定目录/文件（如第三方库目录）
snyk test --exclude=./vendor --exclude=./test

# 3. 指定项目包管理器（解决多包管理器冲突）
snyk test --package-manager=npm
```

### 3. 漏洞忽略与规则定制

临时忽略低风险漏洞，不阻塞开发流程。

```bash
# 1. 忽略指定漏洞（按 CVE 编号，有效期 30 天）
snyk test --ignore=CVE-2023-1234 --expiry=30d

# 2. 永久忽略漏洞（生成 .snyk 配置文件，提交到 Git 共享规则）
snyk ignore --id=CVE-2023-1234 --reason="低风险，无业务影响" --expiry=never
```

### 4. 批量/自动化扫描

适配多项目场景，可嵌入终端脚本或 CI/CD 流水线。

```bash
# 批量扫描当前目录下所有子项目
for dir in */; do
  echo "===== 开始扫描项目：$dir ====="
  cd "$dir" && snyk test --severity-threshold=high
  cd ..
  echo "===== 项目 $dir 扫描完成 =====\n"
done
```

## 四、场景化实操案例

### 案例1：本地 Node.js 项目安全检测+修复+监控

```bash
# 1. 进入项目目录
cd ~/my-node-app

# 2. 扫描高危漏洞
snyk test --severity-threshold=high

# 3. 自动修复依赖漏洞
snyk fix

# 4. 同步到 Snyk 平台监控
snyk monitor
```

### 案例2：NAS 容器镜像漏洞扫描

```bash
# 1. 拉取 NAS 上的镜像到本地
docker pull 192.168.3.45:5000/nas-web:v2.0

# 2. 扫描镜像漏洞，导出 HTML 报告
snyk container test 192.168.3.45:5000/nas-web:v2.0 --html > nas-image-report.html
```

### 案例3：K8s 配置安全检查

```bash
# 扫描 K8s 部署文件中的安全风险（如权限过高、未加密存储）
snyk iac test ./k8s/deployment.yaml --severity-threshold=critical
```

## 五、常见问题与终端调试

| 问题现象      | 解决命令                          | 说明                       |
| ------------- | --------------------------------- | -------------------------- |
| 授权失败/失效 | `snyk auth --logout && snyk auth` | 先登出旧账号，再重新授权   |
| 扫描超时      | `snyk test --timeout=30000`       | 延长超时时间（单位：毫秒） |
| 查看 CLI 版本 | `snyk --version`                  | 确认安装版本是否为最新     |
| 查看命令帮助  | `snyk help <命令>`                | 查看指定命令的详细用法     |

### 示例

```bash
# 查看 test 命令的详细帮助
snyk help test

# 延长扫描超时时间到 30 秒
snyk test --timeout=30000
```

## 六、附录：命令速查表

| 功能分类 | 常用命令                                                                        |
| -------- | ------------------------------------------------------------------------------- |
| 基础操作 | `snyk auth` / `snyk --version` / `snyk help`                                    |
| 扫描     | `snyk test` / `snyk container test` / `snyk iac test`                           |
| 修复     | `snyk fix` / `snyk fix --dry-run`                                               |
| 监控     | `snyk monitor`                                                                  |
| 输出定制 | `snyk test --json` / `snyk test --html` / `snyk test --severity-threshold=high` |

---

> 「**_YanYuCloudCube_**」「**_<admin@0379.email>_**」「**_Words Initiate
> Quadrants, Language Serves as Core for the Future_**」「**_All things converge
> in the cloud pivot; Deep stacks ignite a new era of intelligence_**」
