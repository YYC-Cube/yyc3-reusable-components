import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Calendar, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Filter,
  Plus
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

/**
 * @file SmartSales.tsx
 * @description YYC³标准化智能销售组件
 * @author YYC³ Team
 * @version 1.0.0
 * @license MIT
 * @copyright 2024 YanYuCloudCube
 */

export interface SmartSalesProps {
  currentLanguage: string;
}

const SALES_DATA = [
  { name: 'Mon', leads: 4, sales: 2 },
  { name: 'Tue', leads: 7, sales: 3 },
  { name: 'Wed', leads: 5, sales: 2 },
  { name: 'Thu', leads: 9, sales: 5 },
  { name: 'Fri', leads: 12, sales: 7 },
  { name: 'Sat', leads: 8, sales: 4 },
  { name: 'Sun', leads: 3, sales: 1 },
];

const PIPELINE_DATA = [
  { name: 'New Leads', value: 35, color: '#60a5fa' },
  { name: 'Contacted', value: 25, color: '#a78bfa' },
  { name: 'Proposal', value: 15, color: '#f472b6' },
  { name: 'Negotiation', value: 10, color: '#fb923c' },
  { name: 'Closed', value: 15, color: '#34d399' },
];

const LEADS = [
  {
    id: 1,
    name: 'Al-Rajhi Construction',
    status: 'Negotiation',
    probability: '85%',
    value: '450,000 ﷼',
    lastContact: '2 hours ago',
    nextAction: 'Send revised contract',
    avatar: 'AR'
  },
  {
    id: 2,
    name: 'Saudi Steel Industries',
    status: 'Proposal',
    probability: '60%',
    value: '280,000 ﷼',
    lastContact: '1 day ago',
    nextAction: 'Schedule site visit',
    avatar: 'SS'
  },
  {
    id: 3,
    name: 'Riyadh Metro Project',
    status: 'New Lead',
    probability: '20%',
    value: '1,200,000 ﷼',
    lastContact: 'Just now',
    nextAction: 'Initial outreach',
    avatar: 'RM'
  },
  {
    id: 4,
    name: 'Jeddah Scrap Co.',
    status: 'Contacted',
    probability: '40%',
    value: '150,000 ﷼',
    lastContact: '3 days ago',
    nextAction: 'Follow up call',
    avatar: 'JS'
  }
];

const SmartSales = React.forwardRef<HTMLDivElement, SmartSalesProps>(
  ({ currentLanguage }, ref) => {
    const [activeTab, setActiveTab] = useState('pipeline');
    const isZh = currentLanguage === 'zh';

    return (
      <div ref={ref} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isZh ? '智能销售' : 'Smart Sales'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {isZh ? 'AI驱动的销售预测和客户管理' : 'AI-powered sales prediction and customer management'}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-medium transition-colors shadow-lg shadow-fuchsia-500/20">
            <Plus className="w-4 h-4" />
            {isZh ? '新建线索' : 'New Lead'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 rounded-xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {isZh ? '销售趋势' : 'Sales Trend'}
                </h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-sm hover:bg-slate-700 transition-colors">
                    {isZh ? '周' : 'Week'}
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-fuchsia-600/20 text-fuchsia-300 text-sm border border-fuchsia-500/30">
                    {isZh ? '月' : 'Month'}
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={SALES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff30" />
                  <YAxis stroke="#ffffff30" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Bar dataKey="leads" fill="#60a5fa" radius={[4, 4, 0, 0]} name={isZh ? '线索' : 'Leads'} />
                  <Bar dataKey="sales" fill="#a78bfa" radius={[4, 4, 0, 0]} name={isZh ? '成交' : 'Sales'} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {isZh ? '销售漏斗' : 'Sales Pipeline'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Users className="w-4 h-4" />
                  <span>85 {isZh ? '个线索' : 'leads'}</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={PIPELINE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PIPELINE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {PIPELINE_DATA.map((item) => (
                  <div key={item.name} className="text-center">
                    <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                    <p className="text-xs text-slate-400">{item.name}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {isZh ? '活跃线索' : 'Active Leads'}
                </h3>
                <button className="p-1 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <Filter className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                {LEADS.map((lead) => (
                  <div key={lead.id} className="p-4 rounded-lg bg-slate-900/40 border border-white/5 hover:border-fuchsia-500/30 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {lead.avatar}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{lead.name}</h4>
                          <p className="text-xs text-slate-400">{lead.value}</p>
                        </div>
                      </div>
                      <button className="p-1 rounded hover:bg-slate-700/50 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded ${
                          lead.status === 'New Lead' ? 'bg-blue-500/20 text-blue-300' :
                          lead.status === 'Contacted' ? 'bg-purple-500/20 text-purple-300' :
                          lead.status === 'Proposal' ? 'bg-pink-500/20 text-pink-300' :
                          lead.status === 'Negotiation' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {lead.status}
                        </span>
                        <span className="text-slate-400">{lead.probability}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{lead.lastContact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-fuchsia-900/30 to-purple-900/30 rounded-xl border border-fuchsia-500/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-fuchsia-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isZh ? 'AI 最佳行动建议' : 'AI Next Best Action'}
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-fuchsia-500/10 mb-4">
                <p className="text-sm text-slate-200 mb-2">
                  <strong>Al-Rajhi Construction</strong> is likely to close this week.
                </p>
                <div className="flex items-center text-xs text-fuchsia-300">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  <span>Win probability increased by 15%</span>
                </div>
              </div>
              <button className="w-full py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-medium transition-colors shadow-lg shadow-fuchsia-500/20">
                {isZh ? '发送提案' : 'Send Proposal'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SmartSales.displayName = 'SmartSales';

export { SmartSales };
