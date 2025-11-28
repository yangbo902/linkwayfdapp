
import React, { useState } from 'react';
import { Ruler, Weight, Zap, Truck, Warehouse, ArrowRight, PlayCircle, CheckCircle2, Download, Maximize2, X, Calendar, User, Mail, Building, Loader2, Check } from 'lucide-react';

interface FactoryShowcaseProps {
  language: string;
}

const TRANSLATIONS = {
  de: {
    title: "High-Standard-Fabriken",
    subtitle: "SOFORT EINZIEHBEREIT",
    desc: "Unsere modernen Standardfabrikgebäude der Klasse A verkürzen Ihre Zeit bis zur Produktion um 12 Monate. Ausgestattet für Industrie 4.0.",
    specs: { height: "Deckenhöhe", load: "Bodenbelastung", power: "Stromversorgung", lift: "Frachtaufzüge" },
    cta_visit: "Besichtigung buchen",
    cta_video: "Video-Rundgang",
    features: ["Feuerlöschsystem Klasse C", "Laderampen für Container", "Büroflächen inklusive", "Grüne Energieversorgung"],
    modal: {
      title: "Besichtigung vereinbaren",
      sub: "Füllen Sie das Formular aus, um eine Tour durch die Baoying Wirtschaftsentwicklungszone zu planen.",
      labels: { name: "Vollständiger Name", email: "Geschäfts-E-Mail", company: "Firmenname", date: "Wunschtermin" },
      btn: "Termin anfragen",
      success: "Anfrage erfolgreich gesendet!"
    }
  },
  en: {
    title: "High-Standard Factories",
    subtitle: "READY TO MOVE IN",
    desc: "Our Grade-A modern standard factory buildings reduce your time-to-production by 12 months. Fully equipped for Industry 4.0 manufacturing.",
    specs: { height: "Clear Height", load: "Floor Load", power: "Power Supply", lift: "Cargo Lifts" },
    cta_visit: "Book Site Visit",
    cta_video: "Video Tour",
    features: ["Class C Fire Protection", "Container Loading Docks", "Integrated Office Space", "Green Energy Ready"],
    modal: {
      title: "Schedule Site Visit",
      sub: "Fill out the form below to arrange a guided tour of the Baoying Economic Development Zone.",
      labels: { name: "Full Name", email: "Business Email", company: "Company Name", date: "Preferred Date" },
      btn: "Request Appointment",
      success: "Request Sent Successfully!"
    }
  },
  cn: {
    title: "高标准现代化厂房",
    subtitle: "拎包入住 · 快速投产",
    desc: "我们的甲级高标准厂房为您节省12个月的建设周期。专为先进制造设计，配备完善的工业基础设施。",
    specs: { height: "首层层高", load: "地面承重", power: "供电能力", lift: "货梯配置" },
    cta_visit: "预约实地考察",
    cta_video: "观看厂房视频",
    features: ["丙类消防标准", "专业卸货平台", "配套办公区域", "绿电直供接入"],
    modal: {
      title: "预约实地考察",
      sub: "请填写下方表格以安排参观宝应经济开发区。",
      labels: { name: "您的姓名", email: "企业邮箱", company: "公司名称", date: "期望日期" },
      btn: "提交预约申请",
      success: "申请已发送！"
    }
  }
};

