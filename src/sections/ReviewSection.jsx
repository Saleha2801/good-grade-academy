import React from 'react';
import {
  MessageSquare,
  Star,
  PlusCircle,
  ShieldCheck,
  User,
  Quote,
  Sparkles,
  Info,
  Database,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function ReviewSection({
  reviews = [],
  isLoading = false,
  onOpenReviewModal,
  onOpenAdminModal,
}) {
  const isConfigured = isSupabaseConfigured();

  // Calculate metrics only from approved reviews
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / totalReviews).toFixed(1)
    : '5.0';

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
              Read authentic feedback from students and parents regarding concept clarity, regular test tracking, and mentorship.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write a Review</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdminModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs transition-all"
              title="Admin review moderation portal"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Database Status & Transparency Banner */}
        {!isConfigured ? (
          <div className="p-5 bg-white rounded-2xl border border-amber-200/90 shadow-2xs mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                <Database className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Backend Database Integration Ready (Supabase)
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Review system is connected to Supabase backend. Please configure your <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-800 font-mono">.env</code> file with <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-800 font-mono">VITE_SUPABASE_URL</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-800 font-mono">VITE_SUPABASE_ANON_KEY</code> to load live reviews.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenAdminModal}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-colors"
            >
              Setup Guide
            </button>
          </div>
        ) : (
          <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Verified Moderation Pipeline
                </h3>
                <p className="text-xs text-slate-500">
                  Every submitted feedback entry is reviewed by Good Grade Academy administration before publication to uphold authenticity.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                Supabase Connected
              </span>
            </div>
          </div>
        )}

        {/* Reviews Overview Strip when reviews exist */}
        {totalReviews > 0 && (
          <div className="mb-8 p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-extrabold text-[#0f2c59]">
                {averageRating}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(Number(averageRating))
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Based on {totalReviews} approved student & parent review{totalReviews > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content: Loading | Empty State | Reviews Grid */}
        {isLoading ? (
          <div className="py-16 text-center text-slate-500 space-y-2">
            <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-medium">Loading verified reviews...</p>
          </div>
        ) : totalReviews === 0 ? (
          <div className="max-w-xl mx-auto p-8 sm:p-12 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
            <div className="w-14 h-14 bg-sky-50 text-sky-700 rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
              <MessageSquare className="w-7 h-7 text-sky-600" />
            </div>
            <h3 className="text-lg font-bold text-[#0f2c59]">
              Be the First to Review Good Grade Academy!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Have you or your child studied with us? Share your experience with our faculty, curriculum, and results.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenReviewModal}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Your Review</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Stars and Course/Status Row */}
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
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Course tag if available */}
                  {review.course && (
                    <div className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100 w-fit">
                      {review.course}
                    </div>
                  )}

                  {/* Comment */}
                  <div className="relative">
                    <Quote className="w-6 h-6 text-slate-200 absolute -top-2 -left-1 opacity-50 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed relative z-10 italic">
                      &ldquo;{review.message}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Reviewer Details Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-[#0f2c59] flex items-center justify-center font-bold text-xs border border-slate-200">
                      {review.name ? review.name.charAt(0) : 'U'}
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
                  <span className="text-[10px] text-slate-400">
                    {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Verified'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom invitation */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-500">
            Have you or your child studied with Good Grade Academy?{' '}
            <button
              type="button"
              onClick={onOpenReviewModal}
              className="text-emerald-700 font-bold hover:underline"
            >
              Click here to leave your genuine review
            </button>
            .
          </p>
        </div>

      </div>
    </section>
  );
}
