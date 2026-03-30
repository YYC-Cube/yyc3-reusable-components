import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  Target,
  BarChart3,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Sparkles,
  Layers,
  DollarSign,
  Package,
  Globe,
  Gauge,
  Eye,
  ChevronRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  Legend,
} from 'recharts';

interface SmartPredictionProps {
  currentLanguage: string;
}

type TabType = 'price' | 'demand' | 'cashflow' | 'market';

// Copper price prediction data (¥/吨)
const COPPER_PRICE_DATA = [
  { date: '2025-10', actual: 68200, predicted: null },
  { date: '2025-11', actual: 69500, predicted: null },
  { date: '2025-12', actual: 67800, predicted: null },
  { date: '2026-01', actual: 70100, predicted: 69800 },
  { date: '2026-02', actual: 71500, predicted: 71200 },
  { date: '2026-03', actual: 72800, predicted: 72500 },
  { date: '2026-04', actual: null, predicted: 74200 },
  { date: '2026-05', actual: null, predicted: 75800 },
  { date: '2026-06', actual: null, predicted: 76500 },
];

// Aluminum price prediction
const ALUMINUM_PRICE_DATA = [
  { date: '2025-10', actual: 18500, predicted: null },
  { date: '2025-11', actual: 19200, predicted: null },
  { date: '2025-12', actual: 18800, predicted: null },
  { date: '2026-01', actual: 19500, predicted: 19300 },
  { date: '2026-02', actual: 19800, predicted: 19600 },
  { date: '2026-03', actual: 20200, predicted: 20000 },
  { date: '2026-04', actual: null, predicted: 20800 },
  { date: '2026-05', actual: null, predicted: 21200 },
  { date: '2026-06', actual: null, predicted: 21000 },
];

// Steel scrap price prediction
const STEEL_PRICE_DATA = [
  { date: '2025-10', actual: 2650, predicted: null },
  { date: '2025-11', actual: 2720, predicted: null },
  { date: '2025-12', actual: 2680, predicted: null },
  { date: '2026-01', actual: 2750, predicted: 2730 },
  { date: '2026-02', actual: 2800, predicted: 2780 },
  { date: '2026-03', actual: 2820, predicted: 2850 },
  { date: '2026-04', actual: null, predicted: 2780 },
  { date: '2026-05', actual: null, predicted: 2720 },
  { date: '2026-06', actual: null, predicted: 2680 },
];

// Demand forecast
const DEMAND_FORECAST = [
  { month: '1月', copper: 1200, aluminum: 850, steel: 2100, actual_total: 4150 },
  { month: '2月', copper: 980, aluminum: 780, steel: 1800, actual_total: 3560 },
  { month: '3月', copper: 1350, aluminum: 920, steel: 2300, actual_total: 4570 },
  { month: '4月', copper: 1500, aluminum: 1050, steel: 2500, actual_total: null },
  { month: '5月', copper: 1420, aluminum: 980, steel: 2400, actual_total: null },
  { month: '6月', copper: 1380, aluminum: 1100, steel: 2350, actual_total: null },
];

// Cash flow prediction
const CASHFLOW_DATA = [
  { month: '1月', inflow: 4200, outflow: 3800, net: 400, predicted_net: 380 },
  { month: '2月', inflow: 3500, outflow: 3200, net: 300, predicted_net: 320 },
  { month: '3月', inflow: 4800, outflow: 4100, net: 700, predicted_net: 650 },
  { month: '4月', inflow: 5200, outflow: 4500, net: 700, predicted_net: 700 },
  { month: '5月', inflow: 4900, outflow: 4300, net: 600, predicted_net: 600 },
  { month: '6月', inflow: 5500, outflow: 4800, net: 700, predicted_net: 700 },
];

// Market indices
const MARKET_INDICES = [
  { name: 'LME铜', value: '$9,285', change: '+2.3%', trend: 'up' as const, color: '#f97316' },
  { name: 'LME铝', value: '$2,548', change: '+1.1%', trend: 'up' as const, color: '#3b82f6' },
  {
    name: '废钢综合指数',
    value: '2,820',
    change: '-0.8%',
    trend: 'down' as const,
    color: '#6b7280',
  },
  { name: '人民币/美元', value: '7.18', change: '+0.15%', trend: 'up' as const, color: '#ef4444' },
  {
    name: '波罗的海干散货',
    value: '1,652',
    change: '-3.2%',
    trend: 'down' as const,
    color: '#8b5cf6',
  },
  { name: '原油WTI', value: '$72.5', change: '+0.8%', trend: 'up' as const, color: '#22c55e' },
];

interface PredictionModel {
  name: string;
  accuracy: number;
  lastUpdated: string;
  features: number;
  status: 'active' | 'training' | 'standby';
}