export const FactoryShowcase: React.FC<FactoryShowcaseProps> = ({ language }) => {
  const [activePhase, setActivePhase] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', company: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  const factories = [
    {
      id: 1,
      name: "Phase I: Intelligent Equipment Park",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200",
      type: "Multi-story Concrete",
      available: "12,000 sqm",
      specs: {
        height: "1F: 12m / 2F: 6m",
        load: "3.0 Ton/sqm",
        power: "Dual Loop 10kV",
        lift: "2x 5-Ton Elevators"
      }
    },
    {
      id: 2,
      name: "Phase II: Electronic Info Park",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
      type: "Single-story Steel Structure",
      available: "8,500 sqm",
      specs: {
        height: "Clearance: 15m",
        load: "5.0 Ton/sqm",
        power: "Dual Loop 20kV",
        lift: "N/A (Ground Floor)"
      }
    }
  ];

  const currentFactory = factories.find(f => f.id === activePhase) || factories[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
        setFormState({ name: '', email: '', company: '', date: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
           <div>
              <div className="flex items-center gap-2 mb-2">
                  <span className="h-px w-8 bg-brand-600"></span>
                  <span className="text-brand-600 font-bold uppercase tracking-widest text-xs">{t.subtitle}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">{t.title}</h2>
           </div>
           
           {/* Tab Switcher */}
           <div className="flex gap-4 mt-6 md:mt-0">
              {factories.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActivePhase(f.id)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all border ${
                    activePhase === f.id 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-brand-500 hover:text-brand-600'
                  }`}
                >
                  {f.name}
                </button>
              ))}
           </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-2 shadow-xl border border-slate-200">
           <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Visual Side */}
              <div className="relative rounded-2xl overflow-hidden group h-[500px]">
                  <img 
                    src={currentFactory.image} 
                    alt={currentFactory.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Video Button Overlay */}
                  <button className="absolute inset-0 flex items-center justify-center group/btn">
                     <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-white/30 transition-all cursor-pointer">
                        <PlayCircle className="h-10 w-10 text-white" />
                     </div>
                  </button>

                  <div className="absolute bottom-6 left-6 text-white">
                      <div className="px-3 py-1 bg-brand-600 rounded text-xs font-bold uppercase tracking-wider mb-2 w-fit">
                        {currentFactory.type}
                      </div>
                      <div className="text-sm font-medium opacity-90">{t.cta_video}</div>
                  </div>
              </div>

              {/* Specs Side */}
              <div className="p-6 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{currentFactory.name}</h3>
                  <div className="text-emerald-600 font-bold text-lg mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Available: {currentFactory.available}
                  </div>
                  
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    {t.desc}
                  </p>

                  {/* Grid Specs */}
                  <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-100"><Ruler className="h-6 w-6"/></div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase font-bold">{t.specs.height}</div>
                              <div className="font-bold text-slate-900">{currentFactory.specs.height}</div>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-100"><Weight className="h-6 w-6"/></div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase font-bold">{t.specs.load}</div>
                              <div className="font-bold text-slate-900">{currentFactory.specs.load}</div>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-100"><Zap className="h-6 w-6"/></div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase font-bold">{t.specs.power}</div>
                              <div className="font-bold text-slate-900">{currentFactory.specs.power}</div>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-100"><Truck className="h-6 w-6"/></div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase font-bold">{t.specs.lift}</div>
                              <div className="font-bold text-slate-900">{currentFactory.specs.lift}</div>
                          </div>
                      </div>
                  </div>

                  <div className="space-y-3 mb-10">
                      {t.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-3">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                              <span className="text-slate-600 text-sm font-medium">{feat}</span>
                          </div>
                      ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 py-4 bg-brand-900 text-white rounded-xl font-bold hover:bg-brand-800 hover:shadow-xl hover:shadow-brand-900/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                          {t.cta_visit} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                          <Download className="h-4 w-4" /> Floor Plans (PDF)
                      </button>
                  </div>

              </div>
           </div>
        </div>

      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             {/* Header */}
             <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <h3 className="text-2xl font-serif font-bold mb-2">{t.modal.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{t.modal.sub}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-300">
                   <CheckCircle2 className="h-4 w-4" /> {currentFactory.name}
                </div>
             </div>
             
             {/* Form */}
             <div className="p-8">
               {isSuccess ? (
                 <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in">
                    <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                       <Check className="h-8 w-8" strokeWidth={3} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Success!</h4>
                    <p className="text-slate-500">{t.modal.success}</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.modal.labels.name}</label>
                       <div className="relative">
                          <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                          <input 
                            required
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-slate-900" 
                            placeholder="John Doe"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.modal.labels.email}</label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                          <input 
                            required
                            name="email"
                            type="email" 
                            value={formState.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-slate-900" 
                            placeholder="john@company.com"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.modal.labels.company}</label>
                        <div className="relative">
                            <Building className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            <input 
                              required
                              name="company"
                              value={formState.company}
                              onChange={handleInputChange}
                              type="text" 
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-slate-900" 
                              placeholder="Acme Corp"
                            />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.modal.labels.date}</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            <input 
                              required
                              name="date"
                              value={formState.date}
                              onChange={handleInputChange}
                              type="date" 
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-slate-900" 
                            />
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20 mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : t.modal.btn}
                    </button>
                 </form>
               )}
             </div>
          </div>
        </div>
      )}

    </section>
  );
};
