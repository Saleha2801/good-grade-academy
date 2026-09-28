import React from 'react';
import {
  Calendar,
  Award,
  BookOpenCheck,
  GraduationCap,
  Users,
  Lightbulb,
  CheckCircle2,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function AboutSection({ onOpenEnquiry }) {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>About Good Grade Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2c59] tracking-tight">
            Dedicated Academic Guidance <span className="text-emerald-700">{academyInfo.established}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Good Grade Academy has been conducting classes since 2017, building strong academic foundations through student-focused education and personal attention.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Visual Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-50 p-2 sm:p-3">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                    alt="Students and educator collaborating in study session"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/65 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Our Motto & Purpose
                    </span>
                    <p className="text-sm sm:text-base font-semibold mt-1">
                      &ldquo;Learn Today | Grow Tomorrow&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Box */}
                <div className="p-4 bg-white rounded-xl mt-3 border border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0f2c59] flex items-center justify-center shrink-0 font-bold">
                      <Calendar className="w-5 h-5 text-sky-700" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Conducting Classes Since 2017
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {academyInfo.experience} dedicated to school & SSC board students.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge Strip */}
              <div className="hidden sm:block absolute -bottom-5 -right-5 bg-[#0f2c59] text-white p-4 rounded-2xl shadow-lg max-w-[210px]">
                <p className="text-xs font-extrabold tracking-wide uppercase text-sky-300">
                  {academyInfo.established}
                </p>
                <p className="text-[11px] text-slate-200 mt-1 leading-snug">
                  Personal attention, concept clarity, and 100% results.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Content (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-bold">
                {academyInfo.experience}
              </div>
              <h3 className="text-2xl font-bold text-[#0f2c59]">
                Good Grade Academy has been conducting classes since 2017.
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                We specialize in teaching students from <strong className="text-slate-800">1st to 10th Standard (Maharashtra State Board - SSC) across All Subjects</strong>. Our entire educational philosophy revolves around removing exam fear by instilling solid fundamental concepts and disciplined practice habits.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Rather than rushing through textbooks or relying on rote learning, our educators focus on step-by-step concept clarity, regular practice worksheets, and continuous revision so every student builds long-term confidence.
              </p>
            </div>

            {/* Approach Key Pillars */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Personal Attention to Every Student</h4>
                  <p className="text-xs text-slate-500">Keeping batch sizes small to ensure every doubt is resolved patiently.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Strong Academic Foundation & Basic Concepts</h4>
                  <p className="text-xs text-slate-500">Bridging foundational learning from 1st to 10th standard for all school subjects.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Weekly Tests & Board Exam Preparation</h4>
                  <p className="text-xs text-slate-500">Regular chapter reviews and answer-writing practice aligned with Maharashtra State Board pattern.</p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-xs transition-colors"
              >
                <span>Enquire About Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
