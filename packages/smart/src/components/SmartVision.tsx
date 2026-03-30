import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Brain,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
  Target,
  Zap,
  Eye,
  Layers,
  Activity,
  Settings,
  Clock,
  ArrowUpRight,
  Package,
  Shield,
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

interface SmartVisionProps {
  currentLanguage: string;
}
type TabType = 'detection' | 'quality' | 'safety' | 'analytics';

interface DetectionRecord {
  id: string;
  camera: string;
  line: string;
  timestamp: string;
  type: 'classification' | 'defect' | 'safety' | 'counting';
  result: string;
  confidence: number;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
}

const DETECTIONS: DetectionRecord[] = [
  {
    id: 'VD-001',
    camera: 'CAM-A1-01',
    line: '分拣线A1',
    timestamp: '14:32:15',
    type: 'classification',
    result: '废铜6#光亮线',
    confidence: 99.2,
    status: 'pass',
    detail: '纯度预估99.3%，分类正确，已自动分流至A类料仓',
  },
  {
    id: 'VD-002',
    camera: 'CAM-A1-02',
    line: '分拣线A1',
    timestamp: '14:31:48',
    type: 'defect',
    result: '检测到杂质',
    confidence: 96.8,
    status: 'warning',
    detail: '混入不锈钢碎片约0.5%，已触发二次分拣，影响品质评级',
  },
  {
    id: 'VD-003',
    camera: 'CAM-E1-01',
    line: 'AI检测台',
    timestamp: '14:31:20',
    type: 'classification',
    result: '6061铝合金',
    confidence: 98.5,
    status: 'pass',
    detail: '铝合金型号识别正确，含镁量预估0.9%，符合6061标准',
  },
  {
    id: 'VD-004',
    camera: 'CAM-B1-01',
    line: '破碎机B1',
    timestamp: '14:30:55',
    type: 'counting',
    result: '产出计数: 2,847件/h',
    confidence: 99.8,
    status: 'pass',
    detail: '粒度分布：<50mm占82%、50-100mm占15%、>100mm占3%',
  },
  {
    id: 'VD-005',
    camera: 'CAM-C1-01',
    line: '熔炼炉C1',
    timestamp: '14:30:10',
    type: 'safety',
    result: '安全正常',
    confidence: 97.5,
    status: 'pass',
    detail: '操作人员穿戴防护装备完整，安全距离合规',
  },
  {
    id: 'VD-006',
    camera: 'CAM-WH-01',
    line: '仓库入口',
    timestamp: '14:29:30',
    type: 'safety',
    result: '⚠️ 安全隐患',
    confidence: 94.2,
    status: 'fail',
    detail: '检测到叉车超速行驶（预估18km/h），已自动告警仓库主管',
  },
  {
    id: 'VD-007',
    camera: 'CAM-A1-03',
    line: '分拣线A1',
    timestamp: '14:28:45',
    type: 'classification',
    result: '黄铜（H62）',
    confidence: 97.8,
    status: 'pass',
    detail: '铜锌合金，锌含量预估38%，自动分流至黄铜料仓',
  },
  {
    id: 'VD-008',
    camera: 'CAM-E1-02',
    line: 'AI检测台',
    timestamp: '14:28:10',
    type: 'defect',
    result: '表面氧化严重',
    confidence: 93.5,
    status: 'warning',
    detail: '铝材表面氧化层>0.5mm，建议降级为B级品，需客户确认',
  },
];

const ACCURACY_TREND = [
  { date: '03-07', classification: 97.8, defect: 94.2, safety: 96.5 },
  { date: '03-08', classification: 98.1, defect: 95.0, safety: 97.0 },
  { date: '03-09', classification: 97.5, defect: 94.8, safety: 96.2 },
  { date: '03-10', classification: 98.5, defect: 95.5, safety: 97.3 },
  { date: '03-11', classification: 98.2, defect: 95.2, safety: 96.8 },
  { date: '03-12', classification: 98.8, defect: 96.0, safety: 97.5 },
  { date: '03-13', classification: 99.0, defect: 96.2, safety: 97.8 },
];

