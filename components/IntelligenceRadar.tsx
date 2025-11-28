
import React, { useState, useEffect, useRef } from 'react';
import { Radio, Globe, Zap, Search, Database, Lock, AlertCircle, Crosshair, Terminal, Shield, Wifi, Target, MousePointer2, ArrowRight } from 'lucide-react';

interface IntelligenceRadarProps {
  language: string;
  investmentMode?: 'FDI' | 'ODI';
}

const TRANSLATIONS = {
  de: {
    title: "Echtzeit-Investitionsradar",
    subtitle: "LIVE-DATENERFASSUNG",
    desc: "Unsere KI-Spider überwachen 24/7 globale Investitionssignale. Sehen Sie, wer sich jetzt gerade für Baoying interessiert.",
    columns: { time: "ZEIT", source: "QUELLE", signal: "SIGNAL", entity: "ENTITÄT (ANONYMISIERT)" },
    cta: "Vollständige Daten freischalten",
    cta_sub: "Sehen Sie Klarnamen & Kontaktdaten",
    stats: { active: "Aktive Signale", sources: "Überwachte Quellen", potential: "Potenzielles Volumen" }
  },
  en: {
    title: "Real-Time Intelligence",
    subtitle: "MARKET SIGNAL MONITOR",
    desc: "Our AI Spiders monitor global investment signals 24/7. See who is researching Baoying right now.",
    columns: { time: "TIMESTAMP", source: "SOURCE", signal: "INTENT_SIGNAL", entity: "ENTITY_ID (MASKED)" },
    cta: "Unlock Full Terminal",
    cta_sub: "Reveal Real Names & Contacts",
    stats: { active: "Active Signals", sources: "Data Streams", potential: "Est. Volume" }
  },
  cn: {
    title: "实时招商情报雷达",
    subtitle: "全网数据抓取中",
    desc: "我们的 AI 爬虫 24/7 监控全球投资信号。查看谁正在关注宝应。",
    columns: { time: "时间", source: "来源", signal: "信号", entity: "主体 (已脱敏)" },
    cta: "解锁完整情报",
    cta_sub: "查看企业实名及联系方式",
    stats: { active: "活跃信号", sources: "监控源", potential: "潜在投资额" }
  }
};

// Simulation Data
const SOURCES = [
  { name: 'LinkedIn_API', icon: Globe, color: 'text-blue-400' },
  { name: 'Traffic_Log', icon: Wifi, color: 'text-emerald-400' },
  { name: 'Tender_DB', icon: Database, color: 'text-amber-400' },
  { name: 'News_Crawler', icon: Radio, color: 'text-rose-400' },
  { name: 'User_Behavior', icon: MousePointer2, color: 'text-purple-400' }
];

const SIGNALS_EN = [
  // FDI Signals
  { text: "QUERY: 'Industrial Land Jiangsu'", entity: "Tier 1 Auto Supplier (DE)", impact: "High", type: 'FDI' },
  { text: "FILE_ACCESS: 'Tax_Policy_2024.pdf'", entity: "MedTech Corp (Munich)", impact: "Med", type: 'FDI' },
  { text: "DOWNLOAD: 'Smart_Grid_Plan_v2'", entity: "Energy Giant (Global)", impact: "High", type: 'FDI' },
  // ODI Signals
  { text: "M&A_TARGET: 'German Optics Co'", entity: "Listed CN Manufacturer", impact: "High", type: 'ODI' },
  { text: "REG_CHECK: 'EU Battery Passport'", entity: "Battery Major (CATL)", impact: "High", type: 'ODI' },
  { text: "SITE_SCOUT: 'Hungary EV Park'", entity: "Auto OEM (Shenzhen)", impact: "Med", type: 'ODI' }
];

const SIGNALS_DE = [
  { text: "QUERY: 'Industrieland Jiangsu'", entity: "Tier 1 Auto-Zulieferer (DE)", impact: "High", type: 'FDI' },
  { text: "FILE_ACCESS: 'Steuer_Policy_2024.pdf'", entity: "MedTech AG (München)", impact: "Med", type: 'FDI' },
  { text: "M&A_ZIEL: 'Deutsche Optik GmbH'", entity: "CN Hersteller (Börsennotiert)", impact: "High", type: 'ODI' }
];

