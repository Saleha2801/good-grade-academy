import React from 'react';
import { Award, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import { studentResults } from '../config/studentResults';
import { academyInfo } from '../config/academyInfo';

export default function ResultsSection({ onOpenEnquiry }) {
  return (
    <section id="results" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Academic Excellence</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2c59] tracking-tight">
            Celebrating Student Success
          </h2>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-emerald-600 to-teal-700 text-white font-black text-base sm:text-lg shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{academyInfo.resultsHighlight}</span>
          </div>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-1">
            Consistent academic dedication, disciplined practice tests, and concept-first coaching delivering outstanding scores across Maharashtra State Board exams.
          </p>
        </div>

        {/* 19 Student Result Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {studentResults.map((student) => (
            <ResultCard key={student.id} student={student} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-linear-to-r from-sky-50 via-white to-emerald-50 rounded-3xl p-6 sm:p-8 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{academyInfo.established} • {academyInfo.experience}</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#0f2c59]">
              Aiming for top marks in your school and board exams?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Join Good Grade Academy for structured practice, concept clarity, and 100% results.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry('Results & Admissions')}
            className="px-6 py-3 font-bold text-sm text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-xs transition-colors shrink-0"
          >
            Enquire for Next Batch
          </button>
        </div>

      </div>
    </section>
  );
}
