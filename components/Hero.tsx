import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Database, Server, ShieldCheck, ArrowDownToLine, PlaneTakeoff, RefreshCcw, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

interface HeroProps {
  language: string;
  investmentMode: 'FDI' | 'ODI';
  onModeChange: (mode: 'FDI' | 'ODI') => void;
}

const TRANSLATIONS = {
  en: {
    system_status: "System Operational",
    title_1: "The Operating System for",
    title_2_fdi: "Inbound Capital (FDI)",
    title_2_odi: "Global Expansion (ODI)",
    desc_fdi: "Accelerate your entry into China's advanced manufacturing sector. We combine real-time market intelligence with government-backed site selection.",
    desc_odi: "Execute your global strategy with precision. We facilitate M&A, technology acquisition, and operational setup for Chinese enterprises expanding to Europe.",
    cta_launch: "Launch Platform",
    cta_data: "View Data Sources",
    powered_by: "Powered By"
  },
  de: {
    system_status: "System Betriebsbereit",
    title_1: "Das Betriebssystem für",
    title_2_fdi: "Investitionen (FDI)",
    title_2_odi: "Globale Expansion (ODI)",
    desc_fdi: "Beschleunigen Sie Ihren Markteintritt in China. Wir kombinieren Echtzeit-Marktinformationen mit staatlich unterstützter Standortwahl.",
    desc_odi: "Führen Sie Ihre globale Strategie präzise aus. Wir erleichtern M&A und technologische Akquisitionen für die Expansion nach Europa.",
    cta_launch: "Plattform Starten",
    cta_data: "Datenquellen",
    powered_by: "Unterstützt durch"
  },
  cn: {
    system_status: "系统运行正常",
    title_1: "跨境资本的",
    title_2_fdi: "入境投资 (FDI)",
    title_2_odi: "出海战略 (ODI)",
    desc_fdi: "加速您进入中国先进制造业的步伐。我们将实时市场情报与政府支持的选址服务相结合。",
    desc_odi: "精准执行您的全球战略。我们协助中国企业赴欧进行并购、技术收购和运营落地。",
    cta_launch: "启动平台",
    cta_data: "查看数据源",
    powered_by: "技术支持"
  }
};

