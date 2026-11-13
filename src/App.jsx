import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ReviewModal from './components/ReviewModal';
import AdminReviewModal from './components/AdminReviewModal';
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

import { galleryItems } from './config/galleryData';
import { fetchApprovedReviews } from './lib/supabase';

export default function App() {
  // Enquiry Modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  // Review Modal state (Public Submission)
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Admin Review Modal state (Moderation Portal)
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Reviews Data from Supabase
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fetch approved reviews from Supabase database
  const loadReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    try {
      const { data } = await fetchApprovedReviews();
      if (Array.isArray(data)) {
        setApprovedReviews(data);
      }
    } catch (err) {
      console.warn('Could not load reviews:', err);
    } finally {
      setIsLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Modal Handlers
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

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
  };

  const handleReviewSubmitted = () => {
    // Review is saved with status='pending' in Supabase.
    // It will appear publicly once approved in the Admin portal.
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
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
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

        {/* 5. Review (Real Supabase Backend & Moderation) */}
        <ReviewSection
          reviews={approvedReviews}
          isLoading={isLoadingReviews}
          onOpenReviewModal={handleOpenReview}
          onOpenAdminModal={handleOpenAdmin}
        />

        {/* 6. Gallery (Real Client Posters & Categorized Tabs) */}
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

      {/* Public Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={handleCloseReview}
        onReviewSubmitted={handleReviewSubmitted}
      />

      {/* Admin Review Moderation Modal */}
      <AdminReviewModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        onReviewsUpdated={loadReviews}
      />

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        items={galleryItems}
        currentIndex={lightboxIndex}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}
