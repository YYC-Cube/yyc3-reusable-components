import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp,
  DollarSign,
  Shield,
  BarChart3,
  Upload
} from 'lucide-react';
import { Button } from './ui/button';

interface VATProps {
  currentLanguage: string;
}

export function VAT({ currentLanguage }: VATProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const vatReturns = [
    {
      id: 'VAT-2025-01',
      period: { en: 'January 2025', zh: '2025年1月' },
      salesVAT: '¥ 145,890',
      purchaseVAT: '¥ 89,450',
      netVAT: '¥ 56,440',
      dueDate: '2025-02-28',
      submittedDate: null,
      status: 'pending'
    },
    {
      id: 'VAT-2024-12',
      period: { en: 'December 2024', zh: '2024年12月' },
      salesVAT: '¥ 234,567',
      purchaseVAT: '¥ 145,678',
      netVAT: '¥ 88,889',
      dueDate: '2025-01-31',
      submittedDate: '2025-01-25',
      status: 'submitted'
    },
    {
      id: 'VAT-2024-11',
      period: { en: 'November 2024', zh: '2024年11月' },
      salesVAT: '¥ 198,765',
      purchaseVAT: '¥ 123,456',
      netVAT: '¥ 75,309',
      dueDate: '2024-12-31',
      submittedDate: '2024-12-28',
      status: 'approved'
    },
    {
      id: 'VAT-2024-10',
      period: { en: 'October 2024', zh: '2024年10月' },
      salesVAT: '¥ 176,543',
      purchaseVAT: '¥ 98,765',
      netVAT: '¥ 77,778',
      dueDate: '2024-11-30',
      submittedDate: '2024-11-29',
      status: 'approved'
    }
  ];

  const taxCompliance = [
    {
      requirement: { en: 'E-Invoice Generation', zh: '电子发票生成' },
      status: 'compliant',
      description: { en: 'XML format with digital signature', zh: 'XML格式带数字签名' }
    },
    {
      requirement: { en: 'QR Code Integration', zh: '二维码集成' },
      status: 'compliant',
      description: { en: 'Encoded invoice data', zh: '编码发票数据' }
    },
    {
      requirement: { en: 'Digital Certificate', zh: '数字证书' },
      status: 'compliant',
      description: { en: 'Valid digital certificate', zh: '有效数字证书' }
    },
    {
      requirement: { en: 'Sequential Numbering', zh: '序列编号' },
      status: 'compliant',
      description: { en: 'Unique invoice numbering system', zh: '唯一发票编号系统' }
    },
    {
      requirement: { en: 'Audit Trail', zh: '审计跟踪' },
      status: 'compliant',
      description: { en: 'Complete transaction logging', zh: '完整交易记录' }
    },
    {
      requirement: { en: 'Data Retention', zh: '数据保留' },
      status: 'warning',
      description: { en: 'Archive approaching 80% capacity', zh: '归档容量接近80%' }
    }
  ];

  const stats = [
    {
      title: { en: 'Total Tax Collected', zh: '总代收税额' },
      value: '¥ 755,765',
      change: '+12.5%',
      color: 'from-green-500 to-emerald-500',
      icon: TrendingUp
    },
    {
      title: { en: 'Total Tax Paid', zh: '总支付税额' },
      value: '¥ 457,349',
      change: '+8.2%',
      color: 'from-red-500 to-pink-500',
      icon: DollarSign
    },
    {
      title: { en: 'Net Tax Position', zh: '净税额' },
      value: '¥ 298,416',
      change: '+18.3%',
      color: 'from-blue-500 to-cyan-500',
      icon: BarChart3
    },
    {
      title: { en: 'Tax Compliance', zh: '税务合规率' },
      value: '98.5%',
      change: '+2.1%',
      color: 'from-purple-500 to-pink-500',
      icon: Shield
    }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: Clock,
        label: { en: 'Pending', zh: '待提交' }
      },
      submitted: {
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Upload,
        label: { en: 'Submitted', zh: '已提交' }
      },
      approved: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Approved', zh: '已批准' }
      },
      overdue: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertCircle,
        label: { en: 'Overdue', zh: '逾期' }
      }
    };
    return configs[status as keyof typeof configs];
  };

  const getComplianceConfig = (status: string) => {
    const configs = {
      compliant: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: { en: 'Compliant', zh: '合规' }
      },
      warning: {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: AlertCircle,
        label: { en: 'Warning', zh: '警告' }
      },
      'non-compliant': {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertCircle,
        label: { en: 'Non-Compliant', zh: '不合规' }
      }
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 flex items-center justify-center border border-violet-500/30">
            <Receipt className="w-7 h-7 text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {currentLanguage === 'en' ? 'Tax Compliance' : '税务合规'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en' ? 'Manage tax returns and e-invoicing compliance' : '管理税务申报和电子发票合规'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/30">
            <FileText className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'File VAT Return' : '提交增值税申报'}
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
                <Icon className="w-5 h-5 text-violet-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <span className="text-violet-400 text-sm font-medium">{stat.change}</span>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* VAT Returns */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-slate-700/30">
            <h2 className="text-xl font-bold text-white">
              {currentLanguage === 'en' ? 'VAT Returns' : '增值税申报'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/30 bg-slate-800/30">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Period' : '期间'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Sales VAT' : '销项税'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Purchase VAT' : '进项税'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Net VAT' : '应缴税额'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Status' : '状态'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {vatReturns.map((vat, index) => {
                  const statusConfig = getStatusConfig(vat.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <tr 
                      key={vat.id}
                      className="hover:bg-slate-800/30 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{vat.id}</p>
                          <p className="text-gray-400 text-sm">
                            {vat.period[currentLanguage as keyof typeof vat.period]}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-400 font-semibold">{vat.salesVAT}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-red-400 font-semibold">{vat.purchaseVAT}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-violet-400 font-semibold">{vat.netVAT}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusConfig.label[currentLanguage as keyof typeof statusConfig.label]}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ZATCA Compliance Checklist */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-violet-400" />
            <h2 className="text-xl font-bold text-white">
              {currentLanguage === 'en' ? 'Tax Compliance Checklist' : '税务合规检查'}
            </h2>
          </div>
          <div className="space-y-3">
            {taxCompliance.map((item, index) => {
              const config = getComplianceConfig(item.status);
              const StatusIcon = config.icon;
              
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium text-sm">
                      {item.requirement[currentLanguage as keyof typeof item.requirement]}
                    </h3>
                    <StatusIcon className={`w-4 h-4 flex-shrink-0 ${
                      item.status === 'compliant' ? 'text-green-400' :
                      item.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                  </div>
                  <p className="text-gray-400 text-xs">
                    {item.description[currentLanguage as keyof typeof item.description]}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Overall Compliance Score */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">
                {currentLanguage === 'en' ? 'Overall Compliance' : '总体合规率'}
              </span>
              <span className="text-green-400 font-bold text-lg">98.5%</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '98.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}