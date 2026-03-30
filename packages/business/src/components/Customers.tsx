import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreVertical,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Building2,
  Star,
  ArrowUpRight
} from 'lucide-react';
import { Button } from './ui/button';
import { AIContextBanner } from './AIContextBanner';
import { useNavigationContext, generateRecommendations } from '../hooks/useNavigationContext';

interface CustomersProps {
  currentLanguage: string;
  navigationContext?: Record<string, any>;
  onNavigate?: (view: string, context?: Record<string, any>) => void;
}

export function Customers({ currentLanguage, navigationContext, onNavigate }: CustomersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Phase 12A: 消费导航上下文
  const { 
    hasContext, 
    context, 
    contextData, 
    shouldHighlight, 
    getFilterCriteria,
    getRecommendations 
  } = useNavigationContext(navigationContext, 'customers');

  // Phase 12A: 自动筛选逻辑
  const filterCriteria = useMemo(() => getFilterCriteria(), [getFilterCriteria]);

  // Phase 12A: 生成智能推荐
  const recommendations = useMemo(() => {
    if (!hasContext || !context) return [];
    
    const sourceModule = context.source || context.sourceModule || '';
    const baseRecommendations = generateRecommendations(sourceModule, 'customers', contextData);
    
    // 添加上下文特定推荐
    if (contextData.customerId) {
      baseRecommendations.push({
        title: currentLanguage === 'zh' ? '查看客户订单' : 'View Customer Orders',
        description: currentLanguage === 'zh' ? '查看该客户的所有订单记录' : 'View all orders for this customer',
        action: 'navigate',
        data: { target: 'orders', customerId: contextData.customerId }
      });
      baseRecommendations.push({
        title: currentLanguage === 'zh' ? '查看客户项目' : 'View Customer Projects',
        description: currentLanguage === 'zh' ? '查看与该客户相关的所有项目' : 'View all projects related to this customer',
        action: 'navigate',
        data: { target: 'projects', customerId: contextData.customerId }
      });
    }
    
    return baseRecommendations;
  }, [hasContext, context, contextData, currentLanguage]);

  // Phase 12A: 处理推荐采纳
  const handleAcceptRecommendation = (recommendation: any) => {
    console.log('[Customers] Accepting recommendation:', recommendation);
    if (recommendation.action === 'navigate' && onNavigate) {
      onNavigate(recommendation.data.target, {
        source: 'customers',
        customerId: recommendation.data.customerId,
        recommendations: []
      });
    }
  };

  const customers = [
    {
      id: 'CUST-001',
      name: { en: 'Al-Rajhi Steel Industries', zh: '拉吉钢铁工业' },
      contact: 'Ahmed Al-Rajhi',
      phone: '+966 50 123 4567',
      email: 'ahmed@alrajhisteel.sa',
      location: { en: 'Riyadh Industrial City', zh: '利雅得工业城' },
      totalOrders: 145,
      totalValue: '2,847,593',
      status: 'active',
      rating: 5,
      lastOrder: '2025-02-01'
    },
    {
      id: 'CUST-002',
      name: { en: 'SABIC Materials Group', zh: 'SABIC 材料集团' },
      contact: 'Mohammed bin Salman',
      phone: '+966 50 234 5678',
      email: 'procurement@sabic.sa',
      location: { en: 'Jubail Industrial', zh: '朱拜尔工业区' },
      totalOrders: 98,
      totalValue: '1,923,847',
      status: 'active',
      rating: 5,
      lastOrder: '2025-01-28'
    },
    {
      id: 'CUST-003',
      name: { en: 'Dammam Metal Recycling', zh: '达曼金属回收' },
      contact: 'Khalid Al-Otaibi',
      phone: '+966 50 345 6789',
      email: 'khalid@dammammetal.sa',
      location: { en: 'Dammam Port Area', zh: '达曼港口区' },
      totalOrders: 67,
      totalValue: '876,234',
      status: 'active',
      rating: 4,
      lastOrder: '2025-02-02'
    },
    {
      id: 'CUST-004',
      name: { en: 'Jeddah Construction Co.', zh: '吉达建筑公司' },
      contact: 'Abdullah Hassan',
      phone: '+966 50 456 7890',
      email: 'procurement@jeddahconst.sa',
      location: { en: 'Jeddah Economic City', zh: '吉达经济城' },
      totalOrders: 52,
      totalValue: '654,891',
      status: 'pending',
      rating: 4,
      lastOrder: '2025-01-15'
    },
    {
      id: 'CUST-005',
      name: { en: 'NEOM Infrastructure', zh: 'NEOM 基础设施' },
      contact: 'Fahad Al-Mutairi',
      phone: '+966 50 567 8901',
      email: 'supply@neom.sa',
      location: { en: 'NEOM Project Area', zh: 'NEOM 项目区' },
      totalOrders: 34,
      totalValue: '1,456,789',
      status: 'active',
      rating: 5,
      lastOrder: '2025-01-30'
    },
    {
      id: 'CUST-006',
      name: { en: 'Taif Metal Works', zh: '塔伊夫金属制品' },
      contact: 'Salem Al-Ghamdi',
      phone: '+966 50 678 9012',
      email: 'salem@taifmetal.sa',
      location: { en: 'Taif Industrial', zh: '塔伊夫工业区' },
      totalOrders: 28,
      totalValue: '432,156',
      status: 'inactive',
      rating: 3,
      lastOrder: '2024-12-10'
    }
  ];

  const stats = [
    {
      title: { en: 'Total Customers', zh: '总客户数' },
      value: '1,274',
      change: '+12.5%',
      trend: 'up',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: { en: 'Active Customers', zh: '活跃客户' },
      value: '847',
      change: '+8.2%',
      trend: 'up',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: { en: 'Total Revenue', zh: '总收入' },
      value: '8,191,510 ﷼',
      change: '+15.3%',
      trend: 'up',
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: { en: 'Avg Order Value', zh: '平均订单额' },
      value: '18,945 ﷼',
      change: '+3.7%',
      trend: 'up',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: { en: 'Active', zh: '活跃' },
      pending: { en: 'Pending', zh: '待定' },
      inactive: { en: 'Inactive', zh: '不活跃' }
    };
    return labels[status as keyof typeof labels][currentLanguage as keyof typeof labels.active];
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Phase 12A: AI Context Banner */}
      {hasContext && context && (
        <AIContextBanner
          context={{
            ...context,
            recommendations
          }}
          onClose={() => {
            // 清除上下文需要父组件支持
            console.log('[Customers] Context banner closed');
          }}
          onAcceptRecommendation={handleAcceptRecommendation}
          currentLanguage={currentLanguage}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/30">
            <Users className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Customer Management' : '客户管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en' ? 'Manage and track all customer relationships' : '管理和跟踪所有客户关系'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Add Customer' : '添加客户'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">
                {stat.title[currentLanguage as keyof typeof stat.title]}
              </h3>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <span className="text-emerald-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search customers...' : '搜索客户...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
            >
              <option value="all">{currentLanguage === 'en' ? 'All Status' : '所有状态'}</option>
              <option value="active">{currentLanguage === 'en' ? 'Active' : '活跃'}</option>
              <option value="pending">{currentLanguage === 'en' ? 'Pending' : '待定'}</option>
              <option value="inactive">{currentLanguage === 'en' ? 'Inactive' : '不活跃'}</option>
            </select>
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

      {/* Customers Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-800/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Customer' : '客户'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Contact' : '联系方式'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Location' : '位置'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Orders' : '订单数'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Total Value' : '总价值'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Status' : '状态'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Rating' : '评分'}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Actions' : '操作'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {customers.map((customer, index) => {
                // Phase 12A: 判断是否应该高亮该客户
                const isHighlighted = shouldHighlight(customer.id);
                
                return (
                  <tr 
                    key={customer.id}
                    className={`
                      transition-all duration-300 group
                      ${isHighlighted 
                        ? 'bg-purple-500/10 border-l-4 border-purple-500 hover:bg-purple-500/15' 
                        : 'hover:bg-slate-800/30'
                      }
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/30">
                          <Building2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {customer.name[currentLanguage as keyof typeof customer.name]}
                          </p>
                          <p className="text-gray-400 text-sm">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                          <Phone className="w-3 h-3 text-gray-500" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <span>{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span className="text-sm">
                          {customer.location[currentLanguage as keyof typeof customer.location]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{customer.totalOrders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-emerald-400 font-semibold">{customer.totalValue} ﷼</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                        {getStatusLabel(customer.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < customer.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button className="bg-slate-800/50 hover:bg-emerald-500/20 text-white p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between glass-card rounded-2xl p-4 border border-white/10">
        <p className="text-gray-400 text-sm">
          {currentLanguage === 'en' ? 'Showing 6 of 1,274 customers' : '显示 1,274 个客户中的 6 个'}
        </p>
        <div className="flex items-center space-x-2">
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-lg transition-all duration-300">
            {currentLanguage === 'en' ? 'Previous' : '上一页'}
          </Button>
          <Button className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg">
            1
          </Button>
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-lg transition-all duration-300">
            2
          </Button>
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-lg transition-all duration-300">
            3
          </Button>
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-lg transition-all duration-300">
            {currentLanguage === 'en' ? 'Next' : '下一页'}
          </Button>
        </div>
      </div>
    </div>
  );
}