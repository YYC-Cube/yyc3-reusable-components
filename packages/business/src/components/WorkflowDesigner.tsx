import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  GitBranch,
  Sparkles,
  Brain,
  Eye,
  Copy,
  Trash2,
  Settings,
  Filter,
  Search,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Zap,
  FileText,
  DollarSign,
  Package,
  Shield,
  Activity,
  BarChart3,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
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
  AreaChart,
  Area,
} from 'recharts';

interface WorkflowDesignerProps {
  currentLanguage: string;
}

type TabType = 'templates' | 'instances' | 'designer' | 'analytics';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'procurement' | 'finance' | 'hr' | 'logistics' | 'general';
  steps: WorkflowStep[];
  status: 'active' | 'draft' | 'archived';
  instanceCount: number;
  avgDuration: string;
  completionRate: number;
  createdBy: string;
  updatedAt: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'start' | 'approval' | 'condition' | 'action' | 'notification' | 'end';
  assignee?: string;
  sla?: string;
  description?: string;
}

interface WorkflowInstance {
  id: string;
  templateName: string;
  initiator: string;
  currentStep: string;
  status: 'running' | 'completed' | 'rejected' | 'paused' | 'timeout';
  startTime: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
}

const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'WF-001',
    name: '废金属采购审批流程',
    description: '涵盖采购申请、供应商确认、价格审核、合同审批、付款审批全链路',
    category: 'procurement',
    steps: [
      { id: 's1', name: '采购申请', type: 'start', assignee: '采购专员' },
      { id: 's2', name: '供应商核实', type: 'action', assignee: '供应链部', sla: '2h' },
      { id: 's3', name: '价格审核', type: 'approval', assignee: '采购经理', sla: '4h' },
      { id: 's4', name: '金额判断', type: 'condition', description: '>50万走总经理审批' },
      { id: 's5', name: '总经理审批', type: 'approval', assignee: '总经理', sla: '8h' },
      { id: 's6', name: '合同生成', type: 'action', assignee: '法务部', sla: '24h' },
      { id: 's7', name: '通知相关方', type: 'notification' },
      { id: 's8', name: '完成', type: 'end' },
    ],
    status: 'active',
    instanceCount: 156,
    avgDuration: '18.5h',
    completionRate: 92,
    createdBy: '系统管理员',
    updatedAt: '2026-03-10',
  },
  {
    id: 'WF-002',
    name: '费用报销审批流程',
    description: '差旅费、业务招待费、办公用品等费用报销标准流程',
    category: 'finance',
    steps: [
      { id: 's1', name: '提交报销', type: 'start', assignee: '申请人' },
      { id: 's2', name: '部门主管审批', type: 'approval', assignee: '部门主管', sla: '4h' },
      { id: 's3', name: '财务审核', type: 'approval', assignee: '财务部', sla: '8h' },
      { id: 's4', name: '付款执行', type: 'action', assignee: '出纳', sla: '24h' },
      { id: 's5', name: '完成', type: 'end' },
    ],
    status: 'active',
    instanceCount: 328,
    avgDuration: '12.3h',
    completionRate: 97,
    createdBy: '财务总监',
    updatedAt: '2026-03-08',
  },
  {
    id: 'WF-003',
    name: '新员工入职流程',
    description: '涵盖HR审核、IT配置、部门培训、试用期考核全流程',
    category: 'hr',
    steps: [
      { id: 's1', name: '入职申请', type: 'start', assignee: 'HR' },
      { id: 's2', name: '资料审核', type: 'approval', assignee: 'HR经理', sla: '8h' },
      { id: 's3', name: 'IT设备配置', type: 'action', assignee: 'IT部', sla: '24h' },
      { id: 's4', name: '部门培训', type: 'action', assignee: '部门主管', sla: '72h' },
      { id: 's5', name: '试用期考核', type: 'approval', assignee: '部门主管', sla: '2160h' },
      { id: 's6', name: '完成', type: 'end' },
    ],
    status: 'active',
    instanceCount: 42,
    avgDuration: '72h',
    completionRate: 88,
    createdBy: 'HR总监',
    updatedAt: '2026-02-28',
  },
  {
    id: 'WF-004',
    name: '物流发货审批流程',
    description: '大额发货审批、仓库确认、运输安排、客户确认全链路',
    category: 'logistics',
    steps: [
      { id: 's1', name: '发货申请', type: 'start', assignee: '销售专员' },
      { id: 's2', name: '库存确认', type: 'action', assignee: '仓储部', sla: '2h' },
      { id: 's3', name: '发货审批', type: 'approval', assignee: '物流经理', sla: '4h' },
      { id: 's4', name: '运输安排', type: 'action', assignee: '物流部', sla: '8h' },
      { id: 's5', name: '客户通知', type: 'notification' },
      { id: 's6', name: '完成', type: 'end' },
    ],
    status: 'active',
    instanceCount: 89,
    avgDuration: '6.2h',
    completionRate: 95,
    createdBy: '物流总监',
    updatedAt: '2026-03-12',
  },
  {
    id: 'WF-005',
    name: '合同会签审批流程',
    description: '合同起草、法务审核、财务审核、总经理签批',
    category: 'general',
    steps: [
      { id: 's1', name: '合同起草', type: 'start', assignee: '业务部门' },
      { id: 's2', name: '法务审核', type: 'approval', assignee: '法务部', sla: '24h' },
      { id: 's3', name: '财务审核', type: 'approval', assignee: '财务部', sla: '8h' },
      { id: 's4', name: '总经理签批', type: 'approval', assignee: '总经理', sla: '24h' },
      { id: 's5', name: '合同盖章', type: 'action', assignee: '行政部', sla: '4h' },
      { id: 's6', name: '归档', type: 'end' },
    ],
    status: 'active',
    instanceCount: 67,
    avgDuration: '36h',
    completionRate: 90,
    createdBy: '法务总监',
    updatedAt: '2026-03-05',
  },
];

