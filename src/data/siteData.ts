// ============================================================
// CENTRALIZED DATA FILE — Easy to replace with API calls later
// ============================================================

export interface Branch {
  id: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  type: string;
  courses: string[];
  image: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  duration: string;
  description: string;
  icon: string;
}

export interface Mentor {
  id: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "events" | "campus" | "seminars" | "counseling";
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  university: string;
  quote: string;
}

// --- BRANCHES ---
export const branches: Branch[] = [
  {
    id: "forbesganj",
    city: "Forbesganj",
    state: "Bihar",
    address: "Near T.V. Tower, Block Road, Forbesganj, Bihar",
    phone: "7546935196",
    email: "bgheofficial@zohomail.in",
  },
];

// --- UNIVERSITIES ---
export const universities: University[] = [
  {
    id: "u1",
    name: "Delhi Technical University",
    location: "New Delhi",
    type: "Public",
    courses: ["B.Tech", "M.Tech", "MBA"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
    description: "A premier institution offering world-class technical and management education.",
  },
  {
    id: "u2",
    name: "Mumbai Institute of Management",
    location: "Mumbai",
    type: "Private",
    courses: ["MBA", "BBA", "PGDM"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
    description: "Recognized for excellence in business education and industry partnerships.",
  },
  {
    id: "u3",
    name: "Bangalore Medical College",
    location: "Bangalore",
    type: "Public",
    courses: ["MBBS", "BDS", "B.Pharm"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop",
    description: "Leading medical institution with state-of-the-art research facilities.",
  },
  {
    id: "u4",
    name: "National Law University",
    location: "Kolkata",
    type: "Public",
    courses: ["BA LLB", "LLM"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
    description: "One of India's top-ranked law schools producing distinguished legal professionals.",
  },
  {
    id: "u5",
    name: "Hyderabad School of Arts",
    location: "Hyderabad",
    type: "Private",
    courses: ["BFA", "MFA", "B.Des"],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop",
    description: "A creative hub fostering innovation in visual arts, design, and media.",
  },
  {
    id: "u6",
    name: "Central University of Sciences",
    location: "New Delhi",
    type: "Public",
    courses: ["B.Sc", "M.Sc", "Ph.D"],
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&h=400&fit=crop",
    description: "Dedicated to advancing scientific research and academic excellence.",
  },
  {
    id: "u7",
    name: "Western Institute of Technology",
    location: "Pune",
    type: "Private",
    courses: ["B.Tech", "MCA", "M.Tech"],
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=600&h=400&fit=crop",
    description: "Known for cutting-edge engineering programs and campus placements.",
  },
  {
    id: "u8",
    name: "Southern Commerce Academy",
    location: "Chennai",
    type: "Private",
    courses: ["B.Com", "M.Com", "CA Foundation"],
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&h=400&fit=crop",
    description: "Specializing in commerce and finance education with industry-relevant curriculum.",
  },
];

// --- COURSES ---
export const courseCategories = ["Engineering", "Medical", "Management", "Law", "Arts & Design", "Science", "Commerce", "Education", "Agriculture", "Pharmacy"];

export const courses: Course[] = [
  { id: "c1", name: "B.Tech (Computer Science)", category: "Engineering", duration: "4 Years", description: "Comprehensive program covering software engineering, data structures, and emerging technologies.", icon: "Monitor" },
  { id: "c2", name: "B.Tech (Mechanical)", category: "Engineering", duration: "4 Years", description: "Study of mechanics, thermodynamics, and manufacturing with hands-on lab experience.", icon: "Cog" },
  { id: "c3", name: "B.Tech (Civil)", category: "Engineering", duration: "4 Years", description: "Learn structural design, construction management, and environmental engineering.", icon: "Building" },
  { id: "c4", name: "B.Tech (Electrical)", category: "Engineering", duration: "4 Years", description: "Study power systems, electronics, and electrical machine design.", icon: "Zap" },
  { id: "c5", name: "B.Tech (Electronics & Communication)", category: "Engineering", duration: "4 Years", description: "Focus on communication systems, VLSI design, and embedded systems.", icon: "Radio" },
  { id: "c6", name: "M.Tech", category: "Engineering", duration: "2 Years", description: "Advanced postgraduate engineering program with specialization options.", icon: "GraduationCap" },
  { id: "c7", name: "MBBS", category: "Medical", duration: "5.5 Years", description: "Professional medical degree covering clinical practice, anatomy, and patient care.", icon: "Heart" },
  { id: "c8", name: "BDS", category: "Medical", duration: "5 Years", description: "Bachelor of Dental Surgery with clinical training and patient management.", icon: "Smile" },
  { id: "c9", name: "BAMS (Ayurveda)", category: "Medical", duration: "5.5 Years", description: "Study traditional Ayurvedic medicine combined with modern medical practices.", icon: "Leaf" },
  { id: "c10", name: "BHMS (Homeopathy)", category: "Medical", duration: "5.5 Years", description: "Bachelor of Homeopathic Medicine and Surgery program.", icon: "Droplet" },
  { id: "c11", name: "B.Sc Nursing", category: "Medical", duration: "4 Years", description: "Professional nursing program with hospital clinical training.", icon: "Stethoscope" },
  { id: "c12", name: "MBA", category: "Management", duration: "2 Years", description: "Develop leadership and strategic thinking skills for modern business environments.", icon: "Briefcase" },
  { id: "c13", name: "BBA", category: "Management", duration: "3 Years", description: "Foundation in business administration, marketing, and organizational behavior.", icon: "TrendingUp" },
  { id: "c14", name: "PGDM", category: "Management", duration: "2 Years", description: "Post Graduate Diploma in Management with industry-focused curriculum.", icon: "BarChart" },
  { id: "c15", name: "BA LLB (Hons)", category: "Law", duration: "5 Years", description: "Integrated law program combining arts education with comprehensive legal training.", icon: "Scale" },
  { id: "c16", name: "LLB", category: "Law", duration: "3 Years", description: "Professional law degree focusing on legal practice and jurisprudence.", icon: "Gavel" },
  { id: "c17", name: "LLM", category: "Law", duration: "2 Years", description: "Master of Laws with specialization in corporate, criminal, or constitutional law.", icon: "BookOpen" },
  { id: "c18", name: "B.Des (Graphic Design)", category: "Arts & Design", duration: "4 Years", description: "Creative program in visual communication, branding, and digital media design.", icon: "Palette" },
  { id: "c19", name: "BFA (Fine Arts)", category: "Arts & Design", duration: "4 Years", description: "Study painting, sculpture, and visual arts with exhibition opportunities.", icon: "PenTool" },
  { id: "c20", name: "BA (Mass Communication)", category: "Arts & Design", duration: "3 Years", description: "Journalism, advertising, and media production training.", icon: "Tv" },
  { id: "c21", name: "B.Sc (Physics)", category: "Science", duration: "3 Years", description: "In-depth study of classical and modern physics with research opportunities.", icon: "Atom" },
  { id: "c22", name: "B.Sc (Chemistry)", category: "Science", duration: "3 Years", description: "Study organic, inorganic, and physical chemistry with lab practice.", icon: "FlaskConical" },
  { id: "c23", name: "B.Sc (Mathematics)", category: "Science", duration: "3 Years", description: "Pure and applied mathematics with computational methods.", icon: "Calculator" },
  { id: "c24", name: "M.Sc", category: "Science", duration: "2 Years", description: "Advanced postgraduate science program with research focus.", icon: "Microscope" },
  { id: "c25", name: "B.Com (Hons)", category: "Commerce", duration: "3 Years", description: "Advanced commerce program covering accounting, finance, and economics.", icon: "IndianRupee" },
  { id: "c26", name: "M.Com", category: "Commerce", duration: "2 Years", description: "Master of Commerce with specialization in accounting or business.", icon: "Wallet" },
  { id: "c27", name: "CA Foundation", category: "Commerce", duration: "4 Years", description: "Foundation course for Chartered Accountancy career path.", icon: "FileSpreadsheet" },
  { id: "c28", name: "B.Ed", category: "Education", duration: "2 Years", description: "Bachelor of Education for aspiring school teachers and educators.", icon: "GraduationCap" },
  { id: "c29", name: "D.El.Ed", category: "Education", duration: "2 Years", description: "Diploma in Elementary Education for primary school teaching.", icon: "School" },
  { id: "c30", name: "M.Ed", category: "Education", duration: "2 Years", description: "Master of Education with curriculum design and educational leadership.", icon: "BookMarked" },
  { id: "c31", name: "B.Sc Agriculture", category: "Agriculture", duration: "4 Years", description: "Study crop science, soil management, and modern farming techniques.", icon: "Sprout" },
  { id: "c32", name: "B.Sc Horticulture", category: "Agriculture", duration: "4 Years", description: "Focus on fruit, vegetable, and ornamental plant cultivation.", icon: "Flower2" },
  { id: "c33", name: "B.Pharm", category: "Pharmacy", duration: "4 Years", description: "Study of pharmaceutical sciences, drug development, and healthcare systems.", icon: "Pill" },
  { id: "c34", name: "D.Pharm", category: "Pharmacy", duration: "2 Years", description: "Diploma in Pharmacy for dispensing and compounding medications.", icon: "Syringe" },
  { id: "c35", name: "M.Pharm", category: "Pharmacy", duration: "2 Years", description: "Master of Pharmacy with research and advanced pharmaceutical studies.", icon: "TestTube" },
];

// --- MENTORS ---
export const mentors: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Rajesh Sharma",
    designation: "Chief Academic Advisor",
    bio: "With over 20 years of experience in higher education consulting, Dr. Sharma guides students toward informed academic decisions.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "m2",
    name: "Prof. Anita Desai",
    designation: "Senior Education Counselor",
    bio: "A dedicated counselor specializing in management and commerce admissions across leading Indian universities.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "m3",
    name: "Mr. Vikram Patel",
    designation: "Engineering Admissions Head",
    bio: "Expert in technical education pathways with deep knowledge of engineering admission processes nationwide.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "m4",
    name: "Dr. Priya Menon",
    designation: "Medical Admissions Specialist",
    bio: "Specializes in medical and healthcare education guidance, helping students navigate complex admission criteria.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "m5",
    name: "Mr. Arjun Reddy",
    designation: "Student Relations Manager",
    bio: "Focuses on building strong student relationships and ensuring smooth admission experiences across all branches.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: "m6",
    name: "Ms. Kavita Iyer",
    designation: "Career Guidance Counselor",
    bio: "Passionate about helping students align their academic choices with long-term career aspirations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
];

// --- GALLERY ---
export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Annual Education Summit 2024", category: "events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop" },
  { id: "g2", title: "University Campus Tour", category: "campus", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop" },
  { id: "g3", title: "Career Guidance Seminar", category: "seminars", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop" },
  { id: "g4", title: "One-on-One Counseling", category: "counseling", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop" },
  { id: "g5", title: "Student Orientation Program", category: "events", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop" },
  { id: "g6", title: "Partner University Visit", category: "campus", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop" },
  { id: "g7", title: "Admission Workshop", category: "seminars", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop" },
  { id: "g8", title: "Group Counseling Session", category: "counseling", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" },
  { id: "g9", title: "Education Fair", category: "events", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop" },
  { id: "g10", title: "Modern Library Facilities", category: "campus", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop" },
  { id: "g11", title: "Expert Panel Discussion", category: "seminars", image: "https://images.unsplash.com/photo-1591115765373-5f9cf1da241c?w=600&h=400&fit=crop" },
  { id: "g12", title: "Student Mentorship Program", category: "counseling", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" },
];

// --- TESTIMONIALS ---
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aditya Kumar",
    course: "B.Tech (CS)",
    university: "Delhi Technical University",
    quote: "The guidance I received from BGHE Education made my admission journey smooth and stress-free. Their counselors truly understood my aspirations.",
  },
  {
    id: "t2",
    name: "Sneha Patel",
    course: "MBA",
    university: "Mumbai Institute of Management",
    quote: "I was confused about choosing the right university. The team helped me evaluate my options and make an informed decision.",
  },
  {
    id: "t3",
    name: "Rahul Verma",
    course: "MBBS",
    university: "Bangalore Medical College",
    quote: "Professional, transparent, and genuinely supportive throughout the entire admission process. Highly recommended.",
  },
  {
    id: "t4",
    name: "Priyanka Singh",
    course: "BA LLB",
    university: "National Law University",
    quote: "The personalized counseling sessions helped me identify the best law program suited to my career goals.",
  },
];

// --- HERO SLIDES ---
export const heroSlides: { id: number; title: string; subtitle: string; image: string }[] = [];

// --- NAV LINKS ---
export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "University Collaboration", path: "/universities" },
  { label: "DRCC Scheme", path: "/drcc" },
  { label: "Our Mentors", path: "/team" },
  { label: "Branches", path: "/branches" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];
