
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Factory, Zap, TrendingUp, Users, Truck, Leaf, Cpu, Globe2, Anchor, ShieldCheck, Hammer, Settings, Plane, Ship, Box, ArrowRight, Activity, Workflow } from 'lucide-react';
import { IndustryId, Page } from '../types';

interface IndustryPageProps {
  industryId: IndustryId;
  language: string;
  onNavigate: (page: Page) => void;
}

const INDUSTRY_DATA = {
  'smart-grid': {
    title: { en: "Smart Grid & Electric Power", de: "Smart Grid & Energietechnik", cn: "智能电网与电力装备" },
    subtitle: { en: "The Intelligent Electrician Capital of China", de: "Chinas Hauptstadt der intelligenten Elektrik", cn: "中国智能电工之都" },
    heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
    stats: [
      { label: { en: "Annual Output", de: "Jahresleistung", cn: "年产值" }, value: "¥35B+" },
      { label: { en: "Enterprises", de: "Unternehmen", cn: "企业数量" }, value: "300+" },
      { label: { en: "Market Share", de: "Marktanteil", cn: "市场份额" }, value: "Top 3" }
    ],
    desc: {
      en: "Baoying is China's premier hub for transmission and distribution equipment. The cluster covers the entire value chain from insulating materials and electromagnetic wires to complete transformer units and smart substations.",
      de: "Baoying ist Chinas führendes Zentrum für Übertragungs- und Verteilungsausrüstung. Der Cluster deckt die gesamte Wertschöpfungskette ab, von Isoliermaterialien über elektromagnetische Drähte bis hin zu kompletten Transformatoren und intelligenten Umspannwerken.",
      cn: "宝应是中国首屈一指的输变电设备制造基地。该产业集群覆盖了从绝缘材料、电磁线到成套变压器和智能变电站的全产业链。"
    },
    advantages: [
      { title: { en: "Complete Supply Chain", de: "Komplette Lieferkette", cn: "完整产业链" }, desc: { en: "90% of components can be sourced within a 50km radius.", de: "90% der Komponenten können im Umkreis von 50 km beschafft werden.", cn: "90%的零部件可在50公里半径内采购。" } },
      { title: { en: "National Testing Center", de: "Nationales Testzentrum", cn: "国家级检测中心" }, desc: { en: "Local access to CNAS certified high-voltage testing facilities.", de: "Lokaler Zugang zu CNAS-zertifizierten Hochspannungsprüfeinrichtungen.", cn: "本地拥有CNAS认证的高压检测设施。" } },
      { title: { en: "Skilled Workforce", de: "Fachkräfte", cn: "熟练工人" }, desc: { en: "40,000+ specialized technicians in electrical engineering.", de: "40.000+ spezialisierte Techniker in der Elektrotechnik.", cn: "拥有4万多名电气工程专业技术人员。" } }
    ],
    ecosystem: {
      upstream: ["Copper Processing", "Insulation Materials", "Silicon Steel"],
      midstream: ["Transformers", "Switchgear", "Cables & Wires"],
      downstream: ["Smart Grid Installation", "Power Engineering", "Export"]
    }
  },
  'automotive': {
    title: { en: "Automotive Parts & NEV", de: "Automobilteile & NEV", cn: "汽车零部件与新能源" },
    subtitle: { en: "Critical Components for the EV Revolution", de: "Kritische Komponenten für die EV-Revolution", cn: "新能源汽车关键零部件基地" },
    heroImage: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&q=80&w=2000",
    stats: [
      { label: { en: "Annual Output", de: "Jahresleistung", cn: "年产值" }, value: "¥18B+" },
      { label: { en: "Tier 1 Suppliers", de: "Tier-1-Zulieferer", cn: "一级供应商" }, value: "25+" },
      { label: { en: "Growth Rate", de: "Wachstumsrate", cn: "增长率" }, value: "15% YoY" }
    ],
    desc: {
      en: "Focusing on thermal management systems, lightweight chassis components, and automotive electronics. Baoying serves major OEMs including Tesla, BYD, and Volkswagen via its strategic location in the Yangtze River Delta auto cluster.",
      de: "Fokus auf Thermomanagementsysteme, leichte Fahrwerkskomponenten und Automobilelektronik. Baoying beliefert große OEMs wie Tesla, BYD und Volkswagen über seinen strategischen Standort im Auto-Cluster des Jangtse-Deltas.",
      cn: "重点发展热管理系统、轻量化底盘部件和汽车电子。依托长三角汽车产业集群的战略区位，宝应为特斯拉、比亚迪和大众等主要主机厂提供配套。"
    },
    advantages: [
      { title: { en: "Logistics Hub", de: "Logistik-Hub", cn: "物流枢纽" }, desc: { en: "Within 2 hours of Shanghai, Nanjing, and Suzhou auto assembly plants.", de: "Innerhalb von 2 Stunden zu den Montagewerken in Shanghai, Nanjing und Suzhou.", cn: "2小时内可达上海、南京和苏州的汽车总装厂。" } },
      { title: { en: "Cost Efficiency", de: "Kosteneffizienz", cn: "成本效益" }, desc: { en: "Land and labor costs are 30% lower than Suzhou/Shanghai.", de: "Land- und Arbeitskosten sind 30% niedriger als in Suzhou/Shanghai.", cn: "土地和劳动力成本比苏州/上海低30%。" } },
      { title: { en: "R&D Support", de: "F&E-Unterstützung", cn: "研发支持" }, desc: { en: "Government grants for new production lines and tech upgrades.", de: "Staatliche Zuschüsse für neue Produktionslinien und technologische Upgrades.", cn: "政府为新生产线和技术升级提供补贴。" } }
    ],
    ecosystem: {
      upstream: ["Aluminum Die Casting", "Precision Machining", "Rubber & Plastics"],
      midstream: ["Thermal Systems", "Sensors", "Interiors"],
      downstream: ["OEM Assembly (SAIC, Tesla)", "Aftermarket", "Global Export"]
    }
  },
  'manufacturing': {
    title: { en: "Advanced Manufacturing", de: "Fortschrittliche Fertigung", cn: "高端装备制造" },
    subtitle: { en: "Precision, Automation, and Robotics", de: "Präzision, Automatisierung und Robotik", cn: "精密、自动化与机器人" },
    heroImage: "https://images.unsplash.com/photo-1565514020176-db47571101f7?auto=format&fit=crop&q=80&w=2000",
    stats: [
      { label: { en: "Hi-Tech Firms", de: "Hi-Tech-Firmen", cn: "高新企业" }, value: "120+" },
      { label: { en: "R&D Investment", de: "F&E-Investitionen", cn: "研发投入" }, value: "4.5%" },
      { label: { en: "Patents", de: "Patente", cn: "专利数" }, value: "5000+" }
    ],
    desc: {
      en: "A robust base for CNC machine tools, environmental protection equipment, and intelligent production lines. Baoying is driving the transition to Industry 4.0 with strong government incentives for digitization.",
      de: "Eine robuste Basis für CNC-Werkzeugmaschinen, Umweltschutzausrüstung und intelligente Produktionslinien. Baoying treibt den Übergang zu Industrie 4.0 mit starken staatlichen Anreizen für die Digitalisierung voran.",
      cn: "数控机床、环保设备和智能生产线的坚实基地。宝应通过强有力的政府数字化激励措施，推动向工业4.0转型。"
    },
    advantages: [
      { title: { en: "Industrial Land", de: "Industrieland", cn: "工业用地" }, desc: { en: "Ready-to-build plots with 'Seven Connections and One Leveling'.", de: "Baureife Grundstücke mit 'Sieben Anschlüssen und einer Nivellierung'.", cn: "具备“七通一平”条件的成熟工业用地。" } },
      { title: { en: "Talent Pool", de: "Talentpool", cn: "人才库" }, desc: { en: "Partnerships with 10+ regional vocational colleges.", de: "Partnerschaften mit 10+ regionalen Berufsschulen.", cn: "与10多所区域职业院校建立合作关系。" } },
      { title: { en: "Supply Chain", de: "Lieferkette", cn: "供应链" }, desc: { en: "Strong casting, forging, and heat treatment capabilities locally.", de: "Starke lokale Gießerei-, Schmiede- und Wärmebehandlungskapazitäten.", cn: "本地拥有强大的铸造、锻造和热处理能力。" } }
    ],
    ecosystem: {
      upstream: ["Specialty Steel", "Control Systems", "Hydraulics"],
      midstream: ["CNC Machines", "Robotics", "Pressure Vessels"],
      downstream: ["Aerospace", "Shipbuilding", "Heavy Industry"]
    }
  },
  'foods': {
    title: { en: "Ecological Foods", de: "Ökologische Lebensmittel", cn: "生态食品加工" },
    subtitle: { en: "From Farm to Table: Organic & Sustainable", de: "Vom Bauernhof auf den Tisch: Bio & Nachhaltig", cn: "从田间到餐桌：有机与可持续" },
    heroImage: "https://images.unsplash.com/photo-1625246333195-551291d3463c?auto=format&fit=crop&q=80&w=2000",
    stats: [
      { label: { en: "Wetland Area", de: "Feuchtgebiet", cn: "湿地面积" }, value: "600km²" },
      { label: { en: "Organic Brands", de: "Bio-Marken", cn: "有机品牌" }, value: "50+" },
      { label: { en: "Export Vol", de: "Exportvolumen", cn: "出口额" }, value: "$200M" }
    ],
    desc: {
      en: "Known as the 'Hometown of Lotus Root' in China. We leverage abundant wetland resources to produce organic vegetables, aquatic products, and processed foods for global markets, supported by advanced cold chain logistics.",
      de: "Bekannt als die 'Heimat der Lotuswurzel' in China. Wir nutzen reichhaltige Feuchtgebietsressourcen, um Bio-Gemüse, Wasserprodukte und verarbeitete Lebensmittel für globale Märkte zu produzieren, unterstützt durch fortschrittliche Kühlkettenlogistik.",
      cn: "享有中国“荷藕之乡”美誉。利用丰富的湿地资源，生产有机蔬菜、水产品和深加工食品，服务全球市场，拥有先进的冷链物流支持。"
    },
    advantages: [
      { title: { en: "Water Quality", de: "Wasserqualität", cn: "水质" }, desc: { en: "Protected National Ecological Demonstration Zone.", de: "Geschützte Nationale Ökologische Demonstrationszone.", cn: "受保护的国家级生态示范区。" } },
      { title: { en: "Cold Chain", de: "Kühlkette", cn: "冷链" }, desc: { en: "Modern logistics park with 100,000-ton cold storage capacity.", de: "Moderner Logistikpark mit 100.000 Tonnen Kühlkapazität.", cn: "拥有10万吨冷库容量的现代物流园。" } },
      { title: { en: "Brand Support", de: "Markenunterstützung", cn: "品牌支持" }, desc: { en: "Gov support for Geographical Indication (GI) certification.", de: "Staatliche Unterstützung für die Zertifizierung geografischer Angaben (g.A.).", cn: "政府支持地理标志（GI）认证。" } }
    ],
    ecosystem: {
      upstream: ["Organic Planting", "Aquaculture", "Greenhouses"],
      midstream: ["Deep Processing", "Packaging", "Freeze Drying"],
      downstream: ["Supermarkets", "E-commerce", "Global Export"]
    }
  }
};

