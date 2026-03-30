import React, { useState } from 'react';
import {
  HardDrive,
  Brain,
  Sparkles,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  BarChart3,
  Activity,
  Thermometer,
  Zap,
  Eye,
  Calendar,
  TrendingUp,
  Package,
  Shield,
  Bell,
  ArrowUpRight,
  RefreshCw,
  Layers,
  Target,
  Gauge,
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

interface EquipmentManagerProps {
  currentLanguage: string;
}

type TabType = 'assets' | 'maintenance' | 'monitoring' | 'analytics';

interface Equipment {
  id: string;
  name: string;
  category: 'production' | 'logistics' | 'quality' | 'office';
  model: string;
  location: string;
  status: 'normal' | 'warning' | 'fault' | 'offline';
  healthScore: number;
  usageHours: number;
  totalHours: number;
  nextMaintenance: string;
  purchaseDate: string;
  value: number;
  depreciation: number;
}

interface MaintenanceRecord {
  id: string;
  equipment: string;
  type: 'preventive' | 'corrective' | 'predictive';
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  date: string;
  technician: string;
  cost: number;
  description: string;
}

const EQUIPMENT: Equipment[] = [
  {
    id: 'EQ-001',
    name: '智能分拣线A1',
    category: 'production',
    model: 'YC-Sort-3000',
    location: '1号车间',
    status: 'normal',
    healthScore: 92,
    usageHours: 12800,
    totalHours: 20000,
    nextMaintenance: '2026-03-20',
    purchaseDate: '2024-06-15',
    value: 280,
    depreciation: 56,
  },
  {
    id: 'EQ-002',
    name: '大型破碎机B1',
    category: 'production',
    model: 'SH-Crush-500',
    location: '2号车间',
    status: 'warning',
    healthScore: 68,
    usageHours: 15600,
    totalHours: 20000,
    nextMaintenance: '2026-03-15',
    purchaseDate: '2023-12-01',
    value: 180,
    depreciation: 72,
  },
  {
    id: 'EQ-003',
    name: '中频熔炼炉C1',
    category: 'production',
    model: 'MF-Melt-2000',
    location: '3号车间',
    status: 'normal',
    healthScore: 95,
    usageHours: 8200,
    totalHours: 25000,
    nextMaintenance: '2026-03-28',
    purchaseDate: '2025-03-20',
    value: 450,
    depreciation: 45,
  },
  {
    id: 'EQ-004',
    name: '液压打包机D1',
    category: 'production',
    model: 'HP-Pack-100',
    location: '4号车间',
    status: 'normal',
    healthScore: 88,
    usageHours: 9500,
    totalHours: 15000,
    nextMaintenance: '2026-04-10',
    purchaseDate: '2024-09-10',
    value: 85,
    depreciation: 17,
  },
  {
    id: 'EQ-005',
    name: '5吨叉车F1',
    category: 'logistics',
    model: 'FK-5T-EV',
    location: '仓库A',
    status: 'normal',
    healthScore: 90,
    usageHours: 6200,
    totalHours: 12000,
    nextMaintenance: '2026-04-01',
    purchaseDate: '2025-01-15',
    value: 35,
    depreciation: 7,
  },
  {
    id: 'EQ-006',
    name: 'AI视觉检测台',
    category: 'quality',
    model: 'AV-Inspect-X1',
    location: '质检区',
    status: 'normal',
    healthScore: 99,
    usageHours: 4500,
    totalHours: 30000,
    nextMaintenance: '2026-04-08',
    purchaseDate: '2025-08-20',
    value: 120,
    depreciation: 12,
  },
  {
    id: 'EQ-007',
    name: '地磅（50吨）',
    category: 'logistics',
    model: 'WB-50T',
    location: '入口',
    status: 'fault',
    healthScore: 35,
    usageHours: 18000,
    totalHours: 20000,
    nextMaintenance: '2026-03-13',
    purchaseDate: '2022-05-10',
    value: 25,
    depreciation: 15,
  },
  {
    id: 'EQ-008',
    name: '行车20吨',
    category: 'production',
    model: 'CR-20T',
    location: '1号车间',
    status: 'offline',
    healthScore: 0,
    usageHours: 0,
    totalHours: 20000,
    nextMaintenance: '-',
    purchaseDate: '2024-03-01',
    value: 95,
    depreciation: 19,
  },
];

const MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MR-001',
    equipment: '智能分拣线A2',
    type: 'preventive',
    status: 'in-progress',
    date: '2026-03-13',
    technician: '技术组A',
    cost: 8500,
    description: '传感器校准+传送带张力调整',
  },
  {
    id: 'MR-002',
    equipment: '大型破碎机B1',
    type: 'predictive',
    status: 'scheduled',
    date: '2026-03-15',
    technician: '技术组B',
    cost: 15200,
    description: 'AI预测刀片磨损>60%，提前更换',
  },
  {
    id: 'MR-003',
    equipment: '地磅（50吨）',
    type: 'corrective',
    status: 'overdue',
    date: '2026-03-13',
    technician: '外包商',
    cost: 3800,
    description: '称重传感器故障，紧急维修',
  },
  {
    id: 'MR-004',
    equipment: '液压打包机D1',
    type: 'preventive',
    status: 'completed',
    date: '2026-03-10',
    technician: '技术组A',
    cost: 4200,
    description: '液压油更换+密封件检查',
  },
  {
    id: 'MR-005',
    equipment: '5吨叉车F1',
    type: 'preventive',
    status: 'scheduled',
    date: '2026-04-01',
    technician: '技术组C',
    cost: 2800,
    description: '电池维护+轮胎检查',
  },
];

