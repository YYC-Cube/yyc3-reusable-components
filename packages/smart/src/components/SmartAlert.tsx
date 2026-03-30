import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  BellRing,
  Shield,
  ShieldAlert,
  Zap,
  Brain,
  Target,
  TrendingDown,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Package,
  Users,
  Truck,
  Activity,
  Filter,
  Sparkles,
  Volume2,
  VolumeX,
  BarChart3,
  MapPin,
  Flame,
  Snowflake,
  MessageSquare,
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
  Line,
  AreaChart,
  Area,
} from 'recharts';

interface SmartAlertProps {
  currentLanguage: string;
}

type TabType = 'realtime' | 'rules' | 'analytics' | 'settings';
type AlertLevel = 'critical' | 'warning' | 'info' | 'resolved';
type AlertCategory = 'price' | 'inventory' | 'credit' | 'logistics' | 'compliance' | 'operations';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  category: AlertCategory;
  timestamp: string;
  source: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'silenced';
  aiSuggestion?: string;
  impact?: string;
  relatedData?: { label: string; value: string }[];
}

const ALERT_LEVEL_CONF: Record<
  AlertLevel,
  {
    label: { en: string; zh: string };
    color: string;
    bg: string;
    border: string;
    icon: typeof AlertCircle;
  }
> = {
  critical: {
    label: { en: 'Critical', zh: '严重' },
    color: 'text-red-400',
    bg: 'bg-red-500/15',
    border: 'border-red-500/30',
    icon: ShieldAlert,
  },
  warning: {
    label: { en: 'Warning', zh: '警告' },
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
  },
  info: {
    label: { en: 'Info', zh: '提示' },
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/30',
    icon: AlertCircle,
  },
  resolved: {
    label: { en: 'Resolved', zh: '已解除' },
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    icon: CheckCircle2,
  },
};

const CATEGORY_CONF: Record<
  AlertCategory,
  { label: { en: string; zh: string }; icon: typeof DollarSign; color: string }
> = {
  price: { label: { en: 'Price', zh: '价格' }, icon: TrendingDown, color: 'text-orange-400' },
  inventory: { label: { en: 'Inventory', zh: '库存' }, icon: Package, color: 'text-blue-400' },
  credit: { label: { en: 'Credit', zh: '信用' }, icon: Shield, color: 'text-red-400' },
  logistics: { label: { en: 'Logistics', zh: '物流' }, icon: Truck, color: 'text-purple-400' },
  compliance: {
    label: { en: 'Compliance', zh: '合规' },
    icon: AlertCircle,
    color: 'text-amber-400',
  },
  operations: { label: { en: 'Operations', zh: '运营' }, icon: Activity, color: 'text-cyan-400' },
};

