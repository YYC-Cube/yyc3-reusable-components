import React from 'react';
import { 
  Truck, 
  Map, 
  Navigation, 
  Clock, 
  Package, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Globe3D } from './Globe3D';

interface LogisticsProps {
  currentLanguage: string;
}

const SHIPMENTS = [
  { 
    id: 'SHP-2025-001', 
    origin: { en: 'Shanghai Port', zh: '上海港' }, 
    dest: { en: 'Beijing Warehouse', zh: '北京中央仓库' }, 
    status: 'in-transit', 
    eta: '2h 15m', 
    driver: 'Li Wei',
    cargo: 'Steel Scrap (20T)',
    coordinates: { lat: '30%', left: '25%' },
    progress: 75
  },
  { 
    id: 'SHP-2025-002', 
    origin: { en: 'Guangzhou Industrial', zh: '广州工业区' }, 
    dest: { en: 'Shenzhen Hub', zh: '深圳枢纽' }, 
    status: 'loading', 
    eta: '5h 30m', 
    driver: 'Zhang Wei',
    cargo: 'Copper Wire (5T)',
    coordinates: { lat: '65%', left: '60%' },
    progress: 10
  },
  { 
    id: 'SHP-2025-003', 
    origin: { en: 'Tokyo Port', zh: '东京港' }, 
    dest: { en: 'Shanghai Port', zh: '上海港' }, 
    status: 'customs', 
    eta: '1d 4h', 
    driver: 'Global Logistics',
    cargo: 'Electronics Scrap',
    coordinates: { lat: '45%', left: '80%' },
    progress: 40
  },
  { 
    id: 'SHP-2025-004', 
    origin: { en: 'Chengdu Center', zh: '成都中心' }, 
    dest: { en: 'Chongqing Plant', zh: '重庆工厂' }, 
    status: 'arrived', 
    eta: 'Completed', 
    driver: 'Wang Lei',
    cargo: 'Aluminum Cans',
    coordinates: { lat: '20%', left: '55%' },
    progress: 100
  },
];

export function Logistics({ currentLanguage }: LogisticsProps) {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-fade-in-up pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-blue-400" />
            {currentLanguage === 'en' ? 'Smart Logistics' : '智能物流'}
          </h1>
          <p className="text-gray-400">
            {currentLanguage === 'en' ? 'Real-time fleet tracking & shipment monitoring' : '实时车队追踪与货物监控'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/20">
            <Truck className="w-4 h-4 mr-2" />
            {currentLanguage === 'en' ? 'New Shipment' : '新建运单'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Section */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 relative overflow-hidden min-h-[500px] flex flex-col bg-slate-950">
          <div className="absolute inset-0 z-0">
             <Globe3D />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/20 pointer-events-none"></div>
          
          {/* Map Overlay UI */}
          <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
            <div className="glass-card p-4 rounded-xl pointer-events-auto backdrop-blur-md border border-white/10 bg-slate-900/60">
               <div className="flex items-center space-x-2 text-white mb-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="font-semibold">{currentLanguage === 'en' ? 'Live Tracking' : '实时追踪'}</span>
               </div>
               <div className="text-sm text-gray-300">
                 4 {currentLanguage === 'en' ? 'Active Vehicles' : '活跃车辆'}
               </div>
            </div>
            
            <div className="glass-card p-2 rounded-xl pointer-events-auto backdrop-blur-md border border-white/10 bg-slate-900/60 flex flex-col gap-2">
               <Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Navigation className="w-5 h-5" /></Button>
               <Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Map className="w-5 h-5" /></Button>
            </div>
          </div>

          {/* HUD Footer */}
          <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
              <div className="glass-card p-4 rounded-xl backdrop-blur-md border border-white/10 bg-slate-900/60 max-w-md">
                  <h4 className="text-white font-medium mb-1 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-blue-400" />
                      {currentLanguage === 'en' ? 'Global Supply Chain Network' : '全球供应链网络'}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' 
                        ? 'Real-time visualization of active trade routes and fleet positions using satellite telemetry.' 
                        : '基于卫星遥测技术实时可视化活跃贸易路线与车队位置，数据延迟 < 200ms。'}
                  </p>
              </div>
          </div>
        </div>

        {/* Sidebar List */}
        <div className="space-y-6">
           {/* Summary Cards */}
           <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl border border-white/10 bg-slate-800/40">
                 <div className="text-gray-400 text-xs mb-1">In Transit</div>
                 <div className="text-2xl font-bold text-blue-400">12</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/10 bg-slate-800/40">
                 <div className="text-gray-400 text-xs mb-1">Pending</div>
                 <div className="text-2xl font-bold text-amber-400">5</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/10 bg-slate-800/40">
                 <div className="text-gray-400 text-xs mb-1">Delayed</div>
                 <div className="text-2xl font-bold text-red-400">1</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/10 bg-slate-800/40">
                 <div className="text-gray-400 text-xs mb-1">Completed</div>
                 <div className="text-2xl font-bold text-green-400">145</div>
              </div>
           </div>

           {/* Active Shipment List */}
           <div className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[400px]">
              <div className="p-4 border-b border-white/10 bg-slate-800/50">
                 <h3 className="font-semibold text-white">
                    {currentLanguage === 'en' ? 'Active Shipments' : '活跃运单'}
                 </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                 {SHIPMENTS.map((shipment) => (
                    <div key={shipment.id} className="p-3 rounded-xl bg-slate-800/30 border border-white/5 hover:bg-slate-700/50 transition-colors group cursor-pointer">
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-mono text-gray-400 group-hover:text-blue-400 transition-colors">{shipment.id}</span>
                          <span className={`w-2 h-2 rounded-full ${
                             shipment.status === 'in-transit' ? 'bg-blue-500 animate-pulse' :
                             shipment.status === 'loading' ? 'bg-slate-500' :
                             shipment.status === 'customs' ? 'bg-amber-500' : 'bg-green-500'
                          }`}></span>
                       </div>
                       <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-white font-medium">{shipment.cargo}</div>
                       </div>
                       
                       {/* Progress Bar */}
                       <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                          <div className={`h-full rounded-full ${
                             shipment.status === 'customs' ? 'bg-amber-500' : 'bg-blue-500'
                          }`} style={{ width: `${shipment.progress}%` }}></div>
                       </div>
                       
                       <div className="flex justify-between items-center text-[10px] text-gray-400">
                          <span>{shipment.origin[currentLanguage === 'en' ? 'en' : 'zh'].split(' ')[0]}</span>
                          <ArrowRight className="w-3 h-3 text-gray-600" />
                          <span>{shipment.dest[currentLanguage === 'en' ? 'en' : 'zh'].split(' ')[0]}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
