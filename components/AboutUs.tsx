
import React, { useState, useEffect, useRef } from 'react';
import { Target, Globe2, Award, Briefcase, Play, Sparkles, Bot, Loader2, ArrowRight, BarChart3, Users, Zap, Layers, ShieldAlert, FileText, Plane, Train, Ship, Calculator, BookOpen, ChevronDown, Landmark, Scale, PieChart, Check, MapPin, Building2, Navigation, TrainFront, GraduationCap, Stethoscope, TreePine, Quote, MousePointer2, HelpCircle, ArrowUpRight, Leaf, Sun, Droplets, Recycle, Wind, TrendingUp, PlayCircle, Monitor, Network, Presentation, Mail, Heart, Shield, Database, ArrowLeftRight, Terminal, Cpu, Linkedin } from 'lucide-react';
import { generateInvestmentAdvice } from '../services/geminiService';
import { GallerySection } from './GallerySection';
import { TeamMember } from '../types';

interface AboutUsProps {
  language: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

export const AboutUs: React.FC<AboutUsProps> = ({ language }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string>('eu');
  
  // AI Insights State
  const [activeInsight, setActiveInsight] = useState('FDI_TRENDS');
  const [aiContent, setAiContent] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Team Animation State
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const teamSectionRef = useRef<HTMLDivElement>(null);

  const INSIGHT_TOPICS = [
    { 
        id: 'FDI_TRENDS', 
        label: 'FDI Market Trends', 
        icon: TrendingUp,
        prompt: "Analyze current Foreign Direct Investment trends into China for 2025. Focus on 'China for China' strategy, high-tech manufacturing, and supply chain localization." 
    },
    { 
        id: 'ODI_STRATEGY', 
        label: 'Global Expansion (ODI)', 
        icon: Globe2,
        prompt: "Provide strategic advice for Chinese manufacturing companies expanding into Europe (DACH region). Focus on M&A opportunities vs Greenfield challenges and cultural integration." 
    },
    { 
        id: 'REGULATORY', 
        label: 'Regulatory Risk', 
        icon: ShieldAlert,
        prompt: "Summarize key regulatory risks for cross-border EU-China investments, specifically covering China's Data Security Law (DSL) and EU FDI screening mechanisms." 
    },
    { 
        id: 'TECH_TRANSFER', 
        label: 'Tech & R&D', 
        icon: Cpu,
        prompt: "Evaluate the landscape for R&D center establishment in China by foreign MNCs. Mention intellectual property protection improvements and local engineering talent availability." 
    }
  ];

  // Team Data
  const TEAM: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Anna Schmidt',
      role: 'Managing Partner (Europe)',
      bio: 'Former strategy consultant at McKinsey with 20 years of experience in Sino-German cross-border M&A. Specializes in automotive and industrial sectors. Dr. Schmidt has successfully advised on over €5B in transaction volume, facilitating major joint ventures between German Tier-1 suppliers and Chinese manufacturing conglomerates. She holds a PhD in Economics from the University of Munich and is a frequent speaker at EU-China business forums.',
      image: 'https://cdn.usegalileo.ai/sdxl10/0179d638-3485-4522-8395-e2a223395d85.png',
      social: { linkedin: 'https://linkedin.com', email: 'anna.schmidt@linkwayfdi.com' }
    },
    {
      id: '2',
      name: 'Sarah Zhang',
      role: 'Managing Partner (Asia)',
      bio: 'Expert in Chinese regulatory compliance and government relations. Previously led FDI attraction for the Shanghai Free Trade Zone. Sarah possesses an unparalleled network within the Yangtze River Delta government ecosystem, allowing LinkwayFDI clients to navigate complex approval processes with speed and certainty. She has personally overseen the licensing for over 50 Fortune 500 subsidiaries in China.',
      image: 'https://cdn.usegalileo.ai/sdxl10/2e8c2275-01e4-4d8b-9040-523c9902621b.png',
      social: { linkedin: 'https://linkedin.com', email: 'sarah.zhang@linkwayfdi.com' }
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Head of Analytics',
      bio: 'Data scientist turned investment advisor. Leads the development of Linkway’s proprietary market intelligence platform. Michael combines big data analytics with traditional due diligence to uncover hidden investment opportunities. His team tracks over 50,000 data points daily across industrial sectors, providing our clients with a distinct information advantage in fast-moving markets.',
      image: 'https://cdn.usegalileo.ai/sdxl10/60902c38-898f-4d37-8898-751098679901.png',
      social: { linkedin: 'https://linkedin.com', email: 'michael.chen@linkwayfdi.com' }
    },
    {
      id: '4',
      name: 'Elena Weber',
      role: 'Legal Counsel',
      bio: 'Specializes in international corporate law and IP protection. Ensures seamless entity formation and compliance for European clients. With dual qualification in Germany and China, Elena bridges the gap between different legal systems. She has a strong track record in negotiating technology transfer agreements and protecting intellectual property rights in complex joint venture structures.',
      image: 'https://cdn.usegalileo.ai/sdxl10/0638573d-8067-427c-9bc2-317426615b3c.png',
      social: { linkedin: 'https://linkedin.com', email: 'elena.weber@linkwayfdi.com' }
    }
  ];

  // Fetch initial insight
  useEffect(() => {
      handleTopicChange('FDI_TRENDS');
  }, []);

  // Team Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTeamVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTopicChange = async (id: string) => {
      setActiveInsight(id);
      setAiLoading(true);
      const topic = INSIGHT_TOPICS.find(t => t.id === id);
      if (topic) {
          try {
              const res = await generateInvestmentAdvice(`Generate a professional, actionable strategic insight snippet (max 100 words) about: ${topic.prompt}. Tone: Senior Consultant.`);
              setAiContent(res);
          } catch (e) {
              setAiContent("Unable to generate insight at this time. Please check your connection.");
          }
      }
      setAiLoading(false);
  };
  
  // Map Data
  const mapNodes = [
    { 
      id: 'eu', 
      label: 'Leipzig HQ', 
      x: 48, y: 28, 
      stats: { location: 'Leipzig, Germany', contact: 'Dr. Anna Schmidt', role: 'Managing Partner (EU)', email: 'eu@linkwayfdi.com' }
    },
    { 
      id: 'cn', 
      label: 'Shanghai HQ', 
      x: 82, y: 38, 
      stats: { location: 'Shanghai, China', contact: 'Sarah Zhang', role: 'Managing Partner (APAC)', email: 'cn@linkwayfdi.com' }
    },
    { 
      id: 'na', 
      label: 'New York', 
      x: 22, y: 32, 
      stats: { location: 'New York, USA', contact: 'Michael Ross', role: 'Strategic Advisor', email: 'us@linkwayfdi.com' }
    },
    { 
      id: 'sg', 
      label: 'Singapore', 
      x: 78, y: 55, 
      stats: { location: 'Singapore', contact: 'Li Wei', role: 'ASEAN Director', email: 'sg@linkwayfdi.com' }
    },
  ];
  
  const activeNode = mapNodes.find(n => n.id === hoveredRegion) || mapNodes[0];

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-950 text-white pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" alt="Office" className="w-full h-full object-cover opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-500/30">
                    <Building2 className="h-4 w-4" /> Established 2015
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                   Born in Germany. <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">Raised in China.</span>
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                   LinkwayFDI is the premier cross-border investment operating system. We bridge the gap between European technology heritage and Asian market velocity through data, strategy, and execution.
                </p>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/50">
                        Our Story
                    </button>
                    <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-sm flex items-center gap-2">
                        <PlayCircle className="h-5 w-5" /> Firm Video
                    </button>
                </div>
             </div>
             <div className="lg:w-1/2 w-full relative">
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-4 mt-8">
                         <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 transform translate-y-4">
                             <div className="text-3xl font-bold text-white mb-1">200+</div>
                             <div className="text-xs text-brand-300 uppercase tracking-wider">MNC Clients</div>
                         </div>
                         <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600" className="rounded-2xl opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0" />
                     </div>
                     <div className="space-y-4">
                         <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" className="rounded-2xl opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0" />
                         <div className="bg-brand-600 p-6 rounded-2xl border border-brand-500 shadow-xl">
                             <div className="text-3xl font-bold text-white mb-1">$5.2B</div>
                             <div className="text-xs text-brand-200 uppercase tracking-wider">Deal Volume</div>
                         </div>
                     </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- DUAL HQ & NETWORK --- */}
      <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  
                  {/* Left: Content */}
                  <div className="lg:w-1/2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                          <Globe2 className="h-4 w-4" /> Global Infrastructure
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-slate-900">
                          Dual Headquarters. <br/>
                          <span className="text-blue-600">Unified Execution.</span>
                      </h2>
                      <p className="text-lg text-slate-500 leading-relaxed mb-8">
                          We operate as one firm across two continents. Our Leipzig HQ manages strategy and European relations, while our Shanghai HQ executes on-the-ground operations and government compliance.
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                              <div className="mt-1"><Building2 className="h-6 w-6 text-blue-600" strokeWidth={1.5} /></div>
                              <div>
                                  <h4 className="font-bold text-slate-900">Leipzig, Germany</h4>
                                  <p className="text-sm text-slate-500 mt-1">Strategic hub for DACH region. Managing investor relations, M&A origination, and legal structuring.</p>
                              </div>
                          </div>
                          <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 transition-colors">
                              <div className="mt-1"><Landmark className="h-6 w-6 text-brand-600" strokeWidth={1.5} /></div>
                              <div>
                                  <h4 className="font-bold text-slate-900">Shanghai, China</h4>
                                  <p className="text-sm text-slate-500 mt-1">Operational engine. Managing government relations, site selection, and regulatory compliance.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  {/* Right: Map Visualization */}
                  <div className="lg:w-1/2 relative w-full aspect-[4/3] lg:aspect-video group/map">
                       <div className="absolute inset-0 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                            <div className="absolute top-6 left-6 z-20 pointer-events-none">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Network className="h-4 w-4 text-brand-400" /> Linkway Network
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Real-time Node Status: Active</p>
                            </div>

                            {/* Map Container */}
                            <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice">
                                <defs>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                
                                {/* World Map Silhouette (Simplified) */}
                                <path d="M20,30 Q40,10 60,30 T100,30" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
                                <path d="M10,50 Q40,40 70,60" fill="none" stroke="#1e293b" strokeWidth="0.5"/>

                                {/* Connection Lines */}
                                {mapNodes.map((node) => {
                                    if(node.id === 'cn') return null;
                                    return (
                                        <path 
                                            key={node.id}
                                            d={`M${node.x} ${node.y} Q ${ (node.x + 82)/2 } ${ (node.y + 38)/2 - 10 } 82 38`}
                                            fill="none"
                                            stroke="url(#gradientLine)"
                                            strokeWidth="0.5"
                                            strokeDasharray="2"
                                            className="opacity-40"
                                        >
                                            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
                                        </path>
                                    )
                                })}
                                <defs>
                                    <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Nodes */}
                                {mapNodes.map(node => (
                                    <g 
                                      key={node.id} 
                                      className="cursor-pointer transition-all duration-300"
                                      onMouseEnter={() => setHoveredRegion(node.id)}
                                      onClick={() => setHoveredRegion(node.id)}
                                    >
                                        <circle cx={node.x} cy={node.y} r={node.id === 'cn' || node.id === 'eu' ? "1.5" : "1"} fill={node.id === 'cn' ? '#10b981' : '#3b82f6'} className="animate-pulse" />
                                        
                                        {/* Hover Ripple */}
                                        {hoveredRegion === node.id && (
                                          <circle cx={node.x} cy={node.y} r="6" fill="none" stroke="white" strokeWidth="0.3" opacity="0.5">
                                             <animate attributeName="r" values="2;8" dur="1.5s" repeatCount="indefinite" />
                                             <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
                                          </circle>
                                        )}
                                    </g>
                                ))}
                            </svg>

                            {/* Tooltip Card */}
                            <div 
                              className="absolute p-4 bg-slate-950/90 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl transition-all duration-500 w-52 z-30 pointer-events-none"
                              style={{ 
                                  left: `${activeNode.x}%`, 
                                  top: `${(activeNode.y / 80) * 100}%`,
                                  transform: `translate(${activeNode.x > 50 ? '-105%' : '10%'}, -50%)`
                              }}
                            >
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                                    <div className={`h-2 w-2 rounded-full animate-pulse ${
                                        activeNode.id === 'eu' ? 'bg-blue-500' : 
                                        activeNode.id === 'cn' ? 'bg-emerald-500' : 'bg-slate-400'
                                    }`}></div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activeNode.stats.role}</span>
                                </div>
                                <div className="text-white font-bold text-sm mb-1">{activeNode.stats.location}</div>
                                <div className="text-xs text-brand-400 mb-2">{activeNode.stats.contact}</div>
                                
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-900 rounded px-2 py-1">
                                   <Mail className="h-3 w-3" /> {activeNode.stats.email}
                                </div>
                            </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- WHY LINKWAY FDI (BENTO GRID DESIGN) --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-500/30">
               <Award className="h-4 w-4" /> The Linkway Advantage
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Why LinkwayFDI?</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
               We re-engineered the consulting model to align with the speed of Asian markets and the rigor of European standards.
            </p>
          </div>

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
            
            {/* Card 1: Gov Access (Large Horizontal) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 hover:border-brand-500/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-brand-500/10 transition-colors"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                        <Landmark className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Gov-Backed Access</h3>
                        <p className="text-slate-400 leading-relaxed max-w-md">
                            Direct liaison channels with 2,700+ government officials. We bypass intermediaries to secure authentic policy interpretations and incentives.
                        </p>
                    </div>
                    <div className="mt-8 flex gap-3">
                         <span className="px-3 py-1 bg-slate-950 rounded-lg text-xs font-bold text-emerald-400 border border-emerald-900/50">Policy Insider</span>
                         <span className="px-3 py-1 bg-slate-950 rounded-lg text-xs font-bold text-brand-400 border border-brand-900/50">Direct Channel</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Speed (Vertical Tall) */}
            <div className="md:row-span-2 bg-brand-900 text-white p-8 rounded-3xl border border-brand-800 hover:border-brand-600 transition-all group relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-950/80 to-transparent"></div>
                
                <div className="relative z-10 flex-grow">
                    <div className="w-12 h-12 bg-brand-800 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:bg-white group-hover:text-brand-900 transition-colors">
                        <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Extreme Speed</h3>
                    <p className="text-brand-100/80 leading-relaxed text-sm mb-6">
                        Our "Parallel Approval" protocol reduces licensing timelines by up to 60%.
                    </p>
                    <div className="space-y-4 font-mono text-xs">
                         <div className="flex justify-between items-center pb-2 border-b border-brand-800">
                             <span className="text-brand-300">Standard</span>
                             <span>6-9 Months</span>
                         </div>
                         <div className="flex justify-between items-center pb-2 border-b border-brand-800">
                             <span className="text-white font-bold">Linkway</span>
                             <span className="text-white font-bold">2-3 Months</span>
                         </div>
                    </div>
                </div>
                <div className="relative z-10 mt-auto pt-6">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full bg-brand-800 border-2 border-brand-900 flex items-center justify-center text-[10px] font-bold shadow-sm">
                               <Check className="h-4 w-4" />
                           </div>
                        ))}
                    </div>
                    <div className="mt-2 text-xs font-bold text-brand-300">Parallel Workflow Active</div>
                </div>
            </div>

            {/* Card 3: Dual Capability (Standard) */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all group hover:-translate-y-1">
                 <div className="w-12 h-12 bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                     <ArrowLeftRight className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">FDI & ODI Bridge</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                     Whether you are entering China (FDI) or expanding globally (ODI), our dual-engine infrastructure supports both directions seamlessly.
                 </p>
            </div>

            {/* Card 4: Intelligence (Standard) */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-indigo-500/50 transition-all group hover:-translate-y-1">
                 <div className="w-12 h-12 bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                     <Database className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Data Intelligence</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">
                     Proprietary AI radar tracking 50,000+ daily market signals to identify hidden opportunities before they hit the open market.
                 </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- VALUES & CULTURE --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">The Linkway Standard</h2>
                  <p className="text-slate-500">
                      We adhere to a set of core principles that define our work and our relationships with clients.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Scale className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Radical Transparency</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                          We believe in zero black boxes. Our clients have full visibility into government negotiations, fee structures, and regulatory hurdles.
                      </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group">
                      <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <Target className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Outcome Obsession</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                          We don't just deliver reports; we deliver results. Our fees are often tied to project milestones like land acquisition or license approval.
                      </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <ShieldAlert className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Compliance First</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                          Navigating the complex regulatory landscape of China and Europe with zero tolerance for non-compliance. Your reputation is our priority.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* --- LEADERSHIP TEAM --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 border border-slate-200">
                    <Users className="h-4 w-4" /> Leadership
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Meet the Partners</h2>
                <p className="text-slate-500 text-lg">
                    A multidisciplinary team of strategists, data scientists, and former government officials dedicated to your success.
                </p>
            </div>

            <div ref={teamSectionRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {TEAM.map((member, index) => (
                    <div 
                        key={member.id} 
                        className={`group bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-xl transition-all duration-700 ease-out flex flex-col overflow-hidden ${isTeamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
                             <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                 <div className="text-white">
                                     <div className="font-bold text-lg">{member.name}</div>
                                     <div className="text-xs font-bold uppercase tracking-wider opacity-90">{member.role}</div>
                                 </div>
                             </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                             <div className="mb-4">
                                 <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                                 <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">{member.role}</div>
                             </div>

                             {/* Scrollable Bio */}
                             <div className="h-32 overflow-y-auto pr-2 mb-6 text-sm text-slate-500 leading-relaxed scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                                 {member.bio}
                             </div>

                             {/* Distinct Social Icons */}
                             <div className="mt-auto pt-4 border-t border-slate-100 flex gap-3">
                                 <a 
                                    href={member.social.linkedin} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all shadow-sm"
                                    title="LinkedIn Profile"
                                 >
                                     <Linkedin className="h-4 w-4" />
                                 </a>
                                 <a 
                                    href={`mailto:${member.social.email}`}
                                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all shadow-sm"
                                    title="Email Contact"
                                 >
                                     <Mail className="h-4 w-4" />
                                 </a>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- AI STRATEGIC INSIGHTS --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-50%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-50%] left-[-10%] w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                {/* Left: Controls */}
                <div className="lg:w-1/3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/30">
                        <Bot className="h-4 w-4" /> Linkway Intelligence Node
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                        AI Quick Insights
                    </h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Leverage our fine-tuned LLM models to get instant strategic perspectives on key investment verticals.
                    </p>

                    <div className="space-y-3">
                        {INSIGHT_TOPICS.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => handleTopicChange(topic.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${
                                    activeInsight === topic.id 
                                    ? 'bg-white text-slate-900 border-white shadow-lg transform scale-105' 
                                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                                }`}
                            >
                                <div className={`p-2 rounded-lg ${activeInsight === topic.id ? 'bg-brand-100 text-brand-600' : 'bg-slate-700 text-slate-500 group-hover:text-slate-300'}`}>
                                    <topic.icon className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-sm">{topic.label}</span>
                                {activeInsight === topic.id && <div className="ml-auto w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Output */}
                <div className="lg:w-2/3 w-full">
                    <div className="bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-800 relative min-h-[400px] flex flex-col">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                <Terminal className="h-4 w-4" />
                                <span>ANALYSIS_OUTPUT.md</span>
                            </div>
                            <div className="flex gap-2">
                                 <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                                 <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                            </div>
                        </div>

                        <div className="flex-grow">
                            {aiLoading ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                                    <p className="text-xs font-mono uppercase tracking-widest animate-pulse">Synthesizing Data Points...</p>
                                </div>
                            ) : (
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-lg text-slate-300 leading-loose font-light">
                                        {aiContent}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Sparkles className="h-3 w-3 text-amber-500" />
                                <span>Powered by Linkway-Gemini 2.5</span>
                            </div>
                            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                Full Report <ArrowRight className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- GALLERY SECTION (Office/Culture) --- */}
      <GallerySection />

    </div>
  );
};
