import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Bell,
  FileText,
  MapPin,
  Building2,
  Zap,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

interface SmartRiskProps {
  currentLanguage: string;
}

type TabType = 'dashboard' | 'credit' | 'alerts' | 'analysis';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

interface RiskAlert {
  id: string;
  title: { en: string; zh: string };
  level: RiskLevel;
  category: string;
  target: string;
  time: string;
  description: string;
  status: 'active' | 'resolved' | 'monitoring';
}

interface CreditRating {
  id: string;
  company: string;
  type: string;
  score: number;
  level: string;
  creditLimit: number;
  usedCredit: number;
  paymentDays: number;
  overdueRate: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

const RISK_ALERTS: RiskAlert[] = [
  {
    id: 'RA-001',
    title: { en: 'Overdue Payment Warning', zh: '逾期付款预警' },
    level: 'critical',
    category: '应收账款',
    target: '河北冀东钢材',
    time: '10分钟前',
    description: '该客户有3笔应收款项逾期超过60天，累计金额¥185万',
    status: 'active',
  },
  {
    id: 'RA-002',
    title: { en: 'Credit Limit Exceeded', zh: '信用额度超限' },
    level: 'high',
    category: '信用风险',
    target: '山东齐鲁钢铁集团',
    time: '1小时前',
    description: '当前在途订单金额已超出信用额度92%，建议暂停新订单',
    status: 'active',
  },
  {
    id: 'RA-003',
    title: { en: 'Price Volatility Alert', zh: '价格波动预警' },
    level: 'high',
    category: '市场风险',
    target: '废铜(光亮铜)',
    time: '3小时前',
    description: '近7天铜价波动超过8%，当前持仓120吨面临价格风险',
    status: 'monitoring',
  },
  {
    id: 'RA-004',
    title: { en: 'Supplier Risk Detected', zh: '供应商风险发现' },
    level: 'medium',
    category: '供应链风险',
    target: '宁波海天铜业',
    time: '6小时前',
    description: '该供应商近期交货延迟率上升至15%，建议关注',
    status: 'monitoring',
  },
  {
    id: 'RA-005',
    title: { en: 'Contract Expiry Notice', zh: '合同到期提醒' },
    level: 'medium',
    category: '合同风险',
    target: '天津港保税区物流园',
    time: '1天前',
    description: '仓库租赁合同将于2026-05-31到期，需尽快续签',
    status: 'active',
  },
  {
    id: 'RA-006',
    title: { en: 'Compliance Check Required', zh: '合规检查提醒' },
    level: 'low',
    category: '合规风险',
    target: 'PT Indo Copper Trading',
    time: '2天前',
    description: '印尼出口许可证将于60天后到期，请提前准备续证',
    status: 'monitoring',
  },
  {
    id: 'RA-007',
    title: { en: 'Inventory Depreciation', zh: '库存贬值风险' },
    level: 'medium',
    category: '资产风险',
    target: '不锈钢库存',
    time: '3天前',
    description: '不锈钢价格持续走低，当前库存520吨建议加速周转',
    status: 'resolved',
  },
];

const CREDIT_RATINGS: CreditRating[] = [
  {
    id: 'CR-001',
    company: '山东齐鲁钢铁集团',
    type: '客户',
    score: 82,
    level: 'A',
    creditLimit: 8000000,
    usedCredit: 7360000,
    paymentDays: 35,
    overdueRate: 5.2,
    lastUpdated: '2026-03-10',
    trend: 'down',
  },
  {
    id: 'CR-002',
    company: 'Hyundai Metal Trading',
    type: '客户',
    score: 91,
    level: 'A+',
    creditLimit: 15000000,
    usedCredit: 8800000,
    paymentDays: 28,
    overdueRate: 1.8,
    lastUpdated: '2026-03-12',
    trend: 'stable',
  },
  {
    id: 'CR-003',
    company: '上海鑫达金属材料',
    type: '供应商',
    score: 88,
    level: 'A',
    creditLimit: 12000000,
    usedCredit: 5600000,
    paymentDays: 22,
    overdueRate: 2.5,
    lastUpdated: '2026-03-08',
    trend: 'up',
  },
  {
    id: 'CR-004',
    company: '广东南海铝业集团',
    type: '客户',
    score: 76,
    level: 'B+',
    creditLimit: 6000000,
    usedCredit: 4200000,
    paymentDays: 42,
    overdueRate: 8.1,
    lastUpdated: '2026-03-05',
    trend: 'down',
  },
  {
    id: 'CR-005',
    company: 'PT Indo Copper Trading',
    type: '客户',
    score: 85,
    level: 'A',
    creditLimit: 20000000,
    usedCredit: 12000000,
    paymentDays: 30,
    overdueRate: 3.2,
    lastUpdated: '2026-03-11',
    trend: 'up',
  },
  {
    id: 'CR-006',
    company: '浙江华峰不锈钢',
    type: '供应商',
    score: 72,
    level: 'B',
    creditLimit: 5000000,
    usedCredit: 3800000,
    paymentDays: 38,
    overdueRate: 10.5,
    lastUpdated: '2026-03-01',
    trend: 'down',
  },
  {
    id: 'CR-007',
    company: '中远海运集团',
    type: '服务商',
    score: 95,
    level: 'A+',
    creditLimit: 10000000,
    usedCredit: 3200000,
    paymentDays: 15,
    overdueRate: 0.5,
    lastUpdated: '2026-03-13',
    trend: 'stable',
  },
  {
    id: 'CR-008',
    company: '福建三钢集团',
    type: '客户',
    score: 68,
    level: 'B',
    creditLimit: 4000000,
    usedCredit: 2100000,
    paymentDays: 48,
    overdueRate: 12.3,
    lastUpdated: '2026-02-28',
    trend: 'down',
  },
];

const RISK_DISTRIBUTION = [
  { name: '信用风险', value: 35, color: '#ef4444' },
  { name: '市场风险', value: 25, color: '#f59e0b' },
  { name: '供应链风险', value: 18, color: '#8b5cf6' },
  { name: '合规风险', value: 12, color: '#3b82f6' },
  { name: '资产风险', value: 10, color: '#6b7280' },
];

const RISK_TREND_DATA = [
  { month: '10月', critical: 2, high: 5, medium: 8, low: 12 },
  { month: '11月', critical: 3, high: 4, medium: 10, low: 15 },
  { month: '12月', critical: 1, high: 6, medium: 7, low: 11 },
  { month: '1月', critical: 2, high: 3, medium: 9, low: 14 },
  { month: '2月', critical: 1, high: 4, medium: 6, low: 10 },
  { month: '3月', critical: 2, high: 5, medium: 8, low: 13 },
];

const RISK_RADAR = [
  { metric: '信用风险', score: 72 },
  { metric: '市场风险', score: 65 },
  { metric: '运营风险', score: 85 },
  { metric: '合规风险', score: 90 },
  { metric: '供应链风险', score: 78 },
  { metric: '财务风险', score: 70 },
];

const LEVEL_CONFIG: Record<
  RiskLevel,
  { label: { en: string; zh: string }; color: string; bg: string }
> = {
  critical: { label: { en: 'Critical', zh: '严重' }, color: 'text-red-400', bg: 'bg-red-500/20' },
  high: { label: { en: 'High', zh: '高' }, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  medium: { label: { en: 'Medium', zh: '中' }, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  low: { label: { en: 'Low', zh: '低' }, color: 'text-green-400', bg: 'bg-green-500/20' },
};

export function SmartRisk({ currentLanguage }: SmartRiskProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'dashboard' as TabType, label: { en: 'Risk Dashboard', zh: '风险看板' }, icon: Shield },
    { id: 'credit' as TabType, label: { en: 'Credit Rating', zh: '信用评级' }, icon: Users },
    { id: 'alerts' as TabType, label: { en: 'Risk Alerts', zh: '风险预警' }, icon: Bell },
    { id: 'analysis' as TabType, label: { en: 'Analysis', zh: '风险分析' }, icon: BarChart3 },
  ];

  const activeAlerts = RISK_ALERTS.filter((a) => a.status === 'active').length;
  const criticalCount = RISK_ALERTS.filter(
    (a) => a.level === 'critical' && a.status !== 'resolved'
  ).length;
  const avgCreditScore = Math.round(
    CREDIT_RATINGS.reduce((s, c) => s + c.score, 0) / CREDIT_RATINGS.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/20';
    if (score >= 80) return 'bg-blue-500/20';
    if (score >= 70) return 'bg-amber-500/20';
    return 'bg-red-500/20';
  };

  const formatMoney = (v: number) =>
    v >= 10000 ? `¥${(v / 10000).toFixed(0)}万` : `¥${v.toLocaleString()}`;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-red-500/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '智能风控' : 'Smart Risk Control'}</h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? '业务风险识别与信用评级管理'
                : 'Business risk identification & credit rating management'}
            </p>
          </div>
        </div>
        {criticalCount > 0 && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300">
              {criticalCount} {isZh ? '个严重风险待处理' : 'critical risk(s)'}
            </span>
          </div>
        )}
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

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: isZh ? '风险健康指数' : 'Risk Health Index',
                value: '78/100',
                icon: Shield,
                gradient: 'from-emerald-500 to-green-500',
                trend: '+3',
                up: true,
              },
              {
                label: isZh ? '活跃预警' : 'Active Alerts',
                value: activeAlerts.toString(),
                icon: Bell,
                gradient: 'from-red-500 to-rose-500',
                trend: '-2',
                up: true,
              },
              {
                label: isZh ? '平均信用评分' : 'Avg Credit Score',
                value: avgCreditScore.toString(),
                icon: Users,
                gradient: 'from-blue-500 to-cyan-500',
                trend: '+1.5',
                up: true,
              },
              {
                label: isZh ? '风控处理率' : 'Resolution Rate',
                value: '87.5%',
                icon: CheckCircle2,
                gradient: 'from-amber-500 to-orange-500',
                trend: '+5.2%',
                up: true,
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
                    </div>
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}
                    >
                      <StatIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-1">
                    {stat.up ? (
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-400" />
                    )}
                    <span className="text-xs text-emerald-400">{stat.trend}</span>
                    <span className="text-xs text-gray-500">
                      {isZh ? '较上月' : 'vs last month'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Trend */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '风险等级趋势' : 'Risk Level Trend'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={RISK_TREND_DATA}>
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
                      dataKey="critical"
                      stackId="risk"
                      fill="#ef4444"
                      radius={[0, 0, 0, 0]}
                      name={isZh ? '严重' : 'Critical'}
                    />
                    <Bar dataKey="high" stackId="risk" fill="#f97316" name={isZh ? '高' : 'High'} />
                    <Bar
                      dataKey="medium"
                      stackId="risk"
                      fill="#f59e0b"
                      name={isZh ? '中' : 'Medium'}
                    />
                    <Bar
                      dataKey="low"
                      stackId="risk"
                      fill="#22c55e"
                      radius={[6, 6, 0, 0]}
                      name={isZh ? '低' : 'Low'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '风险类型分布' : 'Risk Type Distribution'}
              </h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={RISK_DISTRIBUTION}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {RISK_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
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
                  {RISK_DISTRIBUTION.map((item, idx) => (
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

          {/* Recent Alerts */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">{isZh ? '最新风险预警' : 'Recent Alerts'}</h3>
              <button
                onClick={() => setActiveTab('alerts')}
                className="text-sm text-red-400 hover:text-red-300"
              >
                {isZh ? '查看全部' : 'View All'} →
              </button>
            </div>
            <div className="space-y-2">
              {RISK_ALERTS.filter((a) => a.status !== 'resolved')
                .slice(0, 4)
                .map((alert) => {
                  const levelConf = LEVEL_CONFIG[alert.level];
                  return (
                    <div
                      key={alert.id}
                      className="flex items-center space-x-4 p-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg ${levelConf.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <AlertTriangle className={`w-4 h-4 ${levelConf.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white truncate">
                            {isZh ? alert.title.zh : alert.title.en}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${levelConf.bg} ${levelConf.color} flex-shrink-0`}
                          >
                            {isZh ? levelConf.label.zh : levelConf.label.en}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {alert.target} · {alert.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Credit Rating Tab */}
      {activeTab === 'credit' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={isZh ? '搜索企业名称...' : 'Search company...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CREDIT_RATINGS.filter(
              (c) => searchTerm === '' || c.company.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((cr) => {
              const usagePercent = Math.round((cr.usedCredit / cr.creditLimit) * 100);
              return (
                <div
                  key={cr.id}
                  className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-white">{cr.company}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300">
                          {cr.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {isZh ? '更新于' : 'Updated'} {cr.lastUpdated}
                      </p>
                    </div>
                    <div className="text-center">
                      <div
                        className={`w-14 h-14 rounded-xl ${getScoreBg(cr.score)} flex items-center justify-center border border-white/10`}
                      >
                        <span className={`text-xl ${getScoreColor(cr.score)}`}>{cr.score}</span>
                      </div>
                      <span className={`text-xs mt-1 ${getScoreColor(cr.score)}`}>{cr.level}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '信用额度' : 'Credit Limit'}</p>
                      <p className="text-sm text-white">{formatMoney(cr.creditLimit)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '账期天数' : 'Payment Days'}</p>
                      <p className="text-sm text-white">
                        {cr.paymentDays}
                        {isZh ? '天' : 'd'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '逾期率' : 'Overdue Rate'}</p>
                      <p
                        className={`text-sm ${cr.overdueRate > 10 ? 'text-red-400' : cr.overdueRate > 5 ? 'text-amber-400' : 'text-emerald-400'}`}
                      >
                        {cr.overdueRate}%
                      </p>
                    </div>
                  </div>

                  {/* Credit Usage Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{isZh ? '额度使用' : 'Credit Usage'}</span>
                      <span
                        className={`${usagePercent > 90 ? 'text-red-400' : usagePercent > 70 ? 'text-amber-400' : 'text-white'}`}
                      >
                        {usagePercent}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700/40 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{formatMoney(cr.usedCredit)}</span>
                      <span className="text-xs text-gray-500">{formatMoney(cr.creditLimit)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center space-x-1">
                      {cr.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                      {cr.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                      {cr.trend === 'stable' && <Activity className="w-3 h-3 text-gray-400" />}
                      <span
                        className={`text-xs ${cr.trend === 'up' ? 'text-emerald-400' : cr.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}
                      >
                        {cr.trend === 'up'
                          ? isZh
                            ? '评分上升'
                            : 'Improving'
                          : cr.trend === 'down'
                            ? isZh
                              ? '评分下降'
                              : 'Declining'
                            : isZh
                              ? '评分稳定'
                              : 'Stable'}
                      </span>
                    </div>
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      {isZh ? '查看详情' : 'Details'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-3">
          {RISK_ALERTS.map((alert) => {
            const levelConf = LEVEL_CONFIG[alert.level];
            const statusLabel =
              alert.status === 'active'
                ? isZh
                  ? '待处理'
                  : 'Active'
                : alert.status === 'resolved'
                  ? isZh
                    ? '已解决'
                    : 'Resolved'
                  : isZh
                    ? '监控中'
                    : 'Monitoring';
            const statusColor =
              alert.status === 'active'
                ? 'text-red-400 bg-red-500/20'
                : alert.status === 'resolved'
                  ? 'text-emerald-400 bg-emerald-500/20'
                  : 'text-amber-400 bg-amber-500/20';

            return (
              <div
                key={alert.id}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 hover:border-white/10 transition-all ${
                  alert.level === 'critical' && alert.status === 'active'
                    ? 'border-red-500/30'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${levelConf.bg} flex items-center justify-center`}
                    >
                      <AlertTriangle className={`w-5 h-5 ${levelConf.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white">{isZh ? alert.title.zh : alert.title.en}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${levelConf.bg} ${levelConf.color}`}
                        >
                          {isZh ? levelConf.label.zh : levelConf.label.en}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {alert.category} · {alert.target} · {alert.time}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>
                <p className="text-sm text-gray-400 ml-13 pl-13">{alert.description}</p>
                {alert.status === 'active' && (
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all">
                      {isZh ? '立即处理' : 'Handle Now'}
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-slate-700/50 text-gray-300 hover:bg-slate-700/70 transition-all">
                      {isZh ? '转为监控' : 'Monitor'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Risk Radar */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '企业风险雷达' : 'Enterprise Risk Radar'}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <RadarChart data={RISK_RADAR}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Radar
                    name={isZh ? '风险评分' : 'Risk Score'}
                    dataKey="score"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15,23,42,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="w-5 h-5 text-red-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '应收风险敞口' : 'AR Risk Exposure'}
                </span>
              </div>
              <p className="text-2xl text-white">¥ 1,285{isZh ? '万' : '0K'}</p>
              <p className="text-xs text-red-400 mt-1">
                +12.5% {isZh ? '较上月' : 'vs last month'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '平均风险响应' : 'Avg Response Time'}
                </span>
              </div>
              <p className="text-2xl text-white">4.2 {isZh ? '小时' : 'hours'}</p>
              <p className="text-xs text-emerald-400 mt-1">
                -1.5h {isZh ? '较上月' : 'vs last month'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? 'AI预测准确率' : 'AI Prediction Accuracy'}
                </span>
              </div>
              <p className="text-2xl text-white">92.3%</p>
              <p className="text-xs text-emerald-400 mt-1">
                +2.1% {isZh ? '较上月' : 'vs last month'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
