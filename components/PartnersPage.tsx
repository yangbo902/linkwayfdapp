
import React, { useState } from 'react';
import { Scale, Building2, Play, ArrowUpRight, Globe2, Shield, FileCheck, Award, Landmark, Calculator, Briefcase, Search, Phone, Mail, MapPin, PlayCircle, ArrowRight, MessageSquare, X, Loader2, CheckCircle2, Factory, PlaneTakeoff, Ticket, Network, FileText, ArrowDownRight } from 'lucide-react';

interface PartnersPageProps {
  language: string;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mnc' | 'sme'>('all');

  const clients = [
    {
      id: 1,
      name: "Siemens Energy",
      type: "mnc",
      location: "Shanghai & Jiangsu",
      image: "https://images.unsplash.com/photo-1581093458791-9f302e6d860d?auto=format&fit=crop&q=80&w=800",
      logo: "SIE",
      desc: "Advising on the establishment of a new smart grid R&D center and manufacturing base. Negotiated key incentives for green energy equipment production."
    },
    {
      id: 2,
      name: "Volkswagen Group",
      type: "mnc",
      location: "Anhui & Shanghai",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
      logo: "VW",
      desc: "Supported supply chain localization for EV components. Conducted supplier due diligence and site selection for Tier-1 partnerships."
    },
    {
      id: 3,
      name: "Mittelstand Precision Tech",
      type: "sme",
      location: "Taicang",
      image: "https://images.unsplash.com/photo-1565514020176-db47571101f7?auto=format&fit=crop&q=80&w=800",
      logo: "MPT",
      desc: "Guided a German hidden champion in precision machining through WFOE setup, site selection, and initial recruitment."
    },
    {
      id: 4,
      name: "Baosheng Group (ODI)",
      type: "mnc",
      location: "Germany Expansion",
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=800",
      logo: "BS",
      desc: "Facilitated the acquisition of a European cable technology firm. Managed regulatory approval and post-merger integration in Germany."
    }
  ];

  const filteredClients = clients.filter(c => activeCategory === 'all' || c.type === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://cdn.usegalileo.ai/sdxl10/cc8c962b-683a-4a6f-9993-9040445d4750.png')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-8 animate-fade-in-up">
              <Award className="h-4 w-4 text-brand-400" />
              <span className="text-xs font-bold text-brand-100 tracking-wide uppercase">Client Impact</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
            Trusted by Global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-emerald-300">
              Industry Leaders
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            From Fortune 500 multinationals to German hidden champions, we deliver measurable value across the investment lifecycle.
          </p>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-20 container mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Success Stories</h2>
                  <p className="text-slate-500 max-w-lg">Real-world examples of LinkwayFDI execution.</p>
              </div>
              
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm mt-6 md:mt-0">
                  <button 
                    onClick={() => setActiveCategory('all')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                      All
                  </button>
                  <button 
                    onClick={() => setActiveCategory('mnc')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategory === 'mnc' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                      MNCs
                  </button>
                  <button 
                    onClick={() => setActiveCategory('sme')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategory === 'sme' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                      SMEs
                  </button>
              </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredClients.map((client) => (
                  <div key={client.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer">
                      <div className="relative h-64 overflow-hidden">
                          <img src={client.image} alt={client.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
                          <div className="absolute top-4 right-4 h-12 w-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-xs font-bold text-slate-800 shadow-lg">
                                  {client.logo}
                          </div>
                          <div className="absolute bottom-6 left-6">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white border border-white/20 backdrop-blur-md shadow-sm mb-2 ${
                                  client.type === 'mnc' ? 'bg-brand-600/90' : 'bg-emerald-600/90'
                              }`}>
                                  {client.type === 'mnc' ? <Globe2 className="h-3 w-3" /> : <Factory className="h-3 w-3" />}
                                  {client.type === 'mnc' ? 'Global Enterprise' : 'Hidden Champion'}
                              </div>
                              <h3 className="text-2xl font-serif font-bold text-white leading-tight group-hover:text-brand-100 transition-colors">{client.name}</h3>
                          </div>
                      </div>
                      
                      <div className="p-8 flex-grow flex flex-col">
                          <div className="mb-6 flex items-start gap-4 text-sm text-slate-500">
                              <MapPin className="h-5 w-5 text-brand-500 flex-shrink-0" />
                              <span className="font-medium text-slate-900">{client.location}</span>
                          </div>
                          
                          <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                              {client.desc}
                          </p>

                          <div className="mt-auto flex items-center text-brand-600 font-bold text-sm group/link">
                              View Case Study <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* --- STRATEGIC SERVICE ECOSYSTEM --- */}
      <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100">
                      <Network className="h-4 w-4" /> Professional Ecosystem
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                      Integrated Resource Network
                  </h2>
                  <p className="text-xl text-slate-500 leading-relaxed font-light">
                      We have integrated a robust infrastructure of legal, financial, and government resources to support your cross-border operations.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Legal */}
                  <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-2xl hover:-translate-y-2 group">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:bg-indigo-600 group-hover:text-white">
                          <Scale className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Legal Counsel</h3>
                      <div className="h-1 w-12 bg-indigo-500 mb-6 rounded-full"></div>
                      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                          Partnerships with Tier-1 law firms in Frankfurt, Shanghai, and Singapore. Specializing in M&A, Corporate Structuring, and IP Protection.
                      </p>
                  </div>

                  {/* Tax & Accounting */}
                  <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-2xl hover:-translate-y-2 group">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-600 mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald-600 group-hover:text-white">
                          <Calculator className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Tax & Audit</h3>
                      <div className="h-1 w-12 bg-emerald-500 mb-6 rounded-full"></div>
                      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                          Network of certified German Tax Advisors (Steuerberater) and Chinese CPAs to optimize your fiscal structure and ensure compliance.
                      </p>
                  </div>

                  {/* Government */}
                  <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white hover:border-brand-500 transition-all hover:shadow-2xl hover:shadow-brand-900/50 group relative overflow-hidden hover:-translate-y-2">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      
                      <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-white mb-8 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                          <Landmark className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Government Relations</h3>
                      <div className="h-1 w-12 bg-brand-500 mb-6 rounded-full"></div>
                      <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">
                          Unrivaled access to over <span className="text-white font-bold">2,700+ government resources</span> and liaison points across federal, state, and municipal levels.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="container mx-auto px-6 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Partner with Excellence</h2>
              <p className="text-brand-100 text-lg max-w-2xl mx-auto mb-10">
                  Ready to write your success story? Connect with our strategic advisory team.
              </p>
              <button className="px-10 py-5 bg-white text-brand-900 font-bold rounded-full hover:bg-brand-50 transition-all shadow-2xl hover:shadow-brand-500/50 flex items-center gap-3 mx-auto hover:-translate-y-1">
                  Contact Us <ArrowRight className="h-5 w-5" />
              </button>
          </div>
      </section>

    </div>
  );
};
