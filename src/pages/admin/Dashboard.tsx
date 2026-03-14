import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, GraduationCap, BookOpen, Users, Image, Building2, TrendingUp, Activity, Landmark, FolderOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { role } = useAuth();
  const [counts, setCounts] = useState({
    inquiries: 0, universities: 0, courses: 0, mentors: 0, gallery: 0, branches: 0,
    categories: 0, drccCourses: 0, nonDrccCourses: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [inq, uni, crs, mnt, gal, br, cats, drcc, nonDrcc] = await Promise.all([
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("universities").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("mentors").select("id", { count: "exact", head: true }),
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
        supabase.from("branches").select("id", { count: "exact", head: true }),
        supabase.from("course_categories").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }).eq("scheme_type", "DRCC"),
        supabase.from("courses").select("id", { count: "exact", head: true }).eq("scheme_type", "NON_DRCC"),
      ]);
      setCounts({
        inquiries: inq.count ?? 0, universities: uni.count ?? 0, courses: crs.count ?? 0,
        mentors: mnt.count ?? 0, gallery: gal.count ?? 0, branches: br.count ?? 0,
        categories: cats.count ?? 0, drccCourses: drcc.count ?? 0, nonDrccCourses: nonDrcc.count ?? 0,
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: "Inquiries", value: counts.inquiries, icon: MessageSquare, gradient: "from-blue-500 to-blue-700", bg: "bg-blue-500/10", iconBg: "bg-blue-500/20", text: "text-blue-400" },
    { label: "Universities", value: counts.universities, icon: GraduationCap, gradient: "from-amber-500 to-orange-600", bg: "bg-amber-500/10", iconBg: "bg-amber-500/20", text: "text-amber-400" },
    { label: "Categories", value: counts.categories, icon: FolderOpen, gradient: "from-fuchsia-500 to-violet-600", bg: "bg-fuchsia-500/10", iconBg: "bg-fuchsia-500/20", text: "text-fuchsia-400" },
    { label: "Total Courses", value: counts.courses, icon: BookOpen, gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-500/10", iconBg: "bg-emerald-500/20", text: "text-emerald-400" },
    { label: "DRCC Courses", value: counts.drccCourses, icon: Landmark, gradient: "from-green-500 to-emerald-600", bg: "bg-green-500/10", iconBg: "bg-green-500/20", text: "text-green-400" },
    { label: "Non-DRCC Courses", value: counts.nonDrccCourses, icon: BookOpen, gradient: "from-sky-500 to-blue-600", bg: "bg-sky-500/10", iconBg: "bg-sky-500/20", text: "text-sky-400" },
    { label: "Team Members", value: counts.mentors, icon: Users, gradient: "from-purple-500 to-violet-600", bg: "bg-purple-500/10", iconBg: "bg-purple-500/20", text: "text-purple-400" },
    { label: "Gallery Items", value: counts.gallery, icon: Image, gradient: "from-pink-500 to-rose-600", bg: "bg-pink-500/10", iconBg: "bg-pink-500/20", text: "text-pink-400" },
    { label: "Branches", value: counts.branches, icon: Building2, gradient: "from-orange-500 to-red-500", bg: "bg-orange-500/10", iconBg: "bg-orange-500/20", text: "text-orange-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[hsl(var(--navy-dark))] via-[hsl(var(--navy))] to-[hsl(var(--navy-light))] p-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[hsl(var(--gold))] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[hsl(var(--gold))]/20">
              <Activity className="w-6 h-6 text-[hsl(var(--gold))]" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">Dashboard</h1>
          </div>
          <p className="text-white/70 ml-14">
            Welcome to the admin panel. Role:{" "}
            <span className="font-semibold text-[hsl(var(--gold))] capitalize">{role?.replace('_', ' ')}</span>
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}>
            <Card className="relative overflow-hidden border-0 bg-[hsl(var(--navy-dark))]/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 cursor-default group">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${s.gradient}`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/60">{s.label}</span>
                  <div className={`p-2.5 rounded-xl ${s.iconBg}`}>
                    <s.icon className={`w-5 h-5 ${s.text}`} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold text-white">{s.value}</span>
                  <div className={`flex items-center gap-1 text-xs ${s.text}`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
