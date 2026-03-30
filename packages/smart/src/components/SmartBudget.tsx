import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PieChart as PieChartIcon,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Building2,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronRight,
  Layers,
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

interface SmartBudgetProps {
  currentLanguage: string;
}

type TabType = 'overview' | 'department' | 'project' | 'execution';

interface DeptBudget {
  id: string;
  name: string;
  total: number;
  used: number;
  committed: number;
  remaining: number;
  ytdBudget: number;
  ytdActual: number;
  children?: { name: string; total: number; used: number }[];
}

interface ProjectBudget {
  id: string;
  name: string;
  manager: string;
  total: number;
  used: number;
  status: 'on-track' | 'warning' | 'over-budget';
  startDate: string;
  endDate: string;
  category: string;
}

const DEPT_BUDGETS: DeptBudget[] = [
  {
    id: 'D01',
    name: '销售部',
    total: 5800000,
    used: 2450000,
    committed: 680000,
    remaining: 2670000,
    ytdBudget: 1450000,
    ytdActual: 1380000,
    children: [
      { name: '市场推广', total: 2000000, used: 850000 },
      { name: '商务差旅', total: 1500000, used: 720000 },
      { name: '客户招待', total: 800000, used: 380000 },
      { name: '人员薪资', total: 1500000, used: 500000 },
    ],
  },
  {
    id: 'D02',
    name: '采购部',
    total: 42000000,
    used: 18500000,
    committed: 5200000,
    remaining: 18300000,
    ytdBudget: 10500000,
    ytdActual: 10200000,
    children: [
      { name: '原材料采购', total: 38000000, used: 16800000 },
      { name: '运营费用', total: 2000000, used: 850000 },
      { name: '人员薪资', total: 2000000, used: 850000 },
    ],
  },
  {
    id: 'D03',
    name: '物流部',
    total: 8500000,
    used: 4100000,
    committed: 1200000,
    remaining: 3200000,
    ytdBudget: 2125000,
    ytdActual: 2280000,
    children: [
      { name: '运输费用', total: 5000000, used: 2400000 },
      { name: '仓储费用', total: 2000000, used: 980000 },
      { name: '人员薪资', total: 1500000, used: 720000 },
    ],
  },
  {
    id: 'D04',
    name: '生产部',
    total: 15000000,
    used: 6200000,
    committed: 1800000,
    remaining: 7000000,
    ytdBudget: 3750000,
    ytdActual: 3520000,
    children: [
      { name: '设备维护', total: 3000000, used: 1200000 },
      { name: '能源费用', total: 4000000, used: 1800000 },
      { name: '耗材采购', total: 3000000, used: 1400000 },
      { name: '人员薪资', total: 5000000, used: 1800000 },
    ],
  },
  {
    id: 'D05',
    name: '财务部',
    total: 2200000,
    used: 820000,
    committed: 150000,
    remaining: 1230000,
    ytdBudget: 550000,
    ytdActual: 480000,
    children: [
      { name: '审计费用', total: 500000, used: 200000 },
      { name: '系统维护', total: 300000, used: 120000 },
      { name: '人员薪资', total: 1400000, used: 500000 },
    ],
  },
  {
    id: 'D06',
    name: '人力资源部',
    total: 3500000,
    used: 1580000,
    committed: 320000,
    remaining: 1600000,
    ytdBudget: 875000,
    ytdActual: 920000,
    children: [
      { name: '招聘费用', total: 800000, used: 380000 },
      { name: '培训费用', total: 600000, used: 250000 },
      { name: '员工福利', total: 700000, used: 450000 },
      { name: '人员薪资', total: 1400000, used: 500000 },
    ],
  },
  {
    id: 'D07',
    name: 'IT部门',
    total: 4000000,
    used: 1950000,
    committed: 600000,
    remaining: 1450000,
    ytdBudget: 1000000,
    ytdActual: 1120000,
    children: [
      { name: '软件许可', total: 1200000, used: 680000 },
      { name: '硬件采购', total: 1500000, used: 720000 },
      { name: '运维服务', total: 300000, used: 150000 },
      { name: '人员薪资', total: 1000000, used: 400000 },
    ],
  },
];

