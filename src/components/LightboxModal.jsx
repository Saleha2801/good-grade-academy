import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onPrev,
  onNext,
}) {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  const imageSrc = currentItem.image || currentItem.imageUrl;
  const categoryLabel = currentItem.badge || currentItem.category;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-white"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-white"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-white"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Lightbox Content Card */}
      <div
        className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Poster / Image Display Area with portrait friendliness */}
        <div className="relative bg-slate-900 flex items-center justify-center p-2 sm:p-4 overflow-hidden max-h-[70vh]">
          <img
            src={imageSrc}
            alt={currentItem.alt || currentItem.title}
            className="max-h-[66vh] max-w-full object-contain select-none transition-all duration-300 rounded-lg shadow-md"
          />
          {categoryLabel && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-slate-800 uppercase tracking-wider shadow-md border border-white/60">
              {categoryLabel}
            </div>
          )}
        </div>

        {/* Caption & Metadata Footer */}
        <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Good Grade Academy Official Assets</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                Item {currentIndex + 1} of {items.length}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#0f2c59]">{currentItem.title}</h4>
            {currentItem.description && (
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                {currentItem.description}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
              {currentItem.date || 'Academic Session'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
