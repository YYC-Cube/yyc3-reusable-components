import React, { useState } from 'react';
import { FileSignature, Brain, Sparkles, FileText, Search, Users, CheckCircle2, Clock, BarChart3, Eye, Edit3, Download, Layers, Zap, Star, Lock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SmartDocsProps { currentLanguage: string; }
type TabType = 'documents' | 'templates' | 'ai' | 'analytics';

const DOCUMENTS = [
  { id: 'DOC-001', name: '废铜采购框架协议-华东铜业', type: '合同', status: 'active', version: 'v3.2', author: '法务部', updated: '2026-03-10', size: '2.4MB', aiGenerated: false },
  { id: 'DOC-002', name: 'Q1业绩总结报告', type: '报告', status: 'final', version: 'v1.0', author: '运营部', updated: '2026-03-11', size: '5.8MB', aiGenerated: true },
  { id: 'DOC-003', name: '越南TPC供应商考察方案', type: '方案', status: 'draft', version: 'v0.3', author: '采购部', updated: '2026-03-13', size: '1.2MB', aiGenerated: false },
  { id: 'DOC-004', name: '2026年安全生产管理制度', type: '制度', status: 'active', version: 'v2.0', author: '安全部', updated: '2026-02-28', size: '890KB', aiGenerated: false },
  { id: 'DOC-005', name: '客户信用评级标准(AI辅助)', type: '标准', status: 'review', version: 'v1.1', author: 'AI+风控部', updated: '2026-03-12', size: '1.5MB', aiGenerated: true },
  { id: 'DOC-006', name: '废金属分类质检手册', type: '手册', status: 'active', version: 'v4.0', author: '质检部', updated: '2026-03-05', size: '8.2MB', aiGenerated: false },
];

const TEMPLATES = [
  { name: '采购合同模板', usage: 156, rating: 4.8 },
  { name: '销售报价单模板', usage: 230, rating: 4.6 },
  { name: '月度报告模板', usage: 48, rating: 4.9 },
  { name: '出库单模板', usage: 890, rating: 4.5 },
];

const DOC_TYPE_PIE = [
  { name: '合同', value: 35, color: '#3b82f6' },
  { name: '报告', value: 22, color: '#22c55e' },
  { name: '方案', value: 15, color: '#f59e0b' },
  { name: '制度', value: 12, color: '#8b5cf6' },
  { name: '手册', value: 10, color: '#ef4444' },
  { name: '其他', value: 6, color: '#6b7280' },
];

export function SmartDocs({ currentLanguage }: SmartDocsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('documents');
  const isZh = currentLanguage === 'zh';
  const tabs = [
    { id: 'documents' as TabType, label: { en: 'Documents', zh: '文档库' }, icon: FileText },
    { id: 'templates' as TabType, label: { en: 'Templates', zh: '模板库' }, icon: Layers },
    { id: 'ai' as TabType, label: { en: 'AI Writer', zh: 'AI写作' }, icon: Brain },
    { id: 'analytics' as TabType, label: { en: 'Analytics', zh: '文档分析' }, icon: BarChart3 },
  ];
  const statusConf: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: isZh ? '生效中' : 'Active', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    draft: { label: isZh ? '草稿' : 'Draft', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    review: { label: isZh ? '审核中' : 'Review', color: 'text-amber-400', bg: 'bg-amber-500/20' },
    final: { label: isZh ? '终版' : 'Final', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 opacity-90 flex items-center justify-center border border-white/20 shadow-lg shadow-violet-500/20"><FileSignature className="w-7 h-7 text-white" /></div>
        <div><h1 className="text-2xl text-white flex items-center space-x-2"><span>{isZh ? '智能文档' : 'Smart Documents'}</span><Sparkles className="w-5 h-5 text-violet-400 animate-pulse" /></h1><p className="text-sm text-gray-400">{isZh ? 'AI文档生成·版本管理·智能模板·协同编辑' : 'AI doc generation · Versioning · Templates · Collaboration'}</p></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isZh ? '文档总数' : 'Documents', value: '1,286', icon: FileText, gradient: 'from-violet-500 to-purple-500', sub: isZh ? '本月+48' : '+48 this month' },
          { label: isZh ? 'AI生成文档' : 'AI Generated', value: '126', icon: Brain, gradient: 'from-blue-500 to-indigo-500', sub: isZh ? '占比9.8%' : '9.8% of total' },
          { label: isZh ? '模板使用次数' : 'Template Uses', value: '1,324', icon: Layers, gradient: 'from-emerald-500 to-green-500', sub: isZh ? '本月' : 'This month' },
          { label: isZh ? '协作编辑' : 'Collaborating', value: '8', icon: Users, gradient: 'from-amber-500 to-orange-500', sub: isZh ? '人正在编辑' : 'editing now' },
        ].map((s, i) => { const I = s.icon; return (
          <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4"><div className="flex items-start justify-between"><div><p className="text-xs text-gray-500">{s.label}</p><p className="text-2xl text-white mt-1">{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.sub}</p></div><div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} opacity-80 flex items-center justify-center`}><I className="w-5 h-5 text-white" /></div></div></div>
        ); })}
      </div>

      <div className="flex space-x-1 p-1 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/5">
        {tabs.map(tab => { const T = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-white border border-violet-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><T className="w-4 h-4" /><span className="text-sm">{isZh ? tab.label.zh : tab.label.en}</span></button>
        ); })}
      </div>

      {activeTab === 'documents' && (
        <div className="space-y-3">
          {DOCUMENTS.map(doc => {
            const sc = statusConf[doc.status];
            return (
              <div key={doc.id} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-violet-500/20 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white text-sm">{doc.name}</h4>
                      {doc.aiGenerated && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300"><Brain className="w-3 h-3 inline mr-0.5" />AI</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>{sc.label}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{doc.type}</span><span>{doc.version}</span><span>{doc.author}</span><span>{doc.updated}</span><span>{doc.size}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1.5 rounded-lg hover:bg-white/5"><Eye className="w-4 h-4 text-gray-400" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-white/5"><Download className="w-4 h-4 text-gray-400" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((t, i) => (
            <div key={i} className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
              <div className="flex items-center justify-between"><h4 className="text-white">{t.name}</h4><div className="flex items-center space-x-1 text-amber-400"><Star className="w-3 h-3 fill-current" /><span className="text-sm">{t.rating}</span></div></div>
              <p className="text-xs text-gray-500 mt-1">{isZh ? '使用次数' : 'Uses'}: {t.usage}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
          <h3 className="text-white flex items-center space-x-2 mb-4"><Brain className="w-5 h-5 text-violet-400" /><span>AI {isZh ? '文档助手' : 'Doc Assistant'}</span></h3>
          <div className="h-48 bg-slate-900/40 rounded-xl border border-dashed border-white/10 flex items-center justify-center mb-4">
            <div className="text-center"><FileSignature className="w-10 h-10 text-gray-600 mx-auto mb-2" /><p className="text-gray-500 text-sm">{isZh ? '描述需求，AI为您生成文档' : 'Describe your needs, AI generates docs'}</p>
              <button className="mt-3 px-4 py-2 bg-violet-500/20 text-violet-300 rounded-lg border border-violet-500/30 text-sm"><Sparkles className="w-4 h-4 inline mr-1" />{isZh ? 'AI生成' : 'AI Generate'}</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[isZh ? '合同草拟：输入交易条款自动生成合同' : 'Contract drafting from trade terms', isZh ? '报告生成：自动汇总数据生成分析报告' : 'Report generation from data summaries', isZh ? '标准文件：基于行业规范生成操作手册' : 'Standard docs from industry specs'].map((t, i) => (
              <div key={i} className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/15"><p className="text-xs text-violet-300"><Sparkles className="w-3 h-3 inline mr-1" />{t}</p></div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5">
          <h3 className="text-white mb-4">{isZh ? '文档类型分布' : 'Document Types'}</h3>
          <div className="h-56 flex items-center">
            <div className="w-1/2 h-full"><ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}><PieChart><Pie data={DOC_TYPE_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">{DOC_TYPE_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} /></PieChart></ResponsiveContainer></div>
            <div className="w-1/2 space-y-3">{DOC_TYPE_PIE.map((e, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} /><span className="text-sm text-gray-300">{e.name}</span></div><span className="text-sm text-white">{e.value}%</span></div>))}</div>
          </div>
        </div>
      )}
    </div>
  );
}
