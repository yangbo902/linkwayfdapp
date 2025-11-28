
import React from 'react';
import { Trophy, Clock, Smile, CheckCircle, ArrowUpRight, Globe, Leaf, Layers, ShieldCheck, Landmark } from 'lucide-react';

interface ExpertiseSectionProps {
  language: string;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ language }) => {
  return (
    <section id="expertise" className="py-24 bg-slate-50">
       <div className="container mx-auto px-6">
          
          {/* Section Header */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">Our Advantage</h2>
            <h3 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-6 leading-tight">
               Why Leading Enterprises <br/> Choose Linkway
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">
               We combine Tier-1 strategy consulting rigor with on-the-ground operational capability. Aligning with the "Eco Structures" philosophy of sustainability, global reach, and complete systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20 perspective-1000">
              {/* Card 1: Global Capabilities */}
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group transform hover:-translate-y-2 hover:rotate-1">
                  <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                      <Globe className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Global Capabilities</h4>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">
                      Seamless cross-border execution with dual headquarters in Leipzig and Shanghai. We bridge time zones, languages, and cultural gaps to deliver a unified investment experience.
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                      <CheckCircle className="h-4 w-4" /> 28+ Countries Covered
                  </div>
              </div>

              {/* Card 2: Complete System */}
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-brand-100 transition-all duration-500 group transform hover:-translate-y-4 z-10">
                  <div className="w-16 h-16 bg-brand-50 rounded-3xl flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                      <Layers className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">Complete System</h4>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">
                      A true "One-Stop-Shop" ecosystem. From initial market discovery to factory construction and operational scaling. No need for additional vendors or fragmented service providers.
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider">
                      <CheckCircle className="h-4 w-4" /> End-to-End Service
                  </div>
              </div>

              {/* Card 3: Sustainable/Eco */}
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 group transform hover:-translate-y-2 hover:-rotate-1">
                  <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                      <Leaf className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">Sustainable Future</h4>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">
                      Prioritizing ESG-compliant investments. We guide clients towards green manufacturing zones, renewable energy incentives, and low-carbon operational frameworks.
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      <CheckCircle className="h-4 w-4" /> Green Finance Ready
                  </div>
              </div>
          </div>

          {/* Metric Strip */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white flex flex-col md:flex-row justify-between items-center gap-12 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[size:64px_64px]"></div>
              
              <div className="flex items-center gap-8 relative z-10 w-full md:w-auto justify-center md:justify-start">
                  <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                      <Landmark className="h-10 w-10 text-brand-400" />
                  </div>
                  <div>
                      <div className="text-5xl font-bold mb-2">2,700+</div>
                      <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Gov Resources</div>
                  </div>
              </div>
              
              <div className="h-px w-full md:w-px md:h-24 bg-slate-700 relative z-10"></div>
              
              <div className="text-center relative z-10">
                  <div className="text-5xl font-bold mb-2 text-emerald-400">320+</div>
                  <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Projects Delivered</div>
              </div>
              
              <div className="h-px w-full md:w-px md:h-24 bg-slate-700 relative z-10"></div>
              
              <div className="text-center relative z-10">
                  <div className="text-5xl font-bold mb-2 text-brand-400">$5.2B</div>
                  <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Investment Volume</div>
              </div>
          </div>

       </div>
    </section>
  );
};
