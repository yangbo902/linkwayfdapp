
import React, { useState } from 'react';
import { ShieldAlert, Scale, Lock, Eye, CheckCircle2, AlertTriangle, ArrowRight, Globe } from 'lucide-react';

interface RiskManagementProps {
  language: string;
}

export const RiskManagement: React.FC<RiskManagementProps> = ({ language }) => {
  const [activeRisk, setActiveRisk] = useState('regulatory');

  const risks = {
    regulatory: {
      title: language === 'cn' ? '合规与监管风险' : 'Regulatory & Compliance',
      icon: Scale,
      desc: language === 'cn' 
        ? '应对不断变化的跨境数据传输规定（如中国《数据安全法》）及欧盟反补贴调查。'
        : 'Navigating evolving cross-border data transfer laws (CN DSL) and EU anti-subsidy investigations.',
      solution: language === 'cn' 
        ? 'Linkway "GovSec" 协议：所有项目在启动前进行自动化的负面清单筛查和数据合规审计。'
        : 'Linkway "GovSec" Protocol: Automated negative list screening and data compliance audits before project initiation.'
    },
    geopolitical: {
      title: language === 'cn' ? '地缘政治与宏观' : 'Geopolitical & Macro',
      icon: Globe,
      desc: language === 'cn' 
        ? '供应链脱钩压力及关税波动对长期投资回报率的影响。'
        : 'Supply chain decoupling pressures and tariff volatility affecting long-term ROI.',
      solution: language === 'cn' 
        ? '“双循环”对冲策略：构建“中国为中国”的独立供应链，同时保留全球技术接口。'
        : '"Dual Circulation" Hedging: Structuring "In China, For China" supply chains while maintaining global IP interfaces.'
    },
    operational: {
      title: language === 'cn' ? '运营与落地' : 'Operational Execution',
      icon: ShieldAlert,
      desc: language === 'cn' 
        ? '施工延误、环保审批受阻以及跨文化管理冲突。'
        : 'Construction delays, environmental approval bottlenecks, and cross-cultural management conflicts.',
      solution: language === 'cn' 
        ? '并联审批承诺：利用政府绿色通道，将许可获取时间缩短60%，并派遣临时管理团队。'
        : 'Parallel Approval Guarantee: Leveraging government green channels to cut permitting time by 60%.'
    },
    financial: {
      title: language === 'cn' ? '资本与税务' : 'Capital & Tax',
      icon: Lock,
      desc: language === 'cn' 
        ? '外汇管制导致的利润汇出困难及转让定价税务风险。'
        : 'Profit repatriation challenges due to FX controls and transfer pricing tax risks.',
      solution: language === 'cn' 
        ? 'QFLP/ODI 结构优化：通过香港或新加坡设立中间架构，确保资本流动的灵活性与合规性。'
        : 'QFLP/ODI Structuring: optimizing capital flow flexibility via HK/SG intermediate structures.'
    }
  };

  const activeData = risks[activeRisk as keyof typeof risks];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left: Interactive Matrix */}
            <div className="lg:w-1/2 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6 border border-rose-100">
                    <ShieldAlert className="h-4 w-4" /> Risk Mitigation Matrix
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                    {language === 'cn' ? '全维风险免疫系统' : 'Full-Spectrum Risk Immunity'}
                </h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                    {language === 'cn' 
                        ? '投资不仅是为了获利，更是为了避险。我们的方法论核心在于建立多层防御体系。' 
                        : 'Investment is as much about risk avoidance as it is about profit. Our methodology is built on a multi-layered defense system.'}
                </p>

                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(risks).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setActiveRisk(key)}
                            className={`p-6 rounded-2xl border text-left transition-all duration-300 group ${
                                activeRisk === key 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105' 
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-white'
                            }`}
                        >
                            <data.icon className={`h-8 w-8 mb-4 ${activeRisk === key ? 'text-rose-400' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <h4 className={`font-bold text-sm ${activeRisk === key ? 'text-white' : 'text-slate-900'}`}>
                                {data.title}
                            </h4>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Detail View */}
            <div className="lg:w-1/2 w-full">
                <div className="bg-slate-950 rounded-3xl p-10 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-center shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/30 text-rose-400">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Risk Factor Identified</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4">{activeData.desc}</h3>
                        
                        <div className="h-px w-full bg-white/10 my-8"></div>
                        
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">
                                    Linkway Solution
                                </h4>
                                <p className="text-slate-300 leading-relaxed">
                                    {activeData.solution}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                            <button className="text-xs font-bold text-white flex items-center gap-2 group hover:text-rose-300 transition-colors">
                                View Compliance Docs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
