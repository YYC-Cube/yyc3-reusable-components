import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Zap,
  BarChart3,
  Newspaper,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface MarketIntelligenceProps {
  currentLanguage: string;
}

const METAL_PRICES = [
  { name: 'LME Copper', price: '¥ 61,450.50', change: '+1.2%', up: true },
  { name: 'LME Aluminum', price: '¥ 18,215.00', change: '-0.5%', up: false },
  { name: 'LME Nickel', price: '¥ 126,300.00', change: '+0.8%', up: true },
  { name: 'LME Zinc', price: '¥ 21,450.25', change: '+0.3%', up: true },
  { name: 'Steel Scrap', price: '¥ 2,820.00', change: '-1.1%', up: false },
  { name: 'Gold (g)', price: '¥ 485.10', change: '+0.4%', up: true },
  { name: 'Silver (g)', price: '¥ 5.85', change: '-0.2%', up: false },
  { name: 'CNY/USD', price: '7.15', change: '0.0%', up: true },
];

const TREND_DATA = [
  { time: '09:00', copper: 61400, aluminum: 18200, steel: 2810 },
  { time: '10:00', copper: 61420, aluminum: 18205, steel: 2812 },
  { time: '11:00', copper: 61410, aluminum: 18195, steel: 2815 },
  { time: '12:00', copper: 61440, aluminum: 18210, steel: 2818 },
  { time: '13:00', copper: 61450, aluminum: 18215, steel: 2820 },
  { time: '14:00', copper: 61430, aluminum: 18210, steel: 2819 },
  { time: '15:00', copper: 61460, aluminum: 18220, steel: 2822 },
];

const NEWS_ITEMS = [
  {
    id: 1,
    title: { en: 'Global Manufacturing PMI rises 1.2%', zh: '全球制造业PMI上涨1.2%' },
    time: '10 min ago',
    source: 'Reuters',
  },
  {
    id: 2,
    title: { en: 'New regulations for scrap metal import', zh: '废金属进口新规发布' },
    time: '45 min ago',
    source: 'Ministry of Industry',
  },
  {
    id: 3,
    title: { en: 'Global copper demand expected to surge', zh: '全球铜需求预计激增' },
    time: '2 hours ago',
    source: 'Bloomberg',
  },
];

