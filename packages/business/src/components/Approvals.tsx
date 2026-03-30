import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Search,
  Filter,
  User,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { Button } from '@yyc3/ui';

interface ApprovalsProps {
  currentLanguage: string;
}

const APPROVAL_REQUESTS = [
  {
    id: 'REQ-2025-089',
    type: 'purchase',
    title: { en: 'Purchase Order - Scrap Metal Baling Machine', zh: '采购申请 - 废金属打包机' },
    requester: 'Zhang Wei',
    department: 'Operations',
    amount: '¥ 450,000',
    date: '2025-02-04',
    status: 'pending',
    priority: 'high',
    steps: [
      { name: 'Dept. Manager', status: 'approved', date: '2025-02-03' },
      { name: 'Finance', status: 'current', date: 'Now' },
      { name: 'GM', status: 'pending', date: '-' },
    ],
  },
  {
    id: 'REQ-2025-090',
    type: 'leave',
    title: { en: 'Annual Leave Request - 15 Days', zh: '年假申请 - 15天' },
    requester: 'Li Qiang',
    department: 'Logistics',
    amount: '-',
    date: '2025-02-04',
    status: 'pending',
    priority: 'medium',
    steps: [
      { name: 'Supervisor', status: 'current', date: 'Now' },
      { name: 'HR', status: 'pending', date: '-' },
    ],
  },
  {
    id: 'REQ-2025-088',
    type: 'expense',
    title: { en: 'Travel Expense Reimbursement', zh: '差旅报销' },
    requester: 'Wang Lei',
    department: 'Sales',
    amount: '¥ 3,250',
    date: '2025-02-02',
    status: 'approved',
    priority: 'normal',
    steps: [
      { name: 'Manager', status: 'approved', date: '2025-02-02' },
      { name: 'Finance', status: 'approved', date: '2025-02-03' },
    ],
  },
  {
    id: 'REQ-2025-085',
    type: 'contract',
    title: { en: 'New Supplier Agreement - Global Steel', zh: '新供应商协议 - 全球钢铁' },
    requester: 'Chen Yi',
    department: 'Procurement',
    amount: '-',
    date: '2025-01-30',
    status: 'rejected',
    priority: 'high',
    steps: [{ name: 'Legal', status: 'rejected', date: '2025-01-31' }],
  },
];