const ALERTS: AlertItem[] = [
  {
    id: 'ALT-001',
    title: '不锈钢304价格异常下跌',
    description:
      '不锈钢304现货价格24小时内下跌3.8%，触发AI价格异动预警阈值（3%）。当前价格¥14,250/吨，较昨日收盘下跌¥560。',
    level: 'critical',
    category: 'price',
    timestamp: '2026-03-13 14:32',
    source: 'AI价格监测引擎',
    status: 'active',
    aiSuggestion:
      '建议立即暂停不锈钢304采购订单，持仓2,800吨中建议减仓1,200吨以控制风险，预计可避免¥168万潜在损失。',
    impact: '持仓敞口风险 ¥3,990万',
    relatedData: [
      { label: '当前持仓', value: '2,800吨' },
      { label: '持仓成本', value: '¥14,810/吨' },
      { label: '浮动亏损', value: '-¥156.8万' },
      { label: 'LME镍价', value: '-4.2%' },
    ],
  },
  {
    id: 'ALT-002',
    title: '废铜库存接近安全线',
    description:
      'T2废铜库存量降至580吨，低于安全库存线600吨，预计3日内将进一步降至520吨。当前在途订单850吨，预计5日后到货。',
    level: 'warning',
    category: 'inventory',
    timestamp: '2026-03-13 11:15',
    source: 'AI库存预警系统',
    status: 'active',
    aiSuggestion:
      '建议启动紧急补货计划，向越南供应商TPC追加200吨紧急订单，同时协调物流优先安排在途850吨提前3日到港。',
    relatedData: [
      { label: '当前库存', value: '580吨' },
      { label: '安全线', value: '600吨' },
      { label: '在途量', value: '850吨' },
      { label: '日均消耗', value: '28吨' },
    ],
  },
  {
    id: 'ALT-003',
    title: '恒丰金属信用评级下调',
    description:
      'AI信用监测系统检测到客户「恒丰金属贸易有限公司」信用评级从A降至B+。近期应收账款¥285万，账龄超60天未回款¥120万。',
    level: 'critical',
    category: 'credit',
    timestamp: '2026-03-13 09:48',
    source: 'AI信用评估引擎',
    status: 'acknowledged',
    aiSuggestion:
      '建议将该客户信用额度从¥500万下调至¥300万，暂停新增赊销订单，安排专人催收逾期¥120万应收款。',
    impact: '应收风险敞口 ¥285万',
    relatedData: [
      { label: '应收余额', value: '¥285万' },
      { label: '逾期金额', value: '¥120万' },
      { label: '信用额度', value: '¥500万' },
      { label: '历史逾期率', value: '18.5%' },
    ],
  },
  {
    id: 'ALT-004',
    title: '天津港仓储容量预警',
    description:
      '天津港仓储使用率达92%，AI预测7日内将达到95%临界值。当前存储量8,280吨，可用容量约720吨。',
    level: 'warning',
    category: 'logistics',
    timestamp: '2026-03-13 08:20',
    source: 'AI仓储监控系统',
    status: 'active',
    aiSuggestion:
      '建议优先调度天津港1,500吨废铜发货至华东加工厂，同时与宁波港协调分流未来入库订单约800吨。',
    relatedData: [
      { label: '使用率', value: '92%' },
      { label: '可用容量', value: '720吨' },
      { label: '待入库', value: '1,200吨' },
    ],
  },
  {
    id: 'ALT-005',
    title: '进口废料环保合规证即将过期',
    description:
      '3份进口废金属环保合规许可证将在15日内到期（许可证编号：ENV-2025-0456、ENV-2025-0457、ENV-2025-0458）。',
    level: 'warning',
    category: 'compliance',
    timestamp: '2026-03-13 07:00',
    source: 'AI合规监控系统',
    status: 'active',
    aiSuggestion:
      '建议立即启动续期流程，预估审批周期10个工作日。同步准备备用进口通道以避免清关延误。',
  },
  {
    id: 'ALT-006',
    title: '分拣线B3效率异常下降',
    description:
      '华东工厂分拣线B3今日分拣效率68%，低于正常值85%。AI分析可能原因：传感器校准偏移（概率72%）、物料混杂度超标（概率28%）。',
    level: 'info',
    category: 'operations',
    timestamp: '2026-03-13 10:45',
    source: 'AI设备监控系统',
    status: 'active',
    aiSuggestion:
      '建议安排设备部于今日16:00后进行传感器重新校准，预估耗时2小时，期间可将B3工单转至B1线处理。',
  },
  {
    id: 'ALT-007',
    title: 'LME铜价突破关键阻力位',
    description:
      'LME铜价突破$9,300/吨关键阻力位，AI模型预测短期内有望冲击$9,500。当前废铜溢价空间扩大。',
    level: 'info',
    category: 'price',
    timestamp: '2026-03-13 06:30',
    source: 'AI价格监测引擎',
    status: 'active',
    aiSuggestion:
      '利好信号。建议加快在手废铜存货1,800吨的销售节奏，利用价格上行窗口期提升毛利率约2.5个百分点。',
  },
  {
    id: 'ALT-008',
    title: '华南暴雨物流影响预警',
    description:
      'AI气象模型预测未来48小时广东地区将出现强降雨，可能影响华南3条运输线路。涉及在途货物约650吨。',
    level: 'warning',
    category: 'logistics',
    timestamp: '2026-03-12 22:00',
    source: 'AI物流风险系统',
    status: 'acknowledged',
    aiSuggestion: '建议提前通知3家承运商调整路线或延期发货，同步通知下游客户可能延迟1-2天交付。',
  },
];

const ALERT_TREND = [
  { date: '03-07', critical: 1, warning: 3, info: 5 },
  { date: '03-08', critical: 0, warning: 4, info: 3 },
  { date: '03-09', critical: 2, warning: 2, info: 4 },
  { date: '03-10', critical: 1, warning: 5, info: 6 },
  { date: '03-11', critical: 0, warning: 3, info: 4 },
  { date: '03-12', critical: 1, warning: 4, info: 5 },
  { date: '03-13', critical: 2, warning: 3, info: 2 },
];

