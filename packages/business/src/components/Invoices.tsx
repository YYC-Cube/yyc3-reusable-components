import React, { useMemo } from 'react';
import { FileText, Plus, Search, Filter, Download, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { AIContextBanner } from './AIContextBanner';
import { useNavigationContext, generateRecommendations } from '../hooks/useNavigationContext';

interface InvoicesProps {
  currentLanguage: string;
  navigationContext?: Record<string, any>;
  onNavigate?: (view: string, context?: Record<string, any>) => void;
}

export function Invoices({ currentLanguage, navigationContext, onNavigate }: InvoicesProps) {
  // Phase 12A: 消费导航上下文
  const { 
    hasContext, 
    context, 
    contextData, 
    shouldHighlight 
  } = useNavigationContext(navigationContext, 'invoices');

  // Phase 12A: 生成智能推荐
  const recommendations = useMemo(() => {
    if (!hasContext || !context) return [];
    
    const sourceModule = context.source || context.sourceModule || '';
    const baseRecommendations = generateRecommendations(sourceModule, 'invoices', contextData);
    
    // 添加发票特定推荐
    if (contextData.orderId) {
      baseRecommendations.push({
        title: currentLanguage === 'zh' ? '基于订单生成发票' : 'Generate Invoice from Order',
        description: currentLanguage === 'zh' ? '自动从订单数据生成发票' : 'Auto-generate invoice from order data',
        action: 'generate',
        data: { orderId: contextData.orderId }
      });
    }
    if (contextData.customerId) {
      baseRecommendations.push({
        title: currentLanguage === 'zh' ? '查看客户所有发票' : 'View All Customer Invoices',
        description: currentLanguage === 'zh' ? '查看该客户的历史发票记录' : 'View all invoices for this customer',
        action: 'filter',
        data: { customerId: contextData.customerId }
      });
    }
    
    return baseRecommendations;
  }, [hasContext, context, contextData, currentLanguage]);

  // Phase 12A: 处理推荐采纳
  const handleAcceptRecommendation = (recommendation: any) => {
    console.log('[Invoices] Accepting recommendation:', recommendation);
    if (recommendation.action === 'generate') {
      console.log('[Invoices] Generate invoice for order:', recommendation.data.orderId);
      // 这里可以打开生成发票的对话框
    } else if (recommendation.action === 'filter') {
      console.log('[Invoices] Filter by customer:', recommendation.data.customerId);
      // 应用筛选
    }
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      customerId: 'CUST-001',
      customer: { en: 'Steel & Co.', zh: '钢铁公司' },
      amount: '¥ 125,000',
      date: '2024-02-01',
      status: 'reported',
      type: 'Standard'
    },
    {
      id: 'INV-2024-002',
      customerId: 'CUST-002',
      customer: { en: 'Alpha Construction', zh: '阿尔法建筑' },
      amount: '¥ 45,200',
      date: '2024-02-02',
      status: 'pending',
      type: 'Simplified'
    },
    {
      id: 'INV-2024-003',
      customerId: 'CUST-003',
      customer: { en: 'Capital Trading', zh: '首都贸易' },
      amount: '¥ 12,500',
      date: '2024-02-03',
      status: 'error',
      type: 'Simplified'
    },
    {
      id: 'INV-2024-004',
      customerId: 'CUST-001',
      customer: { en: 'Metro Metal Works', zh: '大都会金属' },
      amount: '¥ 89,750',
      date: '2024-02-03',
      status: 'reported',
      type: 'Standard'
    },
    {
      id: 'INV-2024-005',
      customerId: 'CUST-002',
      customer: { en: 'Industrial Corp', zh: '工业集团' },
      amount: '¥ 234,000',
      date: '2024-02-04',
      status: 'reported',
      type: 'Standard'
    }
  ];

  // Phase 12A: 应用上下文筛选
  const filteredInvoices = useMemo(() => {
    if (!hasContext || !contextData.customerId) return invoices;
    return invoices.filter(invoice => invoice.customerId === contextData.customerId);
  }, [hasContext, contextData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'error': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reported': return <CheckCircle className="w-4 h-4 mr-2" />;
      case 'pending': return <Clock className="w-4 h-4 mr-2" />;
      case 'error': return <AlertCircle className="w-4 h-4 mr-2" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string, lang: string) => {
    const labels: Record<string, { en: string, zh: string }> = {
      reported: { en: 'Reported', zh: '已上报' },
      pending: { en: 'Pending', zh: '待处理' },
      error: { en: 'Error', zh: '错误' }
    };
    return labels[status]?.[lang as 'en' | 'zh'] || status;
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-fade-in-up">
      {/* Phase 12A: AI Context Banner */}
      {hasContext && context && (
        <AIContextBanner
          context={{
            ...context,
            recommendations
          }}
          onClose={() => {
            console.log('[Invoices] Context banner closed');
          }}
          onAcceptRecommendation={handleAcceptRecommendation}
          currentLanguage={currentLanguage}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {currentLanguage === 'en' ? 'Smart Invoices' : '智能发票管理'}
          </h1>
          <p className="text-gray-400">
            {currentLanguage === 'en' ? 'Manage and report e-invoices automatically' : '自动化管理并上报电子发票'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-700/50 hover:bg-slate-800/50 text-white">
            <Download className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Export' : '导出'}
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'New Invoice' : '新建发票'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">
            {currentLanguage === 'en' ? 'Total Invoices' : '发票总数'}
          </h3>
          <p className="text-2xl font-bold text-white mt-1">1,248</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-500/10">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">98.5%</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">
            {currentLanguage === 'en' ? 'Compliance Rate' : '合规率'}
          </h3>
          <p className="text-2xl font-bold text-white mt-1">98.5%</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-amber-500/10">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-amber-400 text-sm font-medium">5</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">
            {currentLanguage === 'en' ? 'Pending Clearance' : '待清关'}
          </h3>
          <p className="text-2xl font-bold text-white mt-1">5</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-md">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder={currentLanguage === 'en' ? 'Search by invoice number, customer...' : '搜索发票号、客户...'}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-slate-700/50">
            <Filter className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Filter' : '筛选'}
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Invoice ID' : '发票 ID'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Customer' : '客户'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Date' : '日期'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Amount' : '金额'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Type' : '类型'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Status' : '状态'}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Actions' : '操作'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInvoices.map((invoice) => {
                // Phase 12A: 判断是否应该高亮该发票
                const isHighlighted = shouldHighlight(invoice.id) || shouldHighlight(invoice.customerId);
                
                return (
                  <tr 
                    key={invoice.id} 
                    className={`
                      transition-all duration-300
                      ${isHighlighted 
                        ? 'bg-purple-500/10 border-l-4 border-purple-500 hover:bg-purple-500/15' 
                        : 'hover:bg-white/5'
                      }
                    `}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {invoice.customer[currentLanguage as keyof typeof invoice.customer]}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {invoice.type}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {getStatusLabel(invoice.status, currentLanguage)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
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