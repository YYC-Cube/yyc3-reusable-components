import React, { useState } from 'react';
import {
  FileSignature,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Users,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit3,
  Copy,
  Trash2,
  Download,
  Send,
  RefreshCw,
  TrendingUp,
  BarChart3,
  PieChart,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

interface ContractsProps {
  currentLanguage: string;
}

type ContractStatus = 'draft' | 'pending' | 'active' | 'expired' | 'terminated';
type TabType = 'overview' | 'list' | 'templates' | 'analytics';

interface Contract {
  id: string;
  contractNo: string;
  title: { en: string; zh: string };
  partner: string;
  type: { en: string; zh: string };
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  signDate?: string;
  owner: string;
  tags: string[];
}

const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'CT-2026-001',
    contractNo: 'HT-2026-0318',
    title: { en: 'Copper Scrap Annual Supply', zh: '废铜年度供应合同' },
    partner: '上海鑫达金属材料有限公司',
    type: { en: 'Purchase', zh: '采购合同' },
    amount: 12500000,
    currency: '¥',
    startDate: '2026-01-15',
    endDate: '2026-12-31',
    status: 'active',
    signDate: '2026-01-10',
    owner: '张伟',
    tags: ['年度', '铜', '战略'],
  },
  {
    id: 'CT-2026-002',
    contractNo: 'HT-2026-0425',
    title: { en: 'Steel HMS Export Contract', zh: '废钢HMS出口合同' },
    partner: 'PT Krakatau Steel Indonesia',
    type: { en: 'Sales', zh: '销售合同' },
    amount: 8800000,
    currency: '¥',
    startDate: '2026-02-01',
    endDate: '2026-07-31',
    status: 'active',
    signDate: '2026-01-28',
    owner: '李娜',
    tags: ['出口', '钢铁', '印尼'],
  },
  {
    id: 'CT-2026-003',
    contractNo: 'HT-2026-0512',
    title: { en: 'Aluminum Alloy Framework', zh: '铝合金框架协议' },
    partner: '广东南海铝业集团',
    type: { en: 'Framework', zh: '框架协议' },
    amount: 25000000,
    currency: '¥',
    startDate: '2026-03-01',
    endDate: '2027-02-28',
    status: 'pending',
    owner: '王强',
    tags: ['框架', '铝', '长期'],
  },
  {
    id: 'CT-2026-004',
    contractNo: 'HT-2026-0198',
    title: { en: 'Logistics Service Agreement', zh: '物流服务协议' },
    partner: '中远海运集团',
    type: { en: 'Service', zh: '服务合同' },
    amount: 3200000,
    currency: '¥',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    status: 'active',
    signDate: '2025-12-20',
    owner: '陈芳',
    tags: ['物流', '海运'],
  },
  {
    id: 'CT-2026-005',
    contractNo: 'HT-2025-0876',
    title: { en: 'Stainless Steel Spot Purchase', zh: '不锈钢现货采购合同' },
    partner: '浙江华峰不锈钢有限公司',
    type: { en: 'Purchase', zh: '采购合同' },
    amount: 4500000,
    currency: '¥',
    startDate: '2025-10-01',
    endDate: '2026-01-31',
    status: 'expired',
    signDate: '2025-09-25',
    owner: '赵磊',
    tags: ['现货', '不锈钢'],
  },
  {
    id: 'CT-2026-006',
    contractNo: 'HT-2026-0633',
    title: { en: 'Brass Scrap Processing', zh: '废黄铜加工合同' },
    partner: '宁波海天铜业',
    type: { en: 'Processing', zh: '加工合同' },
    amount: 1800000,
    currency: '¥',
    startDate: '2026-04-01',
    endDate: '2026-09-30',
    status: 'draft',
    owner: '刘洋',
    tags: ['加工', '黄铜'],
  },
  {
    id: 'CT-2026-007',
    contractNo: 'HT-2025-0654',
    title: { en: 'Warehouse Lease Agreement', zh: '仓库租赁合同' },
    partner: '天津港保税区物流园',
    type: { en: 'Lease', zh: '租赁合同' },
    amount: 960000,
    currency: '¥',
    startDate: '2025-06-01',
    endDate: '2026-05-31',
    status: 'active',
    signDate: '2025-05-20',
    owner: '孙丽',
    tags: ['租赁', '仓库'],
  },
  {
    id: 'CT-2026-008',
    contractNo: 'HT-2026-0089',
    title: { en: 'Iron Ore Import Agreement', zh: '铁矿石进口协议' },
    partner: 'BHP Billiton Australia',
    type: { en: 'Purchase', zh: '采购合同' },
    amount: 38000000,
    currency: '¥',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    signDate: '2025-12-15',
    owner: '张伟',
    tags: ['进口', '铁矿', '澳洲', '年度'],
  },
];

