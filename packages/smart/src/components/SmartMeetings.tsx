import React, { useState } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Search,
  Brain,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  MessageSquare,
  Share2,
  Download,
  Eye,
  BarChart3,
  Layers,
  Star,
  ChevronRight,
  Play,
  Target,
  Zap,
  BookOpen,
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
} from 'recharts';

interface SmartMeetingsProps {
  currentLanguage: string;
}

type TabType = 'upcoming' | 'history' | 'minutes' | 'analytics';

interface Meeting {
  id: string;
  title: string;
  type: 'regular' | 'urgent' | 'review' | 'training' | 'client';
  date: string;
  time: string;
  duration: string;
  location: 'online' | 'offline' | 'hybrid';
  room?: string;
  organizer: string;
  participants: { name: string; avatar?: string; role: string; confirmed: boolean }[];
  agenda: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  aiFeatures?: string[];
  aiSummary?: string;
  actionItems?: { task: string; assignee: string; deadline: string; status: 'pending' | 'done' }[];
}

const MEETINGS: Meeting[] = [
  {
    id: 'MTG-001',
    title: 'Q2废铜采购战略讨论会',
    type: 'regular',
    date: '2026-03-13',
    time: '14:00-15:30',
    duration: '1.5h',
    location: 'hybrid',
    room: '会议室A-301',
    organizer: '张总',
    participants: [
      { name: '张总', role: '主持', confirmed: true },
      { name: '李采购经理', role: '汇报', confirmed: true },
      { name: '王财务总监', role: '参与', confirmed: true },
      { name: '赵供应链VP', role: '参与', confirmed: true },
      { name: '陈法务', role: '参与', confirmed: false },
    ],
    agenda: [
      'Q1采购总结与数据回顾（15min）',
      '越南供应商战略合作进展（20min）',
      'Q2铜价走势分析与采购策略（25min）',
      '预算审批与资源分配（15min）',
      '行动计划与责任分工（15min）',
    ],
    status: 'scheduled',
    aiFeatures: ['AI实时速记', 'AI议题摘要', 'AI待办提取'],
  },
  {
    id: 'MTG-002',
    title: '客户恒丰金属信用评审',
    type: 'urgent',
    date: '2026-03-13',
    time: '16:00-16:45',
    duration: '45min',
    location: 'online',
    organizer: '风控部',
    participants: [
      { name: '风控经理', role: '主持', confirmed: true },
      { name: '销售总监', role: '汇报', confirmed: true },
      { name: '财务经理', role: '参与', confirmed: true },
    ],
    agenda: [
      '恒丰金属信用评级下调说明',
      '应收账款风险敞口分析',
      '信用额度调整方案讨论',
      '后续催收计划',
    ],
    status: 'scheduled',
    aiFeatures: ['AI风险分析', 'AI纪要生成'],
  },
  {
    id: 'MTG-003',
    title: '每周业务例会',
    type: 'regular',
    date: '2026-03-14',
    time: '09:00-10:00',
    duration: '1h',
    location: 'hybrid',
    room: '大会议室B-201',
    organizer: '运营部',
    participants: [
      { name: '运营总监', role: '主持', confirmed: true },
      { name: '销售部', role: '汇报', confirmed: true },
      { name: '采购部', role: '汇报', confirmed: true },
      { name: '物流部', role: '汇报', confirmed: true },
      { name: '仓储部', role: '汇报', confirmed: false },
    ],
    agenda: ['上周业绩数据回顾', '各部门工作进展汇报', '本周重点任务安排', '跨部门协调事项'],
    status: 'scheduled',
    aiFeatures: ['AI数据看板', 'AI纪要', 'AI待办跟踪'],
  },
  {
    id: 'MTG-004',
    title: '华东新产线技改方案评审',
    type: 'review',
    date: '2026-03-15',
    time: '14:00-16:00',
    duration: '2h',
    location: 'offline',
    room: '技术评审厅C-101',
    organizer: '技术部',
    participants: [
      { name: '技术总监', role: '主持', confirmed: true },
      { name: '生产经理', role: '汇报', confirmed: true },
      { name: '设备主管', role: '参与', confirmed: true },
      { name: '外部专家', role: '评审', confirmed: true },
    ],
    agenda: [
      '分拣线B3现状分析',
      'AI视觉升级方案介绍',
      '投入产出预估与ROI分析',
      '技术风险评估',
      '评审结论与下一步计划',
    ],
    status: 'scheduled',
    aiFeatures: ['AI方案对比', 'AI风险评估'],
  },
];

