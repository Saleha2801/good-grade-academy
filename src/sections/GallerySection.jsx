import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Maximize2,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function GallerySection({ onOpenLightbox }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Classroom', 'Mentorship', 'Learning Culture', 'Study Space'];

  const filteredItems = academyInfo.gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Campus & Learning Environment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2c59] tracking-tight">
            Academic Spaces & Student Activities
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Take a visual tour through our engaging classrooms, focused study zones, and interactive learning moments.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs max-w-lg mx-auto">
            <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>
              Representative education showcase. Official Good Grade Academy campus photos will be refreshed as new batch events are documented.
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0f2c59] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            // Find absolute index in full gallery for lightbox navigation
            const absoluteIndex = academyInfo.gallery.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(absoluteIndex)}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-4/3"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenLightbox(absoluteIndex);
                  }
                }}
                aria-label={`View photo: ${item.title}`}
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs border border-white/60">
                    {item.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold leading-snug">{item.title}</h4>
                      <p className="text-xs text-slate-200 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