// --- 3D Globe Component (High Performance) ---
const NetworkGlobe: React.FC<{ colorTheme: string }> = ({ colorTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | undefined>(undefined); 
  
  const targetColorRef = useRef({ r: 59, g: 130, b: 246 });
  const currentColorRef = useRef({ r: 59, g: 130, b: 246 });

  useEffect(() => {
    if (colorTheme === 'emerald') {
        targetColorRef.current = { r: 16, g: 185, b: 129 };
    } else {
        targetColorRef.current = { r: 59, g: 130, b: 246 };
    }
  }, [colorTheme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        // Simple normalization
        mouseRef.current = {
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: (e.clientY / window.innerHeight) * 2 - 1
        };
    };
    // Optimization: throttling or using passive event listeners usually helps, 
    // but for simple ref updates direct is fine.
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let globeRadius = Math.min(width, height) * 0.45; 
    let cx = width > 1024 ? width * 0.75 : width / 2;
    let cy = height / 2;

    // Optimization: Reduced count for better mobile performance
    const DOT_COUNT = 800; 
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    
    // Pre-allocate dot objects
    const dots = new Array(DOT_COUNT);
    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2; 
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      dots[i] = {
        x: Math.cos(theta) * radius,
        y: y,
        z: Math.sin(theta) * radius,
        px: 0, py: 0, scale: 0, opacity: 0, depth: 0
      };
    }

    // Links
    const LINKS_COUNT = 150;
    const links = new Array(LINKS_COUNT);
    for (let i = 0; i < LINKS_COUNT; i++) {
        const a = Math.floor(Math.random() * DOT_COUNT);
        let b = Math.floor(Math.random() * DOT_COUNT);
        links[i] = { a, b, opacity: Math.random() };
    }

    let rotationX = 0;
    let rotationY = 0;
    let autoRotation = 0;

    const render = () => {
        ctx.clearRect(0, 0, width, height);

        // Color Interpolation
        const tr = targetColorRef.current.r;
        const tg = targetColorRef.current.g;
        const tb = targetColorRef.current.b;
        
        currentColorRef.current.r += (tr - currentColorRef.current.r) * 0.05;
        currentColorRef.current.g += (tg - currentColorRef.current.g) * 0.05;
        currentColorRef.current.b += (tb - currentColorRef.current.b) * 0.05;
        
        const r = Math.round(currentColorRef.current.r);
        const g = Math.round(currentColorRef.current.g);
        const b = Math.round(currentColorRef.current.b);
        const colorString = `${r}, ${g}, ${b}`;

        // Rotation Logic
        autoRotation += 0.0008; 
        if (autoRotation > Math.PI * 2) autoRotation -= Math.PI * 2;
        
        const targetRotX = mouseRef.current.y * 0.3;
        const targetRotY = mouseRef.current.x * 0.3;
        
        rotationX += (targetRotX - rotationX) * 0.05;
        rotationY += (targetRotY - rotationY) * 0.05;

        const finalRotY = autoRotation + rotationY;
        const finalRotX = rotationX + 0.3; 

        const cosY = Math.cos(finalRotY);
        const sinY = Math.sin(finalRotY);
        const cosX = Math.cos(finalRotX);
        const sinX = Math.sin(finalRotX);

        // Project Dots
        for (let i = 0; i < DOT_COUNT; i++) {
            const dot = dots[i];
            
            const x1 = dot.x * cosY - dot.z * sinY;
            const z1 = dot.z * cosY + dot.x * sinY;
            
            const y1 = dot.y * cosX - z1 * sinX;
            const z2 = z1 * cosX + dot.y * sinX;

            const perspective = 2.5; 
            const scale = perspective / (perspective + z2);
            
            dot.px = cx + x1 * globeRadius;
            dot.py = cy + y1 * globeRadius;
            dot.scale = scale;
            dot.opacity = Math.max(0.1, (z2 + 0.8) * 0.8);
            dot.depth = z2; 
        }

        // Draw Links
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = `rgba(${colorString}, 0.15)`;
        ctx.beginPath();
        for (let i = 0; i < LINKS_COUNT; i++) {
            const link = links[i];
            const p1 = dots[link.a];
            const p2 = dots[link.b];
            
            const dx = p1.px - p2.px;
            const dy = p1.py - p2.py;
            // Optimization: squared distance check + depth check
            if ((dx*dx + dy*dy) < 6000 && p1.opacity > 0.2 && p2.opacity > 0.2) {
                 ctx.moveTo(p1.px, p1.py);
                 ctx.lineTo(p2.px, p2.py);
            }
        }
        ctx.stroke();

        // Draw Dots - Batch 1: Background (No Shadow)
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${colorString}, 0.8)`; // Set once for batch
        ctx.beginPath();
        for (let i = 0; i < DOT_COUNT; i++) {
            const dot = dots[i];
            if (dot.depth > 0.4 || dot.opacity <= 0.1) continue; 

            // Individual opacity via globalAlpha would be slow, but since we set style string...
            // Optimization: Just draw small rects or arcs. Arcs are nicer.
            // To support varying opacity efficiently in one batch, we'd need per-vertex alpha which canvas 2d doesn't do easily without style changes.
            // Compromise: Group by opacity buckets? No, too complex.
            // Revert to setting fillStyle inside loop for correctness, but keep shadowBlur outside.
            ctx.fillStyle = `rgba(${colorString}, ${dot.opacity})`;
            ctx.moveTo(dot.px, dot.py);
            ctx.arc(dot.px, dot.py, 1.8 * dot.scale, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw Dots - Batch 2: Foreground (With Shadow)
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${colorString}, 0.6)`;
        ctx.beginPath();
        for (let i = 0; i < DOT_COUNT; i++) {
            const dot = dots[i];
            if (dot.depth <= 0.4 || dot.opacity <= 0.1) continue;

            ctx.fillStyle = `rgba(${colorString}, ${dot.opacity})`;
            ctx.moveTo(dot.px, dot.py);
            ctx.arc(dot.px, dot.py, 1.8 * dot.scale, 0, Math.PI * 2);
        }
        ctx.fill();

        requestRef.current = requestAnimationFrame(render);
    };
    
    // Observer for pausing when off-screen
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                if (!requestRef.current) {
                    render();
                }
            } else {
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current);
                    requestRef.current = undefined;
                }
            }
        },
        { threshold: 0 }
    );
    
    observer.observe(canvas);

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        globeRadius = Math.min(width, height) * 0.45;
        cx = width > 1024 ? width * 0.75 : width / 2;
        cy = height / 2;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
    };

  }, [colorTheme]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.9 }} />;
};

