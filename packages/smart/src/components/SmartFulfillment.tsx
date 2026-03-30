import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  FileText,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Eye,
  BarChart3,
  Activity,
  ArrowUpRight,
  Search,
  Filter,
  MapPin,
  Ship,
  Warehouse,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface SmartFulfillmentProps {
  currentLanguage: string;
}

type TabType = 'tracker' | 'orders' | 'analytics';
type FulfillmentStage = 'confirmed' | 'preparing' | 'quality-check' | 'shipping' | 'in-transit' | 'delivered' | 'completed';

interface FulfillmentOrder {
  id: string;
  orderNo: string;
  customer: string;
  product: { en: string; zh: string };
  quantity: string;
  amount: number;
  stage: FulfillmentStage;
  stages: { name: string; status: 'done' | 'current' | 'pending'; date?: string }[];
  eta: string;
  assignee: string;
  notes: string;
}

const STAGE_CONFIG: Record<FulfillmentStage, { label: { en: string; zh: string }; color: string; bg: string }> = {
  confirmed: { label: { en: 'Confirmed', zh: '已确认' }, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  preparing: { label: { en: 'Preparing', zh: '备货中' }, color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
  'quality-check': { label: { en: 'QC', zh: '质检中' }, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  shipping: { label: { en: 'Shipping', zh: '发货中' }, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  'in-transit': { label: { en: 'In Transit', zh: '运输中' }, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  delivered: { label: { en: 'Delivered', zh: '已送达' }, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  completed: { label: { en: 'Completed', zh: '已完成' }, color: 'text-green-400', bg: 'bg-green-500/20' },
};

const MOCK_ORDERS: FulfillmentOrder[] = [
  {
    id: 'FO-001', orderNo: 'ORD-2026-0318', customer: '山东齐鲁钢铁集团',
    product: { en: 'Steel HMS #1', zh: '废钢HMS1号' }, quantity: '500吨', amount: 1425000,
    stage: 'in-transit', assignee: '张伟', eta: '2026-03-16', notes: '天津港→青岛港 海运中',
    stages: [
      { name: '订单确认', status: 'done', date: '03-08' },
      { name: '备货', status: 'done', date: '03-09' },
      { name: '质检', status: 'done', date: '03-10' },
      { name: '发货', status: 'done', date: '03-11' },
      { name: '运输中', status: 'current', date: '03-11' },
      { name: '送达', status: 'pending' },
      { name: '完成', status: 'pending' },
    ]
  },
  {
    id: 'FO-002', orderNo: 'ORD-2026-0425', customer: 'Hyundai Metal Trading',
    product: { en: 'Copper Wire Scrap', zh: '废铜线' }, quantity: '120吨', amount: 8160000,
    stage: 'quality-check', assignee: '李娜', eta: '2026-03-22', notes: '出口韩国，质检后报关',
    stages: [
      { name: '订单确认', status: 'done', date: '03-05' },
      { name: '备货', status: 'done', date: '03-08' },
      { name: '质检', status: 'current', date: '03-12' },
      { name: '报关', status: 'pending' },
      { name: '运输中', status: 'pending' },
      { name: '送达', status: 'pending' },
      { name: '完成', status: 'pending' },
    ]
  },
  {
    id: 'FO-003', orderNo: 'ORD-2026-0512', customer: 'PT Indo Copper Trading',
    product: { en: 'Bright Copper', zh: '光亮铜' }, quantity: '80吨', amount: 5600000,
    stage: 'preparing', assignee: '王强', eta: '2026-03-28', notes: '出口印尼，备货阶段',
    stages: [
      { name: '订单确认', status: 'done', date: '03-10' },
      { name: '备货', status: 'current', date: '03-12' },
      { name: '质检', status: 'pending' },
      { name: '报关', status: 'pending' },
      { name: '运输中', status: 'pending' },
      { name: '送达', status: 'pending' },
      { name: '完成', status: 'pending' },
    ]
  },
  {
    id: 'FO-004', orderNo: 'ORD-2026-0198', customer: '江苏华鑫新材料',
    product: { en: 'Aluminum Alloy Scrap', zh: '铝合金废料' }, quantity: '200吨', amount: 3640000,
    stage: 'delivered', assignee: '赵磊', eta: '2026-03-12', notes: '已签收确认，待回款',
    stages: [
      { name: '订单确认', status: 'done', date: '03-01' },
      { name: '备货', status: 'done', date: '03-03' },
      { name: '质检', status: 'done', date: '03-04' },
      { name: '发货', status: 'done', date: '03-05' },
      { name: '运输中', status: 'done', date: '03-05' },
      { name: '送达', status: 'done', date: '03-08' },
      { name: '完成', status: 'pending' },
    ]
  },
  {
    id: 'FO-005', orderNo: 'ORD-2026-0876', customer: '广东南海铝业集团',
    product: { en: 'Aluminum Ingot', zh: '铝锭' }, quantity: '150吨', amount: 2775000,
    stage: 'completed', assignee: '陈芳', eta: '2026-03-05', notes: '已完成回款确认',
    stages: [
      { name: '订单确认', status: 'done', date: '02-20' },
      { name: '备货', status: 'done', date: '02-22' },
      { name: '质检', status: 'done', date: '02-23' },
      { name: '发货', status: 'done', date: '02-24' },
      { name: '运输中', status: 'done', date: '02-24' },
      { name: '送达', status: 'done', date: '02-28' },
      { name: '完成', status: 'done', date: '03-05' },
    ]
  },
  {
    id: 'FO-006', orderNo: 'ORD-2026-0633', customer: '福建三钢集团',
    product: { en: 'Steel Shredded', zh: '破碎料' }, quantity: '300吨', amount: 855000,
    stage: 'confirmed', assignee: '刘洋', eta: '2026-03-25', notes: '待安排仓库备货',
    stages: [
      { name: '订单确认', status: 'done', date: '03-12' },
      { name: '备货', status: 'pending' },
      { name: '质检', status: 'pending' },
      { name: '发货', status: 'pending' },
      { name: '运输中', status: 'pending' },
      { name: '送达', status: 'pending' },
      { name: '完成', status: 'pending' },
    ]
  },
];

const FULFILLMENT_RATE_DATA = [
  { month: '10月', onTime: 88, total: 100 },
  { month: '11月', onTime: 91, total: 100 },
  { month: '12月', onTime: 85, total: 100 },
  { month: '1月', onTime: 93, total: 100 },
  { month: '2月', onTime: 90, total: 100 },
  { month: '3月', onTime: 94, total: 100 },
];

const STAGE_DURATION_DATA = [
  { stage: '备货', avg: 2.5 },
  { stage: '质检', avg: 1.2 },
  { stage: '发货', avg: 0.8 },
  { stage: '运输', avg: 4.5 },
  { stage: '确认', avg: 1.8 },
];

const STATUS_PIE = [
  { name: '进行中', value: 45, color: '#3b82f6' },
  { name: '已完成', value: 38, color: '#10b981' },
  { name: '已延期', value: 8, color: '#ef4444' },
  { name: '待启动', value: 9, color: '#6b7280' },
];

export function SmartFulfillment({ currentLanguage }: SmartFulfillmentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tracker');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'tracker' as TabType, label: { en: 'Tracker', zh: '履约追踪' }, icon: Activity },
    { id: 'orders' as TabType, label: { en: 'Orders', zh: '订单列表' }, icon: FileText },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '履约分析' }, icon: BarChart3 },
  ];

  const activeOrders = MOCK_ORDERS.filter(o => !['completed', 'delivered'].includes(o.stage)).length;
  const completedOrders = MOCK_ORDERS.filter(o => o.stage === 'completed').length;
  const totalAmount = MOCK_ORDERS.filter(o => o.stage !== 'completed').reduce((s, o) => s + o.amount, 0);

  const formatMoney = (v: number) => v >= 10000 ? `¥${(v / 10000).toFixed(0)}万` : `¥${v.toLocaleString()}`;

  const getStageProgress = (order: FulfillmentOrder) => {
    const doneCount = order.stages.filter(s => s.status === 'done').length;
    const currentCount = order.stages.filter(s => s.status === 'current').length;
    return Math.round(((doneCount + currentCount * 0.5) / order.stages.length) * 100);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-green-500/20">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '智能履约' : 'Smart Fulfillment'}</h1>
            <p className="text-sm text-gray-400">{isZh ? '订单履约全流程监控' : 'Full-cycle order fulfillment monitoring'}</p>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '履约中' : 'In Progress', value: activeOrders.toString(), icon: Package, gradient: 'from-blue-500 to-cyan-500' },
          { label: isZh ? '已完成' : 'Completed', value: completedOrders.toString(), icon: CheckCircle2, gradient: 'from-emerald-500 to-green-500' },
          { label: isZh ? '在途金额' : 'In-transit Value', value: formatMoney(totalAmount), icon: DollarSign, gradient: 'from-amber-500 to-orange-500' },
          { label: isZh ? '准时率' : 'On-time Rate', value: '94%', icon: Clock, gradient: 'from-purple-500 to-pink-500' },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div key={idx} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}>
                <StatIcon className="w-5 h-5 text-white" />
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
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Tracker Tab */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          {MOCK_ORDERS.filter(o => o.stage !== 'completed').map(order => {
            const stageConf = STAGE_CONFIG[order.stage];
            const progress = getStageProgress(order);
            const isExpanded = selectedOrder === order.id;

            return (
              <div key={order.id} className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all ${
                isExpanded ? 'border-green-500/30' : 'border-white/5 hover:border-white/10'
              }`}>
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-white">{order.orderNo}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${stageConf.bg} ${stageConf.color}`}>
                        {isZh ? stageConf.label.zh : stageConf.label.en}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{formatMoney(order.amount)}</p>
                      <p className="text-xs text-gray-500">ETA: {order.eta}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white">{order.customer}</p>
                      <p className="text-xs text-gray-500">{isZh ? order.product.zh : order.product.en} · {order.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{order.assignee}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{isZh ? '履约进度' : 'Progress'}</span>
                      <span className="text-white">{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/40 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                {/* Expanded Timeline */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5">
                    <div className="mt-4 mb-3">
                      <p className="text-xs text-gray-500 mb-1">{isZh ? '备注' : 'Notes'}</p>
                      <p className="text-sm text-gray-300">{order.notes}</p>
                    </div>

                    {/* Stage Timeline */}
                    <div className="flex items-center space-x-1 overflow-x-auto pb-2">
                      {order.stages.map((stage, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex flex-col items-center min-w-[70px]">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              stage.status === 'done' ? 'bg-emerald-500/30 border-emerald-500/50' :
                              stage.status === 'current' ? 'bg-amber-500/30 border-amber-500/50 animate-pulse' :
                              'bg-slate-700/30 border-slate-600/30'
                            } border`}>
                              {stage.status === 'done' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : stage.status === 'current' ? (
                                <Clock className="w-4 h-4 text-amber-400" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                              )}
                            </div>
                            <span className={`text-xs mt-1 text-center ${
                              stage.status === 'done' ? 'text-emerald-400' :
                              stage.status === 'current' ? 'text-amber-400' :
                              'text-gray-600'
                            }`}>{stage.name}</span>
                            {stage.date && (
                              <span className="text-xs text-gray-600">{stage.date}</span>
                            )}
                          </div>
                          {idx < order.stages.length - 1 && (
                            <div className={`flex-1 h-0.5 min-w-[20px] ${
                              stage.status === 'done' ? 'bg-emerald-500/40' : 'bg-slate-700/40'
                            }`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={isZh ? '搜索订单号、客户...' : 'Search order, customer...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
            />
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '订单号' : 'Order No.'}</th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '客户' : 'Customer'}</th>
                    <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '产品' : 'Product'}</th>
                    <th className="text-right text-xs text-gray-500 py-3 px-4">{isZh ? '金额' : 'Amount'}</th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '状态' : 'Status'}</th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '进度' : 'Progress'}</th>
                    <th className="text-right text-xs text-gray-500 py-3 px-4">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.filter(o =>
                    searchTerm === '' ||
                    o.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map(order => {
                    const stageConf = STAGE_CONFIG[order.stage];
                    const progress = getStageProgress(order);
                    return (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 text-sm text-white">{order.orderNo}</td>
                        <td className="py-3 px-4 text-sm text-gray-300">{order.customer}</td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-white">{isZh ? order.product.zh : order.product.en}</p>
                          <p className="text-xs text-gray-500">{order.quantity}</p>
                        </td>
                        <td className="py-3 px-4 text-right text-sm text-white">{formatMoney(order.amount)}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${stageConf.bg} ${stageConf.color}`}>
                            {isZh ? stageConf.label.zh : stageConf.label.en}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2 justify-center">
                            <div className="w-16 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-xs text-gray-400">{progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-xs text-gray-400">{order.eta}</td>
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
            {/* On-time Rate Trend */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '准时履约率趋势 (%)' : 'On-time Fulfillment Rate (%)'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <LineChart data={FULFILLMENT_RATE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[80, 100]} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#1e293b' }} name={isZh ? '准时率' : 'On-time %'} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stage Duration */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '各环节平均耗时 (天)' : 'Avg. Stage Duration (Days)'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={STAGE_DURATION_DATA} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis dataKey="stage" type="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} width={50} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="avg" fill="#10b981" radius={[0, 6, 6, 0]} name={isZh ? '天数' : 'Days'} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Status Pie + KPI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '订单状态分布' : 'Order Status Distribution'}</h3>
              <div className="h-52 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie data={STATUS_PIE} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                        {STATUS_PIE.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-2">
                  {STATUS_PIE.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-xs text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">{isZh ? '平均履约周期' : 'Avg. Fulfillment Cycle'}</span>
              </div>
              <p className="text-3xl text-white">10.8 {isZh ? '天' : 'days'}</p>
              <p className="text-xs text-emerald-400 mt-2">-1.2 {isZh ? '天较上月' : 'days vs last month'}</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{isZh ? '最快' : 'Fastest'}: 5.2{isZh ? '天' : 'd'}</span>
                  <span>{isZh ? '最慢' : 'Slowest'}: 18.5{isZh ? '天' : 'd'}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">{isZh ? '客户满意度' : 'Customer Satisfaction'}</span>
              </div>
              <p className="text-3xl text-white">4.7<span className="text-lg text-gray-500">/5</span></p>
              <p className="text-xs text-emerald-400 mt-2">+0.2 {isZh ? '较上季度' : 'vs last quarter'}</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <div key={s} className={`w-6 h-6 rounded ${s <= 4 ? 'bg-amber-500/30' : 'bg-amber-500/10'} flex items-center justify-center`}>
                    <span className={`text-xs ${s <= 4 ? 'text-amber-400' : 'text-amber-400/40'}`}>★</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
