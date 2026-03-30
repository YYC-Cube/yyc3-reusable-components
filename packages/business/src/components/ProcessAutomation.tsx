import React, { useState } from 'react';
import {
  Zap, Brain, Sparkles, Play, Pause, CheckCircle2, XCircle,
  Clock, Settings, BarChart3, ArrowRight, RefreshCw, AlertTriangle,
  Layers, Target, Activity, GitBranch, Bot, Eye, Workflow,
  TrendingUp, FileText, Users, Mail, Bell
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

interface ProcessAutomationProps {
  currentLanguage: string;
}

type TabType = 'rules' | 'executions' | 'templates' | 'analytics';

interface AutoRule {
  id: string;
  name: string;
  trigger: string;
  conditions: string[];
  actions: string[];
  category: 'procurement' | 'sales' | 'finance' | 'hr' | 'logistics';
  status: 'active' | 'paused' | 'draft';
  executionCount: number;
  successRate: number;
  lastTriggered: string;
  savedHours: number;
}

interface Execution {
  id: string;
  ruleName: string;
  trigger: string;
  status: 'success' | 'failed' | 'running' | 'skipped';
  timestamp: string;
  duration: string;
  detail: string;
}

const AUTO_RULES: AutoRule[] = [
  {
    id: 'AR-001', name: '低库存自动补货', trigger: '库存低于安全线',
    conditions: ['库存量 < 安全库存', '供应商状态 = 活跃', '非节假日'],
    actions: ['生成采购申请单', '通知采购经理审批', '发送供应商询价邮件'],
    category: 'procurement', status: 'active', executionCount: 89, successRate: 96.6,
    lastTriggered: '2026-03-13 11:30', savedHours: 156,
  },
  {
    id: 'AR-002', name: '大额订单自动审核', trigger: '新订单金额>50万',
    conditions: ['订单金额 > ¥500,000', '客户信用等级 >= AA'],
    actions: ['风控系统自动评估', '生成审批流程', '通知总经理', '短信通知客户'],
    category: 'sales', status: 'active', executionCount: 34, successRate: 100,
    lastTriggered: '2026-03-13 09:45', savedHours: 68,
  },
  {
    id: 'AR-003', name: '发票自动匹配对账', trigger: '新发票录入',
    conditions: ['发票金额与订单差异 < 2%', '供应商信息匹配'],
    actions: ['自动匹配订单', '生成对账记录', '标记待确认', '异常发送告警'],
    category: 'finance', status: 'active', executionCount: 256, successRate: 94.1,
    lastTriggered: '2026-03-13 14:00', savedHours: 320,
  },
  {
    id: 'AR-004', name: '逾期应收自动催收', trigger: '应收账款逾期>7天',
    conditions: ['逾期天数 > 7', '催收次数 < 3'],
    actions: ['发送催收邮件', '发送短信提醒', '通知销售负责人', '逾期>30天转法务'],
    category: 'finance', status: 'active', executionCount: 42, successRate: 88.1,
    lastTriggered: '2026-03-12 09:00', savedHours: 52,
  },
  {
    id: 'AR-005', name: '新员工入职自动化', trigger: '入职审批通过',
    conditions: ['入职审批状态 = 通过'],
    actions: ['创建企业邮箱', '分配工位和设备', '添加钉钉组织', '发送入职指南', '安排培训'],
    category: 'hr', status: 'active', executionCount: 18, successRate: 100,
    lastTriggered: '2026-03-11 10:00', savedHours: 36,
  },
  {
    id: 'AR-006', name: '物流异常自动告警', trigger: '运输状态异常',
    conditions: ['配送延迟 > 4小时', '或温度超限', '或路线偏离'],
    actions: ['发送告警通知', '通知物流经理', '自动联系承运商', '更新客户预计到达时间'],
    category: 'logistics', status: 'active', executionCount: 23, successRate: 91.3,
    lastTriggered: '2026-03-13 08:20', savedHours: 28,
  },
  {
    id: 'AR-007', name: '月度报表自动生成', trigger: '每月1日 00:00',
    conditions: ['上月数据采集完成'],
    actions: ['生成销售月报', '生成采购月报', '生成财务月报', '邮件发送管理层'],
    category: 'finance', status: 'paused', executionCount: 5, successRate: 100,
    lastTriggered: '2026-03-01 00:05', savedHours: 40,
  },
];

const EXECUTIONS: Execution[] = [
  { id: 'E001', ruleName: '低库存自动补货', trigger: '废铜6#库存<50吨', status: 'success', timestamp: '2026-03-13 11:30', duration: '2.3s', detail: '已生成采购单PO-20260313-042' },
  { id: 'E002', ruleName: '发票自动匹配', trigger: '新发票INV-88432', status: 'success', timestamp: '2026-03-13 14:00', duration: '0.8s', detail: '匹配订单ORD-20260310-018' },
  { id: 'E003', ruleName: '大额订单审核', trigger: '订单¥680,000', status: 'success', timestamp: '2026-03-13 09:45', duration: '1.5s', detail: '风控通过，已触发审批流' },
  { id: 'E004', ruleName: '物流异常告警', trigger: '车辆GPS偏离', status: 'success', timestamp: '2026-03-13 08:20', duration: '0.5s', detail: '已通知物流经理+承运商' },
  { id: 'E005', ruleName: '发票自动匹配', trigger: '新发票INV-88430', status: 'failed', timestamp: '2026-03-13 13:45', duration: '1.2s', detail: '金额差异5.3%超阈值，已转人工' },
  { id: 'E006', ruleName: '逾期催收', trigger: '汇丰回收逾期8天', status: 'running', timestamp: '2026-03-13 14:10', duration: '-', detail: '催收邮件发送中...' },
  { id: 'E007', ruleName: '低库存补货', trigger: '废铝6061库存<30吨', status: 'skipped', timestamp: '2026-03-13 10:00', duration: '0.1s', detail: '供应商状态异常，跳过' },
];

const EXEC_TREND = [
  { date: '03-07', success: 42, failed: 3, skipped: 2 },
  { date: '03-08', success: 38, failed: 2, skipped: 1 },
  { date: '03-09', success: 51, failed: 4, skipped: 3 },
  { date: '03-10', success: 45, failed: 2, skipped: 1 },
  { date: '03-11', success: 48, failed: 3, skipped: 2 },
  { date: '03-12', success: 55, failed: 2, skipped: 1 },
  { date: '03-13', success: 52, failed: 1, skipped: 1 },
];

export function ProcessAutomation({ currentLanguage }: ProcessAutomationProps) {
  const [activeTab, setActiveTab] = useState<TabType>('rules');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'rules' as TabType, label: { en: 'Rules', zh: '自动化规则' }, icon: Zap },
    { id: 'executions' as TabType, label: { en: 'Executions', zh: '执行记录' }, icon: Activity },
    { id: 'templates' as TabType, label: { en: 'Templates', zh: '模板市场' }, icon: Layers },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '效能分析' }, icon: BarChart3 },
  ];

  const catConf: Record<string, { label: string; color: string }> = {
    procurement: { label: isZh ? '采购' : 'Procurement', color: 'text-blue-400' },
    sales: { label: isZh ? '销售' : 'Sales', color: 'text-emerald-400' },
    finance: { label: isZh ? '财务' : 'Finance', color: 'text-amber-400' },
    hr: { label: isZh ? '人事' : 'HR', color: 'text-pink-400' },
    logistics: { label: isZh ? '物流' : 'Logistics', color: 'text-purple-400' },
  };

  const statusConf: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: isZh ? '运行中' : 'Active', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    paused: { label: isZh ? '已暂停' : 'Paused', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    draft: { label: isZh ? '草稿' : 'Draft', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  };

  const execConf: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
    success: { label: isZh ? '成功' : 'OK', color: 'text-emerald-400', bg: 'bg-emerald-500/20', icon: CheckCircle2 },
    failed: { label: isZh ? '失败' : 'Fail', color: 'text-red-400', bg: 'bg-red-500/20', icon: XCircle },
    running: { label: isZh ? '执行中' : 'Running', color: 'text-blue-400', bg: 'bg-blue-500/20', icon: RefreshCw },
    skipped: { label: isZh ? '跳过' : 'Skip', color: 'text-gray-400', bg: 'bg-gray-500/20', icon: Eye },
  };

  const totalSavedHours = AUTO_RULES.reduce((s, r) => s + r.savedHours, 0);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-yellow-500/20">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '流程自动化' : 'Process Automation'}</span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">{isZh ? 'RPA规则引擎·事件驱动·智能执行' : 'RPA rule engine · Event-driven · Smart execution'}</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-xl border border-yellow-500/30 text-sm">
          <Zap className="w-4 h-4" /><span>{isZh ? '新建规则' : 'New Rule'}</span>
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '活跃规则' : 'Active Rules', value: AUTO_RULES.filter(r => r.status === 'active').length.toString(), icon: Zap, gradient: 'from-yellow-500 to-orange-500', sub: `${AUTO_RULES.length} ${isZh ? '总规则' : 'total'}` },
          { label: isZh ? '今日执行' : 'Today Runs', value: '54', icon: Activity, gradient: 'from-blue-500 to-indigo-500', sub: isZh ? '1次失败' : '1 failed' },
          { label: isZh ? '累计节省工时' : 'Hours Saved', value: `${totalSavedHours}h`, icon: Clock, gradient: 'from-emerald-500 to-green-500', sub: `≈ ¥${Math.round(totalSavedHours * 80 / 10000)}万` },
          { label: isZh ? '成功率' : 'Success Rate', value: '95.2%', icon: Target, gradient: 'from-purple-500 to-pink-500', sub: '+2.1% MoM' },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
              <div className="flex items-start justify-between">
                <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-2xl text-white mt-1">{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.sub}</p></div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} opacity-80 flex items-center justify-center`}><I className="w-5 h-5 text-white" /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => { const T = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-white border border-yellow-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <T className="w-4 h-4" /><span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
          </button>
        ); })}
      </div>

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {AUTO_RULES.map(rule => {
            const cc = catConf[rule.category];
            const sc = statusConf[rule.status];
            const isExpanded = expandedRule === rule.id;
            return (
              <div key={rule.id} onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${isExpanded ? 'border-yellow-500/30 shadow-lg shadow-yellow-500/5' : 'border-white/5 hover:border-white/10'}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <h4 className="text-white">{rule.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span>
                        <span className={`text-xs ${cc.color}`}>{cc.label}</span>
                      </div>
                      <p className="text-xs text-gray-500">{isZh ? '触发' : 'Trigger'}: {rule.trigger}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-400">{rule.savedHours}h</p>
                      <p className="text-xs text-gray-500">{isZh ? '累计节省' : 'Saved'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-xs text-gray-500">
                    <span>{isZh ? '执行' : 'Runs'}: <span className="text-white">{rule.executionCount}</span></span>
                    <span>{isZh ? '成功率' : 'Success'}: <span className="text-emerald-400">{rule.successRate}%</span></span>
                    <span>{isZh ? '最后触发' : 'Last'}: {rule.lastTriggered}</span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-2">{isZh ? '条件' : 'Conditions'}</p>
                        {rule.conditions.map((c, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-amber-300 mb-1.5">
                            <span className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-400">IF</span>
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2">{isZh ? '执行动作' : 'Actions'}</p>
                        {rule.actions.map((a, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-emerald-300 mb-1.5">
                            <span className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400">{i + 1}</span>
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Executions Tab */}
      {activeTab === 'executions' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '时间' : 'Time'}</th>
                <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '规则' : 'Rule'}</th>
                <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '触发' : 'Trigger'}</th>
                <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '状态' : 'Status'}</th>
                <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '耗时' : 'Duration'}</th>
                <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '详情' : 'Detail'}</th>
              </tr></thead>
              <tbody>
                {EXECUTIONS.map(ex => {
                  const ec = execConf[ex.status];
                  const EI = ec.icon;
                  return (
                    <tr key={ex.id} className={`border-b border-white/5 hover:bg-white/[0.02] ${ex.status === 'failed' ? 'bg-red-500/[0.03]' : ''}`}>
                      <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">{ex.timestamp}</td>
                      <td className="py-3 px-4 text-sm text-white">{ex.ruleName}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{ex.trigger}</td>
                      <td className="py-3 px-4 text-center"><span className={`inline-flex items-center space-x-1 text-xs px-2 py-0.5 rounded-full ${ec.bg} ${ec.color}`}><EI className="w-3 h-3" /><span>{ec.label}</span></span></td>
                      <td className="py-3 px-4 text-center text-xs text-gray-400">{ex.duration}</td>
                      <td className="py-3 px-4 text-xs text-gray-500 max-w-[200px] truncate">{ex.detail}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: isZh ? '采购全流程自动化' : 'Procurement Automation', desc: isZh ? '需求→询价→比价→下单→收货→付款' : 'Request→RFQ→Compare→Order→Receive→Pay', rules: 6, savedHours: '80h/月' },
            { name: isZh ? '销售线索自动跟进' : 'Lead Auto Follow-up', desc: isZh ? '线索评分→自动分配→跟进提醒→转化追踪' : 'Score→Assign→Remind→Track', rules: 4, savedHours: '45h/月' },
            { name: isZh ? '财务月末自动结算' : 'Month-end Settlement', desc: isZh ? '对账→核销→报表→审计→归档' : 'Reconcile→Settle→Report→Audit→Archive', rules: 5, savedHours: '60h/月' },
            { name: isZh ? '仓库智能调度' : 'Warehouse Smart Dispatch', desc: isZh ? '入库→上架→拣货→出库→盘点' : 'Inbound→Shelve→Pick→Outbound→Count', rules: 5, savedHours: '55h/月' },
            { name: isZh ? '客户服务自动化' : 'Customer Service Auto', desc: isZh ? '工单→分类→分配→处理→回访' : 'Ticket→Classify→Assign→Handle→Follow-up', rules: 4, savedHours: '35h/月' },
            { name: isZh ? '合规自动检查' : 'Compliance Auto Check', desc: isZh ? '数据采集→规则检查→报告生成→预警通知' : 'Collect→Check→Report→Alert', rules: 3, savedHours: '25h/月' },
          ].map((t, i) => (
            <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-yellow-500/20 transition-all">
              <div className="flex items-center space-x-2 mb-2">
                <Layers className="w-5 h-5 text-yellow-400" />
                <h4 className="text-white">{t.name}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">{t.desc}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{t.rules} {isZh ? '条规则' : 'rules'}</span>
                <span className="text-emerald-400">{isZh ? '预计节省' : 'Est.'} {t.savedHours}</span>
              </div>
              <button className="mt-3 w-full py-2 bg-yellow-500/10 text-yellow-300 rounded-lg border border-yellow-500/20 text-xs hover:bg-yellow-500/20 transition-all">
                {isZh ? '一键部署' : 'Deploy'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '近7天执行趋势' : '7-Day Execution Trend'}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={EXEC_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="success" fill="#22c55e" name={isZh ? '成功' : 'Success'} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="failed" fill="#ef4444" name={isZh ? '失败' : 'Failed'} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="skipped" fill="#6b7280" name={isZh ? '跳过' : 'Skipped'} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white flex items-center space-x-2 mb-4"><Brain className="w-5 h-5 text-yellow-400" /><span>AI {isZh ? '优化建议' : 'Optimization Tips'}</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { text: isZh ? '「发票自动匹配」失败率偏高(5.9%)，建议将金额差异阈值从2%调整为3%，预计可减少65%的误报' : 'Invoice matching fail rate 5.9%, adjust threshold from 2% to 3%' },
                { text: isZh ? '检测到每周三14:00-16:00执行密度最高，建议错峰调度以平滑系统负载' : 'Peak execution Wed 14-16, suggest staggering for load balance' },
                { text: isZh ? '「逾期催收」规则可增加AI情感分析，根据客户历史行为自适应催收策略和话术' : 'Add AI sentiment analysis to collection rule for adaptive strategy' },
              ].map((tip, i) => (
                <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/5 border border-yellow-500/15">
                  <p className="text-xs text-yellow-300"><Sparkles className="w-3 h-3 inline mr-1" />{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
