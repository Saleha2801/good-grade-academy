import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ReviewModal from './components/ReviewModal';
import LightboxModal from './components/LightboxModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import HeroSection from './sections/HeroSection';
import TrustHighlights from './components/TrustHighlights';
import AboutSection from './sections/AboutSection';
import CoursesSection from './sections/CoursesSection';
import ResultsSection from './sections/ResultsSection';
import ReviewSection from './sections/ReviewSection';
import GallerySection from './sections/GallerySection';
import ContactSection from './sections/ContactSection';

import { academyInfo } from './config/academyInfo';

export default function App() {
  // Enquiry Modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  // Review Modal state
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [pendingReviews, setPendingReviews] = useState([]);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleOpenEnquiry = (courseName = '') => {
    setSelectedCourse(courseName);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
    setSelectedCourse('');
  };

  const handleOpenReview = () => {
    setIsReviewOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewOpen(false);
  };

  const handleReviewSubmitted = (newReview) => {
    // Add pending review to local state ready for moderation / future API persistence
    setPendingReviews((prev) => [newReview, ...prev]);
  };

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? academyInfo.gallery.length - 1 : prev - 1
    );
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) =>
      prev === academyInfo.gallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Single-Page Sections (in exact required order) */}
      <main className="grow">
        {/* 1. Home / Hero */}
        <HeroSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Experience & Trust Strip: Since 2017 | 9+ Years | 100% Results */}
        <TrustHighlights />

        {/* 2. About */}
        <AboutSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 3. Courses */}
        <CoursesSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 4. Results */}
        <ResultsSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 5. Review */}
        <ReviewSection
          onOpenReviewModal={handleOpenReview}
          pendingReviews={pendingReviews}
        />

        {/* 6. Gallery */}
        <GallerySection onOpenLightbox={handleOpenLightbox} />

        {/* 7. Contact */}
        <ContactSection />
      </main>

      {/* 8. Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Floating "Chat with us" WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Reusable Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        preselectedCourse={selectedCourse}
      />

      {/* Reusable Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={handleCloseReview}
        onReviewSubmitted={handleReviewSubmitted}
      />

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        items={academyInfo.gallery}
        currentIndex={lightboxIndex}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}
