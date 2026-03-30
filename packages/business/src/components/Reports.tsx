import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Download,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  Package,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from 'lucide-react';
import { Button } from '@yyc3/ui';

interface ReportsProps {
  currentLanguage: string;
}

export function Reports({ currentLanguage }: ReportsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('month');

  const reportCategories = [
    {
      id: 'financial',
      title: { en: 'Financial Reports', zh: '财务报表' },
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      reports: [
        { name: { en: 'Profit & Loss Statement', zh: '损益表' }, count: 12 },
        { name: { en: 'Balance Sheet', zh: '资产负债表' }, count: 12 },
        { name: { en: 'Cash Flow Statement', zh: '现金流量表' }, count: 12 },
        { name: { en: 'Financial Ratios', zh: '财务比率分析' }, count: 4 },
      ],
    },
    {
      id: 'sales',
      title: { en: 'Sales Reports', zh: '销售报表' },
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      reports: [
        { name: { en: 'Sales by Customer', zh: '客户销售报表' }, count: 24 },
        { name: { en: 'Sales by Product', zh: '产品销售报表' }, count: 18 },
        { name: { en: 'Monthly Sales Trends', zh: '月度销售趋势' }, count: 12 },
        { name: { en: 'Sales Forecast', zh: '销售预测' }, count: 6 },
      ],
    },
    {
      id: 'inventory',
      title: { en: 'Inventory Reports', zh: '库存报表' },
      icon: Package,
      color: 'from-purple-500 to-pink-500',
      reports: [
        { name: { en: 'Stock Levels', zh: '库存水平' }, count: 30 },
        { name: { en: 'Inventory Turnover', zh: '库存周转率' }, count: 12 },
        { name: { en: 'Material Valuation', zh: '材料估值' }, count: 12 },
        { name: { en: 'Low Stock Alert', zh: '低库存预警' }, count: 8 },
      ],
    },
    {
      id: 'customer',
      title: { en: 'Customer Reports', zh: '客户报表' },
      icon: Users,
      color: 'from-amber-500 to-orange-500',
      reports: [
        { name: { en: 'Customer Analysis', zh: '客户分析' }, count: 15 },
        { name: { en: 'Top Customers', zh: '重点客户' }, count: 10 },
        { name: { en: 'Customer Retention', zh: '客户保留率' }, count: 12 },
        { name: { en: 'Payment History', zh: '付款历史' }, count: 20 },
      ],
    },
    {
      id: 'supplier',
      title: { en: 'Supplier Reports', zh: '供应商报表' },
      icon: Building2,
      color: 'from-indigo-500 to-purple-500',
      reports: [
        { name: { en: 'Supplier Performance', zh: '供应商绩效' }, count: 12 },
        { name: { en: 'Purchase Analysis', zh: '采购分析' }, count: 18 },
        { name: { en: 'Supplier Compliance', zh: '供应商合规' }, count: 8 },
        { name: { en: 'Cost Comparison', zh: '成本比较' }, count: 6 },
      ],
    },
    {
      id: 'zatca',
      title: { en: 'ZATCA Compliance', zh: 'ZATCA 合规' },
      icon: FileText,
      color: 'from-rose-500 to-pink-500',
      reports: [
        { name: { en: 'VAT Returns', zh: '增值税申报' }, count: 4 },
        { name: { en: 'E-Invoice Summary', zh: '电子发票汇总' }, count: 12 },
        { name: { en: 'Tax Compliance', zh: '税务合规报告' }, count: 4 },
        { name: { en: 'Audit Trail', zh: '审计跟踪' }, count: 12 },
      ],
    },
  ];

  const quickStats = [
    {
      title: { en: 'Total Reports', zh: '总报表数' },
      value: '284',
      change: '+12',
      trend: 'up',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: { en: 'Generated This Month', zh: '本月生成' },
      value: '45',
      change: '+8',
      trend: 'up',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: { en: 'Scheduled Reports', zh: '定时报表' },
      value: '18',
      change: '+2',
      trend: 'up',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: { en: 'Exported This Week', zh: '本周导出' },
      value: '32',
      change: '-5',
      trend: 'down',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const recentReports = [
    {
      name: { en: 'Monthly Financial Summary - Jan 2025', zh: '2025年1月财务摘要' },
      type: { en: 'Financial', zh: '财务' },
      generated: '2025-02-01',
      size: '2.4 MB',
      format: 'PDF',
    },
    {
      name: { en: 'Sales Performance Report - Q4 2024', zh: '2024年第四季度销售业绩' },
      type: { en: 'Sales', zh: '销售' },
      generated: '2025-01-15',
      size: '1.8 MB',
      format: 'Excel',
    },
    {
      name: { en: 'Inventory Valuation - January', zh: '1月库存估值' },
      type: { en: 'Inventory', zh: '库存' },
      generated: '2025-02-01',
      size: '1.2 MB',
      format: 'PDF',
    },
    {
      name: { en: 'VAT Return - January 2025', zh: '2025年1月增值税申报' },
      type: { en: 'ZATCA', zh: 'ZATCA' },
      generated: '2025-02-03',
      size: '856 KB',
      format: 'PDF',
    },
  ];

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center border border-cyan-500/30">
            <TrendingUp className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Reports Center' : '报表中心'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'Generate and manage business intelligence reports'
                : '生成和管理商业智能报表'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300"
          >
            <option value="week">{currentLanguage === 'en' ? 'This Week' : '本周'}</option>
            <option value="month">{currentLanguage === 'en' ? 'This Month' : '本月'}</option>
            <option value="quarter">{currentLanguage === 'en' ? 'This Quarter' : '本季度'}</option>
            <option value="year">{currentLanguage === 'en' ? 'This Year' : '本年'}</option>
          </select>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30">
            <Download className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Export All' : '导出全部'}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">
                {stat.title[currentLanguage as keyof typeof stat.title]}
              </h3>
              {stat.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <span
                  className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
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
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 flex items-center justify-center transition-all duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {category.title[currentLanguage as keyof typeof category.title]}
                </h3>
              </div>
              <div className="space-y-2">
                {category.reports.map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/30 transition-colors duration-200"
                  >
                    <span className="text-gray-300 text-sm">
                      {report.name[currentLanguage as keyof typeof report.name]}
                    </span>
                    <span className="text-gray-500 text-xs bg-slate-800/50 px-2 py-1 rounded-full">
                      {report.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Reports */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-slate-700/30 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {currentLanguage === 'en' ? 'Recent Reports' : '最近报表'}
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={currentLanguage === 'en' ? 'Search reports...' : '搜索报表...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-800/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Report Name' : '报表名称'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Type' : '类型'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Generated' : '生成日期'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Size' : '大小'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Format' : '格式'}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Actions' : '操作'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {recentReports.map((report, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-800/30 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium">
                        {report.name[currentLanguage as keyof typeof report.name]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">
                      {report.type[currentLanguage as keyof typeof report.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{report.generated}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{report.size}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button className="bg-slate-800/50 hover:bg-cyan-500/20 text-white p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <Download className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
