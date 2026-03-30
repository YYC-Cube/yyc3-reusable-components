import React, { useState, useRef, useEffect } from 'react';
import {
  Bot, Brain, Sparkles, Send, MessageSquare, Users, Clock,
  ThumbsUp, ThumbsDown, Mic, Paperclip, Settings, BarChart3,
  Headphones, Star, CheckCircle2, XCircle, AlertTriangle,
  ArrowUpRight, Zap, Globe, Search, RefreshCw, Layers,
  Phone, Mail, FileText
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

interface SmartChatbotProps {
  currentLanguage: string;
}

type TabType = 'chat' | 'sessions' | 'knowledge' | 'analytics';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot' | 'system';
  content: string;
  timestamp: string;
  confidence?: number;
  source?: string;
}

interface Session {
  id: string;
  customer: string;
  channel: string;
  topic: string;
  status: 'active' | 'resolved' | 'escalated' | 'waiting';
  startTime: string;
  messages: number;
  satisfaction?: number;
  aiHandled: boolean;
}

const DEMO_MESSAGES: ChatMessage[] = [
  { id: '1', role: 'user', content: '你好，我想查一下废铜6#光亮线今天的报价', timestamp: '14:32' },
  { id: '2', role: 'bot', content: '您好！根据今日最新市场数据：\n\n📊 废铜6#光亮线报价：\n• 华东地区：¥68,200/吨（+0.8%）\n• 华南地区：¥68,500/吨（+0.6%）\n• 华北地区：¥67,900/吨（+0.9%）\n\n🔍 AI分析：短期铜价受LME涨势带动，预计未来3天维持上行通道。建议适量建仓。\n\n需要我为您生成详细报价单或联系采购专员吗？', timestamp: '14:32', confidence: 96, source: '市场数据中心' },
  { id: '3', role: 'user', content: '帮我查一下上海汇丰回收的账户余额和最近的订单状态', timestamp: '14:33' },
  { id: '4', role: 'bot', content: '已为您查询上海汇丰回收（客户ID: C-10086）：\n\n💰 账户信息：\n• 信用额度：¥500万\n• 已用额度：¥312万\n• 可用余额：¥188万\n• 应收账款：¥45.6万（逾期7天）\n\n📦 最新订单：\n• ORD-2026031201 废铜100吨 已发货（预计3/15到达）\n• ORD-2026030801 废铝50吨 已签收\n\n⚠️ AI提醒：该客户近30天互动下降60%，建议客户经理主动回访。流失预警风险已提升至45%。', timestamp: '14:33', confidence: 98, source: 'CRM系统+风控系统' },
  { id: '5', role: 'user', content: '帮我安排一个回访任务', timestamp: '14:34' },
  { id: '6', role: 'bot', content: '已为您创建回访任务：\n\n✅ 任务创建成功\n• 任务：上海汇丰回收客户回访\n• 负责人：王芳（客户经理）\n• 截止日期：2026-03-15\n• 优先级：高\n• 关联流程：客户挽回-WF-008\n\n已同步通知王芳，并将回访提醒添加到她的日历。需要我准备回访话术建议吗？', timestamp: '14:34', confidence: 94, source: '任务系统' },
];

const SESSIONS: Session[] = [
  { id: 'SS-001', customer: '宁波精工电子', channel: '微信', topic: '废铜报价咨询', status: 'active', startTime: '14:30', messages: 6, aiHandled: true },
  { id: 'SS-002', customer: '东莞鑫达制造', channel: '网站', topic: '订单物流查询', status: 'resolved', startTime: '14:15', messages: 4, satisfaction: 5, aiHandled: true },
  { id: 'SS-003', customer: '苏州联合金属', channel: '电话', topic: '合同条款咨询', status: 'escalated', startTime: '13:50', messages: 8, aiHandled: false },
  { id: 'SS-004', customer: '广州再生资源', channel: '钉钉', topic: '发票开具申请', status: 'resolved', startTime: '13:20', messages: 3, satisfaction: 4, aiHandled: true },
  { id: 'SS-005', customer: '山东恒信', channel: '微信', topic: '废铁质量投诉', status: 'waiting', startTime: '12:45', messages: 5, aiHandled: false },
  { id: 'SS-006', customer: '上海汇丰回收', channel: '网站', topic: '账户余额查询', status: 'resolved', startTime: '11:30', messages: 4, satisfaction: 5, aiHandled: true },
];

