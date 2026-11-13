import React from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  CheckCircle,
  GraduationCap,
  Shield,
  Layers,
} from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function HeroSection({ onOpenEnquiry }) {
  const handleScrollToCourses = (e) => {
    e.preventDefault();
    const el = document.getElementById('courses');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-linear-to-b from-[#f0f7ff] via-[#f8fbfa] to-[#ffffff]"
    >
      {/* Subtle academic background textures & soft blooms (Strictly LIGHT theme) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.45] -z-10" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 44, 89, 0.07) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-sky-100/60 via-emerald-50/40 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none -z-10" />
      
      {/* Subtle geometric contour rings - modern & educational */}
      <div className="absolute top-16 right-12 w-80 h-80 rounded-full border border-sky-200/40 pointer-events-none -z-10 hidden xl:block" />
      <div className="absolute top-28 right-24 w-60 h-60 rounded-full border border-emerald-200/35 pointer-events-none -z-10 hidden xl:block" />
      <div className="absolute bottom-12 left-10 w-72 h-72 rounded-full border border-slate-200/50 pointer-events-none -z-10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Offerings (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Since 2017 & Trust Indicator Pill */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-200/90 shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-800 tracking-wide">
                {academyInfo.established}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs font-bold text-[#0f2c59] bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200/80">
                {academyInfo.experience}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Admissions 2026–27 Open</span>
              </span>
            </div>

            {/* Dominant Academy Name Heading & Supporting Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0f2c59] tracking-tight leading-[1.1] break-words">
                {academyInfo.name}
              </h1>

              {/* Supporting Subheading / Tagline */}
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-700 tracking-tight flex items-center justify-center lg:justify-start gap-2.5">
                <span className="w-6 h-0.5 bg-emerald-500 rounded-full hidden sm:inline-block" />
                <span>{academyInfo.tagline}</span>
                <span className="w-6 h-0.5 bg-emerald-500 rounded-full hidden sm:inline-block" />
              </div>
            </div>

            {/* Specific Academic Scope: 1st to 10th Std, SSC, All Subjects */}
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200 shadow-2xs max-w-xl mx-auto lg:mx-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="sm:border-r border-slate-100 pr-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Classes
                  </span>
                  <span className="text-sm font-extrabold text-[#0f2c59]">
                    {academyInfo.classes}
                  </span>
                </div>
                <div className="sm:border-r border-slate-100 pr-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Board
                  </span>
                  <span className="text-sm font-extrabold text-emerald-700">
                    {academyInfo.board}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Curriculum
                  </span>
                  <span className="text-sm font-extrabold text-sky-700">
                    {academyInfo.subjects}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Dedicated coaching for school & board success. Conducting classes since 2017 with concept clarity, personal attention to every student, and disciplined practice routines.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              {/* Primary: Enquire Now */}
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary: Explore Courses */}
              <a
                href="#courses"
                onClick={handleScrollToCourses}
                className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-[#0f2c59] bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-sky-300 rounded-xl shadow-2xs hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>Explore Courses</span>
              </a>
            </div>

            {/* Compact Trust Highlights Area */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-[#0f2c59] leading-tight">
                    {academyInfo.established}
                  </span>
                  <span className="block text-[11px] text-slate-500 font-medium">
                    {academyInfo.experience}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-emerald-800 leading-tight">
                    {academyInfo.resultsHighlight}
                  </span>
                  <span className="block text-[11px] text-slate-500 font-medium">
                    Stated Result Record
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-800 leading-tight">
                    Personal Attention
                  </span>
                  <span className="block text-[11px] text-slate-500 font-medium">
                    Small Batch Sizes
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase with Official Logo Emblem (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with Official Logo & Academic Visual */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-200/90 overflow-hidden">
                
                {/* Clean educational image */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/11 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                    alt="Students actively learning in Good Grade Academy classroom"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  
                  {/* Subtle gradient overlay to enhance contrast */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/65 via-transparent to-transparent" />

                  {/* Clean Emblem Badge featuring Good Grade Academy Official Logo */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-slate-200/90 flex items-center gap-2.5 pr-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                      <img
                        src={academyInfo.logoUrl}
                        alt={academyInfo.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-extrabold text-[#0f2c59] leading-tight">
                        {academyInfo.name}
                      </span>
                      <span className="block text-[10px] font-semibold text-emerald-700 leading-none">
                        Since 2017 • SSC Board
                      </span>
                    </div>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-white/95 drop-shadow-xs">
                      1st to 10th Standard • All Subjects • Concept-Driven Coaching
                    </p>
                  </div>
                </div>

                {/* Visual Card Integrated Highlights - Clean, responsive, zero overlap */}
                <div className="mt-4 space-y-3">
                  {/* Two Prominent Trust Highlight Badges: 100% Results & Since 2017 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* 100% Results Badge */}
                    <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex items-center gap-3 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Award className="w-5 h-5 text-amber-300 fill-amber-300" />
                      </div>
                      <div>
                        <span className="block text-sm font-black text-emerald-950 leading-tight">
                          {academyInfo.resultsHighlight}
                        </span>
                        <span className="block text-[11px] text-emerald-700 font-semibold leading-tight mt-0.5">
                          Stated Academy Record
                        </span>
                      </div>
                    </div>

                    {/* Since 2017 Badge */}
                    <div className="p-3 rounded-2xl bg-sky-50/90 border border-sky-200 flex items-center gap-3 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0f2c59] to-[#0369a1] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Calendar className="w-5 h-5 text-sky-200" />
                      </div>
                      <div>
                        <span className="block text-sm font-black text-[#0f2c59] leading-tight">
                          {academyInfo.established}
                        </span>
                        <span className="block text-[11px] text-sky-700 font-semibold leading-tight mt-0.5">
                          {academyInfo.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Syllabus & Quick Action Row */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">
                          Maharashtra State Board (SSC & HSC)
                        </p>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          1st to 10th • 11th Sci & Comm • MHCET Prep
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry()}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
