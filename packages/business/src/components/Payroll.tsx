import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  FileText,
  CreditCard,
  Building2,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PayrollProps {
  currentLanguage: string;
}

const PAYROLL_DATA = [
  { month: 'Jan', amount: 1250000 },
  { month: 'Feb', amount: 1245000 },
  { month: 'Mar', amount: 1280000 },
  { month: 'Apr', amount: 1260000 },
  { month: 'May', amount: 1300000 },
  { month: 'Jun', amount: 1320000 },
];

const PAYSLIPS = [
  {
    id: 'PY-2025-001',
    employee: { en: 'Ahmed Al-Fahad', zh: '艾哈迈德·法哈德' },
    idNum: '1012345678',
    basic: 12000,
    housing: 4000,
    transport: 1500,
    deductions: 0,
    net: 17500,
    status: 'paid',
    wpsStatus: 'compliant',
    date: '2025-02-28'
  },
  {
    id: 'PY-2025-002',
    employee: { en: 'Mohammed Al-Qahtani', zh: '穆罕默德·卡赫塔尼' },
    idNum: '1023456789',
    basic: 8000,
    housing: 2500,
    transport: 1000,
    deductions: 200,
    net: 11300,
    status: 'processing',
    wpsStatus: 'pending',
    date: '2025-02-28'
  },
  {
    id: 'PY-2025-003',
    employee: { en: 'Khalid Hassan', zh: '哈立德·哈桑' },
    idNum: '1034567890',
    basic: 10000,
    housing: 3500,
    transport: 1200,
    deductions: 0,
    net: 14700,
    status: 'paid',
    wpsStatus: 'compliant',
    date: '2025-02-28'
  },
  {
    id: 'PY-2025-004',
    employee: { en: 'Fahad Al-Shehri', zh: '法赫德·舍赫里' },
    idNum: '1045678901',
    basic: 5000,
    housing: 1500,
    transport: 800,
    deductions: 100,
    net: 7200,
    status: 'pending',
    wpsStatus: 'pending',
    date: '2025-02-28'
  },
  {
    id: 'PY-2025-005',
    employee: { en: 'Abdullah Al-Mutairi', zh: '阿卜杜拉·穆泰里' },
    idNum: '1056789012',
    basic: 6000,
    housing: 2000,
    transport: 1000,
    deductions: 0,
    net: 9000,
    status: 'error',
    wpsStatus: 'rejected',
    date: '2025-02-28'
  }
];

