import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, AlertCircle, CheckCircle2, User, Phone, BookOpen, MessageSquare } from 'lucide-react';
import { academyInfo, formatEnquiryWhatsAppMessage, createWhatsAppUrl } from '../config/academyInfo';

export default function EnquiryModal({ isOpen, onClose, preselectedCourse = '' }) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    course: preselectedCourse || '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, course: preselectedCourse }));
    }
  }, [preselectedCourse]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSubmitted(false);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Format standardized enquiry message
    const formattedMsg = formatEnquiryWhatsAppMessage({
      studentName: formData.studentName.trim(),
      parentName: formData.parentName.trim(),
      phone: formData.phone.trim(),
      course: formData.course.trim(),
      message: formData.message.trim(),
    });

    const targetUrl = createWhatsAppUrl(formattedMsg);

    // Short UI confirmation then trigger WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Open WhatsApp in new tab / app
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-linear-to-r from-[#0f2c59] to-[#0369a1] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 id="enquiry-modal-title" className="text-lg font-bold leading-tight">
                Enquire with Good Grade Academy
              </h3>
              <p className="text-xs text-sky-100 font-medium mt-0.5">
                Quick responses via direct WhatsApp assistance
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Opening WhatsApp...</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Your enquiry details have been pre-filled. Please tap <strong>Send</strong> in WhatsApp to connect directly with the academy counselor.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const formattedMsg = formatEnquiryWhatsAppMessage({
                      studentName: formData.studentName.trim(),
                      parentName: formData.parentName.trim(),
                      phone: formData.phone.trim(),
                      course: formData.course.trim(),
                      message: formData.message.trim(),
                    });
                    window.open(createWhatsAppUrl(formattedMsg), '_blank', 'noopener,noreferrer');
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Re-open WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="text-xs text-slate-500 bg-sky-50/80 p-2.5 rounded-lg border border-sky-100 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  Submit to open WhatsApp with a pre-filled enquiry for quick counseling and course guidance.
                </span>
              </p>

              {/* 1. Student Name */}
              <div>
                <label htmlFor="studentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all ${
                      errors.studentName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.studentName && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.studentName}</span>
                  </p>
                )}
              </div>

              {/* 2. Parent / Guardian Name */}
              <div>
                <label htmlFor="parentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Parent / Guardian Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Enter parent or guardian's name"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* 3. Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* 4. Course / Class */}
              <div>
                <label htmlFor="course" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course or Class Interested In
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="course"
                    name="course"
                    type="text"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. Class 10th Board / Higher Secondary Science"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* 5. Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Message or Learning Needs
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the student's current school, subjects needed, or specific questions..."
                    className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 font-bold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Preparing WhatsApp...</span>
                  ) : (
                    <>
                      <span>Send Enquiry via WhatsApp</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  Official academy inquiries connected to WhatsApp: {academyInfo.whatsapp.display}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
