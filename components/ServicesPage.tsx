import React, { useState } from 'react';
import { ArrowLeft, Globe2, ArrowDownToLine, PlaneTakeoff, ShieldCheck, Building2, Gavel, Users, Zap, Search, ChevronRight, LayoutGrid, FileText, CheckCircle2, LineChart, Milestone, Lock, FolderOpen, Bell, Menu, ArrowRight, Download, FileCheck, AlertCircle, Clock, Landmark, Scale, Briefcase, File, BarChart, Server, Network, Target, Layers, Boxes } from 'lucide-react';
import { Page } from '../types';

interface ServicesPageProps {
  language: string;
  onNavigate: (page: Page) => void;
  investmentMode: 'FDI' | 'ODI';
  onModeChange: (mode: 'FDI' | 'ODI') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ language, onNavigate, investmentMode, onModeChange }) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const activeTab = investmentMode;

  const FDI_STEPS = [
    {
      id: 1,
      title: "Strategy",
      icon: Search,
      items: ["Market Entry Feasibility", "Competitor Intelligence", "Regulatory Roadmap"]
    },
    {
      id: 2,
      title: "Structure",
      icon: Network,
      items: ["WFOE/JV Incorporation", "Tax & Capital Structuring", "Banking Setup"]
    },
    {
      id: 3,
      title: "Execution",
      icon: Building2,
      items: ["Site Selection & Land", "Factory Construction", "Supply Chain Localisation"]
    },
    {
      id: 4,
      title: "Operation",
      icon: Zap,
      items: ["HR & Recruitment", "Compliance Audit", "Growth & Scaling"]
    }
  ];

  const ODI_STEPS = [
    {
      id: 1,
      title: "Targeting",
      icon: Target,
      items: ["M&A Deal Sourcing", "Tech Asset Screening", "Europe Market Scouting"]
    },
    {
      id: 2,
      title: "Transaction",
      icon: Briefcase,
      items: ["Financial Due Diligence", "Legal Structuring", "SPA Negotiation"]
    },
    {
      id: 3,
      title: "Integration",
      icon: Layers,
      items: ["Post-Merger Integration", "Cultural Alignment", "Tech Transfer"]
    },
    {
      id: 4,
      title: "Expansion",
      icon: Globe2,
      items: ["EU Sales Network", "R&D Center Setup", "Global Branding"]
    }
  ];

  const DELIVERABLES = {
    FDI: [
      { title: "Market Entry Blueprint", type: "Strategic Report", icon: FileText, desc: "Comprehensive feasibility study and competitor analysis." },
      { title: "WFOE Business License", type: "Legal Document", icon: Gavel, desc: "Official entity registration and banking authorization." },
      { title: "Site Selection Matrix", type: "Data Analysis", icon: LayoutGrid, desc: "Comparative analysis of 10+ industrial zones." },
      { title: "Environmental Impact Report", type: "Gov Approval", icon: FileCheck, desc: "EIA clearance for manufacturing operations." }
    ],
    ODI: [
      { title: "M&A Target Shortlist", type: "Interactive", icon: Search, desc: "Vetted list of potential acquisition targets in EU." },
      { title: "Financial Due Diligence", type: "Audit Report", icon: LineChart, desc: "Deep dive into target financials and liabilities." },
      { title: "Share Purchase Agreement", type: "Legal Contract", icon: Gavel, desc: "Drafted and negotiated SPA for transaction." },
      { title: "100-Day Integration Plan", type: "Strategy", icon: Milestone, desc: "Post-merger operational roadmap." }
    ]
  };

  const currentSteps = activeTab === 'FDI' ? FDI_STEPS : ODI_STEPS;
  const currentDeliverables = DELIVERABLES[activeTab];

  // Dynamic Theme Colors
  const theme = {
      primary: activeTab === 'FDI' ? 'text-brand-600' : 'text-emerald-600',
      bgPrimary: activeTab === 'FDI' ? 'bg-brand-600' : 'bg-emerald-600',
      borderPrimary: activeTab === 'FDI' ? 'border-brand-500' : 'border-emerald-500',
      lightBg: activeTab === 'FDI' ? 'bg-brand-50' : 'bg-emerald-50',
      lightText: activeTab === 'FDI' ? 'text-brand-700' : 'text-emerald-700',
      hoverText: activeTab === 'FDI' ? 'group-hover:text-brand-600' : 'group-hover:text-emerald-600',
      hoverBorder: activeTab === 'FDI' ? 'hover:border-brand-300' : 'hover:border-emerald-300',
      shadow: activeTab === 'FDI' ? 'shadow-brand-500/20' : 'shadow-emerald-500/20',
      gradientText: activeTab === 'FDI' ? 'from-brand-400 to-blue-400' : 'from-emerald-400 to-teal-400'
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-24 transition-colors duration-700">
       
       {/* Hero Header */}
       <div className="bg-slate-950 text-white pt-20 pb-32 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse transition-colors duration-700 ${
               activeTab === 'FDI' ? 'bg-brand-600/20' : 'bg-emerald-600/20'
           }`}></div>
           
           <div className="container mx-auto px-6 relative z-10">
               <button 
                  onClick={() => onNavigate('home')}
                  className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-wider group font-mono"
               >
                   <div className="p-1 bg-white/10 rounded-full group-hover:bg-white/20"><ArrowLeft className="h-3 w-3" /></div> System / Services
               </button>

               <div className="max-w-4xl">
                   <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                       Investment Stack <br/>
                       <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText} transition-all duration-700`}>Architecture</span>
                   </h1>
                   <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-sans">
                       We don't just provide services; we deploy a comprehensive operating system for cross-border capital allocation.
                   </p>
               </div>
           </div>
       </div>

       {/* Mode Switcher */}
       <div className="container mx-auto px-6 -mt-16 relative z-20">
           <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/10 border border-white/50 p-2 inline-flex gap-2">
               <button
                  onClick={() => onModeChange('FDI')}
                  className={`px-8 py-4 rounded-xl flex items-center gap-3 font-bold transition-all text-sm uppercase tracking-wide duration-300 font-display ${
                      activeTab === 'FDI' 
                      ? 'bg-brand-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
               >
                   <ArrowDownToLine className="h-5 w-5" /> Inbound (FDI)
               </button>
               <button
                  onClick={() => onModeChange('ODI')}
                  className={`px-8 py-4 rounded-xl flex items-center gap-3 font-bold transition-all text-sm uppercase tracking-wide duration-300 font-display ${
                      activeTab === 'ODI' 
                      ? 'bg-emerald-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
               >
                   <PlaneTakeoff className="h-5 w-5" /> Outbound (ODI)
               </button>
           </div>
       </div>

       {/* Main Solution Architecture View */}
       <div className="container mx-auto px-6 mt-20">
           
           {/* Section 1: Execution Pipeline Visualization */}
           <div className={`bg-white rounded-3xl border border-slate-200 p-8 md:p-12 mb-20 shadow-xl relative overflow-hidden transition-all duration-500`}>
               <div className="absolute top-0 right-0 p-6 opacity-5">
                   <Server className="h-32 w-32" />
               </div>
               
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                   <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-3">
                       <LayoutGrid className={`h-6 w-6 ${theme.primary}`} /> 
                       {activeTab === 'FDI' ? 'Inbound Investment Protocol' : 'Outbound Expansion Protocol'}
                   </h2>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                       <Clock className="h-3 w-3" /> Typical Timeline: {activeTab === 'FDI' ? '3-6 Months' : '6-9 Months'}
                   </div>
               </div>

               <div className="grid md:grid-cols-4 gap-6 relative animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeTab}>
                   {/* Connection Line */}
                   <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10">
                        <div className={`absolute top-0 left-0 h-full w-full animate-[pulse_2s_infinite] ${activeTab === 'FDI' ? 'bg-brand-100' : 'bg-emerald-100'}`}></div>
                   </div>
                   
                   {currentSteps.map((step, idx) => (
                       <div 
                           key={idx}
                           onMouseEnter={() => setHoveredStep(idx)}
                           onMouseLeave={() => setHoveredStep(null)}
                           className={`relative group cursor-pointer transition-all duration-300 ${hoveredStep === idx ? '-translate-y-2' : ''}`}
                       >
                           {/* Icon Node */}
                           <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto border-2 transition-all duration-300 bg-white relative z-10 ${
                               hoveredStep === idx 
                               ? `${theme.borderPrimary} ${theme.primary} shadow-xl ${theme.shadow} scale-110` 
                               : 'border-slate-100 text-slate-400'
                           }`}>
                               <step.icon className="h-8 w-8" strokeWidth={1.5} />
                               {idx < currentSteps.length - 1 && (
                                   <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center z-20">
                                       <ChevronRight className="h-3 w-3 text-slate-300" />
                                   </div>
                               )}
                           </div>
                           
                           <h3 className="text-center text-lg font-bold text-slate-900 mb-4 font-display">{step.title}</h3>
                           
                           {/* Features List */}
                           <div className={`bg-slate-50 rounded-xl p-4 border border-slate-100 min-h-[120px] transition-all duration-300 ${hoveredStep === idx ? 'bg-white shadow-md border-slate-200' : ''}`}>
                               <ul className="space-y-3">
                                   {step.items.map((item, i) => (
                                       <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                                           <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 transition-colors ${
                                               hoveredStep === idx ? theme.primary : 'text-slate-300'
                                           }`} />
                                           {item}
                                       </li>
                                   ))}
                               </ul>
                           </div>
                       </div>
                   ))}
               </div>
           </div>

           {/* New Section: Key Deliverables & Artifacts */}
           <div className="grid lg:grid-cols-3 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700" key={`deliverables-${activeTab}`}>
                <div className="lg:col-span-1">
                    <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
                        Tangible<br/>
                        <span className={`${theme.primary} transition-colors duration-500`}>Deliverables</span>
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-8">
                        Our engagement model focuses on concrete outputs. From legal artifacts to strategic roadmaps, here is what you receive during the {activeTab} process.
                    </p>
                    <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
                        Download Sample Pack <Download className="h-4 w-4" />
                    </button>
                </div>

                <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                    {currentDeliverables.map((item, idx) => (
                        <div key={idx} className={`bg-white p-6 rounded-2xl border border-slate-200 ${theme.hoverBorder} hover:shadow-lg transition-all group`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 bg-slate-50 rounded-xl text-slate-500 ${activeTab === 'FDI' ? 'group-hover:bg-brand-50 group-hover:text-brand-600' : 'group-hover:bg-emerald-50 group-hover:text-emerald-600'} transition-colors`}>
                                    <item.icon className="h-6 w-6" strokeWidth={1.5} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-1 rounded ${theme.lightBg} ${theme.lightText} border-transparent`}>
                                    {item.type}
                                </span>
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
           </div>

           {/* Section 3: Compliance Firewall (Specific Feature Highlight) */}
           <div className="grid md:grid-cols-2 gap-8 mb-20">
               <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(16,185,129,0.1)_25%,transparent_25%,transparent_50%,rgba(16,185,129,0.1)_50%,rgba(16,185,129,0.1)_75%,transparent_75%,transparent)] bg-[size:20px_20px] opacity-10"></div>
                   
                   <div className="relative z-10">
                       <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6 backdrop-blur-sm border border-emerald-500/30">
                           <ShieldCheck className="h-6 w-6" />
                       </div>
                       <h3 className="text-2xl font-display font-bold mb-4">Compliance Firewall</h3>
                       <p className="text-slate-400 leading-relaxed mb-8">
                           Our proprietary "GovSec" protocol ensures 100% adherence to local regulations. We handle the complexity of environmental audits (EIA), energy quotas, and negative list screening so you don't have to.
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                           <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                               <CheckCircle2 className="h-4 w-4" /> ISO 27001
                           </div>
                           <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                               <CheckCircle2 className="h-4 w-4" /> GDPR Ready
                           </div>
                           <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                               <CheckCircle2 className="h-4 w-4" /> NDRC Filing
                           </div>
                           <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                               <CheckCircle2 className="h-4 w-4" /> SAFE Regs
                           </div>
                       </div>
                   </div>
               </div>

               <div className={`bg-white rounded-3xl p-10 border border-slate-200 relative overflow-hidden group ${theme.hoverBorder} transition-colors`}>
                   <div className={`absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity ${theme.primary}`}>
                       <BarChart className="h-40 w-40" />
                   </div>
                   
                   <div className="relative z-10">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${theme.lightBg} ${theme.primary}`}>
                           <LineChart className="h-6 w-6" />
                       </div>
                       <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">Alpha Generation</h3>
                       <p className="text-slate-500 leading-relaxed mb-8">
                           We treat incentives as an asset class. Our team negotiates R&D grants, tax holidays, and CAPEX subsidies that can improve your project's IRR by up to 400 basis points.
                       </p>
                       
                       <div className="space-y-4">
                           <div className="flex justify-between items-center text-sm">
                               <span className="font-medium text-slate-700">Standard Incentive Package</span>
                               <span className="font-mono text-slate-400">Baseline</span>
                           </div>
                           <div className="w-full bg-slate-100 rounded-full h-2">
                               <div className="bg-slate-400 h-2 rounded-full w-[40%]"></div>
                           </div>
                           
                           <div className="flex justify-between items-center text-sm">
                               <span className={`font-bold ${theme.primary}`}>Linkway Negotiated Package</span>
                               <span className={`font-mono ${theme.primary} font-bold`}>+15.4%</span>
                           </div>
                           <div className={`w-full rounded-full h-2 ${activeTab === 'FDI' ? 'bg-brand-100' : 'bg-emerald-100'}`}>
                               <div className={`h-2 rounded-full w-[75%] ${theme.bgPrimary}`}></div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>

       </div>
    </div>
  );
};
