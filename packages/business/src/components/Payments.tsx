import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Plus, 
  Filter, 
  Download,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { Button } from './ui/button';

interface PaymentsProps {
  currentLanguage: string;
}

export function Payments({ currentLanguage }: PaymentsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const payments = [
    {
      id: 'PAY-2025-001',
      type: 'received',
      customer: { en: 'Al-Rajhi Steel', zh: '拉吉钢铁' },
      amount: '145,890',
      date: '2025-02-03',
      method: { en: 'Bank Transfer', zh: '银行转账' },
      status: 'completed',
      reference: 'INV-2025-145'
    },
    {
      id: 'PAY-2025-002',
      type: 'sent',
      supplier: { en: 'Gulf Metal Suppliers', zh: '海湾金属供应商' },
      amount: '89,450',
      date: '2025-02-02',
      method: { en: 'Bank Transfer', zh: '银行转账' },
      status: 'completed',
      reference: 'PO-2025-089'
    },
    {
      id: 'PAY-2025-003',
      type: 'received',
      customer: { en: 'SABIC Materials', zh: 'SABIC 材料' },
      amount: '234,567',
      date: '2025-02-02',
      method: { en: 'Wire Transfer', zh: '电汇' },
      status: 'pending',
      reference: 'INV-2025-142'
    },
    {
      id: 'PAY-2025-004',
      type: 'sent',
      supplier: { en: 'Arabian Scrap Traders', zh: '阿拉伯废料贸易商' },
      amount: '67,890',
      date: '2025-02-01',
      method: { en: 'Check', zh: '支票' },
      status: 'processing',
      reference: 'PO-2025-076'
    },
    {
      id: 'PAY-2025-005',
      type: 'received',
      customer: { en: 'Dammam Metal Recycling', zh: '达曼金属回收' },
      amount: '123,456',
      date: '2025-01-31',
      method: { en: 'Bank Transfer', zh: '银行转账' },
      status: 'completed',
      reference: 'INV-2025-138'
    },
    {
      id: 'PAY-2025-006',
      type: 'received',
      customer: { en: 'NEOM Infrastructure', zh: 'NEOM 基础设施' },
      amount: '456,789',
      date: '2025-01-30',
      method: { en: 'Wire Transfer', zh: '电汇' },
      status: 'failed',
      reference: 'INV-2025-134'
    }
  ];

  const stats = [
    {
      title: { en: 'Total Received', zh: '总收款' },
      value: '5,678,942 ﷼',
      change: '+18.5%',
      color: 'from-green-500 to-emerald-500',
      icon: ArrowDownLeft
    },
    {
      title: { en: 'Total Sent', zh: '总付款' },
      value: '3,456,123 ﷼',
      change: '+12.3%',
      color: 'from-red-500 to-pink-500',
      icon: ArrowUpRight
    },
    {
      title: { en: 'Pending Payments', zh: '待处理付款' },
      value: '234 ﷼',
      change: '-5.2%',
      color: 'from-yellow-500 to-orange-500',
      icon: Clock
    },
    {
      title: { en: 'Net Balance', zh: '净余额' },
      value: '2,222,819 ﷼',
      change: '+25.7%',
      color: 'from-blue-500 to-cyan-500',
      icon: DollarSign
    }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      completed: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Completed', zh: '已完成' }
      },
      pending: {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: Clock,
        label: { en: 'Pending', zh: '待处理' }
      },
      processing: {
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Clock,
        label: { en: 'Processing', zh: '处理中' }
      },
      failed: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: XCircle,
        label: { en: 'Failed', zh: '失败' }
      }
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/30">
            <CreditCard className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Payment Management' : '支付管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en' ? 'Track and manage all financial transactions' : '跟踪和管理所有财务交易'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Record Payment' : '记录付款'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">
                  {stat.title[currentLanguage as keyof typeof stat.title]}
                </h3>
                <Icon className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search payments...' : '搜索付款...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/30 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300">
              <option value="all">{currentLanguage === 'en' ? 'All Types' : '所有类型'}</option>
              <option value="received">{currentLanguage === 'en' ? 'Received' : '收款'}</option>
              <option value="sent">{currentLanguage === 'en' ? 'Sent' : '付款'}</option>
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

      {/* Payments Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-800/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Payment ID' : '付款编号'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Type' : '类型'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Party' : '对方'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Amount' : '金额'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Method' : '方式'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Date' : '日期'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Status' : '状态'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Reference' : '参考'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {payments.map((payment, index) => {
                const statusConfig = getStatusConfig(payment.status);
                const StatusIcon = statusConfig.icon;
                const party = payment.type === 'received' ? payment.customer : payment.supplier;
                
                return (
                  <tr 
                    key={payment.id}
                    className="hover:bg-slate-800/30 transition-colors duration-200 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{payment.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${
                        payment.type === 'received' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {payment.type === 'received' ? (
                          <ArrowDownLeft className="w-3 h-3" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3" />
                        )}
                        <span className="text-xs font-medium">
                          {payment.type === 'received' 
                            ? (currentLanguage === 'en' ? 'Received' : '收款')
                            : (currentLanguage === 'en' ? 'Sent' : '付款')
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">
                        {party?.[currentLanguage as keyof typeof party]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        payment.type === 'received' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {payment.type === 'received' ? '+' : '-'}{payment.amount} ﷼
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">
                        {payment.method[currentLanguage as keyof typeof payment.method]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{payment.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusConfig.label[currentLanguage as keyof typeof statusConfig.label]}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">{payment.reference}</span>
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