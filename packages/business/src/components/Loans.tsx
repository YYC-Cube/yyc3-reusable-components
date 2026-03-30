import React, { useState } from 'react';
import {
  HandIcon,
  Search,
  Plus,
  Filter,
  Download,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  User,
  TrendingDown,
  Percent,
} from 'lucide-react';
import { Button } from '@yyc3/ui';

interface LoansProps {
  currentLanguage: string;
}

export function Loans({ currentLanguage }: LoansProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const loans = [
    {
      id: 'LOAN-2025-001',
      borrower: { en: 'Al-Rajhi Steel Industries', zh: '拉吉钢铁工业' },
      type: { en: 'Business Loan', zh: '商业贷款' },
      principal: '500,000',
      outstanding: '325,000',
      interestRate: '5.5',
      startDate: '2024-06-01',
      endDate: '2026-06-01',
      nextPayment: '2025-03-01',
      monthlyPayment: '22,500',
      status: 'active',
      completion: 35,
    },
    {
      id: 'LOAN-2025-002',
      borrower: { en: 'SABIC Materials Group', zh: 'SABIC 材料集团' },
      type: { en: 'Equipment Finance', zh: '设备融资' },
      principal: '850,000',
      outstanding: '680,000',
      interestRate: '4.8',
      startDate: '2024-09-15',
      endDate: '2027-09-15',
      nextPayment: '2025-03-15',
      monthlyPayment: '28,500',
      status: 'active',
      completion: 20,
    },
    {
      id: 'LOAN-2024-015',
      borrower: { en: 'Dammam Metal Recycling', zh: '达曼金属回收' },
      type: { en: 'Working Capital', zh: '流动资金' },
      principal: '300,000',
      outstanding: '75,000',
      interestRate: '6.2',
      startDate: '2023-12-01',
      endDate: '2025-12-01',
      nextPayment: '2025-03-01',
      monthlyPayment: '15,000',
      status: 'active',
      completion: 75,
    },
    {
      id: 'LOAN-2024-008',
      borrower: { en: 'Jeddah Construction Co.', zh: '吉达建筑公司' },
      type: { en: 'Project Finance', zh: '项目融资' },
      principal: '1,200,000',
      outstanding: '0',
      interestRate: '5.0',
      startDate: '2022-03-10',
      endDate: '2024-12-10',
      nextPayment: '-',
      monthlyPayment: '0',
      status: 'completed',
      completion: 100,
    },
    {
      id: 'LOAN-2024-012',
      borrower: { en: 'NEOM Infrastructure', zh: 'NEOM 基础设施' },
      type: { en: 'Business Expansion', zh: '业务扩张' },
      principal: '650,000',
      outstanding: '610,000',
      interestRate: '5.3',
      startDate: '2024-11-01',
      endDate: '2026-11-01',
      nextPayment: '2025-03-05',
      monthlyPayment: '26,000',
      status: 'overdue',
      completion: 6,
    },
  ];

  const stats = [
    {
      title: { en: 'Total Loans Issued', zh: '已发放贷款' },
      value: '3.5M ﷼',
      change: '+18.5%',
      color: 'from-rose-500 to-pink-500',
      icon: HandIcon,
    },
    {
      title: { en: 'Outstanding Balance', zh: '未偿余额' },
      value: '1.69M ﷼',
      change: '-12.3%',
      color: 'from-yellow-500 to-orange-500',
      icon: TrendingDown,
    },
    {
      title: { en: 'Active Loans', zh: '活跃贷款' },
      value: '28',
      change: '+5.2%',
      color: 'from-blue-500 to-cyan-500',
      icon: CheckCircle2,
    },
    {
      title: { en: 'Avg Interest Rate', zh: '平均利率' },
      value: '5.36%',
      change: '-0.3%',
      color: 'from-purple-500 to-pink-500',
      icon: Percent,
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Active', zh: '正常' },
      },
      overdue: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertCircle,
        label: { en: 'Overdue', zh: '逾期' },
      },
      completed: {
        color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        icon: CheckCircle2,
        label: { en: 'Completed', zh: '已完成' },
      },
      pending: {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: Clock,
        label: { en: 'Pending', zh: '待批' },
      },
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 flex items-center justify-center border border-rose-500/30">
            <HandIcon className="w-7 h-7 text-rose-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Loan Management' : '贷款管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'Track and manage all business loans and financing'
                : '跟踪和管理所有商业贷款和融资'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-rose-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'New Loan' : '新建贷款'}
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
                <Icon className="w-5 h-5 text-rose-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <span
                    className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-400' : 'text-rose-400'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>
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
                placeholder={currentLanguage === 'en' ? 'Search loans...' : '搜索贷款...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/30 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all duration-300">
              <option value="all">{currentLanguage === 'en' ? 'All Status' : '所有状态'}</option>
              <option value="active">{currentLanguage === 'en' ? 'Active' : '正常'}</option>
              <option value="overdue">{currentLanguage === 'en' ? 'Overdue' : '逾期'}</option>
              <option value="completed">{currentLanguage === 'en' ? 'Completed' : '已完成'}</option>
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

      {/* Loans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loans.map((loan, index) => {
          const statusConfig = getStatusConfig(loan.status);
          const StatusIcon = statusConfig.icon;
          const repaymentProgress = loan.completion;

          return (
            <div
              key={loan.id}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Loan Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 flex items-center justify-center border border-rose-500/30">
                    <HandIcon className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{loan.id}</p>
                    <p className="text-gray-400 text-sm">
                      {loan.type[currentLanguage as keyof typeof loan.type]}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  <span>
                    {statusConfig.label[currentLanguage as keyof typeof statusConfig.label]}
                  </span>
                </span>
              </div>

              {/* Borrower */}
              <div className="mb-4 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  {loan.borrower[currentLanguage as keyof typeof loan.borrower]}
                </span>
              </div>

              {/* Financial Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Principal' : '本金'}
                  </p>
                  <p className="text-white font-semibold">{loan.principal} ﷼</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Outstanding' : '未偿'}
                  </p>
                  <p className="text-rose-400 font-semibold">{loan.outstanding} ﷼</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Interest Rate' : '利率'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Percent className="w-3 h-3 text-purple-400" />
                    <p className="text-purple-400 font-semibold">{loan.interestRate}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Monthly Payment' : '月供'}
                  </p>
                  <p className="text-green-400 font-semibold">{loan.monthlyPayment} ﷼</p>
                </div>
              </div>

              {/* Repayment Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">
                    {currentLanguage === 'en' ? 'Repayment Progress' : '还款进度'}
                  </span>
                  <span className="text-rose-400 text-sm font-medium">{repaymentProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      repaymentProgress === 100
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : repaymentProgress >= 50
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          : 'bg-gradient-to-r from-rose-500 to-pink-500'
                    }`}
                    style={{ width: `${repaymentProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Date Info */}
              <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-slate-700/30">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {loan.startDate} → {loan.endDate}
                  </span>
                </div>
                {loan.nextPayment !== '-' && (
                  <div className="text-amber-400 font-medium">
                    {currentLanguage === 'en' ? 'Next' : '下次'}: {loan.nextPayment}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
