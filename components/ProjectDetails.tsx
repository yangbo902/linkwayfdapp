
import React, { useState, useEffect } from 'react';
import { ArrowRight, Crown, Lock, CheckCircle, Loader2, FileText, AlertTriangle, ArrowDownToLine, PlaneTakeoff, Download, PieChart, TrendingUp, Users, Info, Building2, Landmark, Globe, Shield, Phone, Mail, FileCheck, Coins, Check } from 'lucide-react';
import { Project } from '../types';
import { generateInvestmentAdvice } from '../services/geminiService';

interface ProjectDetailsProps {
  project: Project;
  isPremium: boolean;
  onBack: () => void;
  onUnlock: () => void;
  language: string;
}

const TRANSLATIONS = {
  de: {
    back: "Zurück zur Übersicht",
    download: "Teaser herunterladen",
    download_case: "Fallstudie herunterladen",
    value: "Investitionswert",
    status: "Status",
    access: "Vertraulicher Zugriff",
    access_desc: "Dieses Dokument enthält sensible Finanzprognosen und proprietäre Risikoanalysen.",
    request_access: "Zugriff anfordern",
    memo: "Investitionsmemorandum",
    vc: "Risikokapital & Finanzierung",
    stage: "Phase",
    raised: "Finanzierung",
    val: "Bewertung",
    investors: "Strategische Investoren",
    highlights: "Deal-Highlights",
    owner: "Verifizierter Eigentümer",
    request_intro: "Einführung anfordern",
    verdict: "Analystenurteil",
    view_cap: "Cap Table ansehen",
    vip_title: "VIP Datenraum",
    vip_subtitle: "Vollständiger Zugriff gewährt"
  },
  en: {
    back: "Back to Library",
    download: "Download Teaser",
    download_case: "Download Case Study",
    value: "Investment Value",
    status: "Status",
    access: "Confidential Access",
    access_desc: "This document contains sensitive financial projections and proprietary risk analysis.",
    request_access: "Request Elite Access",
    memo: "Investment Memorandum",
    vc: "Venture Capital & Funding",
    stage: "Current Stage",
    raised: "Total Raised",
    val: "Post-Money Val.",
    investors: "Strategic Investors",
    highlights: "Deal Highlights",
    owner: "Verified Owner",
    request_intro: "Request Introduction",
    verdict: "Analyst Verdict",
    view_cap: "View Cap Table",
    vip_title: "VIP Data Room",
    vip_subtitle: "Full Access Granted"
  },
  cn: {
    back: "返回库",
    download: "下载简介",
    download_case: "下载案例研究",
    value: "投资价值",
    status: "状态",
    access: "机密访问",
    access_desc: "本文件包含敏感的财务预测和专有的风险分析。",
    request_access: "请求高级访问",
    memo: "投资备忘录",
    vc: "风险投资与融资",
    stage: "当前阶段",
    raised: "融资总额",
    val: "投后估值",
    investors: "战略投资者",
    highlights: "交易亮点",
    owner: "已验证业主",
    request_intro: "请求介绍",
    verdict: "分析师结论",
    view_cap: "查看股权结构",
    vip_title: "VIP 数据室",
    vip_subtitle: "已获取完整权限"
  }
};

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, isPremium, onBack, onUnlock, language }) => {
  const [aiDetails, setAiDetails] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<'financials' | 'legal' | 'team'>('financials');

  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
  const isCompleted = project.status === 'Completed';

  // Mock VC Data generation based on sector
  const getVCData = () => {
    const isTech = ['Technology', 'Biotech', 'FinTech'].some(s => project.sector.includes(s));
    
    const techInvestors = [
        { name: 'Sequoia Capital', type: 'Lead', logo: 'SQ', icon: Globe, desc: 'Focused on energy innovation and industrial AI applications.' },
        { name: 'Andreessen Horowitz', type: 'Series B', logo: 'AH', icon: Building2, desc: 'Providing strategic guidance on software integration and automation.' },
        { name: 'SoftBank Vision', type: 'Growth', logo: 'SB', icon: Landmark, desc: 'Late-stage funding partner scaling global manufacturing capacity.' }
    ];

    const infraInvestors = [
        { name: 'BlackRock', type: 'Lead', logo: 'BR', icon: Landmark, desc: 'Global infrastructure fund managing long-term industrial assets.' },
        { name: 'Macquarie', type: 'Co-Lead', logo: 'MQ', icon: Building2, desc: 'Specialized in logistics real estate and utility infrastructure.' },
        { name: 'Brookfield', type: 'Equity', logo: 'BF', icon: Globe, desc: 'Renewable power and transition fund supporting green energy.' }
    ];
    
    return {
      stage: isCompleted ? 'Exited / Closed' : (isTech ? 'Series C' : 'Mezzanine'),
      raised: isTech ? '$45M' : '$120M',
      valuation: isTech ? '$250M' : project.value,
      investors: isTech ? techInvestors : infraInvestors,
      lastRound: isCompleted ? 'Final Close' : 'Q3 2023'
    };
  };

  const vcData = getVCData();

  useEffect(() => {
    const fetchDetails = async () => {
      if (isPremium && !aiDetails) {
        setIsGenerating(true);
        try {
          const prompt = `
            Generate a confidential investment memorandum executive summary for a project named "${project.name}" in the ${project.sector} sector located in ${project.location}. 
            Value: ${project.value}. Status: ${project.status}.
            Language: ${language === 'de' ? 'German' : language === 'cn' ? 'Chinese' : 'English'}.
            Structure:
            1. Rationale
            2. Financial Highlights
            3. ${project.status === 'Completed' ? 'Outcome / Impact' : 'Risk Factors'}
            Tone: Professional investor level. Max 200 words.
          `;
          const content = await generateInvestmentAdvice(prompt);
          setAiDetails(content);
        } catch (e) {
          setAiDetails("Detailed analysis currently unavailable.");
        } finally {
          setIsGenerating(false);
        }
      }
    };
    fetchDetails();
  }, [project, isPremium, aiDetails, language]);

  const handleSubscribe = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      onUnlock();
      setIsProcessingPayment(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6 max-w-6xl animate-fade-in-up pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm"
          >
            <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-all">
                <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            {t.back}
          </button>
          <div className="h-px w-8 bg-slate-300"></div>
          <span className="text-slate-400 text-sm font-medium truncate">{project.name}</span>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden relative">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-8 md:p-14 relative overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full mix-blend-overlay filter blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full mix-blend-overlay filter blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
            
            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">{project.sector}</span>
                    </div>
                    
                    <div className="ml-auto flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-sm backdrop-blur-sm ${
                            project.investmentType === 'FDI' ? 'bg-sky-500/20 border-sky-400/30 text-sky-200' : 'bg-indigo-500/20 border-indigo-400/30 text-indigo-200'
                        }`}>
                            {project.investmentType === 'FDI' ? <ArrowDownToLine className="h-3 w-3"/> : <PlaneTakeoff className="h-3 w-3"/>}
                            {project.investmentType}
                        </span>
                        
                        {isPremium && (
                             <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm backdrop-blur-sm animate-pulse">
                                 <Crown className="h-3 w-3"/> {t.vip_title}
                             </span>
                        )}
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight max-w-3xl">{project.name}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:gap-12 pt-8 border-t border-white/10">
                    <div>
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{t.value}</div>
                        <div className="text-3xl font-medium text-white flex items-baseline gap-1">
                             {project.value} <span className="text-lg text-slate-500 font-normal">USD</span>
                        </div>
                    </div>
                    
                    <div>
                         <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{t.status}</div>
                         <div className="flex items-center gap-2 text-lg font-medium text-white">
                              {project.status === 'Open' && <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />}
                              {project.status === 'Closing Soon' && <div className="h-2 w-2 rounded-full bg-amber-400" />}
                              {project.status === 'Completed' && <div className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />}
                              {project.status}
                         </div>
                    </div>

                    <div className="sm:ml-auto">
                        {isPremium ? (
                            <div className="flex items-center gap-3 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                                <CheckCircle className="h-5 w-5" /> {t.vip_subtitle}
                            </div>
                        ) : (
                            <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2">
                                <Download className="h-4 w-4" /> {isCompleted ? t.download_case : t.download}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="relative">
            
            {/* PAYWALL OVERLAY */}
            {!isPremium && (
              <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-md flex items-center justify-center p-6">
                  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 max-w-lg text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
                      
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                          <Lock className="h-8 w-8 text-slate-400" />
                      </div>
                      
                      <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">{t.access}</h3>
                      <p className="text-slate-500 mb-8 leading-relaxed">
                          {t.access_desc}
                      </p>
                      
                      <button 
                          onClick={handleSubscribe}
                          disabled={isProcessingPayment}
                          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                          {isProcessingPayment ? (
                              <>Verifying <Loader2 className="h-4 w-4 animate-spin"/></>
                          ) : (
                              <>{t.request_access}</>
                          )}
                      </button>
                  </div>
              </div>
            )}

            {/* Main Content Grid */}
            <div className={`p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 transition-all duration-500 ${!isPremium ? 'filter blur-sm opacity-50 pointer-events-none' : ''}`}>
                
                {/* Left Column (Content) */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* VIP TABS - Only visible/functional when premium */}
                    {isPremium && (
                        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-8 overflow-x-auto">
                            <button onClick={() => setActiveTab('financials')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'financials' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
                                <Coins className="h-4 w-4" /> Financials
                            </button>
                            <button onClick={() => setActiveTab('legal')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'legal' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
                                <Shield className="h-4 w-4" /> Legal Due Diligence
                            </button>
                            <button onClick={() => setActiveTab('team')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'team' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
                                <Users className="h-4 w-4" /> Key Stakeholders
                            </button>
                        </div>
                    )}

                    {/* Dynamic VIP Content */}
                    {isPremium && activeTab === 'financials' && (
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 animate-in fade-in slide-in-from-bottom-2">
                             <div className="flex justify-between items-center mb-6">
                                 <h4 className="font-bold text-slate-900">
                                     {isCompleted ? 'Actual Performance' : 'Projected Cashflow (3Y)'}
                                 </h4>
                                 <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border">AUDITED</span>
                             </div>
                             <div className="space-y-4">
                                 <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                     <span className="text-sm text-slate-600">Revenue Year 1</span>
                                     <span className="font-mono font-bold">$12,450,000</span>
                                 </div>
                                 <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                     <span className="text-sm text-slate-600">EBITDA Margin</span>
                                     <span className="font-mono font-bold text-emerald-600">18.5%</span>
                                 </div>
                                 <div className="flex justify-between items-center py-3 border-b border-slate-200">
                                     <span className="text-sm text-slate-600">CAPEX Requirement</span>
                                     <span className="font-mono font-bold text-slate-900">$4,200,000</span>
                                 </div>
                                 <div className="flex justify-between items-center py-3">
                                     <span className="text-sm text-slate-600">{isCompleted ? 'Realized IRR' : 'IRR (Projected)'}</span>
                                     <span className="font-mono font-bold text-brand-600">22.4%</span>
                                 </div>
                             </div>
                        </div>
                    )}

                    {isPremium && activeTab === 'legal' && (
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 animate-in fade-in slide-in-from-bottom-2">
                             <h4 className="font-bold text-slate-900 mb-4">Risk Assessment Matrix</h4>
                             <div className="grid grid-cols-2 gap-4">
                                 <div className="p-4 bg-white rounded-xl border border-slate-100">
                                     <div className="text-xs font-bold text-slate-400 uppercase mb-1">Environmental</div>
                                     <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                         <CheckCircle className="h-4 w-4" /> Cleared (Phase I)
                                     </div>
                                 </div>
                                 <div className="p-4 bg-white rounded-xl border border-slate-100">
                                     <div className="text-xs font-bold text-slate-400 uppercase mb-1">Land Use Rights</div>
                                     <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                         <CheckCircle className="h-4 w-4" /> 50-Year Cert.
                                     </div>
                                 </div>
                                 <div className="p-4 bg-white rounded-xl border border-slate-100">
                                     <div className="text-xs font-bold text-slate-400 uppercase mb-1">Regulatory</div>
                                     <div className={`flex items-center gap-2 font-bold text-sm ${isCompleted ? 'text-emerald-600' : 'text-amber-500'}`}>
                                         {isCompleted ? <CheckCircle className="h-4 w-4"/> : <AlertTriangle className="h-4 w-4"/>}
                                         {isCompleted ? 'Fully Compliant' : 'Pending Review'}
                                     </div>
                                 </div>
                             </div>
                        </div>
                    )}
                    
                    {isPremium && activeTab === 'team' && (
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 animate-in fade-in slide-in-from-bottom-2">
                             <h4 className="font-bold text-slate-900 mb-4">Project Stakeholders</h4>
                             <div className="space-y-4">
                                 <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                                     <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">CEO</div>
                                     <div>
                                         <div className="font-bold text-slate-900">Zhang Wei</div>
                                         <div className="text-xs text-slate-500">Legal Representative</div>
                                     </div>
                                     <button className="ml-auto text-xs font-bold text-brand-600 border border-brand-200 px-3 py-1 rounded-full hover:bg-brand-50">View Profile</button>
                                 </div>
                                 <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                                     <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">CFO</div>
                                     <div>
                                         <div className="font-bold text-slate-900">Li Na</div>
                                         <div className="text-xs text-slate-500">Head of Finance</div>
                                     </div>
                                     <button className="ml-auto text-xs font-bold text-brand-600 border border-brand-200 px-3 py-1 rounded-full hover:bg-brand-50">View Profile</button>
                                 </div>
                             </div>
                        </div>
                    )}

                    {/* AI Generated Memo */}
                    <section>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                            <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                                <FileText className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{t.memo}</h3>
                        </div>

                        {isPremium ? (
                            <div className="prose prose-slate prose-lg max-w-none">
                                {isGenerating ? (
                                    <div className="flex flex-col items-center justify-center text-slate-500 p-16 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                        <Loader2 className="h-8 w-8 animate-spin text-brand-500 mb-4" />
                                        <p className="font-medium">Synthesizing real-time market data...</p>
                                    </div>
                                ) : (
                                    <div className="whitespace-pre-wrap text-slate-600 leading-relaxed font-light text-lg">
                                        {aiDetails}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4 text-slate-300">
                                <div className="h-4 w-full bg-slate-200 rounded"></div>
                                <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                                <div className="h-4 w-full bg-slate-200 rounded"></div>
                            </div>
                        )}
                    </section>

                     {/* Venture Capital & Funding Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                            <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                                <PieChart className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{t.vc}</h3>
                        </div>
                        
                        {/* Funding Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t.stage}</div>
                                <div className="text-lg font-bold text-slate-900">{vcData.stage}</div>
                            </div>
                             <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t.raised}</div>
                                <div className="text-lg font-bold text-slate-900">{vcData.raised}</div>
                            </div>
                             <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t.val}</div>
                                <div className="text-lg font-bold text-slate-900">{vcData.valuation}</div>
                            </div>
                        </div>

                        {/* Interactive Investors Cards (3D Flip) */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Users className="h-3 w-3" /> {t.investors}
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {vcData.investors.map((investor, i) => (
                                    <div key={i} className="group relative h-48 cursor-pointer perspective-1000">
                                        <div className="relative w-full h-full duration-700 transform-style-3d group-hover:rotate-y-180">
                                            
                                            {/* Front Face */}
                                            <div className="absolute inset-0 w-full h-full bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center backface-hidden shadow-sm">
                                                <div className="h-14 w-14 bg-white rounded-full border border-slate-100 flex items-center justify-center text-violet-600 shadow-sm mb-3">
                                                  <investor.icon className="h-6 w-6" />
                                                </div>
                                                <h5 className="font-bold text-slate-900 text-sm">{investor.name}</h5>
                                                <span className="text-[10px] uppercase font-bold text-violet-600 mt-2 bg-violet-50 px-2 py-0.5 rounded border border-violet-100">
                                                  {investor.type}
                                                </span>
                                            </div>

                                            {/* Back Face */}
                                            <div className="absolute inset-0 w-full h-full bg-violet-600 rounded-xl flex flex-col items-center justify-center p-6 text-center rotate-y-180 backface-hidden shadow-lg border border-violet-500">
                                                <div className="p-1.5 bg-white/20 rounded-full mb-3">
                                                   <Info className="h-4 w-4 text-white" />
                                                </div>
                                                <h5 className="font-bold text-white text-sm mb-2">{investor.name}</h5>
                                                <p className="text-[10px] text-violet-100 leading-relaxed font-medium">
                                                  "{investor.desc}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Owner Card with Contact Reveal */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 sticky top-8">
                        <h4 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-wider">{t.owner}</h4>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-serif text-2xl font-bold border border-slate-200">
                                {project.name.charAt(0)}
                            </div>
                            <div>
                                {isPremium ? (
                                    <>
                                        <div className="font-bold text-slate-900">Jiangsu Advanced Ind. Group</div>
                                        <div className="text-xs text-slate-500">Reg. No: 32100045</div>
                                    </>
                                ) : (
                                    <div className="font-bold text-slate-900 blur-[3px]">Confidential Entity</div>
                                )}
                                <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                                    <CheckCircle className="h-3 w-3" /> Verified
                                </div>
                            </div>
                        </div>

                        {isPremium && (
                            <div className="mb-6 space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Phone className="h-4 w-4 text-slate-400" /> +86 514 8820 1234
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail className="h-4 w-4 text-slate-400" /> invest@baoying-gov.cn
                                </div>
                            </div>
                        )}

                        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-brand-600 transition-all shadow-lg mb-3">
                            {t.request_intro}
                        </button>
                    </div>

                    <div className="p-8 rounded-3xl bg-brand-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-3xl opacity-20"></div>
                        <h4 className="font-bold text-brand-100 mb-4 text-xs uppercase tracking-wider relative z-10">{t.verdict}</h4>
                        <p className="text-sm text-slate-300 leading-relaxed italic mb-6 relative z-10">
                            {isCompleted 
                                ? '"This project set a new benchmark for cross-border integration efficiency. The clear regulatory pathway was a key success factor."'
                                : `"High priority opportunity. Strong government backing in the ${project.location} region implies lower regulatory friction. Recommended for institutional portfolios."`
                            }
                        </p>
                        <div className="flex items-center gap-3 relative z-10">
                             <div className="h-8 w-8 bg-brand-700 rounded-full flex items-center justify-center text-xs font-bold">AV</div>
                             <div className="text-xs font-bold">Alex Vane, Managing Partner</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};
