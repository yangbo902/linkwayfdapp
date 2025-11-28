
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Check, LayoutGrid, Mail, Clock, MapPin, Phone, Zap } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: Page) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  theme?: 'dark' | 'light';
  investmentMode?: 'FDI' | 'ODI';
  onModeChange?: (mode: 'FDI' | 'ODI') => void;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'cn', name: '中文', flag: '🇨🇳' },
];

const NAV_TRANSLATIONS = {
  en: {
    Platform: 'Platform',
    Engine: 'Engine',
    Capabilities: 'Capabilities',
    Ecosystem: 'Ecosystem',
    Network: 'Network',
    Start: 'Start Project',
    SystemMode: 'SYSTEM_MODE',
    Inbound: 'INBOUND (FDI)',
    Outbound: 'OUTBOUND (ODI)',
    InboundMobile: 'Inbound (FDI)',
    OutboundMobile: 'Outbound (ODI)'
  },
  de: {
    Platform: 'Plattform',
    Engine: 'Motor',
    Capabilities: 'Leistung',
    Ecosystem: 'Ökosystem',
    Network: 'Netzwerk',
    Start: 'Projekt Starten',
    SystemMode: 'SYSTEM_MODUS',
    Inbound: 'EINGEHEND (FDI)',
    Outbound: 'AUSGEHEND (ODI)',
    InboundMobile: 'Eingehend (FDI)',
    OutboundMobile: 'Ausgehend (ODI)'
  },
  cn: {
    Platform: '平台体系',
    Engine: '执行引擎',
    Capabilities: '核心能力',
    Ecosystem: '产业生态',
    Network: '全球网络',
    Start: '启动项目',
    SystemMode: '系统模式',
    Inbound: '入境投资 (FDI)',
    Outbound: '出海投资 (ODI)',
    InboundMobile: '入境 (FDI)',
    OutboundMobile: '出海 (ODI)'
  }
};

