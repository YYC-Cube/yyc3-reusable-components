import React, { useState } from 'react';
import {
  Trophy,
  Target,
  TrendingUp,
  Users,
  Star,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  BarChart2,
  MoreVertical,
  Award,
} from 'lucide-react';
import { Button } from '@yyc3/ui';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface PerformanceProps {
  currentLanguage: string;
}

const TOP_PERFORMERS = [
  {
    id: 1,
    name: 'Ahmed Al-Fahad',
    role: 'Operations Mgr',
    score: 98,
    kpi: 'Safety Compliance',
    avatar: 'AF',
  },
  {
    id: 2,
    name: 'Khalid Hassan',
    role: 'Sales Exec',
    score: 96,
    kpi: 'Revenue Target',
    avatar: 'KH',
  },
  {
    id: 3,
    name: 'Sarah Chen',
    role: 'Finance Mgr',
    score: 95,
    kpi: 'Audit Accuracy',
    avatar: 'SC',
  },
];

const PERFORMANCE_DATA = [
  { subject: 'Efficiency', A: 120, B: 110, fullMark: 150 },
  { subject: 'Safety', A: 98, B: 130, fullMark: 150 },
  { subject: 'Quality', A: 86, B: 130, fullMark: 150 },
  { subject: 'Attendance', A: 99, B: 100, fullMark: 150 },
  { subject: 'Teamwork', A: 85, B: 90, fullMark: 150 },
  { subject: 'Initiative', A: 65, B: 85, fullMark: 150 },
];

const DEPT_PERFORMANCE = [
  { name: 'Ops', score: 92 },
  { name: 'Sales', score: 88 },
  { name: 'Logistics', score: 85 },
  { name: 'Finance', score: 95 },
  { name: 'HR', score: 90 },
];

export function Performance({ currentLanguage }: PerformanceProps) {
  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center border border-amber-500/30">
            <Trophy className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              {currentLanguage === 'en' ? 'Performance Management' : '绩效管理'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'Track KPIs, goals, and employee growth'
                : '追踪 KPI、目标和员工成长'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-xl transition-all duration-300">
            <Calendar className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Q1 Review Cycle' : 'Q1 考核周期'}
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/30">
            <Target className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Set Goals' : '设定目标'}
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-400">+5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">94.2%</h3>
          <p className="text-slate-400 text-xs">
            {currentLanguage === 'en' ? 'Overall Productivity' : '整体生产力'}
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-400">85%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">12/15</h3>
          <p className="text-slate-400 text-xs">
            {currentLanguage === 'en' ? 'Dept Goals Met' : '部门目标达成'}
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-purple-400">+12</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">98%</h3>
          <p className="text-slate-400 text-xs">
            {currentLanguage === 'en' ? 'Training Completion' : '培训完成率'}
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-400">-2%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">2</h3>
          <p className="text-slate-400 text-xs">
            {currentLanguage === 'en' ? 'Safety Incidents' : '安全事故'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance Radar */}
        <div className="lg:col-span-1 glass-card rounded-2xl p-6 border border-white/10 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
            <RadarChart className="w-5 h-5 mr-2 text-amber-400" /> // Icon placeholder, using text
            instead
            {currentLanguage === 'en' ? 'Skill Analysis' : '技能维度分析'}
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PERFORMANCE_DATA}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Company Avg"
                  dataKey="B"
                  stroke="#f59e0b"
                  strokeOpacity={0.6}
                  fill="#f59e0b"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Dept Avg"
                  dataKey="A"
                  stroke="#3b82f6"
                  strokeOpacity={0.6}
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#fff',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-400">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500/50 mr-2 rounded-full"></div>Company Avg
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500/50 mr-2 rounded-full"></div>Dept Avg
            </div>
          </div>
        </div>

        {/* Dept Comparison Bar Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">
            {currentLanguage === 'en' ? 'Departmental Performance' : '部门绩效对比'}
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart
                data={DEPT_PERFORMANCE}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                <Tooltip
                  cursor={{ fill: '#334155', opacity: 0.2 }}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="score" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={30}></Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performers List */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">
            {currentLanguage === 'en' ? 'Top Performers (February)' : '月度优秀员工 (2月)'}
          </h3>
          <Button variant="ghost" className="text-amber-400 text-sm hover:text-white">
            {currentLanguage === 'en' ? 'View All' : '查看全部'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOP_PERFORMERS.map((person, idx) => (
            <div
              key={person.id}
              className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 flex items-center space-x-4 relative overflow-hidden group hover:border-amber-500/30 transition-colors"
            >
              {idx === 0 && (
                <div className="absolute top-0 right-0 p-2">
                  <Trophy className="w-12 h-12 text-amber-500/10 rotate-12" />
                </div>
              )}
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border-2 border-slate-600 relative z-10">
                {person.avatar}
              </div>
              <div className="relative z-10">
                <h4 className="text-white font-bold">{person.name}</h4>
                <p className="text-xs text-gray-400">{person.role}</p>
                <div className="flex items-center mt-1 text-amber-400 text-xs">
                  <Star className="w-3 h-3 mr-1 fill-amber-400" />
                  <span className="font-bold">{person.score}</span>
                  <span className="mx-1.5 text-slate-600">|</span>
                  <span className="text-gray-400">{person.kpi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