const ManufacturingSupplyChain = ({ language }: { language: string }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const t = {
    upstream: language === 'de' ? 'Vorgelagert' : language === 'cn' ? '上游' : 'Upstream',
    raw: language === 'de' ? 'Rohstoffe & Komponenten' : language === 'cn' ? '原材料与零部件' : 'Raw Materials & Components',
    midstream: language === 'de' ? 'Produktion (Kern)' : language === 'cn' ? '中游制造' : 'Midstream (Core)',
    intel: language === 'de' ? 'Intelligente Fertigung' : language === 'cn' ? '智能制造' : 'Intelligent Manufacturing',
    cnc: language === 'de' ? 'CNC-Einheiten' : language === 'cn' ? '数控机床' : 'CNC Units',
    robots: language === 'de' ? 'Industrieroboter' : language === 'cn' ? '工业机器人' : 'Industrial Robots',
    downstream: language === 'de' ? 'Nachgelagert' : language === 'cn' ? '下游' : 'Downstream',
    app: language === 'de' ? 'Industrielle Anwendungen' : language === 'cn' ? '工业应用' : 'Industrial Apps',
    aero: language === 'de' ? 'Luftfahrt' : language === 'cn' ? '航空航天' : 'Aerospace',
    marine: language === 'de' ? 'Schifffahrt' : language === 'cn' ? '船舶制造' : 'Marine',
    heavy: language === 'de' ? 'Schwerindustrie' : language === 'cn' ? '重工业' : 'Heavy Ind.'
  };

  return (
      <div className="bg-white p-10 rounded-3xl border border-slate-200 animate-fade-in-up shadow-xl relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-12 flex items-center gap-2 relative z-10">
           <Workflow className="h-4 w-4" /> Value Chain Schematic
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 z-10">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-brand-500 to-indigo-500 opacity-30 animate-pulse"></div>
                {/* Moving Particles */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>
            
            {/* Upstream Node */}
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredNode('upstream')}
              onMouseLeave={() => setHoveredNode(null)}
            >
               <div className={`w-36 h-36 rounded-3xl border-2 flex flex-col items-center justify-center bg-white transition-all duration-500 relative z-10 ${hoveredNode === 'upstream' ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 -translate-y-2' : 'border-slate-100 shadow-sm'}`}>
                   <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3 transition-transform duration-500 group-hover:rotate-12">
                       <Box className="h-6 w-6" />
                   </div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t.upstream}</div>
                   <div className="text-xs font-bold text-slate-800 text-center px-4 leading-tight">{t.raw}</div>
                   
                   {/* Tooltip */}
                   <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 bg-white text-slate-700 p-4 rounded-xl border border-slate-100 text-xs shadow-xl transition-all duration-300 transform origin-top ${hoveredNode === 'upstream' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
                       <ul className="space-y-2 relative z-10">
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Specialty Steel & Alloys</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Electronic Components</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Precision Hydraulics</li>
                       </ul>
                   </div>
               </div>
            </div>

            {/* Midstream Node (Hero) */}
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredNode('midstream')}
              onMouseLeave={() => setHoveredNode(null)}
            >
               <div className={`w-48 h-48 rounded-[2rem] border-4 flex flex-col items-center justify-center bg-brand-600 text-white transition-all duration-500 relative z-20 shadow-2xl ${hoveredNode === 'midstream' ? 'border-brand-400 scale-110 shadow-brand-600/40 -translate-y-2' : 'border-brand-500 shadow-brand-600/20'}`}>
                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[1.7rem]"></div>
                   <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4 backdrop-blur-sm shadow-inner transition-all duration-700 group-hover:scale-110">
                       <Settings className="h-7 w-7 animate-[spin_10s_linear_infinite]" />
                   </div>
                   <div className="text-xs font-bold text-brand-200 uppercase tracking-wider mb-1">{t.midstream}</div>
                   <div className="text-lg font-bold text-white text-center px-2">{t.intel}</div>

                    {/* Tooltip */}
                   <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 w-64 bg-white text-slate-900 border border-slate-100 p-5 rounded-2xl text-xs shadow-2xl transition-all duration-300 transform origin-top z-30 ${hoveredNode === 'midstream' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
                       <div className="font-bold text-brand-600 mb-3 uppercase tracking-wide text-[10px] flex items-center gap-2">
                          <Activity className="h-3 w-3" /> Core Capabilities
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                          <span className="px-3 py-2 bg-brand-50 rounded-lg border border-brand-100 text-center font-semibold text-brand-900">{t.cnc}</span>
                          <span className="px-3 py-2 bg-brand-50 rounded-lg border border-brand-100 text-center font-semibold text-brand-900">{t.robots}</span>
                          <span className="px-3 py-2 bg-brand-50 rounded-lg border border-brand-100 text-center font-semibold text-brand-900">3D Print</span>
                          <span className="px-3 py-2 bg-brand-50 rounded-lg border border-brand-100 text-center font-semibold text-brand-900">IoT</span>
                       </div>
                   </div>
               </div>
               {/* Pulsing Rings */}
               <div className="absolute inset-0 rounded-[2rem] border-2 border-brand-500 opacity-0 group-hover:opacity-100 animate-ping z-10 pointer-events-none"></div>
               <div className="absolute inset-0 rounded-[2rem] border border-brand-400 opacity-0 group-hover:opacity-100 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] z-10 pointer-events-none [animation-delay:0.2s]"></div>
            </div>

            {/* Downstream Node */}
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredNode('downstream')}
              onMouseLeave={() => setHoveredNode(null)}
            >
               <div className={`w-36 h-36 rounded-3xl border-2 flex flex-col items-center justify-center bg-white transition-all duration-500 relative z-10 ${hoveredNode === 'downstream' ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 -translate-y-2' : 'border-slate-100 shadow-sm'}`}>
                   <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3 transition-transform duration-500 group-hover:-rotate-12">
                       <Plane className="h-6 w-6" />
                   </div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t.downstream}</div>
                   <div className="text-xs font-bold text-slate-800 text-center px-4 leading-tight">{t.app}</div>
                   
                   {/* Tooltip */}
                   <div className={`absolute top-full right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 mt-6 w-56 bg-white text-slate-700 p-4 rounded-xl border border-slate-100 text-xs shadow-xl transition-all duration-300 transform origin-top z-30 ${hoveredNode === 'downstream' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
                       <ul className="space-y-2 relative z-10">
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>{t.aero}</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>{t.marine}</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>{t.heavy}</li>
                       </ul>
                   </div>
               </div>
            </div>

        </div>
      </div>
  );
};

export const IndustryPage: React.FC<IndustryPageProps> = ({ industryId, language, onNavigate }) => {
  const data = INDUSTRY_DATA[industryId];
  const langKey = language === 'cn' ? 'cn' : language === 'de' ? 'de' : 'en';

  if (!data) return <div>Industry Not Found</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
          >
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">
              {language === 'de' ? 'Zurück zur Übersicht' : language === 'cn' ? '返回首页' : 'Back to Home'}
            </span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30 backdrop-blur-md shadow-lg">
            <Factory className="h-4 w-4" />
            {data.title[langKey]}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 max-w-4xl leading-tight">
            {data.subtitle[langKey]}
          </h1>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl font-bold text-brand-600 mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">{stat.label[langKey]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview & Advantages */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Overview */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {language === 'de' ? 'Industrieüberblick' : language === 'cn' ? '产业概况' : 'Industry Overview'}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {data.desc[langKey]}
              </p>
              
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-brand-600" />
                  {language === 'de' ? 'Warum Baoying?' : language === 'cn' ? '为什么选择宝应？' : 'Why Baoying?'}
                </h3>
                <div className="space-y-6">
                  {data.advantages.map((adv, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-600 group-hover:border-brand-300 group-hover:bg-brand-50 transition-colors shadow-sm">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-brand-700 transition-colors">{adv.title[langKey]}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{adv.desc[langKey]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Ecosystem Map */}
            <div className="lg:w-1/2">
               <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                 {language === 'de' ? 'Ökosystem-Karte' : language === 'cn' ? '产业链图谱' : 'Ecosystem Map'}
                 <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider border border-slate-200">Interactive</span>
               </h2>
               
               {industryId === 'manufacturing' ? (
                  <ManufacturingSupplyChain language={language} />
               ) : (
                  <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
                        {/* Upstream */}
                        <div className="relative group">
                          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-slate-200 group-hover:border-brand-500 transition-colors"></div>
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:border-brand-200 transition-all duration-300">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <Anchor className="h-6 w-6" strokeWidth={1.5} />
                                </div>
                                <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                                    {language === 'de' ? 'Vorgelagert' : language === 'cn' ? '上游原材料' : 'Upstream'}
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {data.ecosystem.upstream.map((item, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors cursor-default">
                                    {item}
                                </span>
                                ))}
                              </div>
                          </div>
                        </div>

                        {/* Midstream */}
                        <div className="relative group">
                          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-brand-500 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"></div>
                          <div className="bg-brand-600 p-8 rounded-2xl shadow-xl transform scale-105 transition-transform duration-300">
                              <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
                                    <Cpu className="h-6 w-6" strokeWidth={1.5} />
                                </div>
                                <h4 className="font-bold text-brand-100 text-xs uppercase tracking-wider">
                                    {language === 'de' ? 'Produktion (Kern)' : language === 'cn' ? '中游制造' : 'Midstream (Core)'}
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {data.ecosystem.midstream.map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-white text-brand-900 rounded-lg text-sm font-bold shadow-md hover:scale-105 transition-transform cursor-default">
                                    {item}
                                </span>
                                ))}
                              </div>
                          </div>
                        </div>

                        {/* Downstream */}
                        <div className="relative group">
                          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-slate-200 group-hover:border-indigo-500 transition-colors"></div>
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:border-indigo-200 transition-all duration-300">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <Globe2 className="h-6 w-6" strokeWidth={1.5} />
                                </div>
                                <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                                    {language === 'de' ? 'Nachgelagert' : language === 'cn' ? '下游应用' : 'Downstream'}
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {data.ecosystem.downstream.map((item, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors cursor-default">
                                    {item}
                                </span>
                                ))}
                              </div>
                          </div>
                        </div>
                   </div>
               )}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
           <h2 className="text-3xl font-bold mb-6">
             {language === 'de' ? 'Bereit zu investieren?' : language === 'cn' ? '准备好投资了吗？' : 'Ready to Invest?'}
           </h2>
           <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
             {language === 'de' 
               ? 'Erhalten Sie detaillierte Marktberichte und verfügbare Flächen für diesen Sektor.'
               : language === 'cn'
               ? '获取该行业的详细市场报告和可用地块信息。'
               : 'Get detailed market reports and available sites specifically for this sector.'}
           </p>
           <button 
             onClick={() => onNavigate('projects')}
             className="px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold transition-all shadow-xl shadow-brand-900/50 hover:shadow-brand-600/50 hover:-translate-y-1 flex items-center gap-3 mx-auto"
           >
             {language === 'de' ? 'Verfügbare Flächen ansehen' : language === 'cn' ? '查看可用地块' : 'View Available Sites'}
             <ArrowRight className="h-5 w-5" />
           </button>
        </div>
      </section>

    </div>
  );
};