const PROJECT_BUDGETS: ProjectBudget[] = [
  {
    id: 'P01',
    name: '华东区域废铜回收基地建设',
    manager: '张伟',
    total: 12000000,
    used: 5800000,
    status: 'on-track',
    startDate: '2026-01',
    endDate: '2026-06',
    category: '基建投资',
  },
  {
    id: 'P02',
    name: '智能分拣系统升级项目',
    manager: '王强',
    total: 3500000,
    used: 2100000,
    status: 'warning',
    startDate: '2026-02',
    endDate: '2026-05',
    category: '技术升级',
  },
  {
    id: 'P03',
    name: '印尼铜矿供应链拓展',
    manager: '李娜',
    total: 8000000,
    used: 6800000,
    status: 'over-budget',
    startDate: '2025-11',
    endDate: '2026-04',
    category: '市场拓展',
  },
  {
    id: 'P04',
    name: 'ERP系统二期实施',
    manager: '赵磊',
    total: 2800000,
    used: 980000,
    status: 'on-track',
    startDate: '2026-03',
    endDate: '2026-08',
    category: '技术升级',
  },
  {
    id: 'P05',
    name: '年度品牌营销推广',
    manager: '陈芳',
    total: 5000000,
    used: 1650000,
    status: 'on-track',
    startDate: '2026-01',
    endDate: '2026-12',
    category: '品牌营销',
  },
  {
    id: 'P06',
    name: '新能源汽车拆解产线',
    manager: '刘洋',
    total: 18000000,
    used: 4200000,
    status: 'on-track',
    startDate: '2026-01',
    endDate: '2026-09',
    category: '基建投资',
  },
];

const MONTHLY_EXEC_DATA = [
  { month: '1月', budget: 680, actual: 650 },
  { month: '2月', budget: 720, actual: 695 },
  { month: '3月', budget: 750, actual: 780 },
  { month: '4月', budget: 760, actual: 0 },
  { month: '5月', budget: 800, actual: 0 },
  { month: '6月', budget: 820, actual: 0 },
];

const CATEGORY_PIE = [
  { name: '原材料采购', value: 52, color: '#3b82f6' },
  { name: '运营费用', value: 18, color: '#8b5cf6' },
  { name: '人员薪资', value: 15, color: '#22c55e' },
  { name: '资本支出', value: 10, color: '#f59e0b' },
  { name: '其他', value: 5, color: '#6b7280' },
];

const QUARTERLY_COMPARE = [
  { quarter: 'Q1', budget: 2025, actual: 2125 },
  { quarter: 'Q2', budget: 2280, actual: 0 },
  { quarter: 'Q3', budget: 2400, actual: 0 },
  { quarter: 'Q4', budget: 2095, actual: 0 },
];

