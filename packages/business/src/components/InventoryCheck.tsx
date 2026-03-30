import React, { useState } from 'react';
import {
  Clipboard,
  Brain,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
  Clock,
  Users,
  Package,
  Target,
  Activity,
  Eye,
  Camera,
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

interface InventoryCheckProps {
  currentLanguage: string;
}
type TabType = 'tasks' | 'results' | 'discrepancy' | 'analytics';

const CHECK_TASKS = [
  {
    id: 'IC-001',
    name: 'Q1废铜全量盘点',
    scope: 'A仓+B仓 废铜',
    method: 'AI+人工',
    status: 'completed',
    date: '2026-03-05',
    checker: '仓储组A+AI',
    items: 28,
    discrepancy: 0.8,
  },
  {
    id: 'IC-002',
    name: '3月废铝循环盘点',
    scope: 'B仓 废铝',
    method: 'AI视觉',
    status: 'in-progress',
    date: '2026-03-13',
    checker: 'AI系统',
    items: 15,
    discrepancy: 0,
  },
  {
    id: 'IC-003',
    name: '贵金属专项盘点',
    scope: '保险库 贵金属',
    method: '双人盲盘',
    status: 'scheduled',
    date: '2026-03-15',
    checker: '财务+仓储',
    items: 8,
    discrepancy: 0,
  },
  {
    id: 'IC-004',
    name: 'Q1废钢全量盘点',
    scope: 'C仓 废钢',
    method: 'AI+人工',
    status: 'completed',
    date: '2026-03-03',
    items: 12,
    checker: '仓储组B+AI',
    discrepancy: 1.2,
  },
];

const DISC_ITEMS = [
  {
    material: '废铜6#光亮线',
    bookQty: 412.5,
    actualQty: 409.2,
    diff: -3.3,
    diffRate: -0.8,
    reason: '称重误差累积+自然损耗',
    status: 'adjusted',
  },
  {
    material: '废铜3#火烧线',
    bookQty: 186.0,
    actualQty: 185.4,
    diff: -0.6,
    diffRate: -0.32,
    reason: '入库称重误差',
    status: 'adjusted',
  },
  {
    material: '废钢（Q235）',
    bookQty: 520.0,
    actualQty: 513.8,
    diff: -6.2,
    diffRate: -1.19,
    reason: '锈蚀损耗+称重系统偏差',
    status: 'investigating',
  },
  {
    material: '6061铝合金',
    bookQty: 98.5,
    actualQty: 99.1,
    diff: 0.6,
    diffRate: 0.61,
    reason: '入库多计',
    status: 'adjusted',
  },
];

const ACCURACY_MONTHLY = [
  { month: '10月', rate: 98.2 },
  { month: '11月', rate: 98.5 },
  { month: '12月', rate: 98.8 },
  { month: '1月', rate: 99.0 },
  { month: '2月', rate: 99.1 },
  { month: '3月', rate: 99.2 },
];

const METHOD_PIE = [
  { name: 'AI视觉盘点', value: 45, color: '#8b5cf6' },
  { name: 'AI+人工', value: 35, color: '#3b82f6' },
  { name: '双人盲盘', value: 15, color: '#f59e0b' },
  { name: '抽样盘点', value: 5, color: '#22c55e' },
];

export function InventoryCheck({ currentLanguage }: InventoryCheckProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const isZh = currentLanguage === 'zh';
  const tabs = [
    { id: 'tasks' as TabType, label: { en: 'Tasks', zh: '盘点任务' }, icon: Clipboard },
    { id: 'results' as TabType, label: { en: 'Results', zh: '盘点结果' }, icon: CheckCircle2 },
    {
      id: 'discrepancy' as TabType,
      label: { en: 'Discrepancy', zh: '差异处理' },
      icon: AlertTriangle,
    },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '盘点分析' }, icon: BarChart3 },
  ];
  const statusConf: Record<string, { label: string; color: string; bg: string }> = {
    completed: {
      label: isZh ? '已完成' : 'Done',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
    },
    'in-progress': {
      label: isZh ? '进行中' : 'Running',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
    },
    scheduled: {
      label: isZh ? '已排期' : 'Scheduled',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
    },
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-teal-500/20">
          <Clipboard className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl text-white flex items-center space-x-2">
            <span>{isZh ? '资产盘点' : 'Asset Inventory Check'}</span>
            <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
          </h1>
          <p className="text-sm text-gray-400">
            {isZh
              ? 'AI视觉盘点·差异分析·精准度追踪'
              : 'AI visual counting · Discrepancy analysis · Accuracy tracking'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '本月盘点' : 'This Month',
            value: CHECK_TASKS.length.toString(),
            icon: Clipboard,
            gradient: 'from-teal-500 to-cyan-500',
            sub: `${CHECK_TASKS.filter((t) => t.status === 'completed').length} ${isZh ? '已完成' : 'done'}`,
          },
          {
            label: isZh ? '盘点准确率' : 'Accuracy',
            value: '99.2%',
            icon: Target,
            gradient: 'from-emerald-500 to-green-500',
            sub: '+0.1% MoM',
          },
          {
            label: isZh ? '差异金额' : 'Discrepancy $',
            value: '¥6.2万',
            icon: AlertTriangle,
            gradient: 'from-amber-500 to-orange-500',
            sub: isZh ? '废钢待查' : 'Steel investigating',
          },
          {
            label: isZh ? 'AI盘点覆盖率' : 'AI Coverage',
            value: '80%',
            icon: Camera,
            gradient: 'from-purple-500 to-pink-500',
            sub: isZh ? '持续提升' : 'Improving',
          },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-2xl text-white mt-1">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} opacity-80 flex items-center justify-center`}
                >
                  <I className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map((tab) => {
          const T = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-white border border-teal-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {CHECK_TASKS.map((t) => {
            const sc = statusConf[t.status];
            return (
              <div
                key={t.id}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white text-sm">{t.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                        {sc.label}
                      </span>
                      <span className="text-xs text-gray-500">{t.method}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {isZh ? '范围' : 'Scope'}: {t.scope} · {t.checker} · {t.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">
                      {t.items} {isZh ? '品项' : 'items'}
                    </p>
                    {t.discrepancy > 0 && (
                      <p className="text-xs text-amber-400">
                        {isZh ? '差异' : 'Diff'} {t.discrepancy}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'results' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '盘点准确率趋势' : 'Accuracy Trend'}</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={ACCURACY_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  domain={[97, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15,23,42,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar
                  dataKey="rate"
                  fill="#14b8a6"
                  name={isZh ? '准确率%' : 'Accuracy%'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'discrepancy' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '物料' : 'Material'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '账面(t)' : 'Book(t)'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '实际(t)' : 'Actual(t)'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '差异(t)' : 'Diff(t)'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '差异率' : 'Rate'}
                  </th>
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '原因' : 'Reason'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '状态' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {DISC_ITEMS.map((d, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 ${d.status === 'investigating' ? 'bg-amber-500/[0.03]' : ''}`}
                  >
                    <td className="py-3 px-4 text-sm text-white">{d.material}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-300">{d.bookQty}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-300">{d.actualQty}</td>
                    <td
                      className={`py-3 px-4 text-center text-sm ${d.diff < 0 ? 'text-red-400' : 'text-emerald-400'}`}
                    >
                      {d.diff > 0 ? '+' : ''}
                      {d.diff}
                    </td>
                    <td
                      className={`py-3 px-4 text-center text-sm ${Math.abs(d.diffRate) > 1 ? 'text-red-400' : 'text-amber-400'}`}
                    >
                      {d.diffRate > 0 ? '+' : ''}
                      {d.diffRate}%
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">{d.reason}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${d.status === 'adjusted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}
                      >
                        {d.status === 'adjusted'
                          ? isZh
                            ? '已调账'
                            : 'Adjusted'
                          : isZh
                            ? '调查中'
                            : 'Investigating'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '盘点方式分布' : 'Check Method Distribution'}
            </h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={METHOD_PIE}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {METHOD_PIE.map((e, i) => (
                        <Cell key={i} fill={e.color} />
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
                {METHOD_PIE.map((e, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                      <span className="text-sm text-gray-300">{e.name}</span>
                    </div>
                    <span className="text-sm text-white">{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-teal-400" />
              <span>AI {isZh ? '盘点洞察' : 'Check Insights'}</span>
            </h3>
            <div className="space-y-3">
              {[
                isZh
                  ? '废钢差异率1.19%偏高，AI分析主因为锈蚀自然损耗(0.8%)和地磅称重系统偏差(0.4%)。建议校准地磅传感器并增设防雨棚减少锈蚀。'
                  : 'Steel discrepancy 1.19% high, mainly rust loss (0.8%) and weighbridge drift (0.4%). Calibrate sensors and add rain shelter.',
                isZh
                  ? 'AI视觉盘点覆盖率从上月75%提升至80%，新增铝合金品类识别。预计Q2可达90%覆盖，人工盘点工时可再减少40%。'
                  : 'AI visual check coverage up from 75% to 80%, added aluminum alloy recognition. Q2 target 90%, reducing manual hours by 40%.',
              ].map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/15">
                  <p className="text-xs text-teal-300">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
