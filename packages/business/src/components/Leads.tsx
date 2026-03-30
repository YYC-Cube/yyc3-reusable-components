import React, { useState } from 'react';
import {
  Target,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  TrendingUp,
  ArrowRight,
  Star,
  StarOff,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Zap,
  BarChart3,
  Users,
  DollarSign,
  Activity,
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

interface LeadsProps {
  currentLanguage: string;
}

type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
type TabType = 'pipeline' | 'list' | 'analytics';

interface Lead {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  source: { en: string; zh: string };
  stage: LeadStage;
  value: number;
  probability: number;
  assignee: string;
  lastActivity: string;
  createdAt: string;
  tags: string[];
  starred: boolean;
  notes: string;
}

const MOCK_LEADS: Lead[] = [
  {
    id: 'LD-001',
    company: '山东齐鲁钢铁集团',
    contact: '王建国',
    phone: '138-6612-3456',
    email: 'wang@qilusteel.cn',
    source: { en: 'Exhibition', zh: '展会' },
    stage: 'negotiation',
    value: 5200000,
    probability: 75,
    assignee: '张伟',
    lastActivity: '2小时前',
    createdAt: '2026-01-15',
    tags: ['大客户', '钢铁'],
    starred: true,
    notes: '客户对废钢HMS1号需求量大，月均采购约500吨',
  },
  {
    id: 'LD-002',
    company: 'Hyundai Metal Trading Co.',
    contact: 'Kim Sung-ho',
    phone: '+82-2-1234-5678',
    email: 'kim@hyundaimetals.kr',
    source: { en: 'Referral', zh: '转介绍' },
    stage: 'proposal',
    value: 8800000,
    probability: 60,
    assignee: '李娜',
    lastActivity: '1天前',
    createdAt: '2026-02-01',
    tags: ['国际', '韩国', '铜'],
    starred: true,
    notes: '韩国客户，对废铜和铝合金有长期需求',
  },
  {
    id: 'LD-003',
    company: '江苏华鑫新材料',
    contact: '陈明',
    phone: '139-1234-5678',
    email: 'chen@huaxinnew.cn',
    source: { en: 'Website', zh: '官网' },
    stage: 'qualified',
    value: 3500000,
    probability: 45,
    assignee: '王强',
    lastActivity: '3天前',
    createdAt: '2026-02-10',
    tags: ['铝合金', '新客户'],
    starred: false,
    notes: '通过官网询价，主要需求铝合金废料',
  },
  {
    id: 'LD-004',
    company: '福建三钢集团',
    contact: '林志强',
    phone: '136-8888-9999',
    email: 'lin@sansteel.cn',
    source: { en: 'Cold Call', zh: '电话拓展' },
    stage: 'contacted',
    value: 2100000,
    probability: 25,
    assignee: '赵磊',
    lastActivity: '5天前',
    createdAt: '2026-02-20',
    tags: ['钢铁', '福建'],
    starred: false,
    notes: '初次接触，已发送公司介绍材料',
  },
  {
    id: 'LD-005',
    company: '深圳宝安废旧物资回收',
    contact: '刘芳',
    phone: '135-6666-7777',
    email: 'liu@baoan-recycle.cn',
    source: { en: 'WeChat', zh: '微信' },
    stage: 'new',
    value: 1500000,
    probability: 15,
    assignee: '陈芳',
    lastActivity: '1周前',
    createdAt: '2026-03-01',
    tags: ['回收', '深圳'],
    starred: false,
    notes: '微信咨询废铜回收价格',
  },
  {
    id: 'LD-006',
    company: 'PT Indo Copper Trading',
    contact: 'Budi Santoso',
    phone: '+62-21-555-0123',
    email: 'budi@indocopper.id',
    source: { en: 'Exhibition', zh: '展会' },
    stage: 'won',
    value: 12000000,
    probability: 100,
    assignee: '张伟',
    lastActivity: '2天前',
    createdAt: '2025-12-10',
    tags: ['国际', '印尼', '铜', '大客户'],
    starred: true,
    notes: '已签约，年度框架协议1200万',
  },
  {
    id: 'LD-007',
    company: '河北冀东钢材',
    contact: '马超',
    phone: '137-5555-6666',
    email: 'ma@jidongsteel.cn',
    source: { en: 'Referral', zh: '转介绍' },
    stage: 'lost',
    value: 4000000,
    probability: 0,
    assignee: '李娜',
    lastActivity: '2周前',
    createdAt: '2026-01-05',
    tags: ['钢材', '已流失'],
    starred: false,
    notes: '客户选择了竞争对手，价格因素',
  },
];

const STAGE_CONFIG: Record<
  LeadStage,
  { label: { en: string; zh: string }; color: string; bg: string }
> = {
  new: { label: { en: 'New', zh: '新线索' }, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  contacted: {
    label: { en: 'Contacted', zh: '已联系' },
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
  },
  qualified: {
    label: { en: 'Qualified', zh: '已确认' },
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/20',
  },
  proposal: {
    label: { en: 'Proposal', zh: '已报价' },
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
  },
  negotiation: {
    label: { en: 'Negotiation', zh: '谈判中' },
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
  },
  won: { label: { en: 'Won', zh: '已成交' }, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  lost: { label: { en: 'Lost', zh: '已流失' }, color: 'text-red-400', bg: 'bg-red-500/20' },
};

const CONVERSION_DATA = [
  { stage: '新线索', count: 45, rate: 100 },
  { stage: '已联系', count: 32, rate: 71 },
  { stage: '已确认', count: 22, rate: 49 },
  { stage: '已报价', count: 15, rate: 33 },
  { stage: '谈判中', count: 10, rate: 22 },
  { stage: '已成交', count: 7, rate: 16 },
];

const SOURCE_DATA = [
  { name: '展会', value: 30, color: '#6366f1' },
  { name: '官网', value: 22, color: '#10b981' },
  { name: '转介绍', value: 25, color: '#f59e0b' },
  { name: '微信', value: 15, color: '#8b5cf6' },
  { name: '电话拓展', value: 8, color: '#ef4444' },
];

export function Leads({ currentLanguage }: LeadsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'pipeline' as TabType, label: { en: 'Pipeline', zh: '销售漏斗' }, icon: Activity },
    { id: 'list' as TabType, label: { en: 'Lead List', zh: '线索列表' }, icon: Users },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '转化分析' }, icon: BarChart3 },
  ];

  const activePipeline = [
    'new',
    'contacted',
    'qualified',
    'proposal',
    'negotiation',
  ] as LeadStage[];

  const formatAmount = (amount: number) => {
    if (amount >= 10000) return `¥${(amount / 10000).toFixed(0)}万`;
    return `¥${amount.toLocaleString()}`;
  };

  const totalPipelineValue = MOCK_LEADS.filter((l) => !['won', 'lost'].includes(l.stage)).reduce(
    (sum, l) => sum + l.value * (l.probability / 100),
    0
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-violet-500/20">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '线索管理' : 'Lead Management'}</h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? `管道总价值: ${formatAmount(totalPipelineValue)} (加权)`
                : `Pipeline Value: ${formatAmount(totalPipelineValue)} (Weighted)`}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg shadow-violet-500/25">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '新建线索' : 'New Lead'}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '活跃线索' : 'Active Leads',
            value: MOCK_LEADS.filter((l) => !['won', 'lost'].includes(l.stage)).length,
            icon: Target,
            color: 'text-violet-400',
            bg: 'bg-violet-500/20',
          },
          {
            label: isZh ? '本月新增' : 'New This Month',
            value: 12,
            icon: Zap,
            color: 'text-blue-400',
            bg: 'bg-blue-500/20',
          },
          {
            label: isZh ? '已成交' : 'Won',
            value: MOCK_LEADS.filter((l) => l.stage === 'won').length,
            icon: CheckCircle2,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/20',
          },
          {
            label: isZh ? '转化率' : 'Conversion Rate',
            value: '15.6%',
            icon: TrendingUp,
            color: 'text-amber-400',
            bg: 'bg-amber-500/20',
          },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex items-center space-x-3"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <StatIcon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl text-white">{stat.value}</p>
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
                  ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-white border border-violet-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Pipeline View */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {activePipeline.map((stage) => {
            const config = STAGE_CONFIG[stage];
            const stageLeads = MOCK_LEADS.filter((l) => l.stage === stage);
            const stageValue = stageLeads.reduce((sum, l) => sum + l.value, 0);

            return (
              <div key={stage} className="space-y-3">
                {/* Column Header */}
                <div className={`p-3 rounded-xl ${config.bg} border border-white/5`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${config.color}`}>
                      {isZh ? config.label.zh : config.label.en}
                    </span>
                    <span className="text-xs text-gray-400 bg-slate-900/50 px-2 py-0.5 rounded-full">
                      {stageLeads.length}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatAmount(stageValue)}</p>
                </div>

                {/* Lead Cards */}
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-slate-800/60 backdrop-blur-xl rounded-xl border border-white/5 p-3 hover:border-white/10 transition-all cursor-pointer group"
                    onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-white truncate flex-1">{lead.company}</p>
                      {lead.starred && (
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{lead.contact}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-white">{formatAmount(lead.value)}</span>
                      <span className="text-xs text-gray-500">{lead.probability}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${config.bg.replace('/20', '/60')}`}
                        style={{ width: `${lead.probability}%` }}
                      />
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {lead.lastActivity}
                    </div>

                    {/* Expanded */}
                    {selectedLead === lead.id && (
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Phone className="w-3 h-3" /> <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Mail className="w-3 h-3" />{' '}
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <p className="text-xs text-gray-500">{lead.notes}</p>
                        <div className="flex gap-1.5 flex-wrap mt-2">
                          {lead.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-1.5 py-0.5 rounded bg-slate-700/50 text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center py-8 text-gray-600 text-xs">
                    {isZh ? '暂无线索' : 'No leads'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={isZh ? '搜索公司、联系人...' : 'Search company, contact...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
            />
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '公司/联系人' : 'Company/Contact'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '来源' : 'Source'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '阶段' : 'Stage'}
                    </th>
                    <th className="text-right text-xs text-gray-500 py-3 px-4">
                      {isZh ? '预估金额' : 'Est. Value'}
                    </th>
                    <th className="text-right text-xs text-gray-500 py-3 px-4">
                      {isZh ? '概率' : 'Prob.'}
                    </th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '负责人' : 'Assignee'}
                    </th>
                    <th className="text-right text-xs text-gray-500 py-3 px-4">
                      {isZh ? '最后活动' : 'Last Activity'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_LEADS.filter(
                    (l) =>
                      searchTerm === '' ||
                      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      l.contact.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((lead) => {
                    const config = STAGE_CONFIG[lead.stage];
                    return (
                      <tr
                        key={lead.id}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            {lead.starred && (
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            )}
                            <div>
                              <p className="text-sm text-white">{lead.company}</p>
                              <p className="text-xs text-gray-500">{lead.contact}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-400">
                          {isZh ? lead.source.zh : lead.source.en}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}
                          >
                            {isZh ? config.label.zh : config.label.en}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-sm text-white">
                          {formatAmount(lead.value)}
                        </td>
                        <td className="py-3 px-4 text-right text-sm text-gray-400">
                          {lead.probability}%
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-400">{lead.assignee}</td>
                        <td className="py-3 px-4 text-right text-xs text-gray-500">
                          {lead.lastActivity}
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

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '转化漏斗' : 'Conversion Funnel'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={CONVERSION_DATA} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      type="number"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="stage"
                      type="category"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      width={60}
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
                      dataKey="count"
                      fill="#8b5cf6"
                      radius={[0, 6, 6, 0]}
                      name={isZh ? '数量' : 'Count'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lead Source */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '线索来源分布' : 'Lead Source Distribution'}
              </h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={SOURCE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {SOURCE_DATA.map((entry, index) => (
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
                  {SOURCE_DATA.map((item, idx) => (
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
    </div>
  );
}
