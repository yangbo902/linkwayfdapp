
import React from 'react';
import { Factory, Cpu, Zap, HeartPulse, ShoppingBag, Building, Wallet, GraduationCap } from 'lucide-react';

interface IndustriesSectionProps {
  language: string;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ language }) => {
  const industries = [
    { icon: Factory, name: "Advanced Manufacturing" },
    { icon: Cpu, name: "Technology & AI" },
    { icon: Zap, name: "Clean Energy" },
    { icon: HeartPulse, name: "Healthcare & Biotech" },
    { icon: ShoppingBag, name: "Consumer & Retail" },
    { icon: Building, name: "Real Estate" },
    { icon: Wallet, name: "Financial Services" },
    { icon: GraduationCap, name: "Education" },
  ];

  return (
    <section id="industries" className="py-24 bg-white border-t border-slate-100">
       <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div className="max-w-xl">
                 <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">Industries</h2>
                 <h3 className="text-3xl font-sans font-bold text-slate-900">Sector Specialization</h3>
             </div>
             <a href="#" className="text-slate-500 font-medium hover:text-brand-600 transition-colors">View all sectors →</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
             {industries.map((ind, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-brand-200 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                   <ind.icon className="h-8 w-8 text-slate-400 group-hover:text-brand-600 transition-colors mb-4" strokeWidth={1.5} />
                   <div className="font-bold text-slate-700 group-hover:text-slate-900 text-center">{ind.name}</div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};