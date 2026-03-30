import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Lightbulb,
  GitBranch,
  Layers,
  Clock,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Eye,
  RefreshCw,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Scale,
  Network,
  Gauge,
} from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';

interface SmartDecisionProps {
  currentLanguage: string;
}

type TabType = 'center' | 'analysis' | 'scenarios' | 'history';

interface DecisionItem {
  id: string;
  title: string;
  type: 'procurement' | 'sales' | 'risk' | 'investment' | 'operations';
  urgency: 'critical' | 'high' | 'medium';
  aiConfidence: number;
  aiRecommendation: string;
  impactScore: number;
  deadline: string;
  status: 'pending' | 'approved' | 'rejected' | 'deferred';
  factors: { name: string; score: number; trend: 'up' | 'down' | 'stable' }[];
  expectedROI?: string;
}

const DECISION_ITEMS: DecisionItem[] = [
  {
    id: 'DEC-001',
    title: '越南废铜供应商战略合作签约',
    type: 'procurement',
    urgency: 'critical',
    aiConfidence: 92,
    aiRecommendation:
      '强烈建议签约。AI分析显示该供应商近12个月供货稳定性达97.3%，LME铜价预计Q2上涨8-12%，提前锁价可节约预估¥380万。',
    impactScore: 95,
    deadline: '2026-03-18',
    status: 'pending',
    expectedROI: '预计年化ROI 23.5%',
    factors: [
      { name: '供货稳定性', score: 97, trend: 'up' },
      { name: '价格竞争力', score: 88, trend: 'up' },
      { name: '品质达标率', score: 94, trend: 'stable' },
      { name: '地缘风险', score: 72, trend: 'down' },
      { name: '物流效率', score: 85, trend: 'up' },
    ],
  },
  {
    id: 'DEC-002',
    title: '华东区域废铝加工产线扩容',
    type: 'investment',
    urgency: 'high',
    aiConfidence: 87,
    aiRecommendation:
      '建议批准。市场需求预测显示华东废铝需求将在Q3增长15%，产能缺口约200吨/月。投资回收期预估18个月。',
    impactScore: 88,
    deadline: '2026-03-25',
    status: 'pending',
    expectedROI: '预计投资回收期18个月',
    factors: [
      { name: '市场需求', score: 91, trend: 'up' },
      { name: '产能利用率', score: 95, trend: 'up' },
      { name: '资金充裕度', score: 78, trend: 'stable' },
      { name: '竞争格局', score: 70, trend: 'down' },
      { name: '政策环境', score: 85, trend: 'stable' },
    ],
  },
  {
    id: 'DEC-003',
    title: '东南亚市场大额订单报价策略',
    type: 'sales',
    urgency: 'critical',
    aiConfidence: 85,
    aiRecommendation:
      '建议采用阶梯定价策略：前500吨以¥42,800/吨锁定，后续按月度LME均价浮动±3%。AI预测客户接受概率78%。',
    impactScore: 82,
    deadline: '2026-03-15',
    status: 'pending',
    expectedROI: '预计毛利率18.5%',
    factors: [
      { name: '客户信用', score: 88, trend: 'stable' },
      { name: '市场行情', score: 75, trend: 'up' },
      { name: '竞争对手报价', score: 65, trend: 'down' },
      { name: '汇率风险', score: 70, trend: 'down' },
      { name: '运输成本', score: 80, trend: 'stable' },
    ],
  },
  {
    id: 'DEC-004',
    title: '不锈钢库存减仓建议',
    type: 'risk',
    urgency: 'high',
    aiConfidence: 79,
    aiRecommendation:
      'AI监测到不锈钢镍含量品种价格下行信号，建议未来15天内减仓30%（约850吨），预估可避免¥120万潜在损失。',
    impactScore: 76,
    deadline: '2026-03-20',
    status: 'pending',
    factors: [
      { name: '价格趋势', score: 35, trend: 'down' },
      { name: '库存周转', score: 55, trend: 'down' },
      { name: '市场流动性', score: 68, trend: 'stable' },
      { name: '仓储成本', score: 72, trend: 'up' },
      { name: '下游需求', score: 60, trend: 'down' },
    ],
  },
  {
    id: 'DEC-005',
    title: '智能分拣线二期技改立项',
    type: 'operations',
    urgency: 'medium',
    aiConfidence: 91,
    aiRecommendation:
      '强烈建议。当前分拣效率78%，AI视觉升级后预估可提升至93%，每月额外创收约¥65万，6个月回本。',
    impactScore: 85,
    deadline: '2026-04-10',
    status: 'pending',
    expectedROI: '6个月回本，年创收¥780万',
    factors: [
      { name: '技术成熟度', score: 92, trend: 'up' },
      { name: '产能提升', score: 88, trend: 'up' },
      { name: '实施风险', score: 80, trend: 'stable' },
      { name: '人员适配', score: 75, trend: 'stable' },
      { name: '资金回报', score: 90, trend: 'up' },
    ],
  },
];

