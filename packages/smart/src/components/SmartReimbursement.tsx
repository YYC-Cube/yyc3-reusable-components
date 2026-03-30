import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  FileText,
  User,
  Calendar,
  MapPin,
  Tag,
  Eye,
  Send,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Briefcase
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface SmartReimbursementProps {
  currentLanguage: string;
}

type TabType = 'all' | 'pending' | 'approved' | 'statistics';
type ExpenseStatus = 'draft' | 'pending' | 'manager-approved' | 'finance-approved' | 'paid' | 'rejected';

interface ExpenseClaim {
  id: string;
  title: string;
  applicant: string;
  department: string;
  amount: number;
  category: string;
  status: ExpenseStatus;
  submitDate: string;
  items: { desc: string; amount: number; date: string }[];
  currentApprover?: string;
  remarks?: string;
}

const STATUS_CONFIG: Record<ExpenseStatus, { label: { en: string; zh: string }; color: string; bg: string }> = {
  draft: { label: { en: 'Draft', zh: '草稿' }, color: 'text-gray-400', bg: 'bg-gray-500/20' },
  pending: { label: { en: 'Pending', zh: '待审批' }, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  'manager-approved': { label: { en: 'Manager OK', zh: '主管已批' }, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  'finance-approved': { label: { en: 'Finance OK', zh: '财务已批' }, color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
  paid: { label: { en: 'Paid', zh: '已付款' }, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  rejected: { label: { en: 'Rejected', zh: '已驳回' }, color: 'text-red-400', bg: 'bg-red-500/20' },
};

const EXPENSE_CLAIMS: ExpenseClaim[] = [
  {
    id: 'EX-2026-001', title: '华东地区客户拜访差旅', applicant: '张伟', department: '销售部',
    amount: 12680, category: '差旅费', status: 'pending', submitDate: '2026-03-12',
    currentApprover: '王经理',
    items: [
      { desc: '上海-南京高铁', amount: 345, date: '03-08' },
      { desc: '南京住宿2晚', amount: 1560, date: '03-08' },
      { desc: '南京-杭州高铁', amount: 287, date: '03-10' },
      { desc: '杭州住宿1晚', amount: 680, date: '03-10' },
      { desc: '市内交通', amount: 458, date: '03-08' },
      { desc: '客户招待晚宴', amount: 8350, date: '03-09' },
      { desc: '杭州-上海高铁', amount: 287, date: '03-11' },
      { desc: '其他杂费', amount: 713, date: '03-08' },
    ]
  },
  {
    id: 'EX-2026-002', title: '智能分拣系统培训费用', applicant: '赵磊', department: 'IT部门',
    amount: 35000, category: '培训费', status: 'manager-approved', submitDate: '2026-03-10',
    currentApprover: '李财务总监',
    items: [
      { desc: '外部培训师费用', amount: 20000, date: '03-05' },
      { desc: '培训场地租赁', amount: 5000, date: '03-05' },
      { desc: '培训教材印刷', amount: 3000, date: '03-04' },
      { desc: '参训人员午餐', amount: 4500, date: '03-05' },
      { desc: '培训设备租赁', amount: 2500, date: '03-05' },
    ]
  },
  {
    id: 'EX-2026-003', title: '3月办公耗材采购', applicant: '陈芳', department: '行政部',
    amount: 4580, category: '办公费', status: 'finance-approved', submitDate: '2026-03-08',
    items: [
      { desc: '打印纸 A4 50箱', amount: 2250, date: '03-06' },
      { desc: '文具用品', amount: 680, date: '03-06' },
      { desc: '墨盒/硒鼓', amount: 1650, date: '03-07' },
    ]
  },
  {
    id: 'EX-2026-004', title: '印尼供应商考察出差', applicant: '李娜', department: '采购部',
    amount: 28500, category: '差旅费', status: 'paid', submitDate: '2026-03-01',
    items: [
      { desc: '上海-雅加达往返机票', amount: 8200, date: '02-25' },
      { desc: '酒店住宿5晚', amount: 9500, date: '02-25' },
      { desc: '商务车辆租赁', amount: 5800, date: '02-25' },
      { desc: '翻译服务', amount: 3000, date: '02-25' },
      { desc: '餐饮及其他', amount: 2000, date: '02-25' },
    ]
  },
  {
    id: 'EX-2026-005', title: '仓库安全设施维修', applicant: '刘洋', department: '生产部',
    amount: 15800, category: '维修费', status: 'rejected', submitDate: '2026-03-05',
    remarks: '超出部门预算限额，需重新申请并附部门经理加签',
    items: [
      { desc: '消防设施检修', amount: 8500, date: '03-02' },
      { desc: '监控设备更换', amount: 5300, date: '03-03' },
      { desc: '安全护栏修复', amount: 2000, date: '03-04' },
    ]
  },
  {
    id: 'EX-2026-006', title: '2026废金属回收展参展费', applicant: '王强', department: '销售部',
    amount: 85000, category: '展会费', status: 'pending', submitDate: '2026-03-11',
    currentApprover: '王经理',
    items: [
      { desc: '展位租赁费', amount: 45000, date: '03-01' },
      { desc: '展台搭建', amount: 25000, date: '03-01' },
      { desc: '宣传物料印刷', amount: 8000, date: '03-05' },
      { desc: '展品运输', amount: 7000, date: '03-08' },
    ]
  },
  {
    id: 'EX-2026-007', title: '部门团建活动费用', applicant: '赵磊', department: 'IT部门',
    amount: 6200, category: '福利费', status: 'draft', submitDate: '2026-03-13',
    items: [
      { desc: '团建场地费', amount: 2800, date: '03-15' },
      { desc: '餐饮费用', amount: 2400, date: '03-15' },
      { desc: '活动物资', amount: 1000, date: '03-14' },
    ]
  },
  {
    id: 'EX-2026-008', title: '韩国客户商务接待', applicant: '张伟', department: '销售部',
    amount: 18600, category: '招待费', status: 'paid', submitDate: '2026-02-28',
    items: [
      { desc: '商务宴请', amount: 12800, date: '02-26' },
      { desc: '酒店住宿协助', amount: 3800, date: '02-25' },
      { desc: '商务用车', amount: 2000, date: '02-25' },
    ]
  },
];

const MONTHLY_EXPENSE_DATA = [
  { month: '10月', amount: 125 },
  { month: '11月', amount: 148 },
  { month: '12月', amount: 186 },
  { month: '1月', amount: 132 },
  { month: '2月', amount: 95 },
  { month: '3月', amount: 168 },
];

const CATEGORY_PIE = [
  { name: '差旅费', value: 38, color: '#3b82f6' },
  { name: '招待费', value: 22, color: '#8b5cf6' },
  { name: '办公费', value: 12, color: '#22c55e' },
  { name: '培训费', value: 10, color: '#f59e0b' },
  { name: '展会费', value: 10, color: '#ec4899' },
  { name: '其他', value: 8, color: '#6b7280' },
];

export function SmartReimbursement({ currentLanguage }: SmartReimbursementProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'all' as TabType, label: { en: 'All Claims', zh: '全部报销' }, icon: FileText },
    { id: 'pending' as TabType, label: { en: 'Pending', zh: '待审批' }, icon: Clock },
    { id: 'approved' as TabType, label: { en: 'Processed', zh: '已处理' }, icon: CheckCircle2 },
    { id: 'statistics' as TabType, label: { en: 'Statistics', zh: '统计分析' }, icon: BarChart3 },
  ];

  const filteredClaims = EXPENSE_CLAIMS.filter(c => {
    if (activeTab === 'pending') return ['pending', 'manager-approved'].includes(c.status);
    if (activeTab === 'approved') return ['finance-approved', 'paid', 'rejected'].includes(c.status);
    return true;
  }).filter(c =>
    searchTerm === '' ||
    c.title.includes(searchTerm) ||
    c.applicant.includes(searchTerm) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = EXPENSE_CLAIMS.filter(c => ['pending', 'manager-approved'].includes(c.status)).length;
  const totalPending = EXPENSE_CLAIMS.filter(c => ['pending', 'manager-approved'].includes(c.status)).reduce((s, c) => s + c.amount, 0);
  const monthlyTotal = EXPENSE_CLAIMS.filter(c => c.submitDate.startsWith('2026-03')).reduce((s, c) => s + c.amount, 0);

  const fmtM = (v: number) => v >= 10000 ? `¥${(v / 10000).toFixed(1)}万` : `¥${v.toLocaleString()}`;

  // Approval flow steps renderer
  const renderFlow = (status: ExpenseStatus) => {
    const steps = [
      { name: isZh ? '提交' : 'Submit', done: status !== 'draft' },
      { name: isZh ? '主管审批' : 'Manager', done: ['manager-approved', 'finance-approved', 'paid'].includes(status) },
      { name: isZh ? '财务审批' : 'Finance', done: ['finance-approved', 'paid'].includes(status) },
      { name: isZh ? '付款' : 'Payment', done: status === 'paid' },
    ];
    if (status === 'rejected') {
      return (
        <div className="flex items-center space-x-2 text-xs text-red-400">
          <XCircle className="w-3.5 h-3.5" />
          <span>{isZh ? '已驳回' : 'Rejected'}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${step.done ? 'bg-emerald-500/20' : 'bg-slate-700/30'}`}>
              {step.done ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <div className="w-3 h-3 rounded-full border border-gray-600" />}
              <span className={`text-xs ${step.done ? 'text-emerald-400' : 'text-gray-500'}`}>{step.name}</span>
            </div>
            {i < steps.length - 1 && <div className={`w-4 h-0.5 ${step.done ? 'bg-emerald-500/40' : 'bg-slate-700/40'}`} />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-orange-500/20">
            <Receipt className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '智能报销' : 'Smart Reimbursement'}</h1>
            <p className="text-sm text-gray-400">{isZh ? '费用报销申请/审批/支付全流程' : 'Expense claim workflow: apply, approve, pay'}</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500/20 text-orange-300 rounded-xl border border-orange-500/30 hover:bg-orange-500/30 transition-all text-sm">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '新建报销' : 'New Claim'}</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '待审报销' : 'Pending Claims', value: pendingCount.toString(), icon: Clock, gradient: 'from-amber-500 to-orange-500' },
          { label: isZh ? '待审金额' : 'Pending Amount', value: fmtM(totalPending), icon: DollarSign, gradient: 'from-red-500 to-rose-500' },
          { label: isZh ? '本月报销额' : 'Monthly Total', value: fmtM(monthlyTotal), icon: TrendingUp, gradient: 'from-blue-500 to-cyan-500' },
          { label: isZh ? '平均审批时效' : 'Avg. Approval', value: isZh ? '1.8天' : '1.8d', icon: CheckCircle2, gradient: 'from-emerald-500 to-green-500' },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div key={idx} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}>
                <StatIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl text-white">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-white border border-orange-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
              {tab.id === 'pending' && pendingCount > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500/30 text-red-300 rounded-full text-xs">{pendingCount}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search */}
      {activeTab !== 'statistics' && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder={isZh ? '搜索报销单号、标题、申请人...' : 'Search claim ID, title, applicant...'} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
        </div>
      )}

      {/* Claims List */}
      {activeTab !== 'statistics' && (
        <div className="space-y-3">
          {filteredClaims.map(claim => {
            const sc = STATUS_CONFIG[claim.status];
            const isExpanded = expandedClaim === claim.id;

            return (
              <div key={claim.id} className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all ${
                isExpanded ? 'border-orange-500/30' : claim.status === 'rejected' ? 'border-red-500/15' : 'border-white/5 hover:border-white/10'
              }`}>
                <div className="p-5 cursor-pointer" onClick={() => setExpandedClaim(isExpanded ? null : claim.id)}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-500">{claim.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                          {isZh ? sc.label.zh : sc.label.en}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300">{claim.category}</span>
                      </div>
                      <h4 className="text-white mt-1">{claim.title}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-white">{fmtM(claim.amount)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1"><User className="w-3 h-3" /><span>{claim.applicant}</span></span>
                      <span className="flex items-center space-x-1"><Briefcase className="w-3 h-3" /><span>{claim.department}</span></span>
                      <span className="flex items-center space-x-1"><Calendar className="w-3 h-3" /><span>{claim.submitDate}</span></span>
                    </div>
                    {claim.currentApprover && (
                      <span className="text-xs text-amber-400">{isZh ? '当前审批人：' : 'Approver: '}{claim.currentApprover}</span>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                    {/* Approval Flow */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">{isZh ? '审批流程' : 'Approval Flow'}</p>
                      {renderFlow(claim.status)}
                    </div>

                    {claim.remarks && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <p className="text-xs text-red-400">{isZh ? '驳回原因：' : 'Reason: '}{claim.remarks}</p>
                      </div>
                    )}

                    {/* Expense Items */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">{isZh ? '费用明细' : 'Expense Items'}</p>
                      <div className="space-y-1">
                        {claim.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/40">
                            <div className="flex items-center space-x-3">
                              <span className="text-xs text-gray-600 w-5">{idx + 1}.</span>
                              <span className="text-sm text-gray-300">{item.desc}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-xs text-gray-500">{item.date}</span>
                              <span className="text-sm text-white w-20 text-right">¥{item.amount.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center justify-end p-2.5 border-t border-white/5">
                          <span className="text-sm text-gray-400 mr-4">{isZh ? '合计' : 'Total'}:</span>
                          <span className="text-white">{fmtM(claim.amount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {claim.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isZh ? '批准' : 'Approve'}</span>
                        </button>
                        <button className="flex items-center space-x-1.5 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all text-sm">
                          <XCircle className="w-4 h-4" />
                          <span>{isZh ? '驳回' : 'Reject'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '月度报销总额趋势（千元）' : 'Monthly Expense Trend (K ¥)'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={MONTHLY_EXPENSE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="amount" fill="#f97316" radius={[6, 6, 0, 0]} name={isZh ? '金额（千元）' : 'Amount (K)'} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '费用类型分布' : 'Expense Category Distribution'}</h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie data={CATEGORY_PIE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {CATEGORY_PIE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-3">
                  {CATEGORY_PIE.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">{isZh ? '超额报销占比' : 'Over-limit Claims'}</span>
              </div>
              <p className="text-2xl text-white">12.5%</p>
              <p className="text-xs text-red-400 mt-1">+3.2% {isZh ? '较上月' : 'vs last month'}</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">{isZh ? '人均报销额' : 'Avg. per Employee'}</span>
              </div>
              <p className="text-2xl text-white">¥3,860</p>
              <p className="text-xs text-gray-500 mt-1">{isZh ? '本月' : 'This month'}</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">{isZh ? '一次通过率' : 'First-pass Rate'}</span>
              </div>
              <p className="text-2xl text-white">87.5%</p>
              <p className="text-xs text-emerald-400 mt-1">+5% {isZh ? '较上月' : 'vs last month'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