export const Header: React.FC<HeaderProps> = ({ 
    currentPage, 
    onNavigate, 
    language, 
    onLanguageChange, 
    theme = 'dark',
    investmentMode = 'FDI',
    onModeChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = NAV_TRANSLATIONS[language as keyof typeof NAV_TRANSLATIONS] || NAV_TRANSLATIONS.en;

  const navLinks: { name: string; target: Page }[] = [
    { name: t.Platform, target: 'services' },      
    { name: t.Engine, target: 'methodology' },     
    { name: t.Capabilities, target: 'capabilities' }, 
    { name: t.Ecosystem, target: 'ecosystem' },   
    { name: t.Network, target: 'partners' },
  ];

  const handleNavClick = (e: React.MouseEvent, target: Page) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(target);
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const getTextColor = () => {
    if (isScrolled) return 'text-slate-200';
    return theme === 'light' ? 'text-slate-900' : 'text-slate-200';
  };
  
  const getLogoColor = () => {
      if (isScrolled) return 'text-white';
      return theme === 'light' ? 'text-slate-900' : 'text-white';
  };

  const getButtonClass = () => {
      if (isScrolled) {
          return investmentMode === 'FDI' 
            ? 'bg-brand-600 border-brand-500 text-white hover:bg-brand-500 shadow-brand-900/20' 
            : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500 shadow-emerald-900/20';
      }
      if (theme === 'light') return 'bg-slate-900 text-white hover:bg-slate-800 border-slate-900';
      return 'bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm';
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 top-0`}>
      {/* Top Bar - Collapses on Scroll */}
      <div className={`w-full overflow-hidden transition-all duration-500 ${
          isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
      } ${theme === 'light' ? 'bg-slate-100 border-b border-slate-200' : 'bg-slate-950 border-b border-white/5'}`}>
          <div className={`container mx-auto px-6 h-full flex justify-between items-center text-[10px] md:text-xs font-medium font-mono ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              <div className="flex items-center gap-6">
                  <button 
                    onClick={() => onModeChange && onModeChange(investmentMode === 'FDI' ? 'ODI' : 'FDI')}
                    className={`flex items-center gap-2 transition-colors cursor-pointer hover:opacity-80`}
                    title="Click to toggle system mode"
                  >
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${investmentMode === 'FDI' ? 'bg-brand-500 shadow-[0_0_10px_#3b82f6]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`}></div>
                      <span className={investmentMode === 'FDI' ? 'text-brand-500 font-bold' : 'text-emerald-500 font-bold'}>
                          {t.SystemMode}: {investmentMode === 'FDI' ? t.Inbound : t.Outbound}
                      </span>
                  </button>
                  <div className="hidden md:flex items-center gap-2">
                      <Mail className="h-3 w-3 text-slate-500" />
                      <span>invest@linkwayfdi.com</span>
                  </div>
              </div>
              
              <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-emerald-500" />
                      <span>Leipzig, DE</span>
                  </div>
                   <div className="hidden md:flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-brand-500" />
                      <span>Shanghai, CN</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 py-3 shadow-xl' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex flex-col justify-center group leading-none">
            <span className={`text-2xl font-display font-bold tracking-tight uppercase transition-colors ${getLogoColor()}`}>
              LINKWAY
            </span>
            <div className="flex gap-1 mt-1">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] leading-none tracking-wider font-mono transition-all ${
                  investmentMode === 'FDI' ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/50' : 'bg-slate-700/50 text-slate-400'
              }`}>FDI</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] leading-none tracking-wider font-mono transition-all ${
                  investmentMode === 'ODI' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/50' : 'bg-slate-700/50 text-slate-400'
              }`}>ODI</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                onClick={(e) => handleNavClick(e, link.target)}
                className={`text-sm font-medium transition-colors hover:text-brand-400 uppercase tracking-wide text-[11px] font-display ${
                  currentPage === link.target 
                    ? (investmentMode === 'FDI' ? 'text-brand-500 font-bold' : 'text-emerald-500 font-bold') 
                    : getTextColor()
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <div className={`h-4 w-px ${isScrolled || theme === 'light' ? 'bg-slate-300/20' : 'bg-white/10'}`}></div>

            <div className="relative">
              <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${getTextColor()} hover:opacity-80 focus:outline-none`}
              >
                  {currentLang.flag} <ChevronDown className="h-3 w-3" />
              </button>
              
              {isLangMenuOpen && (
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsLangMenuOpen(false)}></div>
              )}

              {isLangMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 bg-slate-900 rounded-lg shadow-xl border border-slate-700 py-2 w-32 animate-in fade-in zoom-in-95 overflow-hidden ring-1 ring-black/5 z-50">
                      {LANGUAGES.map(lang => (
                          <button
                              key={lang.code}
                              onClick={() => {
                                  onLanguageChange(lang.code);
                                  setIsLangMenuOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-slate-800 flex items-center justify-between text-xs font-bold transition-colors ${
                                language === lang.code ? 'text-brand-400 bg-slate-800/50' : 'text-slate-300 hover:text-white'
                              }`}
                          >
                              <span>{lang.flag} {lang.name}</span>
                              {language === lang.code && <Check className="h-3 w-3 text-brand-500" />}
                          </button>
                      ))}
                  </div>
              )}
            </div>

            <button 
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg border font-display ${getButtonClass()}`}
            >
              <Zap className="h-3 w-3" /> {t.Start}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 ${getLogoColor()}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 shadow-xl p-6 md:hidden h-screen overflow-y-auto z-40">
            {/* Language Mobile */}
             <div className="flex gap-4 mb-6">
                 {LANGUAGES.map(lang => (
                     <button 
                        key={lang.code}
                        onClick={() => { onLanguageChange(lang.code); }}
                        className={`px-4 py-2 rounded border text-xs font-bold transition-colors ${
                            language === lang.code ? 'bg-brand-600 border-brand-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                        }`}
                     >
                         {lang.flag} {lang.code.toUpperCase()}
                     </button>
                 ))}
             </div>

             {/* Mobile Top Info */}
             <div className="mb-6 p-4 bg-slate-800 rounded-xl space-y-3">
                 <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                     <Mail className="h-4 w-4 text-brand-500"/> invest@linkwayfdi.com
                 </div>
                 <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                     <MapPin className="h-4 w-4 text-emerald-500"/> Leipzig, DE & Shanghai, CN
                 </div>
             </div>
             
             {/* Mobile Mode Switch */}
             <div className="grid grid-cols-2 gap-2 mb-8">
                 <button 
                    onClick={() => onModeChange && onModeChange('FDI')}
                    className={`p-3 rounded-lg border text-center text-xs font-bold uppercase tracking-wider transition-all ${
                        investmentMode === 'FDI' ? 'bg-brand-600 border-brand-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                 >
                     {t.InboundMobile}
                 </button>
                 <button 
                    onClick={() => onModeChange && onModeChange('ODI')}
                    className={`p-3 rounded-lg border text-center text-xs font-bold uppercase tracking-wider transition-all ${
                        investmentMode === 'ODI' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                 >
                     {t.OutboundMobile}
                 </button>
             </div>

            <div className="flex flex-col space-y-6">
                {navLinks.map(link => (
                    <a 
                      key={link.name} 
                      href="#"
                      onClick={(e) => handleNavClick(e, link.target)}
                      className={`text-xl font-display font-bold flex items-center justify-between border-b border-slate-800 pb-4 ${
                        currentPage === link.target ? 'text-brand-400' : 'text-slate-300'
                      }`}
                    >
                        {link.name}
                        <LayoutGrid className="h-4 w-4 text-brand-500" />
                    </a>
                ))}
            </div>
        </div>
      )}
    </header>
  );
};