export const Hero: React.FC<HeroProps> = ({ language, investmentMode, onModeChange }) => {
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  const isFDI = investmentMode === 'FDI';
  const themeText = isFDI ? 'text-brand-400' : 'text-emerald-400';
  const themeBg = isFDI ? 'bg-brand-600' : 'bg-emerald-600';
  const themeGradient = isFDI ? 'from-brand-400 via-brand-200 to-white' : 'from-emerald-400 via-emerald-200 to-white';

  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 lg:pt-28 overflow-hidden bg-slate-950 transition-colors duration-1000">
      
      {/* 3D Network Globe Background */}
      <div className="absolute inset-0 bg-slate-950">
          <NetworkGlobe colorTheme={isFDI ? 'blue' : 'emerald'} />
          
          {/* Gradients to blend globe with content */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-0"></div>
          
          <div className={`absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen animate-pulse-slow transition-colors duration-1000 ${isFDI ? 'bg-brand-600/10' : 'bg-emerald-600/10'}`}></div>
      </div>

      <div ref={heroRef} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="max-w-3xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left">
               {/* Mode Toggler */}
               <div className={`inline-flex items-center gap-1 p-1 rounded-full bg-slate-900 border border-slate-700 mb-8 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <button 
                        onClick={() => onModeChange('FDI')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${isFDI ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        <ArrowDownToLine className="h-3 w-3" /> FDI (Inbound)
                    </button>
                    <button 
                        onClick={() => onModeChange('ODI')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${!isFDI ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        <PlaneTakeoff className="h-3 w-3" /> ODI (Outbound)
                    </button>
               </div>
               
               <div 
                   className={`flex items-center gap-2 mb-4 text-xs font-mono font-bold uppercase tracking-widest ${themeText} transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                   style={{ transitionDelay: '100ms' }}
               >
                   <div className={`w-2 h-2 rounded-full animate-pulse ${isFDI ? 'bg-brand-500' : 'bg-emerald-500'}`}></div>
                   Linkway OS v2.4 · {t.system_status}
               </div>

               {/* Title - Optimized for Stacked Layout on Mobile */}
               <h1 
                   className={`text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold text-white leading-tight lg:leading-[1.1] mb-6 tracking-tight transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                   style={{ transitionDelay: '200ms' }}
               >
                  <span className="block lg:inline">{t.title_1}</span>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeGradient} transition-all duration-1000 block mt-2 lg:inline lg:mt-0`}>
                    {isFDI ? t.title_2_fdi : t.title_2_odi}
                  </span>
               </h1>

               {/* Description - Increased readability size */}
               <p 
                   className={`text-lg text-slate-300 mb-8 lg:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                   style={{ transitionDelay: '300ms' }}
               >
                  {isFDI ? t.desc_fdi : t.desc_odi}
               </p>

               <div 
                   className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                   style={{ transitionDelay: '400ms' }}
               >
                  <button className={`px-8 py-4 ${themeBg} hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group border border-white/10 font-display`}>
                     {t.cta_launch}
                     <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-slate-900/50 border border-slate-700 hover:border-slate-600 text-slate-300 font-bold rounded-xl hover:text-white transition-all flex items-center justify-center gap-2 backdrop-blur-md font-display">
                     <Database className="h-4 w-4" /> {t.cta_data}
                  </button>
               </div>

               <div 
                   className={`mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-slate-500 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                   style={{ transitionDelay: '500ms' }}
               >
                   <span className="text-xs font-semibold uppercase tracking-widest font-mono">{t.powered_by}</span>
                   <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                      <span className="font-bold text-lg text-slate-300 flex items-center gap-2 font-display"><Server className="h-4 w-4"/> Linkway Cloud</span>
                      <span className="font-bold text-lg text-slate-300 flex items-center gap-2 font-display"><ShieldCheck className="h-4 w-4"/> GovSec</span>
                   </div>
               </div>
            </div>

            {/* Right Visuals - SaaS Dashboard Mockup */}
            <div 
                className={`relative hidden lg:block perspective-1000 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0 rotate-x-[5deg] rotate-y-[-10deg]' : 'opacity-0 translate-y-12 rotate-x-0 rotate-y-0'}`} 
                style={{ transitionDelay: '400ms' }}
            >
                
                {/* Main Dashboard Window */}
                <div className="relative z-10 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
                    
                    {/* Window Controls */}
                    <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <div className="ml-4 px-3 py-1 bg-slate-900 rounded-md border border-slate-700 text-[10px] text-slate-400 font-mono flex-grow text-center flex items-center justify-between">
                            <span>app.linkwayfdi.com/dashboard/{isFDI ? 'inbound' : 'outbound'}</span>
                            <RefreshCcw className="h-3 w-3" />
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-6 grid grid-cols-2 gap-6">
                        {/* KPI 1 */}
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <div className="text-xs text-slate-400 mb-1 font-mono uppercase">{isFDI ? 'Active Sites' : 'M&A Targets'}</div>
                            <div className="text-2xl font-bold text-white mb-2 font-mono">{isFDI ? '3 Active' : '12 Scouted'}</div>
                            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full w-[60%] transition-colors duration-500 ${isFDI ? 'bg-brand-500' : 'bg-emerald-500'}`}></div>
                            </div>
                        </div>
                         {/* KPI 2 */}
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <div className="text-xs text-slate-400 mb-1 font-mono uppercase">{isFDI ? 'Capital Deployed' : 'Deal Volume'}</div>
                            <div className="text-2xl font-bold text-white mb-2 font-mono">€{isFDI ? '4.2M' : '15.5M'}</div>
                             <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full w-[85%] transition-colors duration-500 ${isFDI ? 'bg-brand-500' : 'bg-emerald-500'}`}></div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="col-span-2 bg-slate-800/50 p-4 rounded-lg border border-slate-700 h-32 flex items-end justify-between gap-1 relative overflow-hidden">
                             <div className="absolute top-2 left-2 text-xs text-slate-400 font-mono uppercase">Market Opportunity Index</div>
                             {/* Fake Bars */}
                             {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                                 <div key={i} className={`w-full transition-colors duration-500 rounded-t-sm ${isFDI ? 'bg-brand-500/20 hover:bg-brand-500/40' : 'bg-emerald-500/20 hover:bg-emerald-500/40'}`} style={{ height: `${h}%` }}></div>
                             ))}
                        </div>

                         {/* Compliance List */}
                         <div className="col-span-2 space-y-2">
                             <div className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider font-mono">Compliance Checklist</div>
                             <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700">
                                 <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                                     <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {isFDI ? 'Site Environmental Audit' : 'Financial Due Diligence'}
                                 </div>
                                 <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">PASSED</span>
                             </div>
                              <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700">
                                 <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                                     <AlertCircle className="h-3 w-3 text-amber-500" /> {isFDI ? 'Regulatory Filing (NDRC)' : 'ODI Registration'}
                                 </div>
                                 <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono">PENDING</span>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Floating Notification Element */}
                <div className="absolute top-20 -right-10 z-20 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-float max-w-[200px]">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isFDI ? 'bg-brand-500/20' : 'bg-emerald-500/20'}`}>
                        <Lock className={`h-4 w-4 ${isFDI ? 'text-brand-400' : 'text-emerald-400'}`} />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Secure Data Room</div>
                        <div className="text-xs font-bold text-white font-display">5 New Documents</div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};