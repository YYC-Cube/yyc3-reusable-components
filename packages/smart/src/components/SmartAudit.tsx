import React, { useState } from 'react';
import {
  Scale, Brain, Sparkles, Shield, AlertTriangle, CheckCircle2,
  XCircle, Clock, Eye, BarChart3, FileText, Search, Users,
  TrendingUp, Target, Activity, Layers, Zap, ArrowUpRight,
  ArrowDownRight, RefreshCw, Filter, Download
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface SmartAuditProps {
  currentLanguage: string;
}

type TabType = 'dashboard' | 'tasks' | 'findings' | 'compliance';

interface AuditTask {
  id: string;
  name: string;
  type: 'financial' | 'operational' | 'compliance' | 'it';
  scope: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  auditor: string;
  startDate: string;
  endDate: string;
  riskLevel: 'high' | 'medium' | 'low';
  findingsCount: number;
  progress: number;
}

interface AuditFinding {
  id: string;
  task: string;
  severity: 'critical' | 'major' | 'minor' | 'observation';
  category: string;
  description: string;
  recommendation: string;
  status: 'open' | 'remediation' | 'closed' | 'accepted';
  dueDate: string;
  owner: string;
}

const AUDIT_TASKS: AuditTask[] = [
  { id: 'AT-001', name: 'Q1采购流程合规审计', type: 'operational', scope: '采购部全流程', status: 'in-progress', auditor: '内审组A', startDate: '2026-03-01', endDate: '2026-03-20', riskLevel: 'high', findingsCount: 5, progress: 72 },
  { id: 'AT-002', name: '应收账款账龄审计', type: 'financial', scope: '30天以上应收', status: 'in-progress', auditor: '内审组B', startDate: '2026-03-05', endDate: '2026-03-18', riskLevel: 'medium', findingsCount: 3, progress: 85 },
  { id: 'AT-003', name: 'IT系统权限审计', type: 'it', scope: '全系统权限', status: 'planning', auditor: 'IT审计组', startDate: '2026-03-15', endDate: '2026-03-30', riskLevel: 'high', findingsCount: 0, progress: 10 },
  { id: 'AT-004', name: '库存盘点差异审计', type: 'operational', scope: '全仓库盘点', status: 'completed', auditor: '内审组A', startDate: '2026-02-20', endDate: '2026-03-05', riskLevel: 'medium', findingsCount: 4, progress: 100 },
  { id: 'AT-005', name: '环保合规年度审计', type: 'compliance', scope: '废金属处理环节', status: 'review', auditor: '合规审计组', startDate: '2026-02-15', endDate: '2026-03-15', riskLevel: 'high', findingsCount: 2, progress: 90 },
];

const FINDINGS: AuditFinding[] = [
  { id: 'AF-001', task: 'Q1采购流程', severity: 'critical', category: '流程违规', description: '3笔50万以上采购未经总经理审批直接执行', recommendation: '立即补签审批，修订采购审批阈值制度', status: 'open', dueDate: '2026-03-15', owner: '采购总监' },
  { id: 'AF-002', task: 'Q1采购流程', severity: 'major', category: '供应商管理', description: '新供应商准入评审记录不完整（缺少现场考察报告）', recommendation: '补充现场考察，完善准入流程模板', status: 'remediation', dueDate: '2026-03-20', owner: '供应链VP' },
  { id: 'AF-003', task: '应收账款', severity: 'major', category: '信用管理', description: '2家客户超信用额度仍继续发货，金额共计¥85万', recommendation: '立即启动信用冻结，完善系统硬控措施', status: 'open', dueDate: '2026-03-18', owner: '风控经理' },
  { id: 'AF-004', task: '库存盘点', severity: 'minor', category: '盘点差异', description: '废铜库存账实差异0.8%（约3.2吨），在可接受范围', recommendation: '调整账面数据，优化称重流程减少误差', status: 'closed', dueDate: '2026-03-10', owner: '仓储经理' },
  { id: 'AF-005', task: '环保合规', severity: 'major', category: '排放合规', description: '熔炼车间粉尘排放监测数据有2次超标记录', recommendation: '升级除尘设备，增加监测频率', status: 'remediation', dueDate: '2026-03-25', owner: '环保主管' },
  { id: 'AF-006', task: '环保合规', severity: 'observation', category: '文档管理', description: '危废转移联单归档不及时，建议数字化管理', recommendation: '引入电子联单系统', status: 'accepted', dueDate: '2026-04-30', owner: 'IT部' },
];

const RISK_RADAR = [
  { area: '采购', score: 75, fullMark: 100 },
  { area: '财务', score: 85, fullMark: 100 },
  { area: '库存', score: 90, fullMark: 100 },
  { area: '合规', score: 70, fullMark: 100 },
  { area: 'IT安全', score: 82, fullMark: 100 },
  { area: '运营', score: 88, fullMark: 100 },
];

const SEVERITY_PIE = [
  { name: '严重', value: 1, color: '#ef4444' },
  { name: '重要', value: 3, color: '#f59e0b' },
  { name: '一般', value: 1, color: '#3b82f6' },
  { name: '观察', value: 1, color: '#6b7280' },
];

const MONTHLY_FINDINGS = [
  { month: '10月', open: 3, remediation: 5, closed: 8 },
  { month: '11月', open: 2, remediation: 4, closed: 10 },
  { month: '12月', open: 5, remediation: 3, closed: 7 },
  { month: '1月', open: 4, remediation: 6, closed: 9 },
  { month: '2月', open: 3, remediation: 4, closed: 11 },
  { month: '3月', open: 2, remediation: 3, closed: 6 },
];

export function SmartAudit({ currentLanguage }: SmartAuditProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'dashboard' as TabType, label: { en: 'Dashboard', zh: '审计看板' }, icon: BarChart3 },
    { id: 'tasks' as TabType, label: { en: 'Tasks', zh: '审计任务' }, icon: FileText },
    { id: 'findings' as TabType, label: { en: 'Findings', zh: '审计发现' }, icon: AlertTriangle },
    { id: 'compliance' as TabType, label: { en: 'Compliance', zh: '合规检查' }, icon: Shield },
  ];

  const taskStatusConf: Record<string, { label: string; color: string; bg: string }> = {
    planning: { label: isZh ? '规划中' : 'Planning', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    'in-progress': { label: isZh ? '审计中' : 'Auditing', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    review: { label: isZh ? '复核中' : 'Review', color: 'text-purple-400', bg: 'bg-purple-500/20' },
    completed: { label: isZh ? '已完成' : 'Done', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  };

  const sevConf: Record<string, { label: string; color: string; bg: string }> = {
    critical: { label: isZh ? '严重' : 'Critical', color: 'text-red-400', bg: 'bg-red-500/20' },
    major: { label: isZh ? '重要' : 'Major', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    minor: { label: isZh ? '一般' : 'Minor', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    observation: { label: isZh ? '观察' : 'Note', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  };

  const findStatusConf: Record<string, { label: string; color: string; bg: string }> = {
    open: { label: isZh ? '待整改' : 'Open', color: 'text-red-400', bg: 'bg-red-500/20' },
    remediation: { label: isZh ? '整改中' : 'Fixing', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    closed: { label: isZh ? '已关闭' : 'Closed', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    accepted: { label: isZh ? '已接受' : 'Accepted', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  };

  const openFindings = FINDINGS.filter(f => f.status === 'open').length;
  const criticalFindings = FINDINGS.filter(f => f.severity === 'critical').length;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-indigo-500/20">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能审计' : 'Smart Audit'}</span>
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">{isZh ? 'AI风险识别·合规检查·审计追踪' : 'AI risk detection · Compliance · Audit tracking'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '进行中审计' : 'Active Audits', value: AUDIT_TASKS.filter(t => t.status === 'in-progress').length.toString(), icon: FileText, gradient: 'from-indigo-500 to-blue-500', sub: `${AUDIT_TASKS.length} ${isZh ? '总任务' : 'total'}` },
          { label: isZh ? '待整改发现' : 'Open Findings', value: openFindings.toString(), icon: AlertTriangle, gradient: 'from-amber-500 to-orange-500', sub: `${criticalFindings} ${isZh ? '严重' : 'critical'}` },
          { label: isZh ? '整改完成率' : 'Fix Rate', value: `${Math.round(FINDINGS.filter(f => f.status === 'closed').length / FINDINGS.length * 100)}%`, icon: CheckCircle2, gradient: 'from-emerald-500 to-green-500', sub: '+8% MoM' },
          { label: isZh ? '合规评分' : 'Compliance Score', value: '82', icon: Shield, gradient: 'from-purple-500 to-pink-500', sub: isZh ? '良好' : 'Good' },
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

      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => { const T = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-white border border-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <T className="w-4 h-4" /><span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
          </button>
        ); })}
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '风险评估雷达' : 'Risk Radar'}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <RadarChart data={RISK_RADAR}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="area" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar name={isZh ? '合规评分' : 'Score'} dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '月度审计发现趋势' : 'Monthly Findings Trend'}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={MONTHLY_FINDINGS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="open" fill="#ef4444" name={isZh ? '待整改' : 'Open'} stackId="a" />
                  <Bar dataKey="remediation" fill="#f59e0b" name={isZh ? '整改中' : 'Fixing'} stackId="a" />
                  <Bar dataKey="closed" fill="#22c55e" name={isZh ? '已关闭' : 'Closed'} stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {AUDIT_TASKS.map(task => {
            const sc = taskStatusConf[task.status];
            return (
              <div key={task.id} className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 ${task.riskLevel === 'high' ? 'border-red-500/10' : 'border-white/5'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white">{task.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span>
                      <span className={`text-xs ${task.riskLevel === 'high' ? 'text-red-400' : task.riskLevel === 'medium' ? 'text-amber-400' : 'text-gray-400'}`}>{isZh ? `风险${task.riskLevel === 'high' ? '高' : task.riskLevel === 'medium' ? '中' : '低'}` : task.riskLevel}</span>
                    </div>
                    <p className="text-xs text-gray-500">{isZh ? '范围' : 'Scope'}: {task.scope} | {isZh ? '审计组' : 'Auditor'}: {task.auditor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{task.findingsCount} {isZh ? '发现' : 'findings'}</p>
                    <p className="text-xs text-gray-500">{task.startDate} ~ {task.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-slate-700/30 rounded-full h-2">
                    <div className={`h-full rounded-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${task.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-400">{task.progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'findings' && (
        <div className="space-y-4">
          {FINDINGS.map(f => {
            const sv = sevConf[f.severity];
            const fs = findStatusConf[f.status];
            return (
              <div key={f.id} className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 ${f.severity === 'critical' ? 'border-red-500/20' : 'border-white/5'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${sv.bg} ${sv.color}`}>{sv.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${fs.bg} ${fs.color}`}>{fs.label}</span>
                      <span className="text-xs text-gray-500">{f.task}</span>
                    </div>
                    <p className="text-sm text-white mb-1">{f.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{isZh ? '截止' : 'Due'}: {f.dueDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/15">
                  <p className="text-xs text-indigo-300"><Sparkles className="w-3 h-3 inline mr-1" />{isZh ? '整改建议' : 'Recommendation'}: {f.recommendation}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">{isZh ? '负责人' : 'Owner'}: {f.owner}</p>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '发现严重程度分布' : 'Findings by Severity'}</h3>
              <div className="h-56 flex items-center">
                <div className="w-1/2 h-full"><ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}><PieChart><Pie data={SEVERITY_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">{SEVERITY_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} /></PieChart></ResponsiveContainer></div>
                <div className="w-1/2 space-y-3">{SEVERITY_PIE.map((e, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} /><span className="text-sm text-gray-300">{e.name}</span></div><span className="text-sm text-white">{e.value}</span></div>))}</div>
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white flex items-center space-x-2 mb-4"><Brain className="w-5 h-5 text-indigo-400" /><span>AI {isZh ? '合规建议' : 'Compliance Tips'}</span></h3>
              <div className="space-y-3">
                {[
                  { text: isZh ? '采购流程合规评分仅75分，建议加强50万以上采购的系统强制审批控制' : 'Procurement compliance 75, enforce system-level approval for >¥500K', level: 'high' },
                  { text: isZh ? '环保排放已发现2次超标，建议升级除尘系统并增加AI在线监测' : '2 emission violations found, upgrade dust system + add AI monitoring', level: 'high' },
                  { text: isZh ? 'IT权限审计即将启动，AI预扫描发现12个账户存在权限过大风险' : 'IT audit starting, AI pre-scan found 12 over-privileged accounts', level: 'medium' },
                  { text: isZh ? '危废管理可引入电子联单系统，提升合规效率约60%' : 'E-manifest system can improve hazardous waste compliance by 60%', level: 'low' },
                ].map((t, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${t.level === 'high' ? 'bg-red-500/10 border-red-500/15' : t.level === 'medium' ? 'bg-amber-500/10 border-amber-500/15' : 'bg-slate-900/30 border-white/5'}`}>
                    <p className="text-xs text-gray-300"><Sparkles className="w-3 h-3 inline mr-1 text-indigo-400" />{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
