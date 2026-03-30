import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  User,
  Calendar,
  Tag,
  MoreVertical,
  Play,
  Pause,
  RotateCcw,
  Filter,
  BarChart3,
  ArrowUpRight,
  Timer,
  Zap,
  Users,
  Wrench
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
  Cell
} from 'recharts';

interface WorkOrdersProps {
  currentLanguage: string;
}

type WOStatus = 'pending' | 'in-progress' | 'review' | 'completed' | 'cancelled';
type WOPriority = 'urgent' | 'high' | 'medium' | 'low';
type TabType = 'board' | 'list' | 'stats';

interface WorkOrder {
  id: string;
  title: { en: string; zh: string };
  description: string;
  status: WOStatus;
  priority: WOPriority;
  assignee: string;
  department: string;
  createdAt: string;
  dueDate: string;
  completedAt?: string;
  tags: string[];
  progress: number;
}

const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'WO-2026-001', title: { en: 'Copper Wire Sorting', zh: '废铜线分拣任务' },
    description: '对入库的3批废铜线进行质量分拣', status: 'in-progress', priority: 'high',
    assignee: '李强', department: '仓储部', createdAt: '2026-03-10',
    dueDate: '2026-03-14', tags: ['分拣', '铜'], progress: 65
  },
  {
    id: 'WO-2026-002', title: { en: 'Steel Scrap Weighing', zh: '废钢过磅复核' },
    description: '对第7批次废钢HMS进行过磅复核', status: 'pending', priority: 'urgent',
    assignee: '王刚', department: '质检部', createdAt: '2026-03-12',
    dueDate: '2026-03-13', tags: ['过磅', '钢铁', '紧急'], progress: 0
  },
  {
    id: 'WO-2026-003', title: { en: 'Warehouse Zone Reorganization', zh: '仓库分区整理' },
    description: 'A区铝合金区域重新规划和整理', status: 'in-progress', priority: 'medium',
    assignee: '张华', department: '仓储部', createdAt: '2026-03-08',
    dueDate: '2026-03-15', tags: ['仓库', '铝合金'], progress: 40
  },
  {
    id: 'WO-2026-004', title: { en: 'Equipment Maintenance', zh: '叉车年检保养' },
    description: '3号叉车年度检修和保养', status: 'review', priority: 'medium',
    assignee: '赵明', department: '设备部', createdAt: '2026-03-05',
    dueDate: '2026-03-12', tags: ['设备', '维保'], progress: 90
  },
  {
    id: 'WO-2026-005', title: { en: 'Quality Inspection Report', zh: '出口批次质检报告' },
    description: '编制印尼客户废铜出口批次质检报告', status: 'in-progress', priority: 'high',
    assignee: '孙丽', department: '质检部', createdAt: '2026-03-11',
    dueDate: '2026-03-14', tags: ['质检', '出口', '铜'], progress: 55
  },
  {
    id: 'WO-2026-006', title: { en: 'Inventory Reconciliation', zh: '月度库存盘点' },
    description: '3月份月度库存盘点任务', status: 'pending', priority: 'high',
    assignee: '陈芳', department: '仓储部', createdAt: '2026-03-12',
    dueDate: '2026-03-15', tags: ['盘点', '月度'], progress: 0
  },
  {
    id: 'WO-2026-007', title: { en: 'Safety Inspection', zh: '消防安全检查' },
    description: '季度消防安全设施检查', status: 'completed', priority: 'medium',
    assignee: '刘洋', department: '安全部', createdAt: '2026-03-01',
    dueDate: '2026-03-10', completedAt: '2026-03-09', tags: ['安全', '季度'], progress: 100
  },
  {
    id: 'WO-2026-008', title: { en: 'Shipping Document Prep', zh: '装船文件准备' },
    description: '韩国客户订单装船单据准备', status: 'completed', priority: 'urgent',
    assignee: '李娜', department: '物流部', createdAt: '2026-03-09',
    dueDate: '2026-03-11', completedAt: '2026-03-11', tags: ['物流', '出口', '韩国'], progress: 100
  },
];

