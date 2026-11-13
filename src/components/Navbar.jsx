import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { academyInfo, createWhatsAppUrl } from '../config/academyInfo';

export default function Navbar({ onOpenEnquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position to update header styling & active section indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ['home', 'about', 'courses', 'results', 'review', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close mobile menu on desktop viewport resize (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Smooth scroll handler for nav items
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = 'unset';

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 50);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isOpen
          ? 'bg-white shadow-xl py-3 border-b border-slate-200'
          : isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-xs border-b border-slate-100 py-3.5'
      }`}
    >
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white shadow-xs border border-slate-200 p-0.5 overflow-hidden flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <img
                src={academyInfo.logoUrl}
                alt={`${academyInfo.name} Official Logo`}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-[#0f2c59] tracking-tight leading-tight group-hover:text-sky-700 transition-colors">
                {academyInfo.name}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 tracking-wide">
                {academyInfo.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {academyInfo.navLinks.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-[#0f2c59] font-bold bg-sky-50 shadow-2xs'
                      : 'text-slate-600 hover:text-[#0f2c59] hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${academyInfo.phone.tel}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-lg transition-colors"
              title={`Call us at ${academyInfo.phone.display}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{academyInfo.phone.display}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger & Enquire Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
            >
              Enquire
            </button>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0f2c59] hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X className="w-6 h-6 text-[#0f2c59]" /> : <Menu className="w-6 h-6 text-[#0f2c59]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {isOpen && (
        <>
          {/* Backdrop overlay covering the rest of the page */}
          <div
            className="lg:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-10 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown Menu Drawer placed directly below top bar */}
          <div className="lg:hidden relative z-20 mt-3 border-t border-slate-200/90 bg-white shadow-2xl max-h-[calc(100dvh-75px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-md mx-auto px-5 py-5 flex flex-col gap-1.5">
              <div className="pb-2.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Navigation</span>
                <span className="text-xs font-semibold text-emerald-700">{academyInfo.tagline}</span>
              </div>

              {/* All 7 Navigation Links */}
              {academyInfo.navLinks.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-3 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-sky-50 text-[#0f2c59] border-l-4 border-sky-600 shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f2c59]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-300'}`} />
                  </a>
                );
              })}

              {/* Quick Actions in Mobile Drawer */}
              <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-3.5 px-4 text-center font-bold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-center font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center justify-center gap-2 border border-emerald-200 transition-colors text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WhatsApp: {academyInfo.whatsapp.display}</span>
                </a>

                <a
                  href={`tel:${academyInfo.phone.tel}`}
                  className="w-full py-2 px-4 text-center text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Call: {academyInfo.phone.display}</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