const KB_ITEMS = [
  { name: '产品知识库', docs: 1256, accuracy: 96.8, icon: '📦' },
  { name: '价格行情库', docs: 8420, accuracy: 98.2, icon: '💰' },
  { name: '客户FAQ库', docs: 342, accuracy: 94.5, icon: '❓' },
  { name: '流程规范库', docs: 178, accuracy: 97.1, icon: '📋' },
  { name: '政策法规库', docs: 89, accuracy: 99.0, icon: '⚖️' },
  { name: '物流查询库', docs: 2100, accuracy: 95.3, icon: '🚚' },
];

const HOURLY_STATS = [
  { hour: '08', sessions: 12, resolved: 10 },
  { hour: '09', sessions: 28, resolved: 25 },
  { hour: '10', sessions: 35, resolved: 30 },
  { hour: '11', sessions: 22, resolved: 20 },
  { hour: '12', sessions: 15, resolved: 14 },
  { hour: '13', sessions: 20, resolved: 18 },
  { hour: '14', sessions: 32, resolved: 28 },
];

const CHANNEL_PIE = [
  { name: '微信', value: 38, color: '#22c55e' },
  { name: '网站', value: 28, color: '#3b82f6' },
  { name: '钉钉', value: 18, color: '#f59e0b' },
  { name: '电话', value: 10, color: '#8b5cf6' },
  { name: '邮件', value: 6, color: '#ef4444' },
];

