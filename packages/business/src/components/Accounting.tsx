import React, { useState } from 'react';
import {
  Calculator,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
} from 'lucide-react';
import { Button } from '@yyc3/ui';

interface AccountingProps {
  currentLanguage: string;
}

export function Accounting({ currentLanguage }: AccountingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [period, setPeriod] = useState('month');

  const accounts = [
    {
      category: { en: 'Assets', zh: '资产' },
      color: 'from-green-500 to-emerald-500',
      icon: Wallet,
      accounts: [
        {
          name: { en: 'Cash & Bank', zh: '现金及银行存款' },
          balance: '2,456,789',
          change: '+12.5%',
        },
        {
          name: { en: 'Accounts Receivable', zh: '应收账款' },
          balance: '1,876,543',
          change: '+8.3%',
        },
        { name: { en: 'Inventory', zh: '存货' }, balance: '3,234,567', change: '+15.2%' },
        { name: { en: 'Fixed Assets', zh: '固定资产' }, balance: '8,765,432', change: '+2.1%' },
      ],
    },
    {
      category: { en: 'Liabilities', zh: '负债' },
      color: 'from-red-500 to-pink-500',
      icon: CreditCard,
      accounts: [
        { name: { en: 'Accounts Payable', zh: '应付账款' }, balance: '1,234,567', change: '-5.4%' },
        { name: { en: 'Loans Payable', zh: '应付贷款' }, balance: '1,690,000', change: '-8.7%' },
        { name: { en: 'Accrued Expenses', zh: '应计费用' }, balance: '345,678', change: '+3.2%' },
        { name: { en: 'Other Liabilities', zh: '其他负债' }, balance: '123,456', change: '+1.5%' },
      ],
    },
    {
      category: { en: 'Equity', zh: '权益' },
      color: 'from-blue-500 to-cyan-500',
      icon: Building2,
      accounts: [
        { name: { en: "Owner's Equity", zh: '所有者权益' }, balance: '12,000,000', change: '+0%' },
        {
          name: { en: 'Retained Earnings', zh: '留存收益' },
          balance: '2,876,543',
          change: '+18.5%',
        },
        {
          name: { en: 'Current Year Profit', zh: '本年利润' },
          balance: '987,654',
          change: '+25.3%',
        },
      ],
    },
    {
      category: { en: 'Revenue', zh: '收入' },
      color: 'from-purple-500 to-pink-500',
      icon: TrendingUp,
      accounts: [
        { name: { en: 'Sales Revenue', zh: '销售收入' }, balance: '8,765,432', change: '+22.4%' },
        { name: { en: 'Service Revenue', zh: '服务收入' }, balance: '1,234,567', change: '+15.8%' },
        { name: { en: 'Other Revenue', zh: '其他收入' }, balance: '234,567', change: '+8.9%' },
      ],
    },
    {
      category: { en: 'Expenses', zh: '费用' },
      color: 'from-orange-500 to-red-500',
      icon: TrendingDown,
      accounts: [
        {
          name: { en: 'Cost of Goods Sold', zh: '销售成本' },
          balance: '4,567,890',
          change: '+12.3%',
        },
        {
          name: { en: 'Operating Expenses', zh: '运营费用' },
          balance: '1,876,543',
          change: '+8.7%',
        },
        { name: { en: 'Salaries & Wages', zh: '工资薪酬' }, balance: '1,234,567', change: '+5.2%' },
        { name: { en: 'Depreciation', zh: '折旧费用' }, balance: '345,678', change: '+2.1%' },
      ],
    },
  ];

  const financialRatios = [
    {
      name: { en: 'Current Ratio', zh: '流动比率' },
      value: '2.85',
      target: '2.00',
      status: 'good',
      description: { en: 'Liquidity measure', zh: '流动性指标' },
    },
    {
      name: { en: 'Quick Ratio', zh: '速动比率' },
      value: '1.92',
      target: '1.50',
      status: 'good',
      description: { en: 'Immediate liquidity', zh: '即时流动性' },
    },
    {
      name: { en: 'Debt to Equity', zh: '负债权益比' },
      value: '0.28',
      target: '0.50',
      status: 'good',
      description: { en: 'Financial leverage', zh: '财务杠杆' },
    },
    {
      name: { en: 'Gross Profit Margin', zh: '毛利率' },
      value: '48.5%',
      target: '45.0%',
      status: 'good',
      description: { en: 'Profitability', zh: '盈利能力' },
    },
    {
      name: { en: 'Net Profit Margin', zh: '净利率' },
      value: '12.3%',
      target: '10.0%',
      status: 'good',
      description: { en: 'Bottom line', zh: '净收益' },
    },
    {
      name: { en: 'ROE', zh: '净资产收益率' },
      value: '15.8%',
      target: '12.0%',
      status: 'good',
      description: { en: 'Return on equity', zh: '权益回报' },
    },
  ];

  const stats = [
    {
      title: { en: 'Total Assets', zh: '总资产' },
      value: '16.3M ﷼',
      change: '+12.5%',
      trend: 'up',
      color: 'from-green-500 to-emerald-500',
      icon: Wallet,
    },
    {
      title: { en: 'Total Liabilities', zh: '总负债' },
      value: '3.4M ﷼',
      change: '-5.2%',
      trend: 'down',
      color: 'from-red-500 to-pink-500',
      icon: CreditCard,
    },
    {
      title: { en: 'Total Equity', zh: '总权益' },
      value: '12.9M ﷼',
      change: '+15.8%',
      trend: 'up',
      color: 'from-blue-500 to-cyan-500',
      icon: Building2,
    },
    {
      title: { en: 'Net Income', zh: '净利润' },
      value: '987,654 ﷼',
      change: '+25.3%',
      trend: 'up',
      color: 'from-purple-500 to-pink-500',
      icon: TrendingUp,
    },
  ];

  const recentTransactions = [
    {
      date: '2025-02-03',
      description: { en: 'Payment from Al-Rajhi Steel', zh: '拉吉钢铁付款' },
      account: { en: 'Accounts Receivable', zh: '应收账款' },
      debit: '145,890',
      credit: '0',
      type: 'income',
    },
    {
      date: '2025-02-02',
      description: { en: 'Payment to Gulf Metal Suppliers', zh: '支付给海湾金属供应商' },
      account: { en: 'Accounts Payable', zh: '应付账款' },
      debit: '0',
      credit: '89,450',
      type: 'expense',
    },
    {
      date: '2025-02-01',
      description: { en: 'Salary Payment - January', zh: '1月工资支付' },
      account: { en: 'Salaries & Wages', zh: '工资薪酬' },
      debit: '0',
      credit: '102,500',
      type: 'expense',
    },
    {
      date: '2025-02-01',
      description: { en: 'Sales Revenue', zh: '销售收入' },
      account: { en: 'Sales Revenue', zh: '销售收入' },
      debit: '234,567',
      credit: '0',
      type: 'income',
    },
  ];

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10 flex items-center justify-center border border-fuchsia-500/30">
            <Calculator className="w-7 h-7 text-fuchsia-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Accounting & Finance' : '财务核算'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'Manage accounts, ledgers, and financial statements'
                : '管理账户、分类账和财务报表'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition-all duration-300"
          >
            <option value="month">{currentLanguage === 'en' ? 'This Month' : '本月'}</option>
            <option value="quarter">{currentLanguage === 'en' ? 'This Quarter' : '本季度'}</option>
            <option value="year">{currentLanguage === 'en' ? 'This Year' : '本年'}</option>
          </select>
          <Button className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-fuchsia-500/30">
            <Download className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Export Reports' : '导出报表'}
          </Button>
        </div>
      </div>

      {/* Financial Overview Stats */}
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
                <Icon className="w-5 h-5 text-fuchsia-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <span
                    className={`text-sm font-medium flex items-center space-x-1 ${
                      stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownLeft className="w-3 h-3" />
                    )}
                    <span>{stat.change}</span>
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

      {/* Chart of Accounts */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">
          {currentLanguage === 'en' ? 'Chart of Accounts' : '会计科目表'}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {accounts.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} opacity-20 flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {category.category[currentLanguage as keyof typeof category.category]}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.accounts.map((account, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-200"
                    >
                      <div>
                        <p className="text-gray-300 text-sm">
                          {account.name[currentLanguage as keyof typeof account.name]}
                        </p>
                        <p
                          className={`text-xs ${
                            account.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {account.change}
                        </p>
                      </div>
                      <p className="text-white font-semibold text-sm">{account.balance} ﷼</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Ratios */}
        <div className="lg:col-span-1 glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-xl font-bold text-white">
              {currentLanguage === 'en' ? 'Financial Ratios' : '财务比率'}
            </h2>
          </div>
          <div className="space-y-4">
            {financialRatios.map((ratio, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium text-sm">
                    {ratio.name[currentLanguage as keyof typeof ratio.name]}
                  </h3>
                  <span className="text-green-400 font-bold">{ratio.value}</span>
                </div>
                <p className="text-gray-400 text-xs mb-2">
                  {ratio.description[currentLanguage as keyof typeof ratio.description]}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {currentLanguage === 'en' ? 'Target' : '目标'}: {ratio.target}
                  </span>
                  <span className="text-green-400">
                    ✓ {currentLanguage === 'en' ? 'Good' : '良好'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-slate-700/30">
            <h2 className="text-xl font-bold text-white">
              {currentLanguage === 'en' ? 'Recent Transactions' : '最近交易'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/30 bg-slate-800/30">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Date' : '日期'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Description' : '描述'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Account' : '科目'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Debit' : '借方'}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Credit' : '贷方'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-slate-800/30 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{transaction.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white text-sm">
                        {
                          transaction.description[
                            currentLanguage as keyof typeof transaction.description
                          ]
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">
                        {transaction.account[currentLanguage as keyof typeof transaction.account]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {transaction.debit !== '0' && (
                        <span className="text-green-400 font-semibold">{transaction.debit} ﷼</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {transaction.credit !== '0' && (
                        <span className="text-red-400 font-semibold">{transaction.credit} ﷼</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