const DETECT_TYPE_PIE = [
  { name: '分类识别', value: 55, color: '#3b82f6' },
  { name: '缺陷检测', value: 20, color: '#f59e0b' },
  { name: '安全监控', value: 15, color: '#ef4444' },
  { name: '计数统计', value: 10, color: '#22c55e' },
];

const MATERIAL_STATS = [
  { material: '废铜', count: 3256, accuracy: 99.1 },
  { material: '废铝', count: 2180, accuracy: 98.5 },
  { material: '废钢', count: 1540, accuracy: 97.8 },
  { material: '黄铜', count: 890, accuracy: 97.2 },
  { material: '不锈钢', count: 650, accuracy: 96.5 },
];

export function SmartVision({ currentLanguage }: SmartVisionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('detection');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'detection' as TabType, label: { en: 'Detection', zh: '实时检测' }, icon: Camera },
    { id: 'quality' as TabType, label: { en: 'Quality', zh: '品质检测' }, icon: CheckCircle2 },
    { id: 'safety' as TabType, label: { en: 'Safety', zh: '安全监控' }, icon: Shield },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '视觉分析' }, icon: BarChart3 },
  ];

  const statusConf = {
    pass: {
      label: isZh ? '通过' : 'Pass',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      icon: CheckCircle2,
    },
    warning: {
      label: isZh ? '预警' : 'Warn',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      icon: AlertTriangle,
    },
    fail: {
      label: isZh ? '异常' : 'Fail',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      icon: XCircle,
    },
  };

  const typeConf = {
    classification: { label: isZh ? '分类' : 'Classify', color: 'text-blue-400' },
    defect: { label: isZh ? '缺陷' : 'Defect', color: 'text-amber-400' },
    safety: { label: isZh ? '安全' : 'Safety', color: 'text-red-400' },
    counting: { label: isZh ? '计数' : 'Count', color: 'text-green-400' },
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-orange-500/20">
            <ImageIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '图像识别' : 'Computer Vision'}</span>
              <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">
              {isZh
                ? 'AI视觉质检·材质识别·安全监控·产出计数'
                : 'AI visual QC · Material ID · Safety · Counting'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-emerald-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isZh ? '8个摄像头在线' : '8 cameras online'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isZh ? '今日检测量' : 'Detections',
            value: '8,516',
            icon: Camera,
            gradient: 'from-orange-500 to-red-500',
            sub: isZh ? '实时处理中' : 'Live processing',
          },
          {
            label: isZh ? '分类准确率' : 'Classification',
            value: '99.0%',
            icon: Target,
            gradient: 'from-blue-500 to-indigo-500',
            sub: '+0.8% MoM',
          },
          {
            label: isZh ? '缺陷检出率' : 'Defect Rate',
            value: '96.2%',
            icon: Eye,
            gradient: 'from-amber-500 to-orange-500',
            sub: isZh ? '漏检率<0.5%' : 'Miss <0.5%',
          },
          {
            label: isZh ? '安全事件' : 'Safety Events',
            value: '1',
            icon: Shield,
            gradient: 'from-red-500 to-pink-500',
            sub: isZh ? '今日已处理' : 'Handled today',
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
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <T className="w-4 h-4" />
              <span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'detection' && (
        <div className="space-y-3">
          {DETECTIONS.map((d) => {
            const sc = statusConf[d.status];
            const tc = typeConf[d.type];
            const SIcon = sc.icon;
            return (
              <div
                key={d.id}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-4 ${d.status === 'fail' ? 'border-red-500/20' : d.status === 'warning' ? 'border-amber-500/15' : 'border-white/5'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <SIcon className={`w-4 h-4 ${sc.color}`} />
                    <span className="text-sm text-white">{d.result}</span>
                    <span className={`text-xs ${tc.color}`}>{tc.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>
                      {sc.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{d.confidence}%</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{d.detail}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{d.camera}</span>
                  <span>{d.line}</span>
                  <span>{d.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'quality' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">
              {isZh ? '各材质识别统计' : 'Material Recognition Stats'}
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={MATERIAL_STATS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="material"
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
                    dataKey="count"
                    fill="#f59e0b"
                    name={isZh ? '检测次数' : 'Count'}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-orange-400" />
              <span>AI {isZh ? '��检洞察' : 'QC Insight'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                isZh
                  ? '今日废铜分拣中检测到3次不锈钢混入（总混入率0.3%），均已自动剔除。建议检查A1线上游料源的预处理环节。'
                  : 'Detected 3 stainless steel contaminations in copper sorting today (0.3%), all auto-rejected. Check upstream pre-processing.',
                isZh
                  ? '6061铝合金识别模型本周更新后准确率从97.2%提升至98.5%，主要改进了与7075铝合金的区分能力。'
                  : '6061 aluminum model updated, accuracy improved from 97.2% to 98.5%, better distinction from 7075.',
                isZh
                  ? '破碎机B1产出粒度>100mm占比上升至3%（上周1.8%），与刀片磨损相关，建议配合设备管理模块安排维护。'
                  : 'Shredder B1 >100mm particles rose to 3%, correlated with blade wear, coordinate with equipment maintenance.',
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/15"
                >
                  <p className="text-xs text-orange-300">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { zone: isZh ? '分拣车间' : 'Sorting', cameras: 3, status: 'normal', events: 0 },
              { zone: isZh ? '熔炼车间' : 'Melting', cameras: 2, status: 'normal', events: 0 },
              { zone: isZh ? '仓库区域' : 'Warehouse', cameras: 2, status: 'alert', events: 1 },
              { zone: isZh ? '装卸区' : 'Loading', cameras: 1, status: 'normal', events: 0 },
            ].map((z, i) => (
              <div
                key={i}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border p-5 ${z.status === 'alert' ? 'border-red-500/20' : 'border-white/5'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white">{z.zone}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${z.status === 'alert' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}
                  >
                    {z.status === 'alert' ? (isZh ? '告警' : 'Alert') : isZh ? '正常' : 'OK'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {z.cameras} {isZh ? '个摄像头' : 'cameras'} · {z.events}{' '}
                  {isZh ? '事件' : 'events'}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-3">{isZh ? '安全检测规则' : 'Safety Rules'}</h3>
            <div className="space-y-2">
              {[
                {
                  rule: isZh ? 'PPE穿戴检测' : 'PPE Detection',
                  desc: isZh ? '检测安全帽、防护手套、反光背心' : 'Hard hat, gloves, hi-vis vest',
                  accuracy: 97.8,
                },
                {
                  rule: isZh ? '叉车限速监控' : 'Forklift Speed',
                  desc: isZh ? '仓库区限速10km/h' : 'Warehouse limit 10km/h',
                  accuracy: 96.5,
                },
                {
                  rule: isZh ? '安全距离监控' : 'Safe Distance',
                  desc: isZh ? '熔炼炉2米安全线' : 'Furnace 2m safety line',
                  accuracy: 95.2,
                },
                {
                  rule: isZh ? '入侵检测' : 'Intrusion',
                  desc: isZh ? '非工作时间异常人员检测' : 'After-hours intrusion detection',
                  accuracy: 98.5,
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30 border border-white/5"
                >
                  <div>
                    <p className="text-sm text-white">{r.rule}</p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                  <span className="text-xs text-emerald-400">{r.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '准确率趋势' : 'Accuracy Trend'}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <AreaChart data={ACCURACY_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    domain={[92, 100]}
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
                    dataKey="classification"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    name={isZh ? '分类' : 'Classify'}
                  />
                  <Area
                    type="monotone"
                    dataKey="defect"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.1}
                    name={isZh ? '缺陷' : 'Defect'}
                  />
                  <Area
                    type="monotone"
                    dataKey="safety"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.1}
                    name={isZh ? '安全' : 'Safety'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '检测类型分布' : 'Detection Types'}</h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={DETECT_TYPE_PIE}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {DETECT_TYPE_PIE.map((e, i) => (
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
                {DETECT_TYPE_PIE.map((e, i) => (
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
        </div>
      )}
    </div>
  );
}
