import React, { useState } from 'react';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Search,
  Plus,
  Download,
  Share2,
  Trash2,
  Clock,
  HardDrive,
  Grid,
  List as ListIcon,
  File,
} from 'lucide-react';
import { Button } from '@yyc3/ui';

interface DocumentsProps {
  currentLanguage: string;
}

const FOLDERS = [
  { id: 1, name: 'Contracts', count: 12, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, name: 'Policies', count: 5, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 3, name: 'Financial Reports', count: 24, color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 4, name: 'Employee Records', count: 156, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const RECENT_FILES = [
  {
    id: 1,
    name: 'Q1_Financial_Report.pdf',
    type: 'pdf',
    size: '2.4 MB',
    date: '2 hrs ago',
    author: 'Sarah Chen',
  },
  {
    id: 2,
    name: 'Safety_Protocol_v2.docx',
    type: 'doc',
    size: '1.1 MB',
    date: '5 hrs ago',
    author: 'Ahmed Al-Fahad',
  },
  {
    id: 3,
    name: 'Site_Inspection_Photos.zip',
    type: 'zip',
    size: '15.6 MB',
    date: 'Yesterday',
    author: 'Mohammed Q.',
  },
  {
    id: 4,
    name: 'Supplier_Contract_Template.pdf',
    type: 'pdf',
    size: '845 KB',
    date: '2 days ago',
    author: 'Legal Dept',
  },
  {
    id: 5,
    name: 'Inventory_Audit_Log.xlsx',
    type: 'xls',
    size: '450 KB',
    date: '3 days ago',
    author: 'System',
  },
];

export function Documents({ currentLanguage }: DocumentsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-400" />;
      case 'doc':
        return <FileText className="w-8 h-8 text-blue-400" />;
      case 'xls':
        return <FileText className="w-8 h-8 text-green-400" />;
      case 'zip':
        return <Folder className="w-8 h-8 text-amber-400" />;
      case 'img':
        return <ImageIcon className="w-8 h-8 text-purple-400" />;
      default:
        return <File className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-[1800px] mx-auto h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center border border-blue-500/30">
            <HardDrive className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              {currentLanguage === 'en' ? 'Document Center' : '文档中心'}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentLanguage === 'en'
                ? 'Secure storage for enterprise documents'
                : '企业文档的安全存储'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-800/50 rounded-xl p-1 border border-white/5 mr-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30">
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'Upload File' : '上传文件'}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col space-y-8 overflow-y-auto pr-2">
        {/* Search & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  currentLanguage === 'en'
                    ? 'Search documents, folders, or content...'
                    : '搜索文档、文件夹或内容...'
                }
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 flex items-center justify-between border border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                <span className="text-xs font-bold text-white">75%</span>
              </div>
              <div className="text-xs text-gray-400">
                <div>Storage Used</div>
                <div className="text-white font-bold">150GB / 200GB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Folders */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            {currentLanguage === 'en' ? 'Folders' : '文件夹'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FOLDERS.map((folder) => (
              <div
                key={folder.id}
                className="glass-card p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group hover:bg-slate-800/80"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg ${folder.bg}`}>
                    <Folder className={`w-6 h-6 ${folder.color}`} />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-gray-500 hover:text-white"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">
                  {folder.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {folder.count} {currentLanguage === 'en' ? 'files' : '个文件'}
                </p>
              </div>
            ))}
            <div className="glass-card p-4 rounded-xl border border-dashed border-white/20 hover:border-blue-500/50 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
              <Plus className="w-8 h-8 text-gray-500 mb-2" />
              <span className="text-xs text-gray-400">
                {currentLanguage === 'en' ? 'New Folder' : '新建文件夹'}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Files */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-4">
            {currentLanguage === 'en' ? 'Recent Files' : '最近文件'}
          </h3>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {RECENT_FILES.map((file) => (
                <div
                  key={file.id}
                  className="glass-card p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    {getFileIcon(file.type)}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-gray-400 hover:text-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1 truncate" title={file.name}>
                    {file.name}
                  </h4>
                  <div className="mt-auto pt-2 flex justify-between items-center text-[10px] text-gray-500">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800/50 text-xs text-gray-400 uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">Author</th>
                    <th className="px-6 py-3 text-left font-medium">Date</th>
                    <th className="px-6 py-3 text-left font-medium">Size</th>
                    <th className="px-6 py-3 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {RECENT_FILES.map((file) => (
                    <tr key={file.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                          <span className="text-white">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{file.author}</td>
                      <td className="px-6 py-4 text-gray-400">{file.date}</td>
                      <td className="px-6 py-4 text-gray-400 font-mono">{file.size}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-gray-400 hover:text-white"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-gray-400 hover:text-white"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