const DECISION_HISTORY = [
  {
    id: 'H-001',
    title: '印尼铜矿直采通道开通',
    result: 'approved',
    date: '2026-02-28',
    aiAccuracy: 94,
    actualROI: '+22.3%',
  },
  {
    id: 'H-002',
    title: 'Q1废钢库存对冲策略',
    result: 'approved',
    date: '2026-01-15',
    aiAccuracy: 88,
    actualROI: '+15.7%',
  },
  {
    id: 'H-003',
    title: '华南仓储扩建方案',
    result: 'deferred',
    date: '2026-02-10',
    aiAccuracy: 76,
    actualROI: '暂缓评估',
  },
  {
    id: 'H-004',
    title: '韩国客户大额授信提升',
    result: 'approved',
    date: '2026-01-22',
    aiAccuracy: 91,
    actualROI: '+8.5%',
  },
  {
    id: 'H-005',
    title: '废铝期货套保方案',
    result: 'rejected',
    date: '2026-02-05',
    aiAccuracy: 67,
    actualROI: '规避损失¥85万',
  },
  {
    id: 'H-006',
    title: '新能源拆解产线投资',
    result: 'approved',
    date: '2026-01-08',
    aiAccuracy: 93,
    actualROI: '实施中（+18%）',
  },
];

const AI_ACCURACY_TREND = [
  { month: '10月', accuracy: 82 },
  { month: '11月', accuracy: 85 },
  { month: '12月', accuracy: 84 },
  { month: '1月', accuracy: 88 },
  { month: '2月', accuracy: 87 },
  { month: '3月', accuracy: 91 },
];

const DECISION_TYPE_PIE = [
  { name: '采购决策', value: 32, color: '#3b82f6' },
  { name: '销售策略', value: 25, color: '#22c55e' },
  { name: '风险管控', value: 20, color: '#ef4444' },
  { name: '投资评估', value: 15, color: '#f59e0b' },
  { name: '运营优化', value: 8, color: '#8b5cf6' },
];

const SCENARIO_DATA = [
  { scenario: '乐观', revenue: 9800, cost: 7200, profit: 2600 },
  { scenario: '基准', revenue: 8500, cost: 6800, profit: 1700 },
  { scenario: '保守', revenue: 7200, cost: 6500, profit: 700 },
  { scenario: '悲观', revenue: 6100, cost: 6200, profit: -100 },
];

