import React, { useState } from 'react';
import {
  UserPlus,
  Plus,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  Search,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  ExternalLink,
  Eye,
  MousePointer,
  Share2,
  Megaphone,
  DollarSign,
  Clock,
  CheckCircle2,
  Star
} from 'lucide-react';
import {
  AreaChart,
  Area,
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
  Radar
} from 'recharts';

interface SmartAcquisitionProps {
  currentLanguage: string;
}

type TabType = 'overview' | 'channels' | 'campaigns' | 'funnel';

// 渠道数据
const CHANNEL_DATA = [
  {
    id: 'website', name: '官网', icon: Globe, color: '#3b82f6',
    visitors: 12580, leads: 342, conversion: 2.72, cost: 18500, costPerLead: 54.1,
    trend: '+15.3%', trendUp: true
  },
  {
    id: 'wechat', name: '微信生态', icon: MessageSquare, color: '#22c55e',
    visitors: 8920, leads: 267, conversion: 2.99, cost: 12000, costPerLead: 44.9,
    trend: '+22.8%', trendUp: true
  },
  {
    id: 'exhibition', name: '行业展会', icon: Users, color: '#f59e0b',
    visitors: 1850, leads: 156, conversion: 8.43, cost: 85000, costPerLead: 544.9,
    trend: '+5.2%', trendUp: true
  },
  {
    id: 'telemarketing', name: '电话拓展', icon: Phone, color: '#8b5cf6',
    visitors: 3200, leads: 98, conversion: 3.06, cost: 22000, costPerLead: 224.5,
    trend: '-3.1%', trendUp: false
  },
  {
    id: 'referral', name: '客户转介绍', icon: Share2, color: '#ec4899',
    visitors: 680, leads: 89, conversion: 13.09, cost: 5000, costPerLead: 56.2,
    trend: '+31.5%', trendUp: true
  },
  {
    id: 'sem', name: 'SEM竞价', icon: Search, color: '#06b6d4',
    visitors: 15600, leads: 198, conversion: 1.27, cost: 45000, costPerLead: 227.3,
    trend: '+8.7%', trendUp: true
  },
  {
    id: 'email', name: '邮件营销', icon: Mail, color: '#6366f1',
    visitors: 4500, leads: 67, conversion: 1.49, cost: 3500, costPerLead: 52.2,
    trend: '-1.2%', trendUp: false
  },
  {
    id: 'ads', name: '信息流广告', icon: Megaphone, color: '#f97316',
    visitors: 22000, leads: 312, conversion: 1.42, cost: 68000, costPerLead: 217.9,
    trend: '+12.4%', trendUp: true
  },
];

const MONTHLY_LEADS_DATA = [
  { month: '10月', website: 280, wechat: 180, exhibition: 120, other: 150 },
  { month: '11月', website: 310, wechat: 210, exhibition: 85, other: 160 },
  { month: '12月', website: 295, wechat: 230, exhibition: 140, other: 175 },
  { month: '1月', website: 320, wechat: 250, exhibition: 95, other: 185 },
  { month: '2月', website: 335, wechat: 260, exhibition: 110, other: 195 },
  { month: '3月', website: 342, wechat: 267, exhibition: 156, other: 200 },
];

const FUNNEL_DATA = [
  { stage: '访客', count: 69330, rate: '100%', color: '#3b82f6' },
  { stage: '注册/询价', count: 5280, rate: '7.6%', color: '#6366f1' },
  { stage: '有效线索', count: 1529, rate: '2.2%', color: '#8b5cf6' },
  { stage: '商机', count: 486, rate: '0.7%', color: '#a855f7' },
  { stage: '报价', count: 215, rate: '0.31%', color: '#d946ef' },
  { stage: '成交', count: 68, rate: '0.098%', color: '#ec4899' },
];