export function Approvals({ currentLanguage }: ApprovalsProps) {
  const [filter, setFilter] = useState('all');
  const [selectedReq, setSelectedReq] = useState<(typeof APPROVAL_REQUESTS)[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'rejected':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'pending':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-gray-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/30">
            <CheckCircle2 className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              {currentLanguage === 'en' ? 'Approval Center' : '审批中心'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en' ? 'Manage requests and workflows' : '管理申请与工作流'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={currentLanguage === 'en' ? 'Search requests...' : '搜索申请...'}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 w-64"
            />
          </div>
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Filter' : '筛选'}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request List */}
        <div className="lg:col-span-1 glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/5 flex space-x-2 overflow-x-auto no-scrollbar">
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === tab
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'all'
                  ? currentLanguage === 'en'
                    ? 'All'
                    : '全部'
                  : tab === 'pending'
                    ? currentLanguage === 'en'
                      ? 'Pending'
                      : '待审批'
                    : tab === 'approved'
                      ? currentLanguage === 'en'
                        ? 'Approved'
                        : '已通过'
                      : currentLanguage === 'en'
                        ? 'Rejected'
                        : '已驳回'}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {APPROVAL_REQUESTS.filter((r) => filter === 'all' || r.status === filter).map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedReq?.id === req.id
                    ? 'bg-white/10 border-green-500/50'
                    : 'bg-slate-800/30 border-transparent hover:bg-slate-800/50 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(req.status)}`}
                  >
                    {req.status}
                  </div>
                  <span className="text-xs text-gray-500">{req.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                  {req.title[currentLanguage as keyof typeof req.title]}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {req.requester}
                  </div>
                  {req.amount !== '-' && (
                    <span className="text-green-400 font-mono">{req.amount}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Detail */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden relative">
          {selectedReq ? (
            <div className="flex flex-col h-full">
              {/* Detail Header */}
              <div className="p-6 border-b border-white/10 bg-slate-800/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-bold text-white">
                        {selectedReq.title[currentLanguage as keyof typeof selectedReq.title]}
                      </h2>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedReq.status)}`}
                      >
                        {selectedReq.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1.5" /> {selectedReq.id}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1.5" /> {selectedReq.requester}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" /> {selectedReq.date}
                      </span>
                    </div>
                  </div>
                  {selectedReq.amount !== '-' && (
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-1">
                        {currentLanguage === 'en' ? 'Total Amount' : '总金额'}
                      </div>
                      <div className="text-2xl font-bold text-green-400 font-mono">
                        {selectedReq.amount}
                      </div>
                    </div>
                  )}
                </div>

                {/* Approval Workflow Visualization */}
                <div className="mt-8 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
                  <div className="relative z-10 flex justify-between">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-green-500/20">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-white">
                          {currentLanguage === 'en' ? 'Submitted' : '已提交'}
                        </div>
                        <div className="text-[10px] text-gray-500">{selectedReq.date}</div>
                      </div>
                    </div>

                    {selectedReq.steps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg transition-all ${
                            step.status === 'approved'
                              ? 'bg-green-500 shadow-green-500/20'
                              : step.status === 'rejected'
                                ? 'bg-red-500 shadow-red-500/20'
                                : step.status === 'current'
                                  ? 'bg-amber-500 animate-pulse shadow-amber-500/20'
                                  : 'bg-slate-700'
                          }`}
                        >
                          {step.status === 'approved' ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : step.status === 'rejected' ? (
                            <XCircle className="w-4 h-4 text-white" />
                          ) : step.status === 'current' ? (
                            <Clock className="w-4 h-4 text-white" />
                          ) : (
                            <div className="w-2 h-2 bg-slate-400 rounded-full" />
                          )}
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-xs font-bold ${step.status === 'pending' ? 'text-gray-500' : 'text-white'}`}
                          >
                            {step.name}
                          </div>
                          <div className="text-[10px] text-gray-500">{step.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Request Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase">
                      {currentLanguage === 'en' ? 'Department' : '部门'}
                    </label>
                    <div className="text-white bg-slate-800/50 px-3 py-2 rounded-lg border border-white/5">
                      {selectedReq.department}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase">
                      {currentLanguage === 'en' ? 'Priority' : '优先级'}
                    </label>
                    <div className="text-white bg-slate-800/50 px-3 py-2 rounded-lg border border-white/5 flex items-center">
                      {selectedReq.priority === 'high' && (
                        <AlertCircle className="w-3 h-3 text-red-400 mr-2" />
                      )}
                      <span className="capitalize">{selectedReq.priority}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase">
                    {currentLanguage === 'en' ? 'Description' : '描述'}
                  </label>
                  <div className="text-gray-300 bg-slate-800/50 p-4 rounded-lg border border-white/5 min-h-[100px] text-sm leading-relaxed">
                    {currentLanguage === 'en'
                      ? 'Requesting approval for the purchase of a new heavy-duty metal baling machine for the Zone A processing unit. This equipment is essential for increasing our daily processing capacity by 25%.'
                      : '申请为A区加工单元采购一台新的重型金属打包机。该设备对于将我们的日处理能力提高25%至关重要。'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase">
                    {currentLanguage === 'en' ? 'Attachments' : '附件'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center p-3 rounded-lg bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors cursor-pointer group">
                      <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate group-hover:text-green-400 transition-colors">
                          Quotation.pdf
                        </div>
                        <div className="text-xs text-gray-500">2.4 MB</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 rounded-lg bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-colors cursor-pointer group">
                      <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate group-hover:text-green-400 transition-colors">
                          Specs.docx
                        </div>
                        <div className="text-xs text-gray-500">1.1 MB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-white/10 flex justify-end space-x-4 bg-slate-900/50">
                {selectedReq.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      {currentLanguage === 'en' ? 'Reject' : '拒绝'}
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {currentLanguage === 'en' ? 'Approve' : '批准'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 opacity-50" />
              </div>
              <p>
                {currentLanguage === 'en'
                  ? 'Select a request to view details'
                  : '选择一个申请以查看详情'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
