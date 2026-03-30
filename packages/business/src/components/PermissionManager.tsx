import React, { useState } from 'react';
import {
  Lock,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  User,
  UserCog,
  Key,
  Eye,
  EyeOff,
  Plus,
  Search,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Layers,
  Brain,
  Sparkles,
  Clock,
  Activity,
  FileText,
  Database,
  Workflow,
  DollarSign,
  Package,
  Factory,
  Zap,
  Filter,
  Edit3,
  Trash2,
  Copy,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface PermissionManagerProps {
  currentLanguage: string;
}

type TabType = 'roles' | 'users' | 'resources' | 'audit';

interface Role {
  id: string;
  name: string;
  description: string;
  level: 'admin' | 'manager' | 'operator' | 'viewer';
  userCount: number;
  permissions: {
    module: string;
    read: boolean;
    write: boolean;
    delete: boolean;
    export: boolean;
  }[];
  createdAt: string;
  isSystem: boolean;
}

interface UserRecord {
  id: string;
  name: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'locked';
  lastLogin: string;
  loginCount: number;
  riskScore: number;
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  result: 'success' | 'denied' | 'warning';
  timestamp: string;
  ip: string;
  detail: string;
}

const ROLES: Role[] = [
  {
    id: 'R001',
    name: '超级管理员',
    description: '拥有系统所有权限，可管理用户、角色、系统配置',
    level: 'admin',
    userCount: 2,
    permissions: [
      { module: '核心业务', read: true, write: true, delete: true, export: true },
      { module: '财务管理', read: true, write: true, delete: true, export: true },
      { module: '人力资源', read: true, write: true, delete: true, export: true },
      { module: '系统设置', read: true, write: true, delete: true, export: true },
      { module: 'AI智能', read: true, write: true, delete: true, export: true },
    ],
    createdAt: '2025-01-01',
    isSystem: true,
  },
  {
    id: 'R002',
    name: '业务经理',
    description: '管理采购、销售、物流等核心业务模块',
    level: 'manager',
    userCount: 8,
    permissions: [
      { module: '核心业务', read: true, write: true, delete: false, export: true },
      { module: '财务管理', read: true, write: false, delete: false, export: true },
      { module: '人力资源', read: true, write: false, delete: false, export: false },
      { module: '系统设置', read: false, write: false, delete: false, export: false },
      { module: 'AI智能', read: true, write: true, delete: false, export: true },
    ],
    createdAt: '2025-03-15',
    isSystem: true,
  },
  {
    id: 'R003',
    name: '财务总监',
    description: '管理财务、预算、报销、审计等财务模块',
    level: 'manager',
    userCount: 3,
    permissions: [
      { module: '核心业务', read: true, write: false, delete: false, export: true },
      { module: '财务管理', read: true, write: true, delete: true, export: true },
      { module: '人力资源', read: true, write: false, delete: false, export: false },
      { module: '系统设置', read: false, write: false, delete: false, export: false },
      { module: 'AI智能', read: true, write: false, delete: false, export: true },
    ],
    createdAt: '2025-03-15',
    isSystem: true,
  },
  {
    id: 'R004',
    name: '采购专员',
    description: '执行采购订单、供应商管理等日常操作',
    level: 'operator',
    userCount: 12,
    permissions: [
      { module: '核心业务', read: true, write: true, delete: false, export: false },
      { module: '财务管理', read: false, write: false, delete: false, export: false },
      { module: '人力资源', read: false, write: false, delete: false, export: false },
      { module: '系统设置', read: false, write: false, delete: false, export: false },
      { module: 'AI智能', read: true, write: false, delete: false, export: false },
    ],
    createdAt: '2025-06-01',
    isSystem: false,
  },
  {
    id: 'R005',
    name: '仓库操作员',
    description: '管理库存出入库、盘点等仓储操作',
    level: 'operator',
    userCount: 15,
    permissions: [
      { module: '核心业务', read: true, write: true, delete: false, export: false },
      { module: '财务管理', read: false, write: false, delete: false, export: false },
      { module: '人力资源', read: false, write: false, delete: false, export: false },
      { module: '系统设置', read: false, write: false, delete: false, export: false },
      { module: 'AI智能', read: false, write: false, delete: false, export: false },
    ],
    createdAt: '2025-06-01',
    isSystem: false,
  },
  {
    id: 'R006',
    name: '只读查看者',
    description: '只能查看数据，无法进行任何修改操作',
    level: 'viewer',
    userCount: 5,
    permissions: [
      { module: '核心业务', read: true, write: false, delete: false, export: false },
      { module: '财务管理', read: true, write: false, delete: false, export: false },
      { module: '人力资源', read: false, write: false, delete: false, export: false },
      { module: '系统设置', read: false, write: false, delete: false, export: false },
      { module: 'AI智能', read: true, write: false, delete: false, export: false },
    ],
    createdAt: '2025-09-01',
    isSystem: false,
  },
];

const USERS: UserRecord[] = [
  {
    id: 'U001',
    name: '张伟',
    department: '管理层',
    role: '超级管理员',
    status: 'active',
    lastLogin: '2026-03-13 14:20',
    loginCount: 856,
    riskScore: 5,
  },
  {
    id: 'U002',
    name: '李明',
    department: '采购部',
    role: '业务经理',
    status: 'active',
    lastLogin: '2026-03-13 13:45',
    loginCount: 623,
    riskScore: 12,
  },
  {
    id: 'U003',
    name: '王芳',
    department: '销售部',
    role: '业务经理',
    status: 'active',
    lastLogin: '2026-03-13 10:30',
    loginCount: 712,
    riskScore: 8,
  },
  {
    id: 'U004',
    name: '赵强',
    department: '财务部',
    role: '财务总监',
    status: 'active',
    lastLogin: '2026-03-13 09:15',
    loginCount: 534,
    riskScore: 3,
  },
  {
    id: 'U005',
    name: '刘洋',
    department: '采购部',
    role: '采购专员',
    status: 'active',
    lastLogin: '2026-03-13 11:00',
    loginCount: 389,
    riskScore: 15,
  },
  {
    id: 'U006',
    name: '陈静',
    department: '仓储部',
    role: '仓库操作员',
    status: 'active',
    lastLogin: '2026-03-12 17:30',
    loginCount: 245,
    riskScore: 22,
  },
  {
    id: 'U007',
    name: '周鹏',
    department: '物流部',
    role: '采购专员',
    status: 'inactive',
    lastLogin: '2026-02-28 09:00',
    loginCount: 156,
    riskScore: 45,
  },
  {
    id: 'U008',
    name: '吴磊',
    department: 'IT部',
    role: '超级管理员',
    status: 'active',
    lastLogin: '2026-03-13 15:00',
    loginCount: 1203,
    riskScore: 8,
  },
  {
    id: 'U009',
    name: '孙丽',
    department: '人事部',
    role: '只读查看者',
    status: 'locked',
    lastLogin: '2026-03-10 08:30',
    loginCount: 89,
    riskScore: 68,
  },
];

const AUDIT_LOGS: AuditLog[] = [
  {
    id: 'A001',
    user: '张伟',
    action: '修改角色权限',
    resource: '业务经理角色',
    result: 'success',
    timestamp: '2026-03-13 14:30',
    ip: '192.168.1.100',
    detail: '添加AI智能模块写权限',
  },
  {
    id: 'A002',
    user: '刘洋',
    action: '导出客户数据',
    resource: '客户管理',
    result: 'denied',
    timestamp: '2026-03-13 11:20',
    ip: '192.168.1.105',
    detail: '采购专员无导出权限',
  },
  {
    id: 'A003',
    user: '陈静',
    action: '非常规时间登录',
    resource: '系统登录',
    result: 'warning',
    timestamp: '2026-03-13 02:15',
    ip: '10.0.0.55',
    detail: '凌晨异常登录，IP地址非常规',
  },
  {
    id: 'A004',
    user: '赵强',
    action: '查看薪酬数据',
    resource: '薪酬管理',
    result: 'success',
    timestamp: '2026-03-13 09:30',
    ip: '192.168.1.108',
    detail: '正常权限范围访问',
  },
  {
    id: 'A005',
    user: '孙丽',
    action: '连续5次登录失败',
    resource: '系统登录',
    result: 'warning',
    timestamp: '2026-03-10 08:25',
    ip: '192.168.1.112',
    detail: '账户已自动锁定',
  },
  {
    id: 'A006',
    user: '李明',
    action: '删除供应商记录',
    resource: '供应商管理',
    result: 'denied',
    timestamp: '2026-03-12 16:40',
    ip: '192.168.1.102',
    detail: '业务经理无删除权限',
  },
  {
    id: 'A007',
    user: '吴磊',
    action: '系统配置变更',
    resource: '系统设置',
    result: 'success',
    timestamp: '2026-03-13 15:10',
    ip: '192.168.1.120',
    detail: '更新邮件服务器配置',
  },
  {
    id: 'A008',
    user: '周鹏',
    action: '访问财务报表',
    resource: '财务管理',
    result: 'denied',
    timestamp: '2026-02-27 14:00',
    ip: '192.168.1.106',
    detail: '采购专员无财务模块权限',
  },
];

const ROLE_DIST_PIE = [
  { name: '管理员', value: 2, color: '#ef4444' },
  { name: '经理', value: 11, color: '#3b82f6' },
  { name: '操作员', value: 27, color: '#22c55e' },
  { name: '查看者', value: 5, color: '#6b7280' },
];

const ACCESS_TREND = [
  { date: '03-07', success: 125, denied: 8, warning: 3 },
  { date: '03-08', success: 118, denied: 5, warning: 2 },
  { date: '03-09', success: 132, denied: 12, warning: 5 },
  { date: '03-10', success: 108, denied: 6, warning: 4 },
  { date: '03-11', success: 145, denied: 9, warning: 2 },
  { date: '03-12', success: 138, denied: 7, warning: 3 },
  { date: '03-13', success: 152, denied: 10, warning: 4 },
];

export function PermissionManager({ currentLanguage }: PermissionManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('roles');
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'roles' as TabType, label: { en: 'Roles', zh: '角色管理' }, icon: Shield },
    { id: 'users' as TabType, label: { en: 'Users', zh: '用户权限' }, icon: Users },
    { id: 'resources' as TabType, label: { en: 'Resources', zh: '资源授权' }, icon: Layers },
    { id: 'audit' as TabType, label: { en: 'Audit', zh: '安全审计' }, icon: Eye },
  ];

  const levelConf: Record<
    string,
    { label: string; color: string; bg: string; icon: typeof Shield }
  > = {
    admin: {
      label: isZh ? '管理员' : 'Admin',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      icon: ShieldAlert,
    },
    manager: {
      label: isZh ? '经理' : 'Manager',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      icon: ShieldCheck,
    },
    operator: {
      label: isZh ? '操作员' : 'Operator',
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      icon: UserCog,
    },
    viewer: {
      label: isZh ? '查看者' : 'Viewer',
      color: 'text-gray-400',
      bg: 'bg-gray-500/20',
      icon: Eye,
    },
  };

  const totalUsers = USERS.length;
  const activeUsers = USERS.filter((u) => u.status === 'active').length;
  const highRiskCount = USERS.filter((u) => u.riskScore > 40).length;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-red-500/20">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '权限管理' : 'Permission Management'}</span>
              <Sparkles className="w-5 h-5 text-red-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh ? 'RBAC角色权限控制与安全审计' : 'RBAC role-based access control & audit'}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 rounded-xl border border-red-500/30 hover:from-red-500/30 hover:to-orange-500/30 transition-all text-sm">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '新建角色' : 'New Role'}</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '角色总数' : 'Total Roles',
            value: ROLES.length.toString(),
            icon: Shield,
            gradient: 'from-red-500 to-orange-500',
            sub: `${ROLES.filter((r) => r.isSystem).length} ${isZh ? '系统角色' : 'system'}`,
          },
          {
            label: isZh ? '活跃用户' : 'Active Users',
            value: `${activeUsers}/${totalUsers}`,
            icon: Users,
            gradient: 'from-blue-500 to-indigo-500',
            sub: `${USERS.filter((u) => u.status === 'locked').length} ${isZh ? '已锁定' : 'locked'}`,
          },
          {
            label: isZh ? '今日访问' : 'Today Access',
            value: '152',
            icon: Activity,
            gradient: 'from-emerald-500 to-green-500',
            sub: `${isZh ? '10次拒绝' : '10 denied'}`,
          },
          {
            label: isZh ? '高风险用户' : 'High Risk',
            value: highRiskCount.toString(),
            icon: AlertTriangle,
            gradient: 'from-amber-500 to-orange-500',
            sub: isZh ? '需要关注' : 'Need attention',
          },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 hover:border-red-500/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-2xl text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}
                >
                  <StatIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          {ROLES.map((role) => {
            const lc = levelConf[role.level];
            const LevelIcon = lc.icon;
            const isExpanded = expandedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${
                  isExpanded
                    ? 'border-red-500/30 shadow-lg shadow-red-500/5'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${lc.bg} flex items-center justify-center`}
                      >
                        <LevelIcon className={`w-5 h-5 ${lc.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white">{role.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${lc.bg} ${lc.color}`}>
                            {lc.label}
                          </span>
                          {role.isSystem && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-400">
                              {isZh ? '系统' : 'System'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">
                        {role.userCount}
                        <span className="text-xs text-gray-500 ml-1">{isZh ? '人' : 'users'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <p className="text-xs text-gray-500 mb-3">
                      {isZh ? '权限矩阵' : 'Permission Matrix'}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left text-xs text-gray-500 py-2 pr-4">
                              {isZh ? '模块' : 'Module'}
                            </th>
                            <th className="text-center text-xs text-gray-500 py-2 px-3">
                              {isZh ? '查看' : 'Read'}
                            </th>
                            <th className="text-center text-xs text-gray-500 py-2 px-3">
                              {isZh ? '编辑' : 'Write'}
                            </th>
                            <th className="text-center text-xs text-gray-500 py-2 px-3">
                              {isZh ? '删除' : 'Delete'}
                            </th>
                            <th className="text-center text-xs text-gray-500 py-2 px-3">
                              {isZh ? '导出' : 'Export'}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {role.permissions.map((perm, pi) => (
                            <tr key={pi} className="border-b border-white/5">
                              <td className="py-2 pr-4 text-sm text-gray-300">{perm.module}</td>
                              {['read', 'write', 'delete', 'export'].map((action) => {
                                const enabled = perm[action as keyof typeof perm] as boolean;
                                return (
                                  <td key={action} className="py-2 px-3 text-center">
                                    {enabled ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-gray-600 mx-auto" />
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {!role.isSystem && (
                      <div className="flex space-x-2 mt-4">
                        <button
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{isZh ? '编辑' : 'Edit'}</span>
                        </button>
                        <button
                          className="flex items-center space-x-1 px-3 py-1.5 bg-slate-700/30 text-gray-400 rounded-lg border border-white/10 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Copy className="w-3 h-3" />
                          <span>{isZh ? '复制' : 'Clone'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '用户' : 'User'}
                  </th>
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '部门' : 'Dept'}
                  </th>
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '角色' : 'Role'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '状态' : 'Status'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '最后登录' : 'Last Login'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '风险评分' : 'Risk'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {USERS.map((user) => {
                  const statusConf = {
                    active: {
                      label: isZh ? '活跃' : 'Active',
                      color: 'text-emerald-400',
                      bg: 'bg-emerald-500/20',
                    },
                    inactive: {
                      label: isZh ? '不活跃' : 'Inactive',
                      color: 'text-gray-400',
                      bg: 'bg-gray-500/20',
                    },
                    locked: {
                      label: isZh ? '已锁定' : 'Locked',
                      color: 'text-red-400',
                      bg: 'bg-red-500/20',
                    },
                  };
                  const sc = statusConf[user.status];
                  return (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-xs text-gray-300">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm text-white">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{user.department}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{user.role}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-xs text-gray-400">
                        {user.lastLogin}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-12 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                user.riskScore <= 20
                                  ? 'bg-emerald-500'
                                  : user.riskScore <= 40
                                    ? 'bg-amber-500'
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(user.riskScore, 100)}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs ${
                              user.riskScore <= 20
                                ? 'text-emerald-400'
                                : user.riskScore <= 40
                                  ? 'text-amber-400'
                                  : 'text-red-400'
                            }`}
                          >
                            {user.riskScore}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-red-400" />
              <span>{isZh ? 'AI权限分析' : 'AI Permission Analysis'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-gray-400 mb-3">
                  {isZh ? '角色用户分布' : 'Role Distribution'}
                </h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={ROLE_DIST_PIE}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {ROLE_DIST_PIE.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(15,23,42,0.95)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {ROLE_DIST_PIE.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-400">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm text-gray-400 mb-3">
                  {isZh ? 'AI安全建议' : 'AI Security Tips'}
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      level: 'warning',
                      text: isZh
                        ? '用户「孙丽」风险评分68分（高风险），建议审查账户权限并确认是否需要保留'
                        : 'User "Sun Li" risk score 68 (high), review permissions',
                    },
                    {
                      level: 'warning',
                      text: isZh
                        ? '用户「周鹏」已14天未登录且风险评分45分，建议自动降级为只读权限'
                        : 'User "Zhou Peng" inactive 14d, risk 45, suggest downgrade',
                    },
                    {
                      level: 'info',
                      text: isZh
                        ? '「采购专员」角色权限范围合理，但建议限制敏感供应商信息访问'
                        : 'Procurement Specialist role ok, limit sensitive supplier data',
                    },
                    {
                      level: 'info',
                      text: isZh
                        ? '超级管理员账户仅2个，符合最小权限原则'
                        : 'Only 2 admin accounts, compliant with least privilege',
                    },
                    {
                      level: 'info',
                      text: isZh
                        ? '建议启用所有经理级以上角色的双因素认证（2FA）'
                        : 'Enable 2FA for all manager+ roles',
                    },
                  ].map((tip, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start space-x-3 p-3 rounded-xl ${
                        tip.level === 'warning'
                          ? 'bg-amber-500/10 border border-amber-500/15'
                          : 'bg-slate-900/30 border border-white/5'
                      }`}
                    >
                      {tip.level === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-xs text-gray-300">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit Tab */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Access Trend Chart */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '近7天访问趋势' : '7-Day Access Trend'}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={ACCESS_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15,23,42,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Bar
                    dataKey="success"
                    fill="#22c55e"
                    name={isZh ? '成功' : 'Success'}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="denied"
                    fill="#ef4444"
                    name={isZh ? '拒绝' : 'Denied'}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="warning"
                    fill="#f59e0b"
                    name={isZh ? '告警' : 'Warning'}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <p className="text-gray-400 text-sm">
                {isZh ? '安全审计日志' : 'Security Audit Logs'}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '时间' : 'Time'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '用户' : 'User'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '操作' : 'Action'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '资源' : 'Resource'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? '结果' : 'Result'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '详情' : 'Detail'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AUDIT_LOGS.map((log) => {
                    const resultConf = {
                      success: {
                        label: isZh ? '成功' : 'OK',
                        color: 'text-emerald-400',
                        bg: 'bg-emerald-500/20',
                        icon: CheckCircle2,
                      },
                      denied: {
                        label: isZh ? '拒绝' : 'Denied',
                        color: 'text-red-400',
                        bg: 'bg-red-500/20',
                        icon: XCircle,
                      },
                      warning: {
                        label: isZh ? '告警' : 'Warning',
                        color: 'text-amber-400',
                        bg: 'bg-amber-500/20',
                        icon: AlertTriangle,
                      },
                    };
                    const rc = resultConf[log.result];
                    const RIcon = rc.icon;
                    return (
                      <tr
                        key={log.id}
                        className={`border-b border-white/5 hover:bg-white/[0.02] ${log.result === 'warning' ? 'bg-amber-500/[0.03]' : ''}`}
                      >
                        <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-4 text-sm text-white">{log.user}</td>
                        <td className="py-3 px-4 text-sm text-gray-300">{log.action}</td>
                        <td className="py-3 px-4 text-sm text-gray-400">{log.resource}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center space-x-1 text-xs px-2 py-0.5 rounded-full ${rc.bg} ${rc.color}`}
                          >
                            <RIcon className="w-3 h-3" />
                            <span>{rc.label}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-500 max-w-[200px] truncate">
                          {log.detail}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
