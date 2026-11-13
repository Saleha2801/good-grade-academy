/**
 * Gallery configuration and real client poster assets for Good Grade Academy.
 * 
 * Rules:
 * - No fake or AI-generated stock photos.
 * - Modular category tabs: All | Classes | Faculty | Events | Posters
 * - Empty states for categories with no images yet (Classes, Faculty, Events)
 * - Official client promotional posters in the Posters category
 */

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'classes', label: 'Classes' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'events', label: 'Events' },
  { id: 'posters', label: 'Posters' },
];

export const emptyStateMessages = {
  classes: {
    title: 'Classroom photos coming soon.',
    description:
      'We are in the process of capturing and uploading official Good Grade Academy classroom and learning moments. Check back soon!',
  },
  faculty: {
    title: 'Faculty photos coming soon.',
    description:
      'We are in the process of capturing and uploading official Good Grade Academy faculty profiles and teaching moments. Check back soon!',
  },
  events: {
    title: 'Event photos coming soon.',
    description:
      'We are in the process of capturing and uploading official Good Grade Academy student felicitation and academic event moments. Check back soon!',
  },
};

export const galleryItems = [
  {
    id: 'poster-1',
    title: 'Class 11 Admissions — Science & Commerce',
    category: 'posters',
    image: '/images/gallery/posters/Good Grade Academy Class 11 admission poster.jpeg',
    thumbnail: '/images/gallery/posters/Good Grade Academy Class 11 admission poster.jpeg',
    alt: 'Good Grade Academy Class 11 Science and Commerce admission poster',
    description:
      'Maharashtra State Board Class 11 admissions for Science and Commerce streams. New batches starting 15 November 2026.',
    badge: 'Admissions 2026–27',
    date: '15 Nov 2026',
  },
  {
    id: 'poster-2',
    title: 'Grade 11 & 12 Science — Concept & Board Coaching',
    category: 'posters',
    image: '/images/gallery/posters/Grade 11 and 12 Science admission poster.jpeg',
    thumbnail: '/images/gallery/posters/Grade 11 and 12 Science admission poster.jpeg',
    alt: 'Grade 11 and 12 Science admission and coaching poster',
    description:
      'Comprehensive higher secondary science coaching for Physics, Chemistry, Mathematics, and Biology with experienced mentors.',
    badge: '11th & 12th Science',
    date: '15 Nov 2026',
  },
  {
    id: 'poster-3',
    title: 'Higher Secondary Course Admissions',
    category: 'posters',
    image: '/images/gallery/posters/Grade 11 and 12 courseadmission promotional poster.jpeg',
    thumbnail: '/images/gallery/posters/Grade 11 and 12 courseadmission promotional poster.jpeg',
    alt: 'Class 11 and 12 Course admission promotional poster',
    description:
      'Official academic stream admissions including 11th Science, 11th Commerce, and competitive entrance coaching.',
    badge: 'Course Admissions',
    date: '15 Nov 2026',
  },
  {
    id: 'poster-4',
    title: 'MHCET Preparation — 11th & 12th Science',
    category: 'posters',
    image: '/images/gallery/posters/MHCET preparation poster.jpeg',
    thumbnail: '/images/gallery/posters/MHCET preparation poster.jpeg',
    alt: 'MHCET preparation entrance coaching poster for 11th and 12th Science',
    description:
      'Targeted competitive entrance strategy for Engineering & Pharmacy aspirants: speed-accuracy drills, weightage focus, and mock tests.',
    badge: 'MHCET Entrance',
    date: '15 Nov 2026',
  },
];

