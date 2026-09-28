import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle2, AlertCircle, ShieldCheck, User, MessageSquare } from 'lucide-react';
import { academyInfo } from '../config/academyInfo';

export default function ReviewModal({ isOpen, onClose, onReviewSubmitted }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSuccess(false);
      setError('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a short review or feedback');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Please provide at least a few words (min 10 characters)');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Prepare payload ready for future API endpoint (POST /api/reviews)
    const newReviewPayload = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: `${role}`,
      rating,
      comment: comment.trim(),
      date: 'Just now',
      status: 'pending_moderation', // Future moderation pipeline
      submittedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      if (onReviewSubmitted) {
        onReviewSubmitted(newReviewPayload);
      }
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-linear-to-r from-[#0f2c59] to-[#0369a1] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h3 id="review-modal-title" className="text-lg font-bold leading-tight">
                Submit a Student / Parent Review
              </h3>
              <p className="text-xs text-sky-100 font-medium mt-0.5">
                Share your genuine academic feedback
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-2 focus:ring-white"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {success ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Review Submitted Successfully!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for your valuable feedback! To maintain authenticity and trust, all reviews undergo brief academy moderation before appearing publicly.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="flex items-start gap-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-800">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Academy Moderation Policy:</strong> Submissions are reviewed by the academy administration to ensure honest, appropriate, and constructive feedback.
                </span>
              </div>

              {/* Rating Stars */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Rating <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 rounded-md hover:scale-110 transition-transform focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            isFilled
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 stroke-1'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-semibold text-slate-500 ml-2">
                    {rating === 5
                      ? '5 Stars (Excellent)'
                      : rating === 4
                      ? '4 Stars (Very Good)'
                      : rating === 3
                      ? '3 Stars (Good)'
                      : rating === 2
                      ? '2 Stars (Fair)'
                      : '1 Star (Needs Improvement)'}
                  </span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="reviewName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="reviewName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Category / Role */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  I am a
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Student', 'Parent', 'Guardian/Alumni'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRole(item)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                        role === item
                          ? 'bg-sky-50 border-sky-500 text-sky-800 shadow-2xs font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Review */}
              <div>
                <label htmlFor="reviewComment" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Review & Feedback <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="reviewComment"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share how the teaching methods, personal attention, or concept clarity benefited learning..."
                    className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="text-xs text-rose-600 flex items-center gap-1.5 p-2 bg-rose-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 font-bold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Submitting for Review...</span>
                  ) : (
                    <span>Submit Review for Moderation</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
