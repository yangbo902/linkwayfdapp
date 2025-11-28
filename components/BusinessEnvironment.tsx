
import React from 'react';
import { Timer, FileCheck, ThumbsUp, Wallet, ShieldCheck, PhoneCall, Building, Users } from 'lucide-react';

interface BusinessEnvironmentProps {
  language: string;
}

const TRANSLATIONS = {
  de: {
    title: "Weltklasse-Geschäftsumfeld",
    subtitle: "REGIERUNGSDIENSTE",
    desc: "Wir verstehen, dass Zeit Geld ist. Unsere reformierten Verwaltungsabläufe 'Baoying Speed' sorgen für minimale Bürokratie und maximale Effizienz.",
    cards: [
        { title: "0 Gebühren", subtitle: "Für Agenturdienste", icon: Wallet, desc: "Kostenlose Unterstützung bei Registrierung und Bankkontoeröffnung." },
        { title: "1 Tag", subtitle: "Gewerbeschein", icon: Timer, desc: "Erhalten Sie Ihre Geschäftslizenz innerhalb von 24 Stunden nach Einreichung." },
        { title: "Alles-in-Einem", subtitle: "Service-Halle", icon: Building, desc: "Alle Abteilungen (Steuer, Zoll, Arbeit) unter einem Dach." },
        { title: "Dediziert", subtitle: "Projektmanager", icon: Users, desc: "Jedem Großinvestor wird ein persönlicher Regierungsbeauftragter zugewiesen." }
    ],
    timeline: {
        t1: "Einreichung", t2: "Genehmigung", t3: "Konstruktion", t4: "Produktion"
    }
  },
  en: {
    title: "World-Class Business Environment",
    subtitle: "GOVERNMENT SERVICES",
    desc: "We understand that time is money. Our 'Baoying Speed' administrative reforms ensure minimal bureaucracy and maximum efficiency for foreign investors.",
    cards: [
        { title: "0 Fees", subtitle: "Agency Service", icon: Wallet, desc: "Free assistance for company registration and bank account opening." },
        { title: "1 Working Day", subtitle: "Business License", icon: Timer, desc: "Obtain your digital business license within 24 hours of submission." },
        { title: "All-in-One", subtitle: "Service Hall", icon: Building, desc: "All departments (Tax, Customs, Labor) located in one physical building." },
        { title: "Dedicated", subtitle: "Project Manager", icon: Users, desc: "Every major investor is assigned a personal government liaison officer." }
    ],
    timeline: {
        t1: "Submission", t2: "Approval", t3: "Construction", t4: "Production"
    }
  },
  cn: {
    title: "一流营商环境",
    subtitle: "政务服务体系",
    desc: "我们深知时间就是金钱。宝应深化“放管服”改革，打造“宝应速度”，为投资者提供极简审批和全流程帮办服务。",
    cards: [
        { title: "0 收费", subtitle: "全程代办服务", icon: Wallet, desc: "从公司注册到银行开户，政府专员全程免费帮办。" },
        { title: "1 个工作日", subtitle: "营业执照", icon: Timer, desc: "材料齐全，24小时内颁发电子营业执照。" },
        { title: "一窗通办", subtitle: "政务服务大厅", icon: Building, desc: "税务、海关、人社等部门集中办公，只进一扇门。" },
        { title: "专人专班", subtitle: "项目管家", icon: Users, desc: "重大项目实行“一企一策、专班服务”机制。" }
    ],
    timeline: {
        t1: "材料提交", t2: "并联审批", t3: "开工建设", t4: "竣工投产"
    }
  }
};

export const BusinessEnvironment: React.FC<BusinessEnvironmentProps> = ({ language }) => {
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck className="h-3 w-3" /> {t.subtitle}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">{t.title}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
                {t.desc}
            </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {t.cards.map((card, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <card.icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{card.title}</h3>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">{card.subtitle}</div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        {card.desc}
                    </p>
                </div>
            ))}
        </div>

        {/* Process Timeline Visualization */}
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-brand-600/30 rounded-full blur-[100px]"></div>

             <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                 <div className="lg:w-1/3">
                     <h3 className="text-3xl font-serif font-bold mb-4">"Green Channel"</h3>
                     <p className="text-slate-300 leading-relaxed mb-6">
                         Our Parallel Approval System compresses the timeline from land acquisition to construction permit by <span className="text-emerald-400 font-bold">60%</span> compared to the national average.
                     </p>
                     <div className="flex items-center gap-4">
                         <div className="flex -space-x-3">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 flex items-center justify-center text-slate-900 font-bold text-xs">
                                     <Users className="h-4 w-4" />
                                 </div>
                             ))}
                         </div>
                         <div className="text-sm font-bold text-slate-300">Dedicated Team</div>
                     </div>
                 </div>

                 <div className="lg:w-2/3 w-full">
                     <div className="relative pt-8">
                         {/* Line */}
                         <div className="absolute top-11 left-0 w-full h-0.5 bg-slate-700"></div>
                         
                         <div className="grid grid-cols-4 gap-4 relative">
                             {[
                                 { step: "01", label: t.timeline.t1, active: true },
                                 { step: "02", label: t.timeline.t2, active: true },
                                 { step: "03", label: t.timeline.t3, active: true },
                                 { step: "04", label: t.timeline.t4, active: true },
                             ].map((item, i) => (
                                 <div key={i} className="text-center relative group">
                                     <div className={`w-6 h-6 rounded-full mx-auto mb-4 border-2 relative z-10 transition-colors duration-500 ${item.active ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-900 border-slate-600'}`}></div>
                                     <div className="text-4xl font-bold text-slate-800 absolute top-[-40px] left-1/2 -translate-x-1/2 opacity-20 group-hover:opacity-40 transition-opacity">{item.step}</div>
                                     <div className="font-bold text-white text-sm md:text-base">{item.label}</div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             </div>
        </div>

      </div>
    </section>
  );
};
