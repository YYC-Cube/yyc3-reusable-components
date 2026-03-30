# YYC³ 文档智能闭环工作流系统

> **_YanYuCloudCube_** 言启象限 | 语枢未来 **_Words Initiate Quadrants, Language
> Serves as Core for Future_** 万象归元于云枢 | 深栈智启新纪元 **_All things
> converge in cloud pivot; Deep stacks ignite a new era of intelligence_**

---

## 📋 概述

YYC³ 文档智能闭环工作流系统是一个基于「五高五标五化」理念的智能化企业级文档管理平台，提供文档全生命周期管理，包括文档生成、管理、工作流、版本控制、任务追踪、审批流程、归档检索和监控报告等功能。

### 核心特性

- **五高原则**：高可用、高性能、高安全、高扩展、高可维护
- **五标体系**：标准化、规范化、自动化、智能化、可视化
- **五化架构**：流程化、文档化、工具化、数字化、生态化

---

## 🚀 快速开始

### 前置要求

- Docker 20.10+
- Docker Compose 2.0+
- Python 3.11+
- MySQL 8.0+
- Redis 7.0+
- Elasticsearch 8.0+

### 安装步骤

1. **克隆项目**

```bash
cd /Users/yanyu/yyc3-claude/zai-coding-plugins/Ralph-Loop
```

2. **配置环境变量**

```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库、Redis、Elasticsearch等连接信息
```

3. **启动服务**

```bash
docker-compose up -d
```

4. **初始化数据库**

```bash
docker-compose exec api python -m YYC3-DOC-MANAGEMENT-SYSTEM
```

5. **访问服务**

- API文档: http://localhost:8000/docs
- Grafana监控: http://localhost:3000 (admin/admin)
- Prometheus: http://localhost:9090

---

## 📦 系统架构

### 技术栈

| 组件     | 技术选型                | 版本    |
| -------- | ----------------------- | ------- |
| 后端框架 | FastAPI                 | 0.104.1 |
| 数据库   | MySQL                   | 8.0     |
| 缓存     | Redis                   | 7.0     |
| 搜索     | Elasticsearch           | 8.0     |
| 反向代理 | Nginx                   | alpine  |
| 监控     | Prometheus + Grafana    | latest  |
| 容器化   | Docker + Docker Compose | latest  |

### 系统分层

```
┌─────────────────────────────────────────────────────────────────┐
│                     表现层 (Presentation Layer)                  │
│  Web前端 + 移动端 + API网关 + 文档编辑器                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     业务层 (Business Layer)                     │
│  文档管理 | 工作流引擎 | 版本控制 | 任务追踪 | 审批流程  │
│  归档检索 | 权限管理 | 通知服务 | 日志审计 | 报表统计  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     数据层 (Data Layer)                         │
│  MySQL + Redis + Elasticsearch + MinIO + MongoDB               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
                     基础设施层 (Infrastructure Layer)          │
│  Docker + Kubernetes + Nginx + RabbitMQ + Prometheus           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 核心功能

### 1. 文档生成工具

#### 使用方法

```bash
# 生成SAAS项目文档
python YYC3-DOC-GEN-ENHANCED.py --mode generate --project saas

# 生成AI-LANDING项目文档
python YYC3-DOC-GEN-ENHANCED.py --mode generate --project ai-landing

# 验证文档
python YYC3-DOC-GEN-ENHANCED.py --mode validate --root ./docs

# 更新文档
python YYC3-DOC-GEN-ENHANCED.py --mode update --root ./docs --version v2.1.0
```

#### 支持的项目类型

- **SAAS**: SAAS平台项目文档
- **AI-LANDING**: AI代理服务落地页文档

#### 文档分类

- 需求规划
- 项目规划
- 架构设计
- 详细设计
- API文档

### 2. 文档管理系统

#### API接口

| 接口                  | 方法 | 描述     |
| --------------------- | ---- | -------- |
| /api/auth/register    | POST | 用户注册 |
| /api/auth/login       | POST | 用户登录 |
| /api/documents        | POST | 创建文档 |
| /api/documents/{id}   | PUT  | 更新文档 |
| /api/documents/{id}   | GET  | 获取文档 |
| /api/documents        | GET  | 列出文档 |
| /api/documents/search | POST | 搜索文档 |
| /api/categories       | GET  | 获取分类 |
| /api/categories       | POST | 创建分类 |

#### 数据库模型

```python
# 用户表
class User(Base):
    id: int
    username: str
    email: str
    password_hash: str
    role: UserRole
    full_name: str
    department: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