export function SmartBudget({ currentLanguage }: SmartBudgetProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'overview' as TabType, label: { en: 'Overview', zh: '预算总览' }, icon: BarChart3 },
    { id: 'department' as TabType, label: { en: 'Department', zh: '部门预算' }, icon: Building2 },
    { id: 'project' as TabType, label: { en: 'Project', zh: '项目预算' }, icon: Briefcase },
    { id: 'execution' as TabType, label: { en: 'Execution', zh: '执行分析' }, icon: Target },
  ];

  const totalBudget = DEPT_BUDGETS.reduce((s, d) => s + d.total, 0);
  const totalUsed = DEPT_BUDGETS.reduce((s, d) => s + d.used, 0);
  const totalCommitted = DEPT_BUDGETS.reduce((s, d) => s + d.committed, 0);
  const overallRate = ((totalUsed / totalBudget) * 100).toFixed(1);
  const fmtM = (v: number) => (v >= 10000 ? `${(v / 10000).toFixed(0)}万` : v.toLocaleString());
  const fmtMoney = (v: number) => `¥${fmtM(v)}`;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20">
          <BarChart3 className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl text-white">{isZh ? '智能预算' : 'Smart Budget'}</h1>
          <p className="text-sm text-gray-400">
            {isZh ? '预算编制与执行监控' : 'Budget planning & execution monitoring'}
          </p>
        </div>
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
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: isZh ? '年度总预算' : 'Annual Budget',
                value: fmtMoney(totalBudget),
                icon: DollarSign,
                gradient: 'from-blue-500 to-cyan-500',
                sub: '2026',
              },
              {
                label: isZh ? '已执行金额' : 'Spent',
                value: fmtMoney(totalUsed),
                icon: TrendingUp,
                gradient: 'from-emerald-500 to-green-500',
                sub: `${overallRate}%`,
              },
              {
                label: isZh ? '已承诺金额' : 'Committed',
                value: fmtMoney(totalCommitted),
                icon: Clock,
                gradient: 'from-amber-500 to-orange-500',
                sub: `${((totalCommitted / totalBudget) * 100).toFixed(1)}%`,
              },
              {
                label: isZh ? '剩余可用' : 'Remaining',
                value: fmtMoney(totalBudget - totalUsed - totalCommitted),
                icon: Target,
                gradient: 'from-purple-500 to-pink-500',
                sub: `${(((totalBudget - totalUsed - totalCommitted) / totalBudget) * 100).toFixed(1)}%`,
              },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl text-white mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}
                    >
                      <StatIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Budget Gauge - visual representation */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '预算使用概况' : 'Budget Usage Overview'}</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>
                  {isZh ? '已执行' : 'Spent'} ({overallRate}%)
                </span>
                <span>
                  {isZh ? '已承诺' : 'Committed'} (
                  {((totalCommitted / totalBudget) * 100).toFixed(1)}%)
                </span>
                <span>{isZh ? '剩余' : 'Remaining'}</span>
              </div>
              <div className="h-6 bg-slate-700/40 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  style={{ width: `${(totalUsed / totalBudget) * 100}%` }}
                />
                <div
                  className="h-full bg-amber-500/60"
                  style={{ width: `${(totalCommitted / totalBudget) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '月度预算 vs 实际（万元）' : 'Monthly Budget vs Actual (10K ¥)'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={MONTHLY_EXEC_DATA}>
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
                      dataKey="budget"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      name={isZh ? '预算' : 'Budget'}
                    />
                    <Bar
                      dataKey="actual"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                      name={isZh ? '实际' : 'Actual'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '预算支出类型分布' : 'Budget Category Distribution'}
              </h3>
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
        </div>
      )}

      {/* Department Budget Tab */}
      {activeTab === 'department' && (
        <div className="space-y-3">
          {DEPT_BUDGETS.map((dept) => {
            const usedPct = Math.round((dept.used / dept.total) * 100);
            const committedPct = Math.round((dept.committed / dept.total) * 100);
            const isExpanded = expandedDept === dept.id;
            const ytdDiff = dept.ytdActual - dept.ytdBudget;

            return (
              <div
                key={dept.id}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all ${isExpanded ? 'border-blue-500/30' : 'border-white/5 hover:border-white/10'}`}
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedDept(isExpanded ? null : dept.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                      <h4 className="text-white">{dept.name}</h4>
                      {usedPct + committedPct > 90 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                          {isZh ? '预警' : 'Alert'}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{fmtMoney(dept.total)}</p>
                      <p className={`text-xs ${ytdDiff > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        YTD {ytdDiff > 0 ? '+' : ''}
                        {fmtM(ytdDiff)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '已执行' : 'Spent'}</p>
                      <p className="text-white">{fmtMoney(dept.used)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '已承诺' : 'Committed'}</p>
                      <p className="text-white">{fmtMoney(dept.committed)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '剩余' : 'Remaining'}</p>
                      <p className="text-white">{fmtMoney(dept.remaining)}</p>
                    </div>
                  </div>

                  <div className="h-2 bg-slate-700/40 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500" style={{ width: `${usedPct}%` }} />
                    <div className="h-full bg-amber-500/60" style={{ width: `${committedPct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>
                      {isZh ? '已用' : 'Used'} {usedPct}%
                    </span>
                    <span>
                      {isZh ? '承诺' : 'Committed'} {committedPct}%
                    </span>
                  </div>
                </div>

                {isExpanded && dept.children && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-2">
                    {dept.children.map((child, ci) => {
                      const childPct = Math.round((child.used / child.total) * 100);
                      return (
                        <div
                          key={ci}
                          className="flex items-center space-x-4 p-3 rounded-xl bg-slate-900/40"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-300">{child.name}</span>
                              <span className="text-xs text-gray-400">
                                {fmtMoney(child.used)} / {fmtMoney(child.total)}
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${childPct > 80 ? 'bg-red-500' : childPct > 60 ? 'bg-amber-500' : 'bg-blue-500'}`}
                                style={{ width: `${childPct}%` }}
                              />
                            </div>
                          </div>
                          <span
                            className={`text-xs w-10 text-right ${childPct > 80 ? 'text-red-400' : 'text-gray-400'}`}
                          >
                            {childPct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Project Budget Tab */}
      {activeTab === 'project' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              {isZh
                ? `共 ${PROJECT_BUDGETS.length} 个项目预算`
                : `${PROJECT_BUDGETS.length} project budgets`}
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm">
              <Plus className="w-4 h-4" />
              <span>{isZh ? '新建项目预算' : 'New Budget'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECT_BUDGETS.map((proj) => {
              const usedPct = Math.round((proj.used / proj.total) * 100);
              const statusConf = {
                'on-track': {
                  label: isZh ? '正常' : 'On Track',
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/20',
                },
                warning: {
                  label: isZh ? '预警' : 'Warning',
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/20',
                },
                'over-budget': {
                  label: isZh ? '超支' : 'Over Budget',
                  color: 'text-red-400',
                  bg: 'bg-red-500/20',
                },
              }[proj.status];

              return (
                <div
                  key={proj.id}
                  className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 hover:border-white/10 transition-all ${
                    proj.status === 'over-budget' ? 'border-red-500/20' : 'border-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white">{proj.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {proj.category} · {proj.manager} · {proj.startDate} ~ {proj.endDate}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${statusConf.bg} ${statusConf.color}`}
                    >
                      {statusConf.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '总预算' : 'Total'}</p>
                      <p className="text-sm text-white">{fmtMoney(proj.total)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '已执行' : 'Spent'}</p>
                      <p className="text-sm text-white">{fmtMoney(proj.used)}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{isZh ? '执行进度' : 'Execution'}</span>
                      <span className={`${usedPct > 85 ? 'text-red-400' : 'text-white'}`}>
                        {usedPct}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700/40 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${usedPct > 85 ? 'bg-red-500' : usedPct > 60 ? 'bg-amber-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(usedPct, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Execution Analysis Tab */}
      {activeTab === 'execution' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '季度预算执行对比（万元）' : 'Quarterly Budget Execution (10K ¥)'}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={QUARTERLY_COMPARE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="quarter"
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
                    dataKey="budget"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name={isZh ? '预算' : 'Budget'}
                  />
                  <Bar
                    dataKey="actual"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name={isZh ? '实际' : 'Actual'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Execution Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '预算执行率' : 'Execution Rate'}
                </span>
              </div>
              <p className="text-2xl text-white">{overallRate}%</p>
              <p className="text-xs text-gray-500 mt-1">
                {isZh ? '年度进度 25%（Q1）' : 'Annual progress 25% (Q1)'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '超支部门' : 'Over-budget Depts'}
                </span>
              </div>
              <p className="text-2xl text-white">2</p>
              <p className="text-xs text-red-400 mt-1">
                {isZh ? '物流部、IT部门' : 'Logistics, IT'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingDown className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '预算偏差率' : 'Variance Rate'}
                </span>
              </div>
              <p className="text-2xl text-white">4.8%</p>
              <p className="text-xs text-emerald-400 mt-1">
                {isZh ? '较去年-2.1%' : '-2.1% vs last year'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
