import React, { useState } from 'react';
import {
  Factory,
  Brain,
  Sparkles,
  Activity,
  Gauge,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Settings,
  BarChart3,
  Layers,
  TrendingUp,
  Package,
  Thermometer,
  Wrench,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Users,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface SmartProductionProps {
  currentLanguage: string;
}

type TabType = 'overview' | 'lines' | 'quality' | 'analytics';

interface ProductionLine {
  id: string;
  name: string;
  type: 'sorting' | 'shredding' | 'melting' | 'pressing';
  status: 'running' | 'idle' | 'maintenance' | 'fault';
  efficiency: number;
  output: number;
  target: number;
  temperature?: number;
  speed?: number;
  operator: string;
  lastMaintenance: string;
  nextMaintenance: string;
  aiScore: number;
}

const PRODUCTION_LINES: ProductionLine[] = [
  {
    id: 'PL-001',
    name: '智能分拣线A1',
    type: 'sorting',
    status: 'running',
    efficiency: 94.2,
    output: 128,
    target: 140,
    speed: 2.4,
    operator: '李明',
    lastMaintenance: '2026-03-05',
    nextMaintenance: '2026-03-20',
    aiScore: 92,
  },
  {
    id: 'PL-002',
    name: '大型破碎机B1',
    type: 'shredding',
    status: 'running',
    efficiency: 88.5,
    output: 85,
    target: 100,
    speed: 1.8,
    operator: '张伟',
    lastMaintenance: '2026-03-01',
    nextMaintenance: '2026-03-15',
    aiScore: 78,
  },
  {
    id: 'PL-003',
    name: '中频熔炼炉C1',
    type: 'melting',
    status: 'running',
    efficiency: 96.1,
    output: 42,
    target: 45,
    temperature: 1285,
    operator: '王强',
    lastMaintenance: '2026-02-28',
    nextMaintenance: '2026-03-28',
    aiScore: 95,
  },
  {
    id: 'PL-004',
    name: '液压打包机D1',
    type: 'pressing',
    status: 'idle',
    efficiency: 0,
    output: 0,
    target: 60,
    operator: '赵磊',
    lastMaintenance: '2026-03-10',
    nextMaintenance: '2026-04-10',
    aiScore: 88,
  },
  {
    id: 'PL-005',
    name: '智能分拣线A2',
    type: 'sorting',
    status: 'maintenance',
    efficiency: 0,
    output: 0,
    target: 140,
    operator: '陈静',
    lastMaintenance: '2026-03-13',
    nextMaintenance: '2026-04-13',
    aiScore: 65,
  },
  {
    id: 'PL-006',
    name: 'AI视觉检测台E1',
    type: 'sorting',
    status: 'running',
    efficiency: 99.1,
    output: 200,
    target: 200,
    speed: 3.2,
    operator: 'AI系统',
    lastMaintenance: '2026-03-08',
    nextMaintenance: '2026-04-08',
    aiScore: 99,
  },
];

const OUTPUT_TREND = [
  { date: '03-07', copper: 285, aluminum: 180, steel: 95, total: 560 },
  { date: '03-08', copper: 310, aluminum: 165, steel: 102, total: 577 },
  { date: '03-09', copper: 295, aluminum: 190, steel: 88, total: 573 },
  { date: '03-10', copper: 320, aluminum: 175, steel: 110, total: 605 },
  { date: '03-11', copper: 305, aluminum: 195, steel: 98, total: 598 },
  { date: '03-12', copper: 340, aluminum: 185, steel: 105, total: 630 },
  { date: '03-13', copper: 255, aluminum: 170, steel: 90, total: 515 },
];

const QUALITY_PIE = [
  { name: 'A级品', value: 72, color: '#22c55e' },
  { name: 'B级品', value: 18, color: '#3b82f6' },
  { name: 'C级品', value: 7, color: '#f59e0b' },
  { name: '不合格', value: 3, color: '#ef4444' },
];

export function SmartProduction({ currentLanguage }: SmartProductionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'overview' as TabType, label: { en: 'Overview', zh: '生产总览' }, icon: Activity },
    { id: 'lines' as TabType, label: { en: 'Lines', zh: '产线管理' }, icon: Factory },
    { id: 'quality' as TabType, label: { en: 'Quality', zh: '质量管控' }, icon: CheckCircle2 },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '产能分析' }, icon: BarChart3 },
  ];

  const typeConf: Record<string, { label: string; color: string }> = {
    sorting: { label: isZh ? '分拣' : 'Sort', color: 'text-blue-400' },
    shredding: { label: isZh ? '破碎' : 'Shred', color: 'text-amber-400' },
    melting: { label: isZh ? '熔炼' : 'Melt', color: 'text-red-400' },
    pressing: { label: isZh ? '打包' : 'Press', color: 'text-green-400' },
  };

  const statusConf: Record<string, { label: string; color: string; bg: string }> = {
    running: {
      label: isZh ? '运行中' : 'Running',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
    },
    idle: { label: isZh ? '空闲' : 'Idle', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    maintenance: {
      label: isZh ? '维护中' : 'Maint.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
    },
    fault: { label: isZh ? '故障' : 'Fault', color: 'text-red-400', bg: 'bg-red-500/20' },
  };

  const runningLines = PRODUCTION_LINES.filter((l) => l.status === 'running').length;
  const todayOutput = OUTPUT_TREND[OUTPUT_TREND.length - 1].total;
  const avgEfficiency =
    Math.round(
      (PRODUCTION_LINES.filter((l) => l.status === 'running').reduce(
        (s, l) => s + l.efficiency,
        0
      ) /
        runningLines) *
        10
    ) / 10;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-600 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-slate-500/20">
            <Factory className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能生产' : 'Smart Production'}</span>
              <Sparkles className="w-5 h-5 text-slate-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? 'AI驱动的废金属加工产线监控与优化'
                : 'AI-powered scrap metal processing & optimization'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '运行产线' : 'Running Lines',
            value: `${runningLines}/${PRODUCTION_LINES.length}`,
            icon: Factory,
            gradient: 'from-slate-500 to-gray-600',
            sub: `${PRODUCTION_LINES.filter((l) => l.status === 'maintenance').length} ${isZh ? '维护中' : 'in maint.'}`,
          },
          {
            label: isZh ? '今日产出' : 'Today Output',
            value: `${todayOutput}t`,
            icon: Package,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '目标: 625t' : 'Target: 625t',
          },
          {
            label: isZh ? '综合效率OEE' : 'OEE',
            value: `${avgEfficiency}%`,
            icon: Gauge,
            gradient: 'from-emerald-500 to-green-500',
            sub: '+2.3% MoM',
          },
          {
            label: isZh ? 'A级品率' : 'A-Grade Rate',
            value: '72%',
            icon: CheckCircle2,
            gradient: 'from-amber-500 to-orange-500',
            sub: isZh ? '目标>70%' : 'Target>70%',
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

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '近7天产出趋势（吨）' : '7-Day Output Trend (tons)'}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <AreaChart data={OUTPUT_TREND}>
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
                  <Area
                    type="monotone"
                    dataKey="copper"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.15}
                    name={isZh ? '废铜' : 'Copper'}
                  />
                  <Area
                    type="monotone"
                    dataKey="aluminum"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.15}
                    name={isZh ? '废铝' : 'Aluminum'}
                  />
                  <Area
                    type="monotone"
                    dataKey="steel"
                    stackId="1"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.1}
                    name={isZh ? '废钢' : 'Steel'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-slate-400" />
              <span>AI {isZh ? '生产优化建议' : 'Production Tips'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  text: isZh
                    ? '破碎机B1效率偏低(88.5%)，AI检测到刀片磨损超60%，建议提前至3/15更换以避免非计划停机'
                    : 'Shredder B1 blade wear >60%, replace by 3/15 to avoid unplanned downtime',
                },
                {
                  text: isZh
                    ? '分拣线A2维护中，建议将A1线速度从2.4t/h提升至2.8t/h补缺，AI评估不影响分拣精度'
                    : 'A2 in maintenance, increase A1 speed to 2.8t/h to compensate, AI confirms no accuracy loss',
                },
                {
                  text: isZh
                    ? '熔炼炉C1温度偏高(1285°C)，建议下调至1260°C可节省8%能耗且不影响出铜品质'
                    : 'Furnace C1 temp 1285°C high, reduce to 1260°C saves 8% energy with same quality',
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-r from-slate-500/10 to-gray-500/5 border border-slate-500/15"
                >
                  <p className="text-xs text-gray-300">
                    <Sparkles className="w-3 h-3 inline mr-1 text-slate-400" />
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTION_LINES.map((line) => {
            const tc = typeConf[line.type];
            const sc = statusConf[line.status];
            return (
              <div
                key={line.id}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 ${line.status === 'fault' ? 'border-red-500/30' : 'border-white/5'} hover:border-white/10 transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white">{line.name}</h4>
                      <span className={`text-xs ${tc.color}`}>{tc.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {isZh ? '操作员' : 'Operator'}: {line.operator} | ID: {line.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-white">
                      {line.efficiency > 0 ? `${line.efficiency}%` : '-'}
                    </p>
                    <p className="text-xs text-gray-500">OEE</p>
                  </div>
                </div>
                {line.status === 'running' && (
                  <>
                    <div className="flex items-center space-x-6 text-xs text-gray-500 mb-2">
                      <span>
                        {isZh ? '产出' : 'Output'}:{' '}
                        <span className="text-white">
                          {line.output}/{line.target}t
                        </span>
                      </span>
                      {line.speed && (
                        <span>
                          {isZh ? '速度' : 'Speed'}:{' '}
                          <span className="text-white">{line.speed}t/h</span>
                        </span>
                      )}
                      {line.temperature && (
                        <span>
                          {isZh ? '温度' : 'Temp'}:{' '}
                          <span
                            className={`${line.temperature > 1280 ? 'text-amber-400' : 'text-white'}`}
                          >
                            {line.temperature}°C
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-slate-700/30 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${line.output / line.target >= 0.9 ? 'bg-emerald-500' : line.output / line.target >= 0.7 ? 'bg-blue-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(100, (line.output / line.target) * 100)}%` }}
                      />
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>
                    AI{isZh ? '健康分' : ' Score'}:{' '}
                    <span
                      className={`${line.aiScore >= 90 ? 'text-emerald-400' : line.aiScore >= 70 ? 'text-amber-400' : 'text-red-400'}`}
                    >
                      {line.aiScore}
                    </span>
                  </span>
                  <span>
                    {isZh ? '下次维护' : 'Next maint.'}: {line.nextMaintenance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'quality' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '品质等级分布' : 'Quality Grade'}</h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={QUALITY_PIE}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {QUALITY_PIE.map((e, i) => (
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
                {QUALITY_PIE.map((e, i) => (
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
            <h3 className="text-white mb-4">{isZh ? 'AI质检记录' : 'AI QC Log'}</h3>
            <div className="space-y-3">
              {[
                {
                  time: '14:15',
                  line: 'A1',
                  result: 'pass',
                  detail: isZh
                    ? '废铜批次CP-0313-05 纯度99.3% → A级'
                    : 'Copper CP-0313-05 purity 99.3% → Grade A',
                },
                {
                  time: '13:42',
                  line: 'C1',
                  result: 'pass',
                  detail: isZh
                    ? '熔炼出铜取样 含铜99.5% → A级'
                    : 'Furnace sample Cu 99.5% → Grade A',
                },
                {
                  time: '13:10',
                  line: 'B1',
                  result: 'warning',
                  detail: isZh
                    ? '破碎产出粒度偏大，建议检查筛网'
                    : 'Shredder output size too large, check screen',
                },
                {
                  time: '12:30',
                  line: 'E1',
                  result: 'pass',
                  detail: isZh
                    ? 'AI视觉分拣准确率99.1%，杂质率0.3%'
                    : 'AI vision sorting 99.1% accuracy, 0.3% impurity',
                },
                {
                  time: '11:45',
                  line: 'A1',
                  result: 'fail',
                  detail: isZh
                    ? '检测到混入不锈钢杂质，已自动剔除'
                    : 'Stainless steel contamination detected, auto-rejected',
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-3 p-3 rounded-xl ${log.result === 'fail' ? 'bg-red-500/10 border border-red-500/15' : log.result === 'warning' ? 'bg-amber-500/10 border border-amber-500/15' : 'bg-slate-900/30 border border-white/5'}`}
                >
                  {log.result === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : log.result === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-gray-200">{log.detail}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {log.time} · {isZh ? '产线' : 'Line'} {log.line}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '各产线日产量对比' : 'Daily Output by Line'}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart
                data={[
                  { line: 'A1', output: 128, target: 140 },
                  { line: 'B1', output: 85, target: 100 },
                  { line: 'C1', output: 42, target: 45 },
                  { line: 'D1', output: 0, target: 60 },
                  { line: 'A2', output: 0, target: 140 },
                  { line: 'E1', output: 200, target: 200 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="line" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
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
                  dataKey="target"
                  fill="rgba(100,116,139,0.3)"
                  name={isZh ? '目标' : 'Target'}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="output"
                  fill="#3b82f6"
                  name={isZh ? '实际' : 'Actual'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
