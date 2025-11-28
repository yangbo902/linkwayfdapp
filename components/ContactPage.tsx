
import React from 'react';
import { ContactSection } from './ContactSection';
import { LocationsSection } from './LocationsSection';
import { Mail } from 'lucide-react';

interface ContactPageProps {
  language: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  return (
    <div className="pt-20 font-sans bg-slate-950 min-h-screen">
      <div className="py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-500/30">
               <Mail className="h-4 w-4" /> Get in Touch
           </div>
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
             Start Your Expansion
           </h1>
      </div>
      <LocationsSection language={language} />
      <ContactSection language={language} />
    </div>
  );
};