const WORKFLOW_INSTANCES: WorkflowInstance[] = [
  {
    id: 'INS-001',
    templateName: '废金属采购审批',
    initiator: '张伟',
    currentStep: '总经理审批',
    status: 'running',
    startTime: '2026-03-13 09:30',
    progress: 65,
    priority: 'high',
  },
  {
    id: 'INS-002',
    templateName: '费用报销审批',
    initiator: '李明',
    currentStep: '财务审核',
    status: 'running',
    startTime: '2026-03-13 10:15',
    progress: 50,
    priority: 'medium',
  },
  {
    id: 'INS-003',
    templateName: '物流发货审批',
    initiator: '王芳',
    currentStep: '已完成',
    status: 'completed',
    startTime: '2026-03-13 08:00',
    progress: 100,
    priority: 'high',
  },
  {
    id: 'INS-004',
    templateName: '合同会签审批',
    initiator: '赵强',
    currentStep: '法务审核',
    status: 'running',
    startTime: '2026-03-12 16:00',
    progress: 30,
    priority: 'medium',
  },
  {
    id: 'INS-005',
    templateName: '废金属采购审批',
    initiator: '刘洋',
    currentStep: '价格审核',
    status: 'paused',
    startTime: '2026-03-12 14:00',
    progress: 40,
    priority: 'low',
  },
  {
    id: 'INS-006',
    templateName: '新员工入职',
    initiator: 'HR部',
    currentStep: '已拒绝',
    status: 'rejected',
    startTime: '2026-03-11 09:00',
    progress: 25,
    priority: 'low',
  },
  {
    id: 'INS-007',
    templateName: '费用报销审批',
    initiator: '陈静',
    currentStep: '部门主管审批',
    status: 'timeout',
    startTime: '2026-03-10 11:00',
    progress: 25,
    priority: 'high',
  },
  {
    id: 'INS-008',
    templateName: '物流发货审批',
    initiator: '周鹏',
    currentStep: '运输安排',
    status: 'running',
    startTime: '2026-03-13 07:45',
    progress: 75,
    priority: 'medium',
  },
];

const ANALYTICS_TREND = [
  { month: '10月', completed: 85, rejected: 8, timeout: 5 },
  { month: '11月', completed: 92, rejected: 6, timeout: 3 },
  { month: '12月', completed: 78, rejected: 10, timeout: 8 },
  { month: '1月', completed: 95, rejected: 5, timeout: 4 },
  { month: '2月', completed: 88, rejected: 7, timeout: 6 },
  { month: '3月', completed: 102, rejected: 4, timeout: 3 },
];

