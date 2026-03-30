import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Filter,
  Plus,
  Eye,
  Star,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Calendar,
  Users,
  BarChart3,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Target,
  FileText,
  Building2,
  GraduationCap,
  MessageSquare,
  Award,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

interface SmartRecruitmentProps {
  currentLanguage: string;
}

type TabType = 'positions' | 'candidates' | 'pipeline' | 'analytics';
type PositionStatus = 'open' | 'interviewing' | 'offer' | 'filled' | 'cancelled';
type CandidateStage =
  | 'screening'
  | 'interview-1'
  | 'interview-2'
  | 'assessment'
  | 'offer'
  | 'hired'
  | 'rejected';

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  urgency: 'high' | 'medium' | 'low';
  status: PositionStatus;
  applicants: number;
  publishDate: string;
  headcount: number;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  stage: CandidateStage;
  experience: string;
  education: string;
  source: string;
  applyDate: string;
  rating: number;
  interviewer?: string;
  interviewDate?: string;
  notes?: string;
}

const POSITIONS: Position[] = [
  {
    id: 'JOB-001',
    title: '高级废金属贸易专员',
    department: '销售部',
    location: '上海',
    type: '全职',
    salary: '20-35K',
    urgency: 'high',
    status: 'open',
    applicants: 28,
    publishDate: '2026-02-15',
    headcount: 2,
  },
  {
    id: 'JOB-002',
    title: '供应链管理经理',
    department: '采购部',
    location: '上海',
    type: '全职',
    salary: '30-45K',
    urgency: 'high',
    status: 'interviewing',
    applicants: 15,
    publishDate: '2026-02-20',
    headcount: 1,
  },
  {
    id: 'JOB-003',
    title: '质检工程师',
    department: '生产部',
    location: '天津',
    type: '全职',
    salary: '15-22K',
    urgency: 'medium',
    status: 'open',
    applicants: 42,
    publishDate: '2026-03-01',
    headcount: 3,
  },
  {
    id: 'JOB-004',
    title: 'ERP实施顾问',
    department: 'IT部门',
    location: '上海',
    type: '全职',
    salary: '25-40K',
    urgency: 'medium',
    status: 'offer',
    applicants: 12,
    publishDate: '2026-02-10',
    headcount: 1,
  },
  {
    id: 'JOB-005',
    title: '物流调度主管',
    department: '物流部',
    location: '天津港',
    type: '全职',
    salary: '18-28K',
    urgency: 'high',
    status: 'interviewing',
    applicants: 8,
    publishDate: '2026-03-05',
    headcount: 1,
  },
  {
    id: 'JOB-006',
    title: '财务分析师',
    department: '财务部',
    location: '上海',
    type: '全职',
    salary: '18-30K',
    urgency: 'low',
    status: 'open',
    applicants: 35,
    publishDate: '2026-03-08',
    headcount: 1,
  },
  {
    id: 'JOB-007',
    title: '仓库管理员',
    department: '物流部',
    location: '宁波',
    type: '全职',
    salary: '8-12K',
    urgency: 'medium',
    status: 'open',
    applicants: 56,
    publishDate: '2026-03-01',
    headcount: 5,
  },
  {
    id: 'JOB-008',
    title: '国际贸易专员（东南亚）',
    department: '销售部',
    location: '上海',
    type: '全职',
    salary: '15-25K',
    urgency: 'medium',
    status: 'filled',
    applicants: 22,
    publishDate: '2026-01-20',
    headcount: 1,
  },
];

