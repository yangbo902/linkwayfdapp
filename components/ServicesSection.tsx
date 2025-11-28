import React, { useState } from 'react';
import { Globe2, Rocket, Briefcase, BarChart3, ArrowRight, Layers, Fingerprint, Database, Cpu, Lock, Workflow, ArrowDownToLine, PlaneTakeoff, RefreshCcw } from 'lucide-react';
import { Page } from '../types';

interface ServicesSectionProps {
  language: string;
  investmentMode: 'FDI' | 'ODI';
  onModeChange: (mode: 'FDI' | 'ODI') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language, investmentMode, onModeChange }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModeToggle = (newMode: 'FDI' | 'ODI') => {
    if (investmentMode === newMode) return;
    setIsAnimating(true);
    onModeChange(newMode);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const content = {
    FDI: {
      market: {
        title: "China Market Intelligence",
        desc: "Real-time tracking of regulatory changes, competitor movements, and incentive policies across 20+ provinces.",
        stat: "Live Feed Active"
      },
      site: {
        title: "Industrial Site Selection",
        desc: "Geospatial analysis of development zones. Filter by logistics proximity, labor cost heatmaps, and utility infrastructure.",
        stat: "2,000+ Sites Indexed"
      },
      compliance: {
        title: "Inbound Compliance",
        desc: "Automated checks for Negative List restrictions, Environmental Impact Assessments (EIA), and Energy Quotas.",
        tags: ["Negative List", "EIA Clear"]
      },
      execution: {
        title: "WFOE & Construction",
        desc: "End-to-end setup of Wholly Foreign-Owned Enterprises and management of greenfield construction projects."
      }
    },
    ODI: {
      market: {
        title: "Global M&A Radar",
        desc: "Scouting hidden champions and technology assets in Europe and Southeast Asia for strategic acquisition.",
        stat: "50k+ Targets Tracked"
      },
      site: {
        title: "Global Asset Scouting",
        desc: "Location analysis for R&D centers and overseas sales HQs. Tax optimization and labor law comparison.",
        stat: "EU / ASEAN Focus"
      },
      compliance: {
        title: "Outbound Compliance",
        desc: "Navigating ODI filings (NDRC/MOFCOM), foreign exchange controls (SAFE), and host country GDPR/ESG laws.",
        tags: ["ODI Filing", "SAFE Regs"]
      },
      execution: {
        title: "Post-Merger Integration",
        desc: "Structuring cross-border deals, managing cultural integration, and establishing global operational standards."
      }
    }
  };

  const current = content[investmentMode];
  const isFDI = investmentMode === 'FDI';
  const themeColor = isFDI ? 'brand' : 'emerald';

  return (
    <section id="services" className="py-24 bg-slate-950 border-t border-slate-900 transition-colors duration-1000">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <Layers className="h-3 w-3" /> Core Infrastructure
                </div>
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6">
                    Platform Capabilities
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                    LinkwayFDI is architected as a modular system. Select your operation mode to configure the platform for your specific trajectory.
                </p>
            </div>

            {/* Mode Switcher */}
            <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex relative">
                 <div 
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-slate-800 rounded-lg transition-all duration-300 ${investmentMode === 'FDI' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
                 ></div>
                 <button 
                    onClick={() => handleModeToggle('FDI')}
                    className={`px-6 py-3 rounded-lg relative z-10 flex items-center gap-2 text-sm font-bold transition-colors ${investmentMode === 'FDI' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                    <ArrowDownToLine className="h-4 w-4" /> Inbound (FDI)
                 </button>
                 <button 
                    onClick={() => handleModeToggle('ODI')}
                    className={`px-6 py-3 rounded-lg relative z-10 flex items-center gap-2 text-sm font-bold transition-colors ${investmentMode === 'ODI' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                    <PlaneTakeoff className="h-4 w-4" /> Outbound (ODI)
                 </button>
            </div>
        </div>

        {/* Feature Blocks Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            
            {/* Module 1: Market Intelligence */}
            <div className={`bg-slate-900 rounded-3xl p-1 border border-slate-800 hover:border-${themeColor}-500/50 transition-all duration-300 group`}>
                <div className="bg-slate-950/50 h-full rounded-[20px] p-8 relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${themeColor}-500/10 rounded-full blur-3xl group-hover:bg-${themeColor}-500/20 transition-all`}></div>
                    
                    <div className={`w-12 h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-${themeColor}-500 mb-6 group-hover:scale-110 transition-transform`}>
                        <Database className="h-6 w-6" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{current.market.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[3rem]">
                        {current.market.desc}
                    </p>
                    
                    <div className={`flex items-center gap-2 text-xs font-mono text-${themeColor}-400`}>
                        <span className={`w-2 h-2 bg-${themeColor}-500 rounded-full animate-pulse`}></span> {current.market.stat}
                    </div>
                </div>
            </div>

            {/* Module 2: Site Selection */}
            <div className={`bg-slate-900 rounded-3xl p-1 border border-slate-800 hover:border-${themeColor === 'brand' ? 'emerald' : 'blue'}-500/50 transition-all duration-300 group`}>
                <div className="bg-slate-950/50 h-full rounded-[20px] p-8 relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${themeColor === 'brand' ? 'emerald' : 'blue'}-500/10 rounded-full blur-3xl group-hover:bg-${themeColor === 'brand' ? 'emerald' : 'blue'}-500/20 transition-all`}></div>
                    
                    <div className={`w-12 h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-${themeColor === 'brand' ? 'emerald' : 'blue'}-500 mb-6 group-hover:scale-110 transition-transform`}>
                        <Globe2 className="h-6 w-6" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{current.site.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[3rem]">
                        {current.site.desc}
                    </p>
                    
                    <div className="space-y-2">
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-${themeColor === 'brand' ? 'emerald' : 'blue'}-500 w-[75%]`}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>{current.site.stat}</span>
                            <span>Verified</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* Module 3: Compliance */}
             <div className="bg-slate-900 rounded-3xl p-1 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group">
                <div className="bg-slate-950/50 h-full rounded-[20px] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all"></div>
                    
                    <div className="w-12 h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                        <Lock className="h-6 w-6" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{current.compliance.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[3rem]">
                        {current.compliance.desc}
                    </p>
                    
                    <div className="flex gap-2">
                        {current.compliance.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-400">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

             {/* Module 4: Execution (Full Width) */}
             <div className={`md:col-span-2 lg:col-span-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-1 border border-slate-800 hover:border-${themeColor}-400/30 transition-all duration-300 group relative`}>
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]"></div>
                 
                 <div className="bg-slate-950/50 h-full rounded-[20px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 bg-${themeColor}-500/20 rounded-lg text-${themeColor}-400`}>
                                <Workflow className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Full-Stack Execution</h3>
                        </div>
                        <p className="text-slate-400 text-lg mb-8 max-w-xl">
                            {current.execution.desc}
                        </p>
                        <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                            Explore {investmentMode} Engine <ArrowRight className="h-4 w-4" />
                        </button>
                     </div>
                     
                     {/* Visual Representation of Workflow */}
                     <div className="flex-1 w-full grid grid-cols-2 gap-4">
                         {(investmentMode === 'FDI' ? ['WFOE Setup', 'Banking', 'Tax', 'HR'] : ['M&A Due Diligence', 'SPA Draft', 'Closing', 'Integration']).map((item, i) => (
                             <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between group/item hover:border-slate-600 transition-colors">
                                 <span className="text-slate-300 font-medium text-sm">{item}</span>
                                 <div className={`h-2 w-2 rounded-full shadow-[0_0_8px] ${investmentMode === 'FDI' ? 'bg-brand-500 shadow-brand-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`}></div>
                             </div>
                         ))}
                     </div>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
};
