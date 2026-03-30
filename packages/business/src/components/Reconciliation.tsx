import React from 'react';
import { 
  FileCheck, 
  AlertCircle, 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  XCircle,
  ArrowRightLeft,
  DollarSign,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';

interface ReconciliationProps {
  currentLanguage: string;
}

export function Reconciliation({ currentLanguage }: ReconciliationProps) {
  const transactions = [
    {
      id: 'TRX-2025-089',
      poRef: 'PO-2025-089',
      supplier: 'Gulf Metal Suppliers',
      internalAmount: 89100,
      invoiceAmount: 89100,
      status: 'matched',
      date: '2025-02-02',
      discrepancy: 0
    },
    {
      id: 'TRX-2025-092',
      poRef: 'PO-2025-092',
      supplier: 'Gulf Metal Suppliers',
      internalAmount: 245000,
      invoiceAmount: 248500,
      status: 'mismatch',
      date: '2025-02-03',
      discrepancy: 3500
    },
    {
      id: 'TRX-2025-095',
      poRef: 'PO-2025-095',
      supplier: 'Red Sea Recyclers',
      internalAmount: 42000,
      invoiceAmount: 42000,
      status: 'matched',
      date: '2025-02-04',
      discrepancy: 0
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-fade-in-up pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <FileCheck className="w-8 h-8 mr-3 text-green-400" />
            {currentLanguage === 'en' ? 'Financial Reconciliation' : '财务对账'}
          </h1>
          <p className="text-gray-400">
            {currentLanguage === 'en' ? 'Match internal records with supplier invoices' : '核对内部记录与供应商发票'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg shadow-green-500/20">
            <Download className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Export Report' : '导出报表'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-green-500/10 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-green-400 font-bold text-xl">92%</span>
          </div>
          <h3 className="text-white font-medium mb-1">
            {currentLanguage === 'en' ? 'Matched Automatically' : '自动匹配成功'}
          </h3>
          <p className="text-sm text-gray-400">
            {currentLanguage === 'en' ? '345 transactions verified' : '已验证 345 笔交易'}
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/10 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <span className="text-red-400 font-bold text-xl">3</span>
          </div>
          <h3 className="text-white font-medium mb-1">
            {currentLanguage === 'en' ? 'Discrepancies Found' : '发现差异'}
          </h3>
          <p className="text-sm text-gray-400">
            {currentLanguage === 'en' ? 'Action required' : '需要处理'}
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <span className="text-blue-400 font-bold text-xl">12</span>
          </div>
          <h3 className="text-white font-medium mb-1">
            {currentLanguage === 'en' ? 'Pending Review' : '待审核'}
          </h3>
          <p className="text-sm text-gray-400">
            {currentLanguage === 'en' ? 'Awaiting documents' : '等待单据'}
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={currentLanguage === 'en' ? 'Search transaction ID or PO...' : '搜索交易ID或订单号...'}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white">
              <Calendar className="w-4 h-4 mr-2" /> Date
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Transaction Info' : '交易信息'}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Supplier' : '供应商'}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Internal Record' : '内部记录'}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Supplier Invoice' : '供应商发票'}
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Status' : '状态'}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Actions' : '操作'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{trx.id}</span>
                      <span className="text-xs text-gray-400 mt-1">Ref: {trx.poRef}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{trx.supplier}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-mono">{trx.internalAmount.toLocaleString()} ﷼</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`font-mono font-medium ${
                        trx.status === 'mismatch' ? 'text-red-400' : 'text-white'
                      }`}>
                        {trx.invoiceAmount.toLocaleString()} ﷼
                      </span>
                      {trx.discrepancy > 0 && (
                        <span className="text-xs text-red-400 mt-1">
                          Diff: +{trx.discrepancy.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {trx.status === 'matched' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Matched
                        </span>
                      ) : (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                          <XCircle className="w-3 h-3 mr-1" />
                          Mismatch
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                      {currentLanguage === 'en' ? 'Details' : '详情'}
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
