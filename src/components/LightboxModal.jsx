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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
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

      {/* Main Lightbox Content Card */}
      <div
        className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-slate-900 aspect-16/10 sm:aspect-16/9 flex items-center justify-center overflow-hidden">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="w-full h-full object-cover sm:object-contain select-none transition-all duration-300"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 uppercase tracking-wider shadow-2xs">
            {currentItem.category}
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Good Grade Academy Learning Moments</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                Photo {currentIndex + 1} of {items.length}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">{currentItem.title}</h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">{currentItem.description}</p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={onPrev}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

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
    </div>
  );
}