export function MarketIntelligence({ currentLanguage }: MarketIntelligenceProps) {
  const [selectedMetal, setSelectedMetal] = useState('copper');
  const [tickerData, setTickerData] = useState(METAL_PRICES);

  // Simulated WebSocket Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData((currentData) =>
        currentData.map((item) => {
          // Randomly fluctuate price by small amount
          const currentPrice = parseFloat(item.price.replace(/[¥,]/g, ''));
          const volatility = currentPrice * 0.0005; // 0.05% fluctuation
          const change = (Math.random() - 0.5) * volatility;
          const newPrice = currentPrice + change;
          const isUp = change >= 0;

          return {
            ...item,
            price:
              (item.name.includes('USD') ? '' : '¥ ') +
              newPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            up: isUp,
            // Occasionally update percentage change
            change:
              Math.random() > 0.8
                ? `${isUp ? '+' : '-'}${(Math.random() * 2).toFixed(1)}%`
                : item.change,
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-10">
      {/* 1. Top Scrolling Loop (Ticker) */}
      <div className="relative w-full overflow-hidden bg-slate-900/60 backdrop-blur-md border-y border-white/5 h-12 flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-10"></div>

        <div className="flex items-center px-4 z-20 border-r border-white/10 h-full bg-slate-900/50">
          <Globe className="w-4 h-4 text-emerald-400 mr-2" />
          <span className="text-xs font-bold text-emerald-400 tracking-wider whitespace-nowrap flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
            {currentLanguage === 'en' ? 'LIVE MARKET' : '实时市场'}
          </span>
        </div>

        <div className="flex-1 overflow-hidden flex items-center">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 40,
            }}
          >
            {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center mx-6 space-x-2">
                <span className="text-sm font-medium text-slate-300">{item.name}</span>
                <span
                  className={`text-sm font-bold transition-colors duration-500 ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}
                >
                  {item.price}
                </span>
                <span
                  className={`text-xs flex items-center ${item.up ? 'text-emerald-500' : 'text-rose-500'}`}
                >
                  {item.up ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-emerald-500" />
              {currentLanguage === 'en' ? 'Market Intelligence' : '市场信息大屏'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {currentLanguage === 'en'
                ? 'Real-time global metal prices and analytics'
                : '实时全球金属价格与市场分析'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors border border-slate-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              {currentLanguage === 'en' ? 'Refresh' : '刷新数据'}
            </button>
            <button className="flex items-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">
              <Zap className="w-4 h-4 mr-2" />
              {currentLanguage === 'en' ? 'AI Analysis' : 'AI 深度分析'}
            </button>
          </div>
        </div>

        {/* 2. Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-lg font-semibold text-white">
                  {currentLanguage === 'en' ? 'Price Trends Analysis' : '价格趋势分析'}
                </h3>
                <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/5">
                  {['copper', 'aluminum', 'steel'].map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        selectedMetal === metal
                          ? 'bg-emerald-500 text-white shadow-lg'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {metal.charAt(0).toUpperCase() + metal.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[350px] w-full relative z-10 min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={TREND_DATA}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis
                      dataKey="time"
                      stroke="#94a3b8"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        borderColor: '#334155',
                        color: '#fff',
                      }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetal}
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">
                      Trading Volume
                    </p>
                    <h4 className="text-2xl font-bold text-white mt-1">2,450 T</h4>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
                <div className="h-24 min-w-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <BarChart data={TREND_DATA}>
                      <Bar dataKey="steel" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.6} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">
                      Market Sentiment
                    </p>
                    <h4 className="text-2xl font-bold text-emerald-400 mt-1">Bullish</h4>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[75%]"></div>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">75%</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {currentLanguage === 'en'
                    ? 'Based on AI analysis of 50+ news sources'
                    : '基于50+新闻源的AI分析'}
                </p>
              </div>
            </div>
          </div>

          {/* Side Panel (1/3 width) - News & Alerts */}
          <div className="space-y-6">
            {/* Live News */}
            <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/5 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Newspaper className="w-5 h-5 mr-2 text-blue-400" />
                  {currentLanguage === 'en' ? 'Market News' : '市场快讯'}
                </h3>
                <span className="flex items-center text-xs text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                  Live
                </span>
              </div>

              <div className="space-y-6">
                {NEWS_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="group relative pl-4 border-l border-slate-700 hover:border-blue-500 transition-colors"
                  >
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-blue-500 transition-colors"></div>
                    <p className="text-xs text-slate-400 flex items-center mb-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.time} • <span className="text-blue-400 ml-1">{item.source}</span>
                    </p>
                    <h4 className="text-sm text-slate-200 group-hover:text-white transition-colors font-medium">
                      {item.title[currentLanguage as keyof typeof item.title]}
                    </h4>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white text-xs font-medium transition-all border border-transparent hover:border-slate-600">
                {currentLanguage === 'en' ? 'View All News' : '查看所有资讯'}
              </button>
            </div>

            {/* Smart Alerts */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/10 to-transparent backdrop-blur-xl border border-amber-500/20">
              <div className="flex items-center mb-4 text-amber-500">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <h3 className="font-semibold">
                  {currentLanguage === 'en' ? 'Price Alert' : '价格预警'}
                </h3>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/10 mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-amber-200">Copper</span>
                  <span className="text-xs text-amber-400 font-bold flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    High Volatility
                  </span>
                </div>
                <p className="text-xs text-amber-200/70">
                  {currentLanguage === 'en'
                    ? 'Price crossed ¥ 61,400 threshold.'
                    : '价格突破 ¥ 61,400 关口。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
