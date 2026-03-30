import React, { useState } from 'react';
import {
  GraduationCap,
  Brain,
  Sparkles,
  BookOpen,
  Users,
  Star,
  CheckCircle2,
  Clock,
  Play,
  Award,
  Target,
  BarChart3,
  TrendingUp,
  Layers,
  Video,
  FileText,
  Zap,
  ArrowUpRight,
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
} from 'recharts';

interface SmartTrainingProps {
  currentLanguage: string;
}
type TabType = 'courses' | 'progress' | 'exams' | 'analytics';

const COURSES = [
  {
    id: 'C001',
    name: '废金属分类与品质鉴定',
    category: '专业技能',
    level: '初级',
    duration: '8h',
    enrolled: 45,
    completed: 38,
    rating: 4.8,
    mandatory: true,
  },
  {
    id: 'C002',
    name: 'AI辅助质检系统操作',
    category: '数字技能',
    level: '中级',
    duration: '6h',
    enrolled: 32,
    completed: 25,
    rating: 4.6,
    mandatory: true,
  },
  {
    id: 'C003',
    name: 'LME期货基础与套期保值',
    category: '金融知识',
    level: '高级',
    duration: '12h',
    enrolled: 18,
    completed: 12,
    rating: 4.9,
    mandatory: false,
  },
  {
    id: 'C004',
    name: '安全生产与环保合规',
    category: '安全合规',
    level: '初级',
    duration: '4h',
    enrolled: 60,
    completed: 58,
    rating: 4.5,
    mandatory: true,
  },
  {
    id: 'C005',
    name: '客户谈判与大客户管理',
    category: '销售技能',
    level: '中级',
    duration: '10h',
    enrolled: 22,
    completed: 15,
    rating: 4.7,
    mandatory: false,
  },
  {
    id: 'C006',
    name: '言语云3系统操作培训',
    category: '数字技能',
    level: '初级',
    duration: '5h',
    enrolled: 55,
    completed: 50,
    rating: 4.4,
    mandatory: true,
  },
];

const DEPT_PROGRESS = [
  { dept: '采购部', completion: 88, avgScore: 85, hours: 126 },
  { dept: '销售部', completion: 82, avgScore: 82, hours: 98 },
  { dept: '仓储部', completion: 95, avgScore: 78, hours: 145 },
  { dept: '物流部', completion: 78, avgScore: 80, hours: 85 },
  { dept: '财务部', completion: 90, avgScore: 92, hours: 72 },
  { dept: '技术部', completion: 85, avgScore: 88, hours: 110 },
];

const CATEGORY_PIE = [
  { name: '专业技能', value: 35, color: '#3b82f6' },
  { name: '数字技能', value: 25, color: '#8b5cf6' },
  { name: '安全合规', value: 20, color: '#22c55e' },
  { name: '销售技能', value: 12, color: '#f59e0b' },
  { name: '金融知识', value: 8, color: '#ef4444' },
];

