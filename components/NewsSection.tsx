import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Clock, TrendingUp, Zap, ExternalLink, BarChart2, ChevronRight } from 'lucide-react';
import { generateInvestmentAdvice } from '../services/geminiService';

interface NewsSectionProps {
  language: string;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ language }) => {
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [featuredStory, setFeaturedStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const langName = language === 'cn' ? 'Chinese' : language === 'de' ? 'German' : 'English';
        const prompt = `
          Generate 5 distinct, professional news headlines in ${langName} related to **Jiangsu Economy**, **China-Germany Trade**, or **Baoying Industry**. 
          Format: Headline only. Separated by pipe "|".
        `;
        const response = await generateInvestmentAdvice(prompt);
        const rawHeadlines = response.split('|').map(h => h.trim()).filter(h => h.length > 5).slice(0, 5);
        
        // Construct Featured Story
        setFeaturedStory({
             title: rawHeadlines[0] || "Yangtze River Delta Integration Accelerates Baoying's Industrial Upgrading",
             category: "Regional Policy",
             region: "Jiangsu",
             time: "LIVE",
             author: "Gov Office",
             image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
        });

        // Construct Feed
        const newsItems = rawHeadlines.slice(1).map((title, idx) => ({
            id: idx,
            title,
            category: idx % 2 === 0 ? 'Trade News' : 'Industry Focus',
            time: `${idx + 2}h ago`,
            region: idx === 0 ? 'China-EU' : 'Baoying',
            trend: idx % 2 === 0 ? 'up' : 'neutral'
        }));

        if (newsItems.length > 0) {
             setHeadlines(newsItems);
        } else {
            throw new Error("No headlines");
        }
      } catch (e) {
        // Fallback
        setFeaturedStory({
             title: "Yangtze River Delta Integration Accelerates Baoying's Industrial Upgrading",
             category: "Regional Policy",
             region: "Jiangsu",
             time: "LIVE",
             author: "Gov Office",
             image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
        });
        setHeadlines([
            { id: 0, title: "New High-Speed Rail Connection Boosts Baoying Logistics Capacity", category: "Infrastructure", time: "2h ago", region: "Baoying", trend: "up" },
            { id: 1, title: "German Automotive Suppliers Expand Footprint in Jiangsu", category: "FDI", time: "4h ago", region: "China-DE", trend: "up" },
            { id: 2, title: "Baoying Electrical Cluster Revenue Hits New High", category: "Industry", time: "5h ago", region: "Local", trend: "up" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-4">
                <div className="w-3 h-8 bg-brand-600"></div>
                <h2 className="text-3xl font-serif font-bold text-slate-900">Baoying News Brief</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Feature Column */}
            <div className="lg:col-span-8">
                {loading || !featuredStory ? (
                    <div className="h-[500px] bg-slate-200 rounded-xl animate-pulse"></div>
                ) : (
                    <div className="relative h-[500px] rounded-xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all">
                        <img 
                            src={featuredStory.image} 
                            alt="Featured News" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-90"></div>
                        
                        <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded animate-pulse">
                                    {featuredStory.time}
                                </span>
                                <span className="text-brand-300 text-xs font-bold uppercase tracking-wider border-l border-slate-500 pl-3">
                                    {featuredStory.category}
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-brand-100 transition-colors font-serif">
                                {featuredStory.title}
                            </h3>
                            <div className="flex items-center gap-4 text-slate-400 text-sm">
                                <span>By {featuredStory.author}</span>
                                <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                                <span>{featuredStory.region}</span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Sub-Grid Headlines */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {headlines.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{item.category}</span>
                                <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-brand-500 transition-colors" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-brand-700 transition-colors">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
                                <Clock className="h-3 w-3" /> {item.time}
                                <span className="mx-1">•</span>
                                {item.region}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Market Ticker Widget */}
                <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                        <h4 className="font-bold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-400" /> Economic Indicators
                        </h4>
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Jiangsu GDP", val: "¥12.8T", change: "+5.8%", up: true },
                            { name: "Baoying Ind. Growth", val: "8.2%", change: "+0.4%", up: true },
                            { name: "CNY/EUR", val: "7.85", change: "-0.1%", up: false },
                        ].map((ticker, i) => (
                            <div key={i} className="flex justify-between items-center font-mono text-sm">
                                <span className="text-slate-400">{ticker.name}</span>
                                <div className="text-right">
                                    <div className="font-bold">{ticker.val}</div>
                                    <div className={`text-xs ${ticker.up ? 'text-emerald-400' : 'text-rose-400'}`}>{ticker.change}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest / Most Read List */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Latest Updates</h4>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {headlines.slice(2).concat(headlines.slice(0,1)).map((item, idx) => (
                            <div key={idx} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex gap-3">
                                    <div className="mt-1 text-slate-300 group-hover:text-brand-500 font-serif font-bold text-xl transition-colors">
                                        0{idx + 1}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                                            {item.trend === 'up' && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                                            {item.category}
                                        </div>
                                        <h5 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-700 transition-colors">
                                            {item.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};