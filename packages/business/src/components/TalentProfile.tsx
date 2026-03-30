import React, { useState } from 'react';
import {
  UserCog,
  Brain,
  Sparkles,
  Users,
  Star,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  Zap,
  BookOpen,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Heart,
  Shield,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface TalentProfileProps {
  currentLanguage: string;
}
type TabType = 'profiles' | 'matrix' | 'succession' | 'analytics';

interface TalentCard {
  id: string;
  name: string;
  dept: string;
  role: string;
  level: string;
  joinDate: string;
  performance: number;
  potential: 'high' | 'medium' | 'low';
  skills: { name: string; score: number }[];
  strengths: string[];
  gaps: string[];
  riskOfLeaving: number;
  engagement: number;
}

const TALENTS: TalentCard[] = [
  {
    id: 'T001',
    name: '李明',
    dept: '采购部',
    role: '采购经理',
    level: 'M2',
    joinDate: '2021-03',
    performance: 92,
    potential: 'high',
    skills: [
      { name: '供应链', score: 95 },
      { name: '谈判', score: 90 },
      { name: '数据分析', score: 78 },
      { name: '团队管理', score: 85 },
      { name: '行业知识', score: 92 },
    ],
    strengths: ['供应链管理能力突出', 'LME期货操作经验丰富'],
    gaps: ['数字化工具运用待提升'],
    riskOfLeaving: 15,
    engagement: 88,
  },
  {
    id: 'T002',
    name: '王芳',
    dept: '销售部',
    role: '销售总监',
    level: 'M3',
    joinDate: '2019-08',
    performance: 95,
    potential: 'high',
    skills: [
      { name: '客户管理', score: 98 },
      { name: '谈判', score: 95 },
      { name: '团队管理', score: 90 },
      { name: '数据分析', score: 82 },
      { name: '行业知识', score: 88 },
    ],
    strengths: ['大客户关系维护能力顶尖', '业绩连续3年超额完成'],
    gaps: ['跨部门协作可加强'],
    riskOfLeaving: 8,
    engagement: 95,
  },
  {
    id: 'T003',
    name: '赵强',
    dept: '仓储部',
    role: '仓储主管',
    level: 'M1',
    joinDate: '2022-05',
    performance: 85,
    potential: 'medium',
    skills: [
      { name: '库存管理', score: 92 },
      { name: '流程优化', score: 80 },
      { name: '团队管理', score: 75 },
      { name: '数据分析', score: 70 },
      { name: '安全管理', score: 88 },
    ],
    strengths: ['库存管理精准度高', '安全生产意识强'],
    gaps: ['领导力发展需加速', '数据分析能力待提升'],
    riskOfLeaving: 22,
    engagement: 78,
  },
  {
    id: 'T004',
    name: '陈静',
    dept: '技术部',
    role: 'AI工程师',
    level: 'P3',
    joinDate: '2024-01',
    performance: 90,
    potential: 'high',
    skills: [
      { name: '机器学习', score: 95 },
      { name: '计算机视觉', score: 92 },
      { name: '系统架构', score: 85 },
      { name: '项目管理', score: 72 },
      { name: '沟通表达', score: 68 },
    ],
    strengths: ['AI视觉质检系统核心开发者', '技术创新能力强'],
    gaps: ['项目管理和跨部门沟通需加强'],
    riskOfLeaving: 30,
    engagement: 82,
  },
];

const NINE_BOX = [
  { performance: '高', potential: '高', count: 2, names: '李明、王芳', action: '重点培养' },
  { performance: '高', potential: '中', count: 1, names: '陈静', action: '发展潜力' },
  { performance: '中', potential: '高', count: 0, names: '-', action: '加速发展' },
  { performance: '中', potential: '中', count: 1, names: '赵强', action: '持续提升' },
];

const SKILL_GAP = [
  { skill: '数字化', current: 72, target: 90 },
  { skill: '数据分析', current: 78, target: 90 },
  { skill: '领导力', current: 80, target: 88 },
  { skill: 'AI应用', current: 65, target: 85 },
  { skill: '行业知识', current: 88, target: 92 },
  { skill: '沟通协作', current: 82, target: 88 },
];

export function TalentProfile({ currentLanguage }: TalentProfileProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profiles');
  const [selectedTalent, setSelectedTalent] = useState<string | null>(null);
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'profiles' as TabType, label: { en: 'Profiles', zh: '人才画像' }, icon: UserCog },
    { id: 'matrix' as TabType, label: { en: '9-Box', zh: '九宫格' }, icon: Target },
    { id: 'succession' as TabType, label: { en: 'Succession', zh: '继任计划' }, icon: Users },
    { id: 'analytics' as TabType, label: { en: 'Skill Gap', zh: '能力差距' }, icon: BarChart3 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-fuchsia-500/20">
            <UserCog className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '人才画像' : 'Talent Profile'}</span>
              <Sparkles className="w-5 h-5 text-fuchsia-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? 'AI人才评估·九宫格·继任规划·能力差距分析'
                : 'AI talent assessment · 9-box · Succession · Skill gap'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '关键人才' : 'Key Talents',
            value: TALENTS.length.toString(),
            icon: Star,
            gradient: 'from-fuchsia-500 to-pink-500',
            sub: `${TALENTS.filter((t) => t.potential === 'high').length} ${isZh ? '高潜力' : 'HiPo'}`,
          },
          {
            label: isZh ? '平均绩效' : 'Avg Performance',
            value: `${Math.round(TALENTS.reduce((s, t) => s + t.performance, 0) / TALENTS.length)}`,
            icon: Award,
            gradient: 'from-amber-500 to-orange-500',
            sub: isZh ? '优秀' : 'Excellent',
          },
          {
            label: isZh ? '平均敬业度' : 'Avg Engagement',
            value: `${Math.round(TALENTS.reduce((s, t) => s + t.engagement, 0) / TALENTS.length)}%`,
            icon: Heart,
            gradient: 'from-emerald-500 to-green-500',
            sub: '+3% MoM',
          },
          {
            label: isZh ? '离职风险' : 'Flight Risk',
            value: `${TALENTS.filter((t) => t.riskOfLeaving > 25).length}`,
            icon: Shield,
            gradient: 'from-red-500 to-pink-500',
            sub: isZh ? '需关注' : 'Attention',
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
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 text-white border border-fuchsia-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'profiles' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {TALENTS.map((t) => {
            const isExpanded = selectedTalent === t.id;
            const radarData = t.skills.map((s) => ({
              dimension: s.name,
              value: s.score,
              fullMark: 100,
            }));
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTalent(isExpanded ? null : t.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${isExpanded ? 'border-fuchsia-500/30' : 'border-white/5 hover:border-white/10'}`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 text-sm">
                          {t.name.charAt(0)}
                        </div>
                        <h4 className="text-white">{t.name}</h4>
                        <span className="text-xs text-gray-500">{t.level}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${t.potential === 'high' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}
                        >
                          {t.potential === 'high'
                            ? isZh
                              ? '高潜力'
                              : 'HiPo'
                            : isZh
                              ? '中潜力'
                              : 'MidPo'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t.dept} · {t.role} · {isZh ? '入职' : 'Joined'}: {t.joinDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-white">{t.performance}</p>
                      <p className="text-xs text-gray-500">{isZh ? '绩效' : 'Perf.'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>
                      {isZh ? '敬业度' : 'Engage'}:{' '}
                      <span className="text-emerald-400">{t.engagement}%</span>
                    </span>
                    <span>
                      {isZh ? '离职风险' : 'Flight Risk'}:{' '}
                      <span
                        className={`${t.riskOfLeaving > 25 ? 'text-red-400' : t.riskOfLeaving > 15 ? 'text-amber-400' : 'text-emerald-400'}`}
                      >
                        {t.riskOfLeaving}%
                      </span>
                    </span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <div className="h-48 mb-3">
                      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis
                            dataKey="dimension"
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                          />
                          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                          <Radar
                            dataKey="value"
                            stroke="#d946ef"
                            fill="#d946ef"
                            fillOpacity={0.2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-emerald-400 mb-1">
                          {isZh ? '优势' : 'Strengths'}
                        </p>
                        {t.strengths.map((s, i) => (
                          <p key={i} className="text-xs text-gray-300 mb-0.5">
                            ✦ {s}
                          </p>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-amber-400 mb-1">{isZh ? '待发展' : 'Gaps'}</p>
                        {t.gaps.map((g, i) => (
                          <p key={i} className="text-xs text-gray-300 mb-0.5">
                            △ {g}
                          </p>
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

      {activeTab === 'matrix' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '人才九宫格' : 'Talent 9-Box Grid'}</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                p: isZh ? '高潜力' : 'Hi Pot',
                perf: isZh ? '低绩效' : 'Lo Perf',
                color: 'bg-amber-500/15 border-amber-500/20',
                count: 0,
              },
              {
                p: isZh ? '高潜力' : 'Hi Pot',
                perf: isZh ? '中绩效' : 'Mid Perf',
                color: 'bg-blue-500/15 border-blue-500/20',
                count: 0,
              },
              {
                p: isZh ? '高潜力' : 'Hi Pot',
                perf: isZh ? '高绩效' : 'Hi Perf',
                color: 'bg-emerald-500/15 border-emerald-500/20',
                count: 2,
                names: '李明、王芳',
              },
              {
                p: isZh ? '中潜力' : 'Mid Pot',
                perf: isZh ? '低绩效' : 'Lo Perf',
                color: 'bg-red-500/10 border-red-500/20',
                count: 0,
              },
              {
                p: isZh ? '中潜力' : 'Mid Pot',
                perf: isZh ? '中绩效' : 'Mid Perf',
                color: 'bg-slate-500/15 border-slate-500/20',
                count: 1,
                names: '赵强',
              },
              {
                p: isZh ? '中潜力' : 'Mid Pot',
                perf: isZh ? '高绩效' : 'Hi Perf',
                color: 'bg-blue-500/15 border-blue-500/20',
                count: 1,
                names: '陈静',
              },
              {
                p: isZh ? '低潜力' : 'Lo Pot',
                perf: isZh ? '低绩效' : 'Lo Perf',
                color: 'bg-red-500/15 border-red-500/20',
                count: 0,
              },
              {
                p: isZh ? '低潜力' : 'Lo Pot',
                perf: isZh ? '中绩效' : 'Mid Perf',
                color: 'bg-gray-500/10 border-gray-500/20',
                count: 0,
              },
              {
                p: isZh ? '低潜力' : 'Lo Pot',
                perf: isZh ? '高绩效' : 'Hi Perf',
                color: 'bg-slate-500/10 border-slate-500/20',
                count: 0,
              },
            ].map((box, i) => (
              <div key={i} className={`p-4 rounded-xl border ${box.color} min-h-[80px]`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    {box.p}/{box.perf}
                  </span>
                  <span className="text-lg text-white">{box.count}</span>
                </div>
                {box.names && <p className="text-xs text-gray-300">{box.names}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'succession' && (
        <div className="space-y-4">
          {[
            {
              position: isZh ? '采购总监' : 'VP Procurement',
              incumbent: '（空缺）',
              successors: [{ name: '李明', readiness: 85 }],
            },
            {
              position: isZh ? '运营总监' : 'COO',
              incumbent: '张总',
              successors: [
                { name: '王芳', readiness: 72 },
                { name: '李明', readiness: 60 },
              ],
            },
            {
              position: isZh ? '技术总监' : 'CTO',
              incumbent: '（空缺）',
              successors: [{ name: '陈静', readiness: 55 }],
            },
          ].map((pos, i) => (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white">{pos.position}</h4>
                  <p className="text-xs text-gray-500">
                    {isZh ? '现任' : 'Current'}: {pos.incumbent}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {pos.successors.map((s, si) => (
                  <div
                    key={si}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30 border border-white/5"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 text-xs">
                        {si + 1}
                      </span>
                      <span className="text-sm text-white">{s.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.readiness >= 80 ? 'bg-emerald-500' : s.readiness >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${s.readiness}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs ${s.readiness >= 80 ? 'text-emerald-400' : s.readiness >= 60 ? 'text-amber-400' : 'text-red-400'}`}
                      >
                        {isZh ? '就绪度' : 'Ready'} {s.readiness}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">
            {isZh ? '组织能力差距分析' : 'Org Skill Gap Analysis'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={SKILL_GAP} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  type="number"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  domain={[0, 100]}
                />
                <YAxis
                  type="category"
                  dataKey="skill"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15,23,42,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar
                  dataKey="current"
                  fill="#d946ef"
                  name={isZh ? '当前' : 'Current'}
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="target"
                  fill="rgba(217,70,239,0.3)"
                  name={isZh ? '目标' : 'Target'}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/15">
            <p className="text-xs text-fuchsia-300">
              <Brain className="w-3 h-3 inline mr-1" />
              {isZh
                ? 'AI洞察：最大能力差距在"AI应用"(差距20分)和"数字化"(差距18分)。建议Q2重点投入AI质检和数据分析培训，预计可缩小差距60%。陈静可作为内部AI培训导师。'
                : 'Largest gaps: AI Application (20pts) and Digital (18pts). Focus Q2 on AI/data training. Chen Jing can be internal AI training mentor.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
