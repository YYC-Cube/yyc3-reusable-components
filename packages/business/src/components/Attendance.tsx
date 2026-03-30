import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  User,
  MapPin,
  BarChart3,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  Briefcase,
  TrendingUp,
  FileText,
  Plane
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
  Cell
} from 'recharts';

interface AttendanceProps {
  currentLanguage: string;
}

type TabType = 'calendar' | 'records' | 'leave' | 'statistics';

interface AttendanceRecord {
  id: string;
  name: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'normal' | 'late' | 'early' | 'absent' | 'leave' | 'overtime';
  hours: number;
  location?: string;
}

interface LeaveRequest {
  id: string;
  name: string;
  department: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approver: string;
}

const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { id: 'A001', name: '张伟', department: '销售部', date: '2026-03-13', clockIn: '08:55', clockOut: '18:32', status: 'normal', hours: 9.6, location: '总部打卡' },
  { id: 'A002', name: '李娜', department: '采购部', date: '2026-03-13', clockIn: '09:12', clockOut: '19:05', status: 'late', hours: 9.9, location: '总部打卡' },
  { id: 'A003', name: '王强', department: '生产部', date: '2026-03-13', clockIn: '07:50', clockOut: '18:00', status: 'normal', hours: 10.2, location: '工厂打卡' },
  { id: 'A004', name: '赵磊', department: 'IT部门', date: '2026-03-13', clockIn: '09:00', clockOut: '21:30', status: 'overtime', hours: 12.5, location: '总部打卡' },
  { id: 'A005', name: '陈芳', department: '行政部', date: '2026-03-13', clockIn: '08:45', clockOut: '17:20', status: 'early', hours: 8.6, location: '总部打卡' },
  { id: 'A006', name: '刘洋', department: '物流部', date: '2026-03-13', clockIn: '-', clockOut: '-', status: 'leave', hours: 0, location: '-' },
  { id: 'A007', name: '孙佳', department: '财务部', date: '2026-03-13', clockIn: '08:58', clockOut: '18:15', status: 'normal', hours: 9.3, location: '总部打卡' },
  { id: 'A008', name: '周明', department: '人力资源部', date: '2026-03-13', clockIn: '-', clockOut: '-', status: 'absent', hours: 0, location: '-' },
  { id: 'A009', name: '吴涛', department: '销售部', date: '2026-03-13', clockIn: '08:30', clockOut: '18:45', status: 'normal', hours: 10.3, location: '外勤GPS' },
  { id: 'A010', name: '郑丽', department: '采购部', date: '2026-03-13', clockIn: '09:05', clockOut: '18:30', status: 'late', hours: 9.4, location: '总部打卡' },
  { id: 'A011', name: '黄磊', department: '生产部', date: '2026-03-13', clockIn: '07:45', clockOut: '17:50', status: 'normal', hours: 10.1, location: '工厂打卡' },
  { id: 'A012', name: '林静', department: 'IT部门', date: '2026-03-13', clockIn: '09:00', clockOut: '18:20', status: 'normal', hours: 9.3, location: '远程打卡' },
];

const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'LV-001', name: '刘洋', department: '物流部', type: '年假', startDate: '2026-03-13', endDate: '2026-03-14', days: 2, reason: '个人事务', status: 'approved', approver: '陈经理' },
  { id: 'LV-002', name: '张伟', department: '销售部', type: '事假', startDate: '2026-03-17', endDate: '2026-03-17', days: 1, reason: '家中有事', status: 'pending', approver: '王经理' },
  { id: 'LV-003', name: '李娜', department: '采购部', type: '出差', startDate: '2026-03-20', endDate: '2026-03-25', days: 5, reason: '印尼供应商考察', status: 'approved', approver: '赵总监' },
  { id: 'LV-004', name: '赵磊', department: 'IT部门', type: '调休', startDate: '2026-03-18', endDate: '2026-03-18', days: 1, reason: '加班调休', status: 'pending', approver: '孙经理' },
  { id: 'LV-005', name: '陈芳', department: '行政部', type: '病假', startDate: '2026-03-15', endDate: '2026-03-16', days: 2, reason: '感冒就医', status: 'approved', approver: '周主管' },
  { id: 'LV-006', name: '周明', department: '人力资源部', type: '婚假', startDate: '2026-03-10', endDate: '2026-03-20', days: 10, reason: '结婚', status: 'approved', approver: '李总' },
];

const CALENDAR_DAYS = (() => {
  // March 2026 calendar
  const days = [];
  // March 1 is Sunday (index 0)
  for (let i = 0; i < 0; i++) days.push({ day: 0, type: 'empty' as const });
  for (let d = 1; d <= 31; d++) {
    const dow = (d - 1) % 7; // simplified
    const isWeekend = dow === 6 || dow === 0;
    let type: 'normal' | 'weekend' | 'today' | 'empty' = 'normal';
    if (d === 13) type = 'today';
    else if (isWeekend) type = 'weekend';
    days.push({ day: d, type });
  }
  return days;
})();

