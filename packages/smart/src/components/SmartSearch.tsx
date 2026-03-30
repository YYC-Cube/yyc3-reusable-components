import React, { useState } from 'react';
import {
  Search,
  Brain,
  Sparkles,
  FileText,
  Users,
  Package,
  DollarSign,
  BarChart3,
  Clock,
  TrendingUp,
  Zap,
  Star,
  Eye,
  Filter,
  ArrowUpRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SmartSearchProps {
  currentLanguage: string;
}

const RECENT_SEARCHES = [
  { query: '废铜6#光亮线 报价', results: 28, time: '0.12s', type: '价格' },
  { query: '宁波精工电子 合同', results: 5, time: '0.08s', type: '客户' },
  { query: '越南TPC 供货记录', results: 12, time: '0.15s', type: '供应商' },
  { query: '3月 废铝 出库单', results: 42, time: '0.18s', type: '单据' },
  { query: '逾期应收 >30天', results: 8, time: '0.10s', type: '财务' },
];

const SEARCH_RESULTS = [
  {
    title: '废铜6#光亮线 - 今日报价',
    source: '市场数据',
    type: 'price',
    summary: '华东 ¥68,200/吨(+0.8%) | 华南 ¥68,500/吨(+0.6%) | 华北 ¥67,900/吨(+0.9%)',
    relevance: 99,
  },
  {
    title: '采购订单 PO-20260312-038',
    source: '订单系统',
    type: 'order',
    summary: '废铜6#光亮线 200吨 | 华东铜业 | ¥1,364万 | 状态：已审批',
    relevance: 95,
  },
  {
    title: '库存明细 - 废铜6#光亮线',
    source: '仓储系统',
    type: 'inventory',
    summary: '当前库存 85吨(A仓) + 32吨(B仓) = 117吨 | 安全库存 50吨',
    relevance: 92,
  },
  {
    title: '华东铜业 - 供应商档案',
    source: 'CRM',
    type: 'supplier',
    summary: '信用AAA | Q1供货568吨 | 准时率98.5% | 合作3年',
    relevance: 88,
  },
  {
    title: 'LME铜价分析报告 - 2026年3月',
    source: '智能分析',
    type: 'report',
    summary: 'AI预测：短期震荡偏强，3月20-25日可能回调2-3%',
    relevance: 85,
  },
];

const HOT_QUERIES = [
  { query: '今日铜价', count: 156 },
  { query: '逾期客户', count: 89 },
  { query: '库存预警', count: 72 },
  { query: '待审批订单', count: 65 },
  { query: '月度报表', count: 58 },
  { query: '供应商评级', count: 45 },
];

const SEARCH_TREND = [
  { hour: '08', count: 45 },
  { hour: '09', count: 128 },
  { hour: '10', count: 156 },
  { hour: '11', count: 112 },
  { hour: '12', count: 68 },
  { hour: '13', count: 95 },
  { hour: '14', count: 142 },
];

export function SmartSearch({ currentLanguage }: SmartSearchProps) {
  const [searchQuery, setSearchQuery] = useState('废铜6#光亮线 报价');
  const [showResults, setShowResults] = useState(true);
  const isZh = currentLanguage === 'zh';

  const typeConf: Record<string, { color: string; bg: string }> = {
    price: { color: 'text-amber-400', bg: 'bg-amber-500/20' },
    order: { color: 'text-blue-400', bg: 'bg-blue-500/20' },
    inventory: { color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    supplier: { color: 'text-purple-400', bg: 'bg-purple-500/20' },
    report: { color: 'text-pink-400', bg: 'bg-pink-500/20' },
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-fuchsia-500/20">
          <Search className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl text-white flex items-center space-x-2">
            <span>{isZh ? '智能搜索' : 'Smart Search'}</span>
            <Sparkles className="w-5 h-5 text-fuchsia-400 animate-pulse" />
          </h1>
          <p className="text-sm text-gray-400">
            {isZh
              ? 'AI语义搜索·跨模块检索·智能推荐'
              : 'AI semantic search · Cross-module · Smart recommend'}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-fuchsia-500/20 p-4 shadow-lg shadow-fuchsia-500/5">
        <div className="flex items-center space-x-3">
          <Search className="w-5 h-5 text-fuchsia-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isZh
                ? '搜索客户、订单、产品、文档、报表...'
                : 'Search customers, orders, products, docs, reports...'
            }
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          />
          <Brain className="w-5 h-5 text-fuchsia-400" />
          <span className="text-xs text-gray-500">AI</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {HOT_QUERIES.map((h, i) => (
            <button
              key={i}
              onClick={() => setSearchQuery(h.query)}
              className="text-xs px-3 py-1 rounded-full bg-slate-700/30 text-gray-400 hover:text-white border border-white/5 hover:border-fuchsia-500/20 transition-all"
            >
              🔥 {h.query} <span className="text-gray-600">({h.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            {isZh
              ? `找到 ${SEARCH_RESULTS.length} 个结果 (0.12秒)`
              : `Found ${SEARCH_RESULTS.length} results (0.12s)`}
          </p>
          {SEARCH_RESULTS.map((r, i) => {
            const tc = typeConf[r.type] || { color: 'text-gray-400', bg: 'bg-gray-500/20' };
            return (
              <div
                key={i}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 hover:border-fuchsia-500/20 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white text-sm">{r.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>
                        {r.source}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{r.summary}</p>
                  </div>
                  <span className="text-xs text-fuchsia-400">{r.relevance}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '今日搜索趋势' : 'Today Search Trend'}</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={SEARCH_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
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
                  dataKey="count"
                  fill="#d946ef"
                  name={isZh ? '搜索量' : 'Searches'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '最近搜索记录' : 'Recent Searches'}</h3>
          <div className="space-y-2">
            {RECENT_SEARCHES.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30 border border-white/5 cursor-pointer hover:border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <Search className="w-3 h-3 text-gray-500" />
                  <span className="text-sm text-gray-300">{s.query}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>
                    {s.results}
                    {isZh ? '结果' : ' results'}
                  </span>
                  <span>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