export function Payroll({ currentLanguage }: PayrollProps) {
  const getStatusConfig = (status: string) => {
    const configs = {
      paid: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Paid', zh: '已发放' }
      },
      processing: {
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Clock,
        label: { en: 'Processing', zh: '处理中' }
      },
      pending: {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: Clock,
        label: { en: 'Pending', zh: '待处理' }
      },
      error: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertCircle,
        label: { en: 'Error', zh: '错误' }
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getWPSConfig = (status: string) => {
    const configs = {
      compliant: {
        color: 'text-green-400',
        icon: CheckCircle2,
        label: 'WPS Compliant'
      },
      pending: {
        color: 'text-gray-400',
        icon: Clock,
        label: 'WPS Pending'
      },
      rejected: {
        color: 'text-red-400',
        icon: AlertCircle,
        label: 'WPS Rejected'
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/30">
            <DollarSign className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              {currentLanguage === 'en' ? 'Payroll Management' : '薪酬管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en' ? 'Automated salary processing & WPS compliance' : '自动化工资处理与 WPS 合规'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-xl transition-all duration-300">
             <FileText className="w-4 h-4 mr-2" />
             {currentLanguage === 'en' ? 'Generate Report' : '生成报表'}
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30">
            <CreditCard className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Run Payroll' : '发放工资'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Total Disbursed' : '已发放总额'}</p>
              <h3 className="text-3xl font-bold text-white mb-2">1,320,000 ﷼</h3>
              <div className="flex items-center text-xs text-green-400">
                 <TrendingUp className="w-3 h-3 mr-1" />
                 +2.5% {currentLanguage === 'en' ? 'vs last month' : '环比上月'}
              </div>
           </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'WPS Compliance' : 'WPS 合规率'}</p>
              <h3 className="text-3xl font-bold text-white mb-2">98.5%</h3>
              <div className="flex items-center text-xs text-green-400">
                 <CheckCircle2 className="w-3 h-3 mr-1" />
                 {currentLanguage === 'en' ? 'Excellent' : '优秀'}
              </div>
           </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{currentLanguage === 'en' ? 'Pending Processing' : '待处理'}</p>
              <h3 className="text-3xl font-bold text-white mb-2">18,500 ﷼</h3>
              <div className="flex items-center text-xs text-yellow-400">
                 <Clock className="w-3 h-3 mr-1" />
                 3 {currentLanguage === 'en' ? 'Employees' : '位员工'}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Payroll List */}
         <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
               <h3 className="text-lg font-bold text-white">{currentLanguage === 'en' ? 'February 2025 Payroll' : '2025年2月工资表'}</h3>
               <div className="flex space-x-2">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                     <input 
                        type="text" 
                        placeholder={currentLanguage === 'en' ? 'Search employee...' : '搜索员工...'}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500/50"
                     />
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                     <Filter className="w-4 h-4" />
                  </Button>
               </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
               <table className="w-full">
                  <thead className="bg-slate-800/30">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Employee' : '员工'}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Breakdown' : '明细'}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Net Salary' : '实发工资'}</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Status' : '状态'}</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase">{currentLanguage === 'en' ? 'Action' : '操作'}</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {PAYSLIPS.map((slip) => {
                        const statusConfig = getStatusConfig(slip.status);
                        const wpsConfig = getWPSConfig(slip.wpsStatus);
                        const StatusIcon = statusConfig.icon;
                        const WpsIcon = wpsConfig.icon;

                        return (
                           <tr key={slip.id} className="hover:bg-white/5 transition-colors group">
                              <td className="px-6 py-4">
                                 <div>
                                    <div className="text-white font-medium text-sm">{slip.employee[currentLanguage as keyof typeof slip.employee]}</div>
                                    <div className="text-xs text-gray-500">ID: {slip.idNum}</div>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex flex-col space-y-1 text-xs text-gray-400">
                                    <span className="flex justify-between w-32"><span>Basic:</span> <span className="text-gray-300">{slip.basic}</span></span>
                                    <span className="flex justify-between w-32"><span>Housing:</span> <span className="text-gray-300">{slip.housing}</span></span>
                                    <span className="flex justify-between w-32"><span>Trans:</span> <span className="text-gray-300">{slip.transport}</span></span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="text-sm text-green-400 font-mono font-bold">{slip.net.toLocaleString()} ﷼</div>
                                 {slip.deductions > 0 && (
                                     <div className="text-xs text-red-400">-{slip.deductions} Ded.</div>
                                 )}
                              </td>
                              <td className="px-6 py-4">
                                 <div className="space-y-2">
                                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                       <StatusIcon className="w-3 h-3" />
                                       <span>{statusConfig.label[currentLanguage as keyof typeof statusConfig.label]}</span>
                                    </span>
                                    <div className={`flex items-center text-[10px] ${wpsConfig.color}`}>
                                       <WpsIcon className="w-3 h-3 mr-1" />
                                       {wpsConfig.label}
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                    <MoreHorizontal className="w-4 h-4" />
                                 </Button>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Payroll Trends */}
         <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
               <h3 className="text-lg font-bold text-white mb-4">{currentLanguage === 'en' ? 'Salary Trends' : '薪资趋势'}</h3>
               <div className="h-[200px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                     <BarChart data={PAYROLL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                        <Tooltip 
                           cursor={{fill: '#334155', opacity: 0.2}}
                           contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                        />
                        <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-blue-900/20 to-transparent">
               <div className="flex items-center space-x-3 mb-3">
                  <Building2 className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">{currentLanguage === 'en' ? 'GOSI Integration' : '社保 (GOSI) 集成'}</h3>
               </div>
               <p className="text-sm text-gray-400 mb-4">
                  {currentLanguage === 'en' 
                     ? 'Social insurance contributions are automatically calculated and synced.' 
                     : '社会保险缴款已自动计算并同步。'}
               </p>
               <div className="flex items-center justify-between text-sm bg-slate-800/50 p-3 rounded-xl border border-white/5">
                  <span className="text-gray-300">Next Payment Due:</span>
                  <span className="text-white font-mono">15 Mar 2025</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
