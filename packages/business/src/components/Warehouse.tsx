import React, { useState } from 'react';
import {
  Warehouse as WarehouseIcon,
  Search,
  Plus,
  Filter,
  Download,
  TrendingUp,
  Package,
  MapPin,
  Boxes,
  Truck,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Button } from '@yyc3/ui';

interface WarehouseProps {
  currentLanguage: string;
}

export function Warehouse({ currentLanguage }: WarehouseProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const warehouses = [
    {
      id: 'WH-RYD-001',
      name: { en: 'Riyadh Main Warehouse', zh: '利雅得主仓库' },
      location: { en: 'Riyadh Industrial City', zh: '利雅得工业城' },
      capacity: '50,000',
      occupied: '38,500',
      utilization: 77,
      status: 'active',
      zones: 12,
      materials: 45,
    },
    {
      id: 'WH-JED-002',
      name: { en: 'Jeddah Storage Center', zh: '吉达仓储中心' },
      location: { en: 'Jeddah Industrial Zone', zh: '吉达工业区' },
      capacity: '35,000',
      occupied: '28,900',
      utilization: 83,
      status: 'active',
      zones: 10,
      materials: 38,
    },
    {
      id: 'WH-DAM-003',
      name: { en: 'Dammam Logistics Hub', zh: '达曼物流中心' },
      location: { en: 'Dammam Port Area', zh: '达曼港区' },
      capacity: '40,000',
      occupied: '31,200',
      utilization: 78,
      status: 'active',
      zones: 15,
      materials: 52,
    },
    {
      id: 'WH-MED-004',
      name: { en: 'Medina Distribution Center', zh: '麦地那配送中心' },
      location: { en: 'Medina Economic Zone', zh: '麦地那经济区' },
      capacity: '25,000',
      occupied: '12,300',
      utilization: 49,
      status: 'under-maintenance',
      zones: 8,
      materials: 28,
    },
  ];

  const stats = [
    {
      title: { en: 'Total Capacity', zh: '总容量' },
      value: '150,000 kg',
      change: '+0%',
      color: 'from-blue-500 to-cyan-500',
      icon: Boxes,
    },
    {
      title: { en: 'Current Stock', zh: '当前库存' },
      value: '110,900 kg',
      change: '+12.5%',
      color: 'from-green-500 to-emerald-500',
      icon: Package,
    },
    {
      title: { en: 'Avg Utilization', zh: '平均利用率' },
      value: '71.8%',
      change: '+5.2%',
      color: 'from-amber-500 to-orange-500',
      icon: BarChart3,
    },
    {
      title: { en: 'Active Warehouses', zh: '活跃仓库' },
      value: '3/4',
      change: '-25%',
      color: 'from-purple-500 to-pink-500',
      icon: WarehouseIcon,
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Active', zh: '活跃' },
      },
      'under-maintenance': {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: Clock,
        label: { en: 'Under Maintenance', zh: '维护中' },
      },
      inactive: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertCircle,
        label: { en: 'Inactive', zh: '停用' },
      },
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center border border-amber-500/30">
            <WarehouseIcon className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Warehouse Management' : '智能仓储'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'Manage warehouse locations and inventory distribution'
                : '管理仓库位置和库存分配'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Add Warehouse' : '添加仓库'}
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
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <span className="text-amber-400 text-sm font-medium">{stat.change}</span>
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
                placeholder={currentLanguage === 'en' ? 'Search warehouses...' : '搜索仓库...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/30 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300">
              <option value="all">{currentLanguage === 'en' ? 'All Status' : '所有状态'}</option>
              <option value="active">{currentLanguage === 'en' ? 'Active' : '活跃'}</option>
              <option value="maintenance">
                {currentLanguage === 'en' ? 'Maintenance' : '维护中'}
              </option>
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

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {warehouses.map((warehouse, index) => {
          const statusConfig = getStatusConfig(warehouse.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={warehouse.id}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Warehouse Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center border border-amber-500/30">
                    <WarehouseIcon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {warehouse.name[currentLanguage as keyof typeof warehouse.name]}
                    </p>
                    <p className="text-gray-400 text-sm">{warehouse.id}</p>
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

              {/* Location */}
              <div className="mb-4 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  {warehouse.location[currentLanguage as keyof typeof warehouse.location]}
                </span>
              </div>

              {/* Capacity Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Total Capacity' : '总容量'}
                  </p>
                  <p className="text-white font-semibold">{warehouse.capacity} kg</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Occupied' : '已占用'}
                  </p>
                  <p className="text-amber-400 font-semibold">{warehouse.occupied} kg</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Zones' : '区域数'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Boxes className="w-3 h-3 text-purple-400" />
                    <p className="text-purple-400 font-semibold">{warehouse.zones}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">
                    {currentLanguage === 'en' ? 'Materials' : '材料种类'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Package className="w-3 h-3 text-green-400" />
                    <p className="text-green-400 font-semibold">{warehouse.materials}</p>
                  </div>
                </div>
              </div>

              {/* Utilization Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">
                    {currentLanguage === 'en' ? 'Utilization' : '利用率'}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      warehouse.utilization >= 80
                        ? 'text-red-400'
                        : warehouse.utilization >= 60
                          ? 'text-yellow-400'
                          : 'text-green-400'
                    }`}
                  >
                    {warehouse.utilization}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      warehouse.utilization >= 80
                        ? 'bg-gradient-to-r from-red-500 to-orange-500'
                        : warehouse.utilization >= 60
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                    style={{ width: `${warehouse.utilization}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-4 border-t border-slate-700/30">
                <Button className="flex-1 bg-slate-800/50 hover:bg-amber-500/20 text-white py-2 rounded-lg transition-all duration-300 text-sm">
                  <Package className="w-4 h-4 mr-2" />
                  {currentLanguage === 'en' ? 'View Stock' : '查看库存'}
                </Button>
                <Button className="flex-1 bg-slate-800/50 hover:bg-amber-500/20 text-white py-2 rounded-lg transition-all duration-300 text-sm">
                  <Truck className="w-4 h-4 mr-2" />
                  {currentLanguage === 'en' ? 'Transfers' : '调拨记录'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