export function SmartDecision({ currentLanguage }: SmartDecisionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('center');
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);
  const isZh = currentLanguage === 'zh';

  // AI pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((p) => (p + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'center' as TabType, label: { en: 'Decision Center', zh: '决策中心' }, icon: Brain },
    { id: 'analysis' as TabType, label: { en: 'Factor Analysis', zh: '因子分析' }, icon: Layers },
    { id: 'scenarios' as TabType, label: { en: 'Scenario Sim', zh: '情景模拟' }, icon: GitBranch },
    { id: 'history' as TabType, label: { en: 'History', zh: '决策历史' }, icon: Clock },
  ];

  const urgencyConf = {
    critical: {
      label: isZh ? '紧急' : 'Critical',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
    },
    high: {
      label: isZh ? '高' : 'High',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/30',
    },
    medium: {
      label: isZh ? '中' : 'Medium',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30',
    },
  };

  const typeConf = {
    procurement: { label: isZh ? '采购' : 'Procurement', icon: '🔗', color: 'text-blue-400' },
    sales: { label: isZh ? '销售' : 'Sales', icon: '💹', color: 'text-green-400' },
    risk: { label: isZh ? '风控' : 'Risk', icon: '🛡️', color: 'text-red-400' },
    investment: { label: isZh ? '投资' : 'Investment', icon: '📈', color: 'text-amber-400' },
    operations: { label: isZh ? '运营' : 'Operations', icon: '⚙️', color: 'text-purple-400' },
  };

  const pendingCount = DECISION_ITEMS.filter((d) => d.status === 'pending').length;
  const avgConfidence = Math.round(
    DECISION_ITEMS.reduce((s, d) => s + d.aiConfidence, 0) / DECISION_ITEMS.length
  );

  // Build radar data from selected decision
  const selectedItem = DECISION_ITEMS.find((d) => d.id === selectedDecision);
  const radarData =
    selectedItem?.factors.map((f) => ({ factor: f.name, score: f.score, fullMark: 100 })) || [];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-purple-500/20">
              <Brain className="w-7 h-7 text-white" />
            </div>
            {/* AI Pulse ring */}
            <div
              className={`absolute -inset-1.5 rounded-2xl border-2 border-purple-400/40 transition-all duration-1000 ${
                pulsePhase === 0 ? 'opacity-60 scale-100' : 'opacity-0 scale-110'
              }`}
            />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能决策' : 'Smart Decision'}</span>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh ? 'AI驱动的智能决策支持系统' : 'AI-powered decision support system'}
            </p>
          </div>
        </div>

        {/* AI Status Indicator */}
        <div className="flex items-center space-x-3 px-4 py-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">AI Engine</span>
          </div>
          <span className="text-sm text-purple-300">
            {isZh ? '模型置信度' : 'Confidence'}: {avgConfidence}%
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '待决策事项' : 'Pending Decisions',
            value: pendingCount.toString(),
            icon: Target,
            gradient: 'from-purple-500 to-pink-500',
            sub: isZh ? '需要您的关注' : 'Need attention',
          },
          {
            label: isZh ? 'AI平均置信度' : 'Avg. AI Confidence',
            value: `${avgConfidence}%`,
            icon: Brain,
            gradient: 'from-blue-500 to-indigo-500',
            sub: '↑3.2% MoM',
          },
          {
            label: isZh ? '历史准确率' : 'Historical Accuracy',
            value: '89.2%',
            icon: ShieldCheck,
            gradient: 'from-emerald-500 to-green-500',
            sub: isZh ? '近90天' : 'Last 90d',
          },
          {
            label: isZh ? '决策影响额' : 'Impact Value',
            value: isZh ? '¥2,860万' : '¥28.6M',
            icon: DollarSign,
            gradient: 'from-amber-500 to-orange-500',
            sub: isZh ? '本季度' : 'This quarter',
          },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 hover:border-purple-500/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-2xl text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}
                >
                  <StatIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Decision Center Tab */}
      {activeTab === 'center' && (
        <div className="space-y-4">
          {DECISION_ITEMS.filter((d) => d.status === 'pending').map((item) => {
            const uc = urgencyConf[item.urgency];
            const tc = typeConf[item.type];
            const isSelected = selectedDecision === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedDecision(isSelected ? null : item.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-purple-500/40 shadow-lg shadow-purple-500/5'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="p-5">
                  {/* Decision Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-xs text-gray-500">{item.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${uc.bg} ${uc.color}`}>
                          {uc.label}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300">
                          {tc.icon} {tc.label}
                        </span>
                      </div>
                      <h4 className="text-white text-lg">{item.title}</h4>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center space-x-1">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span
                          className={`text-lg ${item.aiConfidence >= 90 ? 'text-emerald-400' : item.aiConfidence >= 80 ? 'text-blue-400' : 'text-amber-400'}`}
                        >
                          {item.aiConfidence}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{isZh ? 'AI置信度' : 'AI Confidence'}</p>
                    </div>
                  </div>

                  {/* AI Recommendation Box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/5 border border-purple-500/15 mb-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-purple-400 mb-1">
                          AI {isZh ? '建议' : 'Recommendation'}
                        </p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {item.aiRecommendation}
                        </p>
                        {item.expectedROI && (
                          <p className="text-xs text-emerald-400 mt-2">📊 {item.expectedROI}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Impact & Deadline */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-400">
                          {isZh ? '影响评分' : 'Impact'}:{' '}
                        </span>
                        <span className="text-sm text-white">{item.impactScore}/100</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-400">{isZh ? '截止' : 'Due'}: </span>
                        <span className="text-sm text-white">{item.deadline}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{isZh ? '采纳' : 'Accept'}</span>
                      </button>
                      <button
                        className="flex items-center space-x-1.5 px-4 py-2 bg-red-500/15 text-red-300 rounded-lg border border-red-500/25 hover:bg-red-500/25 transition-all text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>{isZh ? '驳回' : 'Reject'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded: Factor Details */}
                {isSelected && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <p className="text-xs text-gray-500 mb-3">
                      {isZh ? '决策因子分析' : 'Decision Factor Analysis'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      {item.factors.map((factor, fi) => (
                        <div
                          key={fi}
                          className="p-3 rounded-xl bg-slate-900/50 border border-white/5"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">{factor.name}</span>
                            {factor.trend === 'up' ? (
                              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                            ) : factor.trend === 'down' ? (
                              <ArrowDownRight className="w-3 h-3 text-red-400" />
                            ) : (
                              <Activity className="w-3 h-3 text-gray-500" />
                            )}
                          </div>
                          <div className="flex items-end space-x-2">
                            <span
                              className={`text-xl ${factor.score >= 80 ? 'text-emerald-400' : factor.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}
                            >
                              {factor.score}
                            </span>
                            <span className="text-xs text-gray-600 pb-0.5">/100</span>
                          </div>
                          <div className="h-1.5 bg-slate-700/40 rounded-full mt-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${factor.score >= 80 ? 'bg-emerald-500' : factor.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${factor.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Factor Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-2">
                {isZh ? '综合决策因子雷达图' : 'Decision Factor Radar'}
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                {isZh ? '选择一个决策事项查看详细因子' : 'Select a decision to view factors'}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {DECISION_ITEMS.filter((d) => d.status === 'pending').map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDecision(d.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                      selectedDecision === d.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-slate-700/30 text-gray-400 hover:text-white'
                    }`}
                  >
                    {d.title.substring(0, 12)}...
                  </button>
                ))}
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <RadarChart
                    data={
                      radarData.length > 0
                        ? radarData
                        : DECISION_ITEMS[0].factors.map((f) => ({
                            factor: f.name,
                            score: f.score,
                            fullMark: 100,
                          }))
                    }
                  >
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="factor" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: '#64748b', fontSize: 10 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15,23,42,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Decision Type Distribution */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '决策类型分布' : 'Decision Type Distribution'}
              </h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={DECISION_TYPE_PIE}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {DECISION_TYPE_PIE.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
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
                <div className="w-1/2 space-y-3">
                  {DECISION_TYPE_PIE.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Accuracy Trend */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <h4 className="text-white text-sm mb-3">
                  {isZh ? 'AI准确率趋势' : 'AI Accuracy Trend'}
                </h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <AreaChart data={AI_ACCURACY_TREND}>
                      <defs>
                        <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="month"
                        stroke="#64748b"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                      />
                      <YAxis
                        stroke="#64748b"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        domain={[75, 95]}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(15,23,42,0.95)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#a855f7"
                        fill="url(#accuracyGrad)"
                        strokeWidth={2}
                        name={isZh ? '准确率%' : 'Accuracy %'}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Simulation Tab */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-2">
              {isZh ? 'Q2情景模拟分析（万元）' : 'Q2 Scenario Analysis (10K ¥)'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {isZh
                ? 'AI基于多维因子模拟四种市场情景'
                : 'AI simulates 4 market scenarios based on multi-factor analysis'}
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={SCENARIO_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="scenario"
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
                    dataKey="revenue"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name={isZh ? '营收' : 'Revenue'}
                  />
                  <Bar
                    dataKey="cost"
                    fill="#6b7280"
                    radius={[4, 4, 0, 0]}
                    name={isZh ? '成本' : 'Cost'}
                  />
                  <Bar
                    dataKey="profit"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                    name={isZh ? '利润' : 'Profit'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scenario Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SCENARIO_DATA.map((s, idx) => {
              const colors = [
                'from-emerald-500 to-green-500',
                'from-blue-500 to-cyan-500',
                'from-amber-500 to-orange-500',
                'from-red-500 to-pink-500',
              ];
              const probs = [15, 45, 30, 10];
              return (
                <div
                  key={idx}
                  className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
                >
                  <div
                    className={`text-sm bg-gradient-to-r ${colors[idx]} bg-clip-text text-transparent`}
                  >
                    {s.scenario}
                    {isZh ? '情景' : ' Scenario'}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {isZh ? '发生概率' : 'Probability'}: {probs[idx]}%
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">{isZh ? '营收' : 'Revenue'}</span>
                      <span className="text-white">
                        ¥{s.revenue}
                        {isZh ? '万' : '0K'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">{isZh ? '成本' : 'Cost'}</span>
                      <span className="text-white">
                        ¥{s.cost}
                        {isZh ? '万' : '0K'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-white/5 pt-2">
                      <span className="text-gray-500">{isZh ? '利润' : 'Profit'}</span>
                      <span className={s.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {s.profit >= 0 ? '+' : ''}¥{s.profit}
                        {isZh ? '万' : '0K'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Decision History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                {isZh ? '近期决策记录' : 'Recent Decision History'}
              </p>
              <span className="text-xs text-gray-500">
                {isZh ? 'AI平均预测准确率: 89.2%' : 'Avg. AI accuracy: 89.2%'}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs text-gray-500 py-3 px-4">
                      {isZh ? '决策事项' : 'Decision'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? '结果' : 'Result'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? '日期' : 'Date'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? 'AI准确率' : 'AI Accuracy'}
                    </th>
                    <th className="text-center text-xs text-gray-500 py-3 px-4">
                      {isZh ? '实际ROI' : 'Actual ROI'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DECISION_HISTORY.map((h) => {
                    const resultConf = {
                      approved: {
                        label: isZh ? '已采纳' : 'Approved',
                        color: 'text-emerald-400',
                        bg: 'bg-emerald-500/20',
                        icon: CheckCircle2,
                      },
                      rejected: {
                        label: isZh ? '已驳回' : 'Rejected',
                        color: 'text-red-400',
                        bg: 'bg-red-500/20',
                        icon: XCircle,
                      },
                      deferred: {
                        label: isZh ? '暂缓' : 'Deferred',
                        color: 'text-amber-400',
                        bg: 'bg-amber-500/20',
                        icon: Clock,
                      },
                    }[h.result] || {
                      label: h.result,
                      color: 'text-gray-400',
                      bg: 'bg-gray-500/20',
                      icon: Activity,
                    };
                    const ResultIcon = resultConf.icon;
                    return (
                      <tr key={h.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-3 px-4 text-sm text-white">{h.title}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center space-x-1.5 text-xs px-2 py-0.5 rounded-full ${resultConf.bg} ${resultConf.color}`}
                          >
                            <ResultIcon className="w-3 h-3" />
                            <span>{resultConf.label}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-xs text-gray-400">{h.date}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`text-sm ${h.aiAccuracy >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}
                          >
                            {h.aiAccuracy}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-sm text-gray-300">
                          {h.actualROI}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