const CANDIDATES: Candidate[] = [
  {
    id: 'C001',
    name: '徐志远',
    position: '供应链管理经理',
    stage: 'interview-2',
    experience: '8年',
    education: '复旦MBA',
    source: '猎头推荐',
    applyDate: '2026-02-25',
    rating: 4.5,
    interviewer: '赵总监',
    interviewDate: '2026-03-15',
  },
  {
    id: 'C002',
    name: '何雪梅',
    position: '高级废金属贸易专员',
    stage: 'interview-1',
    experience: '5年',
    education: '国际贸易本科',
    source: 'Boss直聘',
    applyDate: '2026-03-02',
    rating: 4.0,
    interviewer: '王经理',
    interviewDate: '2026-03-14',
  },
  {
    id: 'C003',
    name: '马天宇',
    position: 'ERP实施顾问',
    stage: 'offer',
    experience: '6年',
    education: '计算机硕士',
    source: '内部推荐',
    applyDate: '2026-02-18',
    rating: 4.8,
    notes: '已发Offer，待回复',
  },
  {
    id: 'C004',
    name: '宋晓丽',
    position: '高级废金属贸易专员',
    stage: 'screening',
    experience: '3年',
    education: '商务英语本科',
    source: '前程无忧',
    applyDate: '2026-03-10',
    rating: 3.5,
  },
  {
    id: 'C005',
    name: '杨建国',
    position: '质检工程师',
    stage: 'interview-1',
    experience: '10年',
    education: '冶金工程本科',
    source: '智联招聘',
    applyDate: '2026-03-05',
    rating: 4.2,
    interviewer: '王主任',
    interviewDate: '2026-03-16',
  },
  {
    id: 'C006',
    name: '李文博',
    position: '物流调度主管',
    stage: 'assessment',
    experience: '7年',
    education: '物流管理本科',
    source: '猎头推荐',
    applyDate: '2026-03-08',
    rating: 4.0,
  },
  {
    id: 'C007',
    name: '陈思思',
    position: '财务分析师',
    stage: 'screening',
    experience: '4年',
    education: '会计学硕士',
    source: '校招',
    applyDate: '2026-03-11',
    rating: 3.8,
  },
  {
    id: 'C008',
    name: '张海洋',
    position: '国际贸易专员（东南亚）',
    stage: 'hired',
    experience: '5年',
    education: '印尼语本科',
    source: '猎头推荐',
    applyDate: '2026-01-28',
    rating: 4.5,
    notes: '已入职',
  },
  {
    id: 'C009',
    name: '刘芳',
    position: '质检工程师',
    stage: 'rejected',
    experience: '2年',
    education: '化学工程本科',
    source: '校招',
    applyDate: '2026-03-03',
    rating: 2.8,
    notes: '经验不足',
  },
];

const STAGE_CONFIG: Record<
  CandidateStage,
  { label: { en: string; zh: string }; color: string; bg: string }
> = {
  screening: {
    label: { en: 'Screening', zh: '简历筛选' },
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
  },
  'interview-1': {
    label: { en: '1st Interview', zh: '初面' },
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
  },
  'interview-2': {
    label: { en: '2nd Interview', zh: '复面' },
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/20',
  },
  assessment: {
    label: { en: 'Assessment', zh: '评估' },
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
  },
  offer: {
    label: { en: 'Offer', zh: '发放Offer' },
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
  },
  hired: {
    label: { en: 'Hired', zh: '已入职' },
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
  },
  rejected: { label: { en: 'Rejected', zh: '已淘汰' }, color: 'text-red-400', bg: 'bg-red-500/20' },
};

const PIPELINE_DATA = [
  { stage: '简历池', count: 218, color: '#64748b' },
  { stage: '筛选通过', count: 86, color: '#3b82f6' },
  { stage: '初面', count: 42, color: '#6366f1' },
  { stage: '复面', count: 18, color: '#8b5cf6' },
  { stage: '评估', count: 8, color: '#a855f7' },
  { stage: 'Offer', count: 5, color: '#f59e0b' },
  { stage: '入职', count: 3, color: '#10b981' },
];

const SOURCE_PIE = [
  { name: '招聘平台', value: 42, color: '#3b82f6' },
  { name: '猎头推荐', value: 25, color: '#8b5cf6' },
  { name: '内部推荐', value: 18, color: '#22c55e' },
  { name: '校园招聘', value: 10, color: '#f59e0b' },
  { name: '官网投递', value: 5, color: '#6b7280' },
];

const HIRING_TREND = [
  { month: '10月', hire: 5, resign: 2 },
  { month: '11月', hire: 3, resign: 1 },
  { month: '12月', hire: 4, resign: 3 },
  { month: '1月', hire: 6, resign: 2 },
  { month: '2月', hire: 2, resign: 1 },
  { month: '3月', hire: 3, resign: 0 },
];

