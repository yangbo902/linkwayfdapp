
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

interface ContactSectionProps {
  language: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Expand Into New Markets?</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
            Connect with our team of cross-border investment experts to explore how LinkwayFDI can facilitate your international growth strategy.
        </p>

        {isSuccess ? (
             <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-8 py-4 rounded-xl inline-flex items-center gap-3">
                 <CheckCircle className="h-5 w-5" /> Request Sent Successfully
             </div>
        ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input 
                  required 
                  type="email" 
                  placeholder="Enter your business email" 
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:bg-white/20 transition-all text-center"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
                >
                   {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin"/> : <>Schedule Consultation <ArrowRight className="h-4 w-4" /></>}
                </button>
            </form>
        )}
      </div>
    </section>
  );
};