export function SmartChatbot({ currentLanguage }: SmartChatbotProps) {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isZh = currentLanguage === 'zh';

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, []);

  const tabs = [
    { id: 'chat' as TabType, label: { en: 'AI Chat', zh: 'AI对话' }, icon: MessageSquare },
    { id: 'sessions' as TabType, label: { en: 'Sessions', zh: '会话管理' }, icon: Headphones },
    { id: 'knowledge' as TabType, label: { en: 'Knowledge', zh: '知识库' }, icon: Brain },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '服务分析' }, icon: BarChart3 },
  ];

  const statusConf: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: isZh ? '进行中' : 'Active', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    resolved: { label: isZh ? '已解决' : 'Resolved', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    escalated: { label: isZh ? '已转人工' : 'Escalated', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    waiting: { label: isZh ? '等待中' : 'Waiting', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  };

  const channelIcon: Record<string, typeof Globe> = { '微信': Globe, '网站': Globe, '钉钉': Globe, '电话': Phone, '邮件': Mail };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-indigo-500/20">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2">
              <span>{isZh ? '智能客服' : 'Smart Customer Service'}</span>
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400">{isZh ? '全渠道AI客服·知识库·智能工单' : 'Omnichannel AI service · Knowledge base · Smart tickets'}</p>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '今日会话' : 'Today Sessions', value: '164', icon: MessageSquare, gradient: 'from-indigo-500 to-purple-500', sub: isZh ? '2个进行中' : '2 active' },
          { label: isZh ? 'AI解决率' : 'AI Resolve Rate', value: '86.7%', icon: Bot, gradient: 'from-emerald-500 to-green-500', sub: '+4.5% MoM' },
          { label: isZh ? '平均响应' : 'Avg Response', value: '1.2s', icon: Zap, gradient: 'from-amber-500 to-orange-500', sub: isZh ? '人工: 45s' : 'Human: 45s' },
          { label: isZh ? '满意度' : 'Satisfaction', value: '4.7/5', icon: Star, gradient: 'from-pink-500 to-rose-500', sub: '+0.3 MoM' },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
              <div className="flex items-start justify-between">
                <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-2xl text-white mt-1">{s.value}</p><p className="text-xs text-emerald-400 mt-1">{s.sub}</p></div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} opacity-80 flex items-center justify-center`}><I className="w-5 h-5 text-white" /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => { const T = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <T className="w-4 h-4" /><span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
          </button>
        ); })}
      </div>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 flex flex-col" style={{ height: '520px' }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {DEMO_MESSAGES.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-indigo-500/20 border-indigo-500/30' : 'bg-slate-700/30 border-white/5'} rounded-2xl border p-4`}>
                  {msg.role === 'bot' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs text-indigo-400">AI {isZh ? '助手' : 'Assistant'}</span>
                      {msg.confidence && <span className="text-xs text-gray-500">{isZh ? '置信度' : 'Conf.'} {msg.confidence}%</span>}
                    </div>
                  )}
                  <p className="text-sm text-gray-200 whitespace-pre-line">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    {msg.source && <span className="text-xs text-gray-600">{isZh ? '来源' : 'Source'}: {msg.source}</span>}
                    {msg.role === 'bot' && (
                      <div className="flex space-x-1">
                        <button className="p-1 rounded hover:bg-white/5"><ThumbsUp className="w-3 h-3 text-gray-500" /></button>
                        <button className="p-1 rounded hover:bg-white/5"><ThumbsDown className="w-3 h-3 text-gray-500" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center bg-slate-900/50 rounded-xl border border-white/10 px-4 py-3">
                <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}
                  placeholder={isZh ? '输入问题，AI为您解答...' : 'Ask AI anything...'}
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none" />
                <Mic className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white ml-2" />
                <Paperclip className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white ml-2" />
              </div>
              <button className="w-11 h-11 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center hover:opacity-90 transition-all">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '客户' : 'Customer'}</th>
                <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '渠道' : 'Channel'}</th>
                <th className="text-left text-xs text-gray-500 py-3 px-4">{isZh ? '主题' : 'Topic'}</th>
                <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '状态' : 'Status'}</th>
                <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '消息数' : 'Msgs'}</th>
                <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? 'AI处理' : 'AI'}</th>
                <th className="text-center text-xs text-gray-500 py-3 px-4">{isZh ? '满意度' : 'Rating'}</th>
              </tr></thead>
              <tbody>
                {SESSIONS.map(s => {
                  const sc = statusConf[s.status];
                  return (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-sm text-white">{s.customer}</td>
                      <td className="py-3 px-4 text-center text-xs text-gray-300">{s.channel}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{s.topic}</td>
                      <td className="py-3 px-4 text-center"><span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span></td>
                      <td className="py-3 px-4 text-center text-sm text-gray-400">{s.messages}</td>
                      <td className="py-3 px-4 text-center">{s.aiHandled ? <Bot className="w-4 h-4 text-indigo-400 mx-auto" /> : <Users className="w-4 h-4 text-amber-400 mx-auto" />}</td>
                      <td className="py-3 px-4 text-center">{s.satisfaction ? <span className="flex items-center justify-center space-x-1 text-amber-400"><Star className="w-3 h-3 fill-current" /><span className="text-xs">{s.satisfaction}</span></span> : <span className="text-xs text-gray-600">-</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Knowledge Tab */}
      {activeTab === 'knowledge' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {KB_ITEMS.map((kb, i) => (
            <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-indigo-500/20 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{kb.icon}</span>
                <div>
                  <h4 className="text-white">{kb.name}</h4>
                  <p className="text-xs text-gray-500">{kb.docs.toLocaleString()} {isZh ? '篇文档' : 'docs'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{isZh ? '命中准确率' : 'Accuracy'}</span>
                <span className="text-sm text-emerald-400">{kb.accuracy}%</span>
              </div>
              <div className="mt-2 w-full bg-slate-700/30 rounded-full h-1.5">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${kb.accuracy}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '今日会话趋势' : 'Today Sessions'}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <AreaChart data={HOURLY_STATS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="sessions" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} name={isZh ? '总会话' : 'Total'} />
                  <Area type="monotone" dataKey="resolved" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} name={isZh ? '已解决' : 'Resolved'} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '渠道分布' : 'Channel Distribution'}</h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie data={CHANNEL_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                      {CHANNEL_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-3">
                {CHANNEL_PIE.map((e, i) => (
                  <div key={i} className="flex items-center justify-between"><div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} /><span className="text-sm text-gray-300">{e.name}</span></div><span className="text-sm text-white">{e.value}%</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
