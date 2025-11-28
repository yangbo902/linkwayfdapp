import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, ArrowUpRight, History, Target, Award, Users, Building2, ArrowRight, X, ArrowRightLeft, CheckCircle2, AlertTriangle, Lightbulb, Loader2, ArrowDownToLine, PlaneTakeoff, Landmark, Quote, ExternalLink, ShieldCheck, Globe, Zap } from 'lucide-react';
import { TeamMember } from '../types';
import { generateInvestmentAdvice } from '../services/geminiService';

interface CompanySectionProps {
  language: string;
}

const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Anna Schmidt',
    role: 'Managing Partner (Europe)',
    bio: 'Former strategy consultant at McKinsey with 20 years of experience in Sino-German cross-border M&A. Specializes in automotive and industrial sectors. Dr. Schmidt has successfully advised on over €5B in transaction volume, facilitating major joint ventures between German Tier-1 suppliers and Chinese manufacturing conglomerates.',
    quote: "Cross-border success requires more than translation; it demands the architectural integration of two distinct industrial cultures.",
    image: 'https://cdn.usegalileo.ai/sdxl10/0179d638-3485-4522-8395-e2a223395d85.png',
    social: { linkedin: 'https://linkedin.com', email: 'anna.schmidt@linkwayfdi.com' }
  },
  {
    id: '2',
    name: 'Sarah Zhang',
    role: 'Managing Partner (Asia)',
    bio: 'Expert in Chinese regulatory compliance and government relations. Previously led FDI attraction for the Shanghai Free Trade Zone. Sarah possesses an unparalleled network within the Yangtze River Delta government ecosystem, allowing LinkwayFDI clients to navigate complex approval processes with speed and certainty.',
    quote: "We don't just navigate regulations; we leverage policy frameworks to build structural competitive advantages for our clients.",
    image: 'https://cdn.usegalileo.ai/sdxl10/2e8c2275-01e4-4d8b-9040-523c9902621b.png',
    social: { linkedin: 'https://linkedin.com', email: 'sarah.zhang@linkwayfdi.com' }
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Head of Analytics',
    bio: 'Data scientist turned investment advisor. Leads the development of Linkway’s proprietary market intelligence platform. Michael combines big data analytics with traditional due diligence to uncover hidden investment opportunities. His team tracks over 50,000 data points daily across industrial sectors.',
    quote: "In a noise-filled market, our data radar filters for the signal—identifying true alpha in industrial asset allocation.",
    image: 'https://cdn.usegalileo.ai/sdxl10/60902c38-898f-4d37-8898-751098679901.png',
    social: { linkedin: 'https://linkedin.com', email: 'michael.chen@linkwayfdi.com' }
  },
  {
    id: '4',
    name: 'Elena Weber',
    role: 'Legal Counsel',
    bio: 'Specializes in international corporate law and IP protection. Ensures seamless entity formation and compliance for European clients. With dual qualification in Germany and China, Elena bridges the gap between different legal systems. She has a strong track record in negotiating technology transfer agreements.',
    quote: "Legal compliance is the bedrock of longevity. We engineer corporate structures that withstand geopolitical stress tests.",
    image: 'https://cdn.usegalileo.ai/sdxl10/0638573d-8067-427c-9bc2-317426615b3c.png',
    social: { linkedin: 'https://linkedin.com', email: 'elena.weber@linkwayfdi.com' }
  }
];

