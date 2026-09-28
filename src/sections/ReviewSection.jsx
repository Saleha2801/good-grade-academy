import React from 'react';
import {
  MessageSquare,
  Star,
  PlusCircle,
  ShieldCheck,
  User,
  Quote,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function ReviewSection({ onOpenReviewModal, pendingReviews = [] }) {
  const clientReviews = Array.isArray(academyInfo?.reviews) ? academyInfo.reviews : [];
  const allReviews = [...(Array.isArray(pendingReviews) ? pendingReviews : []), ...clientReviews];

  return (
    <section id="review" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with "Write a Review" CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student & Parent Voice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2c59] tracking-tight">
              Community Experiences & Feedback
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Hear what students and parents say about our teaching clarity, mentoring, and academic atmosphere.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Client Moderation Notice */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Verified Feedback & Moderation Workflow
              </h3>
              <p className="text-xs text-slate-500">
                All submitted reviews are queued for verification by academy administration to uphold authenticity before appearing on the website.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 self-start sm:self-auto">
            Dynamic Ready
          </span>
        </div>

        {/* Reviews Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allReviews.map((review) => {
            const isPending = review.status === 'pending_moderation';
            return (
              <div
                key={review.id}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isPending
                    ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Row: Stars and Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    {isPending ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        In Review Queue
                      </span>
                    ) : review.isSample ? (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        Sample Layout
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="relative">
                    <Quote className="w-6 h-6 text-slate-200 absolute -top-2 -left-1 -z-0 opacity-50" />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed relative z-10 italic">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-none mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{review.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom invitation */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-500">
            Have you or your child studied with Good Grade Academy?{' '}
            <button
              type="button"
              onClick={onOpenReviewModal}
              className="text-emerald-700 font-bold hover:underline"
            >
              Click here to leave your honest review
            </button>
            .
          </p>
        </div>

      </div>
    </section>
  );
}
