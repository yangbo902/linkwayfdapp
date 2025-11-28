
import React, { useState } from 'react';
import { ArrowRight, Clock, Tag, TrendingUp, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types';

interface InsightsSectionProps {
  language: string;
}

const POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The New Foreign Investment Law in China: What Changes for EU SMEs?',
    excerpt: 'A detailed breakdown of the 2024 regulatory updates impacting foreign-owned enterprises in manufacturing sectors.',
    category: 'Regulatory',
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    author: { name: 'Sarah Zhang', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100' }
  },
  {
    id: '2',
    title: 'Supply Chain Resilience: Diversifying Beyond Coastal China',
    excerpt: 'Why inland provinces like Jiangsu are becoming the new hub for advanced manufacturing due to cost efficiencies and logistics upgrades.',
    category: 'Strategy',
    date: 'Oct 18, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    author: { name: 'Dr. Thomas Mueller', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100' }
  },
  {
    id: '3',
    title: 'Green Manufacturing Incentives 2024',
    excerpt: 'How European companies can leverage local subsidies for sustainable production facilities and carbon-neutral operations.',
    category: 'FDI',
    date: 'Oct 10, 2023',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800',
    author: { name: 'Michael Chen', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' }
  }
];

const CATEGORIES = ['All', 'Regulatory', 'Strategy', 'FDI', 'ODI', 'Market Trends'];

export const InsightsSection: React.FC<InsightsSectionProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section id="insights" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div className="max-w-xl">
              <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">Linkway Intelligence</h2>
              <h3 className="text-3xl font-serif font-bold text-slate-900">Latest Insights & Analysis</h3>
           </div>
           
           {/* Filter Pills */}
           <div className="flex gap-2 overflow-x-auto pb-2 mt-6 md:mt-0 w-full md:w-auto no-scrollbar">
              {CATEGORIES.map(cat => (
                 <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                       activeCategory === cat 
                       ? 'bg-slate-900 text-white shadow-lg' 
                       : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-400 hover:text-brand-600'
                    }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           
           {/* Featured / Posts */}
           {POSTS.map((post) => (
              <div key={post.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                 
                 {/* Image */}
                 <div className="h-48 overflow-hidden relative">
                    <img 
                       src={post.image} 
                       alt={post.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4">
                       <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full shadow-sm">
                          {post.category}
                       </span>
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                       <span>{post.date}</span>
                       <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                       <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                       </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-600 transition-colors">
                       {post.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                       {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <img src={post.author.image} alt={post.author.name} className="w-8 h-8 rounded-full object-cover border border-slate-100" />
                          <span className="text-xs font-bold text-slate-700">{post.author.name}</span>
                       </div>
                       <span className="text-brand-600 hover:text-brand-700 transition-colors">
                          <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                       </span>
                    </div>
                 </div>
              </div>
           ))}

        </div>
        
        {/* Newsletter CTA */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-3">
                     <TrendingUp className="h-5 w-5 text-brand-400" />
                     <span className="text-brand-400 font-bold uppercase tracking-wider text-xs">Weekly Intelligence</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Subscribe to the China-EU Investment Monitor</h3>
                  <p className="text-slate-400">Get curated regulatory updates, market analysis, and exclusive deal flow delivered to your inbox every Tuesday.</p>
               </div>

               <div className="w-full md:w-auto flex-shrink-0">
                  <div className="flex gap-2 p-1.5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                     <input 
                        type="email" 
                        placeholder="Business Email" 
                        className="bg-transparent border-none focus:ring-0 text-white placeholder-slate-400 px-4 py-2 min-w-[240px]"
                     />
                     <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-brand-50 transition-colors whitespace-nowrap">
                        Subscribe
                     </button>
                  </div>
               </div>
            </div>
        </div>

      </div>
    </section>
  );
};