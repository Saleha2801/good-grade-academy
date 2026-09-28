import React, { useState } from 'react';
import { Award } from 'lucide-react';

export default function ResultCard({ student }) {
  const [imgSrc, setImgSrc] = useState(student.image);

  // Fallback handler if URL encoding has whitespace variant
  const handleImageError = () => {
    // If the image fails with the standard path, try URI encoding spaces
    const encoded = encodeURI(student.image);
    if (imgSrc !== encoded) {
      setImgSrc(encoded);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Student Photo Container */}
      <div className="relative aspect-4/5 w-full bg-linear-to-b from-sky-50/70 via-slate-50 to-emerald-50/40 p-3 sm:p-4 flex items-end justify-center overflow-hidden">
        <img
          src={imgSrc}
          alt={`Result of ${student.name}`}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
        />

        {/* Percentage Floating Badge */}
        <div className="absolute top-3 right-3 bg-linear-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-xl shadow-md border border-emerald-500/40 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
          <span>{student.percentage}%</span>
        </div>
      </div>

      {/* Card Info: Name & Percentage (NO BATCH) */}
      <div className="p-3.5 sm:p-4 text-center bg-white border-t border-slate-100 flex flex-col justify-center grow">
        <h4 className="text-sm sm:text-base font-extrabold text-[#0f2c59] tracking-tight leading-tight line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {student.name}
        </h4>
        <div className="mt-1 flex items-center justify-center gap-1 text-emerald-700 font-bold text-xs sm:text-sm">
          <span>Score:</span>
          <span className="font-extrabold text-slate-900">{student.percentage}%</span>
        </div>
      </div>
    </div>
  );
}
