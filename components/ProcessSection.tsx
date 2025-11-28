
import React, { useState } from 'react';
import { Search, Compass, Calculator, FileCheck, Hammer, Activity, ChevronRight, GitBranch, GitCommit, GitMerge, CheckCircle2, FastForward, Clock, Gauge } from 'lucide-react';

interface ProcessSectionProps {
  language: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ language }) => {
  const [comparisonMode, setComparisonMode] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { 
        id: 1,
        title: "Discovery", 
        status: "init",
        icon: Search,
        desc: "Requirement analysis & feasibility study."
    },
    { 
        id: 2,
        title: "Strategy", 
        status: "build",
        icon: Compass,
        desc: "Structure design & site selection."
    },
    { 
        id: 3,
        title: "Negotiation", 
        status: "test",
        icon: Calculator,
        desc: "Incentive structuring & legal framework."
    },
    { 
        id: 4,
        title: "Compliance", 
        status: "deploy",
        icon: FileCheck,
        desc: "Regulatory approvals & licensing."
    },
    { 
        id: 5,
        title: "Execution", 
        status: "release",
        icon: Hammer,
        desc: "Construction & operational setup."
    },
  ];

  return (
    <section id="process" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
                    <GitBranch className="h-3 w-3" /> Execution Pipeline
                </div>
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-4">
                    The Deployment Protocol
                </h2>
                <p className="text-slate-500 text-lg">
                    We treat your market entry like a software release: staged, tested, and deployed with zero downtime.
                </p>
            </div>
            
            <div className="flex items-center gap-3 mt-6 md:mt-0 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                <button 
                    onClick={() => setComparisonMode(false)}
                    className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${!comparisonMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Standard View
                </button>
                <button 
                    onClick={() => setComparisonMode(true)}
                    className={`px-4 py-2 text-sm font-bold rounded-md transition-all flex items-center gap-2 ${comparisonMode ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Gauge className="h-4 w-4" /> Velocity Comparison
                </button>
            </div>
        </div>

        {/* Comparison View */}
        {comparisonMode ? (
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                
                <div className="relative z-10 grid lg:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Accelerated Deployment</h3>
                        <p className="text-slate-400 mb-8">
                            Linkway's "Parallel Approval" architecture compresses the traditional 18-month timeline into a 6-month sprint.
                        </p>

                        {/* Traditional Timeline */}
                        <div className="mb-8 opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                <span>Traditional Consultant</span>
                                <span>18 Months</span>
                            </div>
                            <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                <div className="w-[20%] bg-slate-600 border-r border-slate-900"></div>
                                <div className="w-[30%] bg-slate-600 border-r border-slate-900"></div>
                                <div className="w-[50%] bg-slate-600"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
                                <span>Strategy</span>
                                <span>Compliance</span>
                                <span>Construction</span>
                            </div>
                        </div>

                        {/* Linkway Timeline */}
                        <div className="relative">
                             <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-brand-400 mb-2">
                                <span className="flex items-center gap-2"><FastForward className="h-4 w-4" /> Linkway OS</span>
                                <span>6 Months</span>
                            </div>
                            <div className="h-12 bg-slate-800 rounded-lg overflow-hidden relative border border-brand-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                                {/* Parallel Tracks */}
                                <div className="absolute top-1 left-0 h-2 bg-brand-500 w-[33%] rounded-full animate-[pulse_3s_infinite]"></div>
                                <div className="absolute top-4 left-[10%] h-2 bg-emerald-500 w-[33%] rounded-full opacity-80 animate-[pulse_3s_infinite] [animation-delay:0.5s]"></div>
                                <div className="absolute top-7 left-[20%] h-2 bg-purple-500 w-[33%] rounded-full opacity-80 animate-[pulse_3s_infinite] [animation-delay:1s]"></div>
                            </div>
                            <div className="flex gap-4 mt-3">
                                <div className="flex items-center gap-1.5 text-[10px] text-brand-400 font-bold uppercase"><div className="w-2 h-2 rounded-full bg-brand-500"></div> Strategy</div>
                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Compliance</div>
                                <div className="flex items-center gap-1.5 text-[10px] text-purple-400 font-bold uppercase"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Construction</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-brand-500/20 rounded-xl text-brand-400">
                                <Clock className="h-8 w-8" />
                            </div>
                            <div>
                                <div className="text-4xl font-mono font-bold text-white">66%</div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Time Savings</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                            By running compliance, site selection, and design phases concurrently, we eliminate the "wait states" inherent in traditional consulting models.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-white">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>Pre-Approved Land Quotas</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>Template Legal Frameworks</span>
                            </div>
                             <div className="flex items-center gap-3 text-sm text-white">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>Direct Gov Access (No Middlemen)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <>
                {/* Standard Pipeline Visual */}
                <div className="relative mb-20 animate-in fade-in slide-in-from-bottom-4">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
                    <div className="hidden md:block absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                        {steps.map((step, i) => (
                            <div 
                                key={step.id}
                                onClick={() => setActiveStep(i)}
                                className={`group cursor-pointer flex flex-col items-center text-center transition-all duration-300 ${activeStep === i ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
                            >
                                {/* Node */}
                                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-300 bg-white ${
                                    activeStep >= i 
                                    ? 'border-brand-500 text-brand-600 shadow-lg shadow-brand-500/20' 
                                    : 'border-slate-200 text-slate-300 group-hover:border-slate-300'
                                }`}>
                                    <step.icon className="h-5 w-5" />
                                </div>
                                
                                <h4 className={`font-bold text-sm mb-1 ${activeStep === i ? 'text-brand-600' : 'text-slate-900'}`}>{step.title}</h4>
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                                    {step.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed View Panel (Terminal Style) */}
                <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl font-mono animate-in fade-in">
                    {/* Terminal Header */}
                    <div className="absolute top-0 left-0 w-full h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                        <div className="ml-4 text-xs text-slate-400">pipeline_status.log</div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="text-brand-400 text-sm mb-2 flex items-center gap-2">
                                <ChevronRight className="h-4 w-4" /> current_stage: <span className="text-white font-bold">"{steps[activeStep].title}"</span>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 pl-6 border-l border-slate-700">
                                {steps[activeStep].desc}
                            </p>
                            
                            <div className="space-y-3 pl-6">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className={`h-4 w-4 rounded border flex items-center justify-center ${activeStep >= 0 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'border-slate-600'}`}>
                                        <CheckCircle2 className="h-3 w-3" />
                                    </div>
                                    <span>Initiate Protocol</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className={`h-4 w-4 rounded border flex items-center justify-center ${activeStep >= 0 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'border-slate-600'}`}>
                                        <CheckCircle2 className="h-3 w-3" />
                                    </div>
                                    <span>Resource Allocation</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="h-4 w-4 rounded border border-slate-600 border-dashed animate-pulse"></div>
                                    <span className="opacity-60">Await Confirmation...</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 relative">
                            <div className="absolute top-4 right-4 text-[10px] text-slate-500 uppercase">System Output</div>
                            <div className="space-y-2 text-xs text-slate-400">
                                <p>&gt; Loading module parameters...</p>
                                <p>&gt; Connecting to local government API...</p>
                                <p>&gt; <span className="text-emerald-500">Success:</span> Incentive package identified.</p>
                                <p>&gt; Calculating optimal timeline...</p>
                                <p className="animate-pulse">&gt; _</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}

      </div>
    </section>
  );
};
