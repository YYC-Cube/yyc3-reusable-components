import React, { useState } from 'react';
import {
  MessageSquare, Brain, Sparkles, FileText, Search, Users,
  CheckCircle2, AlertTriangle, BarChart3, Target, Zap, Globe,
  ArrowUpRight, Clock, Eye, Layers, Star, TrendingUp,
  ThumbsUp, ThumbsDown, Activity, Hash
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface SmartNLPProps { currentLanguage: string; }
type TabType = 'analysis' | 'extraction' | 'sentiment' | 'engine';

interface TextAnalysis {
  id: string;
  source: string;
  text: string;
  entities: { text: string; type: string; color: string }[];
  intent: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  keywords: string[];
}

const ANALYSES: TextAnalysis[] = [
  {
    id: 'NLP-001', source: '客户邮件',
    text: '你好，我们宁波精工电子需要采购500吨高纯度废铜线（纯度>99.5%），希望Q2开始供货，月供约150吨，价格能否参考LME+加工费模式？请尽快回复报价。',
    entities: [
      { text: '宁波精工电子', type: '客户', color: 'text-blue-400' },
      { text: '500吨', type: '数量', color: 'text-emerald-400' },
      { text: '高纯度废铜线', type: '产品', color: 'text-amber-400' },
      { text: 'Q2', type: '时间', color: 'text-purple-400' },
      { text: 'LME+加工费', type: '定价模式', color: 'text-pink-400' },
    ],
    intent: '采购询价',
    sentiment: 'positive',
    confidence: 97,
    keywords: ['废铜线', '高纯度', 'Q2', 'LME', '报价'],
  },
  {
    id: 'NLP-002', source: '供应商通知',
    text: '受国际铜价波动影响，我司废铜6#光亮线出厂价自3月15日起上调¥800/吨，请知悉。另外，3月底将进行年度设备检修，预计停产5天，可能影响4月初的交付时间。',
    entities: [
      { text: '¥800/吨', type: '价格变动', color: 'text-red-400' },
      { text: '3月15日', type: '时间', color: 'text-purple-400' },
      { text: '废铜6#光亮线', type: '产品', color: 'text-amber-400' },
      { text: '停产5天', type: '风险', color: 'text-red-400' },
      { text: '4月初', type: '时间', color: 'text-purple-400' },
    ],
    intent: '价格调整通知',
    sentiment: 'negative',
    confidence: 95,
    keywords: ['涨价', '停产', '交付延迟', '铜价波动'],
  },
  {
    id: 'NLP-003', source: '行业资讯',
    text: '2026年Q1全球废金属回收量同比增长8.5%，其中中国市场贡献了全球增量的42%。新能源汽车报废潮带动铝合金回收需求激增，预计Q2-Q3将持续高位运行。',
    entities: [
      { text: '8.5%', type: '增长率', color: 'text-emerald-400' },
      { text: '42%', type: '市场份额', color: 'text-blue-400' },
      { text: '新能源汽车', type: '行业', color: 'text-amber-400' },
      { text: '铝合金', type: '产品', color: 'text-amber-400' },
    ],
    intent: '行业趋势',
    sentiment: 'positive',
    confidence: 92,
    keywords: ['废金属回收', '新能源汽车', '铝合金', '增长'],
  },
];

const SENTIMENT_WEEKLY = [
  { day: '周一', positive: 65, neutral: 25, negative: 10 },
  { day: '周二', positive: 58, neutral: 28, negative: 14 },
  { day: '周三', positive: 72, neutral: 20, negative: 8 },
  { day: '周四', positive: 60, neutral: 30, negative: 10 },
  { day: '周五', positive: 55, neutral: 25, negative: 20 },
];

const INTENT_PIE = [
  { name: '采购询价', value: 32, color: '#3b82f6' },
  { name: '订单查询', value: 25, color: '#22c55e' },
  { name: '价格咨询', value: 18, color: '#f59e0b' },
  { name: '投诉反馈', value: 12, color: '#ef4444' },
  { name: '合同咨询', value: 8, color: '#8b5cf6' },
  { name: '其他', value: 5, color: '#6b7280' },
];

const MODEL_RADAR = [
  { metric: '实体识别', score: 96, fullMark: 100 },
  { metric: '意图分类', score: 94, fullMark: 100 },
  { metric: '情感分析', score: 91, fullMark: 100 },
  { metric: '关键词提取', score: 97, fullMark: 100 },
  { metric: '文本摘要', score: 89, fullMark: 100 },
  { metric: '多语言', score: 85, fullMark: 100 },
];

export function SmartNLP({ currentLanguage }: SmartNLPProps) {
  const [activeTab, setActiveTab] = useState<TabType>('analysis');
  const [expandedItem, setExpandedItem] = useState<string | null>('NLP-001');
  const isZh = currentLanguage === 'zh';

  const tabs = [
    { id: 'analysis' as TabType, label: { en: 'Text Analysis', zh: '文本分析' }, icon: FileText },
    { id: 'extraction' as TabType, label: { en: 'Entity Extract', zh: '实体提取' }, icon: Hash },
    { id: 'sentiment' as TabType, label: { en: 'Sentiment', zh: '情感分析' }, icon: ThumbsUp },
    { id: 'engine' as TabType, label: { en: 'NLP Engine', zh: 'NLP引擎' }, icon: Brain },
  ];

  const sentimentConf = {
    positive: { label: isZh ? '正面' : 'Positive', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    neutral: { label: isZh ? '中性' : 'Neutral', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    negative: { label: isZh ? '负面' : 'Negative', color: 'text-red-400', bg: 'bg-red-500/20' },
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-green-500/20">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white flex items-center space-x-2"><span>{isZh ? '自然语言处理' : 'Natural Language Processing'}</span><Sparkles className="w-5 h-5 text-green-400 animate-pulse" /></h1>
            <p className="text-sm text-gray-400">{isZh ? '文本理解·实体提取·意图识别·情感分析' : 'Text understanding · NER · Intent · Sentiment'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '今日处理文本' : 'Texts Today', value: '1,286', icon: FileText, gradient: 'from-green-500 to-emerald-500', sub: '+18% MoM' },
          { label: isZh ? '实体识别准确率' : 'NER Accuracy', value: '96.2%', icon: Target, gradient: 'from-blue-500 to-indigo-500', sub: '+1.5% MoM' },
          { label: isZh ? '意图分类准确率' : 'Intent Accuracy', value: '94.8%', icon: Brain, gradient: 'from-purple-500 to-pink-500', sub: '+2.1% MoM' },
          { label: isZh ? '正面情感占比' : 'Positive Rate', value: '62%', icon: ThumbsUp, gradient: 'from-emerald-500 to-green-500', sub: isZh ? '行业平均55%' : 'Avg 55%' },
        ].map((s, i) => { const I = s.icon; return (
          <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-2xl text-white mt-1">{s.value}</p><p className="text-xs text-emerald-400 mt-1">{s.sub}</p></div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} opacity-80 flex items-center justify-center`}><I className="w-5 h-5 text-white" /></div>
            </div>
          </div>
        ); })}
      </div>

      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => { const T = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <T className="w-4 h-4" /><span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span>
          </button>
        ); })}
      </div>

      {activeTab === 'analysis' && (
        <div className="space-y-4">
          {ANALYSES.map(a => {
            const sc = sentimentConf[a.sentiment];
            const isExpanded = expandedItem === a.id;
            return (
              <div key={a.id} onClick={() => setExpandedItem(isExpanded ? null : a.id)}
                className={`bg-slate-800/40 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${isExpanded ? 'border-green-500/30 shadow-lg shadow-green-500/5' : 'border-white/5 hover:border-white/10'}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-300">{a.source}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{a.intent}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span>
                    </div>
                    <span className="text-xs text-gray-500">AI {isZh ? '置信度' : 'Conf.'} {a.confidence}%</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{a.text}</p>
                </div>
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-2">{isZh ? '实体识别结果' : 'Named Entities'}</p>
                      <div className="flex flex-wrap gap-2">
                        {a.entities.map((e, i) => (
                          <span key={i} className={`text-xs px-3 py-1.5 rounded-lg bg-slate-900/40 border border-white/5 ${e.color}`}>
                            <span className="text-gray-500 mr-1">[{e.type}]</span>{e.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">{isZh ? '关键词' : 'Keywords'}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {a.keywords.map((k, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">#{k}</span>
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

      {activeTab === 'extraction' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '实体提取统计（本月）' : 'Entity Extraction Stats (Month)'}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { type: isZh ? '客户名称' : 'Customer', count: 856, accuracy: 98.2, color: 'text-blue-400' },
              { type: isZh ? '产品名称' : 'Product', count: 1243, accuracy: 96.8, color: 'text-amber-400' },
              { type: isZh ? '数量/规格' : 'Quantity', count: 980, accuracy: 95.5, color: 'text-emerald-400' },
              { type: isZh ? '价格/金额' : 'Price', count: 672, accuracy: 97.1, color: 'text-red-400' },
              { type: isZh ? '日期/时间' : 'Date', count: 534, accuracy: 99.0, color: 'text-purple-400' },
              { type: isZh ? '地点/地址' : 'Location', count: 312, accuracy: 94.3, color: 'text-pink-400' },
            ].map((e, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                <p className={`text-xs ${e.color} mb-1`}>{e.type}</p>
                <p className="text-xl text-white">{e.count}</p>
                <p className="text-xs text-gray-500 mt-1">{isZh ? '准确率' : 'Acc.'} {e.accuracy}%</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/15">
            <p className="text-xs text-green-300"><Brain className="w-3 h-3 inline mr-1" />{isZh ? 'AI洞察：本月从客户邮件中自动提取采购意向126条，其中89条已自动创建线索并分配给销售团队，转化率达32%。建议优化"数量/规格"实体的提取规则，目前混合单位（吨/千克）的识别率偏低。' : 'AI extracted 126 purchase intents from emails, 89 auto-created as leads with 32% conversion. Suggest improving quantity/unit entity rules.'}</p>
          </div>
        </div>
      )}

      {activeTab === 'sentiment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '本周情感趋势' : 'Weekly Sentiment Trend'}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={SENTIMENT_WEEKLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="positive" fill="#22c55e" name={isZh ? '正面' : 'Positive'} stackId="a" />
                  <Bar dataKey="neutral" fill="#6b7280" name={isZh ? '中性' : 'Neutral'} stackId="a" />
                  <Bar dataKey="negative" fill="#ef4444" name={isZh ? '负面' : 'Negative'} stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '意图分类分布' : 'Intent Distribution'}</h3>
            <div className="h-56 flex items-center">
              <div className="w-1/2 h-full"><ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}><PieChart><Pie data={INTENT_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">{INTENT_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} /></PieChart></ResponsiveContainer></div>
              <div className="w-1/2 space-y-2">{INTENT_PIE.map((e, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} /><span className="text-xs text-gray-300">{e.name}</span></div><span className="text-xs text-white">{e.value}%</span></div>))}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'engine' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? 'NLP模型能力雷达' : 'NLP Model Radar'}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <RadarChart data={MODEL_RADAR}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar dataKey="score" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
            <h3 className="text-white mb-4">{isZh ? '模型配置' : 'Model Config'}</h3>
            <div className="space-y-3">
              {[
                { name: isZh ? '基础语言模型' : 'Base LLM', value: 'YYC³-NLP-7B', status: 'active' },
                { name: isZh ? '行业微调版本' : 'Fine-tuned', value: 'ScrapMetal-NLP-v3.2', status: 'active' },
                { name: isZh ? '支持语言' : 'Languages', value: isZh ? '中文、英文、越南语' : 'CN, EN, VN', status: 'active' },
                { name: isZh ? '推理延迟' : 'Latency', value: '28ms (P95)', status: 'active' },
                { name: isZh ? '日处理容量' : 'Daily Cap', value: '50,000 texts', status: 'active' },
                { name: isZh ? '模型更新频率' : 'Update Freq', value: isZh ? '每周增量训练' : 'Weekly incremental', status: 'active' },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30 border border-white/5">
                  <span className="text-sm text-gray-400">{c.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">{c.value}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
