import React, { useState } from 'react';
import {
  Database,
  Brain,
  Sparkles,
  Server,
  HardDrive,
  Activity,
  Shield,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Clock,
  RefreshCw,
  Layers,
  Zap,
  Eye,
  Settings,
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

interface DataManagementProps {
  currentLanguage: string;
}
type TabType = 'sources' | 'quality' | 'backup' | 'analytics';

const DATA_SOURCES = [
  {
    name: 'PostgreSQL 主库',
    type: 'postgresql',
    status: 'connected',
    size: '128GB',
    records: '2.8M',
    uptime: '99.97%',
    latency: '3ms',
  },
  {
    name: 'Redis 缓存',
    type: 'redis',
    status: 'connected',
    size: '8GB',
    records: '156K',
    uptime: '99.99%',
    latency: '0.5ms',
  },
  {
    name: 'MongoDB 文档库',
    type: 'mongodb',
    status: 'connected',
    size: '45GB',
    records: '890K',
    uptime: '99.95%',
    latency: '5ms',
  },
  {
    name: 'Kafka 消息队列',
    type: 'kafka',
    status: 'connected',
    size: '-',
    records: '50K/min',
    uptime: '99.98%',
    latency: '2ms',
  },
  {
    name: 'OSS 对象存储',
    type: 'oss',
    status: 'connected',
    size: '2.1TB',
    records: '85K文件',
    uptime: '99.99%',
    latency: '15ms',
  },
  {
    name: '数据仓库(ClickHouse)',
    type: 'clickhouse',
    status: 'warning',
    size: '580GB',
    records: '12M',
    uptime: '99.90%',
    latency: '120ms',
  },
];

const QUALITY_SCORES = [
  { dim: '完整性', score: 96.2 },
  { dim: '准确性', score: 98.5 },
  { dim: '一致性', score: 94.8 },
  { dim: '时效性', score: 97.1 },
  { dim: '唯一性', score: 99.2 },
  { dim: '合规性', score: 95.5 },
];

const STORAGE_PIE = [
  { name: '交易数据', value: 35, color: '#3b82f6' },
  { name: '客户数据', value: 20, color: '#22c55e' },
  { name: '文档附件', value: 25, color: '#f59e0b' },
  { name: '日志数据', value: 12, color: '#8b5cf6' },
  { name: '备份数据', value: 8, color: '#6b7280' },
];

export function DataManagement({ currentLanguage }: DataManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>('sources');
  const isZh = currentLanguage === 'zh';
  const tabs = [
    { id: 'sources' as TabType, label: { en: 'Sources', zh: '数据源' }, icon: Server },
    { id: 'quality' as TabType, label: { en: 'Quality', zh: '数据质量' }, icon: CheckCircle2 },
    { id: 'backup' as TabType, label: { en: 'Backup', zh: '备份恢复' }, icon: HardDrive },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '数据分析' }, icon: BarChart3 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-cyan-500/20">
          <Database className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl text-white flex items-center space-x-2">
            <span>{isZh ? '数据管理' : 'Data Management'}</span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </h1>
          <p className="text-sm text-gray-400">
            {isZh ? '数据源·质量治理·备份恢复·存储分析' : 'Sources · Quality · Backup · Storage'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '数据源' : 'Sources',
            value: DATA_SOURCES.length.toString(),
            icon: Server,
            gradient: 'from-cyan-500 to-blue-500',
            sub: `${DATA_SOURCES.filter((d) => d.status === 'connected').length} ${isZh ? '在线' : 'online'}`,
          },
          {
            label: isZh ? '总存储量' : 'Total Storage',
            value: '2.86TB',
            icon: HardDrive,
            gradient: 'from-blue-500 to-indigo-500',
            sub: isZh ? '使用率68%' : '68% used',
          },
          {
            label: isZh ? '数据质量分' : 'Quality Score',
            value: '96.9',
            icon: CheckCircle2,
            gradient: 'from-emerald-500 to-green-500',
            sub: '+1.2 MoM',
          },
          {
            label: isZh ? '最近备份' : 'Last Backup',
            value: isZh ? '2小时前' : '2h ago',
            icon: Shield,
            gradient: 'from-purple-500 to-pink-500',
            sub: isZh ? '自动备份' : 'Auto backup',
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
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'sources' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-gray-500 py-3 px-4">
                    {isZh ? '数据源' : 'Source'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '状态' : 'Status'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '容量' : 'Size'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '记录数' : 'Records'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '可用率' : 'Uptime'}
                  </th>
                  <th className="text-center text-xs text-gray-500 py-3 px-4">
                    {isZh ? '延迟' : 'Latency'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {DATA_SOURCES.map((ds, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 px-4">
                      <p className="text-sm text-white">{ds.name}</p>
                      <p className="text-xs text-gray-500">{ds.type}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${ds.status === 'connected' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}
                      >
                        {ds.status === 'connected'
                          ? isZh
                            ? '已连接'
                            : 'Connected'
                          : isZh
                            ? '警告'
                            : 'Warning'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-300">{ds.size}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-300">{ds.records}</td>
                    <td className="py-3 px-4 text-center text-sm text-emerald-400">{ds.uptime}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-300">{ds.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'quality' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">
            {isZh ? '数据质量六维评分' : 'Data Quality 6-Dimension Score'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {QUALITY_SCORES.map((q, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-center"
              >
                <p className="text-xs text-gray-500 mb-1">{q.dim}</p>
                <p
                  className={`text-2xl ${q.score >= 97 ? 'text-emerald-400' : q.score >= 95 ? 'text-blue-400' : 'text-amber-400'}`}
                >
                  {q.score}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="space-y-4">
          {[
            {
              name: isZh ? '全量备份' : 'Full Backup',
              schedule: isZh ? '每日 02:00' : 'Daily 02:00',
              last: '2026-03-13 02:05',
              size: '128GB',
              duration: '45min',
              status: 'success',
            },
            {
              name: isZh ? '增量备份' : 'Incremental',
              schedule: isZh ? '每小时' : 'Hourly',
              last: '2026-03-13 14:00',
              size: '2.3GB',
              duration: '3min',
              status: 'success',
            },
            {
              name: isZh ? '日志备份' : 'WAL/Binlog',
              schedule: isZh ? '实时' : 'Realtime',
              last: '2026-03-13 14:32',
              size: isZh ? '持续' : 'Streaming',
              duration: '-',
              status: 'running',
            },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white">{b.name}</h4>
                  <p className="text-xs text-gray-500">
                    {isZh ? '计划' : 'Schedule'}: {b.schedule} | {isZh ? '上次' : 'Last'}: {b.last}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-300">{b.size}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}
                  >
                    {b.status === 'success' ? '✓' : '●'} {b.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '存储分布' : 'Storage Distribution'}</h3>
          <div className="h-56 flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <PieChart>
                  <Pie
                    data={STORAGE_PIE}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {STORAGE_PIE.map((e, i) => (
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
              {STORAGE_PIE.map((e, i) => (
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
      )}
    </div>
  );
}
