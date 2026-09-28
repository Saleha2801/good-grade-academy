import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { academyInfo, createWhatsAppUrl } from '../config/academyInfo';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = createWhatsAppUrl();

  return (
    <aside
      aria-label="Direct WhatsApp Assistant"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end flex-col gap-2 pointer-events-auto"
    >
      {/* Optional gentle callout tooltip */}
      {showTooltip && (
        <div className="relative bg-white text-slate-800 text-xs py-2 px-3.5 rounded-2xl shadow-lg border border-slate-200/90 max-w-[210px] hidden sm:flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
          <span className="font-semibold text-slate-700">Need help? Chat with academy counselors</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss chat tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Tooltip caret */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45"></div>
        </div>
      )}

      {/* Floating CTA Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 focus:outline-hidden focus:ring-3 focus:ring-emerald-400"
        aria-label={`Chat with Good Grade Academy on WhatsApp: ${academyInfo.whatsapp.display}`}
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 border-2 border-emerald-600 rounded-full"></span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold text-emerald-100 uppercase tracking-wider leading-none">
            Online Support
          </span>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight leading-tight">
            Chat with us
          </span>
        </div>
      </a>
    </aside>
  );
}
