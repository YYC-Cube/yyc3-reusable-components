import React, { useState } from 'react';
import { 
  Truck, 
  Settings, 
  TrendingDown, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Plus, 
  Download,
  Wrench,
  Activity,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { Button } from './ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AssetsProps {
  currentLanguage: string;
}

const DEPRECIATION_DATA = [
  { year: '2020', value: 2500000 },
  { year: '2021', value: 2100000 },
  { year: '2022', value: 1750000 },
  { year: '2023', value: 1450000 },
  { year: '2024', value: 1200000 },
  { year: '2025', value: 980000 },
];

const ASSETS = [
  {
    id: 'AST-001',
    name: { en: 'Liebherr Mobile Crane', zh: '利勃海尔移动式起重机' },
    type: { en: 'Heavy Machinery', zh: '重型机械' },
    location: 'Zone A',
    purchaseDate: '2022-03-15',
    purchasePrice: 850000,
    currentValue: 620000,
    status: 'operational',
    nextMaintenance: '2025-03-01',
    image: 'https://images.unsplash.com/photo-1767385894916-b751898159d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY3JhbmUlMjBzY3JhcCUyMHlhcmR8ZW58MXx8fHwxNzcwMTg4OTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'AST-002',
    name: { en: 'CAT Excavator 320', zh: '卡特彼勒挖掘机 320' },
    type: { en: 'Heavy Machinery', zh: '重型机械' },
    location: 'Zone B',
    purchaseDate: '2021-08-10',
    purchasePrice: 450000,
    currentValue: 280000,
    status: 'maintenance',
    nextMaintenance: '2025-02-15',
    image: 'https://images.unsplash.com/photo-1760933803441-f479b177f137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNhdmF0b3IlMjBzY3JhcCUyMG1ldGFsfGVufDF8fHx8MTc3MDE4ODk5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'AST-003',
    name: { en: 'Toyota Industrial Forklift', zh: '丰田工业叉车' },
    type: { en: 'Logistics', zh: '物流设备' },
    location: 'Warehouse 1',
    purchaseDate: '2023-01-20',
    purchasePrice: 120000,
    currentValue: 95000,
    status: 'operational',
    nextMaintenance: '2025-04-10',
    image: 'https://images.unsplash.com/photo-1598023707207-276835c2b5fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JrbGlmdCUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzcwMTg4OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'AST-004',
    name: { en: 'Hammer Mill Shredder', zh: '锤式破碎机' },
    type: { en: 'Processing', zh: '加工设备' },
    location: 'Zone C',
    purchaseDate: '2020-05-05',
    purchasePrice: 1500000,
    currentValue: 850000,
    status: 'operational',
    nextMaintenance: '2025-03-15',
    image: 'https://images.unsplash.com/photo-1721745250100-7d777c1c48ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWV0YWwlMjBzaHJlZGRlciUyMG1hY2hpbmV8ZW58MXx8fHwxNzcwMTg4OTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'AST-005',
    name: { en: 'Digital Weighbridge 80T', zh: '80吨数字地磅' },
    type: { en: 'Infrastructure', zh: '基础设施' },
    location: 'Main Gate',
    purchaseDate: '2019-11-12',
    purchasePrice: 180000,
    currentValue: 110000,
    status: 'broken',
    nextMaintenance: '2025-02-05',
    image: 'https://images.unsplash.com/photo-1621273898430-1c430f134f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMHNjYWxlJTIwd2VpZ2hicmlkZ2V8ZW58MXx8fHwxNzcwMTg4OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function Assets({ currentLanguage }: AssetsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusConfig = (status: string) => {
    const configs = {
      operational: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Operational', zh: '运行中' }
      },
      maintenance: {
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        icon: Wrench,
        label: { en: 'Maintenance', zh: '维护中' }
      },
      broken: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertTriangle,
        label: { en: 'Needs Repair', zh: '需维修' }
      }
    };
    return configs[status as keyof typeof configs] || configs.operational;
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 flex items-center justify-center border border-indigo-500/30">
            <Truck className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              {currentLanguage === 'en' ? 'Asset Management' : '固定资产管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en' ? 'Track equipment value, depreciation, and maintenance' : '追踪设备价值、折旧与维护保养'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-xl transition-all duration-300">
             <Settings className="w-4 h-4 mr-2" />
             {currentLanguage === 'en' ? 'Asset Config' : '资产配置'}
          </Button>
          <Button className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Add Asset' : '添加资产'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                 <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-red-400 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" /> -5.2%
              </span>
           </div>
           <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Total Asset Value' : '资产总净值'}</p>
           <h3 className="text-2xl font-bold text-white">3.4M ﷼</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                 <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-green-400">92%</span>
           </div>
           <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Utilization Rate' : '设备利用率'}</p>
           <h3 className="text-2xl font-bold text-white">High</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                 <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-400">3 Pending</span>
           </div>
           <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Maintenance Due' : '待维护设备'}</p>
           <h3 className="text-2xl font-bold text-white">3 {currentLanguage === 'en' ? 'Units' : '台'}</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                 <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-400">YTD</span>
           </div>
           <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Depreciation Exp' : '本年折旧额'}</p>
           <h3 className="text-2xl font-bold text-white">245k ﷼</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Asset List */}
         <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/20">
                 <h3 className="text-lg font-bold text-white">{currentLanguage === 'en' ? 'Fleet & Equipment' : '设备清单'}</h3>
                 <div className="flex space-x-2">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <input 
                          type="text" 
                          placeholder={currentLanguage === 'en' ? 'Search assets...' : '搜索资产...'}
                          className="bg-slate-900/50 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                       />
                    </div>
                 </div>
              </div>
              
              <div className="divide-y divide-white/5">
                {ASSETS.map((asset) => {
                   const statusConfig = getStatusConfig(asset.status);
                   const StatusIcon = statusConfig.icon;
                   return (
                     <div key={asset.id} className="p-4 hover:bg-white/5 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="w-24 h-24 rounded-xl bg-slate-800 shrink-0 overflow-hidden border border-white/10">
                           <img src={asset.image} alt={asset.name.en} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-white font-bold truncate">{asset.name[currentLanguage as keyof typeof asset.name]}</h4>
                              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-gray-400 border border-slate-600">
                                 {asset.id}
                              </span>
                           </div>
                           <p className="text-sm text-gray-400 mb-2">{asset.type[currentLanguage as keyof typeof asset.type]} • {asset.location}</p>
                           <div className="flex items-center space-x-4 text-xs">
                              <div className="flex flex-col">
                                 <span className="text-gray-500">{currentLanguage === 'en' ? 'Original Value' : '原值'}</span>
                                 <span className="text-gray-300 font-mono">{asset.purchasePrice.toLocaleString()} ﷼</span>
                              </div>
                              <div className="w-px h-6 bg-white/10"></div>
                              <div className="flex flex-col">
                                 <span className="text-gray-500">{currentLanguage === 'en' ? 'Current Value' : '净值'}</span>
                                 <span className="text-indigo-300 font-mono font-bold">{asset.currentValue.toLocaleString()} ﷼</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2 shrink-0 w-full sm:w-auto">
                           <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              <span>{statusConfig.label[currentLanguage as keyof typeof statusConfig.label]}</span>
                           </span>
                           <div className="text-xs text-gray-400 flex items-center">
                              <Wrench className="w-3 h-3 mr-1.5" />
                              {currentLanguage === 'en' ? 'Next Service:' : '下次保养:'} {asset.nextMaintenance}
                           </div>
                           <Button variant="ghost" size="sm" className="h-7 text-xs text-indigo-400 hover:text-white">
                              {currentLanguage === 'en' ? 'View Log' : '查看日志'}
                           </Button>
                        </div>
                     </div>
                   );
                })}
              </div>
            </div>
         </div>

         {/* Right Charts Panel */}
         <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
               <h3 className="text-lg font-bold text-white mb-4">{currentLanguage === 'en' ? 'Depreciation Forecast' : '折旧预测'}</h3>
               <div className="h-[200px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                     <AreaChart data={DEPRECIATION_DATA}>
                        <defs>
                           <linearGradient id="colorDepreciation" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                        <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorDepreciation)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-indigo-900/20 to-transparent">
               <div className="flex items-center space-x-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">{currentLanguage === 'en' ? 'Asset Distribution' : '资产分布'}</h3>
               </div>
               <div className="space-y-3">
                  <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Heavy Machinery</span>
                        <span>45%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[45%] rounded-full"></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Processing Equipment</span>
                        <span>30%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 w-[30%] rounded-full"></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Logistics Fleet</span>
                        <span>25%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-fuchsia-500 w-[25%] rounded-full"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