const STATUS_CONFIG: Record<WOStatus, { label: { en: string; zh: string }; color: string; bg: string; icon: React.ElementType }> = {
  pending: { label: { en: 'Pending', zh: '待处理' }, color: 'text-gray-400', bg: 'bg-gray-500/20', icon: Clock },
  'in-progress': { label: { en: 'In Progress', zh: '进行中' }, color: 'text-blue-400', bg: 'bg-blue-500/20', icon: Play },
  review: { label: { en: 'Review', zh: '审核中' }, color: 'text-amber-400', bg: 'bg-amber-500/20', icon: AlertTriangle },
  completed: { label: { en: 'Completed', zh: '已完成' }, color: 'text-emerald-400', bg: 'bg-emerald-500/20', icon: CheckCircle2 },
  cancelled: { label: { en: 'Cancelled', zh: '已取消' }, color: 'text-red-400', bg: 'bg-red-500/20', icon: XCircle },
};

const PRIORITY_CONFIG: Record<WOPriority, { label: { en: string; zh: string }; color: string; dot: string }> = {
  urgent: { label: { en: 'Urgent', zh: '紧急' }, color: 'text-red-400', dot: 'bg-red-400' },
  high: { label: { en: 'High', zh: '高' }, color: 'text-orange-400', dot: 'bg-orange-400' },
  medium: { label: { en: 'Medium', zh: '中' }, color: 'text-amber-400', dot: 'bg-amber-400' },
  low: { label: { en: 'Low', zh: '低' }, color: 'text-gray-400', dot: 'bg-gray-400' },
};

const WO_BY_DEPT_DATA = [
  { dept: '仓储部', count: 12 },
  { dept: '质检部', count: 8 },
  { dept: '物流部', count: 6 },
  { dept: '设备部', count: 4 },
  { dept: '安全部', count: 3 },
];

const WO_STATUS_PIE = [
  { name: '待处理', value: 15, color: '#6b7280' },
  { name: '进行中', value: 22, color: '#3b82f6' },
  { name: '审核中', value: 8, color: '#f59e0b' },
  { name: '已完成', value: 35, color: '#10b981' },
  { name: '已取消', value: 3, color: '#ef4444' },
];