const SIGNALS_CN = [
  { text: "QUERY: '江苏工业用地'", entity: "一级汽车供应商 (斯图加特)", impact: "High", type: 'FDI' },
  { text: "并购目标: '德国精密光学'", entity: "上市制造企业 (深圳)", impact: "High", type: 'ODI' },
  { text: "法规查询: '欧盟电池护照'", entity: "电池巨头 (宁德)", impact: "High", type: 'ODI' }
];

export const IntelligenceRadar: React.FC<IntelligenceRadarProps> = ({ language, investmentMode = 'FDI' }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  // Visual Theme based on Mode
  const isFDI = investmentMode === 'FDI';
  const accentColor = isFDI ? 'text-brand-500' : 'text-emerald-500';
  const bgHighlight = isFDI ? 'bg-brand-500' : 'bg-emerald-500';
  const borderColor = isFDI ? 'border-brand-500' : 'border-emerald-500';
  const gridColor = isFDI ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)';

  const getSignalData = () => {
    let signals = SIGNALS_EN;
    if (language === 'de') signals = SIGNALS_DE;
    if (language === 'cn') signals = SIGNALS_CN;
    
    // Filter by mode if specific signals exist, otherwise mix
    const filtered = signals.filter(s => s.type ? s.type === investmentMode : true);
    return filtered.length > 0 ? filtered : signals;
  };

  useEffect(() => {
    // Clear logs on mode switch for dramatic effect
    setLogs([]);
    
    const interval = setInterval(() => {
      const signals = getSignalData();
      const randomSignal = signals[Math.floor(Math.random() * signals.length)];
      const randomSource = SOURCES[Math.floor(Math.random() * SOURCES.length)];
      
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const ms = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');

      const newLog = {
        id: Date.now(),
        time: `${timeStr}.${ms}`,
        source: randomSource,
        signal: randomSignal.text,
        entity: randomSignal.entity,
        impact: randomSignal.impact
      };

      setLogs(prev => [newLog, ...prev].slice(0, 9)); // Keep last 9
    }, 1200);

    return () => clearInterval(interval);
  }, [language, investmentMode]);

  return (
    <section className="bg-slate-950 py-20 border-y border-slate-900 overflow-hidden relative font-sans transition-colors duration-1000">
      
      {/* Background Grid & Effects */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity duration-1000 ${isFDI ? 'opacity-100' : 'opacity-50'}`}></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <div className={`h-2 w-2 rounded-full animate-pulse ${bgHighlight}`}></div>
                <span className={`${accentColor} font-mono text-xs font-bold tracking-widest uppercase`}>
                    {investmentMode === 'FDI' ? 'INBOUND ' : 'OUTBOUND '} {t.subtitle}
                </span>
             </div>
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight flex items-center gap-3">
               {t.title} <Crosshair className={`h-8 w-8 ${accentColor} animate-[spin_4s_linear_infinite]`} />
             </h2>
          </div>

          <div className="flex gap-4 md:gap-8 bg-slate-900 border border-slate-800 p-4 rounded-xl">
             <div className="text-center">
                <div className="text-xl font-mono font-bold text-white">1,204</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">{t.stats.active}</div>
             </div>
             <div className="w-px h-8 bg-slate-800"></div>
             <div className="text-center">
                <div className={`text-xl font-mono font-bold ${accentColor}`}>24/7</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">{t.stats.sources}</div>
             </div>
          </div>
        </div>

        {/* Radar Interface */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch h-[550px]">
          
          {/* Left: Live Feed */}
          <div className="lg:col-span-8 bg-[#0B1221] rounded-xl border border-slate-800 overflow-hidden flex flex-col relative shadow-2xl">
             {/* Header Row */}
             <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-800 bg-slate-900/50 text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest">
                <div className="col-span-2">{t.columns.time}</div>
                <div className="col-span-3">{t.columns.source}</div>
                <div className="col-span-4">{t.columns.signal}</div>
                <div className="col-span-3 text-right">{t.columns.entity}</div>
             </div>

             {/* Scrolling Content */}
             <div className="flex-grow relative overflow-hidden font-mono text-xs">
                <div className="absolute inset-0 p-2 space-y-1">
                   {logs.map((log, index) => (
                      <div 
                        key={log.id} 
                        className={`grid grid-cols-12 gap-4 items-center p-2.5 rounded border border-transparent transition-all duration-300 ${
                            index === 0 
                            ? `bg-slate-800/50 ${isFDI ? 'border-brand-900/50 text-brand-400' : 'border-emerald-900/50 text-emerald-400'}`
                            : 'text-slate-400 hover:bg-slate-800/50'
                        }`}
                      >
                         <div className="col-span-2 opacity-70">{log.time}</div>
                         <div className="col-span-3 flex items-center gap-2 font-bold">
                            <log.source.icon className={`h-3 w-3 ${log.source.color}`} />
                            {log.source.name}
                         </div>
                         <div className="col-span-4 font-medium truncate flex items-center gap-2">
                            {log.impact === 'High' && <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                            <span className={log.impact === 'High' ? 'text-white' : ''}>{log.signal}</span>
                         </div>
                         <div className="col-span-3 text-right opacity-50 relative">
                            {/* Blur effect on entity name */}
                            <span className="blur-[3px] select-none hover:blur-none transition-all duration-300 cursor-crosshair">{log.entity.substring(0, 10)}*****</span>
                         </div>
                      </div>
                   ))}
                </div>
                
                {/* Gradient Fade for Scroll */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0B1221] to-transparent pointer-events-none"></div>
             </div>
          </div>

          {/* Right: Map / Action */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             
             {/* Map Visualization */}
             <div className={`flex-grow bg-[#0B1221] rounded-xl border border-slate-800 relative overflow-hidden group`}>
                 {/* Rotating Radar Line */}
                 <div className={`absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,${gridColor}_360deg)] animate-[spin_4s_linear_infinite] rounded-full scale-[2] pointer-events-none`}></div>
                 
                 {/* Map SVG Placeholder - Simplified world map dots */}
                 <div className="absolute inset-0 p-8 flex items-center justify-center opacity-30">
                    <svg viewBox="0 0 200 100" className={`w-full h-full fill-none stroke-[0.5] ${isFDI ? 'stroke-brand-800' : 'stroke-emerald-800'}`}>
                        <path d="M20,30 Q40,10 60,30 T100,30 T140,40 T180,30" />
                        <path d="M30,70 Q60,50 90,70 T150,60" />
                        {/* Blips */}
                        <circle cx="95" cy="25" r="1.5" className={`${isFDI ? 'fill-brand-400' : 'fill-emerald-400'} animate-ping`} />
                        <circle cx="145" cy="45" r="1.5" className={`${isFDI ? 'fill-brand-400' : 'fill-emerald-400'} animate-ping [animation-delay:1s]`} />
                        <circle cx="45" cy="35" r="1.5" className={`${isFDI ? 'fill-brand-400' : 'fill-emerald-400'} animate-ping [animation-delay:2s]`} />
                    </svg>
                 </div>

                 {/* Overlay Text */}
                 <div className="absolute bottom-6 left-6 right-6">
                     <div className="flex items-center gap-2 mb-2">
                         <Target className={`h-3 w-3 ${accentColor}`} />
                         <span className={`${accentColor} text-[10px] font-bold uppercase tracking-wider font-mono`}>Opportunity Identified</span>
                     </div>
                     <div className="text-3xl font-mono text-white font-bold tracking-tight">{isFDI ? '$1.2B' : '$850M'}</div>
                     <div className="text-[10px] text-slate-500 uppercase font-mono">{t.stats.potential}</div>
                 </div>
             </div>

             {/* Call To Action */}
             <div className={`rounded-xl p-6 relative overflow-hidden group cursor-pointer transition-colors shadow-lg ${isFDI ? 'bg-brand-600 hover:bg-brand-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}>
                 <div className="absolute -right-4 -top-4 bg-white/20 rounded-full p-8 blur-2xl group-hover:bg-white/30 transition-colors"></div>
                 
                 <div className="relative z-10">
                     <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                         <Lock className="h-5 w-5" />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-1 font-display">{t.cta}</h3>
                     <p className="text-white/70 text-xs mb-4">{t.cta_sub}</p>
                     
                     <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white font-mono">
                        <span>Access Terminal</span>
                        <ArrowRight className="h-3 w-3" />
                     </div>
                 </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};