const CATEGORY_PIE = [
  { name: '价格预警', value: 32, color: '#f97316' },
  { name: '库存预警', value: 22, color: '#3b82f6' },
  { name: '信用预警', value: 18, color: '#ef4444' },
  { name: '物流预警', value: 15, color: '#8b5cf6' },
  { name: '合规预警', value: 8, color: '#f59e0b' },
  { name: '运营预警', value: 5, color: '#06b6d4' },
];

interface AlertRule {
  id: string;
  name: string;
  category: AlertCategory;
  condition: string;
  threshold: string;
  enabled: boolean;
  triggerCount: number;
}

const ALERT_RULES: AlertRule[] = [
  {
    id: 'R01',
    name: '金属价格异动',
    category: 'price',
    condition: '24h价格波动',
    threshold: '±3%',
    enabled: true,
    triggerCount: 12,
  },
  {
    id: 'R02',
    name: '库存安全线',
    category: 'inventory',
    condition: '库存低于安全线',
    threshold: '600吨',
    enabled: true,
    triggerCount: 5,
  },
  {
    id: 'R03',
    name: '客户信用变动',
    category: 'credit',
    condition: '信用评级下调',
    threshold: '降1级以上',
    enabled: true,
    triggerCount: 3,
  },
  {
    id: 'R04',
    name: '仓储容量预警',
    category: 'logistics',
    condition: '仓储使用率',
    threshold: '≥90%',
    enabled: true,
    triggerCount: 8,
  },
  {
    id: 'R05',
    name: '证照到期提醒',
    category: 'compliance',
    condition: '到期倒计时',
    threshold: '≤15天',
    enabled: true,
    triggerCount: 4,
  },
  {
    id: 'R06',
    name: '设备效率异常',
    category: 'operations',
    condition: '效率低于标准',
    threshold: '<80%',
    enabled: true,
    triggerCount: 6,
  },
  {
    id: 'R07',
    name: '应收账款逾期',
    category: 'credit',
    condition: '账龄超期',
    threshold: '>60天',
    enabled: true,
    triggerCount: 9,
  },
  {
    id: 'R08',
    name: '汇率波动预警',
    category: 'price',
    condition: '日波动幅度',
    threshold: '±0.5%',
    enabled: false,
    triggerCount: 2,
  },
];