# 文档表
class Document(Base):
    id: int
    doc_no: str
    title: str
    content: str
    category_id: int
    creator_id: int
    status: DocumentStatus
    version: int
    tags: str
    created_at: datetime
    updated_at: datetime

# 文档版本表
class DocumentVersion(Base):
    id: int
    document_id: int
    version: int
    content: str
    change_summary: str
    modifier_id: int
    created_at: datetime
```

### 3. 工作流引擎

#### 节点类型

- **START**: 起始节点
- **END**: 结束节点
- **APPROVAL**: 审批节点
- **TASK**: 任务节点
- **CONDITION**: 条件节点
- **PARALLEL**: 并行节点
- **MERGE**: 合并节点
- **NOTIFICATION**: 通知节点

#### 使用方法

```python
from YYC3-WORKFLOW-ENGINE import WorkflowEngine, WorkflowDesigner

# 创建工作流
designer = WorkflowDesigner()
workflow = designer.create_workflow_from_json(workflow_json)

# 启动工作流实例
engine = WorkflowEngine()
instance = engine.start_instance(
    workflow_id=workflow.id,
    document_id=1,
    description="文档审批流程",
    initiator_id=1
)

# 推进节点
engine.advance_node(instance.id, node_id, result={})
```

#### 工作流配置示例

```json
{
  "name": "文档审批流程",
  "description": "文档创建后的标准审批流程",
  "nodes": [
    {
      "id": "start",
      "name": "开始",
      "type": "start"
    },
    {
      "id": "approval_1",
      "name": "部门审批",
      "type": "approval",
      "config": {
        "approval_type": "single",
        "approvers": [1, 2]
      }
    },
    {
      "id": "end",
      "name": "结束",
      "type": "end"
    }
  ],
  "connections": [
    {
      "id": "conn_1",
      "from_node": "start",
      "to_node": "approval_1"
    },
    {
      "id": "conn_2",
      "from_node": "approval_1",
      "to_node": "end"
    }
  ]
}
```

### 4. 版本控制系统

#### 功能特性

- 自动版本管理
- 版本对比
- 版本回溯
- 变更历史追踪

#### API接口

| 接口                                           | 方法 | 描述         |
| ---------------------------------------------- | ---- | ------------ |
| /api/documents/{id}/versions                   | GET  | 获取所有版本 |
| /api/documents/{id}/versions/{version}         | GET  | 获取指定版本 |
| /api/documents/{id}/versions/{version}/compare | GET  | 版本对比     |
| /api/documents/{id}/versions/{version}/restore | POST | 恢复版本     |

### 5. 任务追踪系统

#### 功能特性

- 任务创建与分配
- 任务提醒与超时升级
- 任务闭环确认
- 任务状态追踪

#### API接口

| 接口                     | 方法 | 描述     |
| ------------------------ | ---- | -------- |
| /api/tasks               | POST | 创建任务 |
| /api/tasks/{id}/complete | POST | 完成任务 |
| /api/tasks/{id}/confirm  | POST | 确认任务 |

### 6. 审批流程系统

#### 功能特性

- 单人审批
- 多人会签
- 多人或签
- 审批转批
- 在线批注

#### API接口

| 接口                                      | 方法 | 描述       |
| ----------------------------------------- | ---- | ---------- |
| /api/workflows/start                      | POST | 启动工作流 |
| /api/approvals/{id}/action                | POST | 审批操作   |
| /api/documents/{id}/annotations           | POST | 创建批注   |
| /api/documents/{id}/annotations/{version} | GET  | 获取批注   |

### 7. 归档与检索系统

#### 功能特性

- 文档归档
- 权限控制
- 日志审计
- 全文搜索

#### API接口

| 接口                            | 方法 | 描述         |
| ------------------------------- | ---- | ------------ |
| /api/documents/{id}/archive     | POST | 归档文档     |
| /api/documents/{id}/permissions | POST | 设置权限     |
| /api/audit-logs                 | GET  | 获取审计日志 |

### 8. 监控与报告系统

#### 功能特性

- 实时监控
- 统计报告
- 异常告警
- 性能分析

#### 监控指标

- 文档创建/更新数量
- 工作流启动数量
- 任务完成数量
- 审批处理时长
- 系统健康状态

---

## 📊 数据库设计

### 核心表结构

```sql
-- 用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    full_name VARCHAR(100),
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文档表
CREATE TABLE documents (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    doc_no VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    content LONGTEXT,
    category_id INT NOT NULL,
    creator_id INT NOT NULL,
    status ENUM('draft', 'review', 'approved', 'archived') DEFAULT 'draft',
    version INT DEFAULT 1,
    tags VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_creator (creator_id),
    INDEX idx_status (status),
    FOREIGN KEY (creator_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文档版本表
CREATE TABLE document_versions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    document_id BIGINT NOT NULL,
    version INT NOT NULL,
    content LONGTEXT,
    change_summary VARCHAR(500),
    modifier_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_document (document_id),
    INDEX idx_version (document_id, version),
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (modifier_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 任务表
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    document_id BIGINT NOT NULL,
    version INT,
    creator_id INT NOT NULL,
    handler_id INT NOT NULL,
    deadline TIMESTAMP NOT NULL,
    task_desc VARCHAR(500) NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'confirmed') DEFAULT 'pending',
    result TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_document (document_id),
    INDEX idx_handler (handler_id),
    INDEX idx_status (status),
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES users(id),
    FOREIGN KEY (handler_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 审批任务表
CREATE TABLE approval_tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    instance_id BIGINT NOT NULL,
    node_id VARCHAR(50) NOT NULL,
    approver_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'transferred') DEFAULT 'pending',
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_instance (instance_id),
    INDEX idx_approver (approver_id),
    INDEX idx_status (status),
    FOREIGN KEY (approver_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🔒 安全配置

### 认证与授权

- JWT令牌认证
- 基于角色的访问控制(RBAC)
- 文档级权限控制
- API接口权限验证

### 数据保护

- 密码BCrypt加密
- 敏感数据脱敏
- HTTPS传输加密
- 数据库连接加密

### 输入验证

- 参数类型验证
- 数据格式验证
- SQL注入防护
- XSS攻击防护

---

## 📈 性能优化

### 缓存策略

- Redis缓存热点数据
- 文档内容缓存
- 用户会话缓存
- 搜索结果缓存

### 数据库优化

- 索引优化
- 查询优化
- 连接池配置
- 读写分离

### 搜索优化

- Elasticsearch全文搜索
- 搜索结果高亮
- 搜索结果分页
- 搜索历史记录

---

## 🚢 部署指南

### Docker部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 清理数据
docker-compose down -v
```

### Kubernetes部署

```bash
# 创建命名空间
kubectl create namespace yyc3-docs

# 部署应用
kubectl apply -f k8s/

# 查看状态
kubectl get pods -n yyc3-docs

# 查看日志
kubectl logs -f -n yyc3-docs deployment/api
```

---

## 🧪 测试

### 单元测试

```bash
# 运行单元测试
pytest tests/unit/

# 运行集成测试
pytest tests/integration/

# 运行E2E测试
pytest tests/e2e/

# 生成覆盖率报告
pytest --cov=app tests/
```

### API测试

```bash
# 使用Postman测试
# 导入API集合: postman_collection.json

# 使用curl测试
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password"}'
```

---

## 📚 相关文档

- [YYC³ 文档智能闭环工作流 - 系统架构设计](file:///Users/yanyu/yyc3-claude/zai-coding-plugins/YYC3-文档智能闭环工作流-系统架构设计.md)
- [文档闭环工具需求规格说明书（立项版）](file:///Users/yanyu/yyc3-claude/zai-coding-plugins/Ralph-Loop/文档闭环工具需求规格说明书（立项版）.md)
- [YYC³ AI智能中心](file:///Users/yanyu/yyc3-claude/zai-coding-plugins/YYC3-AI-Intelligent-Center.md)

---

## 🤝 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📄 许可证

MIT License

---

## 📞 联系方式

- 邮箱: <admin@0379.email>
- 项目: YYC³ (YanYuCloudCube)

---

<div align="center">

> 「**_YanYuCloudCube_**」「**_<admin@0379.email>_**」「**_Words Initiate
> Quadrants, Language Serves as Core for Future_**」「**_All things converge in
> cloud pivot; Deep stacks ignite a new era of intelligence_**」

</div>