const CAMPAIGN_LIST = [
  {
    id: 'C001', name: '2026年中国废金属回收展', type: '线下展会', status: 'active',
    startDate: '2026-03-20', endDate: '2026-03-23', budget: 120000, spent: 85000,
    leads: 0, target: 200, roi: null
  },
  {
    id: 'C002', name: '废铜行情分析白皮书', type: '内容营销', status: 'active',
    startDate: '2026-02-15', endDate: '2026-04-15', budget: 8000, spent: 6500,
    leads: 156, target: 200, roi: 3.8
  },
  {
    id: 'C003', name: '春季采购季百度竞价', type: 'SEM投放', status: 'active',
    startDate: '2026-03-01', endDate: '2026-03-31', budget: 50000, spent: 32000,
    leads: 142, target: 250, roi: 2.1
  },
  {
    id: 'C004', name: '微信视频号系列短片', type: '社交媒体', status: 'active',
    startDate: '2026-01-10', endDate: '2026-06-30', budget: 25000, spent: 12000,
    leads: 89, target: 300, roi: 4.2
  },
  {
    id: 'C005', name: '老客户推荐有礼活动', type: '转介绍', status: 'completed',
    startDate: '2026-01-01', endDate: '2026-02-28', budget: 15000, spent: 14200,
    leads: 67, target: 50, roi: 5.6
  },
  {
    id: 'C006', name: '行业邮件精准推送', type: '邮件营销', status: 'paused',
    startDate: '2026-02-01', endDate: '2026-03-31', budget: 5000, spent: 3200,
    leads: 34, target: 80, roi: 1.8
  },
];

const CHANNEL_QUALITY_RADAR = [
  { metric: '线索量', website: 85, wechat: 70, exhibition: 40, referral: 25 },
  { metric: '转化率', website: 45, wechat: 55, exhibition: 90, referral: 95 },
  { metric: '客单价', website: 60, wechat: 55, exhibition: 85, referral: 80 },
  { metric: '获客成本', website: 90, wechat: 85, exhibition: 20, referral: 95 },
  { metric: '成交周期', website: 50, wechat: 60, exhibition: 75, referral: 85 },
  { metric: '复购率', website: 40, wechat: 50, exhibition: 70, referral: 90 },
];

const ROI_TREND_DATA = [
  { month: '10月', roi: 2.1 },
  { month: '11月', roi: 2.4 },
  { month: '12月', roi: 2.8 },
  { month: '1月', roi: 3.1 },
  { month: '2月', roi: 3.5 },
  { month: '3月', roi: 3.2 },
];

