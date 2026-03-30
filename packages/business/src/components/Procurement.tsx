import React, { useState } from 'react';
import {
  Warehouse,
  Search,
  Plus,
  Filter,
  Download,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  Calendar,
  DollarSign,
  Truck,
  Brain,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@yyc3/ui';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface ProcurementProps {
  currentLanguage: string;
}

const PROCUREMENT_TRENDS = [
  { month: 'Sep', amount: 45000 },
  { month: 'Oct', amount: 52000 },
  { month: 'Nov', amount: 48000 },
  { month: 'Dec', amount: 61000 },
  { month: 'Jan', amount: 55000 },
  { month: 'Feb', amount: 67000 },
];

export function Procurement({ currentLanguage }: ProcurementProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const purchaseOrders = [
    {
      id: 'PO-2025-089',
      supplier: { en: 'Global Metal Supply', zh: '全球金属供应' },
      material: { en: 'Steel Scrap', zh: '废钢' },
      quantity: '45,000 kg',
      unitPrice: '2.80',
      totalAmount: '126,000',
      orderDate: '2025-02-01',
      expectedDelivery: '2025-02-15',
      status: 'approved',
      priority: 'high',
      aiRisk: 'low',
    },
    {
      id: 'PO-2025-088',
      supplier: { en: 'Asian Scrap Traders', zh: '亚洲废料贸易' },
      material: { en: 'Aluminum Scrap', zh: '废铝' },
      quantity: '30,000 kg',
      unitPrice: '16.50',
      totalAmount: '495,000',
      orderDate: '2025-01-30',
      expectedDelivery: '2025-02-10',
      status: 'delivered',
      priority: 'medium',
      aiRisk: 'low',
    },
    {
      id: 'PO-2025-087',
      supplier: { en: 'Eastern Metals Co.', zh: '东方金属' },
      material: { en: 'Copper Wire', zh: '铜线' },
      quantity: '12,000 kg',
      unitPrice: '68.50',
      totalAmount: '822,000',
      orderDate: '2025-01-28',
      expectedDelivery: '2025-02-12',
      status: 'in-transit',
      priority: 'high',
      aiRisk: 'medium',
    },
    {
      id: 'PO-2025-086',
      supplier: { en: 'Pacific Recyclers', zh: '太平洋回收' },
      material: { en: 'Brass Scrap', zh: '废黄铜' },
      quantity: '8,500 kg',
      unitPrice: '42.00',
      totalAmount: '357,000',
      orderDate: '2025-01-25',
      expectedDelivery: '2025-02-08',
      status: 'pending',
      priority: 'low',
      aiRisk: 'low',
    },
    {
      id: 'PO-2025-085',
      supplier: { en: 'Northern Works', zh: '北方工场' },
      material: { en: 'Stainless Steel', zh: '不锈钢' },
      quantity: '20,000 kg',
      unitPrice: '12.50',
      totalAmount: '250,000',
      orderDate: '2025-01-20',
      expectedDelivery: '2025-02-05',
      status: 'cancelled',
      priority: 'medium',
      aiRisk: 'high',
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      approved: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Approved', zh: '已批准' },
      },
      pending: {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: Clock,
        label: { en: 'Pending', zh: '待审批' },
      },
      'in-transit': {
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Truck,
        label: { en: 'In Transit', zh: '运输中' },
      },
      delivered: {
        color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        icon: CheckCircle2,
        label: { en: 'Delivered', zh: '已送达' },
      },
      cancelled: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: XCircle,
        label: { en: 'Cancelled', zh: '已取消' },
      },
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center border border-amber-500/30">
            <Package className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              {currentLanguage === 'en' ? 'Smart Procurement' : '智能采购'}
              <span className="ml-3 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center">
                <Brain className="w-3 h-3 mr-1" />
                AI Powered
              </span>
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'AI-driven supply chain management & optimization'
                : 'AI驱动的供应链管理与优化'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'New Order' : '新建订单'}
          </Button>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Purchasing Power Analytics */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-amber-400" />
              {currentLanguage === 'en' ? 'Procurement Trends' : '采购趋势分析'}
            </h3>
            <div className="flex space-x-2">
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                +12.5% vs Last Month
              </span>
            </div>
          </div>
          <div className="h-[250px] w-full relative z-10 min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={PROCUREMENT_TRENDS}>
                <defs>
                  <linearGradient id="colorProcurement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#fff',
                  }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorProcurement)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-amber-900/10 to-transparent">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-amber-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                {currentLanguage === 'en' ? 'AI Smart Restock' : 'AI 智能补货建议'}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-amber-500/20">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-white">Copper Wire</span>
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                    Low Stock
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {currentLanguage === 'en'
                    ? 'Inventory below 15%. Projected demand increase +20% next week.'
                    : '库存低于 15%。预计下周需求增加 20%。'}
                </p>
                <Button className="w-full h-8 text-xs bg-amber-600 hover:bg-amber-500 text-white">
                  {currentLanguage === 'en' ? 'Auto-Order (+5000kg)' : '自动下单 (+5000kg)'}
                </Button>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-white">Steel Scrap</span>
                  <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                    Optimal
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {currentLanguage === 'en'
                    ? 'Price drop expected in 3 days. Hold purchase.'
                    : '预计3天后价格下跌。建议暂停采购。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  currentLanguage === 'en' ? 'Search purchase orders...' : '搜索采购订单...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/30 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-3 rounded-xl transition-all duration-300">
              <Filter className="w-4 h-4 mr-2" />
              {currentLanguage === 'en' ? 'Filter' : '筛选'}
            </Button>
            <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-3 rounded-xl transition-all duration-300">
              <Download className="w-4 h-4 mr-2" />
              {currentLanguage === 'en' ? 'Export' : '导出'}
            </Button>
          </div>
        </div>
      </div>

      {/* Smart Orders Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-800/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'PO Details' : '订单详情'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Supplier' : '供应商'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Value' : '价值'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Status' : '状态'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'AI Risk Assessment' : 'AI 风险评估'}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Actions' : '操作'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {purchaseOrders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-800/30 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <span className="block text-white font-medium">{order.id}</span>
                        <span className="text-xs text-gray-400 flex items-center mt-1">
                          <Package className="w-3 h-3 mr-1" />
                          {order.material[currentLanguage as keyof typeof order.material]} (
                          {order.quantity})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">
                          {order.supplier[currentLanguage as keyof typeof order.supplier]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-amber-400 font-semibold font-mono">
                        ¥ {order.totalAmount}
                      </span>
                      <div className="text-xs text-gray-500 mt-0.5">@ ¥ {order.unitPrice} /kg</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span>
                          {statusConfig.label[currentLanguage as keyof typeof statusConfig.label]}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {order.aiRisk === 'high' && (
                        <div className="flex items-center text-red-400 text-xs font-medium">
                          <AlertTriangle className="w-4 h-4 mr-1.5" />
                          {currentLanguage === 'en' ? 'High Risk' : '高风险'}
                        </div>
                      )}
                      {order.aiRisk === 'medium' && (
                        <div className="flex items-center text-yellow-400 text-xs font-medium">
                          <AlertCircle className="w-4 h-4 mr-1.5" />
                          {currentLanguage === 'en' ? 'Medium Risk' : '中等风险'}
                        </div>
                      )}
                      {order.aiRisk === 'low' && (
                        <div className="flex items-center text-green-400 text-xs font-medium">
                          <CheckCircle2 className="w-4 h-4 mr-1.5" />
                          {currentLanguage === 'en' ? 'Verified Safe' : '安全已验证'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