export function SmartTraining({ currentLanguage }: SmartTrainingProps) {
  const [activeTab, setActiveTab] = useState<TabType>('courses');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'courses' as TabType, label: { en: 'Courses', zh: '课程中心' }, icon: BookOpen },
    { id: 'progress' as TabType, label: { en: 'Progress', zh: '学习进度' }, icon: Target },
    { id: 'exams' as TabType, label: { en: 'Exams', zh: '考试认证' }, icon: Award },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '培训分析' }, icon: BarChart3 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-purple-500/20">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能培训' : 'Smart Training'}</span>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? 'AI个性化学习路径·技能认证·培训分析'
                : 'AI personalized learning · Certification · Analytics'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '课程总数' : 'Courses',
            value: COURSES.length.toString(),
            icon: BookOpen,
            gradient: 'from-purple-500 to-pink-500',
            sub: `${COURSES.filter((c) => c.mandatory).length} ${isZh ? '必修' : 'required'}`,
          },
          {
            label: isZh ? '在学人数' : 'Learners',
            value: '68',
            icon: Users,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '覆盖6个部门' : '6 departments',
          },
          {
            label: isZh ? '整体完成率' : 'Completion',
            value: '86%',
            icon: CheckCircle2,
            gradient: 'from-emerald-500 to-green-500',
            sub: '+5% MoM',
          },
          {
            label: isZh ? '平均考核分' : 'Avg Score',
            value: '84.2',
            icon: Award,
            gradient: 'from-amber-500 to-orange-500',
            sub: '+3.5 MoM',
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
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COURSES.map((c) => (
            <div
              key={c.id}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-purple-500/20 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white">{c.name}</h4>
                    {c.mandatory && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">
                        {isZh ? '必修' : 'Required'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>{c.category}</span>
                    <span>{c.level}</span>
                    <span>
                      <Clock className="w-3 h-3 inline mr-0.5" />
                      {c.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{c.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                <span>
                  {c.completed}/{c.enrolled} {isZh ? '已完成' : 'completed'}
                </span>
                <span className="text-emerald-400">
                  {Math.round((c.completed / c.enrolled) * 100)}%
                </span>
              </div>
              <div className="mt-1.5 w-full bg-slate-700/30 rounded-full h-1.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${(c.completed / c.enrolled) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '各部门培训完成率' : 'Dept. Completion Rate'}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={DEPT_PROGRESS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  type="number"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  domain={[0, 100]}
                />
                <YAxis
                  type="category"
                  dataKey="dept"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  width={60}
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
                  dataKey="completion"
                  fill="#8b5cf6"
                  name={isZh ? '完成率%' : 'Completion%'}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'exams' && (
        <div className="space-y-4">
          {[
            {
              name: '废金属分类资格认证',
              participants: 45,
              passRate: 91,
              avgScore: 86,
              nextDate: '2026-03-20',
            },
            {
              name: 'AI质检系统操作认证',
              participants: 32,
              passRate: 84,
              avgScore: 82,
              nextDate: '2026-03-25',
            },
            {
              name: '安全生产持证上岗考试',
              participants: 60,
              passRate: 97,
              avgScore: 88,
              nextDate: '2026-04-01',
            },
          ].map((exam, i) => (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-white mb-1">{exam.name}</h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>
                      {exam.participants} {isZh ? '人参与' : 'participants'}
                    </span>
                    <span>
                      {isZh ? '通过率' : 'Pass'}:{' '}
                      <span className="text-emerald-400">{exam.passRate}%</span>
                    </span>
                    <span>
                      {isZh ? '均分' : 'Avg'}: <span className="text-white">{exam.avgScore}</span>
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {isZh ? '下次' : 'Next'}: {exam.nextDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '课程类别分布' : 'Course Categories'}</h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={CATEGORY_PIE}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {CATEGORY_PIE.map((e, i) => (
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
              <div className="w-1/2 space-y-3">
                {CATEGORY_PIE.map((e, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                      <span className="text-sm text-gray-300">{e.name}</span>
                    </div>
                    <span className="text-sm text-white">{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>AI {isZh ? '培训洞察' : 'Training Insight'}</span>
            </h3>
            <div className="space-y-3">
              {[
                isZh
                  ? '仓储部完成率最高(95%)但考核均分最低(78)，建议增加实操考核提升掌握度'
                  : 'Warehouse highest completion but lowest score, add practical exams',
                isZh
                  ? '物流部完成率仅78%，主要瓶颈为排班冲突，建议增加在线异步课程比例'
                  : 'Logistics only 78%, scheduling conflicts - increase async online courses',
                isZh
                  ? 'AI推荐：为采购部新增"供应链金融"课程，匹配其业务升级需求'
                  : 'AI recommends: Add "Supply Chain Finance" course for procurement dept',
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/15"
                >
                  <p className="text-xs text-purple-300">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {t}
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
