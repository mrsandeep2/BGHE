import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useHeroSlides, useUniversities, useCourses, useCourseCategories, useTestimonials, useBranches, useMentors, useGalleryItems } from "@/hooks/useDbData";
import SectionHeading from "@/components/SectionHeading";
import InquiryForm from "@/components/InquiryForm";
import AnimatedCounter from "@/components/AnimatedCounter";
import SEOHead, { organizationSchema, localBusinessSchema } from "@/components/SEOHead";
import { ChevronRight, GraduationCap, Users, Building2, BookOpen, ArrowRight, Quote, MapPin, Phone, Star, ChevronLeft, Search, X, ChevronDown, Clock, Facebook, Instagram, Twitter, Camera, Mail, CreditCard } from "lucide-react";
import { fuzzyFilterCourses } from "@/lib/fuzzySearch";
import { getCourseIcon, getCardColor } from "@/lib/courseIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const } }),
};

const Index = () => {
  const { data: heroSlides = [] } = useHeroSlides();
  const { data: universities = [] } = useUniversities();
  const { data: courses = [] } = useCourses();
  const { data: courseCategories = [] } = useCourseCategories();
  const { data: testimonials = [] } = useTestimonials();
  const { data: branches = [] } = useBranches();
  const { data: mentors = [] } = useMentors();
  const { data: galleryItems = [] } = useGalleryItems();
  const [hoveredMentor, setHoveredMentor] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [courseCategory, setCourseCategory] = useState("All");
  const [courseSearch, setCourseSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeStatIdx, setActiveStatIdx] = useState<number | null>(null);
  const [statTriggers, setStatTriggers] = useState([0, 0, 0, 0]);

  const filteredCourses = useMemo(() => {
    let result = courseCategory === "All" ? courses : courses.filter((c) => c.category === courseCategory);
    if (courseSearch.trim()) {
      result = fuzzyFilterCourses(result, courseSearch);
    }
    return result;
  }, [courses, courseCategory, courseSearch]);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => setTestimonialIdx((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen">
      <SEOHead
        title="DRCC Admission Center Forbesganj – Student Credit Card Bihar"
        description="BGHE Education Forbesganj – Get college admission through DRCC Student Credit Card scheme with loan up to ₹4 lakh. B.Tech, BCA, MBA, Nursing & more courses available."
        keywords="DRCC admission Forbesganj, student credit card admission Bihar, BGHE Education, private university admission Bihar, B.Tech admission through DRCC, BCA admission Bihar, MBA admission student credit card"
        canonical="/"
        structuredData={organizationSchema}
      />
      {/* HERO SLIDER */}
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] min-h-[500px] md:min-h-[600px] overflow-hidden bg-[hsl(var(--navy-dark))]">
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className={`absolute inset-0 transition-all duration-1000 ${i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213,56%,13%,0.9)] via-[hsl(213,56%,13%,0.6)] to-transparent" />
          </div>
        ))}
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none hidden md:block">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 border border-accent/10 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 -right-40 w-96 h-96 border border-accent/5 rounded-full" />
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-20 right-20 w-4 h-4 bg-accent/30 rounded-full" />
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-40 right-40 w-3 h-3 bg-accent/20 rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl px-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">BGHE Education – Forbesganj, Bihar</span>
            </motion.div>
            {heroSlides.map((slide, i) => (
              <div key={slide.id} className={`transition-all duration-700 ${i === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"}`}>
                {i === currentSlide && (
                  <>
                    <motion.h1 key={`h-${i}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-4 leading-tight">{slide.title}</motion.h1>
                    <motion.p key={`p-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-6 md:mb-8">{slide.subtitle}</motion.p>
                  </>
                )}
              </div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/contact"><Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-sm sm:text-base gap-2 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all hover:-translate-y-0.5">Get Free Counseling <ChevronRight className="w-4 h-4" /></Button></Link>
              <Link to="/universities"><Button size="lg" variant="outline" className="w-full sm:w-auto border-accent/50 text-accent hover:bg-accent/10 font-semibold text-sm sm:text-base backdrop-blur-sm">Explore Universities</Button></Link>
            </motion.div>
            <div className="flex gap-2 mt-10">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-10 bg-accent" : "w-6 bg-primary-foreground/30 hover:bg-primary-foreground/50"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR - Colored Cards with Animated Counters */}
      <section ref={statsRef} className="bg-card border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Building2, label: "Partner Universities", value: 50, suffix: "+", bg: "from-indigo-50 to-blue-100", hoverBg: "from-blue-500 to-indigo-600", iconBg: "bg-indigo-100", hoverIconBg: "bg-white/20", iconColor: "text-indigo-600", hoverIconColor: "text-white" },
              { icon: BookOpen, label: "Courses Offered", value: 200, suffix: "+", bg: "from-amber-50 to-orange-100", hoverBg: "from-orange-500 to-amber-600", iconBg: "bg-amber-100", hoverIconBg: "bg-white/20", iconColor: "text-amber-600", hoverIconColor: "text-white" },
              { icon: MapPin, label: "Branches", value: 15, suffix: "+", bg: "from-emerald-50 to-teal-100", hoverBg: "from-teal-500 to-emerald-600", iconBg: "bg-emerald-100", hoverIconBg: "bg-white/20", iconColor: "text-emerald-600", hoverIconColor: "text-white" },
              { icon: Users, label: "Students Guided", value: 10000, suffix: "+", bg: "from-rose-50 to-pink-100", hoverBg: "from-pink-500 to-rose-600", iconBg: "bg-rose-100", hoverIconBg: "bg-white/20", iconColor: "text-rose-600", hoverIconColor: "text-white" },
            ].map((item, i) => {
              const isActive = activeStatIdx === i;
              return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }}
                onHoverStart={() => { setActiveStatIdx(i); setStatTriggers(prev => { const n = [...prev]; n[i] = prev[i] + 1; return n; }); }}
                onHoverEnd={() => setActiveStatIdx(null)}
                onTouchStart={() => { setActiveStatIdx(i); setStatTriggers(prev => { const n = [...prev]; n[i] = prev[i] + 1; return n; }); }}
                className={`flex flex-col items-center gap-2 md:gap-3 rounded-2xl p-5 md:p-8 shadow-sm cursor-pointer transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${isActive ? item.hoverBg : item.bg} ${isActive ? "shadow-xl scale-105" : "hover:shadow-lg"}`}>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive ? item.hoverIconBg : item.iconBg} ${isActive ? "scale-110" : ""}`}>
                  <item.icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${isActive ? item.hoverIconColor : item.iconColor}`} />
                </div>
                <span className={`text-2xl md:text-3xl lg:text-4xl font-heading font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-foreground"}`}>
                  <AnimatedCounter end={item.value} suffix={item.suffix} triggerKey={statTriggers[i]} />
                </span>
                <span className={`text-xs md:text-sm font-medium text-center transition-colors duration-300 ${isActive ? "text-white/80" : "text-muted-foreground"}`}>{item.label}</span>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DRCC HIGHLIGHT SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-y border-emerald-200/50 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-[80px]" />
          <div className="absolute bottom-5 left-10 w-60 h-60 bg-teal-400 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-1.5 mb-4">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 text-sm font-semibold">DRCC – Bihar Government Scheme</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                "आज की सही पढ़ाई – कल का उज्ज्वल भविष्य"
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                DRCC (Student Credit Card) योजना के माध्यम से <strong className="text-emerald-700">₹4 लाख तक का लोन</strong> पाएं और अपने सपनों के कॉलेज में एडमिशन करवाएं। B.Tech, BCA, MBA, Nursing, Polytechnic और अन्य कोर्सेज उपलब्ध हैं।
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Get admission through DRCC Student Credit Card with loan up to ₹4 Lakh. Contact BGHE Education, Near T.V. Tower, Block Road, Forbesganj.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/drcc">
                  <Button className="bg-emerald-600 text-white hover:bg-emerald-700 gap-2 font-semibold shadow-lg shadow-emerald-200">
                    DRCC Courses देखें <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:7546935196">
                  <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 gap-2 font-semibold">
                    <Phone className="w-4 h-4" /> 7546935196
                  </Button>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-3">
              {[
                { label: "Loan Amount", value: "₹4 Lakh", sub: "तक का लोन", icon: CreditCard },
                { label: "Courses", value: "50+", sub: "DRCC कोर्सेज", icon: BookOpen },
                { label: "Universities", value: "30+", sub: "Partner Colleges", icon: Building2 },
                { label: "Students", value: "5000+", sub: "छात्र लाभान्वित", icon: Users },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-emerald-200/50 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="p-4 text-center">
                      <item.icon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-xl font-heading font-bold text-foreground">{item.value}</p>
                      <p className="text-xs text-emerald-600 font-medium">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.sub}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY SHOWCASE */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading title="Our Gallery" subtitle="A glimpse into our events, campus visits, and counseling sessions" />
          </motion.div>
          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {galleryItems.slice(0, 8).map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className={`relative group overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <div className={`${i === 0 ? "aspect-square" : "aspect-[4/3]"} overflow-hidden`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-primary-foreground font-semibold text-sm">{item.title}</p>
                      <p className="text-primary-foreground/70 text-xs capitalize">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Gallery coming soon!</p>
            </div>
          )}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/gallery"><Button variant="outline" className="gap-2 font-semibold group">View Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURED UNIVERSITIES - Auto-scrolling marquee */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted to-background overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading title="Our Partner Universities" subtitle="Connecting students with reputed institutions across India" />
          </motion.div>
        </div>
        {/* Marquee container */}
        <div className="relative z-10 mt-4 group/marquee">
          <div className="flex animate-marquee group-hover/marquee:[animation-play-state:paused] gap-8 w-max">
            {[...universities, ...universities].map((uni, i) => {
              const accents = [
                { border: "from-indigo-400 to-blue-500", badge: "bg-indigo-500", glow: "bg-indigo-400/20" },
                { border: "from-emerald-400 to-teal-500", badge: "bg-emerald-500", glow: "bg-emerald-400/20" },
                { border: "from-amber-400 to-orange-500", badge: "bg-amber-500", glow: "bg-amber-400/20" },
                { border: "from-rose-400 to-pink-500", badge: "bg-rose-500", glow: "bg-rose-400/20" },
              ];
              const accent = accents[i % accents.length];
              return (
              <div key={`${uni.id}-${i}`} className="w-[260px] sm:w-[300px] md:w-[320px] flex-shrink-0">
                <Card className="overflow-hidden group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative bg-card">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.border} group-hover:h-1.5 transition-all duration-300`} />
                  <div className={`absolute -top-10 -right-10 w-32 h-32 ${accent.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <div className="h-40 sm:h-48 overflow-hidden relative">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className={`absolute top-3 right-3 text-xs font-bold ${accent.badge} text-white px-3 py-1.5 rounded-full shadow-lg`}>{uni.type}</span>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-heading font-bold text-base text-white drop-shadow-lg leading-tight">{uni.name}</h3>
                      <p className="text-xs text-white/80 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {uni.location}</p>
                    </div>
                  </div>
                  <CardContent className="p-4 relative">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {uni.courses.slice(0, 3).map((c) => (
                        <span key={c} className="text-xs font-medium bg-secondary/80 text-secondary-foreground px-2.5 py-1 rounded-full">{c}</span>
                      ))}
                      {uni.courses.length > 3 && (
                        <span className="text-xs font-medium bg-accent/10 text-accent px-2.5 py-1 rounded-full">+{uni.courses.length - 3} more</span>
                      )}
                    </div>
                    <Link to="/universities" className="text-sm font-semibold text-accent hover:text-accent/80 inline-flex items-center gap-1 group/link">
                      View Details <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              );
            })}
          </div>
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-12 sm:w-24 h-full bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-12 sm:w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/universities"><Button variant="outline" className="gap-2 font-semibold group px-8 py-6 text-base">View All Universities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* POPULAR COURSES - Modern cards with search & category */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading title="Popular Courses" subtitle="Explore diverse academic programs across leading disciplines" />
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mt-2 mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input type="text" placeholder="Search courses by name, category..." value={courseSearch} onChange={(e) => setCourseSearch(e.target.value)}
              className="pl-12 pr-10 py-6 rounded-full text-base border-border focus:border-accent" />
            {courseSearch && (
              <button onClick={() => setCourseSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          {/* Category Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mb-10">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="flex items-center gap-2 min-w-max justify-center flex-wrap">
                <Button variant={courseCategory === "All" ? "default" : "outline"} size="sm"
                  onClick={() => { setCourseCategory("All"); setOpenDropdown(null); }}
                  className={`transition-all whitespace-nowrap ${courseCategory === "All" ? "bg-primary text-primary-foreground shadow-lg" : "hover:-translate-y-0.5"}`}>
                  All ({courses.length})
                </Button>
                {courseCategories.map((cat) => {
                  const catCourses = courses.filter((c) => c.category === cat);
                  const isOpen = openDropdown === cat;
                  const isActive = courseCategory === cat;
                  return (
                    <div key={cat} className="relative">
                      <Button variant={isActive ? "default" : "outline"} size="sm"
                        onClick={() => { setCourseCategory(cat); setOpenDropdown(isOpen ? null : cat); }}
                        className={`transition-all flex items-center gap-1 whitespace-nowrap ${isActive ? "bg-primary text-primary-foreground shadow-lg" : "hover:-translate-y-0.5"}`}>
                        {cat} ({catCourses.length})
                        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </Button>
                      <AnimatePresence>
                        {isOpen && catCourses.length > 0 && (
                          <motion.div initial={{ opacity: 0, y: -5, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-2 left-0 z-30 bg-card border border-border rounded-lg shadow-xl min-w-[260px] py-2">
                            <div className="px-4 py-2 border-b border-border">
                              <span className="text-xs font-bold text-accent uppercase tracking-wider">{cat} Courses</span>
                            </div>
                            {catCourses.map((course) => (
                              <div key={course.id}
                                className="px-4 py-2.5 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer flex items-center justify-between group/item"
                                onClick={() => { setCourseSearch(course.name); setOpenDropdown(null); }}>
                                <span className="font-medium group-hover/item:translate-x-1 transition-transform">{course.name}</span>
                                <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {openDropdown && <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />}

          {courseSearch && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> result{filteredCourses.length !== 1 ? "s" : ""} for "{courseSearch}"</span>
              <button onClick={() => setCourseSearch("")} className="text-xs text-accent hover:underline">Clear</button>
            </motion.div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="wait">
              {filteredCourses.slice(0, 6).map((course, i) => {
                const color = getCardColor(i);
                const Icon = getCourseIcon(course.icon || "BookOpen");
                return (
                <motion.div key={course.id} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}>
                  <Card className={`h-full group border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden bg-gradient-to-br ${color.bg} hover:bg-gradient-to-br ${color.hover}`}>
                    <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${color.stripe} group-hover:w-2 transition-all duration-300`} />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all duration-700" />
                    <CardContent className="p-6 pl-8 relative flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color.iconBg} flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <Icon className={`w-8 h-8 ${color.icon} drop-shadow-sm`} />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-foreground/70">{course.category}</span>
                        <span className="text-xs bg-white/60 backdrop-blur-sm px-2 py-1 rounded-full text-foreground/60">{course.duration}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{course.name}</h3>
                      <p className="text-sm text-foreground/60 mb-4">{course.description}</p>
                      <Link to="/contact" className="text-sm font-semibold text-foreground/80 hover:text-foreground inline-flex items-center gap-1 group/link bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/70 transition-all">
                        Inquire Now <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredCourses.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No courses found</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => { setCourseSearch(""); setCourseCategory("All"); }}>Show All</Button>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/courses"><Button variant="outline" className="gap-2 font-semibold group">Browse All Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-2 block">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Meet Our <span className="text-accent">Mentors</span>
              </h2>
              <div className="flex items-center justify-center gap-1">
                <div className="w-10 h-1 rounded-full bg-amber-500" />
                <div className="w-5 h-1 rounded-full bg-emerald-600" />
              </div>
            </div>
          </motion.div>

          {/* Horizontal auto-scrolling marquee */}
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: mentors.length > 0 ? mentors.length * 5 : 20, ease: "linear" } }}
            >
              {[...mentors, ...mentors].map((mentor, i) => {
                const initials = mentor.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                const isHovered = hoveredMentor === mentor.id;
                const gradients = [
                  "from-blue-50 via-amber-50/40 to-rose-50",
                  "from-emerald-50 via-sky-50/40 to-purple-50",
                  "from-amber-50 via-rose-50/40 to-blue-50",
                  "from-purple-50 via-emerald-50/40 to-amber-50",
                ];
                return (
                  <div key={`${mentor.id}-${i}`}
                    onMouseEnter={() => setHoveredMentor(mentor.id)}
                    onMouseLeave={() => setHoveredMentor(null)}
                    onTouchStart={() => setHoveredMentor(isHovered ? null : mentor.id)}
                    className="cursor-pointer flex-shrink-0 w-56 md:w-64"
                  >
                    <Card className={`overflow-hidden h-full border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${gradients[i % 4]}`}>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-muted/60 border-2 border-border/50 flex items-center justify-center mb-5 overflow-hidden">
                          {mentor.image && !mentor.image.includes("placeholder") ? (
                            <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover object-top" />
                          ) : (
                            <span className="text-2xl md:text-3xl font-heading font-bold text-primary/70">{initials}</span>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-base md:text-lg text-foreground mb-1">{mentor.name}</h3>
                        <p className="text-sm text-accent flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {mentor.designation}
                        </p>
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: 10, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-3 mt-4"
                            >
                              {[
                                { icon: Facebook, color: "text-blue-600 hover:bg-blue-50", url: (mentor as any).facebook_url },
                                { icon: Instagram, color: "text-pink-500 hover:bg-pink-50", url: (mentor as any).instagram_url },
                                { icon: Twitter, color: "text-sky-500 hover:bg-sky-50", url: (mentor as any).twitter_url },
                              ].filter(s => s.url).map((social, si) => (
                                <motion.a key={si} href={social.url} target="_blank" rel="noopener noreferrer"
                                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: si * 0.08, type: "spring" }}
                                  className={`w-9 h-9 rounded-full border border-border/60 bg-card flex items-center justify-center ${social.color} transition-all duration-200 shadow-sm hover:shadow-md`}
                                >
                                  <social.icon className="w-4 h-4" />
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/team"><Button variant="outline" className="gap-2 font-semibold group">View All Mentors <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* BRANCHES OVERVIEW - Dynamic from database */}
      <section className="py-16 md:py-24 overflow-hidden relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading title="Our Branches" subtitle="Find a Bharat Group office near you" />
          </motion.div>
          {branches.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {branches.map((b, i) => {
                const cardColors = [
                  "from-blue-100 via-blue-50 to-indigo-100 hover:from-blue-200 hover:to-indigo-200",
                  "from-emerald-100 via-green-50 to-teal-100 hover:from-emerald-200 hover:to-teal-200",
                  "from-amber-100 via-yellow-50 to-orange-100 hover:from-amber-200 hover:to-orange-200",
                  "from-rose-100 via-pink-50 to-red-100 hover:from-rose-200 hover:to-red-200",
                  "from-violet-100 via-purple-50 to-indigo-100 hover:from-violet-200 hover:to-indigo-200",
                ];
                const iconColors = ["from-amber-400 to-orange-500", "from-emerald-400 to-teal-500", "from-blue-400 to-indigo-500", "from-rose-400 to-pink-500", "from-violet-400 to-purple-500"];
                return (
                  <motion.div key={b.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <Link to="/branches">
                      <Card className={`group cursor-pointer h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center overflow-hidden bg-gradient-to-br ${cardColors[i % 5]}`}>
                        <CardContent className="p-6">
                          <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring" }}
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${iconColors[i % 5]} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                            <MapPin className="w-7 h-7 text-white" />
                          </motion.div>
                          <h3 className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors text-lg">{b.city}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{b.state}</p>
                          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-accent">
                            <Phone className="w-3 h-3" />
                            <span>{b.phone}</span>
                          </div>
                          <motion.div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs text-muted-foreground flex items-center justify-center gap-1">View Details <ArrowRight className="w-3 h-3" /></span>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Branches coming soon!</p>
            </div>
          )}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/branches"><Button variant="outline" className="gap-2 font-semibold group">View All Branches <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
          </motion.div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-navy-gradient overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -left-40 w-96 h-96 border border-primary-foreground/5 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -bottom-40 -right-40 w-[500px] h-[500px] border border-primary-foreground/5 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading title="What Students Say" subtitle="Hear from students who found their path with our guidance" light />
          </motion.div>
          
          {/* Carousel */}
          <div className="max-w-3xl mx-auto relative">
            <div className="overflow-hidden">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: i === testimonialIdx ? 1 : 0, x: i === testimonialIdx ? 0 : -100 }}
                  transition={{ duration: 0.5 }}
                  className={i === testimonialIdx ? "" : "absolute inset-0"}
                >
                  {i === testimonialIdx && (
                    <Card className="bg-primary-foreground/5 border-primary-foreground/10 backdrop-blur-md">
                      <CardContent className="p-6 md:p-8 lg:p-10 text-center">
                        <Quote className="w-12 h-12 text-accent mx-auto mb-6 opacity-40" />
                        <p className="text-primary-foreground/90 text-base md:text-lg lg:text-xl mb-6 italic leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center justify-center gap-1 mb-3">
                          {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 text-accent fill-accent" />)}
                        </div>
                        <p className="font-heading font-semibold text-primary-foreground text-lg">{t.name}</p>
                        <p className="text-sm text-primary-foreground/60">{t.course} — {t.university}</p>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIdx ? "w-8 bg-accent" : "w-2 bg-primary-foreground/30"}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM - Compact */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading title="Begin Your Journey" subtitle="Fill in your details and our academic counselors will guide you toward the right course and university." />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Card className="shadow-2xl border-none bg-card/80 backdrop-blur-sm overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />
                <CardContent className="p-5 sm:p-6">
                  <InquiryForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