const STATUS_MAP = {
  normal: { label: { en: 'Normal', zh: '正常' }, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  late: { label: { en: 'Late', zh: '迟到' }, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  early: { label: { en: 'Early Leave', zh: '早退' }, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  absent: { label: { en: 'Absent', zh: '缺勤' }, color: 'text-red-400', bg: 'bg-red-500/20' },
  leave: { label: { en: 'On Leave', zh: '请假' }, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  overtime: { label: { en: 'Overtime', zh: '加班' }, color: 'text-purple-400', bg: 'bg-purple-500/20' },
};

const WEEKLY_DATA = [
  { day: '周一', attendance: 95, overtime: 12 },
  { day: '周二', attendance: 97, overtime: 8 },
  { day: '周三', attendance: 93, overtime: 15 },
  { day: '周四', attendance: 96, overtime: 10 },
  { day: '周五', attendance: 91, overtime: 6 },
];

const MONTHLY_TREND = [
  { month: '10月', rate: 94.2 },
  { month: '11月', rate: 95.1 },
  { month: '12月', rate: 93.8 },
  { month: '1月', rate: 96.0 },
  { month: '2月', rate: 92.5 },
  { month: '3月', rate: 94.8 },
];

const LEAVE_TYPE_PIE = [
  { name: '年假', value: 35, color: '#3b82f6' },
  { name: '事假', value: 20, color: '#f59e0b' },
  { name: '病假', value: 15, color: '#ef4444' },
  { name: '调休', value: 18, color: '#8b5cf6' },
  { name: '出差', value: 8, color: '#22c55e' },
  { name: '其他', value: 4, color: '#6b7280' },
];

export function Attendance({ currentLanguage }: AttendanceProps) {
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'calendar' as TabType, label: { en: 'Calendar', zh: '考勤日历' }, icon: Calendar },
    { id: 'records' as TabType, label: { en: 'Records', zh: '打卡记录' }, icon: Clock },
    { id: 'leave' as TabType, label: { en: 'Leave', zh: '请假管理' }, icon: FileText },
    { id: 'statistics' as TabType, label: { en: 'Statistics', zh: '出勤统计' }, icon: BarChart3 },
  ];

  const totalEmployees = 156;
  const presentToday = ATTENDANCE_RECORDS.filter(r => r.status !== 'absent' && r.status !== 'leave').length;
  const lateToday = ATTENDANCE_RECORDS.filter(r => r.status === 'late').length;
  const onLeaveToday = ATTENDANCE_RECORDS.filter(r => r.status === 'leave').length;

  const WEEKDAYS = isZh ? ['日', '一', '二', '三', '四', '五', '六'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-cyan-500/20">
          <Clock className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl text-white">{isZh ? '考勤管理' : 'Attendance Management'}</h1>
          <p className="text-sm text-gray-400">{isZh ? '排班与出勤统计管理' : 'Scheduling & attendance statistics'}</p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '今日出勤' : 'Present Today', value: `${presentToday}/${totalEmployees}`, icon: CheckCircle2, gradient: 'from-emerald-500 to-green-500' },
          { label: isZh ? '迟到' : 'Late', value: lateToday.toString(), icon: AlertTriangle, gradient: 'from-amber-500 to-orange-500' },
          { label: isZh ? '请假' : 'On Leave', value: onLeaveToday.toString(), icon: Plane, gradient: 'from-blue-500 to-indigo-500' },
          { label: isZh ? '月出勤率' : 'Monthly Rate', value: '94.8%', icon: TrendingUp, gradient: 'from-purple-500 to-pink-500' },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div key={idx} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-80 flex items-center justify-center`}>
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
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <TabIcon className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ChevronLeft className="w-5 h-5" /></button>
              <h3 className="text-white">{isZh ? '2026年3月' : 'March 2026'}</h3>
              <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ChevronRight className="w-5 h-5" /></button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {WEEKDAYS.map((d, i) => (
                <div key={i} className="text-center text-xs text-gray-500 py-1">{d}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {CALENDAR_DAYS.map((cell, idx) => {
                if (cell.day === 0) return <div key={idx} />;
                const isToday = cell.type === 'today';
                const isWeekend = cell.type === 'weekend';
                return (
                  <div key={idx} className={`h-16 rounded-xl p-2 text-center cursor-pointer transition-all ${
                    isToday ? 'bg-cyan-500/20 border border-cyan-500/40' :
                    isWeekend ? 'bg-slate-800/20' :
                    'bg-slate-900/30 hover:bg-white/5'
                  }`}>
                    <span className={`text-sm ${isToday ? 'text-cyan-400' : isWeekend ? 'text-gray-600' : 'text-gray-300'}`}>{cell.day}</span>
                    {!isWeekend && cell.day <= 13 && cell.day > 0 && (
                      <div className="mt-1 flex justify-center space-x-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" title={isZh ? '正常' : 'Normal'} />
                        {cell.day % 5 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" title={isZh ? '迟到' : 'Late'} />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center space-x-4 justify-center">
              {[
                { label: isZh ? '正常' : 'Normal', color: 'bg-emerald-500' },
                { label: isZh ? '迟到/早退' : 'Late/Early', color: 'bg-amber-500' },
                { label: isZh ? '缺勤' : 'Absent', color: 'bg-red-500' },
                { label: isZh ? '请假' : 'Leave', color: 'bg-blue-500' },
              ].map((l, i) => (
                <div key={i} className="flex items-center space-x-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  <span className="text-xs text-gray-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Records Tab */}
      {activeTab === 'records' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <p className="text-sm text-gray-400">{isZh ? '2026-03-13 打卡记录' : '2026-03-13 Attendance Records'}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '姓名' : 'Name'}</th>
                  <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '部门' : 'Dept'}</th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '上班打卡' : 'Clock In'}</th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '下班打卡' : 'Clock Out'}</th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '工时' : 'Hours'}</th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '状态' : 'Status'}</th>
                  <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '打卡方式' : 'Location'}</th>
                </tr>
              </thead>
              <tbody>
                {ATTENDANCE_RECORDS.map(record => {
                  const sm = STATUS_MAP[record.status];
                  return (
                    <tr key={record.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-slate-700/60 flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                          </div>
                          <span className="text-sm text-white">{record.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{record.department}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-sm ${record.status === 'late' ? 'text-amber-400' : 'text-white'}`}>
                          {record.clockIn}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-sm ${record.status === 'early' ? 'text-orange-400' : 'text-white'}`}>
                          {record.clockOut}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-sm ${record.hours > 10 ? 'text-purple-400' : 'text-white'}`}>
                          {record.hours > 0 ? record.hours.toFixed(1) : '-'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sm.bg} ${sm.color}`}>
                          {isZh ? sm.label.zh : sm.label.en}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-500">{record.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leave Tab */}
      {activeTab === 'leave' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">{isZh ? `共 ${LEAVE_REQUESTS.length} 条请假记录` : `${LEAVE_REQUESTS.length} leave requests`}</p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm">
              <FileText className="w-4 h-4" />
              <span>{isZh ? '申请请假' : 'Request Leave'}</span>
            </button>
          </div>

          {LEAVE_REQUESTS.map(req => {
            const statusConf = {
              pending: { label: isZh ? '待审批' : 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/20' },
              approved: { label: isZh ? '已批准' : 'Approved', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
              rejected: { label: isZh ? '已驳回' : 'Rejected', color: 'text-red-400', bg: 'bg-red-500/20' },
            }[req.status];

            return (
              <div key={req.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white">{req.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300">{req.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusConf.bg} ${statusConf.color}`}>{statusConf.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{req.department} · {isZh ? '审批人：' : 'Approver: '}{req.approver}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-white">{req.days}<span className="text-sm text-gray-500">{isZh ? '天' : 'd'}</span></p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{req.startDate} ~ {req.endDate}</span>
                    <span>{req.reason}</span>
                  </div>
                  {req.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button className="text-xs px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30">
                        {isZh ? '批准' : 'Approve'}
                      </button>
                      <button className="text-xs px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30">
                        {isZh ? '驳回' : 'Reject'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '本周出勤率 & 加班人数' : 'Weekly Attendance & Overtime'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={WEEKLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="attendance" fill="#06b6d4" radius={[4, 4, 0, 0]} name={isZh ? '出勤率%' : 'Attendance %'} />
                    <Bar dataKey="overtime" fill="#8b5cf6" radius={[4, 4, 0, 0]} name={isZh ? '加班人数' : 'Overtime'} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '月度出勤率趋势 (%)' : 'Monthly Attendance Rate (%)'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <LineChart data={MONTHLY_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[90, 100]} />
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Line type="monotone" dataKey="rate" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 5, strokeWidth: 2, stroke: '#1e293b' }} name={isZh ? '出勤率' : 'Rate %'} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <h3 className="text-white mb-4">{isZh ? '请假类型分布' : 'Leave Type Distribution'}</h3>
              <div className="h-52 flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie data={LEAVE_TYPE_PIE} cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={3} dataKey="value">
                        {LEAVE_TYPE_PIE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-2">
                  {LEAVE_TYPE_PIE.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-xs text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400 text-sm">{isZh ? '月均加班时长' : 'Avg. Monthly OT'}</span>
              </div>
              <p className="text-3xl text-white">18.5<span className="text-lg text-gray-500">{isZh ? '小时/人' : 'h/person'}</span></p>
              <p className="text-xs text-red-400 mt-2">+2.3h {isZh ? '较上月' : 'vs last month'}</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{isZh ? '加班最多' : 'Top OT'}: IT部门</span>
                  <span>28.5h</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-gray-400 text-sm">{isZh ? '异常考勤' : 'Anomalies'}</span>
              </div>
              <p className="text-3xl text-white">8</p>
              <p className="text-xs text-gray-500 mt-2">{isZh ? '本月累计' : 'This month'}</p>
              <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{isZh ? '迟到' : 'Late'}</span>
                  <span className="text-amber-400">5</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{isZh ? '早退' : 'Early'}</span>
                  <span className="text-orange-400">2</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{isZh ? '缺勤' : 'Absent'}</span>
                  <span className="text-red-400">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