export const CompanySection: React.FC<CompanySectionProps> = ({ language }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Comparison Tool State
  const [toolMode, setToolMode] = useState<'FDI' | 'ODI'>('FDI');
  const [toolContent, setToolContent] = useState<{FDI: string | null, ODI: string | null}>({ FDI: null, ODI: null });
  const [toolLoading, setToolLoading] = useState(false);

  // Comparison Tool AI Fetcher
  useEffect(() => {
    const fetchContent = async () => {
        if (toolContent[toolMode]) return; // Cache hit

        setToolLoading(true);
        try {
            const context = toolMode === 'FDI' 
                ? "Foreign Direct Investment (European companies entering China)" 
                : "Outward Direct Investment (Chinese enterprises expanding to Europe)";
            
            const prompt = `
                Act as a senior investment consultant. Provide a structured strategic overview for ${context}.
                Format specifically as follows (do not use markdown bolding **):
                
                KEY CONSIDERATIONS:
                - [Point 1]
                - [Point 2]
                
                PRIMARY BENEFITS:
                - [Point 1]
                - [Point 2]
                
                MAJOR CHALLENGES:
                - [Point 1]
                - [Point 2]
                
                Provide concise, high-level professional insights suitable for C-level executives.
            `;
            const response = await generateInvestmentAdvice(prompt);
            setToolContent(prev => ({...prev, [toolMode]: response}));
        } catch (error) {
            console.error(error);
            setToolContent(prev => ({...prev, [toolMode]: "AI Analysis currently unavailable. Please check connection."}));
        } finally {
            setToolLoading(false);
        }
    };
    fetchContent();
  }, [toolMode]);

  return (
    <section id="company" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
           <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">About LinkwayFDI</h2>
           <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
             Bridging Markets with Intelligence
           </h3>
           <p className="text-slate-500 text-lg leading-relaxed">
             Founded in 2015, LinkwayFDI was built on a simple premise: Cross-border investment shouldn't be a black box. We leverage over <span className="text-slate-900 font-bold">2,700+ government resources</span> to provide speed, certainty, and access.
           </p>
        </div>

        {/* Mission / Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
           {/* Card 1: History */}
           <div className="md:col-span-2 bg-slate-50 rounded-[2rem] p-8 border border-slate-100 relative overflow-hidden group hover:border-brand-200 transition-all hover:shadow-xl duration-500">
              <div className="absolute top-0 right-0 p-0 opacity-20 group-hover:opacity-30 transition-opacity w-1/2 h-full">
                 <img src="https://cdn.usegalileo.ai/sdxl10/24362d85-d602-4b2a-b73a-463d12224168.png" className="w-full h-full object-cover mix-blend-multiply filter grayscale group-hover:grayscale-0 transition-all duration-700" alt="History" />
              </div>
              <div className="relative z-10">
                 <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform">
                    <Building2 className="h-7 w-7" strokeWidth={1.5} />
                 </div>
                 <h4 className="text-2xl font-bold text-slate-900 mb-4">Our Origin Story</h4>
                 <p className="text-slate-500 leading-relaxed max-w-lg">
                    Started as a boutique advisory in Leipzig, Germany, helping Mittelstand companies navigate China. Today, we operate dual headquarters in Leipzig and Shanghai, serving over 200 enterprise clients with a team of 50+ specialists.
                 </p>
                 <div className="mt-8 flex gap-8">
                    <div>
                       <div className="text-4xl font-bold text-slate-900">2015</div>
                       <div className="text-xs text-slate-400 uppercase font-bold mt-1">Founded</div>
                    </div>
                    <div>
                       <div className="text-4xl font-bold text-slate-900">2</div>
                       <div className="text-xs text-slate-400 uppercase font-bold mt-1">Global HQs</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Card 2: Vision */}
           <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-900/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-slate-900"></div>
              <img src="https://cdn.usegalileo.ai/sdxl10/9c104439-0824-4f81-81f3-d09669670f59.png" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" alt="Vision" />
              <div className="relative z-10 h-full flex flex-col">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                    <Target className="h-7 w-7" strokeWidth={1.5} />
                 </div>
                 <h4 className="text-2xl font-bold mb-4">Our Mission</h4>
                 <p className="text-slate-300 leading-relaxed mb-8">
                    To de-risk international expansion through superior market intelligence and on-the-ground execution.
                 </p>
                 <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-2 text-sm font-bold text-brand-300">
                    <Award className="h-4 w-4" /> ISO 9001 Certified
                 </div>
              </div>
           </div>
        </div>

        {/* Team Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-2">Leadership Team</h2>
               <p className="text-slate-500">Meet the experts guiding your expansion.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors group">
               View Full Team <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
           {TEAM.map((member) => (
              <div key={member.id} className="group flex flex-col h-full bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-slate-100">
                 <div 
                    className="relative overflow-hidden rounded-t-2xl bg-slate-100 aspect-[4/5] cursor-pointer" 
                    onClick={() => setSelectedMember(member)}
                 >
                    <img 
                       src={member.image} 
                       alt={member.name} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                         <span className="text-white font-bold text-sm flex items-center gap-2">
                             Expand Bio <ArrowUpRight className="h-4 w-4" />
                         </span>
                    </div>
                 </div>
                 
                 <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                         {/* CLICKABLE NAME - Links to LinkedIn, Stops propagation to prevent modal open */}
                         <a 
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-lg font-bold text-slate-900 hover:text-brand-600 hover:underline decoration-brand-500 underline-offset-4 transition-all flex items-center gap-1.5"
                         >
                            {member.name}
                            <ExternalLink className="h-3 w-3 text-slate-400" />
                         </a>
                    </div>

                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-4">{member.role}</div>

                    {/* Visible Social Icons */}
                    <div className="flex gap-2 mb-4">
                        <a 
                             href={member.social.linkedin}
                             target="_blank"
                             rel="noopener noreferrer" 
                             onClick={(e) => e.stopPropagation()}
                             className="p-2 bg-slate-50 rounded-lg text-slate-500 hover:bg-[#0077b5] hover:text-white transition-colors border border-slate-100"
                             aria-label="LinkedIn Profile"
                          >
                             <Linkedin className="h-4 w-4" />
                        </a>
                        <button 
                             onClick={(e) => {
                                 e.stopPropagation();
                                 window.location.href = `mailto:${member.social.email || 'contact@linkwayfdi.com'}`;
                             }}
                             className="p-2 bg-slate-50 rounded-lg text-slate-500 hover:bg-brand-500 hover:text-white transition-colors border border-slate-100"
                             aria-label="Email Contact"
                          >
                             <Mail className="h-4 w-4" />
                        </button>
                    </div>
                    
                    <div className="relative cursor-pointer group/bio" onClick={() => setSelectedMember(member)}>
                        <p className={`text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2`}>
                            {member.bio}
                        </p>
                        <span className="text-xs font-bold text-brand-600 flex items-center gap-1 group-hover/bio:text-brand-800 transition-colors">
                            Read Full Bio <ArrowRight className="h-3 w-3" />
                        </span>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* Core Mission & Values Section */}
        <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                 <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Core Mission</h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-serif italic">
                        "To de-risk international expansion through superior market intelligence and on-the-ground execution, creating a borderless ecosystem for capital and innovation."
                    </p>
                 </div>
                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                     <p className="text-slate-500 leading-relaxed">
                        We are defined by the core values that drive our daily interactions. In a world of increasing complexity, we serve as the stable bridge connecting European engineering with Asian velocity.
                     </p>
                 </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                {/* Value 1: Integrity */}
                <div className="flex gap-6 group">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-slate-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                        <ShieldCheck className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">Radical Integrity</h4>
                        <p className="text-slate-500 leading-relaxed">
                            We operate in complex regulatory environments where trust is the ultimate currency. We adhere to the highest ethical standards, ensuring zero-tolerance for ambiguity in compliance.
                        </p>
                    </div>
                </div>

                {/* Value 2: Innovation */}
                <div className="flex gap-6 group">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-slate-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                        <Zap className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">Adaptive Innovation</h4>
                        <p className="text-slate-500 leading-relaxed">
                            The investment landscape shifts daily. We continuously evolve our "Linkway OS" technology stack, integrating AI and real-time analytics to keep our clients ahead of market curves.
                        </p>
                    </div>
                </div>

                {/* Value 3: Global Reach */}
                <div className="flex gap-6 group">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-slate-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                        <Globe className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">Global Reach</h4>
                        <p className="text-slate-500 leading-relaxed">
                            We don't just bridge languages; we bridge operational realities. Our dual-HQ structure ensures that strategy conceived in Europe is perfectly executed on the ground in Asia.
                        </p>
                    </div>
                </div>

                {/* Value 4: Shared Destiny */}
                <div className="flex gap-6 group">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-slate-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                        <Users className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">Shared Destiny</h4>
                        <p className="text-slate-500 leading-relaxed">
                            We view ourselves as co-pilots, not just passengers. Our fee structures and project milestones are often tied to your long-term success, aligning our incentives with yours.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* FDI vs ODI Comparison Tool Section */}
        <div className="rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="p-8 md:p-12 border-b border-slate-800 flex flex-col md:flex-row items-end justify-between gap-6 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 border border-slate-700 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
                        <ArrowRightLeft className="h-4 w-4" /> Strategic Tool
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">FDI vs ODI Comparator</h2>
                    <p className="text-slate-400 max-w-lg">
                        Leverage our AI consultant to generate a real-time comparative overview of key considerations for Inbound vs Outbound strategies.
                    </p>
                </div>
                
                <div className="bg-slate-800 p-1.5 rounded-2xl flex relative">
                    {/* Sliding Background */}
                    <div 
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-slate-700 rounded-xl transition-all duration-300 ${toolMode === 'FDI' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
                    ></div>
                    
                    <button 
                        onClick={() => setToolMode('FDI')}
                        className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all relative z-10 ${
                            toolMode === 'FDI' 
                            ? 'text-white' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <ArrowDownToLine className="h-4 w-4" /> FDI (Inbound)
                    </button>
                    <button 
                        onClick={() => setToolMode('ODI')}
                        className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all relative z-10 ${
                            toolMode === 'ODI' 
                            ? 'text-white' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <PlaneTakeoff className="h-4 w-4" /> ODI (Outbound)
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 relative z-10">
                {/* Static Definition Sidebar */}
                <div className="lg:col-span-2 bg-slate-800/30 p-8 md:p-12 border-r border-slate-800 flex flex-col justify-center backdrop-blur-sm">
                     <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-inner transition-colors duration-500 ${
                         toolMode === 'FDI' ? 'bg-brand-500/20 text-brand-400' : 'bg-emerald-500/20 text-emerald-400'
                     }`}>
                         {toolMode === 'FDI' ? <ArrowDownToLine className="h-10 w-10" /> : <PlaneTakeoff className="h-10 w-10" />}
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-4 animate-in fade-in">
                         {toolMode === 'FDI' ? 'Foreign Direct Investment' : 'Outward Direct Investment'}
                     </h3>
                     <p className="text-slate-400 leading-relaxed mb-8 min-h-[5rem]">
                         {toolMode === 'FDI' 
                            ? "Capital investment by foreign enterprises into China's domestic market. Includes greenfield projects, M&A, and joint ventures aiming to capture local market share or utilize manufacturing capacity."
                            : "Strategic expansion of Chinese capital into global markets. Includes acquiring foreign technology brands, establishing R&D centers in Europe, or setting up sales networks abroad."
                         }
                     </p>
                </div>

                {/* AI Content Area */}
                <div className="lg:col-span-3 bg-slate-900 p-8 md:p-12 relative min-h-[400px]">
                     {toolLoading ? (
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                             <Loader2 className="h-12 w-12 animate-spin text-brand-500 mb-4" />
                             <p className="animate-pulse font-mono text-sm uppercase tracking-widest">Generating Strategy...</p>
                         </div>
                     ) : (
                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             {toolContent[toolMode] ? (
                                 toolContent[toolMode]?.split('\n\n').map((section, idx) => {
                                     const [title, ...content] = section.split(':');
                                     if (!content.length) return <p key={idx} className="text-slate-300 leading-relaxed">{section}</p>;
                                     
                                     // Determine Icon based on header keyword
                                     let Icon = Lightbulb;
                                     let colorClass = "text-brand-400";
                                     let bgClass = "bg-brand-500/10 border-brand-500/20";
                                     
                                     if (title.includes("CHALLENGES")) { 
                                         Icon = AlertTriangle; 
                                         colorClass = "text-amber-400"; 
                                         bgClass = "bg-amber-500/10 border-amber-500/20";
                                     }
                                     if (title.includes("BENEFITS")) { 
                                         Icon = CheckCircle2; 
                                         colorClass = "text-emerald-400"; 
                                         bgClass = "bg-emerald-500/10 border-emerald-500/20";
                                     }

                                     return (
                                         <div key={idx} className={`rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.01] ${bgClass}`}>
                                             <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${colorClass}`}>
                                                 <Icon className="h-4 w-4" /> {title}
                                             </h4>
                                             <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-line pl-6 border-l border-white/10">
                                                 {content.join(':').trim()}
                                             </div>
                                         </div>
                                     );
                                 })
                             ) : (
                                 <div className="text-center text-slate-500 mt-20">Data unavailable</div>
                             )}
                         </div>
                     )}
                </div>
            </div>
        </div>

        {/* Team Member Modal */}
        {selectedMember && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
              <div 
                 className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
                 onClick={() => setSelectedMember(null)}
              ></div>
              
              <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200 max-h-[90vh] md:max-h-[85vh]">
                 <button 
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 md:bg-slate-100 md:hover:bg-slate-200 rounded-full transition-colors backdrop-blur-sm"
                 >
                    <X className="h-5 w-5 text-white md:text-slate-500" />
                 </button>

                 {/* Image Side */}
                 <div className="w-full md:w-2/5 h-64 md:h-auto relative flex-shrink-0">
                    <img 
                       src={selectedMember.image} 
                       alt={selectedMember.name} 
                       className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden"></div>
                 </div>

                 {/* Content Side */}
                 <div className="w-full md:w-3/5 p-8 md:p-12 bg-white flex flex-col overflow-y-auto">
                    <h3 className="text-4xl font-serif font-bold text-slate-900 mb-2">{selectedMember.name}</h3>
                    <div className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-8">{selectedMember.role}</div>
                    
                    <div className="prose prose-slate text-slate-600 leading-relaxed mb-8">
                       <p>{selectedMember.bio}</p>
                       
                       {/* Visionary Quote Section - Visually Distinguished */}
                       {selectedMember.quote && (
                            <blockquote className="mt-8 p-6 bg-slate-50 border-l-4 border-brand-500 rounded-r-xl relative shadow-sm">
                                <Quote className="h-8 w-8 text-brand-200 absolute top-4 left-4 -z-0 transform -translate-x-3 -translate-y-3" />
                                <div className="relative z-10">
                                    <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block mb-2">Vision for Cross-Border Investment</span>
                                    <p className="italic text-slate-700 font-medium font-serif text-lg leading-relaxed m-0">
                                        "{selectedMember.quote}"
                                    </p>
                                </div>
                            </blockquote>
                       )}
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex gap-4 mt-auto">
                       <a href={selectedMember.social.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm hover:bg-[#0077b5] hover:text-white transition-all">
                          <Linkedin className="h-4 w-4" /> LinkedIn Profile
                       </a>
                       <a href={`mailto:${selectedMember.social.email || 'contact@linkwayfdi.com'}`} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm hover:bg-brand-600 hover:text-white transition-all">
                          <Mail className="h-4 w-4" /> Direct Contact
                       </a>
                    </div>
                 </div>
              </div>
           </div>
        )}

      </div>
    </section>
  );
};