export function SmartAlert({ currentLanguage }: SmartAlertProps) {
  const [activeTab, setActiveTab] = useState<TabType>('realtime');
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<AlertLevel | 'all'>('all');
  const [pulseActive, setPulseActive] = useState(true);
  const isZh = currentLanguage === 'zh';

  // Pulse animation for critical alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive((p) => !p);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'realtime' as TabType, label: { en: 'Real-time', zh: '实时预警' }, icon: BellRing },
    { id: 'rules' as TabType, label: { en: 'Rules', zh: '预警规则' }, icon: Target },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '预警分析' }, icon: BarChart3 },
    { id: 'settings' as TabType, label: { en: 'Config', zh: '配置' }, icon: Filter },
  ];

  const criticalCount = ALERTS.filter(
    (a) => a.level === 'critical' && a.status === 'active'
  ).length;
  const warningCount = ALERTS.filter((a) => a.level === 'warning' && a.status === 'active').length;
  const totalActive = ALERTS.filter(
    (a) => a.status === 'active' || a.status === 'acknowledged'
  ).length;

  const filteredAlerts = ALERTS.filter((a) => filterLevel === 'all' || a.level === filterLevel);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-red-500/20">
              <AlertCircle className="w-7 h-7 text-white" />
            </div>
            {criticalCount > 0 && (
              <>
                <div
                  className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs ${pulseActive ? 'animate-bounce' : ''}`}
                >
                  {criticalCount}
                </div>
                <div className="absolute -inset-2 rounded-2xl border-2 border-red-500/30 animate-ping opacity-20" />
              </>
            )}
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能预警' : 'Smart Alert'}</span>
              <Sparkles className="w-5 h-5 text-red-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh ? 'AI全域风险监测与智能预警' : 'AI-powered risk monitoring & alerting'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-300">
              {criticalCount} {isZh ? '严重' : 'Critical'}
            </span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-xs text-amber-300">
              {warningCount} {isZh ? '警告' : 'Warning'}
            </span>
          </div>
        </div>
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
                  ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
              {tab.id === 'realtime' && totalActive > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500/30 text-red-300 rounded-full text-xs">
                  {totalActive}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Real-time Alerts Tab */}
      {activeTab === 'realtime' && (
        <div className="space-y-4">
          {/* Level Filter */}
          <div className="flex items-center space-x-2">
            {(['all', 'critical', 'warning', 'info'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  filterLevel === level
                    ? level === 'all'
                      ? 'bg-white/10 text-white border border-white/20'
                      : `${ALERT_LEVEL_CONF[level as AlertLevel].bg} ${ALERT_LEVEL_CONF[level as AlertLevel].color} border ${ALERT_LEVEL_CONF[level as AlertLevel].border}`
                    : 'bg-slate-800/30 text-gray-500 hover:text-gray-300'
                }`}
              >
                {level === 'all'
                  ? isZh
                    ? '全部'
                    : 'All'
                  : isZh
                    ? ALERT_LEVEL_CONF[level as AlertLevel].label.zh
                    : ALERT_LEVEL_CONF[level as AlertLevel].label.en}
              </button>
            ))}
          </div>

          {/* Alert Cards */}
          {filteredAlerts.map((alert) => {
            const lc = ALERT_LEVEL_CONF[alert.level];
            const cc = CATEGORY_CONF[alert.category];
            const LevelIcon = lc.icon;
            const CatIcon = cc.icon;
            const isExpanded = expandedAlert === alert.id;

            return (
              <div
                key={alert.id}
                onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${
                  isExpanded
                    ? `${lc.border} shadow-lg`
                    : alert.level === 'critical' && alert.status === 'active'
                      ? `${lc.border}`
                      : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl ${lc.bg} flex items-center justify-center flex-shrink-0 ${
                          alert.level === 'critical' && alert.status === 'active'
                            ? 'animate-pulse'
                            : ''
                        }`}
                      >
                        <LevelIcon className={`w-5 h-5 ${lc.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${lc.bg} ${lc.color}`}>
                            {isZh ? lc.label.zh : lc.label.en}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full bg-slate-700/50 ${cc.color}`}
                          >
                            {isZh ? cc.label.zh : cc.label.en}
                          </span>
                          {alert.status === 'acknowledged' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                              {isZh ? '已确认' : 'Ack'}
                            </span>
                          )}
                        </div>
                        <h4 className="text-white mt-1">{alert.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {alert.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-xs text-gray-500">{alert.timestamp}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{alert.source}</p>
                    </div>
                  </div>

                  {alert.impact && (
                    <div className="flex items-center space-x-2 mt-2">
                      <DollarSign className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-xs text-red-300">{alert.impact}</span>
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                    {/* AI Suggestion */}
                    {alert.aiSuggestion && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/5 border border-red-500/15">
                        <div className="flex items-start space-x-3">
                          <Brain className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-red-400 mb-1">
                              AI {isZh ? '应对建议' : 'Recommendation'}
                            </p>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {alert.aiSuggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Related Data */}
                    {alert.relatedData && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {alert.relatedData.map((rd, ri) => (
                          <div
                            key={ri}
                            className="p-3 rounded-xl bg-slate-900/40 border border-white/5"
                          >
                            <p className="text-xs text-gray-500">{rd.label}</p>
                            <p className="text-sm text-white mt-0.5">{rd.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {alert.status === 'active' && (
                      <div className="flex space-x-2">
                        <button
                          className="flex items-center space-x-1.5 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-4 h-4" />
                          <span>{isZh ? '确认' : 'Acknowledge'}</span>
                        </button>
                        <button
                          className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isZh ? '解除' : 'Resolve'}</span>
                        </button>
                        <button
                          className="flex items-center space-x-1.5 px-4 py-2 bg-slate-700/30 text-gray-400 rounded-lg border border-white/10 hover:bg-slate-700/50 transition-all text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <VolumeX className="w-4 h-4" />
                          <span>{isZh ? '静默' : 'Silence'}</span>
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

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">
              {isZh ? `共 ${ALERT_RULES.length} 条预警规则` : `${ALERT_RULES.length} alert rules`}
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-all text-sm">
              <Zap className="w-4 h-4" />
              <span>{isZh ? '新建规则' : 'New Rule'}</span>
            </button>
          </div>

          {ALERT_RULES.map((rule) => {
            const cc = CATEGORY_CONF[rule.category];
            const CatIcon = cc.icon;
            return (
              <div
                key={rule.id}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center`}
                    >
                      <CatIcon className={`w-5 h-5 ${cc.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white">{rule.name}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full bg-slate-700/50 ${cc.color}`}
                        >
                          {isZh ? cc.label.zh : cc.label.en}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isZh ? '条件' : 'Condition'}: {rule.condition} |{' '}
                        {isZh ? '阈值' : 'Threshold'}: {rule.threshold}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {isZh ? '近30天触发' : '30d triggers'}
                      </p>
                      <p className="text-sm text-white">
                        {rule.triggerCount}
                        {isZh ? '次' : 'x'}
                      </p>
                    </div>
                    <button
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        rule.enabled ? 'bg-emerald-500/60' : 'bg-slate-600/40'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-lg ${
                          rule.enabled ? 'left-6' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '近7天预警趋势' : '7-Day Alert Trend'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={ALERT_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="date"
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
                      dataKey="critical"
                      stackId="a"
                      fill="#ef4444"
                      name={isZh ? '严重' : 'Critical'}
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="warning"
                      stackId="a"
                      fill="#f59e0b"
                      name={isZh ? '警告' : 'Warning'}
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="info"
                      stackId="a"
                      fill="#3b82f6"
                      name={isZh ? '提示' : 'Info'}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">
                {isZh ? '预警类型分布' : 'Alert Category Distribution'}
              </h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={CATEGORY_PIE}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {CATEGORY_PIE.map((entry, i) => (
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
                  {CATEGORY_PIE.map((item, idx) => (
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
            </div>
          </div>

          {/* Analytics KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '平均响应时间' : 'Avg. Response'}
                </span>
              </div>
              <p className="text-2xl text-white">
                18<span className="text-lg text-gray-500">{isZh ? '分钟' : 'min'}</span>
              </p>
              <p className="text-xs text-emerald-400 mt-1">
                -35% {isZh ? '较上月' : 'vs last month'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? 'AI预判准确率' : 'AI Prediction Acc.'}
                </span>
              </div>
              <p className="text-2xl text-white">91.5%</p>
              <p className="text-xs text-emerald-400 mt-1">
                +4.2% {isZh ? '较上月' : 'vs last month'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">{isZh ? '避免损失' : 'Loss Avoided'}</span>
              </div>
              <p className="text-2xl text-white">
                ¥485<span className="text-lg text-gray-500">{isZh ? '万' : '0K'}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{isZh ? '本季度' : 'This quarter'}</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">{isZh ? '解除率' : 'Resolution Rate'}</span>
              </div>
              <p className="text-2xl text-white">87.3%</p>
              <p className="text-xs text-gray-500 mt-1">{isZh ? '24h内' : 'Within 24h'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <h3 className="text-white mb-4">{isZh ? '预警通知渠道' : 'Notification Channels'}</h3>
            <div className="space-y-4">
              {[
                { channel: isZh ? '系统消息推送' : 'System Push', enabled: true, icon: Bell },
                {
                  channel: isZh ? '企业微信通知' : 'WeCom Notification',
                  enabled: true,
                  icon: MessageSquare,
                },
                {
                  channel: isZh ? '短信通知（严重级）' : 'SMS (Critical only)',
                  enabled: true,
                  icon: Volume2,
                },
                {
                  channel: isZh ? '邮件报告（每日）' : 'Email Digest (Daily)',
                  enabled: false,
                  icon: ArrowUpRight,
                },
              ].map((ch, idx) => {
                const ChIcon = ch.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-white/5"
                  >
                    <div className="flex items-center space-x-3">
                      <ChIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-white text-sm">{ch.channel}</span>
                    </div>
                    <button
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        ch.enabled ? 'bg-emerald-500/60' : 'bg-slate-600/40'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-lg ${
                          ch.enabled ? 'left-6' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Sensitivity */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <h3 className="text-white mb-4">{isZh ? 'AI预警灵敏度' : 'AI Alert Sensitivity'}</h3>
            <div className="space-y-4">
              {[
                { name: isZh ? '价格波动灵敏度' : 'Price Sensitivity', value: 75 },
                { name: isZh ? '信用风险灵敏度' : 'Credit Risk Sensitivity', value: 85 },
                { name: isZh ? '物流风险灵敏度' : 'Logistics Sensitivity', value: 60 },
                { name: isZh ? '合规预警灵敏度' : 'Compliance Sensitivity', value: 90 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300 w-40">{item.name}</span>
                  <div className="flex-1 h-2 bg-slate-700/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-sm text-white w-12 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