const PAST_MEETINGS: Meeting[] = [
  {
    id: 'MTG-P01',
    title: 'Q1业绩总结会',
    type: 'review',
    date: '2026-03-10',
    time: '09:00-11:00',
    duration: '2h',
    location: 'hybrid',
    organizer: '张总',
    participants: [
      { name: '张总', role: '主持', confirmed: true },
      { name: '全体管理层', role: '参与', confirmed: true },
    ],
    agenda: [],
    status: 'completed',
    aiSummary:
      'Q1整体营收达成率108%，废铜业务同比增长22%，废铝增长15%。利润率较Q4提升1.8个百分点。重点关注：不锈钢库存周转率需改善，华南物流成本超预算8%。',
    actionItems: [
      {
        task: '制定不锈钢库存优化方案',
        assignee: '仓储部',
        deadline: '2026-03-20',
        status: 'pending',
      },
      {
        task: '华南物流成本专项审计',
        assignee: '财务部',
        deadline: '2026-03-25',
        status: 'pending',
      },
      { task: 'Q2销售目标分解到人', assignee: '销售部', deadline: '2026-03-15', status: 'done' },
    ],
  },
  {
    id: 'MTG-P02',
    title: '越南供应商洽谈',
    type: 'client',
    date: '2026-03-07',
    time: '10:00-11:30',
    duration: '1.5h',
    location: 'online',
    organizer: '采购部',
    participants: [
      { name: '采购经理', role: '主持', confirmed: true },
      { name: 'TPC代表', role: '参与', confirmed: true },
    ],
    agenda: [],
    status: 'completed',
    aiSummary:
      '与越南TPC达成初步合作意向：Q2供货量800吨/月，价格锁定机制采用LME月均价+加工费模式，首批交付预计4月中旬。需跟进合同细节和品质标准确认。',
    actionItems: [
      { task: '起草合作框架协议', assignee: '法务部', deadline: '2026-03-15', status: 'done' },
      { task: '确认品质检验标准', assignee: '质检部', deadline: '2026-03-12', status: 'done' },
    ],
  },
];

const MEETING_STATS_WEEKLY = [
  { week: 'W1', meetings: 12, duration: 18, actionItems: 28 },
  { week: 'W2', meetings: 15, duration: 22, actionItems: 35 },
  { week: 'W3', meetings: 10, duration: 14, actionItems: 22 },
  { week: 'W4', meetings: 13, duration: 19, actionItems: 31 },
];

const TYPE_PIE = [
  { name: '业务例会', value: 35, color: '#3b82f6' },
  { name: '评审会议', value: 22, color: '#8b5cf6' },
  { name: '客户会议', value: 20, color: '#22c55e' },
  { name: '紧急会议', value: 13, color: '#ef4444' },
  { name: '培训会议', value: 10, color: '#f59e0b' },
];

