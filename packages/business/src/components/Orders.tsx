import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  Truck,
  Scale,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  FileText
} from 'lucide-react';
import { Button } from './ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AIContextBanner } from './AIContextBanner';
import { useNavigationContext, generateRecommendations } from '../hooks/useNavigationContext';

interface OrdersProps {
  currentLanguage: string;
  navigationContext?: Record<string, any>;
  onNavigate?: (view: string, context?: Record<string, any>) => void;
}

const ORDER_TRENDS = [
  { day: 'Mon', buy: 4000, sell: 2400 },
  { day: 'Tue', buy: 3000, sell: 1398 },
  { day: 'Wed', buy: 2000, sell: 9800 },
  { day: 'Thu', buy: 2780, sell: 3908 },
  { day: 'Fri', buy: 1890, sell: 4800 },
  { day: 'Sat', buy: 2390, sell: 3800 },
  { day: 'Sun', buy: 3490, sell: 4300 },
];

const ORDERS = [
  {
    id: 'ORD-2025-001',
    customerId: 'CUST-001',
    type: 'purchase',
    partner: { en: 'Alpha Scrap Co.', zh: '阿尔法废料' },
    material: { en: 'HMS 1 & 2', zh: '重废钢 1 & 2' },
    weight: '25,400 kg',
    status: 'weighed',
    amount: '¥ 72,500',
    date: '2025-02-04'
  },
  {
    id: 'ORD-2025-002',
    customerId: 'CUST-002',
    type: 'sales',
    partner: { en: 'Shanghai Steel', zh: '上海钢铁' },
    material: { en: 'Copper Wire', zh: '铜线' },
    weight: '5,000 kg',
    status: 'pending_payment',
    amount: '¥ 342,500',
    date: '2025-02-03'
  },
  {
    id: 'ORD-2025-003',
    customerId: 'CUST-003',
    type: 'purchase',
    partner: { en: 'City Recyclers', zh: '城市回收' },
    material: { en: 'Aluminum Cans', zh: '铝罐' },
    weight: '12,000 kg',
    status: 'in_transit',
    amount: '¥ 218,000',
    date: '2025-02-03'
  },
  {
    id: 'ORD-2025-004',
    customerId: 'CUST-001',
    type: 'sales',
    partner: { en: 'Global Export', zh: '全球出口' },
    material: { en: 'Brass Honey', zh: '黄铜 Honey' },
    weight: '8,500 kg',
    status: 'completed',
    amount: '¥ 382,500',
    date: '2025-02-01'
  },
  {
    id: 'ORD-2025-005',
    customerId: 'CUST-002',
    type: 'purchase',
    partner: { en: 'Local Collectors', zh: '本地回收商' },
    material: { en: 'Mixed Scrap', zh: '混合废料' },
    weight: '3,500 kg',
    status: 'processing',
    amount: '¥ 12,500',
    date: '2025-02-01'
  }
];

