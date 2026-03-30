import React, { useState } from 'react';
import {
  ThumbsUp, Brain, Sparkles, TrendingUp, Users, Package, Target,
  Star, ArrowUpRight, ArrowDownRight, CheckCircle2, Clock, Eye,
  ShoppingCart, Zap, BarChart3, Filter, RefreshCw, Layers, Heart
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface SmartRecommendationProps {
  currentLanguage: string;
}

type TabType = 'supplier' | 'product' | 'customer' | 'settings';

interface SupplierRec {
  id: string;
  name: string;
  category: string;
  matchScore: number;
  priceIndex: number;
  qualityScore: number;
  deliveryScore: number;
  creditRating: string;
  region: string;
  reason: string;
  savings: string;
}

const SUPPLIER_RECS: SupplierRec[] = [
  { id: 'S001', name: '华东铜业集团', category: '废铜', matchScore: 96, priceIndex: 88, qualityScore: 94, deliveryScore: 92, creditRating: 'AAA', region: '浙江', reason: 'Q1交货准时率98.5%，铜含量稳定>99.2%，历史合作满意度最高', savings: '¥12.8万/月' },
  { id: 'S002', name: '广州再生资源', category: '废铝', matchScore: 93, priceIndex: 91, qualityScore: 89, deliveryScore: 95, creditRating: 'AA', region: '广东', reason: '华南地区物流成本最低，铝合金品类齐全，支持月结90天', savings: '¥8.5万/月' },
  { id: 'S003', name: '江苏鑫达金属', category: '不锈钢', matchScore: 89, priceIndex: 85, qualityScore: 92, deliveryScore: 87, creditRating: 'AA', region: '江苏', reason: '304/316不锈钢专供，AI质检合格率99.1%，可定制分拣', savings: '¥6.2万/月' },
  { id: 'S004', name: '越南TPC金属', category: '废铜', matchScore: 87, priceIndex: 95, qualityScore: 86, deliveryScore: 82, creditRating: 'A', region: '越南', reason: '进口铜价低于国内12%，LME挂钩定价，Q2扩产800吨/月', savings: '¥22.5万/月' },
  { id: 'S005', name: '山东恒信再生', category: '废铁', matchScore: 85, priceIndex: 90, qualityScore: 88, deliveryScore: 90, creditRating: 'AA', region: '山东', reason: '华北物流便捷，大宗废铁供应稳定，可承接1000吨/月', savings: '¥5.8万/月' },
];

const PRODUCT_RECS = [
  { id: 'P001', name: '高纯度废铜线 (>99.5%)', demand: '高', trend: 'up', confidence: 94, targetClients: 8, reason: 'Q2电子产业需求预测增长18%，库存可覆盖60天' },
  { id: 'P002', name: '6061铝合金废料', demand: '高', trend: 'up', confidence: 91, targetClients: 5, reason: '新能源汽车铝合金需求激增，供不应求持续至Q3' },
  { id: 'P003', name: '304不锈钢边角料', demand: '中', trend: 'stable', confidence: 87, targetClients: 12, reason: '餐饮设备制造稳定需求，建议维持当前库存水位' },
  { id: 'P004', name: '镀锡废铜', demand: '低', trend: 'down', confidence: 82, targetClients: 3, reason: '短期需求下降，建议降低采购量，关注环保政策变化' },
];

const CUSTOMER_RECS = [
  { id: 'C001', name: '宁波精工电子', potential: '高', ltv: '¥580万/年', crossSell: '废铝→废铜', churnRisk: 12, action: '推荐高纯度废铜线，可提升客单价35%' },
  { id: 'C002', name: '东莞鑫达制造', potential: '高', ltv: '¥320万/年', crossSell: '废铜→不锈钢', churnRisk: 8, action: '客户近期询价不锈钢，建议主动推送304报价' },
  { id: 'C003', name: '上海汇丰回收', potential: '中', ltv: '¥180万/年', crossSell: '-', churnRisk: 45, action: '流失预警！近30天无交互，建议安排客户经理回访' },
  { id: 'C004', name: '苏州联合金属', potential: '中', ltv: '¥250万/年', crossSell: '废铁→废铝', churnRisk: 18, action: '新能源项目需大量铝合金，可绑定长期协议' },
];

const MATCH_RADAR = [
  { dimension: '价格', A: 88, B: 95, fullMark: 100 },
  { dimension: '质量', A: 94, B: 86, fullMark: 100 },
  { dimension: '交期', A: 92, B: 82, fullMark: 100 },
  { dimension: '服务', A: 90, B: 78, fullMark: 100 },
  { dimension: '信用', A: 96, B: 85, fullMark: 100 },
  { dimension: '稳定性', A: 91, B: 80, fullMark: 100 },
];

const ENGINE_PIE = [
  { name: '协同过滤', value: 35, color: '#3b82f6' },
  { name: '内容匹配', value: 28, color: '#22c55e' },
  { name: '知识图谱', value: 22, color: '#8b5cf6' },
  { name: '实时特征', value: 15, color: '#f59e0b' },
];

export function SmartRecommendation({ currentLanguage }: SmartRecommendationProps) {
  const [activeTab, setActiveTab] = useState<TabType>('supplier');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'supplier' as TabType, label: { en: 'Supplier Match', zh: '供应商匹配' }, icon: Users },
    { id: 'product' as TabType, label: { en: 'Product Rec', zh: '产品推荐' }, icon: Package },
    { id: 'customer' as TabType, label: { en: 'Customer Insight', zh: '客户洞察' }, icon: Target },
    { id: 'settings' as TabType, label: { en: 'Engine', zh: '推荐引擎' }, icon: Brain },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-pink-500/20">
            <ThumbsUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能推荐' : 'Smart Recommendation'}</span>
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">{isZh ? 'AI驱动的供应商匹配·产品推荐·客户洞察' : 'AI-powered supplier matching · product rec · customer insight'}</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 rounded-xl border border-pink-500/30 text-sm">
          <RefreshCw className="w-4 h-4" /><span>{isZh ? '刷新推荐' : 'Refresh'}</span>
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '推荐准确率' : 'Accuracy', value: '92.3%', icon: Target, gradient: 'from-pink-500 to-rose-500', sub: '+3.2% MoM' },
          { label: isZh ? '供应商匹配数' : 'Supplier Matches', value: '28', icon: Users, gradient: 'from-blue-500 to-indigo-500', sub: isZh ? '本月新增5个' : '5 new' },
          { label: isZh ? '采购节省' : 'Cost Saved', value: '¥55.8万', icon: TrendingUp, gradient: 'from-emerald-500 to-green-500', sub: isZh ? '本月累计' : 'This month' },
          { label: isZh ? '交叉销售转化' : 'Cross-sell', value: '18.5%', icon: ShoppingCart, gradient: 'from-purple-500 to-pink-500', sub: '+5.2% MoM' },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
              <div className="flex items-start justify-between">
                <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-2xl text-white mt-1">{s.value}</p><p className="text-xs text-emerald-400 mt-1">{s.sub}</p></div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} opacity-80 flex items-center justify-center`}><I className="w-5 h-5 text-white" /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => { const T = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-white border border-pink-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <T className="w-4 h-4" /><span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
          </button>
        ); })}
      </div>

      {/* Supplier Tab */}
      {activeTab === 'supplier' && (
        <div className="space-y-4">
          {SUPPLIER_RECS.map(s => (
            <div key={s.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 hover:border-pink-500/20 transition-all p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white">{s.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">{isZh ? '匹配' : 'Match'} {s.matchScore}%</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300">{s.category}</span>
                    <span className="text-xs text-gray-500">{s.region}</span>
                  </div>
                  <p className="text-xs text-gray-400">{s.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-400">{s.savings}</p>
                  <p className="text-xs text-gray-500">{isZh ? '预计月节省' : 'Est. savings/m'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <span>{isZh ? '价格' : 'Price'}: <span className="text-white">{s.priceIndex}</span></span>
                <span>{isZh ? '质量' : 'Quality'}: <span className="text-white">{s.qualityScore}</span></span>
                <span>{isZh ? '交期' : 'Delivery'}: <span className="text-white">{s.deliveryScore}</span></span>
                <span>{isZh ? '信用' : 'Credit'}: <span className={`${s.creditRating === 'AAA' ? 'text-emerald-400' : s.creditRating === 'AA' ? 'text-blue-400' : 'text-amber-400'}`}>{s.creditRating}</span></span>
              </div>
              <div className="mt-3 w-full bg-slate-700/30 rounded-full h-1.5">
                <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: `${s.matchScore}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Tab */}
      {activeTab === 'product' && (
        <div className="space-y-4">
          {PRODUCT_RECS.map(p => (
            <div key={p.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white">{p.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.demand === '高' ? 'bg-red-500/20 text-red-300' : p.demand === '中' ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-500/20 text-gray-300'}`}>{isZh ? `需求${p.demand}` : `Demand: ${p.demand}`}</span>
                    {p.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-400" />}
                    {p.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-400" />}
                    {p.trend === 'stable' && <span className="text-xs text-gray-400">→</span>}
                  </div>
                  <p className="text-xs text-gray-400">{p.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">AI {isZh ? '置信度' : 'Conf.'} {p.confidence}%</p>
                  <p className="text-xs text-gray-500">{p.targetClients} {isZh ? '个潜在客户' : 'clients'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customer Tab */}
      {activeTab === 'customer' && (
        <div className="space-y-4">
          {CUSTOMER_RECS.map(c => (
            <div key={c.id} className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 ${c.churnRisk > 30 ? 'border-red-500/20' : 'border-white/5'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white">{c.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.potential === '高' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>{isZh ? `潜力${c.potential}` : c.potential}</span>
                    {c.churnRisk > 30 && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 animate-pulse">{isZh ? '流失预警' : 'Churn Risk'}</span>}
                  </div>
                  <p className="text-xs text-gray-500">LTV: {c.ltv} {c.crossSell !== '-' && `| ${isZh ? '交叉销售' : 'Cross-sell'}: ${c.crossSell}`}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{isZh ? '流失风险' : 'Churn'}</span>
                  <span className={`text-sm ${c.churnRisk > 30 ? 'text-red-400' : c.churnRisk > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>{c.churnRisk}%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/5 border border-pink-500/15 mt-2">
                <p className="text-xs text-pink-300"><Sparkles className="w-3 h-3 inline mr-1" />{c.action}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Engine Tab */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '推荐算法权重' : 'Algorithm Weights'}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <PieChart>
                  <Pie data={ENGINE_PIE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {ENGINE_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {ENGINE_PIE.map((e, i) => (
                <div key={i} className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} /><span className="text-xs text-gray-400">{e.name} {e.value}%</span></div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '供应商对比雷达' : 'Supplier Radar'}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <RadarChart data={MATCH_RADAR}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar name={isZh ? '华东铜业' : 'East China Copper'} dataKey="A" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
                  <Radar name={isZh ? '越南TPC' : 'Vietnam TPC'} dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
