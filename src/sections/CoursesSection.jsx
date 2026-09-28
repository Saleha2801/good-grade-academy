import React from 'react';
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  Calendar,
  CheckCircle,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function CoursesSection({ onOpenEnquiry }) {
  return (
    <section id="courses" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>Academic Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2c59] tracking-tight">
            Courses & Curriculum
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Specialized coaching for school and board excellence under the Maharashtra State Board (SSC) syllabus.
          </p>
        </div>

        {/* Primary Course Offering Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-600 via-teal-600 to-sky-600"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Comprehensive Coaching
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
                  {academyInfo.board}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59]">
                Classes 1st to 10th Standard (All Subjects)
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Complete academic coaching for school students under the Maharashtra State Board. Our curriculum ensures deep fundamental clarity from primary classes right through to rigorous 10th standard SSC Board examination preparation.
              </p>

              {/* Scope Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    1st to 5th Std
                  </span>
                  <span className="text-xs font-bold text-slate-800 block mt-1">
                    Primary Foundations
                  </span>
                  <span className="text-[11px] text-slate-500">Reading, writing & arithmetic</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    6th to 8th Std
                  </span>
                  <span className="text-xs font-bold text-slate-800 block mt-1">
                    Middle School Core
                  </span>
                  <span className="text-[11px] text-slate-500">Maths, Science & English concepts</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    9th & 10th Std (SSC)
                  </span>
                  <span className="text-xs font-bold text-slate-800 block mt-1">
                    Board Exam Prep
                  </span>
                  <span className="text-[11px] text-slate-500">Weekly tests, papers & revision</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry('1st to 10th Standard - All Subjects')}
                  className="px-7 py-3 font-bold text-sm text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
                >
                  <span>Enquire for 1st to 10th Standard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Summary Highlights Box */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Program Highlights</span>
              </h4>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Classes:</strong> 1st to 10th Standard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Board:</strong> Maharashtra State Board (SSC)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Subjects:</strong> All Subjects covered comprehensively</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Focus:</strong> Small batch sizes with personal mentoring</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Practice:</strong> Daily homework & weekly revision test papers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 13 REAL Client-Provided Features */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Why Parents & Students Choose Us
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59]">
              Academy Features & Academic Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Essential learning pillars maintained across every class session at Good Grade Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {academyInfo.features.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all duration-300 flex items-start gap-3.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0f2c59] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Batches Section */}
        <div className="bg-linear-to-r from-sky-50 via-white to-emerald-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Upcoming Batches</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59]">
              New Batches Starting Soon
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Expanding academic excellence with senior secondary guidance under Maharashtra State Board.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {academyInfo.upcomingBatches.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-sky-500"></div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {batch.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {batch.board}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-slate-900">
                    {batch.title}
                  </h4>

                  <p className="text-xs font-semibold text-sky-700">
                    {batch.subjects}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {batch.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(`${batch.title} - ${batch.status}`)}
                    className="w-full py-2.5 px-4 font-bold text-xs sm:text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Enquire for {batch.title} Batch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