export function Orders({ currentLanguage, navigationContext, onNavigate }: OrdersProps) {
  const [activeTab, setActiveTab] = useState('all');

  // Phase 12A: 消费导航上下文
  const { 
    hasContext, 
    context, 
    contextData, 
    shouldHighlight, 
    getFilterCriteria 
  } = useNavigationContext(navigationContext, 'orders');

  // Phase 12A: 生成智能推荐
  const recommendations = useMemo(() => {
    if (!hasContext || !context) return [];
    
    const sourceModule = context.source || context.sourceModule || '';
    const baseRecommendations = generateRecommendations(sourceModule, 'orders', contextData);
    
    // 添加订单特定推荐
    if (contextData.customerId) {
      baseRecommendations.push({
        title: currentLanguage === 'zh' ? '创建新订单' : 'Create New Order',
        description: currentLanguage === 'zh' ? '为该客户创建新的订单' : 'Create a new order for this customer',
        action: 'create',
        data: { customerId: contextData.customerId }
      });
    }
    if (contextData.orderId) {
      baseRecommendations.push({
        title: currentLanguage === 'zh' ? '生成发票' : 'Generate Invoice',
        description: currentLanguage === 'zh' ? '基于该订单生成发票' : 'Generate invoice based on this order',
        action: 'navigate',
        data: { target: 'invoices', orderId: contextData.orderId }
      });
    }
    
    return baseRecommendations;
  }, [hasContext, context, contextData, currentLanguage]);

  // Phase 12A: 处理推荐采纳
  const handleAcceptRecommendation = (recommendation: any) => {
    console.log('[Orders] Accepting recommendation:', recommendation);
    if (recommendation.action === 'navigate' && onNavigate) {
      onNavigate(recommendation.data.target, {
        source: 'orders',
        orderId: recommendation.data.orderId,
        customerId: recommendation.data.customerId,
        recommendations: []
      });
    } else if (recommendation.action === 'create') {
      console.log('[Orders] Create order for customer:', recommendation.data.customerId);
      // 这里可以打开创建订单的对话框
    }
  };

  // Phase 12A: 应用上下文筛选
  const filteredOrders = useMemo(() => {
    if (!hasContext || !contextData.customerId) return ORDERS;
    return ORDERS.filter(order => order.customerId === contextData.customerId);
  }, [hasContext, contextData]);

  const getStatusConfig = (status: string) => {
    const configs = {
      completed: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Completed', zh: '已完成' }
      },
      pending_payment: {
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        icon: Clock,
        label: { en: 'Pending Payment', zh: '待付款' }
      },
      in_transit: {
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Truck,
        label: { en: 'In Transit', zh: '运输中' }
      },
      weighed: {
        color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        icon: Scale,
        label: { en: 'Weighed', zh: '已称重' }
      },
      processing: {
        color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        icon: AlertCircle,
        label: { en: 'Processing', zh: '处理中' }
      }
    };
    return configs[status as keyof typeof configs] || configs.processing;
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto pb-20">
      {/* Phase 12A: AI Context Banner */}
      {hasContext && context && (
        <AIContextBanner
          context={{
            ...context,
            recommendations
          }}
          onClose={() => {
            console.log('[Orders] Context banner closed');
          }}
          onAcceptRecommendation={handleAcceptRecommendation}
          currentLanguage={currentLanguage}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 flex items-center justify-center border border-orange-500/30">
            <ShoppingCart className="w-7 h-7 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              {currentLanguage === 'en' ? 'Order Management' : '订单管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en' ? 'End-to-end transaction tracking & processing' : '端到端交易追踪与处理'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Create Order' : '创建订单'}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <ArrowDownLeft className="w-24 h-24 text-green-500" />
           </div>
           <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Total Purchases' : '总采购额'}</p>
              <h3 className="text-2xl font-bold text-white mb-2">¥ 1,245,890</h3>
              <div className="flex items-center text-xs text-green-400 bg-green-500/10 w-fit px-2 py-1 rounded-lg border border-green-500/20">
                 <ArrowUpRight className="w-3 h-3 mr-1" />
                 +12.5% {currentLanguage === 'en' ? 'this month' : '本月'}
              </div>
           </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <ArrowUpRight className="w-24 h-24 text-blue-500" />
           </div>
           <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Total Sales' : '总销售额'}</p>
              <h3 className="text-2xl font-bold text-white mb-2">¥ 3,850,420</h3>
              <div className="flex items-center text-xs text-blue-400 bg-blue-500/10 w-fit px-2 py-1 rounded-lg border border-blue-500/20">
                 <ArrowUpRight className="w-3 h-3 mr-1" />
                 +8.2% {currentLanguage === 'en' ? 'this month' : '本月'}
              </div>
           </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Scale className="w-24 h-24 text-purple-500" />
           </div>
           <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Pending Weighing' : '待称重'}</p>
              <h3 className="text-2xl font-bold text-white mb-2">12 {currentLanguage === 'en' ? 'Orders' : '单'}</h3>
              <div className="flex items-center text-xs text-purple-400 bg-purple-500/10 w-fit px-2 py-1 rounded-lg border border-purple-500/20">
                 {currentLanguage === 'en' ? 'Requires Attention' : '需要处理'}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Order List */}
         <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
               <h3 className="text-lg font-bold text-white">{currentLanguage === 'en' ? 'Recent Orders' : '近期订单'}</h3>
               <div className="flex space-x-2">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                     <input 
                        type="text" 
                        placeholder={currentLanguage === 'en' ? 'Search...' : '搜索...'}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-orange-500/50"
                     />
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                     <Filter className="w-4 h-4" />
                  </Button>
               </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
               <table className="w-full">
                  <thead className="bg-slate-800/30">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Order ID' : '订单编号'}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Partner' : '合作伙伴'}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Details' : '详情'}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Amount' : '金额'}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Status' : '状态'}</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Action' : '操作'}</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {filteredOrders.map((order) => {
                        const statusConfig = getStatusConfig(order.status);
                        const StatusIcon = statusConfig.icon;
                        return (
                           <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="flex items-center space-x-2">
                                    <div className={`p-1.5 rounded-lg ${order.type === 'purchase' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                                       {order.type === 'purchase' 
                                          ? <ArrowDownLeft className={`w-4 h-4 ${order.type === 'purchase' ? 'text-green-400' : 'text-blue-400'}`} />
                                          : <ArrowUpRight className={`w-4 h-4 ${order.type === 'purchase' ? 'text-green-400' : 'text-blue-400'}`} />
                                       }
                                    </div>
                                    <span className="text-white font-medium text-sm">{order.id}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="text-sm text-gray-300">{order.partner[currentLanguage as keyof typeof order.partner]}</div>
                                 <div className="text-xs text-gray-500">{order.date}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="text-sm text-white font-medium">{order.material[currentLanguage as keyof typeof order.material]}</div>
                                 <div className="text-xs text-gray-400">{order.weight}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="text-sm text-orange-400 font-mono font-medium">{order.amount}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                    <StatusIcon className="w-3 h-3" />
                                    <span>{statusConfig.label[currentLanguage as keyof typeof statusConfig.label]}</span>
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                    <MoreHorizontal className="w-4 h-4" />
                                 </Button>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Chart & Quick Actions */}
         <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
               <h3 className="text-lg font-bold text-white mb-4">{currentLanguage === 'en' ? 'Volume Trends' : '交易量趋势'}</h3>
               <div className="h-[200px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                     <AreaChart data={ORDER_TRENDS}>
                        <defs>
                           <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                           </linearGradient>
                           <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                        <Area type="monotone" dataKey="buy" stroke="#10b981" fillOpacity={1} fill="url(#colorBuy)" />
                        <Area type="monotone" dataKey="sell" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSell)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center text-xs text-gray-400">
                     <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                     {currentLanguage === 'en' ? 'Purchase' : '采购'}
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                     {currentLanguage === 'en' ? 'Sales' : '销售'}
                  </div>
               </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10">
               <h3 className="text-lg font-bold text-white mb-4">{currentLanguage === 'en' ? 'Quick Actions' : '快捷操作'}</h3>
               <div className="space-y-3">
                  <button className="w-full p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-colors flex items-center justify-between group">
                     <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                           <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white text-sm font-medium">{currentLanguage === 'en' ? 'Generate Contract' : '生成合同'}</span>
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </button>
                  <button className="w-full p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-colors flex items-center justify-between group">
                     <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                           <Download className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white text-sm font-medium">{currentLanguage === 'en' ? 'Export Report' : '导出报表'}</span>
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}