const AI_MODELS: PredictionModel[] = [
  {
    name: '铜价LSTM时序模型',
    accuracy: 94.2,
    lastUpdated: '2h前',
    features: 128,
    status: 'active',
  },
  {
    name: '铝价Transformer预测',
    accuracy: 91.5,
    lastUpdated: '3h前',
    features: 96,
    status: 'active',
  },
  { name: '废钢需求预测引擎', accuracy: 88.7, lastUpdated: '1h前', features: 64, status: 'active' },
  {
    name: '现金流XGBoost集成',
    accuracy: 92.1,
    lastUpdated: '30min前',
    features: 48,
    status: 'training',
  },
  { name: '市场情绪NLP分析', accuracy: 85.3, lastUpdated: '4h前', features: 256, status: 'active' },
];

export function SmartPrediction({ currentLanguage }: SmartPredictionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('price');
  const [selectedMetal, setSelectedMetal] = useState<'copper' | 'aluminum' | 'steel'>('copper');
  const [animCounter, setAnimCounter] = useState(0);
  const isZh = currentLanguage === 'zh';

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimCounter((c) => (c + 1) % 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'price' as TabType, label: { en: 'Price Forecast', zh: '价格预测' }, icon: TrendingUp },
    { id: 'demand' as TabType, label: { en: 'Demand Forecast', zh: '需求预测' }, icon: Package },
    { id: 'cashflow' as TabType, label: { en: 'Cash Flow', zh: '现金流预测' }, icon: DollarSign },
    { id: 'market' as TabType, label: { en: 'Market Pulse', zh: '市场脉搏' }, icon: Globe },
  ];

  const metalConf = {
    copper: {
      label: isZh ? '废铜' : 'Copper Scrap',
      data: COPPER_PRICE_DATA,
      color: '#f97316',
      unit: '¥/吨',
      currentPrice: '¥72,800',
      predictQ2: '¥76,500',
      change: '+5.1%',
    },
    aluminum: {
      label: isZh ? '废铝' : 'Aluminum Scrap',
      data: ALUMINUM_PRICE_DATA,
      color: '#3b82f6',
      unit: '¥/吨',
      currentPrice: '¥20,200',
      predictQ2: '¥21,000',
      change: '+4.0%',
    },
    steel: {
      label: isZh ? '废钢' : 'Steel Scrap',
      data: STEEL_PRICE_DATA,
      color: '#6b7280',
      unit: '¥/吨',
      currentPrice: '¥2,820',
      predictQ2: '¥2,680',
      change: '-5.0%',
    },
  };

  const mc = metalConf[selectedMetal];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div
              className={`absolute -inset-1.5 rounded-2xl border-2 border-blue-400/30 transition-all duration-1000 ${
                animCounter % 3 === 0 ? 'opacity-60 scale-100' : 'opacity-0 scale-110'
              }`}
            />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能预测' : 'Smart Prediction'}</span>
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh ? 'AI多模型集成预测引擎' : 'AI multi-model ensemble prediction engine'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/60 rounded-lg border border-white/5">
            <RefreshCw
              className="w-3.5 h-3.5 text-emerald-400 animate-spin"
              style={{ animationDuration: '3s' }}
            />
            <span className="text-xs text-gray-400">
              {isZh ? '模型更新中...' : 'Models updating...'}
            </span>
          </div>
        </div>
      </div>

      {/* AI Model Status Strip */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400 flex items-center space-x-2">
            <Brain className="w-4 h-4 text-blue-400" />
            <span>{isZh ? 'AI预测模型矩阵' : 'AI Model Matrix'}</span>
          </span>
          <span className="text-xs text-gray-500">
            {AI_MODELS.filter((m) => m.status === 'active').length}/{AI_MODELS.length}{' '}
            {isZh ? '在线' : 'Online'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {AI_MODELS.map((model, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-blue-500/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${model.status === 'active' ? 'bg-emerald-400' : model.status === 'training' ? 'bg-amber-400 animate-pulse' : 'bg-gray-500'}`}
                  />
                  <span className="text-xs text-gray-300 truncate">{model.name}</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span
                  className={`text-lg ${model.accuracy >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}
                >
                  {model.accuracy}%
                </span>
                <span className="text-xs text-gray-600">{model.lastUpdated}</span>
              </div>
              <div className="h-1 bg-slate-700/40 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${model.accuracy >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${model.accuracy}%` }}
                />
              </div>
            </div>
          ))}
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
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Price Forecast Tab */}
      {activeTab === 'price' && (
        <div className="space-y-6">
          {/* Metal Selector */}
          <div className="flex items-center space-x-3">
            {(Object.keys(metalConf) as Array<'copper' | 'aluminum' | 'steel'>).map((key) => {
              const m = metalConf[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMetal(key)}
                  className={`px-4 py-3 rounded-xl transition-all ${
                    selectedMetal === key
                      ? 'bg-slate-800/60 border-2 text-white'
                      : 'bg-slate-800/30 border border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                  style={{ borderColor: selectedMetal === key ? m.color + '60' : undefined }}
                >
                  <div className="text-sm">{m.label}</div>
                  <div className="text-lg text-white mt-0.5">{m.currentPrice}</div>
                  <div
                    className={`text-xs mt-0.5 ${m.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {isZh ? 'Q2预测' : 'Q2 Est.'}: {m.predictQ2} ({m.change})
                  </div>
                </button>
              );
            })}
          </div>

          {/* Price Chart */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">
                {mc.label}
                {isZh ? '价格预测曲线' : ' Price Forecast'} ({mc.unit})
              </h3>
              <div className="flex items-center space-x-4 text-xs">
                <span className="flex items-center space-x-1.5">
                  <div className="w-3 h-0.5 bg-white" />
                  <span className="text-gray-400">{isZh ? '实际价格' : 'Actual'}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <div
                    className="w-3 h-0.5 rounded-full"
                    style={{ backgroundColor: mc.color, opacity: 0.7 }}
                  />
                  <span className="text-gray-400">{isZh ? 'AI预测' : 'AI Predicted'}</span>
                </span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <ComposedChart data={mc.data}>
                  <defs>
                    <linearGradient id={`predGrad-${selectedMetal}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={mc.color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={mc.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    domain={['auto', 'auto']}
                  />
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
                    dataKey="predicted"
                    stroke={mc.color}
                    fill={`url(#predGrad-${selectedMetal})`}
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    name={isZh ? 'AI预测' : 'Predicted'}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#ffffff"
                    strokeWidth={2.5}
                    dot={{ fill: '#fff', r: 4, strokeWidth: 2, stroke: '#1e293b' }}
                    name={isZh ? '实际价格' : 'Actual'}
                    connectNulls={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {/* Prediction Confidence */}
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500">{isZh ? '模型置信度' : 'Confidence'}</p>
                <p className="text-lg text-emerald-400">
                  {selectedMetal === 'copper'
                    ? '94.2%'
                    : selectedMetal === 'aluminum'
                      ? '91.5%'
                      : '88.7%'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{isZh ? '预测偏差(MAPE)' : 'MAPE'}</p>
                <p className="text-lg text-white">
                  {selectedMetal === 'copper'
                    ? '2.1%'
                    : selectedMetal === 'aluminum'
                      ? '2.8%'
                      : '3.5%'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{isZh ? '数据源数量' : 'Data Sources'}</p>
                <p className="text-lg text-white">12</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demand Forecast Tab */}
      {activeTab === 'demand' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '月度需求预测（吨）' : 'Monthly Demand Forecast (tons)'}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={DEMAND_FORECAST}>
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
                  <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                  <Bar
                    dataKey="copper"
                    stackId="a"
                    fill="#f97316"
                    name={isZh ? '废铜' : 'Copper'}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="aluminum"
                    stackId="a"
                    fill="#3b82f6"
                    name={isZh ? '废铝' : 'Aluminum'}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="steel"
                    stackId="a"
                    fill="#6b7280"
                    name={isZh ? '废钢' : 'Steel'}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demand Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: isZh ? 'Q2废铜需求预测' : 'Q2 Copper Demand',
                value: isZh ? '4,300吨' : '4,300t',
                change: '+12%',
                icon: TrendingUp,
                color: 'text-orange-400',
              },
              {
                label: isZh ? 'Q2废铝需求预测' : 'Q2 Aluminum Demand',
                value: isZh ? '3,130吨' : '3,130t',
                change: '+8%',
                icon: TrendingUp,
                color: 'text-blue-400',
              },
              {
                label: isZh ? 'Q2废钢需求预测' : 'Q2 Steel Demand',
                value: isZh ? '7,250吨' : '7,250t',
                change: '-3%',
                icon: TrendingDown,
                color: 'text-gray-400',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-gray-400 text-sm">{item.label}</span>
                  </div>
                  <p className="text-2xl text-white">{item.value}</p>
                  <p
                    className={`text-xs mt-1 ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {item.change} {isZh ? '环比' : 'QoQ'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cash Flow Tab */}
      {activeTab === 'cashflow' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '现金流预测（万元）' : 'Cash Flow Forecast (10K ¥)'}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <ComposedChart data={CASHFLOW_DATA}>
                  <defs>
                    <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                  <Bar
                    dataKey="inflow"
                    fill="#22c55e"
                    opacity={0.7}
                    radius={[4, 4, 0, 0]}
                    name={isZh ? '现金流入' : 'Inflow'}
                  />
                  <Bar
                    dataKey="outflow"
                    fill="#ef4444"
                    opacity={0.5}
                    radius={[4, 4, 0, 0]}
                    name={isZh ? '现金流出' : 'Outflow'}
                  />
                  <Line
                    type="monotone"
                    dataKey="net"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    dot={{ fill: '#f59e0b', r: 4 }}
                    name={isZh ? '净现金流' : 'Net'}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted_net"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="5 3"
                    dot={{ fill: '#8b5cf6', r: 3 }}
                    name={isZh ? 'AI预测净流' : 'Predicted Net'}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cash flow KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: isZh ? 'Q2预测净流入' : 'Q2 Net Inflow',
                value: '¥2,000万',
                icon: ArrowUpRight,
                color: 'text-emerald-400',
                gradient: 'from-emerald-500 to-green-500',
              },
              {
                label: isZh ? '资金缺口预警' : 'Gap Alert',
                value: isZh ? '无' : 'None',
                icon: CheckCircle2,
                color: 'text-emerald-400',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                label: isZh ? '回款周期预测' : 'Collection Cycle',
                value: isZh ? '32天' : '32d',
                icon: Clock,
                color: 'text-amber-400',
                gradient: 'from-amber-500 to-orange-500',
              },
              {
                label: isZh ? '预测准确率' : 'Forecast Accuracy',
                value: '92.1%',
                icon: Target,
                color: 'text-purple-400',
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} opacity-80 flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                  <p className={`text-xl text-white`}>{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Market Pulse Tab */}
      {activeTab === 'market' && (
        <div className="space-y-6">
          {/* Live Market Indices */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {MARKET_INDICES.map((idx, i) => (
              <div
                key={i}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 hover:border-white/10 transition-all"
              >
                <p className="text-xs text-gray-500 mb-1">{idx.name}</p>
                <p className="text-lg text-white">{idx.value}</p>
                <div className="flex items-center space-x-1 mt-1">
                  {idx.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-400" />
                  )}
                  <span
                    className={`text-xs ${idx.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {idx.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Market Sentiment */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <span>{isZh ? 'AI市场情绪分析' : 'AI Market Sentiment'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  metal: isZh ? '废铜市场' : 'Copper Scrap',
                  sentiment: isZh ? '偏多' : 'Bullish',
                  score: 72,
                  color: '#f97316',
                  signals: [
                    isZh ? 'LME铜价连续5日上涨' : 'LME copper up 5 consecutive days',
                    isZh ? '新能源需求持续增长' : 'Growing EV demand',
                    isZh ? '智利铜矿产量下降2.3%' : 'Chile output -2.3%',
                  ],
                },
                {
                  metal: isZh ? '废铝市场' : 'Aluminum Scrap',
                  sentiment: isZh ? '中性偏多' : 'Mildly Bullish',
                  score: 62,
                  color: '#3b82f6',
                  signals: [
                    isZh ? '电解铝库存低位运行' : 'Low inventory levels',
                    isZh ? '建筑行业需求回暖' : 'Construction demand recovery',
                    isZh ? '进口政策收紧预期' : 'Import policy tightening expected',
                  ],
                },
                {
                  metal: isZh ? '废钢市场' : 'Steel Scrap',
                  sentiment: isZh ? '偏空' : 'Bearish',
                  score: 38,
                  color: '#6b7280',
                  signals: [
                    isZh ? '房地产开工率持续低迷' : 'Real estate starts declining',
                    isZh ? '钢厂利润承压' : 'Steelmaker margins compressed',
                    isZh ? '社会库存去化缓慢' : 'Slow inventory destocking',
                  ],
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white">{item.metal}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor:
                          item.score >= 60
                            ? 'rgba(34,197,94,0.2)'
                            : item.score <= 40
                              ? 'rgba(239,68,68,0.2)'
                              : 'rgba(245,158,11,0.2)',
                        color:
                          item.score >= 60 ? '#22c55e' : item.score <= 40 ? '#ef4444' : '#f59e0b',
                      }}
                    >
                      {item.sentiment}
                    </span>
                  </div>

                  {/* Sentiment Gauge */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>{isZh ? '看空' : 'Bear'}</span>
                      <span>{isZh ? '中性' : 'Neutral'}</span>
                      <span>{isZh ? '看多' : 'Bull'}</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-red-500/30 via-amber-500/30 to-emerald-500/30 rounded-full relative">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white bg-slate-900 transition-all"
                        style={{
                          left: `${item.score}%`,
                          transform: `translateX(-50%) translateY(-50%)`,
                        }}
                      />
                    </div>
                    <p className="text-center text-xs mt-1" style={{ color: item.color }}>
                      {item.score}/100
                    </p>
                  </div>

                  {/* Signals */}
                  <div className="space-y-1.5">
                    {item.signals.map((sig, si) => (
                      <div key={si} className="flex items-start space-x-2">
                        <Zap className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-400 leading-relaxed">{sig}</span>
                      </div>
                    ))}
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
