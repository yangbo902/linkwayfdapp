
import React from 'react';
import { ExpertiseSection } from './ExpertiseSection';
import { FactoryShowcase } from './FactoryShowcase';
import { IntelligenceRadar } from './IntelligenceRadar';
import { Layers, Database, Shield, Server, Cpu, Code2 } from 'lucide-react';

interface CapabilitiesPageProps {
  language: string;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ language }) => {
  return (
    <div className="pt-20 font-sans bg-slate-50 min-h-screen">
       {/* Page Header - Dark Theme for Nav Visibility */}
      <div className="bg-slate-950 text-white py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6 border border-slate-700">
               <Layers className="h-4 w-4" /> Infrastructure & Data
           </div>
           <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
             Core Capabilities
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
             Our value proposition is built on three pillars: Real-time intelligence, physical infrastructure, and strategic expertise.
           </p>
        </div>
      </div>

      <IntelligenceRadar language={language} />
      
      {/* Tech Stack Visual */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold text-white mb-2">Our Data Stack</h2>
                  <p className="text-slate-400">The proprietary technology powering LinkwayFDI</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                   <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500 transition-colors">
                       <Database className="h-8 w-8 text-brand-500 mb-4" />
                       <h3 className="text-white font-bold mb-2">Data Lake</h3>
                       <p className="text-xs text-slate-400">Aggregating 50+ gov data sources daily.</p>
                   </div>
                   <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors">
                       <Shield className="h-8 w-8 text-emerald-500 mb-4" />
                       <h3 className="text-white font-bold mb-2">GovSec</h3>
                       <p className="text-xs text-slate-400">Encrypted compliance verification engine.</p>
                   </div>
                   <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors">
                       <Cpu className="h-8 w-8 text-indigo-500 mb-4" />
                       <h3 className="text-white font-bold mb-2">AI Analysis</h3>
                       <p className="text-xs text-slate-400">Generative models for risk assessment.</p>
                   </div>
                   <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-amber-500 transition-colors">
                       <Code2 className="h-8 w-8 text-amber-500 mb-4" />
                       <h3 className="text-white font-bold mb-2">API Gateway</h3>
                       <p className="text-xs text-slate-400">Real-time integration with local banks.</p>
                   </div>
              </div>
          </div>
      </section>

      <ExpertiseSection language={language} />
      <FactoryShowcase language={language} />
    </div>
  );
};
