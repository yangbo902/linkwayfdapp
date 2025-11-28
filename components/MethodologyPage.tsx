
import React from 'react';
import { ProcessSection } from './ProcessSection';
import { BusinessEnvironment } from './BusinessEnvironment';
import { CostEstimator } from './CostEstimator';
import { Settings, Cpu } from 'lucide-react';

interface MethodologyPageProps {
  language: string;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ language }) => {
  return (
    <div className="pt-20 font-sans bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-500/30">
               <Cpu className="h-4 w-4" /> The Linkway Engine
           </div>
           <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
             Operational Methodology
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
             We have standardized the chaos of cross-border investment into a predictable, replicable operating system.
           </p>
        </div>
      </div>

      <ProcessSection language={language} />
      <BusinessEnvironment language={language} />
      <CostEstimator language={language} />
    </div>
  );
};