export function WorkOrders({ currentLanguage }: WorkOrdersProps) {
  const [activeTab, setActiveTab] = useState<TabType>('board');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<WOPriority | 'all'>('all');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'board' as TabType, label: { en: 'Kanban', zh: '看板' }, icon: ClipboardList },
    { id: 'list' as TabType, label: { en: 'List', zh: '列表' }, icon: Filter },
    { id: 'stats' as TabType, label: { en: 'Statistics', zh: '统计' }, icon: BarChart3 },
  ];

  const boardColumns: WOStatus[] = ['pending', 'in-progress', 'review', 'completed'];

  const filteredOrders = MOCK_WORK_ORDERS.filter(wo => {
    const matchSearch = searchTerm === '' ||
      wo.title.zh.includes(searchTerm) ||
      wo.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPriority = priorityFilter === 'all' || wo.priority === priorityFilter;
    return matchSearch && matchPriority;
  });

  const stats = {
    total: MOCK_WORK_ORDERS.length,
    pending: MOCK_WORK_ORDERS.filter(w => w.status === 'pending').length,
    overdue: MOCK_WORK_ORDERS.filter(w => {
      if (w.status === 'completed' || w.status === 'cancelled') return false;
      return new Date(w.dueDate) < new Date('2026-03-13');
    }).length,
    completionRate: Math.round(MOCK_WORK_ORDERS.filter(w => w.status === 'completed').length / MOCK_WORK_ORDERS.length * 100),
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-pink-500/20">
            <ClipboardList className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '工单管理' : 'Work Orders'}</h1>
            <p className="text-sm text-gray-400">{isZh ? '任务分派与执行反馈' : 'Task assignment and execution feedback'}</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-500/25">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '新建工单' : 'New Work Order'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '总工单' : 'Total', value: stats.total, icon: ClipboardList, gradient: 'from-blue-500 to-cyan-500' },
          { label: isZh ? '待处理' : 'Pending', value: stats.pending, icon: Clock, gradient: 'from-gray-500 to-slate-500' },
          { label: isZh ? '已逾期' : 'Overdue', value: stats.overdue, icon: AlertTriangle, gradient: 'from-red-500 to-rose-500' },
          { label: isZh ? '完成率' : 'Completion', value: `${stats.completionRate}%`, icon: CheckCircle2, gradient: 'from-emerald-500 to-green-500' },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div key={idx} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-2xl text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}>
                  <StatIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-white border border-pink-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Kanban Board */}
      {activeTab === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {boardColumns.map(status => {
            const config = STATUS_CONFIG[status];
            const StatusIcon = config.icon;
            const columnOrders = MOCK_WORK_ORDERS.filter(wo => wo.status === status);

            return (
              <div key={status} className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-xl ${config.bg} border border-white/5`}>
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`w-4 h-4 ${config.color}`} />
                    <span className={`text-sm ${config.color}`}>{isZh ? config.label.zh : config.label.en}</span>
                  </div>
                  <span className="text-xs bg-slate-900/50 text-gray-400 px-2 py-0.5 rounded-full">{columnOrders.length}</span>
                </div>

                {columnOrders.map(wo => {
                  const prioConf = PRIORITY_CONFIG[wo.priority];
                  return (
                    <div key={wo.id} className="bg-slate-800/60 backdrop-blur-xl rounded-xl border border-white/5 p-4 hover:border-white/10 transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${prioConf.dot}`} />
                          <span className="text-xs text-gray-500">{wo.id}</span>
                        </div>
                        <span className={`text-xs ${prioConf.color}`}>
                          {isZh ? prioConf.label.zh : prioConf.label.en}
                        </span>
                      </div>
                      <p className="text-sm text-white mb-2">{isZh ? wo.title.zh : wo.title.en}</p>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{wo.description}</p>

                      {/* Progress */}
                      {wo.progress > 0 && wo.progress < 100 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-500">{isZh ? '进度' : 'Progress'}</span>
                            <span className="text-white">{wo.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
                              style={{ width: `${wo.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{wo.assignee}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{wo.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-1.5 flex-wrap mt-3">
                        {wo.tags.map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-slate-700/50 text-gray-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={isZh ? '搜索工单...' : 'Search work orders...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'urgent', 'high', 'medium', 'low'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-2 rounded-lg text-xs transition-all ${
                    priorityFilter === p
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      : 'bg-slate-800/40 text-gray-400 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {p === 'all' ? (isZh ? '全部' : 'All') : (isZh ? PRIORITY_CONFIG[p].label.zh : PRIORITY_CONFIG[p].label.en)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredOrders.map(wo => {
              const statusConf = STATUS_CONFIG[wo.status];
              const prioConf = PRIORITY_CONFIG[wo.priority];
              const StatusIcon = statusConf.icon;

              return (
                <div key={wo.id} className="bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5 p-4 hover:border-white/10 transition-all flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg ${statusConf.bg} flex items-center justify-center flex-shrink-0`}>
                    <StatusIcon className={`w-5 h-5 ${statusConf.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-white truncate">{isZh ? wo.title.zh : wo.title.en}</span>
                      <div className={`w-2 h-2 rounded-full ${prioConf.dot} flex-shrink-0`} />
                      <span className={`text-xs ${prioConf.color} flex-shrink-0`}>{isZh ? prioConf.label.zh : prioConf.label.en}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{wo.id}</span>
                      <span className="text-xs text-gray-500">{wo.assignee}</span>
                      <span className="text-xs text-gray-500">{wo.department}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right hidden md:block">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusConf.bg} ${statusConf.color}`}>
                      {isZh ? statusConf.label.zh : statusConf.label.en}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{isZh ? '截止: ' : 'Due: '}{wo.dueDate}</p>
                  </div>
                  {wo.progress > 0 && wo.progress < 100 && (
                    <div className="w-20 flex-shrink-0 hidden lg:block">
                      <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: `${wo.progress}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-1">{wo.progress}%</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* By Department */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '各部门工单量' : 'Work Orders by Department'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={WO_BY_DEPT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="dept" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="count" fill="#f43f5e" radius={[6, 6, 0, 0]} name={isZh ? '工单数' : 'Count'} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '工单状态分布' : 'Status Distribution'}</h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie data={WO_STATUS_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                        {WO_STATUS_PIE.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-3">
                  {WO_STATUS_PIE.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