const CONTRACT_TREND_DATA = [
  { month: '10月', active: 12, new: 4, expired: 2 },
  { month: '11月', active: 14, new: 5, expired: 3 },
  { month: '12月', active: 16, new: 6, expired: 4 },
  { month: '1月', active: 18, new: 7, expired: 2 },
  { month: '2月', active: 21, new: 5, expired: 2 },
  { month: '3月', active: 23, new: 6, expired: 4 },
];

const CONTRACT_TYPE_DATA = [
  { name: '采购合同', value: 35, color: '#3b82f6' },
  { name: '销售合同', value: 28, color: '#10b981' },
  { name: '框架协议', value: 15, color: '#8b5cf6' },
  { name: '服务合同', value: 12, color: '#f59e0b' },
  { name: '其他', value: 10, color: '#6b7280' },
];

const CONTRACT_AMOUNT_DATA = [
  { month: '10月', purchase: 1800, sales: 1200 },
  { month: '11月', purchase: 2200, sales: 1500 },
  { month: '12月', purchase: 2500, sales: 1800 },
  { month: '1月', purchase: 3200, sales: 2100 },
  { month: '2月', purchase: 2800, sales: 2400 },
  { month: '3月', purchase: 3500, sales: 2800 },
];

const TEMPLATE_LIST = [
  {
    id: 'T1',
    name: { en: 'Standard Purchase Agreement', zh: '标准采购合同' },
    uses: 128,
    updated: '2026-02-15',
  },
  {
    id: 'T2',
    name: { en: 'Sales Contract Template', zh: '销售合同模板' },
    uses: 95,
    updated: '2026-02-20',
  },
  {
    id: 'T3',
    name: { en: 'Framework Agreement', zh: '框架协议模板' },
    uses: 42,
    updated: '2026-01-10',
  },
  {
    id: 'T4',
    name: { en: 'Service Agreement', zh: '服务合同模板' },
    uses: 67,
    updated: '2026-03-01',
  },
  {
    id: 'T5',
    name: { en: 'Lease Agreement', zh: '租赁合同模板' },
    uses: 31,
    updated: '2026-01-25',
  },
  {
    id: 'T6',
    name: { en: 'Processing Contract', zh: '加工合同模板' },
    uses: 23,
    updated: '2026-02-08',
  },
];

