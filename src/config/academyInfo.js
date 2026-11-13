/**
 * Centralized Configuration for Good Grade Academy
 * 
 * LATEST CLIENT SPECIFICATIONS:
 * - Academy Name: Good Grade Academy
 * - Tagline: "Learn Today | Grow Tomorrow"
 * - Highlights: "Since 2017", "9+ Years of Academic Experience", "100% Results"
 * - Offerings: Classes 1st to 10th Standard (SSC), 11th Science, 11th Commerce, 11th & 12th Science MHCET Prep
 * - Official Contact Number: 9185257864
 * - WhatsApp (India Code 91): +91 91852 57864 (normalized: 919185257864)
 * - Email: naazparvez8588@gmail.com
 * - Location: Vikas Nagar, Near Disha Computer Classes, Opp. to Shinde Petrol Pump
 * - Timings: Mon-Sat 11:00 AM–1:30 PM & 4:00 PM–8:00 PM | Sunday: Holiday
 */

export const academyInfo = {
  // Brand Details
  name: "Good Grade Academy",
  tagline: "Learn Today | Grow Tomorrow",
  logoUrl: "/images/good-grade-logo.jpeg",
  established: "Since 2017",
  experience: "9+ Years of Academic Experience",
  resultsHighlight: "100% Results",
  shortDescription:
    "Conducting classes since 2017 for 1st to 10th Standard (Maharashtra State Board - SSC) across All Subjects with personal attention and 100% results.",

  // Academic Core Details
  classes: "1st to 10th Standard",
  board: "Maharashtra State Board (SSC)",
  subjects: "All Subjects",

  // Contact Details (Updated from latest client promotional posters)
  whatsapp: {
    display: "+91 91852 57864",
    number: "919185257864",
    rawNumber: "9185257864",
    defaultChatText:
      "Hello Good Grade Academy, I would like to know more about your courses and admissions.",
  },

  phone: {
    display: "+91 91852 57864",
    tel: "+919185257864",
    rawNumber: "9185257864",
  },

  email: "naazparvez8588@gmail.com",

  address: {
    location:
      "Vikas Nagar, Near Disha Computer Classes, Opp. to Shinde Petrol Pump",
    fullAddress:
      "Vikas Nagar, Near Disha Computer Classes, Opp. to Shinde Petrol Pump",
  },

  googleMapsUrl:
    "https://maps.google.com/?q=Vikas+Nagar,+Near+Disha+Computer+Classes,+Opp.+to+Shinde+Petrol+Pump",

  workingHours: {
    weekdays: "Monday to Saturday: 11:00 AM – 1:30 PM & 4:00 PM – 8:00 PM",
    weekdaysTitle: "Monday to Saturday",
    slot1: "11:00 AM to 1:30 PM",
    slot2: "4:00 PM to 8:00 PM",
    sundayTitle: "Sunday",
    sunday: "Sunday: Holiday",
  },

  // Admissions & New Batches Configuration (Configurable batch-start date)
  admissions: {
    academicYear: "2026–27",
    badge: "Admissions Open 2026–27",
    batchStartDate: "15 November 2026",
    highlightTitle: "Admissions Open for Academic Year 2026–27",
    batchAnnouncement: "New Batches Starting from 15 November 2026",
    description:
      "Enrollment is now open for Higher Secondary (11th Science & 11th Commerce) and specialized 11th & 12th Science MHCET Preparation batches. Concept-first teaching with disciplined mentoring.",
    programs: [
      {
        id: "adm-sci-11",
        name: "11th Science",
        board: "Maharashtra State Board",
        subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      },
      {
        id: "adm-comm-11",
        name: "11th Commerce",
        board: "Maharashtra State Board",
        subjects: [
          "Bookkeeping & Accountancy",
          "Economics",
          "Organisation of Commerce & Management",
        ],
      },
      {
        id: "adm-mhcet",
        name: "11th & 12th Science — MHCET Preparation",
        board: "Competitive Entrance Pattern",
        subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
      },
    ],
  },

  // Navigation Links (Exact order: Home, About, Courses, Results, Review, Gallery, Contact)
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Results", href: "#results" },
    { label: "Review", href: "#review" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],

  // Client-Provided Academy Features & Learning Pillars (Clean, non-repetitive)
  features: [
    {
      id: "f-1",
      title: "Experienced Faculty",
      desc: "Passionate, knowledgeable educators focused on patient instruction, deep subject clarity, and student mentoring.",
      isCore: true,
    },
    {
      id: "f-2",
      title: "Concept-Based Learning",
      desc: "Strong emphasis on fundamental understanding and application, eliminating rote learning and exam fear.",
      isCore: true,
    },
    {
      id: "f-3",
      title: "Small Batch Size",
      desc: "Strictly limited students per batch ensuring every learner receives personal attention, active participation, and individual guidance.",
      isCore: true,
    },
    {
      id: "f-4",
      title: "Regular Tests & Performance Tracking",
      desc: "Frequent chapter-wise assessments, test series, and systematic progress reviews shared proactively with parents.",
      isCore: true,
    },
    {
      id: "f-5",
      title: "Supportive & Friendly Environment",
      desc: "A warm, respectful, and disciplined atmosphere that fosters curiosity, positive study habits, and learner confidence.",
      isCore: true,
    },
    {
      id: "f-6",
      title: "MHCET-Focused Strategy",
      desc: "Specialized competitive coaching with high-yield MCQ drills, shortcut methods, formula mastery, and full-length mock exams.",
      isCore: true,
    },
    {
      id: "f-7",
      title: "Personal Attention to Every Student",
      desc: "Tailored mentoring that identifies each student's specific areas of improvement and nurtures their academic potential.",
    },
    {
      id: "f-8",
      title: "Dedicated Doubt-Solving Sessions",
      desc: "Open, supportive classroom environment ensuring all student doubts in numericals and theory are resolved thoroughly.",
    },
    {
      id: "f-9",
      title: "Exam-Oriented Preparation",
      desc: "Structured practice with Maharashtra State Board patterns, past paper solving, and time management strategies.",
    },
    {
      id: "f-10",
      title: "Affordable & Transparent Fees",
      desc: "High quality, dedicated coaching made accessible for families while upholding exemplary academic standards.",
    },
  ],

  // Structured Academic Programs / Courses
  courseOfferings: [
    {
      id: "course-11-science",
      title: "11th Science",
      badge: "Maharashtra State Board",
      category: "Higher Secondary",
      tagline: "Comprehensive Foundational Coaching for Science Stream",
      description:
        "Bridging 10th SSC concepts to higher secondary science with rigorous theory clarity, laboratory understanding, and numerical mastery.",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
      ],
      highlights: [
        "Concept-first pedagogy for complex numericals & derivations",
        "Chapter-wise formula sheets & structured problem-solving",
        "Weekly assessment tests with performance tracking",
        "Small batch sizes ensuring individual doubt solving",
      ],
      enquiryTarget: "11th Science (Admissions Open 2026–27)",
    },
    {
      id: "course-11-commerce",
      title: "11th Commerce",
      badge: "Maharashtra State Board",
      category: "Higher Secondary",
      tagline: "Practical & Concept-Driven Coaching for Commerce Fundamentals",
      description:
        "Building rock-solid commercial fundamentals, debit-credit principles, journal/ledger proficiency, and structured board answer-writing.",
      subjects: [
        "Bookkeeping & Accountancy",
        "Economics",
        "Organisation of Commerce & Management",
      ],
      highlights: [
        "Step-by-step accounting format drills & balance sheet mastery",
        "Real-world application for economics and business concepts",
        "Presentation & time management techniques for board exams",
        "Periodic progress reports and continuous student feedback",
      ],
      enquiryTarget: "11th Commerce (Admissions Open 2026–27)",
    },
    {
      id: "course-mhcet",
      title: "11th and 12th Science — MHCET Preparation",
      badge: "Competitive Entrance Prep",
      category: "Engineering & Pharmacy Entrance",
      tagline: "Targeted Strategy for Maharashtra Common Entrance Test",
      description:
        "Specialized entrance preparation designed to maximize scores in MHCET. Integrates syllabus mastery with speed-accuracy techniques, shortcut methods, and mock exams.",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
      ],
      highlights: [
        "MHCET weightage-focused chapter planning & syllabus mapping",
        "Shortcuts, option elimination & time optimization techniques",
        "Extensive objective MCQ question bank practice",
        "Timed full-length mock tests simulating real examination environment",
      ],
      enquiryTarget: "11th & 12th Science — MHCET Prep (Admissions Open 2026–27)",
    },
  ],

  // Upcoming Batches (Synced with Admissions 2026–27)
  upcomingBatches: [
    {
      id: "batch-science",
      title: "11th Science",
      status: "Admissions Open 2026–27",
      board: "Maharashtra State Board",
      startDate: "15 November 2026",
      subjects: "Physics, Chemistry, Mathematics & Biology",
      desc: "New batch starting 15 November 2026 with strong foundational coaching bridging 10th SSC to higher secondary concepts.",
    },
    {
      id: "batch-commerce",
      title: "11th Commerce",
      status: "Admissions Open 2026–27",
      board: "Maharashtra State Board",
      startDate: "15 November 2026",
      subjects: "Bookkeeping & Accountancy, Economics, Organisation of Commerce & Management",
      desc: "New batch starting 15 November 2026 with practical, concept-driven coaching for commerce fundamentals.",
    },
    {
      id: "batch-mhcet",
      title: "11th & 12th Science MHCET Preparation",
      status: "Admissions Open 2026–27",
      board: "MHCET Competitive Entrance",
      startDate: "15 November 2026",
      subjects: "Physics, Chemistry, Biology & Mathematics",
      desc: "New batch starting 15 November 2026 with targeted MCQ drills, shortcut methods, and timed mock test series.",
    },
  ],

  // Reviews Data: Initial production database is completely empty.
  // Live verified reviews are loaded dynamically from Supabase where status = 'approved'.
  reviews: [],

  // Gallery Showcase (Neutral education visuals until client photos are supplied)
  gallery: [
    {
      id: "gal-1",
      title: "Interactive Classroom Learning",
      category: "Classroom",
      imageUrl:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      description:
        "Focused classroom sessions with concept-oriented discussions and student participation.",
    },
    {
      id: "gal-2",
      title: "Personal Attention & Mentoring",
      category: "Mentorship",
      imageUrl:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
      description:
        "Individual guidance helping each student overcome doubts and master subject fundamentals.",
    },
    {
      id: "gal-3",
      title: "Peer Problem Solving",
      category: "Learning Culture",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      description:
        "Encouraging study environment fostering collaboration, curiosity, and disciplined habits.",
    },
    {
      id: "gal-4",
      title: "Structured Study Atmosphere",
      category: "Study Space",
      imageUrl:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      description:
        "Quiet, organized environment suited for weekly assessments and comprehensive revision.",
    },
    {
      id: "gal-5",
      title: "Maths & Science Foundations",
      category: "Specialized Coaching",
      imageUrl:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
      description:
        "Specialized focus on numericals, science concepts, and practical problem solving.",
    },
    {
      id: "gal-6",
      title: "Academic Growth & Success",
      category: "Excellence",
      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      description:
        "Celebrating student diligence, consistent revision, and 100% academic results.",
    },
  ],
};

/**
 * Helper to construct WhatsApp URLs with encoded messages
 */
export function createWhatsAppUrl(customMessage) {
  const number = academyInfo.whatsapp.number;
  const message = customMessage || academyInfo.whatsapp.defaultChatText;
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Helper to format an enquiry submission into a standardized WhatsApp message
 */
export function formatEnquiryWhatsAppMessage({
  studentName,
  parentName,
  phone,
  course,
  message,
}) {
  return [
    `Hello ${academyInfo.name},`,
    ``,
    `I would like to make an enquiry.`,
    ``,
    `• Student Name: ${studentName || 'Not specified'}`,
    `• Parent/Guardian: ${parentName || 'Not specified'}`,
    `• Phone: ${phone || 'Not specified'}`,
    `• Course/Class: ${course || 'General Enquiry'}`,
    `• Message: ${message || 'Please share admission details and batch timings.'}`,
    ``,
    `Please share more details.`,
  ].join('\n');
}
