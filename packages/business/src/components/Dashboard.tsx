import React, { useState, useEffect, useCallback } from 'react';
import { MetricCard } from './MetricCard';
import { Globe3D } from './Globe3D';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { RecentViewsCard } from './RecentViewsCard';
import { DraggableDashboardSection } from './DraggableDashboardSection';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { usePersistedState } from '../hooks/usePersistedState';
import companyLogo from 'figma:asset/90b9835ca179a12e0c86f31cada73d420a8f8bd1.png';
import { 
  TrendingUp, Coins, Package, Users, FileText, Activity,
  Clock, Calendar, Truck, Brain, Sparkles, Globe, Target,
  ShoppingCart, Factory, UserPlus, Shield, BarChart3, Zap,
  Building2, Search, MessageSquare, Image as ImageIcon,
  Network, AlertCircle, Bot, Eye, GitBranch, ArrowRight,
  CheckCircle2, Layers, DollarSign, Briefcase, Monitor
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

/**
 * @file Dashboard.tsx
 * @description YYC³标准化仪表盘组件
 * @author YYC³ Team
 * @version 1.0.0
 * @license MIT
 * @copyright 2024 YanYuCloudCube
 */

export interface DashboardProps {
  currentLanguage: string;
  onNavigate: (view: string, context?: Record<string, any>) => void;
  recentViews?: string[];
}

const PREDICTION_DATA = [
  { month: '1月', actual: 4000, predicted: 4100 },
  { month: '2月', actual: 3000, predicted: 3200 },
  { month: '3月', actual: 2000, predicted: 2400 },
  { month: '4月', actual: 2780, predicted: 2900 },
  { month: '5月', actual: 1890, predicted: 2100 },
  { month: '6月', actual: 2390, predicted: 2500 },
  { month: '7月', actual: 3490, predicted: 3600 },
  { month: '8月', actual: 4000, predicted: 4200 },
  { month: '9月', actual: null, predicted: 4500 },
  { month: '10月', actual: null, predicted: 4800 },
  { month: '11月', actual: null, predicted: 5100 },
  { month: '12月', actual: null, predicted: 5500 },
];

const MARKET_TICKER = [
  { symbol: '铜A级 Copper-A', price: '¥68,500', change: '+2.5%', trend: 'up' },
  { symbol: '铝合金 Aluminum', price: '¥18,200', change: '+0.8%', trend: 'up' },
  { symbol: '废钢HMS1', price: '¥2,850', change: '-1.2%', trend: 'down' },
  { symbol: '锌锭 Zinc', price: '¥24,100', change: '+0.5%', trend: 'up' },
  { symbol: '镍板 Nickel', price: '¥125,000', change: '+1.5%', trend: 'up' },
  { symbol: '铅锭 Lead', price: '¥15,400', change: '-0.3%', trend: 'down' },
  { symbol: '锡锭 Tin', price: '¥198,000', change: '+0.0%', trend: 'flat' },
  { symbol: 'LME铜 3M', price: '$9,285', change: '+1.8%', trend: 'up' },
];

const CATEGORIES = [
  { id: 'core-business', label: { en: 'Core Business', zh: '核心业务' }, icon: ShoppingCart, color: 'from-blue-500 to-cyan-500', views: ['smart-sales', 'procurement', 'orders', 'contracts', 'logistics'], stat: { en: '15 modules', zh: '15个模块' } },
  { id: 'hr', label: { en: 'Human Resources', zh: '人力资源' }, icon: Users, color: 'from-violet-500 to-purple-500', views: ['employees', 'recruitment', 'payroll'], stat: { en: '9 modules', zh: '9个模块' } },
  { id: 'finance', label: { en: 'Finance & Assets', zh: '财务资产' }, icon: DollarSign, color: 'from-emerald-500 to-green-500', views: ['accounting', 'invoices', 'budget'], stat: { en: '11 modules', zh: '11个模块' } },
  { id: 'office', label: { en: 'Office Collab', zh: '办公协同' }, icon: Briefcase, color: 'from-amber-500 to-orange-500', views: ['approval', 'documents', 'smart-search'], stat: { en: '12 modules', zh: '12个模块' } },
  { id: 'ai-core', label: { en: 'AI Intelligence', zh: 'AI智能' }, icon: Brain, color: 'from-fuchsia-500 to-pink-500', views: ['decision', 'prediction', 'chatbot'], stat: { en: '9 modules', zh: '9个模块' } },
  { id: 'production', label: { en: 'Production & Ops', zh: '生产运营' }, icon: Factory, color: 'from-teal-500 to-cyan-500', views: ['production', 'equipment', 'workorders'], stat: { en: '6 modules', zh: '6个模块' } },
  { id: 'system', label: { en: 'System', zh: '系统设置' }, icon: Monitor, color: 'from-gray-500 to-slate-500', views: ['settings'], stat: { en: '1 module', zh: '1个模块' } },
];

const AI_INSIGHTS = [
  {
    type: 'opportunity',
    title: { en: 'Copper purchase window detected', zh: '废铜采购窗口已检测' },
    desc: { en: 'LME copper predicted 2-3% pullback Mar 20-25, recommend batch purchase for Q2 inventory', zh: 'AI预测3月20-25日LME铜价将短暂回调2-3%，建议在此窗口集中采购Q2库存' },
    impact: '¥38万',
    modules: ['prediction', 'procurement', 'market-intelligence'],
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    context: { source: 'ai-insight', type: 'purchase-window', dateFrom: '2026-03-20', dateTo: '2026-03-25', metal: 'copper', action: 'batch-purchase', estimatedSaving: '¥38万' },
  },
  {
    type: 'risk',
    title: { en: 'Supplier concentration risk', zh: '供应商集中度风险' },
    desc: { en: 'Top 3 suppliers = 70% of volume. If any disrupted, 22-35% capacity impact. Recommend diversifying.', zh: '前3家供应商占采购量70%，任一断供影响产能22-35%。建议引入备选供应商分散风险' },
    impact: { en: '-30% risk', zh: '降险30%' },
    modules: ['mining', 'risk', 'suppliers'],
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/20',
    iconColor: 'text-red-400',
    context: { source: 'ai-insight', type: 'supplier-risk', riskLevel: 'high', topSuppliers: ['华东金属', '鑫达回收', '长江物资'], concentrationRate: 70 },
  },
  {
    type: 'efficiency',
    title: { en: 'Sorting line A1 optimization', zh: '分拣线A1效率优化' },
    desc: { en: 'AI vision detected 3% oversized particles from shredder, blade wear correlated. Schedule maintenance.', zh: 'AI视觉检测到破碎机产出>100mm粒料占比升至3%，与刀片磨损相关，建议安排维护' },
    impact: '+5%',
    modules: ['vision', 'equipment', 'production'],
    color: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    context: { source: 'ai-insight', type: 'maintenance', equipmentId: 'SHREDDER-A1', issueType: 'blade-wear', urgency: 'medium' },
  },
];

const METAL_INVENTORY = [
  { name: '废钢', value: 520, color: '#3b82f6' },
  { name: '废铜', value: 412, color: '#f59e0b' },
  { name: '废铝', value: 285, color: '#22c55e' },
  { name: '铅', value: 180, color: '#8b5cf6' },
  { name: '锌', value: 95, color: '#06b6d4' },
];

const DEFAULT_SECTION_ORDER = ['metrics', 'categories', 'mainViz', 'aiInsights', 'bottomSection'];

const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  ({ currentLanguage, onNavigate, recentViews = [] }, ref) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    const isZh = currentLanguage === 'zh';
    const [sectionOrder, setSectionOrder] = usePersistedState<string[]>('dashboard_layout', DEFAULT_SECTION_ORDER);

    const moveSection = useCallback((dragIndex: number, hoverIndex: number) => {
      setSectionOrder(prev => {
        const updated = [...prev];
        const [removed] = updated.splice(dragIndex, 1);
        updated.splice(hoverIndex, 0, removed);
        return updated;
      });
    }, [setSectionOrder]);

    useEffect(() => {
      setMounted(true);
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    const metrics = [
      {
        title: { en: 'AI Revenue Prediction', zh: 'AI营收预测' },
        value: '¥3,105,000',
        change: '+9.2% vs Target',
        trend: 'up' as const,
        icon: Brain,
        color: 'from-fuchsia-500 to-purple-600'
      },
      {
        title: { en: 'Total Revenue', zh: '总收入' },
        value: '¥2,847,593',
        change: '+12.5%',
        trend: 'up' as const,
        icon: Coins,
        color: 'from-emerald-500 to-teal-600'
      },
      {
        title: { en: 'Active Projects', zh: '活跃项目' },
        value: '847',
        change: '+8.2%',
        trend: 'up' as const,
        icon: Target,
        color: 'from-blue-500 to-cyan-600'
      },
      {
        title: { en: 'Inventory Value', zh: '库存总值' },
        value: '¥1,235,784',
        change: '-3.1%',
        trend: 'down' as const,
        icon: Package,
        color: 'from-purple-500 to-indigo-600'
      },
      {
        title: { en: 'Total Customers', zh: '总客户数' },
        value: '1,274',
        change: '+5.7%',
        trend: 'up' as const,
        icon: Users,
        color: 'from-orange-500 to-red-600'
      },
      {
        title: { en: 'AI Automation', zh: 'AI自动化率' },
        value: '78%',
        change: '+12%',
        trend: 'up' as const,
        icon: Zap,
        color: 'from-amber-500 to-orange-600'
      },
    ];

    if (!mounted) return null;

    return (
      <div ref={ref} className="relative min-h-screen">
        <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex items-center space-x-4 w-2/3 overflow-hidden">
               <div className="flex items-center space-x-2 text-emerald-400 whitespace-nowrap">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider">{isZh ? '实时行情' : 'LIVE MARKET'}</span>
               </div>
               <div className="flex-1 overflow-hidden relative">
                  <div className="animate-marquee whitespace-nowrap flex space-x-8">
                     {[...MARKET_TICKER, ...MARKET_TICKER].map((item, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm">
                           <span className="text-gray-300">{item.symbol}</span>
                           <span className="text-white">{item.price}</span>
                           <span className={`text-xs ${item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                              {item.change}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-300 border-l border-white/10 pl-6">
               <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-sm">{currentTime.toLocaleTimeString()}</span>
               </div>
               <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{currentTime.toLocaleDateString()}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
               <div className="relative group">
                 <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                 <img 
                   src={companyLogo} 
                   alt="Yan Yu COMPANY" 
                   className="relative w-16 h-16 object-contain rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                 />
               </div>
               <div>
                 <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {isZh ? '言语云3 AI 智能中枢' : 'YanYu Cloud AI Brain'}
                 </h1>
                 <div className="flex items-center space-x-3 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                       AI POWERED
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                       62 {isZh ? '模块' : 'MODULES'}
                    </span>
                    <span className="text-gray-400 text-sm">
                       {isZh ? '企业全链路实时数据可视化' : 'Real-time Enterprise Data Visualization'}
                    </span>
                 </div>
               </div>
            </div>
          </div>

          <DndProvider backend={HTML5Backend}>
            <div className="space-y-6">
              {sectionOrder.map((sectionId, index) => (
                <DraggableDashboardSection
                  key={sectionId}
                  id={sectionId}
                  index={index}
                  moveSection={moveSection}
                >
                  {sectionId === 'metrics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {metrics.map((metric, i) => (
                        <MetricCard key={i} {...metric} currentLanguage={currentLanguage} />
                      ))}
                    </div>
                  )}
                  {sectionId === 'categories' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => onNavigate(category.views[0])}
                          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                          <div className="relative p-6">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                              <category.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {category.label[isZh ? 'zh' : 'en']}
                            </h3>
                            <p className="text-sm text-gray-400">{category.stat[isZh ? 'zh' : 'en']}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {sectionId === 'mainViz' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-slate-800/50 rounded-xl border border-white/5 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          {isZh ? 'AI营收预测' : 'AI Revenue Prediction'}
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={PREDICTION_DATA}>
                            <defs>
                              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis dataKey="month" stroke="#ffffff30" />
                            <YAxis stroke="#ffffff30" />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                              labelStyle={{ color: '#ffffff' }}
                            />
                            <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" name="实际" />
                            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPredicted)" name="预测" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl border border-white/5 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          {isZh ? '金属库存分布' : 'Metal Inventory Distribution'}
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={METAL_INVENTORY}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis dataKey="name" stroke="#ffffff30" />
                            <YAxis stroke="#ffffff30" />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                              labelStyle={{ color: '#ffffff' }}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                              {METAL_INVENTORY.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                  {sectionId === 'aiInsights' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        {isZh ? 'AI智能洞察' : 'AI Insights'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {AI_INSIGHTS.map((insight, i) => (
                          <div
                            key={i}
                            className={`relative rounded-xl bg-gradient-to-br ${insight.color} border ${insight.borderColor} p-6 hover:scale-105 transition-transform duration-300 cursor-pointer`}
                            onClick={() => onNavigate(insight.modules[0], insight.context)}
                          >
                            <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 ${insight.iconColor}`}>
                              {insight.type === 'opportunity' && <Sparkles className="w-5 h-5" />}
                              {insight.type === 'risk' && <AlertCircle className="w-5 h-5" />}
                              {insight.type === 'efficiency' && <Zap className="w-5 h-5" />}
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {insight.title[isZh ? 'zh' : 'en']}
                            </h4>
                            <p className="text-sm text-gray-300 mb-4">
                              {insight.desc[isZh ? 'zh' : 'en']}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white">
                                {insight.impact}
                              </span>
                              <div className="flex space-x-1">
                                {insight.modules.slice(0, 3).map((module, mi) => (
                                  <div key={mi} className="w-2 h-2 rounded-full bg-white/50" />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {sectionId === 'bottomSection' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <Globe3D currentLanguage={currentLanguage} />
                      </div>
                      <div className="space-y-6">
                        <QuickActions currentLanguage={currentLanguage} onNavigate={onNavigate} />
                        <RecentViewsCard currentLanguage={currentLanguage} onNavigate={onNavigate} recentViews={recentViews} />
                        <RecentActivity currentLanguage={currentLanguage} />
                      </div>
                    </div>
                  )}
                </DraggableDashboardSection>
              ))}
            </div>
          </DndProvider>
        </div>

        <style>{`
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    );
  }
);

Dashboard.displayName = 'Dashboard';

export { Dashboard };
