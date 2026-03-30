import React, { useState } from 'react';
import {
  Building2,
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Package,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@yyc3/ui';

interface SuppliersProps {
  currentLanguage: string;
}

export function Suppliers({ currentLanguage }: SuppliersProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers = [
    {
      id: 'SUP-001',
      name: { en: 'Gulf Metal Suppliers', zh: '海湾金属供应商' },
      contact: 'Nasser Al-Fahad',
      phone: '+966 50 987 6543',
      email: 'nasser@gulfmetal.sa',
      location: { en: 'Riyadh', zh: '利雅得' },
      category: { en: 'Steel & Iron', zh: '钢铁' },
      totalSupplied: '3,456,789',
      orders: 234,
      rating: 5,
      status: 'verified',
      reliability: 98,
    },
    {
      id: 'SUP-002',
      name: { en: 'Arabian Scrap Traders', zh: '阿拉伯废料贸易商' },
      contact: 'Omar bin Rashid',
      phone: '+966 50 876 5432',
      email: 'omar@arabianscrap.sa',
      location: { en: 'Jeddah', zh: '吉达' },
      category: { en: 'Mixed Metals', zh: '混合金属' },
      totalSupplied: '2,345,678',
      orders: 189,
      rating: 5,
      status: 'verified',
      reliability: 96,
    },
    {
      id: 'SUP-003',
      name: { en: 'Eastern Province Metals', zh: '东部省金属' },
      contact: 'Fahad Al-Qahtani',
      phone: '+966 50 765 4321',
      email: 'fahad@eastmetal.sa',
      location: { en: 'Dammam', zh: '达曼' },
      category: { en: 'Aluminum', zh: '铝' },
      totalSupplied: '1,876,543',
      orders: 156,
      rating: 4,
      status: 'verified',
      reliability: 94,
    },
    {
      id: 'SUP-004',
      name: { en: 'Red Sea Recyclers', zh: '红海回收商' },
      contact: 'Khalid Hassan',
      phone: '+966 50 654 3210',
      email: 'khalid@redsearecy.sa',
      location: { en: 'Yanbu', zh: '延布' },
      category: { en: 'Copper', zh: '铜' },
      totalSupplied: '1,234,567',
      orders: 123,
      rating: 4,
      status: 'pending',
      reliability: 89,
    },
    {
      id: 'SUP-005',
      name: { en: 'Northern Metal Works', zh: '北方金属制品' },
      contact: 'Abdullah Al-Shehri',
      phone: '+966 50 543 2109',
      email: 'abdullah@northmetal.sa',
      location: { en: 'Tabuk', zh: '塔布克' },
      category: { en: 'Brass', zh: '黄铜' },
      totalSupplied: '987,654',
      orders: 98,
      rating: 4,
      status: 'verified',
      reliability: 92,
    },
  ];

  const stats = [
    {
      title: { en: 'Total Suppliers', zh: '总供应商' },
      value: '456',
      change: '+8.2%',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: { en: 'Verified Suppliers', zh: '认证供应商' },
      value: '387',
      change: '+5.7%',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: { en: 'Total Purchases', zh: '总采购额' },
      value: '9,901,231 ﷼',
      change: '+12.4%',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: { en: 'Avg Reliability', zh: '平均可靠性' },
      value: '94.2%',
      change: '+2.1%',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      verified: { en: 'Verified', zh: '已认证' },
      pending: { en: 'Pending', zh: '待审核' },
    };
    return labels[status as keyof typeof labels][currentLanguage as keyof typeof labels.verified];
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 flex items-center justify-center border border-indigo-500/30">
            <Building2 className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Supplier Management' : '供应商管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'Manage and track all supplier relationships'
                : '管理和跟踪所有供应商关系'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Add Supplier' : '添加供应商'}
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
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <span className="text-indigo-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search suppliers...' : '搜索供应商...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all duration-300"
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

      {/* Suppliers Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-800/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Supplier' : '供应商'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Contact' : '联系方式'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Category' : '类别'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Total Supplied' : '总供应额'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Reliability' : '可靠性'}
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
              {suppliers.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className="hover:bg-slate-800/30 transition-colors duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 flex items-center justify-center border border-indigo-500/30">
                        <Building2 className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {supplier.name[currentLanguage as keyof typeof supplier.name]}
                        </p>
                        <p className="text-gray-400 text-sm">{supplier.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-gray-300 text-sm">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <span>{supplier.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span>
                          {supplier.location[currentLanguage as keyof typeof supplier.location]}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">
                        {supplier.category[currentLanguage as keyof typeof supplier.category]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-indigo-400 font-semibold">
                      {supplier.totalSupplied} ﷼
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${supplier.reliability}%` }}
                        ></div>
                      </div>
                      <span className="text-green-400 text-sm font-medium">
                        {supplier.reliability}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center space-x-1 ${getStatusColor(supplier.status)}`}
                    >
                      {supplier.status === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                      <span>{getStatusLabel(supplier.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < supplier.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button className="bg-slate-800/50 hover:bg-indigo-500/20 text-white p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
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