export function SmartAcquisition({ currentLanguage }: SmartAcquisitionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'overview' as TabType, label: { en: 'Overview', zh: '总览' }, icon: BarChart3 },
    { id: 'channels' as TabType, label: { en: 'Channels', zh: '渠道分析' }, icon: Share2 },
    { id: 'campaigns' as TabType, label: { en: 'Campaigns', zh: '营销活动' }, icon: Megaphone },
    { id: 'funnel' as TabType, label: { en: 'Funnel', zh: '转化漏斗' }, icon: Activity },
  ];

  const totalLeads = CHANNEL_DATA.reduce((s, c) => s + c.leads, 0);
  const totalCost = CHANNEL_DATA.reduce((s, c) => s + c.cost, 0);
  const avgCostPerLead = totalCost / totalLeads;
  const avgConversion = (totalLeads / CHANNEL_DATA.reduce((s, c) => s + c.visitors, 0) * 100).toFixed(2);

  const formatMoney = (v: number) => v >= 10000 ? `¥${(v / 10000).toFixed(1)}万` : `¥${v.toLocaleString()}`;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-fuchsia-500/20">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '智能获客' : 'Smart Acquisition'}</h1>
            <p className="text-sm text-gray-400">{isZh ? '多渠道获客分析与营销管理' : 'Multi-channel acquisition analytics & campaign management'}</p>
          </div>
        </div>
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
                  ? 'bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 text-white border border-fuchsia-500/30'
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
              { label: isZh ? '本月新增线索' : 'New Leads', value: totalLeads.toLocaleString(), trend: '+18.5%', up: true, icon: Target, gradient: 'from-fuchsia-500 to-pink-500' },
              { label: isZh ? '平均获客成本' : 'Avg. CAC', value: `¥${avgCostPerLead.toFixed(0)}`, trend: '-8.2%', up: true, icon: DollarSign, gradient: 'from-emerald-500 to-green-500' },
              { label: isZh ? '综合转化率' : 'Overall CVR', value: `${avgConversion}%`, trend: '+0.35%', up: true, icon: TrendingUp, gradient: 'from-blue-500 to-cyan-500' },
              { label: isZh ? '营销ROI' : 'Marketing ROI', value: '3.2x', trend: '+0.4x', up: true, icon: Zap, gradient: 'from-amber-500 to-orange-500' },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}>
                      <StatIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-1">
                    {stat.up ? <ArrowUpRight className="w-3 h-3 text-emerald-400" /> : <ArrowDownRight className="w-3 h-3 text-red-400" />}
                    <span className={`text-xs ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>{stat.trend}</span>
                    <span className="text-xs text-gray-500">{isZh ? '较上月' : 'vs last month'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Leads Trend */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '各渠道线索月度趋势' : 'Monthly Leads by Channel'}</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={MONTHLY_LEADS_DATA}>
                    <defs>
                      <linearGradient id="webGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wxGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="website" stroke="#3b82f6" fill="url(#webGrad)" strokeWidth={2} name={isZh ? '官网' : 'Website'} />
                    <Area type="monotone" dataKey="wechat" stroke="#22c55e" fill="url(#wxGrad)" strokeWidth={2} name={isZh ? '微信' : 'WeChat'} />
                    <Area type="monotone" dataKey="exhibition" stroke="#f59e0b" fill="transparent" strokeWidth={2} name={isZh ? '展会' : 'Exhibition'} />
                    <Area type="monotone" dataKey="other" stroke="#8b5cf6" fill="transparent" strokeWidth={2} name={isZh ? '其他' : 'Other'} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Channel Quality Radar */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '渠道质量雷达图' : 'Channel Quality Radar'}</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <RadarChart data={CHANNEL_QUALITY_RADAR}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Radar name={isZh ? '官网' : 'Website'} dataKey="website" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name={isZh ? '微信' : 'WeChat'} dataKey="wechat" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} />
                    <Radar name={isZh ? '展会' : 'Exhibition'} dataKey="exhibition" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                    <Radar name={isZh ? '转介绍' : 'Referral'} dataKey="referral" stroke="#ec4899" fill="#ec4899" fillOpacity={0.1} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ROI Trend */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '营销ROI趋势' : 'Marketing ROI Trend'}</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <LineChart data={ROI_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Line type="monotone" dataKey="roi" stroke="#d946ef" strokeWidth={3} dot={{ fill: '#d946ef', r: 5, strokeWidth: 2, stroke: '#1e293b' }} name="ROI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === 'channels' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHANNEL_DATA.map(ch => {
              const ChIcon = ch.icon;
              return (
                <div key={ch.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ch.color}20` }}>
                        <ChIcon className="w-5 h-5" style={{ color: ch.color }} />
                      </div>
                      <span className="text-white">{ch.name}</span>
                    </div>
                    <div className={`flex items-center space-x-1 text-xs ${ch.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                      {ch.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>{ch.trend}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '访客' : 'Visitors'}</p>
                      <p className="text-lg text-white">{ch.visitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '线索' : 'Leads'}</p>
                      <p className="text-lg text-white">{ch.leads}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '转化率' : 'CVR'}</p>
                      <p className="text-sm text-white">{ch.conversion}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '单线索成本' : 'CPL'}</p>
                      <p className="text-sm text-white">¥{ch.costPerLead.toFixed(0)}</p>
                    </div>
                  </div>

                  {/* Mini bar */}
                  <div className="mt-4 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(ch.conversion * 10, 100)}%`, backgroundColor: ch.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">{isZh ? `共 ${CAMPAIGN_LIST.length} 个营销活动` : `${CAMPAIGN_LIST.length} campaigns`}</p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-500/20 text-fuchsia-300 rounded-xl border border-fuchsia-500/30 hover:bg-fuchsia-500/30 transition-all text-sm">
              <Plus className="w-4 h-4" />
              <span>{isZh ? '新建活动' : 'New Campaign'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {CAMPAIGN_LIST.map(camp => {
              const progress = camp.target > 0 ? Math.round((camp.leads / camp.target) * 100) : 0;
              const budgetUsed = camp.budget > 0 ? Math.round((camp.spent / camp.budget) * 100) : 0;
              const statusColors: Record<string, { text: string; bg: string }> = {
                active: { text: 'text-emerald-400', bg: 'bg-emerald-500/20' },
                completed: { text: 'text-blue-400', bg: 'bg-blue-500/20' },
                paused: { text: 'text-amber-400', bg: 'bg-amber-500/20' },
              };
              const sc = statusColors[camp.status] || statusColors.active;

              return (
                <div key={camp.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-white">{camp.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                          {camp.status === 'active' ? (isZh ? '进行中' : 'Active') : camp.status === 'completed' ? (isZh ? '已结束' : 'Completed') : (isZh ? '已暂停' : 'Paused')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{camp.type} · {camp.startDate} ~ {camp.endDate}</p>
                    </div>
                    {camp.roi !== null && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">ROI</p>
                        <p className={`text-lg ${camp.roi >= 3 ? 'text-emerald-400' : camp.roi >= 2 ? 'text-amber-400' : 'text-red-400'}`}>{camp.roi}x</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '预算' : 'Budget'}</p>
                      <p className="text-sm text-white">{formatMoney(camp.budget)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '已花费' : 'Spent'}</p>
                      <p className="text-sm text-white">{formatMoney(camp.spent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '获得线索' : 'Leads'}</p>
                      <p className="text-sm text-white">{camp.leads} / {camp.target}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '单线索成本' : 'CPL'}</p>
                      <p className="text-sm text-white">{camp.leads > 0 ? `¥${Math.round(camp.spent / camp.leads)}` : '-'}</p>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">{isZh ? '线索目标' : 'Lead Target'}</span>
                        <span className="text-white">{progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500" style={{ width: `${Math.min(progress, 100)}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">{isZh ? '预算使用' : 'Budget Usage'}</span>
                        <span className="text-white">{budgetUsed}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${budgetUsed > 90 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(budgetUsed, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Funnel Tab */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          {/* Visual Funnel */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <h3 className="text-white mb-6">{isZh ? '全渠道转化漏斗' : 'Full Channel Conversion Funnel'}</h3>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FUNNEL_DATA.map((stage, idx) => {
                const widthPercent = 100 - idx * 14;
                return (
                  <div key={stage.stage} className="flex items-center space-x-4">
                    <div className="w-20 text-right">
                      <span className="text-sm text-gray-400">{stage.stage}</span>
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="h-12 rounded-xl flex items-center justify-between px-4 transition-all"
                        style={{
                          width: `${widthPercent}%`,
                          background: `linear-gradient(135deg, ${stage.color}30, ${stage.color}15)`,
                          border: `1px solid ${stage.color}40`,
                        }}
                      >
                        <span className="text-white text-sm">{stage.count.toLocaleString()}</span>
                        <span className="text-xs" style={{ color: stage.color }}>{stage.rate}</span>
                      </div>
                    </div>
                    {idx < FUNNEL_DATA.length - 1 && (
                      <div className="w-16 text-center">
                        <span className="text-xs text-gray-500">
                          {((FUNNEL_DATA[idx + 1].count / stage.count) * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Funnel Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">{isZh ? '平均转化周期' : 'Avg. Conversion Time'}</span>
              </div>
              <p className="text-2xl text-white">23 {isZh ? '天' : 'days'}</p>
              <p className="text-xs text-emerald-400 mt-1">-3 {isZh ? '天较上月' : 'days vs last month'}</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">{isZh ? '最优渠道' : 'Best Channel'}</span>
              </div>
              <p className="text-2xl text-white">{isZh ? '客户转介绍' : 'Referral'}</p>
              <p className="text-xs text-gray-500 mt-1">{isZh ? '转化率 13.09%' : 'CVR 13.09%'}</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">{isZh ? '本月成交额' : 'Monthly Revenue'}</span>
              </div>
              <p className="text-2xl text-white">¥ 856{isZh ? '万' : '0K'}</p>
              <p className="text-xs text-emerald-400 mt-1">+28.3% {isZh ? '较上月' : 'vs last month'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}