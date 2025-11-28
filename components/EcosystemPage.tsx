
import React from 'react';
import { IndustriesSection } from './IndustriesSection';
import { Network, Truck, Anchor, Container } from 'lucide-react';

interface EcosystemPageProps {
  language: string;
}

export const EcosystemPage: React.FC<EcosystemPageProps> = ({ language }) => {
  return (
    <div className="pt-20 font-sans bg-slate-50 min-h-screen">
       <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/30">
               <Network className="h-4 w-4" /> Industrial Clusters
           </div>
           <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
             The Ecosystem
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
             Deep vertical integration across key high-value sectors. We don't just find land; we plug you into a supply chain.
           </p>
        </div>
      </div>

      {/* Logistics Stats Bar */}
      <div className="bg-emerald-900 py-12 border-b border-emerald-800">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
               <div>
                   <div className="text-3xl font-bold mb-1">2h</div>
                   <div className="text-xs text-emerald-300 uppercase font-bold">To Shanghai Port</div>
               </div>
               <div>
                   <div className="text-3xl font-bold mb-1">5</div>
                   <div className="text-xs text-emerald-300 uppercase font-bold">Intl. Airports (&lt;200km)</div>
               </div>
               <div>
                   <div className="text-3xl font-bold mb-1">Top 3</div>
                   <div className="text-xs text-emerald-300 uppercase font-bold">Cost Efficiency</div>
               </div>
               <div>
                   <div className="text-3xl font-bold mb-1">100+</div>
                   <div className="text-xs text-emerald-300 uppercase font-bold">Logistics Partners</div>
               </div>
          </div>
      </div>
      
      <IndustriesSection language={language} />

      {/* Logistics Visual */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/2">
                      <h2 className="text-3xl font-bold text-slate-900 mb-6">Connected to the World</h2>
                      <p className="text-slate-500 text-lg leading-relaxed mb-8">
                          Baoying is situated in the heart of the Yangtze River Delta, utilizing a multimodal transport network that connects your factory to global markets in record time.
                      </p>
                      <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                               <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><Anchor className="h-5 w-5"/></div>
                               <div>
                                   <div className="font-bold text-slate-900">Port Access</div>
                                   <div className="text-xs text-slate-500">Direct river access to Shanghai Deepwater Port.</div>
                               </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                               <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600"><Truck className="h-5 w-5"/></div>
                               <div>
                                   <div className="font-bold text-slate-900">Highway Network</div>
                                   <div className="text-xs text-slate-500">G2 Beijing-Shanghai Expressway interchange.</div>
                               </div>
                          </div>
                      </div>
                  </div>
                  <div className="md:w-1/2">
                      <div className="bg-slate-100 rounded-3xl h-80 w-full relative overflow-hidden group">
                           <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                               <div className="text-white">
                                   <div className="font-bold text-xl">Baoying Logistics Park</div>
                                   <div className="text-sm opacity-80">150,000 sqm bonded warehouse</div>
                               </div>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};
