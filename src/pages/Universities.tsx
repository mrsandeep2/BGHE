import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUniversities } from "@/hooks/useDbData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin, ArrowRight, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const types = ["All", "Public", "Private"];

const Universities = () => {
  const { data: universities = [] } = useUniversities();
  const { data: drccUniIds = [] } = useQuery({
    queryKey: ["drcc_uni_ids"],
    queryFn: async () => {
      const { data } = await supabase.from("drcc_courses").select("university_id").eq("status", "active");
      return [...new Set((data || []).map(d => d.university_id))];
    },
  });
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? universities : universities.filter((u) => u.type === filter);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Top Universities in India | College Admission 2026"
        description="Explore partner public and private universities for college admission 2026 in India. Find locations, programs, and DRCC-enabled institutions with BGHE."
        keywords="top universities in India, university admission India 2026, private and public universities India, higher education India"
        canonical="/universities"
      />
      <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-accent" /><span className="text-accent text-sm font-medium">Partner Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">University Collaboration</h1>
            <p className="text-base sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto px-2">Explore our network of reputed institutions offering quality education.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex justify-center gap-3 mb-12">
            {types.map((t) => (
              <Button key={t} variant={filter === t ? "default" : "outline"} onClick={() => setFilter(t)}
                className={`transition-all ${filter === t ? "bg-primary text-primary-foreground shadow-lg" : "hover:-translate-y-0.5"}`}>{t}</Button>
            ))}
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((uni, i) => (
                <motion.div key={uni.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Card className="overflow-hidden group h-full border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="h-48 overflow-hidden relative">
                      <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 right-3 text-xs font-bold bg-accent text-accent-foreground px-3 py-1 rounded-full shadow-lg">{uni.type}</span>
                      {drccUniIds.includes(uni.id) && (
                        <Link to="/drcc" className="absolute top-3 left-3 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg hover:bg-green-600 transition-colors">
                          <Landmark className="w-3 h-3" />DRCC
                        </Link>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-lg mt-1 mb-1 text-foreground group-hover:text-accent transition-colors">{uni.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3"><MapPin className="w-3 h-3" /> {uni.location}</div>
                      <p className="text-sm text-muted-foreground mb-3">{uni.description}</p>
                      <div className="flex flex-wrap gap-1">{uni.courses.map((c) => (<span key={c} className="text-xs bg-secondary px-2 py-0.5 rounded-full">{c}</span>))}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/contact"><Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all">Inquire About Admissions <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Universities;
