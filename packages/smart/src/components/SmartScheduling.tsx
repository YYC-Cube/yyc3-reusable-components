import React, { useState } from 'react';
import {
  Calendar,
  Brain,
  Sparkles,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Layers,
  Sun,
  Moon,
  Sunrise,
  ArrowUpRight,
  RefreshCw,
  Target,
  Zap,
  Settings,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SmartSchedulingProps {
  currentLanguage: string;
}
type TabType = 'schedule' | 'rules' | 'requests' | 'analytics';

interface ShiftSlot {
  id: string;
  employee: string;
  dept: string;
  shift: 'morning' | 'afternoon' | 'night';
  date: string;
  status: 'confirmed' | 'pending' | 'swap-requested';
}

const WEEKLY_SCHEDULE = [
  {
    day: '周一',
    morning: ['李明', '张伟', '王芳'],
    afternoon: ['赵强', '刘洋', '陈静'],
    night: ['周鹏', '吴磊'],
  },
  {
    day: '周二',
    morning: ['赵强', '刘洋', '陈静'],
    afternoon: ['李明', '张伟', '周鹏'],
    night: ['王芳', '吴磊'],
  },
  {
    day: '周三',
    morning: ['周鹏', '吴磊', '王芳'],
    afternoon: ['李明', '赵强', '陈静'],
    night: ['张伟', '刘洋'],
  },
  {
    day: '周四',
    morning: ['李明', '张伟', '刘洋'],
    afternoon: ['王芳', '赵强', '吴磊'],
    night: ['陈静', '周鹏'],
  },
  {
    day: '周五',
    morning: ['赵强', '陈静', '周鹏'],
    afternoon: ['张伟', '刘洋', '吴磊'],
    night: ['李明', '王芳'],
  },
  { day: '周六', morning: ['张伟', '王芳'], afternoon: ['刘洋', '赵强'], night: ['李明'] },
  { day: '周日', morning: ['吴磊', '陈静'], afternoon: ['周鹏', '王芳'], night: ['赵强'] },
];

const SWAP_REQUESTS = [
  {
    id: 'SR-001',
    from: '刘洋',
    to: '陈静',
    fromShift: '周三夜班',
    toShift: '周四早班',
    reason: '家庭事务',
    status: 'pending' as const,
  },
  {
    id: 'SR-002',
    from: '周鹏',
    to: '吴磊',
    fromShift: '周一夜班',
    toShift: '周二夜班',
    reason: '体检',
    status: 'approved' as const,
  },
  {
    id: 'SR-003',
    from: '王芳',
    to: '张伟',
    fromShift: '周五夜班',
    toShift: '周五午班',
    reason: '课程培训',
    status: 'pending' as const,
  },
];

const WORKLOAD_DATA = [
  { name: '李明', hours: 42, overtime: 2 },
  { name: '张伟', hours: 44, overtime: 4 },
  { name: '王芳', hours: 40, overtime: 0 },
  { name: '赵强', hours: 46, overtime: 6 },
  { name: '刘洋', hours: 38, overtime: 0 },
  { name: '陈静', hours: 42, overtime: 2 },
  { name: '周鹏', hours: 40, overtime: 0 },
  { name: '吴磊', hours: 36, overtime: 0 },
];

const shiftConf = {
  morning: {
    label: '早班',
    labelEn: 'Morning',
    icon: Sunrise,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    time: '06:00-14:00',
  },
  afternoon: {
    label: '午班',
    labelEn: 'Afternoon',
    icon: Sun,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    time: '14:00-22:00',
  },
  night: {
    label: '夜班',
    labelEn: 'Night',
    icon: Moon,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    time: '22:00-06:00',
  },
};

export function SmartScheduling({ currentLanguage }: SmartSchedulingProps) {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'schedule' as TabType, label: { en: 'Schedule', zh: '排班表' }, icon: Calendar },
    { id: 'rules' as TabType, label: { en: 'Rules', zh: '排班规则' }, icon: Settings },
    { id: 'requests' as TabType, label: { en: 'Swaps', zh: '换班申请' }, icon: RefreshCw },
    { id: 'analytics' as TabType, label: { en: 'Workload', zh: '工时分析' }, icon: BarChart3 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-violet-500/20">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能排班' : 'Smart Scheduling'}</span>
              <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? 'AI智能排班·工时均衡·换班管理'
                : 'AI scheduling · Workload balance · Shift swap'}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 rounded-xl border border-violet-500/30 text-sm">
          <Brain className="w-4 h-4" />
          <span>{isZh ? 'AI自动排班' : 'AI Auto Schedule'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '本周排班人数' : 'Scheduled',
            value: '8',
            icon: Users,
            gradient: 'from-violet-500 to-purple-500',
            sub: isZh ? '三班轮转' : '3-shift rotation',
          },
          {
            label: isZh ? '平均周工时' : 'Avg Hours/W',
            value: '41h',
            icon: Clock,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '标准: 40h' : 'Standard: 40h',
          },
          {
            label: isZh ? '待处理换班' : 'Pending Swaps',
            value: SWAP_REQUESTS.filter((s) => s.status === 'pending').length.toString(),
            icon: RefreshCw,
            gradient: 'from-amber-500 to-orange-500',
            sub: isZh ? '需审批' : 'Need approval',
          },
          {
            label: isZh ? '排班满意度' : 'Satisfaction',
            value: '4.3/5',
            icon: CheckCircle2,
            gradient: 'from-emerald-500 to-green-500',
            sub: '+0.2 MoM',
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
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-white border border-violet-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'schedule' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 py-3 px-4 w-20">
                    {isZh ? '日期' : 'Day'}
                  </th>
                  {Object.entries(shiftConf).map(([key, conf]) => {
                    const SI = conf.icon;
                    return (
                      <th key={key} className="text-center text-xs text-gray-500 py-3 px-4">
                        <div className="flex items-center justify-center space-x-1">
                          <SI className={`w-3 h-3 ${conf.color}`} />
                          <span>{isZh ? conf.label : conf.labelEn}</span>
                        </div>
                        <span className="text-xs text-gray-600">{conf.time}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {WEEKLY_SCHEDULE.map((day, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-sm text-white">{day.day}</td>
                    {(['morning', 'afternoon', 'night'] as const).map((shift) => (
                      <td key={shift} className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {day[shift].map((name, ni) => (
                            <span
                              key={ni}
                              className={`text-xs px-2 py-1 rounded-lg ${shiftConf[shift].bg} ${shiftConf[shift].color} border border-white/5`}
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-4">
          {[
            {
              name: isZh ? '连续夜班限制' : 'Night Shift Limit',
              desc: isZh ? '同一员工连续夜班不超过2天' : 'Max 2 consecutive night shifts',
              enabled: true,
            },
            {
              name: isZh ? '周休保障' : 'Weekly Rest',
              desc: isZh ? '每周至少保证1天完整休息' : 'At least 1 full rest day per week',
              enabled: true,
            },
            {
              name: isZh ? '加班时长上限' : 'Overtime Cap',
              desc: isZh ? '月加班不超过36小时' : 'Max 36h overtime per month',
              enabled: true,
            },
            {
              name: isZh ? '技能匹配' : 'Skill Matching',
              desc: isZh
                ? 'AI根据产线需求匹配对应技能员工'
                : 'AI matches employees by skill to production needs',
              enabled: true,
            },
            {
              name: isZh ? '公平轮转' : 'Fair Rotation',
              desc: isZh
                ? 'AI自动均衡夜班和周末班次分配'
                : 'AI balances night and weekend shifts fairly',
              enabled: true,
            },
          ].map((rule, i) => (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 flex items-center justify-between"
            >
              <div>
                <h4 className="text-white text-sm">{rule.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{rule.desc}</p>
              </div>
              <div
                className={`w-10 h-5 rounded-full ${rule.enabled ? 'bg-emerald-500' : 'bg-gray-600'} relative`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${rule.enabled ? 'right-0.5' : 'left-0.5'}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {SWAP_REQUESTS.map((req) => (
            <div
              key={req.id}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white text-sm">{req.from}</span>
                    <span className="text-gray-500">↔</span>
                    <span className="text-white text-sm">{req.to}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${req.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}
                    >
                      {req.status === 'approved'
                        ? isZh
                          ? '已批准'
                          : 'Approved'
                        : isZh
                          ? '待审批'
                          : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {req.fromShift} → {req.toShift} | {isZh ? '原因' : 'Reason'}: {req.reason}
                  </p>
                </div>
                {req.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs border border-emerald-500/30">
                      {isZh ? '批准' : 'OK'}
                    </button>
                    <button className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-xs border border-red-500/30">
                      {isZh ? '拒绝' : 'No'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '本周工时分布' : 'Weekly Hours Distribution'}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={WORKLOAD_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
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
                  dataKey="hours"
                  fill="#8b5cf6"
                  name={isZh ? '正常工时' : 'Regular'}
                  stackId="a"
                />
                <Bar
                  dataKey="overtime"
                  fill="#f59e0b"
                  name={isZh ? '加班' : 'OT'}
                  stackId="a"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/15">
            <p className="text-xs text-violet-300">
              <Brain className="w-3 h-3 inline mr-1" />
              {isZh
                ? 'AI洞察：赵强本周加班6小时超平均水平，建议下周减少其夜班排班。刘洋和吴磊工时偏低，可适当增加周末班次保持公平性。'
                : 'AI: Zhao Qiang 6h OT above average, reduce next week. Liu Yang and Wu Lei hours low, increase weekend shifts for fairness.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