const STATUS_PIE = [
  { name: '正常', value: 5, color: '#22c55e' },
  { name: '预警', value: 1, color: '#f59e0b' },
  { name: '故障', value: 1, color: '#ef4444' },
  { name: '离线', value: 1, color: '#6b7280' },
];

const COST_MONTHLY = [
  { month: '10月', preventive: 28, corrective: 15, predictive: 8 },
  { month: '11月', preventive: 32, corrective: 8, predictive: 12 },
  { month: '12月', preventive: 25, corrective: 22, predictive: 10 },
  { month: '1月', preventive: 30, corrective: 12, predictive: 15 },
  { month: '2月', preventive: 28, corrective: 6, predictive: 18 },
  { month: '3月', preventive: 35, corrective: 4, predictive: 20 },
];

export function EquipmentManager({ currentLanguage }: EquipmentManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('assets');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'assets' as TabType, label: { en: 'Assets', zh: '设备台账' }, icon: HardDrive },
    { id: 'maintenance' as TabType, label: { en: 'Maintenance', zh: '维保计划' }, icon: Wrench },
    { id: 'monitoring' as TabType, label: { en: 'Monitoring', zh: '实时监控' }, icon: Activity },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '运维分析' }, icon: BarChart3 },
  ];

  const statusConf: Record<string, { label: string; color: string; bg: string }> = {
    normal: { label: isZh ? '正常' : 'OK', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    warning: { label: isZh ? '预警' : 'Warn', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    fault: { label: isZh ? '故障' : 'Fault', color: 'text-red-400', bg: 'bg-red-500/20' },
    offline: { label: isZh ? '离线' : 'Off', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  };

  const maintConf: Record<string, { label: string; color: string; bg: string }> = {
    scheduled: {
      label: isZh ? '已排期' : 'Scheduled',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
    },
    'in-progress': {
      label: isZh ? '进行中' : 'In Progress',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
    },
    completed: {
      label: isZh ? '已完成' : 'Done',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
    },
    overdue: { label: isZh ? '逾期' : 'Overdue', color: 'text-red-400', bg: 'bg-red-500/20' },
  };

  const totalValue = EQUIPMENT.reduce((s, e) => s + e.value, 0);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-slate-500/20">
            <HardDrive className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '设备管理' : 'Equipment Management'}</span>
              <Sparkles className="w-5 h-5 text-gray-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? 'AI预测性维护·设备台账·运维分析'
                : 'AI predictive maintenance · Asset ledger · Analytics'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '设备总数' : 'Total',
            value: EQUIPMENT.length.toString(),
            icon: HardDrive,
            gradient: 'from-slate-500 to-gray-600',
            sub: `${EQUIPMENT.filter((e) => e.status === 'fault').length} ${isZh ? '故障' : 'fault'}`,
          },
          {
            label: isZh ? '资产总值' : 'Total Value',
            value: `¥${totalValue}万`,
            icon: Package,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '累计折旧¥243万' : '¥243W depreciated',
          },
          {
            label: isZh ? '平均健康分' : 'Avg Health',
            value: `${Math.round(EQUIPMENT.filter((e) => e.healthScore > 0).reduce((s, e) => s + e.healthScore, 0) / EQUIPMENT.filter((e) => e.healthScore > 0).length)}`,
            icon: Activity,
            gradient: 'from-emerald-500 to-green-500',
            sub: isZh ? '1台需关注' : '1 needs attention',
          },
          {
            label: isZh ? '待维保' : 'Pending Maint.',
            value: MAINTENANCE.filter((m) => m.status !== 'completed').length.toString(),
            icon: Wrench,
            gradient: 'from-amber-500 to-orange-500',
            sub: `${MAINTENANCE.filter((m) => m.status === 'overdue').length} ${isZh ? '逾期' : 'overdue'}`,
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
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-white border border-slate-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'assets' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '设备' : 'Equipment'}
                  </th>
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '型号' : 'Model'}
                  </th>
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '位置' : 'Location'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '状态' : 'Status'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '健康分' : 'Health'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '使用率' : 'Usage'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '原值(万)' : 'Value(W)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {EQUIPMENT.map((eq) => {
                  const sc = statusConf[eq.status];
                  const usageRate =
                    eq.totalHours > 0 ? Math.round((eq.usageHours / eq.totalHours) * 100) : 0;
                  return (
                    <tr
                      key={eq.id}
                      className={`border-b border-white/5 hover:bg-white/[0.02] ${eq.status === 'fault' ? 'bg-red-500/[0.03]' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <p className="text-sm text-white">{eq.name}</p>
                        <p className="text-xs text-gray-500">{eq.id}</p>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{eq.model}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{eq.location}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`text-sm ${eq.healthScore >= 80 ? 'text-emerald-400' : eq.healthScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}
                        >
                          {eq.healthScore || '-'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-12 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${usageRate > 80 ? 'bg-amber-500' : 'bg-blue-500'}`}
                              style={{ width: `${usageRate}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{usageRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-300">¥{eq.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="space-y-4">
          {MAINTENANCE.map((m) => {
            const mc = maintConf[m.status];
            const typeLabel = {
              preventive: isZh ? '预防性' : 'Preventive',
              corrective: isZh ? '修复性' : 'Corrective',
              predictive: isZh ? 'AI预测' : 'Predictive',
            }[m.type];
            const typeColor = {
              preventive: 'text-blue-400',
              corrective: 'text-red-400',
              predictive: 'text-purple-400',
            }[m.type];
            return (
              <div
                key={m.id}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 ${m.status === 'overdue' ? 'border-red-500/20' : 'border-white/5'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white">{m.equipment}</h4>
                      <span className={`text-xs ${typeColor}`}>{typeLabel}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${mc.bg} ${mc.color}`}>
                        {mc.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{m.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isZh ? '日期' : 'Date'}: {m.date} · {isZh ? '技术员' : 'Tech'}:{' '}
                      {m.technician}
                    </p>
                  </div>
                  <p className="text-sm text-amber-400">¥{m.cost.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '设备状态分布' : 'Status Distribution'}</h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={STATUS_PIE}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {STATUS_PIE.map((e, i) => (
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
                {STATUS_PIE.map((e, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                      <span className="text-sm text-gray-300">{e.name}</span>
                    </div>
                    <span className="text-sm text-white">{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-gray-400" />
              <span>AI {isZh ? '预测性维护' : 'Predictive Maintenance'}</span>
            </h3>
            <div className="space-y-3">
              {[
                {
                  eq: isZh ? '破碎机B1' : 'Shredder B1',
                  prediction: isZh
                    ? '刀片预计3/16磨损至临界值，建议3/15前更换'
                    : 'Blade critical by 3/16, replace by 3/15',
                  urgency: 'high',
                },
                {
                  eq: isZh ? '分拣线A1' : 'Sorter A1',
                  prediction: isZh
                    ? '传送带张力预计4月初下降至80%，建议3月底调整'
                    : 'Belt tension drops to 80% by early April, adjust by end March',
                  urgency: 'medium',
                },
                {
                  eq: isZh ? '叉车F1' : 'Forklift F1',
                  prediction: isZh
                    ? '电池容量预计5月降至70%，建议Q2更换电池组'
                    : 'Battery capacity drops to 70% by May, replace in Q2',
                  urgency: 'low',
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${p.urgency === 'high' ? 'bg-red-500/10 border-red-500/15' : p.urgency === 'medium' ? 'bg-amber-500/10 border-amber-500/15' : 'bg-slate-900/30 border-white/5'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{p.eq}</span>
                    <span
                      className={`text-xs ${p.urgency === 'high' ? 'text-red-400' : p.urgency === 'medium' ? 'text-amber-400' : 'text-gray-400'}`}
                    >
                      {p.urgency === 'high' ? '🔴' : p.urgency === 'medium' ? '🟡' : '🟢'}{' '}
                      {isZh
                        ? p.urgency === 'high'
                          ? '紧急'
                          : p.urgency === 'medium'
                            ? '中等'
                            : '低'
                        : p.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{p.prediction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">
            {isZh ? '月度维保成本趋势（万元）' : 'Monthly Maintenance Cost (¥10K)'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={COST_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
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
                  dataKey="preventive"
                  fill="#3b82f6"
                  name={isZh ? '预防性' : 'Preventive'}
                  stackId="a"
                />
                <Bar
                  dataKey="corrective"
                  fill="#ef4444"
                  name={isZh ? '修复性' : 'Corrective'}
                  stackId="a"
                />
                <Bar
                  dataKey="predictive"
                  fill="#8b5cf6"
                  name={isZh ? 'AI预测' : 'Predictive'}
                  stackId="a"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-slate-500/10 to-gray-500/5 border border-slate-500/15">
            <p className="text-xs text-gray-300">
              <Brain className="w-3 h-3 inline mr-1 text-gray-400" />
              {isZh
                ? 'AI洞察：AI预测性维护占比从10月的15%提升至3月的34%，同期非计划停机减少62%，修复性维护成本下降73%。ROI预估达380%。'
                : 'AI predictive maintenance grew from 15% to 34%, unplanned downtime -62%, corrective cost -73%. Est. ROI 380%.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