const CATEGORY_PIE = [
  { name: '采购审批', value: 35, color: '#3b82f6' },
  { name: '财务报销', value: 28, color: '#22c55e' },
  { name: '物流发货', value: 18, color: '#f59e0b' },
  { name: '合同会签', value: 12, color: '#8b5cf6' },
  { name: '人事流程', value: 7, color: '#ef4444' },
];

export function WorkflowDesigner({ currentLanguage }: WorkflowDesignerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'templates' as TabType, label: { en: 'Templates', zh: '流程模板' }, icon: Layers },
    { id: 'instances' as TabType, label: { en: 'Instances', zh: '运行实例' }, icon: Play },
    { id: 'designer' as TabType, label: { en: 'Designer', zh: '流程设计' }, icon: GitBranch },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '流程分析' }, icon: BarChart3 },
  ];

  const categoryConf: Record<string, { label: string; color: string; icon: typeof DollarSign }> = {
    procurement: { label: isZh ? '采购' : 'Procurement', color: 'text-blue-400', icon: Package },
    finance: { label: isZh ? '财务' : 'Finance', color: 'text-green-400', icon: DollarSign },
    hr: { label: isZh ? '人事' : 'HR', color: 'text-pink-400', icon: Users },
    logistics: { label: isZh ? '物流' : 'Logistics', color: 'text-amber-400', icon: Package },
    general: { label: isZh ? '通用' : 'General', color: 'text-purple-400', icon: FileText },
  };

  const stepTypeConf: Record<string, { label: string; color: string; bg: string }> = {
    start: { label: isZh ? '开始' : 'Start', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    approval: { label: isZh ? '审批' : 'Approve', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    condition: {
      label: isZh ? '条件' : 'Condition',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
    },
    action: { label: isZh ? '执行' : 'Action', color: 'text-purple-400', bg: 'bg-purple-500/20' },
    notification: { label: isZh ? '通知' : 'Notify', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
    end: { label: isZh ? '结束' : 'End', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  };

  const statusConf: Record<
    string,
    { label: string; color: string; bg: string; icon: typeof CheckCircle2 }
  > = {
    running: {
      label: isZh ? '运行中' : 'Running',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      icon: Play,
    },
    completed: {
      label: isZh ? '已完成' : 'Done',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      icon: CheckCircle2,
    },
    rejected: {
      label: isZh ? '已拒绝' : 'Rejected',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      icon: XCircle,
    },
    paused: {
      label: isZh ? '已暂停' : 'Paused',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      icon: Pause,
    },
    timeout: {
      label: isZh ? '已超时' : 'Timeout',
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
      icon: Clock,
    },
  };

  const runningCount = WORKFLOW_INSTANCES.filter((i) => i.status === 'running').length;
  const totalTemplates = WORKFLOW_TEMPLATES.filter((t) => t.status === 'active').length;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-orange-500/20">
            <Workflow className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '流程管理' : 'Workflow Management'}</span>
              <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? '可视化流程设计与智能审批引擎'
                : 'Visual workflow designer & smart approval engine'}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-xl border border-orange-500/30 hover:from-orange-500/30 hover:to-red-500/30 transition-all text-sm">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '新建流程' : 'New Workflow'}</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '活跃模板' : 'Active Templates',
            value: totalTemplates.toString(),
            icon: Layers,
            gradient: 'from-orange-500 to-red-500',
            sub: isZh ? '5类业务流程' : '5 categories',
          },
          {
            label: isZh ? '运行中实例' : 'Running',
            value: runningCount.toString(),
            icon: Play,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '需关注处理' : 'Need attention',
          },
          {
            label: isZh ? '本月完成' : 'Completed(M)',
            value: '102',
            icon: CheckCircle2,
            gradient: 'from-emerald-500 to-green-500',
            sub: '+16% MoM',
          },
          {
            label: isZh ? '平均审批时效' : 'Avg. Duration',
            value: isZh ? '15.2h' : '15.2h',
            icon: Clock,
            gradient: 'from-purple-500 to-pink-500',
            sub: '-22% MoM',
          },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 hover:border-orange-500/20 transition-all"
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
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          {WORKFLOW_TEMPLATES.map((template) => {
            const cc = categoryConf[template.category];
            const CatIcon = cc.icon;
            const isExpanded = selectedTemplate === template.id;
            return (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(isExpanded ? null : template.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${
                  isExpanded
                    ? 'border-orange-500/30 shadow-lg shadow-orange-500/5'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center">
                        <CatIcon className={`w-5 h-5 ${cc.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white">{template.name}</h4>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full bg-slate-700/50 ${cc.color}`}
                          >
                            {cc.label}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                            {template.steps.length}
                            {isZh ? '步' : ' steps'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{template.completionRate}%</p>
                      <p className="text-xs text-gray-500">{isZh ? '完成率' : 'Completion'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs text-gray-500">
                    <span>
                      {isZh ? '运行次数' : 'Runs'}:{' '}
                      <span className="text-white">{template.instanceCount}</span>
                    </span>
                    <span>
                      {isZh ? '平均时长' : 'Avg.'}:{' '}
                      <span className="text-white">{template.avgDuration}</span>
                    </span>
                    <span>
                      {isZh ? '更新' : 'Updated'}: {template.updatedAt}
                    </span>
                  </div>
                </div>

                {/* Expanded: Flow Steps */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <p className="text-xs text-gray-500 mb-3">
                      {isZh ? '流程步骤可视化' : 'Workflow Steps'}
                    </p>
                    <div className="flex items-center flex-wrap gap-2">
                      {template.steps.map((step, si) => {
                        const sc = stepTypeConf[step.type];
                        return (
                          <React.Fragment key={step.id}>
                            <div
                              className={`px-3 py-2 rounded-xl ${sc.bg} border border-white/5 min-w-[100px]`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${sc.color === 'text-emerald-400' ? 'bg-emerald-400' : sc.color === 'text-blue-400' ? 'bg-blue-400' : sc.color === 'text-amber-400' ? 'bg-amber-400' : sc.color === 'text-purple-400' ? 'bg-purple-400' : sc.color === 'text-cyan-400' ? 'bg-cyan-400' : 'bg-gray-400'}`}
                                />
                                <span className={`text-xs ${sc.color}`}>{sc.label}</span>
                              </div>
                              <p className="text-sm text-white">{step.name}</p>
                              {step.assignee && (
                                <p className="text-xs text-gray-500 mt-0.5">{step.assignee}</p>
                              )}
                              {step.sla && (
                                <p className="text-xs text-amber-400/70 mt-0.5">SLA: {step.sla}</p>
                              )}
                            </div>
                            {si < template.steps.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Running Instances Tab */}
      {activeTab === 'instances' && (
        <div className="space-y-3">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '实例' : 'Instance'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '流程' : 'Workflow'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '发起人' : 'Initiator'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '当前节点' : 'Current Step'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? '进度' : 'Progress'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? '状态' : 'Status'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? '优先级' : 'Priority'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {WORKFLOW_INSTANCES.map((inst) => {
                    const sc = statusConf[inst.status];
                    const StatusIcon = sc.icon;
                    const priorityConf = {
                      high: {
                        label: isZh ? '高' : 'High',
                        color: 'text-red-400',
                        bg: 'bg-red-500/20',
                      },
                      medium: {
                        label: isZh ? '中' : 'Med',
                        color: 'text-amber-400',
                        bg: 'bg-amber-500/20',
                      },
                      low: {
                        label: isZh ? '低' : 'Low',
                        color: 'text-gray-400',
                        bg: 'bg-gray-500/20',
                      },
                    };
                    const pc = priorityConf[inst.priority];
                    return (
                      <tr key={inst.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-3 px-4 text-xs text-gray-400">{inst.id}</td>
                        <td className="py-3 px-4 text-sm text-white">{inst.templateName}</td>
                        <td className="py-3 px-4 text-sm text-gray-300">{inst.initiator}</td>
                        <td className="py-3 px-4 text-sm text-gray-300">{inst.currentStep}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${inst.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                style={{ width: `${inst.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{inst.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center space-x-1 text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span>{sc.label}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${pc.bg} ${pc.color}`}>
                            {pc.label}
                          </span>
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

      {/* Designer Tab */}
      {activeTab === 'designer' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white flex items-center space-x-2">
                <Brain className="w-5 h-5 text-orange-400" />
                <span>{isZh ? 'AI流程设计器' : 'AI Workflow Designer'}</span>
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 text-xs">
                  {isZh ? '保存草稿' : 'Save Draft'}
                </button>
                <button className="px-3 py-1.5 bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 text-xs">
                  {isZh ? '发布' : 'Publish'}
                </button>
              </div>
            </div>

            {/* Node Palette */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-3">
                {isZh ? '拖拽节点到画布' : 'Drag nodes to canvas'}
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stepTypeConf).map(([type, conf]) => (
                  <div
                    key={type}
                    className={`${conf.bg} border border-white/5 rounded-xl px-4 py-2.5 cursor-grab hover:border-white/15 transition-all`}
                  >
                    <span className={`text-sm ${conf.color}`}>{conf.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas Placeholder */}
            <div className="h-80 bg-slate-900/40 rounded-xl border border-dashed border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Workflow className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">
                  {isZh ? '拖拽节点到此处开始设计流程' : 'Drag nodes here to start designing'}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {isZh
                    ? '支持审批、条件分支、并行、子流程等'
                    : 'Supports approval, conditions, parallel, sub-flows'}
                </p>
                <button className="mt-4 px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 text-sm hover:bg-orange-500/30 transition-all">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  {isZh ? 'AI智能生成流程' : 'AI Generate Workflow'}
                </button>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/5 border border-orange-500/15">
              <div className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-orange-400 mb-1">
                    AI {isZh ? '设计建议' : 'Design Tips'}
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>
                      •{' '}
                      {isZh
                        ? '采购金额>50万建议增加总经理审批节点'
                        : 'Add GM approval for procurement >¥500K'}
                    </li>
                    <li>
                      •{' '}
                      {isZh
                        ? '建议为关键审批节点设置SLA时限和超时升级机制'
                        : 'Set SLA and escalation for critical approval nodes'}
                    </li>
                    <li>
                      •{' '}
                      {isZh
                        ? '可添加并行分支让法务和财务同时审核以缩短流程时间'
                        : 'Add parallel branch for legal & finance to shorten process'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '月度流程执行趋势' : 'Monthly Workflow Trend'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={ANALYTICS_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
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
                      dataKey="completed"
                      fill="#22c55e"
                      name={isZh ? '完成' : 'Completed'}
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="rejected"
                      fill="#ef4444"
                      name={isZh ? '拒绝' : 'Rejected'}
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="timeout"
                      fill="#f59e0b"
                      name={isZh ? '超时' : 'Timeout'}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '流程类型分布' : 'Workflow Category'}</h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={CATEGORY_PIE}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {CATEGORY_PIE.map((entry, i) => (
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
                <div className="w-1/2 space-y-3">
                  {CATEGORY_PIE.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottleneck Analysis */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-orange-400" />
              <span>{isZh ? 'AI瓶颈分析' : 'AI Bottleneck Analysis'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  node: isZh ? '总经理审批' : 'GM Approval',
                  avgWait: '6.8h',
                  instances: 23,
                  suggestion: isZh
                    ? '建议对<20万的订单授权采购总监直接审批'
                    : 'Delegate <¥200K to procurement director',
                },
                {
                  node: isZh ? '法务审核' : 'Legal Review',
                  avgWait: '18.2h',
                  instances: 15,
                  suggestion: isZh
                    ? '建议增加法务助理分流标准合同审核'
                    : 'Add legal assistant for standard contracts',
                },
                {
                  node: isZh ? '财务审核' : 'Finance Check',
                  avgWait: '5.5h',
                  instances: 38,
                  suggestion: isZh
                    ? '建议AI预审自动通过低风险报销单'
                    : 'AI pre-approve low-risk reimbursements',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">{item.node}</span>
                    <span className="text-xs text-amber-400">
                      {isZh ? '平均等待' : 'Avg.'}: {item.avgWait}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {isZh ? '积压' : 'Pending'}: {item.instances} {isZh ? '个实例' : 'instances'}
                  </p>
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/15">
                    <p className="text-xs text-orange-300">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      {item.suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