export function Contracts({ currentLanguage }: ContractsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'all'>('all');
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const isZh = currentLanguage === 'zh';

  const tabs: { id: TabType; label: { en: string; zh: string }; icon: React.ElementType }[] = [
    { id: 'overview', label: { en: 'Overview', zh: '总览' }, icon: BarChart3 },
    { id: 'list', label: { en: 'Contract List', zh: '合同列表' }, icon: FileText },
    { id: 'templates', label: { en: 'Templates', zh: '合同模板' }, icon: Copy },
    { id: 'analytics', label: { en: 'Analytics', zh: '数据分析' }, icon: PieChart },
  ];

  const statusConfig: Record<
    ContractStatus,
    { label: { en: string; zh: string }; color: string; bg: string; icon: React.ElementType }
  > = {
    draft: {
      label: { en: 'Draft', zh: '草稿' },
      color: 'text-gray-400',
      bg: 'bg-gray-500/20',
      icon: Edit3,
    },
    pending: {
      label: { en: 'Pending', zh: '待审批' },
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      icon: Clock,
    },
    active: {
      label: { en: 'Active', zh: '执行中' },
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      icon: CheckCircle2,
    },
    expired: {
      label: { en: 'Expired', zh: '已到期' },
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      icon: AlertTriangle,
    },
    terminated: {
      label: { en: 'Terminated', zh: '已终止' },
      color: 'text-rose-400',
      bg: 'bg-rose-500/20',
      icon: XCircle,
    },
  };

  const filteredContracts = MOCK_CONTRACTS.filter((c) => {
    const matchSearch =
      searchTerm === '' ||
      c.title.zh.includes(searchTerm) ||
      c.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: MOCK_CONTRACTS.length,
    active: MOCK_CONTRACTS.filter((c) => c.status === 'active').length,
    pending: MOCK_CONTRACTS.filter((c) => c.status === 'pending').length,
    totalAmount: MOCK_CONTRACTS.filter((c) => c.status === 'active').reduce(
      (sum, c) => sum + c.amount,
      0
    ),
    expiringSoon: MOCK_CONTRACTS.filter((c) => {
      if (c.status !== 'active') return false;
      const end = new Date(c.endDate);
      const now = new Date();
      const diff = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 90 && diff > 0;
    }).length,
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) return `¥ ${(amount / 10000000).toFixed(1)}千万`;
    if (amount >= 10000) return `¥ ${(amount / 10000).toFixed(0)}万`;
    return `¥ ${amount.toLocaleString()}`;
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-indigo-500/20">
            <FileSignature className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '合同管理' : 'Contract Management'}</h1>
            <p className="text-sm text-gray-400">
              {isZh ? '电子合同全生命周期管理' : 'Full lifecycle electronic contract management'}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all shadow-lg shadow-indigo-500/25">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '新建合同' : 'New Contract'}</span>
        </button>
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
                  ? 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-white border border-indigo-500/30'
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: isZh ? '合同总数' : 'Total Contracts',
                value: stats.total.toString(),
                sub: isZh ? '本年度' : 'This Year',
                icon: FileText,
                gradient: 'from-blue-500 to-cyan-500',
                trend: '+12%',
              },
              {
                label: isZh ? '执行中' : 'Active',
                value: stats.active.toString(),
                sub: isZh ? '正常履约' : 'On Track',
                icon: CheckCircle2,
                gradient: 'from-emerald-500 to-green-500',
                trend: '+8%',
              },
              {
                label: isZh ? '合同总金额' : 'Total Amount',
                value: formatAmount(stats.totalAmount),
                sub: isZh ? '执行中合同' : 'Active Contracts',
                icon: DollarSign,
                gradient: 'from-amber-500 to-orange-500',
                trend: '+23%',
              },
              {
                label: isZh ? '即将到期' : 'Expiring Soon',
                value: stats.expiringSoon.toString(),
                sub: isZh ? '90天内到期' : 'Within 90 Days',
                icon: AlertTriangle,
                gradient: 'from-red-500 to-rose-500',
                trend: '-2',
              },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="relative group bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl text-white mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}
                    >
                      <StatIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">{stat.trend}</span>
                    <span className="text-xs text-gray-500">
                      {isZh ? '较上期' : 'vs last period'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contract Trend */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '合同数量趋势' : 'Contract Trend'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={CONTRACT_TREND_DATA}>
                    <defs>
                      <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
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
                    <Area
                      type="monotone"
                      dataKey="active"
                      stroke="#6366f1"
                      fill="url(#activeGrad)"
                      strokeWidth={2}
                      name={isZh ? '活跃合同' : 'Active'}
                    />
                    <Area
                      type="monotone"
                      dataKey="new"
                      stroke="#10b981"
                      fill="url(#newGrad)"
                      strokeWidth={2}
                      name={isZh ? '新增合同' : 'New'}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Contract Type Distribution */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '合同类型分布' : 'Contract Type Distribution'}
              </h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <RechartsPie>
                      <Pie
                        data={CONTRACT_TYPE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {CONTRACT_TYPE_DATA.map((entry, index) => (
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
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-3">
                  {CONTRACT_TYPE_DATA.map((item, idx) => (
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

          {/* Recent Contracts */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">{isZh ? '最近合同' : 'Recent Contracts'}</h3>
              <button
                onClick={() => setActiveTab('list')}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {isZh ? '查看全部' : 'View All'} →
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_CONTRACTS.slice(0, 5).map((contract) => {
                const statusConf = statusConfig[contract.status];
                const StatusIcon = statusConf.icon;
                return (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                    onClick={() =>
                      setSelectedContract(contract.id === selectedContract ? null : contract.id)
                    }
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg ${statusConf.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <StatusIcon className={`w-4 h-4 ${statusConf.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white truncate">
                            {isZh ? contract.title.zh : contract.title.en}
                          </span>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {contract.contractNo}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{contract.partner}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 flex-shrink-0">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-white">{formatAmount(contract.amount)}</p>
                        <p className="text-xs text-gray-500">
                          {contract.startDate} ~ {contract.endDate}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full ${statusConf.bg} ${statusConf.color}`}
                      >
                        {isZh ? statusConf.label.zh : statusConf.label.en}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Contract List Tab */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={
                  isZh ? '搜索合同编号、名称、合作方...' : 'Search contract no, name, partner...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'active', 'pending', 'draft', 'expired'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg text-xs transition-all ${
                    statusFilter === status
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800/40 text-gray-400 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {status === 'all'
                    ? isZh
                      ? '全部'
                      : 'All'
                    : isZh
                      ? statusConfig[status].label.zh
                      : statusConfig[status].label.en}
                </button>
              ))}
            </div>
          </div>

          {/* Contract Cards */}
          <div className="space-y-3">
            {filteredContracts.map((contract) => {
              const statusConf = statusConfig[contract.status];
              const StatusIcon = statusConf.icon;
              const isExpanded = selectedContract === contract.id;

              return (
                <div
                  key={contract.id}
                  className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all ${
                    isExpanded ? 'border-indigo-500/30' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer"
                    onClick={() => setSelectedContract(isExpanded ? null : contract.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl ${statusConf.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <StatusIcon className={`w-5 h-5 ${statusConf.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-white truncate">
                            {isZh ? contract.title.zh : contract.title.en}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full ${statusConf.bg} ${statusConf.color}`}
                          >
                            {isZh ? statusConf.label.zh : statusConf.label.en}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{contract.contractNo}</span>
                          <span className="text-xs text-gray-500">|</span>
                          <span className="text-xs text-gray-400">{contract.partner}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <div className="text-right hidden lg:block">
                        <p className="text-white">{formatAmount(contract.amount)}</p>
                        <p className="text-xs text-gray-500">
                          {isZh ? contract.type.zh : contract.type.en}
                        </p>
                      </div>
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-white/5">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{isZh ? '合同类型' : 'Type'}</p>
                          <p className="text-sm text-white">
                            {isZh ? contract.type.zh : contract.type.en}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {isZh ? '合同金额' : 'Amount'}
                          </p>
                          <p className="text-sm text-white">
                            {contract.currency} {contract.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{isZh ? '有效期' : 'Period'}</p>
                          <p className="text-sm text-white">
                            {contract.startDate} ~ {contract.endDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{isZh ? '负责人' : 'Owner'}</p>
                          <p className="text-sm text-white">{contract.owner}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        {contract.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                        <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs hover:bg-indigo-500/30 transition-all">
                          <Eye className="w-3.5 h-3.5" /> <span>{isZh ? '查看' : 'View'}</span>
                        </button>
                        <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs hover:bg-amber-500/30 transition-all">
                          <Edit3 className="w-3.5 h-3.5" /> <span>{isZh ? '编辑' : 'Edit'}</span>
                        </button>
                        <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-500/30 transition-all">
                          <Download className="w-3.5 h-3.5" />{' '}
                          <span>{isZh ? '下载' : 'Download'}</span>
                        </button>
                        <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs hover:bg-blue-500/30 transition-all">
                          <Send className="w-3.5 h-3.5" /> <span>{isZh ? '发送' : 'Send'}</span>
                        </button>
                        {contract.status === 'expired' && (
                          <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs hover:bg-purple-500/30 transition-all">
                            <RefreshCw className="w-3.5 h-3.5" />{' '}
                            <span>{isZh ? '续签' : 'Renew'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredContracts.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>{isZh ? '未找到匹配的合同' : 'No contracts found'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              {isZh
                ? `共 ${TEMPLATE_LIST.length} 个合同模板`
                : `${TEMPLATE_LIST.length} templates available`}
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30 hover:bg-indigo-500/30 transition-all text-sm">
              <Plus className="w-4 h-4" />
              <span>{isZh ? '新建模板' : 'New Template'}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATE_LIST.map((template) => (
              <div
                key={template.id}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center border border-indigo-500/20">
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/5">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <h4 className="text-white mt-3">{isZh ? template.name.zh : template.name.en}</h4>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>{isZh ? `已使用 ${template.uses} 次` : `Used ${template.uses} times`}</span>
                  <span>
                    {isZh ? '更新于 ' : 'Updated '}
                    {template.updated}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs hover:bg-indigo-500/30 transition-all text-center">
                    {isZh ? '使用模板' : 'Use Template'}
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-slate-700/50 text-gray-300 text-xs hover:bg-slate-700/70 transition-all">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Amount Comparison Chart */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh
                ? '采购 vs 销售合同金额对比 (万元)'
                : 'Purchase vs Sales Contract Amount (10K CNY)'}
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={CONTRACT_AMOUNT_DATA}>
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
                    dataKey="purchase"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    name={isZh ? '采购' : 'Purchase'}
                  />
                  <Bar
                    dataKey="sales"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                    name={isZh ? '销售' : 'Sales'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analytics KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '平均合同周期' : 'Avg Contract Duration'}
                </span>
              </div>
              <p className="text-2xl text-white">8.3 {isZh ? '个月' : 'months'}</p>
              <p className="text-xs text-emerald-400 mt-1">
                +0.5 {isZh ? '较上年' : 'vs last year'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <RefreshCw className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '合同续签率' : 'Renewal Rate'}
                </span>
              </div>
              <p className="text-2xl text-white">78.5%</p>
              <p className="text-xs text-emerald-400 mt-1">
                +5.2% {isZh ? '较上季度' : 'vs last quarter'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '平均审批时长' : 'Avg Approval Time'}
                </span>
              </div>
              <p className="text-2xl text-white">3.2 {isZh ? '天' : 'days'}</p>
              <p className="text-xs text-emerald-400 mt-1">
                -1.1 {isZh ? '天较上月' : 'days vs last month'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
