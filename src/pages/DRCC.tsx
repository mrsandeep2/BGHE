import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, Search, IndianRupee, GraduationCap, MapPin, Users, CalendarDays, ArrowRight, BookOpen, X, Building2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import SEOHead from "@/components/SEOHead";

interface DrccCourse {
  id: string;
  course_name: string;
  university_id: string;
  fee_amount: number;
  loan_amount: number;
  eligibility: string;
  available_seats: number;
  intake_year: string;
  status: string;
}

interface University {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
}

const DRCC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"course" | "college">("course");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bghe.in/" },
      { "@type": "ListItem", position: 2, name: "DRCC", item: "https://bghe.in/drcc" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does BGHE help with DRCC admission support in Bihar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. BGHE helps Bihar students understand DRCC-related admission guidance, course selection, document planning, and the next steps for higher education support.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compare DRCC-eligible colleges and courses on this page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. This page allows students to review DRCC courses and colleges so they can compare study options before contacting BGHE for counseling.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do after checking DRCC options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students should compare relevant courses, review universities, and then contact BGHE for direct admission guidance and document support.",
        },
      },
    ],
  };

  const { data: drccCourses = [] } = useQuery({
    queryKey: ["drcc_courses"],
    queryFn: async () => {
      const { data } = await supabase.from("drcc_courses").select("*").eq("status", "active").order("course_name");
      return (data as DrccCourse[]) || [];
    },
  });

  const { data: universities = [] } = useQuery({
    queryKey: ["universities_drcc"],
    queryFn: async () => {
      const { data } = await supabase.from("universities").select("id, name, location, type, image").order("name");
      return (data as University[]) || [];
    },
  });

  const getUni = (id: string) => universities.find(u => u.id === id);

  // Group by course name
  const courseWise = useMemo(() => {
    const map = new Map<string, DrccCourse[]>();
    drccCourses.forEach(d => {
      const existing = map.get(d.course_name) || [];
      existing.push(d);
      map.set(d.course_name, existing);
    });
    return Array.from(map.entries()).filter(([name]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [drccCourses, searchQuery]);

  // Group by university
  const collegeWise = useMemo(() => {
    const map = new Map<string, DrccCourse[]>();
    drccCourses.forEach(d => {
      const existing = map.get(d.university_id) || [];
      existing.push(d);
      map.set(d.university_id, existing);
    });
    return Array.from(map.entries()).filter(([uniId]) => {
      const uni = getUni(uniId);
      return uni?.name.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery;
    });
  }, [drccCourses, universities, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="DRCC Admission Support | Higher Education India 2026"
        description="Get DRCC admission support for higher education India 2026. Check eligible colleges, loan limits, courses, and step-by-step guidance from BGHE."
        keywords="DRCC admission support, DRCC student credit card Bihar, higher education India 2026, university admission with DRCC"
        canonical="/drcc"
        structuredData={[breadcrumbSchema, faqSchema]}
      />
      {/* Hero */}
      <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Landmark className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Bihar Government Scheme</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              DRCC — Education Loan Scheme
            </h1>
            <p className="text-base sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto px-2">
              Get up to <span className="text-green-400 font-bold">₹4,00,000</span> education loan under the Bihar Government's DRCC scheme.
              Check which courses and colleges are eligible below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { icon: IndianRupee, label: "Loan up to", value: "₹4,00,000" },
              { icon: GraduationCap, label: "Multiple Courses", value: `${new Set(drccCourses.map(d => d.course_name)).size} Programs` },
              { icon: Building2, label: "Partner Colleges", value: `${new Set(drccCourses.map(d => d.university_id)).size} Institutions` },
              { icon: CheckCircle2, label: "Scheme Status", value: "Active" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-bold text-foreground">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          {/* Search + View Toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <div className="relative flex-1 max-w-lg w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder={viewMode === "course" ? "Search by course name..." : "Search by college name..."}
                className="pl-10 pr-10" />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Tabs value={viewMode} onValueChange={v => { setViewMode(v as "course" | "college"); setSearchQuery(""); }}>
              <TabsList className="bg-green-50 border border-green-200">
                <TabsTrigger value="course" className="data-[state=active]:bg-green-600 data-[state=active]:text-white gap-1.5">
                  <BookOpen className="w-4 h-4" />Course-wise
                </TabsTrigger>
                <TabsTrigger value="college" className="data-[state=active]:bg-green-600 data-[state=active]:text-white gap-1.5">
                  <Building2 className="w-4 h-4" />College-wise
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Course-wise View */}
          {viewMode === "course" && (
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {courseWise.map(([courseName, entries], i) => (
                  <motion.div key={courseName}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3">
                        <h3 className="text-white font-heading font-bold text-lg flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />{courseName}
                        </h3>
                        <p className="text-green-100 text-sm">Available at {entries.length} college{entries.length > 1 ? "s" : ""}</p>
                      </div>
                      <CardContent className="p-0">
                        <div className="divide-y divide-border">
                          {entries.map(entry => {
                            const uni = getUni(entry.university_id);
                            return (
                              <div key={entry.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-green-50/50 transition-colors">
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-foreground">{uni?.name || "Unknown"}</p>
                                  {uni && (
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                                      <MapPin className="w-3 h-3" />{uni.location}
                                    </p>
                                  )}
                                  {entry.eligibility && (
                                    <p className="text-xs text-muted-foreground mt-1">Eligibility: {entry.eligibility}</p>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm">
                                  <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                                    <IndianRupee className="w-3 h-3" />Fee: ₹{entry.fee_amount?.toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
                                    <IndianRupee className="w-3 h-3" />Loan: ₹{entry.loan_amount?.toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                                    <Users className="w-3 h-3" />{entry.available_seats} seats
                                  </span>
                                  <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
                                    <CalendarDays className="w-3 h-3" />{entry.intake_year}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* College-wise View */}
          {viewMode === "college" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {collegeWise.map(([uniId, entries], i) => {
                  const uni = getUni(uniId);
                  if (!uni) return null;
                  return (
                    <motion.div key={uniId}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                      <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="h-36 overflow-hidden relative">
                          <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                          <div className="absolute bottom-3 left-4 right-4">
                            <h3 className="text-white font-heading font-bold text-lg leading-tight">{uni.name}</h3>
                            <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{uni.location}</p>
                          </div>
                          <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">DRCC</span>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">
                            {entries.length} DRCC Course{entries.length > 1 ? "s" : ""} Available
                          </p>
                          <div className="space-y-2">
                            {entries.map(entry => (
                              <div key={entry.id} className="bg-green-50 rounded-lg p-3">
                                <p className="font-semibold text-sm text-foreground">{entry.course_name}</p>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                  <span className="text-[11px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                    Loan: ₹{entry.loan_amount?.toLocaleString()}
                                  </span>
                                  <span className="text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                                    {entry.available_seats} seats
                                  </span>
                                  <span className="text-[11px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                                    {entry.intake_year}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Empty state */}
          {((viewMode === "course" && courseWise.length === 0) || (viewMode === "college" && collegeWise.length === 0)) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">No DRCC courses found</p>
              <p className="text-sm text-muted-foreground/70">
                {searchQuery ? "Try a different search term" : "DRCC course listings will appear here once added by the admin"}
              </p>
              {searchQuery && (
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearchQuery("")}>Clear Search</Button>
              )}
            </motion.div>
          )}

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 font-semibold gap-2 shadow-lg shadow-green-500/25">
                Apply for DRCC Loan <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-12">
            {[
              { label: "BGHE DRCC Guide", path: "/bghe-drcc" },
              { label: "BGHE Bihar", path: "/bghe-bihar" },
              { label: "Courses", path: "/courses" },
              { label: "Contact BGHE", path: "/contact" },
            ].map((item) => (
              <Link key={item.path} to={item.path}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <h2 className="font-heading font-bold text-base text-foreground mb-2">{item.label}</h2>
                    <p className="text-sm text-muted-foreground">Open the next most relevant BGHE page for DRCC planning and Bihar admission guidance.</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DRCC;
