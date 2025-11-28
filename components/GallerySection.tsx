
import React, { useState } from 'react';
import { X, ZoomIn, MapPin, Filter } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

const IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=1200",
    title: "Baoying Development Zone",
    category: "Industry"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    title: "Logistics Hub",
    category: "Logistics"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1565514020176-db47571101f7?auto=format&fit=crop&q=80&w=800",
    title: "Standard Factory Phase II",
    category: "Facilities"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800",
    title: "Lotus Ecological Park",
    category: "Environment"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    title: "Smart Manufacturing Line",
    category: "High-Tech"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    title: "Admin Center",
    category: "City"
  }
];

const CATEGORIES = ['All', 'Industry', 'Logistics', 'Facilities', 'Environment', 'High-Tech', 'City'];

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeCategory);

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Baoying in Pictures</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-8">
            Insights into our modern infrastructure, natural environment, and vibrant industrial life.
          </p>

          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
             {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                    activeCategory === cat 
                      ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-500/30 transform scale-105' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-brand-300 hover:text-brand-600'
                  }`}
                >
                  {cat}
                </button>
             ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 animate-in fade-in zoom-in-95"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-[10px] font-bold text-brand-400 uppercase tracking-wider mb-1">{img.category}</div>
                  <h3 className="text-white font-bold text-lg leading-tight flex justify-between items-center">
                    {img.title}
                    <ZoomIn className="h-5 w-5 text-white/80" />
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
            <div className="text-center py-12 text-slate-400">
                <p>No images found in this category.</p>
            </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-50"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="max-w-5xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="relative aspect-video bg-slate-900">
               <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                 <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                 <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" /> Baoying, Jiangsu
                 </p>
              </div>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
