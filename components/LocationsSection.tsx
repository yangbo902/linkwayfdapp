
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface LocationsSectionProps {
  language: string;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ language }) => {
  return (
    <section id="locations" className="py-24 bg-slate-950 text-white relative overflow-hidden">
       {/* Map Background Pattern */}
       <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center pointer-events-none"></div>
       
       <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-3">Global Presence</h2>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-white">Strategically Located</h3>
           </div>

           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               
               {/* Leipzig Card */}
               <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:border-brand-500/50">
                   <div className="flex justify-between items-start mb-8">
                       <div className="p-3 bg-brand-500/20 rounded-xl">
                          <span className="text-2xl">🇩🇪</span>
                       </div>
                       <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Leipzig</h3>
                   <div className="text-xs font-bold text-brand-400 uppercase tracking-wide mb-6">European Headquarters</div>
                   <p className="text-slate-400 text-sm leading-relaxed mb-6">
                       Central European hub managing all EU client relations and strategy. Located in the heart of Germany's industrial east.
                   </p>
                   <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <MapPin className="h-4 w-4 text-brand-500" />
                      Neumarkt 9, 04109 Leipzig
                   </div>
               </div>

               {/* Shanghai Card */}
               <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:border-brand-500/50">
                   <div className="flex justify-between items-start mb-8">
                       <div className="p-3 bg-brand-500/20 rounded-xl">
                          <span className="text-2xl">🇨🇳</span>
                       </div>
                       <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Shanghai</h3>
                   <div className="text-xs font-bold text-brand-400 uppercase tracking-wide mb-6">APAC Regional Office</div>
                   <p className="text-slate-400 text-sm leading-relaxed mb-6">
                       Our gateway to Asia. Managing government relations, local compliance, and on-the-ground execution for foreign investors.
                   </p>
                   <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <MapPin className="h-4 w-4 text-brand-500" />
                      West Nanjing Road, Jing'an District
                   </div>
               </div>

           </div>
       </div>
    </section>
  );
};