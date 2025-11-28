
import React, { useState } from 'react';
import { FileText, Download, Lock, Search, Filter, BookOpen, PieChart, BarChart3, ArrowRight, Star } from 'lucide-react';

interface ResourcesPageProps {
  language: string;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ language }) => {
  const [filter, setFilter] = useState('All');

  const resources = [
    {
      title: "2024 China FDI Market Outlook",
      type: "Annual Report",
      size: "12.4 MB",
      date: "Nov 2023",
      locked: false,
      category: "Market Intelligence",
      premium: true,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Legal Guide: WFOE Formation in Jiangsu",
      type: "Whitepaper",
      size: "1.8 MB",
      date: "Oct 2023",
      locked: true,
      category: "Legal",
      premium: false,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "The European Battery Ecosystem 2025",
      type: "Sector Analysis",
      size: "8.5 MB",
      date: "Sep 2023",
      locked: true,
      category: "Industry Focus",
      premium: true,
      image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Tax Incentives for High-Tech Enterprises",
      type: "Policy Guide",
      size: "1.2 MB",
      date: "Aug 2023",
      locked: false,
      category: "Legal",
      premium: false,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "China Automotive Supply Chain Map",
      type: "Interactive Map",
      size: "15 MB",
      date: "Aug 2023",
      locked: true,
      category: "Site Selection",
      premium: true,
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Smart Grid Investment Opportunities",
      type: "Deal Flow",
      size: "3.1 MB",
      date: "Jul 2023",
      locked: false,
      category: "Industry Focus",
      premium: false,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const categories = ['All', 'Market Intelligence', 'Legal', 'Industry Focus', 'Site Selection'];

  const filteredResources = filter === 'All' ? resources : resources.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 font-sans">
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold uppercase tracking-wider mb-6">
              <BookOpen className="h-3 w-3" /> Intelligence Hub
           </div>
           <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
             Linkway Research
           </h1>
           <p className="text-xl text-slate-500 leading-relaxed">
             Proprietary market data, regulatory analysis, and investment deal flow. Curated by our team of analysts in Leipzig and Shanghai.
           </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 mb-12">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
               {categories.map(cat => (
                  <button
                     key={cat}
                     onClick={() => setFilter(cat)}
                     className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                        filter === cat 
                        ? 'bg-slate-900 text-white' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
            
            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Search intelligence..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 transition-colors"
               />
            </div>
         </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res, i) => (
               <div key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 cursor-pointer flex flex-col relative">
                  {res.premium && (
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-sm">
                          <Star className="h-3 w-3 fill-amber-900" /> Premium
                      </div>
                  )}
                  
                  <div className="relative h-48 overflow-hidden">
                     <img src={res.image} alt={res.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-0 group-hover:saturate-100" />
                     <div className="absolute top-4 right-4">
                        <div className={`p-2 rounded-lg backdrop-blur-md ${res.locked ? 'bg-slate-900/80 text-white' : 'bg-brand-500/90 text-white'}`}>
                           {res.locked ? <Lock className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                        </div>
                     </div>
                     <div className="absolute bottom-4 left-4">
                        <span className="px-2 py-1 bg-white/90 rounded text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                           {res.type}
                        </span>
                     </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="flex justify-between items-center mb-3 text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <span>{res.category}</span>
                        <span>{res.size}</span>
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-600 transition-colors">
                        {res.title}
                     </h3>
                     
                     <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400">{res.date}</span>
                        <span className="text-sm font-bold text-slate-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                           {res.locked ? 'Request Access' : 'Download Now'} <ArrowRight className="h-4 w-4" />
                        </span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};
