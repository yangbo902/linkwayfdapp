
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanySection } from './components/CompanySection';
import { ServicesSection } from './components/ServicesSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIConsultant } from './components/AIConsultant';
import { LegalPage } from './components/LegalPage';
import { CareersPage } from './components/CareersPage';
import { ResourcesPage } from './components/ResourcesPage';
import { PartnersPage } from './components/PartnersPage';
import { ProjectsLibrary } from './components/ProjectsLibrary';
import { IndustryPage } from './components/IndustryPage';
import { IntelligenceRadar } from './components/IntelligenceRadar';
import { ServicesPage } from './components/ServicesPage';
import { AboutUs } from './components/AboutUs';
import { MethodologyPage } from './components/MethodologyPage';
import { CapabilitiesPage } from './components/CapabilitiesPage';
import { EcosystemPage } from './components/EcosystemPage';
import { ContactPage } from './components/ContactPage';
import { Page, IndustryId } from './types';
import { Bell, X, Info, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState('en');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>('smart-grid');
  const [isPremium, setIsPremium] = useState(false);
  
  // GLOBAL STATE: Investment Mode (FDI vs ODI)
  // This controls the entire context of the application (Inbound vs Outbound)
  const [investmentMode, setInvestmentMode] = useState<'FDI' | 'ODI'>('FDI');

  const [alerts, setAlerts] = useState<{id: number, text: string, type: 'info' | 'deal'}[]>([]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIndustrySelect = (ind: IndustryId) => {
      setSelectedIndustry(ind);
      navigate('industry');
  }

  // Determine Header Theme based on current page
  const getHeaderTheme = (): 'light' | 'dark' => {
      // Pages with white/light backgrounds at the top need 'light' theme for the header (dark text)
      const lightPages: Page[] = [
          'projects', 'careers', 'resources', 
          'privacy', 'terms', 'slavery', 'sitemap'
      ];
      return lightPages.includes(currentPage) ? 'light' : 'dark';
  };

  // Live Alert System Simulation
  useEffect(() => {
      const msgs = [
          "⚡ New RFP: 50,000 sqm Industrial Land required (Auto Sector)",
          "📜 Policy Update: Jiangsu releases new Green Energy subsidies",
          "🤝 Deal Closed: €15M German Manufacturing Plant in Baoying",
          "📉 Market Alert: Steel prices dropping in East China region",
          "🏭 Capacity: Standard Factory Phase III now open for booking"
      ];

      // Initial alert
      setTimeout(() => {
           setAlerts([{ id: Date.now(), text: "🔴 LIVE: Baoying EDZ Investment Summit streaming now", type: 'info' }]);
      }, 2000);

      const interval = setInterval(() => {
          if(Math.random() > 0.6) {
              const newAlert = {
                  id: Date.now(),
                  text: msgs[Math.floor(Math.random() * msgs.length)],
                  type: 'info' as const
              };
              setAlerts(prev => [newAlert, ...prev].slice(0, 2)); // Keep max 2
              
              // Auto remove after 8s
              setTimeout(() => {
                  setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
              }, 8000);
          }
      }, 12000);

      return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 relative transition-colors duration-500">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigate} 
        language={language}
        onLanguageChange={setLanguage}
        theme={getHeaderTheme()}
        investmentMode={investmentMode}
        onModeChange={setInvestmentMode}
      />

      {/* Live Alerts Container - More Obvious */}
      <div className="fixed top-24 right-4 md:right-8 z-50 flex flex-col gap-3 pointer-events-none">
          {alerts.map(alert => (
              <div key={alert.id} className="pointer-events-auto bg-slate-900 text-white p-4 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-l-4 border-brand-500 animate-in slide-in-from-right fade-in duration-500 max-w-sm md:max-w-md flex items-start gap-4">
                  <div className="mt-0.5 p-1.5 bg-brand-500/20 rounded-full animate-pulse">
                      <Zap className="h-4 w-4 text-brand-400" />
                  </div>
                  <div className="flex-grow">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Real-time Intelligence</div>
                      <div className="text-sm font-medium leading-snug">{alert.text}</div>
                  </div>
                  <button onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))} className="text-slate-500 hover:text-white transition-colors">
                      <X className="h-4 w-4" />
                  </button>
              </div>
          ))}
      </div>
      
      <main className="flex-grow">
        {/* Routing Logic */}
        {currentPage === 'home' && (
           <>
              <Hero 
                language={language} 
                investmentMode={investmentMode}
                onModeChange={setInvestmentMode}
              />
              <IntelligenceRadar 
                language={language} 
                investmentMode={investmentMode}
              />
              <ServicesSection 
                language={language} 
                investmentMode={investmentMode}
                onModeChange={setInvestmentMode}
              />
              <CompanySection language={language} />
              <InsightsSection language={language} />
              <AIConsultant language={language} />
              <ContactSection language={language} />
           </>
        )}

        {/* Dedicated Pages */}
        {currentPage === 'services' && (
            <ServicesPage 
              language={language} 
              onNavigate={navigate} 
              investmentMode={investmentMode}
              onModeChange={setInvestmentMode}
            />
        )}

        {currentPage === 'methodology' && (
            <MethodologyPage language={language} />
        )}

        {currentPage === 'capabilities' && (
            <CapabilitiesPage language={language} />
        )}

        {currentPage === 'ecosystem' && (
            <EcosystemPage language={language} />
        )}

        {currentPage === 'about' && (
            <AboutUs language={language} />
        )}

        {currentPage === 'contact' && (
            <ContactPage language={language} />
        )}

        {currentPage === 'careers' && <CareersPage language={language} />}
        
        {currentPage === 'resources' && <ResourcesPage language={language} />}
        
        {currentPage === 'partners' && <PartnersPage language={language} />}
        
        {currentPage === 'projects' && (
            <ProjectsLibrary 
                isPremium={isPremium} 
                onUnlockPremium={() => setIsPremium(true)} 
                language={language} 
                investmentMode={investmentMode}
                onModeChange={setInvestmentMode}
            />
        )}

        {currentPage === 'industry' && (
            <IndustryPage 
                industryId={selectedIndustry} 
                language={language} 
                onNavigate={navigate}
            />
        )}

        {/* Legal Pages */}
        {['privacy', 'terms', 'slavery', 'sitemap'].includes(currentPage) && (
            <LegalPage type={currentPage} language={language} />
        )}
      </main>

      <Footer 
        onNavigate={navigate} 
        language={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
};

export default App;
