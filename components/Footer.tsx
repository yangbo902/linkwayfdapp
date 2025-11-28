
import React from 'react';
import { Linkedin, Mail, Phone, ShieldCheck, FileText, Lock, LayoutGrid } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language, onLanguageChange }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-slate-900 font-sans text-sm">
      <div className="container mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
                 <div 
                   onClick={() => onNavigate('home')}
                   className="inline-block cursor-pointer group mb-6"
                 >
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold tracking-tight text-white leading-none uppercase">
                            LINKWAY
                        </span>
                        <div className="flex gap-1.5 mt-2">
                            <span className="bg-[#2B4C5D] text-white text-xs font-bold px-2 py-0.5 rounded-[2px] leading-none tracking-wider">FDI</span>
                            <span className="bg-[#5D9CB3] text-white text-xs font-bold px-2 py-0.5 rounded-[2px] leading-none tracking-wider">ODI</span>
                        </div>
                        <div className="mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                            Cross-Border Investment Consulting
                        </div>
                    </div>
                 </div>
                 <p className="mb-8 leading-relaxed text-slate-500 max-w-sm text-sm">
                    Premier cross-border investment operating system. We bridge European technology with Asian markets through strategic advisory, data-driven intelligence, and government-backed infrastructure.
                 </p>
                 <div className="flex space-x-3">
                    <a href="#" className="p-2.5 bg-slate-900 rounded-lg hover:bg-[#0077b5] hover:text-white transition-colors border border-slate-800 group">
                        <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#" className="p-2.5 bg-slate-900 rounded-lg hover:bg-brand-600 hover:text-white transition-colors border border-slate-800">
                        <Mail className="h-4 w-4" />
                    </a>
                    <a href="#" className="p-2.5 bg-slate-900 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors border border-slate-800">
                        <Phone className="h-4 w-4" />
                    </a>
                 </div>
            </div>

            {/* Platform Column */}
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[11px]">Platform</h4>
                <ul className="space-y-3">
                    <li><button onClick={() => onNavigate('services')} className="hover:text-brand-400 transition-colors text-left">FDI / Inbound</button></li>
                    <li><button onClick={() => onNavigate('services')} className="hover:text-brand-400 transition-colors text-left">ODI / Outbound</button></li>
                    <li><button onClick={() => onNavigate('methodology')} className="hover:text-brand-400 transition-colors text-left">Execution Engine</button></li>
                    <li><button onClick={() => onNavigate('capabilities')} className="hover:text-brand-400 transition-colors text-left">Data Intelligence</button></li>
                    <li><button onClick={() => onNavigate('capabilities')} className="hover:text-brand-400 transition-colors text-left">Infrastructure</button></li>
                </ul>
            </div>

            {/* Ecosystem Column */}
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[11px]">Ecosystem</h4>
                <ul className="space-y-3">
                    <li><button onClick={() => onNavigate('ecosystem')} className="hover:text-brand-400 transition-colors text-left">Automotive & EV</button></li>
                    <li><button onClick={() => onNavigate('ecosystem')} className="hover:text-brand-400 transition-colors text-left">Advanced Mfg</button></li>
                    <li><button onClick={() => onNavigate('ecosystem')} className="hover:text-brand-400 transition-colors text-left">Smart Grid</button></li>
                    <li><button onClick={() => onNavigate('ecosystem')} className="hover:text-brand-400 transition-colors text-left">Chemicals</button></li>
                    <li><button onClick={() => onNavigate('ecosystem')} className="hover:text-brand-400 transition-colors text-left">Ecological Foods</button></li>
                </ul>
            </div>

             {/* Company Column */}
             <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[11px]">Company</h4>
                <ul className="space-y-3">
                    <li><button onClick={() => onNavigate('about')} className="hover:text-brand-400 transition-colors text-left">About Linkway</button></li>
                    <li><button onClick={() => onNavigate('partners')} className="hover:text-brand-400 transition-colors text-left">Success Stories</button></li>
                    <li><button onClick={() => onNavigate('careers')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-2">Careers <span className="text-[9px] px-1.5 py-0.5 bg-emerald-900 text-emerald-400 rounded border border-emerald-800">Hiring</span></button></li>
                    <li><button onClick={() => onNavigate('projects')} className="hover:text-brand-400 transition-colors text-left">Deal Room</button></li>
                    <li><button onClick={() => onNavigate('contact')} className="hover:text-brand-400 transition-colors text-left">Contact Us</button></li>
                </ul>
            </div>

            {/* Regional Hubs Column */}
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[11px]">Regional Hubs</h4>
                <div className="space-y-6">
                     <div className="group">
                        <div className="flex items-center gap-2 text-white font-bold mb-1">
                            <span className="text-lg">🇩🇪</span> Europe HQ
                        </div>
                        <p className="text-xs leading-relaxed text-slate-500 mb-1">Neumarkt 9-19<br/>04109 Leipzig, Germany</p>
                        <a href="mailto:eu@linkwayfdi.com" className="text-xs text-brand-500 hover:text-white transition-colors">eu@linkwayfdi.com</a>
                     </div>
                     
                     <div className="group">
                        <div className="flex items-center gap-2 text-white font-bold mb-1">
                            <span className="text-lg">🇨🇳</span> APAC HQ
                        </div>
                        <p className="text-xs leading-relaxed text-slate-500 mb-1">West Nanjing Road 1266<br/>Jing'an District, Shanghai</p>
                        <a href="mailto:cn@linkwayfdi.com" className="text-xs text-brand-500 hover:text-white transition-colors">cn@linkwayfdi.com</a>
                     </div>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-slate-600">
             <span>&copy; {new Date().getFullYear()} LinkwayFDI Group. All rights reserved.</span>
             <div className="flex gap-6">
                <button onClick={() => onNavigate('privacy')} className="hover:text-slate-400 transition-colors flex items-center gap-1"><ShieldCheck className="h-3 w-3"/> Privacy Policy</button>
                <button onClick={() => onNavigate('terms')} className="hover:text-slate-400 transition-colors flex items-center gap-1"><FileText className="h-3 w-3"/> Terms of Service</button>
                <button onClick={() => onNavigate('slavery')} className="hover:text-slate-400 transition-colors">Modern Slavery Statement</button>
                <button onClick={() => onNavigate('sitemap')} className="hover:text-slate-400 transition-colors"><LayoutGrid className="h-3 w-3"/></button>
             </div>
             <div className="hidden md:block w-px h-3 bg-slate-800"></div>
             <div className="flex items-center gap-1 hover:text-slate-400 cursor-pointer">
                 <Lock className="h-3 w-3" /> ICP License: 沪ICP备2023000001号
             </div>
          </div>

          <div className="flex gap-4">
             <button onClick={() => onLanguageChange('en')} className={`px-2 py-1 rounded text-xs transition-colors ${language === 'en' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-white'}`}>EN</button>
             <button onClick={() => onLanguageChange('de')} className={`px-2 py-1 rounded text-xs transition-colors ${language === 'de' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-white'}`}>DE</button>
             <button onClick={() => onLanguageChange('cn')} className={`px-2 py-1 rounded text-xs transition-colors ${language === 'cn' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-white'}`}>CN</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
