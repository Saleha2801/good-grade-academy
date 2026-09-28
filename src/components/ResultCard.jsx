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

  // Sachi and Rutuja cutouts fill 95% of canvas, while other students have transparent padding
  // Scale compensation brings all cutouts to a uniform, harmonious visual scale without image alteration
  const isFullBleed = student.name.includes('Sachi') || student.name.includes('Rutuja');
  const scaleClass = isFullBleed
    ? 'scale-90 group-hover:scale-95'
    : 'scale-145 group-hover:scale-150';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Student Photo Container - Fixed responsive height, perfectly centered */}
      <div className="relative h-52 sm:h-60 w-full bg-linear-to-b from-sky-50/50 via-slate-50 to-emerald-50/30 p-3 sm:p-4 flex items-center justify-center overflow-hidden">
        {/* Centered Image Wrapper */}
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <img
            src={imgSrc}
            alt={`Result of ${student.name}`}
            onError={handleImageError}
            loading="lazy"
            className={`max-w-full max-h-full object-contain object-center transition-transform duration-300 ${scaleClass}`}
          />
        </div>

        {/* Percentage Floating Badge */}
        <div className="absolute top-2.5 right-2.5 bg-linear-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-xl shadow-md border border-emerald-500/40 flex items-center gap-1 z-10">
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
