import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import {
  academyInfo,
  createWhatsAppUrl,
  formatEnquiryWhatsAppMessage,
} from '../config/academyInfo';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    course: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

    const formattedMessage = formatEnquiryWhatsAppMessage({
      studentName: formData.studentName.trim(),
      parentName: formData.parentName.trim(),
      phone: formData.phone.trim(),
      course: formData.course.trim(),
      message: formData.message.trim(),
    });

    const targetUrl = createWhatsAppUrl(formattedMessage);
    setSubmitted(true);

    setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2c59] tracking-tight">
            Get in Touch with Good Grade Academy
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Have questions regarding courses, syllabus, or batch timings? Reach out directly via call, WhatsApp, or the enquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards & Information (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* WhatsApp Quick Chat Action */}
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200 shadow-2xs hover:shadow-md hover:bg-emerald-100/80 transition-all flex items-center gap-3.5 group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Direct Assistance
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Chat with us on WhatsApp
                </span>
              </div>
            </a>

            {/* Address & Location Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#0f2c59]">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0f2c59]">
                  Academy Location
                </h3>
              </div>
              
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {academyInfo.address.fullAddress}
              </p>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 text-[#0f2c59]">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0f2c59]">
                  Academy Timings
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-extrabold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                    Monday – Saturday
                  </span>
                  <div className="space-y-1 font-bold text-emerald-800 text-sm sm:text-base">
                    <p>11:00 AM – 1:30 PM</p>
                    <p>4:00 PM – 8:00 PM</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100/90 flex items-center justify-between">
                  <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                    Sunday
                  </span>
                  <span className="font-extrabold text-rose-600 text-sm">
                    Holiday
                  </span>
                </div>
              </div>
            </div>

            {/* Official Email Contact Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Official Email
                </span>
                <a
                  href={`mailto:${academyInfo.email}`}
                  className="text-sm sm:text-base font-bold text-[#0f2c59] hover:text-emerald-700 transition-colors break-all"
                >
                  {academyInfo.email}
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: In-Page Enquiry Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0f2c59]">
                  Send an Academic Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details below. We will format a clean WhatsApp message for you to send to our admissions counselor immediately.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Enquiry Ready!</h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    WhatsApp is opening with your formatted enquiry. Please tap <strong>Send</strong> inside WhatsApp to start chatting.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const msg = formatEnquiryWhatsAppMessage(formData);
                      window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Again</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  
                  {/* Row: Student Name & Parent Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactStudentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Student Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contactStudentName"
                        name="studentName"
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Student's name"
                        className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all ${
                          errors.studentName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                        }`}
                      />
                      {errors.studentName && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.studentName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contactParentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Parent / Guardian Name
                      </label>
                      <input
                        id="contactParentName"
                        name="parentName"
                        type="text"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Parent's name"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row: Phone Number & Course */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactPhone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Contact Phone <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contactPhone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all ${
                          errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contactCourse" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Course / Class Interested In
                      </label>
                      <select
                        id="contactCourse"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all bg-white text-slate-800"
                      >
                        <option value="">Select a Course or Grade...</option>
                        <option value="1st to 10th Standard (SSC - All Subjects)">1st to 10th Standard (SSC - All Subjects)</option>
                        <option value="11th Science (Admissions Open 2026–27)">11th Science (Admissions Open 2026–27)</option>
                        <option value="11th Commerce (Admissions Open 2026–27)">11th Commerce (Admissions Open 2026–27)</option>
                        <option value="11th & 12th Science — MHCET Preparation (Admissions Open 2026–27)">11th & 12th Science — MHCET Preparation (Admissions Open 2026–27)</option>
                        <option value="General Admission Enquiry">General Admission Enquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contactMessage" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Message / Learning Requirements
                    </label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about current school, board syllabus, specific difficulty in subjects..."
                      className="w-full p-3.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 font-bold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Connect with Academy via WhatsApp</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Temporary Testing Desk: {academyInfo.whatsapp.display}. Directly connected to official admissions coordinator.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
