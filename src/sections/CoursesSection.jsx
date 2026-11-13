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
  Award,
  Compass,
  Target,
  FlaskConical,
  Briefcase,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function CoursesSection({ onOpenEnquiry }) {
  const { admissions, courseOfferings, features } = academyInfo;

  return (
    <section id="courses" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>Academic Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2c59] tracking-tight">
            Courses & Curriculum
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Specialized coaching for school excellence (1st to 10th SSC), higher secondary streams (11th Science & Commerce), and targeted MHCET competitive entrance preparation.
          </p>
        </div>

        {/* ========================================================= */}
        {/* PROMINENT ELEGANT ADMISSIONS OPEN 2026–27 HIGHLIGHT */}
        {/* ========================================================= */}
        <div className="mb-16 bg-linear-to-br from-white via-emerald-50/40 to-sky-50/50 rounded-3xl p-6 sm:p-10 border-2 border-emerald-300/80 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-sky-600"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-emerald-600 to-teal-700 text-white text-xs font-black uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{admissions?.badge || 'Admissions Open 2026–27'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/90 text-xs font-bold">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>New Batches: Starting {admissions?.batchStartDate || '15 November 2026'}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight">
                {admissions?.highlightTitle || 'Admissions Open for Academic Year 2026–27'}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                {admissions?.description ||
                  'Enrollment is now open for Higher Secondary (11th Science & 11th Commerce) and specialized 11th & 12th Science MHCET Preparation batches. Concept-first teaching with disciplined mentoring.'}
              </p>

              {/* Included Programs Badges */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Programs Available:
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-[#0f2c59]">
                  <FlaskConical className="w-3.5 h-3.5 text-sky-600" />
                  <span>11th Science</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-[#0f2c59]">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  <span>11th Commerce</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-[#0f2c59]">
                  <Target className="w-3.5 h-3.5 text-amber-600" />
                  <span>11th & 12th Science MHCET Preparation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              <button
                type="button"
                onClick={() => onOpenEnquiry('Admissions Open 2026–27')}
                className="px-7 py-3.5 font-bold text-sm text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group shrink-0"
              >
                <span>Enquire Now for Admissions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="p-3 bg-white/90 rounded-xl border border-slate-200/80 text-center lg:text-right">
                <span className="block text-xs font-extrabold text-slate-800">
                  Batches Start: {admissions?.batchStartDate || '15 November 2026'}
                </span>
                <span className="block text-[11px] text-slate-500 font-medium">
                  Small batch sizes • Limited seats available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RETAINED: PRIMARY SCHOOL PROGRAM CARD (1st TO 10th SSC) */}
        {/* ========================================================= */}
        <div className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block">
                Foundational School Education
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight">
                Classes 1st to 10th Standard (All Subjects)
              </h3>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
              {academyInfo.board}
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 relative overflow-hidden">
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

                <h4 className="text-xl sm:text-2xl font-extrabold text-[#0f2c59]">
                  Strong Foundations & SSC Board Examination Preparation
                </h4>

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
                    className="px-7 py-3 font-bold text-sm text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-xs transition-all inline-flex items-center gap-2 group"
                  >
                    <span>Enquire for 1st to 10th Standard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
        </div>

        {/* ========================================================= */}
        {/* NEW COURSES: HIGHER SECONDARY & MHCET PREPARATION */}
        {/* ========================================================= */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Senior Secondary & Competitive Entrance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight">
              Higher Secondary & Entrance Coaching
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Structured stream guidance under Maharashtra State Board and specialized MHCET competitive preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* 1. COURSE CARD: 11th Science */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-sky-500 to-blue-600"></div>

              <div className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                    Maharashtra State Board
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {admissions?.badge || 'Admissions Open 2026–27'}
                  </span>
                </div>

                {/* Course Title */}
                <div>
                  <h4 className="text-2xl font-black text-[#0f2c59] tracking-tight group-hover:text-sky-700 transition-colors">
                    11th Science
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    Junior College / Higher Secondary
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Rigorous foundational coaching bridging 10th SSC to higher secondary science. Focus on numerical problem-solving, theoretical concepts, and laboratory syllabus understanding.
                </p>

                {/* Subject List */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-sky-600" />
                    <span>Subjects Covered:</span>
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subj) => (
                      <div
                        key={subj}
                        className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{subj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Highlights */}
                <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-1.5">
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>Concept-first numerical & formula mastery</span>
                  </p>
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>Weekly chapter tests & performance tracking</span>
                  </p>
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>Small batch sizes with personal mentoring</span>
                  </p>
                </div>
              </div>

              {/* Card Footer / CTA */}
              <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Batch Starts:</span>
                  <span className="font-bold text-emerald-800">{admissions?.batchStartDate || '15 November 2026'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry('11th Science (Admissions Open 2026–27)')}
                  className="w-full py-2.5 px-4 font-bold text-sm text-sky-900 bg-sky-50 hover:bg-sky-600 hover:text-white border border-sky-200 hover:border-sky-600 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Enquire for 11th Science</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. COURSE CARD: 11th Commerce */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 to-teal-600"></div>

              <div className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Maharashtra State Board
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {admissions?.badge || 'Admissions Open 2026–27'}
                  </span>
                </div>

                {/* Course Title */}
                <div>
                  <h4 className="text-2xl font-black text-[#0f2c59] tracking-tight group-hover:text-emerald-700 transition-colors">
                    11th Commerce
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    Junior College / Higher Secondary
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Practical and concept-driven coaching building strong commercial fundamentals, debit-credit principles, journal/ledger proficiency, and structured board answer-writing.
                </p>

                {/* Subject List */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Subjects Covered:</span>
                  </span>
                  <div className="space-y-2">
                    {[
                      'Bookkeeping & Accountancy',
                      'Economics',
                      'Organisation of Commerce & Management',
                    ].map((subj) => (
                      <div
                        key={subj}
                        className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{subj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Highlights */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Format drills for accounts, journals & ledgers</span>
                  </p>
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Clear concept understanding for business studies</span>
                  </p>
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Board presentation skills & periodic assessments</span>
                  </p>
                </div>
              </div>

              {/* Card Footer / CTA */}
              <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Batch Starts:</span>
                  <span className="font-bold text-emerald-800">{admissions?.batchStartDate || '15 November 2026'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry('11th Commerce (Admissions Open 2026–27)')}
                  className="w-full py-2.5 px-4 font-bold text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Enquire for 11th Commerce</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 3. COURSE CARD: 11th and 12th Science — MHCET Preparation */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-500 to-emerald-600"></div>

              <div className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    Competitive Entrance Prep
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {admissions?.badge || 'Admissions Open 2026–27'}
                  </span>
                </div>

                {/* Course Title */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-[#0f2c59] tracking-tight group-hover:text-amber-800 transition-colors leading-snug">
                    11th & 12th Science — MHCET Preparation
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    Engineering & Pharmacy Entrance Coaching
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Specialized entrance preparation designed to maximize scores in MHCET. Combines board syllabus mastery with speed-accuracy shortcut techniques and comprehensive mock tests.
                </p>

                {/* Subject List */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    <span>MHCET Subjects Covered:</span>
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map((subj) => (
                      <div
                        key={subj}
                        className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{subj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Highlights */}
                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1.5">
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>MHCET weightage-focused chapter planning</span>
                  </p>
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>Shortcuts, formula tricks & option elimination</span>
                  </p>
                  <p className="text-[11px] text-slate-700 flex items-center gap-2">
                    <Check className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>Full-length timed mock tests & score analytics</span>
                  </p>
                </div>
              </div>

              {/* Card Footer / CTA */}
              <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Batch Starts:</span>
                  <span className="font-bold text-emerald-800">{admissions?.batchStartDate || '15 November 2026'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry('11th & 12th Science — MHCET Prep (Admissions Open 2026–27)')}
                  className="w-full py-2.5 px-4 font-bold text-sm text-amber-900 bg-amber-50 hover:bg-amber-600 hover:text-white border border-amber-200 hover:border-amber-600 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Enquire for MHCET Prep</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* WHY CHOOSE US / ACADEMY FEATURES (CLEAN & NON-REPETITIVE) */}
        {/* ========================================================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Why Parents & Students Choose Good Grade Academy
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight">
              Academy Features & Academic Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Client-trusted learning pillars maintained across every class session at Good Grade Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((item, idx) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-300 flex items-start gap-3.5 group ${
                  item.isCore
                    ? 'border-emerald-200 hover:border-emerald-400 shadow-2xs hover:shadow-md'
                    : 'border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-md'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    item.isCore
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 group-hover:bg-emerald-600 group-hover:text-white'
                      : 'bg-sky-50 text-sky-700 border border-sky-200 group-hover:bg-[#0f2c59] group-hover:text-white'
                  }`}
                >
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

      </div>
    </section>
  );
}
