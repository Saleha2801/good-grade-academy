import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Maximize2,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Camera,
  FolderClock,
} from 'lucide-react';
import {
  galleryCategories,
  galleryItems,
  emptyStateMessages,
} from '../config/galleryData';

export default function GallerySection({ onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState('all');

  // Filter items based on active tab
  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });

  const isEmpty = filteredItems.length === 0;
  const currentEmptyState = emptyStateMessages[activeTab] || {
    title: 'Photos coming soon.',
    description:
      'We are in the process of capturing and uploading official Good Grade Academy moments. Check back soon!',
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2c59] tracking-tight">
            Academy Gallery & Admissions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Explore our official admission notices, course announcements, and upcoming batch highlights.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs max-w-lg mx-auto">
            <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>
              Official Good Grade Academy verified materials only. No generic or AI-generated stock photography.
            </span>
          </div>
        </div>

        {/* Modular Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {galleryCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0f2c59] text-white shadow-md transform -translate-y-0.5'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Content Area: Empty State OR Grid */}
        {isEmpty ? (
          <div className="max-w-2xl mx-auto p-10 sm:p-14 rounded-3xl bg-linear-to-b from-slate-50 to-sky-50/30 border border-dashed border-slate-300 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200 text-[#0f2c59] flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2c59]">
              {currentEmptyState.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              {currentEmptyState.description}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <FolderClock className="w-3.5 h-3.5" />
                <span>Archive being updated for academic session 2026–27</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              // Find index in master list for lightbox modal navigation
              const absoluteIndex = galleryItems.findIndex((g) => g.id === item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(absoluteIndex)}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenLightbox(absoluteIndex);
                    }
                  }}
                  aria-label={`View poster: ${item.title}`}
                >
                  {/* Portrait Poster Display Container */}
                  <div className="relative aspect-3/4 sm:aspect-4/5 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover sm:object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-[#0f2c59] shadow-xs border border-white/80">
                        {item.badge}
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-sky-200">
                          Click to enlarge poster
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 text-white">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Description Footer */}
                  <div className="p-4 bg-white border-t border-slate-100 flex flex-col justify-between grow">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0f2c59] leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-emerald-700">Official Notice</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
