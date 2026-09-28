/**
 * Centralized Configuration for Good Grade Academy
 * 
 * REAL CLIENT SPECIFICATIONS:
 * - Academy Name: Good Grade Academy
 * - Tagline: "Learn Today | Grow Tomorrow"
 * - Highlights: "Since 2017", "9+ Years of Academic Experience", "100% Results"
 * - Offerings: Classes 1st to 10th Standard, Maharashtra State Board (SSC), All Subjects
 * - Email: naazparvez8588@gmail.com
 * - Location: Opp. to Aqsa Masjid, near Wisdom English Medium High School, Vikas Nagar, Dehu Road
 * - Timings: Mon-Sat 11:00 AM–1:30 PM & 4:00 PM–8:00 PM | Sunday: Holiday
 * - WhatsApp (dev/testing): +91 77759 86424 (normalized: 917775986424)
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

  // Contact Details
  whatsapp: {
    display: "+91 77759 86424",
    number: "917775986424",
    defaultChatText:
      "Hello Good Grade Academy, I would like to know more about your courses.",
  },

  phone: {
    display: "+91 77759 86424",
    tel: "+917775986424",
  },

  email: "naazparvez8588@gmail.com",

  address: {
    location:
      "Opp. to Aqsa Masjid, near Wisdom English Medium High School, Vikas Nagar, Dehu Road",
    fullAddress:
      "Opp. to Aqsa Masjid, near Wisdom English Medium High School, Vikas Nagar, Dehu Road",
  },

  googleMapsUrl:
    "https://maps.google.com/?q=Opp.+to+Aqsa+Masjid,+near+Wisdom+English+Medium+High+School,+Vikas+Nagar,+Dehu+Road",

  workingHours: {
    weekdays: "Monday to Saturday: 11:00 AM – 1:30 PM & 4:00 PM – 8:00 PM",
    sunday: "Sunday: Holiday",
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

  // 13 REAL Client-Provided Features
  features: [
    {
      id: "f-1",
      title: "Experienced & Dedicated Teachers",
      desc: "Passionate educators focused on inspiring clarity and guiding student improvement.",
    },
    {
      id: "f-2",
      title: "Personal Attention to Every Student",
      desc: "Nurturing each learner with focused mentoring according to their individual learning pace.",
    },
    {
      id: "f-3",
      title: "Strong Focus on Basic Concepts",
      desc: "Ensuring deep understanding of fundamentals rather than superficial memorization.",
    },
    {
      id: "f-4",
      title: "Regular Homework & Practice",
      desc: "Structured daily assignments to build consistency and reinforce classroom topics.",
    },
    {
      id: "f-5",
      title: "Weekly Tests & Revision",
      desc: "Continuous assessments to track progress, resolve mistakes, and consolidate knowledge.",
    },
    {
      id: "f-6",
      title: "Special Guidance for Maths & Science",
      desc: "Targeted problem-solving drills, formula mastery, and concept visualization.",
    },
    {
      id: "f-7",
      title: "English Grammar & Writing Practice",
      desc: "Developing strong linguistic expression, comprehension, and board-level presentation skills.",
    },
    {
      id: "f-8",
      title: "Doubt-Solving Sessions",
      desc: "Encouraging an open classroom atmosphere where every student question is addressed.",
    },
    {
      id: "f-9",
      title: "Small Batch Sizes",
      desc: "Ensuring effective classroom interaction, student focus, and personalized feedback.",
    },
    {
      id: "f-10",
      title: "Regular Progress Monitoring",
      desc: "Systematic tracking of academic improvement with clear communication for parents.",
    },
    {
      id: "f-11",
      title: "Exam-Oriented Preparation",
      desc: "Maharashtra State Board pattern test series, previous paper practice, and time management.",
    },
    {
      id: "f-12",
      title: "Affordable Fees",
      desc: "High quality, dedicated coaching made accessible for families.",
    },
    {
      id: "f-13",
      title: "Friendly & Disciplined Learning Environment",
      desc: "A warm, respectful atmosphere that inspires self-discipline and positive study habits.",
    },
  ],

  // Upcoming Batches
  upcomingBatches: [
    {
      id: "batch-science",
      title: "11th Science",
      status: "New Batch Starting Soon",
      board: "Maharashtra State Board",
      subjects: "Physics, Chemistry, Maths & Biology",
      desc: "Admissions opening soon with strong foundational coaching bridging 10th SSC to higher secondary concepts.",
    },
    {
      id: "batch-commerce",
      title: "11th Commerce",
      status: "New Batch Starting Soon",
      board: "Maharashtra State Board",
      subjects: "Accounts, Economics & Business Studies",
      desc: "Admissions opening soon with practical, concept-driven coaching for commerce fundamentals.",
    },
  ],

  // Reviews Data (Clean structure ready for dynamic reviews / moderation)
  reviews: [
    {
      id: "rev-sample-1",
      name: "S. Kulkarni",
      role: "Parent (Class 10 SSC Student)",
      rating: 5,
      date: "Academic Term",
      comment:
        "The personal attention given to each student has greatly improved my child's confidence in Mathematics & Science. Concepts are explained patiently and clearly.",
      isSample: true,
    },
    {
      id: "rev-sample-2",
      name: "R. Sharma",
      role: "Student (Class 10 SSC)",
      rating: 5,
      date: "Academic Term",
      comment:
        "The teachers take time to explain difficult numericals and grammar rules. The weekly revision tests helped me prepare thoroughly for my school exams.",
      isSample: true,
    },
    {
      id: "rev-sample-3",
      name: "P. Deshmukh",
      role: "Parent (Class 8 Student)",
      rating: 5,
      date: "Academic Term",
      comment:
        "Disciplined and friendly study environment with regular progress monitoring. Very satisfied with the concept-first coaching approach since 2017.",
      isSample: true,
    },
  ],

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