export function SmartMeetings({ currentLanguage }: SmartMeetingsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(null);
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'upcoming' as TabType, label: { en: 'Upcoming', zh: '即将召开' }, icon: Calendar },
    { id: 'history' as TabType, label: { en: 'History', zh: '历史会议' }, icon: Clock },
    { id: 'minutes' as TabType, label: { en: 'AI Minutes', zh: 'AI纪要' }, icon: FileText },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '会议分析' }, icon: BarChart3 },
  ];

  const meetingTypeConf: Record<string, { label: string; color: string; bg: string }> = {
    regular: { label: isZh ? '例会' : 'Regular', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    urgent: { label: isZh ? '紧急' : 'Urgent', color: 'text-red-400', bg: 'bg-red-500/20' },
    review: { label: isZh ? '评审' : 'Review', color: 'text-purple-400', bg: 'bg-purple-500/20' },
    training: { label: isZh ? '培训' : 'Training', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    client: { label: isZh ? '客户' : 'Client', color: 'text-green-400', bg: 'bg-green-500/20' },
  };

  const locationConf: Record<string, { label: string; icon: typeof Video }> = {
    online: { label: isZh ? '线上' : 'Online', icon: Video },
    offline: { label: isZh ? '线下' : 'Onsite', icon: MapPin },
    hybrid: { label: isZh ? '混合' : 'Hybrid', icon: Share2 },
  };

  const todayMeetings = MEETINGS.filter((m) => m.date === '2026-03-13').length;
  const totalParticipants = MEETINGS.reduce((s, m) => s + m.participants.length, 0);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20">
            <Video className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能会议' : 'Smart Meetings'}</span>
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh ? 'AI驱动的智能会议管理与纪要生成' : 'AI-powered meeting management & minutes'}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 rounded-xl border border-blue-500/30 hover:from-blue-500/30 hover:to-indigo-500/30 transition-all text-sm">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '预约会议' : 'Schedule Meeting'}</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '今日会议' : 'Today',
            value: todayMeetings.toString(),
            icon: Calendar,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '2个即将开始' : '2 starting soon',
          },
          {
            label: isZh ? '本周参会人次' : 'Participants(W)',
            value: totalParticipants.toString(),
            icon: Users,
            gradient: 'from-purple-500 to-pink-500',
            sub: isZh ? '跨5个部门' : 'Across 5 depts',
          },
          {
            label: isZh ? 'AI纪要生成' : 'AI Minutes',
            value: '48',
            icon: FileText,
            gradient: 'from-emerald-500 to-green-500',
            sub: isZh ? '本月自动生成' : 'Auto-generated',
          },
          {
            label: isZh ? '待办完成率' : 'Action Rate',
            value: '82%',
            icon: CheckCircle2,
            gradient: 'from-amber-500 to-orange-500',
            sub: '+12% MoM',
          },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 hover:border-blue-500/20 transition-all"
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
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Upcoming Tab */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {MEETINGS.map((meeting) => {
            const tc = meetingTypeConf[meeting.type];
            const lc = locationConf[meeting.location];
            const LocIcon = lc.icon;
            const isExpanded = expandedMeeting === meeting.id;
            const confirmedCount = meeting.participants.filter((p) => p.confirmed).length;

            return (
              <div
                key={meeting.id}
                onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${
                  isExpanded
                    ? 'border-blue-500/30 shadow-lg shadow-blue-500/5'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>
                          {tc.label}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300">
                          <LocIcon className="w-3 h-3 inline mr-1" />
                          {lc.label}
                        </span>
                        {meeting.type === 'urgent' && (
                          <span className="text-xs text-red-400 animate-pulse">
                            ● {isZh ? '紧急' : 'URGENT'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-white text-lg">{meeting.title}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{meeting.time}</p>
                      <p className="text-xs text-gray-500">
                        {meeting.date} · {meeting.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs text-gray-500">
                    <span>
                      <Users className="w-3 h-3 inline mr-1" />
                      {confirmedCount}/{meeting.participants.length} {isZh ? '已确认' : 'confirmed'}
                    </span>
                    <span>
                      {isZh ? '组织者' : 'Organizer'}:{' '}
                      <span className="text-gray-300">{meeting.organizer}</span>
                    </span>
                    {meeting.room && (
                      <span>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {meeting.room}
                      </span>
                    )}
                  </div>

                  {meeting.aiFeatures && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {meeting.aiFeatures.map((f, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                        >
                          <Brain className="w-3 h-3 inline mr-1" />
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                    {/* Agenda */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">{isZh ? '会议议程' : 'Agenda'}</p>
                      <div className="space-y-2">
                        {meeting.agenda.map((item, ai) => (
                          <div
                            key={ai}
                            className="flex items-start space-x-3 p-2 rounded-lg bg-slate-900/30"
                          >
                            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center flex-shrink-0">
                              {ai + 1}
                            </span>
                            <span className="text-sm text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Participants */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        {isZh ? '参会人员' : 'Participants'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {meeting.participants.map((p, pi) => (
                          <div
                            key={pi}
                            className={`px-3 py-1.5 rounded-lg text-xs border ${
                              p.confirmed
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                : 'bg-slate-800/50 border-white/5 text-gray-400'
                            }`}
                          >
                            {p.name} <span className="text-gray-500">({p.role})</span>
                            {p.confirmed ? (
                              <CheckCircle2 className="w-3 h-3 inline ml-1" />
                            ) : (
                              <Clock className="w-3 h-3 inline ml-1" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        className="flex items-center space-x-1.5 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Video className="w-4 h-4" />
                        <span>{isZh ? '加入会议' : 'Join'}</span>
                      </button>
                      <button
                        className="flex items-center space-x-1.5 px-4 py-2 bg-slate-700/30 text-gray-300 rounded-lg border border-white/10 hover:bg-slate-700/50 transition-all text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>{isZh ? '分享' : 'Share'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {PAST_MEETINGS.map((meeting) => {
            const tc = meetingTypeConf[meeting.type];
            const isExpanded = expandedMeeting === meeting.id;
            return (
              <div
                key={meeting.id}
                onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${
                  isExpanded ? 'border-blue-500/30' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>
                          {tc.label}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          {isZh ? '已完成' : 'Done'}
                        </span>
                      </div>
                      <h4 className="text-white">{meeting.title}</h4>
                    </div>
                    <span className="text-xs text-gray-500">
                      {meeting.date} · {meeting.time}
                    </span>
                  </div>
                  {meeting.aiSummary && (
                    <p className="text-xs text-gray-400 line-clamp-2 mt-2">{meeting.aiSummary}</p>
                  )}
                </div>

                {isExpanded && meeting.aiSummary && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/5 border border-blue-500/15">
                      <div className="flex items-start space-x-3">
                        <Brain className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-blue-400 mb-1">
                            AI {isZh ? '会议摘要' : 'Meeting Summary'}
                          </p>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {meeting.aiSummary}
                          </p>
                        </div>
                      </div>
                    </div>

                    {meeting.actionItems && meeting.actionItems.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">
                          AI {isZh ? '提取待办' : 'Extracted Actions'}
                        </p>
                        <div className="space-y-2">
                          {meeting.actionItems.map((ai, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5"
                            >
                              <div className="flex items-center space-x-3">
                                {ai.status === 'done' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Clock className="w-4 h-4 text-amber-400" />
                                )}
                                <div>
                                  <p className="text-sm text-white">{ai.task}</p>
                                  <p className="text-xs text-gray-500">
                                    {ai.assignee} · {isZh ? '截止' : 'Due'}: {ai.deadline}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  ai.status === 'done'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-amber-500/20 text-amber-400'
                                }`}
                              >
                                {ai.status === 'done'
                                  ? isZh
                                    ? '已完成'
                                    : 'Done'
                                  : isZh
                                    ? '待处理'
                                    : 'Pending'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* AI Minutes Tab */}
      {activeTab === 'minutes' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span>{isZh ? 'AI会议纪要引擎' : 'AI Minutes Engine'}</span>
              </h3>
              <span className="text-xs text-gray-500">
                {isZh
                  ? '支持语音识别、意图提取、待办生成'
                  : 'Speech recognition, intent extraction, action generation'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  label: isZh ? '语音转文字准确率' : 'Speech-to-Text Acc.',
                  value: '96.8%',
                  icon: Mic,
                  color: 'text-blue-400',
                },
                {
                  label: isZh ? '关键议题提取率' : 'Topic Extraction',
                  value: '93.2%',
                  icon: Target,
                  color: 'text-purple-400',
                },
                {
                  label: isZh ? '待办自动提取率' : 'Action Extraction',
                  value: '89.5%',
                  icon: Zap,
                  color: 'text-amber-400',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs text-gray-500">{item.label}</span>
                    </div>
                    <p className="text-2xl text-white">{item.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Sample AI Minutes */}
            <div className="p-5 rounded-xl bg-slate-900/30 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white text-sm">Q1业绩总结会 - AI纪要</h4>
                  <p className="text-xs text-gray-500">2026-03-10 · 自动生成</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-slate-700/30 text-gray-300 rounded-lg border border-white/10 text-xs hover:bg-slate-700/50">
                    <Download className="w-3 h-3 inline mr-1" />
                    {isZh ? '导出' : 'Export'}
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <p className="text-xs text-blue-400 mb-1">
                    {isZh ? '核心结论' : 'Key Conclusions'}
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>Q1营收达成率108%，废铜业务同比增长22%</li>
                    <li>利润率较Q4提升1.8个百分点</li>
                    <li>不锈钢库存周转率需重点改善</li>
                    <li>华南物流成本超预算8%，需专项审计</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-amber-400 mb-1">
                    {isZh ? '待办事项（AI自动提取）' : 'Action Items (AI extracted)'}
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>仓储部：制定不锈钢库存优化方案（3/20前）</li>
                    <li>财务部：华南物流成本专项审计（3/25前）</li>
                    <li>销售部：Q2销售目标分解到人（3/15前）✅</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '周度会议统计' : 'Weekly Meeting Stats'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={MEETING_STATS_WEEKLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="week"
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
                      dataKey="meetings"
                      fill="#3b82f6"
                      name={isZh ? '会议数' : 'Meetings'}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="actionItems"
                      fill="#22c55e"
                      name={isZh ? '待办数' : 'Actions'}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '会议类型分布' : 'Meeting Types'}</h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={TYPE_PIE}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {TYPE_PIE.map((entry, i) => (
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
                  {TYPE_PIE.map((item, idx) => (
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

          {/* AI Meeting Efficiency */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <span>{isZh ? 'AI会议效率分析' : 'AI Meeting Efficiency'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  label: isZh ? '人均会议时长/周' : 'Avg. Hours/Week',
                  value: isZh ? '4.2小时' : '4.2h',
                  change: '-18%',
                  good: true,
                },
                {
                  label: isZh ? '会议准时开始率' : 'On-time Start',
                  value: '87%',
                  change: '+5%',
                  good: true,
                },
                {
                  label: isZh ? '超时会议占比' : 'Overtime Rate',
                  value: '15%',
                  change: '-8%',
                  good: true,
                },
                {
                  label: isZh ? '无议程会议占比' : 'No Agenda Rate',
                  value: '8%',
                  change: '-12%',
                  good: true,
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <p className="text-xs text-gray-500 mb-2">{item.label}</p>
                  <p className="text-xl text-white">{item.value}</p>
                  <p className={`text-xs mt-1 ${item.good ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.change} MoM
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