export function SmartRecruitment({ currentLanguage }: SmartRecruitmentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('positions');
  const [searchTerm, setSearchTerm] = useState('');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'positions' as TabType, label: { en: 'Positions', zh: '职位管理' }, icon: Briefcase },
    { id: 'candidates' as TabType, label: { en: 'Candidates', zh: '候选人' }, icon: Users },
    { id: 'pipeline' as TabType, label: { en: 'Pipeline', zh: '招聘漏斗' }, icon: Target },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '招聘分析' }, icon: BarChart3 },
  ];

  const openPositions = POSITIONS.filter(
    (p) => p.status !== 'filled' && p.status !== 'cancelled'
  ).length;
  const totalHeadcount = POSITIONS.filter(
    (p) => p.status !== 'filled' && p.status !== 'cancelled'
  ).reduce((s, p) => s + p.headcount, 0);
  const interviewingCount = CANDIDATES.filter((c) =>
    ['interview-1', 'interview-2'].includes(c.stage)
  ).length;

  const urgencyConf = {
    high: { label: isZh ? '紧急' : 'Urgent', color: 'text-red-400', bg: 'bg-red-500/20' },
    medium: { label: isZh ? '一般' : 'Normal', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    low: { label: isZh ? '低' : 'Low', color: 'text-green-400', bg: 'bg-green-500/20' },
  };

  const positionStatusConf: Record<PositionStatus, { label: string; color: string; bg: string }> = {
    open: { label: isZh ? '招聘中' : 'Open', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    interviewing: {
      label: isZh ? '面试中' : 'Interviewing',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
    },
    offer: {
      label: isZh ? '已发Offer' : 'Offer Sent',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
    },
    filled: { label: isZh ? '已完成' : 'Filled', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    cancelled: { label: isZh ? '已取消' : 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/20' },
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">{isZh ? '智能招聘' : 'Smart Recruitment'}</h1>
            <p className="text-sm text-gray-400">
              {isZh ? '招聘流程管理与人才库' : 'Recruitment pipeline & talent pool'}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm">
          <Plus className="w-4 h-4" />
          <span>{isZh ? '发布职位' : 'Post Job'}</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '开放职位' : 'Open Positions',
            value: openPositions.toString(),
            icon: Briefcase,
            gradient: 'from-blue-500 to-indigo-500',
          },
          {
            label: isZh ? '待招人数' : 'Headcount',
            value: totalHeadcount.toString(),
            icon: Users,
            gradient: 'from-purple-500 to-pink-500',
          },
          {
            label: isZh ? '面试安排' : 'Interviews',
            value: interviewingCount.toString(),
            icon: MessageSquare,
            gradient: 'from-amber-500 to-orange-500',
          },
          {
            label: isZh ? '平均招聘周期' : 'Avg. Time-to-hire',
            value: isZh ? '28天' : '28d',
            icon: Clock,
            gradient: 'from-emerald-500 to-green-500',
          },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex items-center space-x-3"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}
              >
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

      {/* Positions Tab */}
      {activeTab === 'positions' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={isZh ? '搜索职位...' : 'Search positions...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POSITIONS.filter(
              (p) =>
                searchTerm === '' ||
                p.title.includes(searchTerm) ||
                p.department.includes(searchTerm)
            ).map((pos) => {
              const ps = positionStatusConf[pos.status];
              const uc = urgencyConf[pos.urgency];
              return (
                <div
                  key={pos.id}
                  className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 hover:border-white/10 transition-all ${
                    pos.status === 'filled' ? 'border-white/5 opacity-70' : 'border-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white">{pos.title}</h4>
                        {pos.urgency === 'high' && (
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded-full ${uc.bg} ${uc.color}`}
                          >
                            {uc.label}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Building2 className="w-3 h-3" />
                          <span>{pos.department}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{pos.location}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${ps.bg} ${ps.color}`}>
                      {ps.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '薪资范围' : 'Salary'}</p>
                      <p className="text-sm text-white">{pos.salary}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '需求人数' : 'Headcount'}</p>
                      <p className="text-sm text-white">{pos.headcount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isZh ? '投递人数' : 'Applicants'}</p>
                      <p className="text-sm text-white">{pos.applicants}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-gray-500">
                      {isZh ? '发布于' : 'Posted'} {pos.publishDate}
                    </span>
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      {isZh ? '查看候选人' : 'View Candidates'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Candidates Tab */}
      {activeTab === 'candidates' && (
        <div className="space-y-3">
          {CANDIDATES.filter((c) => c.stage !== 'hired' && c.stage !== 'rejected').map((cand) => {
            const sc = STAGE_CONFIG[cand.stage];
            return (
              <div
                key={cand.id}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400">{cand.name[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white">{cand.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                          {isZh ? sc.label.zh : sc.label.en}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isZh ? '应聘' : 'For'}: {cand.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= Math.floor(cand.rating) ? 'text-amber-400 fill-amber-400' : s <= cand.rating ? 'text-amber-400/50 fill-amber-400/50' : 'text-gray-600'}`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{cand.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                    <Briefcase className="w-3 h-3" />
                    <span>{cand.experience}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                    <GraduationCap className="w-3 h-3" />
                    <span>{cand.education}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                    <Target className="w-3 h-3" />
                    <span>{cand.source}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{cand.applyDate}</span>
                  </div>
                </div>

                {(cand.interviewer || cand.notes) && (
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    {cand.interviewer && (
                      <span className="text-xs text-gray-500">
                        {isZh ? '面试官' : 'Interviewer'}: {cand.interviewer}{' '}
                        {cand.interviewDate && `· ${cand.interviewDate}`}
                      </span>
                    )}
                    {cand.notes && <span className="text-xs text-amber-400">{cand.notes}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pipeline Tab */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <h3 className="text-white mb-6">{isZh ? '招聘漏斗' : 'Recruitment Funnel'}</h3>
            <div className="space-y-3 max-w-3xl mx-auto">
              {PIPELINE_DATA.map((stage, idx) => {
                const widthPercent = 100 - idx * 12;
                return (
                  <div key={stage.stage} className="flex items-center space-x-4">
                    <div className="w-20 text-right">
                      <span className="text-sm text-gray-400">{stage.stage}</span>
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="h-11 rounded-xl flex items-center justify-between px-4"
                        style={{
                          width: `${widthPercent}%`,
                          background: `linear-gradient(135deg, ${stage.color}30, ${stage.color}15)`,
                          border: `1px solid ${stage.color}40`,
                        }}
                      >
                        <span className="text-white text-sm">{stage.count}</span>
                        {idx > 0 && (
                          <span className="text-xs" style={{ color: stage.color }}>
                            {((stage.count / PIPELINE_DATA[idx - 1].count) * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500">{isZh ? '整体转化率' : 'Overall CVR'}</p>
                <p className="text-lg text-white">
                  {(
                    (PIPELINE_DATA[PIPELINE_DATA.length - 1].count / PIPELINE_DATA[0].count) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{isZh ? '面试通过率' : 'Interview Pass'}</p>
                <p className="text-lg text-white">42.9%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{isZh ? 'Offer接受率' : 'Offer Accept'}</p>
                <p className="text-lg text-white">60%</p>
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
              <h3 className="text-white mb-4">
                {isZh ? '入离职趋势' : 'Hiring & Resignation Trend'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={HIRING_TREND}>
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
                      dataKey="hire"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      name={isZh ? '入职' : 'Hired'}
                    />
                    <Bar
                      dataKey="resign"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                      name={isZh ? '离职' : 'Resigned'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '招聘渠道分布' : 'Source Distribution'}</h3>
              <div className="h-64 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={SOURCE_PIE}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {SOURCE_PIE.map((entry, i) => (
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
                  {SOURCE_PIE.map((item, idx) => (
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '平均招聘成本' : 'Avg. Cost per Hire'}
                </span>
              </div>
              <p className="text-2xl text-white">¥8,650</p>
              <p className="text-xs text-emerald-400 mt-1">
                -12% {isZh ? '较上季度' : 'vs last quarter'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '内推占比' : 'Internal Referral'}
                </span>
              </div>
              <p className="text-2xl text-white">18%</p>
              <p className="text-xs text-emerald-400 mt-1">
                +5% {isZh ? '较去年' : 'vs last year'}
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">
                  {isZh ? '试用期通过率' : 'Probation Pass Rate'}
                </span>
              </div>
              <p className="text-2xl text-white">92%</p>
              <p className="text-xs text-gray-500 mt-1">{isZh ? '近6个月' : 'Last 6 months'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
