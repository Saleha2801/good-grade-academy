import React from 'react';
import { Calendar, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function TrustHighlights() {
  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 bg-linear-to-r from-white via-sky-50/40 to-emerald-50/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">

          {/* Highlight 1: Since 2017 & 9+ Years */}
          <div className="flex items-center gap-5 sm:gap-6 py-2 md:py-0 md:pr-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-[#0f2c59] to-[#0369a1] text-white flex flex-col items-center justify-center shrink-0 shadow-md">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-200 leading-tight">
                ESTD.
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                2017
              </span>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold uppercase tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-sky-700" />
                <span>{academyInfo.established}</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-[#0f2c59] tracking-tight leading-tight">
                {academyInfo.experience}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Consistent academic dedication, disciplined teaching, and trusted student mentoring.
              </p>
            </div>
          </div>

          {/* Highlight 2: 100% Results */}
          <div className="flex items-center gap-5 sm:gap-6 pt-6 md:pt-0 md:pl-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-emerald-600 to-teal-700 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
              <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                100%
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200 leading-tight mt-0.5">
                Results
              </span>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>{academyInfo.resultsHighlight}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f2c59] tracking-tight">
                Proven Track Record
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Every batch guided with concept clarity, weekly practice tests, and individual attention.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
