import React, { useState } from 'react';
import {
  Network,
  Brain,
  Sparkles,
  Database,
  BarChart3,
  Target,
  TrendingUp,
  Search,
  Layers,
  Zap,
  Activity,
  GitBranch,
  Eye,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Users,
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
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

interface DataMiningProps {
  currentLanguage: string;
}
type TabType = 'models' | 'patterns' | 'clusters' | 'insights';

interface MiningModel {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'completed' | 'training';
  accuracy: number;
  lastRun: string;
  records: number;
  findings: number;
  description: string;
}

const MODELS: MiningModel[] = [
  {
    id: 'DM-001',
    name: '客户分群模型',
    type: 'K-Means聚类',
    status: 'completed',
    accuracy: 92.5,
    lastRun: '2026-03-13 06:00',
    records: 1286,
    findings: 5,
    description: '将客户按交易行为、行业、规模自动聚类为5个群组',
  },
  {
    id: 'DM-002',
    name: '价格异常检测',
    type: '孤立森林',
    status: 'running',
    accuracy: 96.8,
    lastRun: '2026-03-13 14:00',
    records: 28560,
    findings: 12,
    description: '实时检测废金属交易中的价格异常和欺诈行为',
  },
  {
    id: 'DM-003',
    name: '供应商关联挖掘',
    type: '关联规则(Apriori)',
    status: 'completed',
    accuracy: 88.3,
    lastRun: '2026-03-12 22:00',
    records: 4520,
    findings: 18,
    description: '发现供应商间的隐藏关联关系和潜在合作机会',
  },
  {
    id: 'DM-004',
    name: '需求预测序列',
    type: '时序分析(Prophet)',
    status: 'completed',
    accuracy: 91.2,
    lastRun: '2026-03-13 08:00',
    records: 36500,
    findings: 8,
    description: '基于历史交易数据预测未来30天各品类废金属需求',
  },
  {
    id: 'DM-005',
    name: '客户流失预警',
    type: '梯度提升(XGBoost)',
    status: 'training',
    accuracy: 89.7,
    lastRun: '2026-03-13 12:00',
    records: 1286,
    findings: 23,
    description: '识别有流失风险的客户并推荐挽回策略',
  },
];

const PATTERNS = [
  {
    pattern: '季节性采购峰值',
    confidence: 95,
    support: 78,
    description: '每年3-4月和9-10月废铜采购量比平月高35-42%，与下游制造业排产周期强相关',
  },
  {
    pattern: 'LME联动效应',
    confidence: 93,
    support: 85,
    description: 'LME铜价变动后48小时内，国内废铜现货价格调整概率达93%，滞后幅度约为LME的85%',
  },
  {
    pattern: '大客户交叉购买',
    confidence: 88,
    support: 62,
    description: '采购废铜>100吨/月的客户中，62%同时采购废铝，平均交叉购买间隔为3.2个月',
  },
  {
    pattern: '供应商集中度风险',
    confidence: 91,
    support: 70,
    description: '前3家供应商占总采购量70%，任一供应商断供将影响月产能22-35%',
  },
  {
    pattern: '周五效应',
    confidence: 86,
    support: 55,
    description: '周五下单的订单平均交付时间比周一-周四长1.8天，建议紧急订单避开周五',
  },
];

const CLUSTER_SCATTER = [
  { x: 85, y: 92, z: 580, name: 'A-高价值大客户', count: 12 },
  { x: 65, y: 75, z: 320, name: 'B-成长型客户', count: 28 },
  { x: 40, y: 55, z: 180, name: 'C-稳定小客户', count: 45 },
  { x: 25, y: 30, z: 80, name: 'D-低频试用客户', count: 35 },
  { x: 70, y: 40, z: 250, name: 'E-价格敏感型', count: 18 },
];

const INSIGHT_TREND = [
  { month: '10月', insights: 42, actionable: 28, implemented: 18 },
  { month: '11月', insights: 48, actionable: 35, implemented: 22 },
  { month: '12月', insights: 55, actionable: 38, implemented: 25 },
  { month: '1月', insights: 52, actionable: 40, implemented: 30 },
  { month: '2月', insights: 60, actionable: 45, implemented: 32 },
  { month: '3月', insights: 68, actionable: 52, implemented: 38 },
];

const ALGO_PIE = [
  { name: '聚类分析', value: 25, color: '#3b82f6' },
  { name: '异常检测', value: 22, color: '#ef4444' },
  { name: '关联规则', value: 18, color: '#22c55e' },
  { name: '时序预测', value: 20, color: '#8b5cf6' },
  { name: '分类模型', value: 15, color: '#f59e0b' },
];

export function DataMining({ currentLanguage }: DataMiningProps) {
  const [activeTab, setActiveTab] = useState<TabType>('models');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'models' as TabType, label: { en: 'Models', zh: '挖掘模型' }, icon: Database },
    { id: 'patterns' as TabType, label: { en: 'Patterns', zh: '规律发现' }, icon: GitBranch },
    { id: 'clusters' as TabType, label: { en: 'Clusters', zh: '聚类分析' }, icon: Network },
    { id: 'insights' as TabType, label: { en: 'Insights', zh: '洞察报告' }, icon: Brain },
  ];

  const statusConf = {
    running: { label: isZh ? '运行中' : 'Running', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    completed: {
      label: isZh ? '已完成' : 'Done',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
    },
    training: {
      label: isZh ? '训练中' : 'Training',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
    },
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-teal-500/20">
            <Network className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '数据挖掘' : 'Data Mining'}</span>
              <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? '关联分析·聚类挖掘·异常检测·规律发现'
                : 'Association · Clustering · Anomaly · Pattern discovery'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '挖掘模型' : 'Models',
            value: MODELS.length.toString(),
            icon: Database,
            gradient: 'from-teal-500 to-cyan-500',
            sub: `${MODELS.filter((m) => m.status === 'running').length} ${isZh ? '运行中' : 'running'}`,
          },
          {
            label: isZh ? '规律发现' : 'Patterns',
            value: '68',
            icon: GitBranch,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '本月新增12条' : '12 new this month',
          },
          {
            label: isZh ? '处理数据量' : 'Data Processed',
            value: '72K',
            icon: Activity,
            gradient: 'from-purple-500 to-pink-500',
            sub: isZh ? '条记录/日' : 'records/day',
          },
          {
            label: isZh ? '可执行洞察' : 'Actionable',
            value: '52',
            icon: Target,
            gradient: 'from-emerald-500 to-green-500',
            sub: isZh ? '38条已实施' : '38 implemented',
          },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-2xl text-white mt-1">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} opacity-80 flex items-center justify-center`}
                >
                  <I className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map((tab) => {
          const T = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-white border border-teal-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'models' && (
        <div className="space-y-4">
          {MODELS.map((m) => {
            const sc = statusConf[m.status];
            return (
              <div
                key={m.id}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-teal-500/20 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white">{m.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                        {sc.label}
                      </span>
                      <span className="text-xs text-gray-500">{m.type}</span>
                    </div>
                    <p className="text-xs text-gray-400">{m.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-white">{m.accuracy}%</p>
                    <p className="text-xs text-gray-500">{isZh ? '准确率' : 'Accuracy'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-xs text-gray-500">
                  <span>
                    {isZh ? '数据量' : 'Records'}:{' '}
                    <span className="text-white">{m.records.toLocaleString()}</span>
                  </span>
                  <span>
                    {isZh ? '发现' : 'Findings'}:{' '}
                    <span className="text-teal-400">{m.findings}</span>
                  </span>
                  <span>
                    {isZh ? '最后运行' : 'Last run'}: {m.lastRun}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'patterns' && (
        <div className="space-y-4">
          {PATTERNS.map((p, i) => (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white">{p.pattern}</h4>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">
                    {isZh ? '置信度' : 'Conf.'}:{' '}
                    <span className="text-teal-400">{p.confidence}%</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {isZh ? '支持度' : 'Support'}:{' '}
                    <span className="text-blue-400">{p.support}%</span>
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'clusters' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '客户聚类气泡图' : 'Customer Cluster Scatter'}
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="x"
                    name={isZh ? '交易频率' : 'Frequency'}
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="y"
                    name={isZh ? '客单价' : 'AOV'}
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <ZAxis
                    dataKey="z"
                    range={[40, 200]}
                    name={isZh ? '年交易额(万)' : 'Revenue(W)'}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15,23,42,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Scatter data={CLUSTER_SCATTER} fill="#14b8a6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {CLUSTER_SCATTER.map((c, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20"
                >
                  {c.name} ({c.count}
                  {isZh ? '家' : ''})
                </span>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '算法使用分布' : 'Algorithm Distribution'}</h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={ALGO_PIE}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {ALGO_PIE.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15,23,42,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-2">
                {ALGO_PIE.map((e, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: e.color }}
                      />
                      <span className="text-xs text-gray-300">{e.name}</span>
                    </div>
                    <span className="text-xs text-white">{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '月度洞察产出趋势' : 'Monthly Insight Output'}
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={INSIGHT_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15,23,42,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Bar
                    dataKey="insights"
                    fill="#14b8a6"
                    name={isZh ? '洞察总数' : 'Total'}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="actionable"
                    fill="#3b82f6"
                    name={isZh ? '可执行' : 'Actionable'}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="implemented"
                    fill="#22c55e"
                    name={isZh ? '已实施' : 'Implemented'}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-teal-400" />
              <span>{isZh ? '本月TOP洞察' : 'Top Insights This Month'}</span>
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: isZh ? '废铜采购窗口预测' : 'Copper Purchase Window',
                  impact: '¥38万',
                  desc: isZh
                    ? '模型预测3月20-25日LME铜价将短暂回调2-3%，建议在此窗口期集中采购Q2库存'
                    : 'Model predicts LME copper 2-3% pullback on Mar 20-25, buy Q2 inventory then',
                },
                {
                  title: isZh ? '隐性客户流失群体' : 'Hidden Churn Group',
                  impact: '¥95万',
                  desc: isZh
                    ? '发现一批"沉默流失"客户：交易频率正常但客单价连续3月下降>20%，涉及8家客户、年交易额¥95万'
                    : 'Found "silent churn" group: normal frequency but AOV dropping >20% for 3 months, 8 clients, ¥950K/yr',
                },
                {
                  title: isZh ? '供应商替代方案' : 'Supplier Alternative',
                  impact: isZh ? '降险30%' : '-30% risk',
                  desc: isZh
                    ? '关联分析发现江苏鑫达可替代华东铜业60%的品类，分散供应商集中度风险'
                    : 'Association analysis shows Jiangsu Xinda can replace 60% of East China Copper categories, diversifying risk',
                },
              ].map((ins, i) => (
                <div key={i} className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/15">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{ins.title}</span>
                    <span className="text-xs text-emerald-400">
                      {isZh ? '预估影响' : 'Impact'}: {ins.impact}
                    </span>
                  </div>
                  <p className="text-xs text-teal-300">{ins.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
