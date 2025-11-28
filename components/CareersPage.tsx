
import React from 'react';
import { ArrowRight, Users, Globe, Zap, Heart, Briefcase, CheckCircle2, MapPin, Clock } from 'lucide-react';

interface CareersPageProps {
  language: string;
}

export const CareersPage: React.FC<CareersPageProps> = ({ language }) => {
  const benefits = [
    { icon: Globe, title: "Global Mobility", desc: "Opportunities to rotate between Leipzig, Shanghai, and Singapore offices." },
    { icon: Zap, title: "High Impact", desc: "Work on billion-dollar cross-border transactions that shape industries." },
    { icon: Users, title: "Elite Network", desc: "Collaborate with former McKinsey partners and industry veterans." },
    { icon: Heart, title: "Holistic Health", desc: "Premium private insurance and mental health support." }
  ];

  const jobs = [
    {
      title: "Senior Investment Manager (FDI)",
      dept: "Advisory",
      loc: "Frankfurt / Leipzig",
      type: "Full-time",
      desc: "Lead complex market entry projects for Asian automotive suppliers entering the DACH region."
    },
    {
      title: "Data Scientist - Market Intelligence",
      dept: "Technology",
      loc: "Remote / Shanghai",
      type: "Full-time",
      desc: "Build predictive models for our proprietary investment signal radar."
    },
    {
      title: "Legal Counsel - Corporate M&A",
      dept: "Legal",
      loc: "Shanghai",
      type: "Full-time",
      desc: "Oversee cross-border entity structuring and regulatory compliance for European clients."
    },
    {
      title: "Business Development Director",
      dept: "Sales",
      loc: "Singapore",
      type: "Full-time",
      desc: "Expand our footprint in Southeast Asia, focusing on manufacturing relocation projects."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 font-sans">
      
      {/* Hero */}
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-100">
              <Briefcase className="h-3 w-3" /> Careers at Linkway
           </div>
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight">
             Build the Operating System for <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-400">Global Capital</span>
           </h1>
           <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
             We are not just consultants; we are architects of international trade. Join a team that is redefining how borders influence business.
           </p>
        </div>
      </div>

      {/* Culture Grid */}
      <div className="bg-slate-50 py-24 border-y border-slate-100">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900">Why Top Talent Joins Linkway</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {benefits.map((b, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                     <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <b.icon className="h-6 w-6" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                     <p className="text-slate-500 leading-relaxed text-sm">
                        {b.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Open Roles */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">
         <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Open Positions</h2>
            <a href="#" className="text-brand-600 font-bold hover:underline flex items-center gap-2">View all 12 roles <ArrowRight className="h-4 w-4"/></a>
         </div>

         <div className="space-y-4">
            {jobs.map((job, i) => (
               <div key={i} className="group bg-white border border-slate-200 rounded-xl p-6 md:p-8 hover:border-brand-500 hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                     <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1.5"><Users className="h-4 w-4"/> {job.dept}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4"/> {job.loc}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4"/> {job.type}</span>
                     </div>
                     <p className="text-slate-500 text-sm max-w-2xl">{job.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                     <span className="px-6 py-3 rounded-lg bg-slate-50 text-slate-900 font-bold text-sm group-hover:bg-brand-600 group-hover:text-white transition-colors inline-flex items-center gap-2">
                        Apply Now <ArrowRight className="h-4 w-4" />
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};
