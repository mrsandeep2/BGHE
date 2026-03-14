import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ArrowRight, Clock, ChevronDown, Search, X, FileText, Landmark, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/SectionHeading";
import SEOHead from "@/components/SEOHead";
import { fuzzyFilterCourses } from "@/lib/fuzzySearch";
import { getCourseIcon, getCardColor } from "@/lib/courseIcons";

interface CourseRow {
  id: string;
  name: string;
  category: string;
  category_id: string | null;
  duration: string;
  description: string;
  icon: string;
  scheme_type: string;
  brochure_pdf: string | null;
  status: string;
}

interface CategoryRow {
  id: string;
  name: string;
}

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [schemeFilter, setSchemeFilter] = useState<"all" | "DRCC" | "NON_DRCC">("all");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const touchedRef = useRef(false);

  const { data: courses = [] } = useQuery({
    queryKey: ["courses_full"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").eq("status", "active").order("category");
      return (data as CourseRow[]) || [];
    },
  });

  const { data: dbCategories = [] } = useQuery({
    queryKey: ["course_categories_list"],
    queryFn: async () => {
      const { data } = await supabase.from("course_categories").select("id, name").eq("status", "active").order("name");
      return (data as CategoryRow[]) || [];
    },
  });

  // Derive unique categories from courses
  const courseCategories = useMemo(() => {
    const cats = [...new Set(courses.map(c => c.category))];
    return cats.sort();
  }, [courses]);

  const handleButtonClick = useCallback((cat: string) => {
    if (touchedRef.current) { touchedRef.current = false; return; }
    setActiveCategory(cat);
    setOpenDropdown(prev => (prev === cat ? null : cat));
  }, []);

  const handleTouchStart = useCallback((cat: string, isOpen: boolean) => {
    touchedRef.current = true;
    if (isOpen) { setOpenDropdown(null); } else { setOpenDropdown(cat); setActiveCategory(cat); }
  }, []);

  const filtered = useMemo(() => {
    let result = courses;
    // Scheme filter
    if (schemeFilter !== "all") result = result.filter(c => c.scheme_type === schemeFilter);
    // Category filter
    if (activeCategory !== "All") result = result.filter(c => c.category === activeCategory);
    // Search
    if (searchQuery.trim()) result = fuzzyFilterCourses(result, searchQuery);
    return result;
  }, [courses, activeCategory, schemeFilter, searchQuery]);

  const drccCount = courses.filter(c => c.scheme_type === "DRCC").length;
  const nonDrccCount = courses.filter(c => c.scheme_type === "NON_DRCC").length;
  const getCourseCountForCategory = (cat: string) => courses.filter(c => c.category === cat && (schemeFilter === "all" || c.scheme_type === schemeFilter)).length;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="College Admission 2026 Courses | Higher Education India"
        description="Browse UG and PG courses for college admission 2026 in India. Compare durations, specializations, and DRCC-supported programs with BGHE guidance."
        keywords="college admission 2026 courses, UG PG admission India, higher education India courses, distance education universities India, DRCC courses"
        canonical="/courses"
      />
      <h1 className="sr-only">College Admission 2026 Courses in Higher Education India</h1>
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="Popular Courses" subtitle="Explore diverse academic programs across leading disciplines" />

          {/* Scheme Tabs */}
          <div className="flex justify-center mt-4 mb-6">
            <Tabs value={schemeFilter} onValueChange={v => { setSchemeFilter(v as any); setActiveCategory("All"); }}>
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5">
                  All ({courses.length})
                </TabsTrigger>
                <TabsTrigger value="DRCC" className="data-[state=active]:bg-green-600 data-[state=active]:text-white gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />DRCC ({drccCount})
                </TabsTrigger>
                <TabsTrigger value="NON_DRCC" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-1.5">
                  Non-DRCC ({nonDrccCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-10 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-400/40 via-emerald-400/40 to-blue-400/40 rounded-2xl blur-xl opacity-80 transition-opacity duration-500" />
            <div className="relative flex items-center bg-gradient-to-r from-blue-50 via-emerald-50/60 to-blue-50 border-2 border-blue-200 rounded-2xl shadow-lg shadow-blue-200/30 group-focus-within:border-emerald-400 group-focus-within:shadow-xl transition-all duration-300">
              <div className="ml-4 p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-md">
                <Search className="w-5 h-5 text-white" />
              </div>
              <Input type="text" placeholder="Search courses by name, category..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent pl-4 pr-12 py-7 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 font-medium" />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="flex items-center gap-2.5 min-w-max justify-center flex-wrap">
                <Button variant={activeCategory === "All" ? "default" : "outline"} size="sm"
                  onClick={() => { setActiveCategory("All"); setOpenDropdown(null); }}
                  className={`transition-all whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold ${activeCategory === "All" ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg shadow-blue-500/30 scale-105 border-0" : "border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 hover:from-blue-100 hover:to-emerald-100 hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-md"}`}>
                  All ({schemeFilter === "all" ? courses.length : filtered.length})
                </Button>
                {courseCategories.map((cat, catIdx) => {
                  const catCourses = courses.filter(c => c.category === cat && (schemeFilter === "all" || c.scheme_type === schemeFilter));
                  const isOpen = openDropdown === cat;
                  const isActive = activeCategory === cat;
                  const colors = [
                    { bg: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300", active: "from-blue-600 to-blue-500 shadow-blue-500/30" },
                    { bg: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300", active: "from-emerald-600 to-emerald-500 shadow-emerald-500/30" },
                    { bg: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300", active: "from-purple-600 to-purple-500 shadow-purple-500/30" },
                    { bg: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300", active: "from-amber-600 to-amber-500 shadow-amber-500/30" },
                    { bg: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:border-rose-300", active: "from-rose-600 to-rose-500 shadow-rose-500/30" },
                    { bg: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300", active: "from-cyan-600 to-cyan-500 shadow-cyan-500/30" },
                  ];
                  const color = colors[catIdx % colors.length];
                  if (catCourses.length === 0) return null;
                  return (
                    <div key={cat} className="relative" onMouseEnter={() => setOpenDropdown(cat)} onMouseLeave={() => setOpenDropdown(null)}
                      onTouchStart={() => handleTouchStart(cat, isOpen)}>
                      <Button variant="outline" size="sm" onClick={() => handleButtonClick(cat)}
                        className={`transition-all flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold border-2 hover:-translate-y-0.5 hover:shadow-md ${isActive ? `bg-gradient-to-r ${color.active} text-white border-transparent shadow-lg scale-105` : color.bg}`}>
                        {cat} ({getCourseCountForCategory(cat)})
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </Button>
                      <AnimatePresence>
                        {isOpen && catCourses.length > 0 && (
                          <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full mt-1 left-1/2 -translate-x-1/2 z-30 bg-card border-2 border-primary/15 rounded-2xl shadow-2xl min-w-[280px] overflow-hidden">
                            <div className="absolute -top-2 left-0 right-0 h-2" />
                            <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/10">
                              <span className="text-xs font-bold text-primary uppercase tracking-widest">{cat} Courses</span>
                            </div>
                            {catCourses.map(course => (
                              <div key={course.id}
                                className="px-4 py-3.5 text-sm text-foreground/80 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary transition-all cursor-pointer flex items-center justify-between group/item border-b border-border/30 last:border-0"
                                onClick={() => { setSearchQuery(course.name); setOpenDropdown(null); }}>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold group-hover/item:translate-x-1.5 transition-transform duration-200">{course.name}</span>
                                  {course.scheme_type === "DRCC" && (
                                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">DRCC</span>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground ml-3 flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                                  <Clock className="w-3 h-3" />{course.duration}
                                </span>
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

          {searchQuery && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""} for "{searchQuery}"
              </span>
              <button onClick={() => setSearchQuery("")} className="text-xs text-accent hover:underline">Clear</button>
            </motion.div>
          )}

          {/* Course Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((course, i) => {
                const color = getCardColor(i);
                const Icon = getCourseIcon(course.icon || "BookOpen");
                return (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                    <Card className={`h-full group border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden bg-gradient-to-br ${color.bg} hover:bg-gradient-to-br ${color.hover}`}>
                      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${color.stripe} group-hover:w-2 transition-all duration-300`} />
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all duration-700" />
                      <CardContent className="p-6 pl-8 relative flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color.iconBg} flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                          <Icon className={`w-8 h-8 ${color.icon} drop-shadow-sm`} />
                        </div>
                        <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
                          <span className="text-xs font-bold uppercase tracking-wider bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-foreground/70">{course.category}</span>
                          <span className="text-xs bg-white/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-foreground/60"><Clock className="w-3 h-3" /> {course.duration}</span>
                          {course.scheme_type === "DRCC" && (
                            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                              <Landmark className="w-3 h-3" />DRCC
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-foreground transition-colors duration-300">{course.name}</h3>
                        <p className="text-sm text-foreground/60 mb-4 leading-relaxed">{course.description}</p>
                        <div className="flex items-center gap-3">
                          {course.brochure_pdf && (
                            <a href={course.brochure_pdf} target="_blank" rel="noopener noreferrer"
                              className="text-sm font-semibold text-foreground/70 hover:text-foreground inline-flex items-center gap-1 bg-white/50 px-3 py-2 rounded-full backdrop-blur-sm hover:bg-white/70 transition-all">
                              <Download className="w-3 h-3" /> Brochure
                            </a>
                          )}
                          <Link to="/contact" className="text-sm font-semibold text-foreground/80 hover:text-foreground inline-flex items-center gap-1 group/link bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/70 transition-all">
                            Inquire Now <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">No courses found</p>
              <p className="text-sm text-muted-foreground/70">Try a different search term or category</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSearchQuery(""); setActiveCategory("All"); setSchemeFilter("all"); }}>
                Show All Courses
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
