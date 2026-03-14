import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  heroSlides as fallbackSlides,
  universities as fallbackUniversities,
  courses as fallbackCourses,
  mentors as fallbackMentors,
  galleryItems as fallbackGallery,
  testimonials as fallbackTestimonials,
  branches as fallbackBranches,
  courseCategories as fallbackCategories,
} from "@/data/siteData";

// Hook to subscribe to realtime changes and invalidate queries
const useRealtimeSubscription = (table: string, queryKey: string[]) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => {
          queryClient.invalidateQueries({ queryKey });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, queryClient, queryKey]);
};

export const useHeroSlides = () => {
  useRealtimeSubscription('hero_slides', ['hero_slides']);
  return useQuery({
    queryKey: ["hero_slides"],
    queryFn: async () => {
      const { data } = await supabase.from("hero_slides").select("*").order("sort_order");
      if (data && data.length > 0) return data.map((s, i) => ({ id: i + 1, title: s.title, subtitle: s.subtitle, image: s.image }));
      return fallbackSlides;
    },
  });
};

export const useUniversities = () => {
  useRealtimeSubscription('universities', ['universities']);
  return useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const { data } = await supabase.from("universities").select("*").order("name");
      if (data && data.length > 0) return data.map(u => ({ id: u.id, name: u.name, location: u.location, type: u.type, courses: u.courses, image: u.image, description: u.description }));
      return fallbackUniversities;
    },
  });
};

export const useCourses = () => {
  useRealtimeSubscription('courses', ['courses']);
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").eq("status", "active").order("category");
      if (data && data.length > 0) return data.map(c => ({
        id: c.id, name: c.name, category: c.category, duration: c.duration,
        description: c.description, icon: c.icon,
        scheme_type: (c as any).scheme_type || "NON_DRCC",
        brochure_pdf: (c as any).brochure_pdf || null,
      }));
      return fallbackCourses.map(c => ({ ...c, scheme_type: "NON_DRCC" as string, brochure_pdf: null as string | null }));
    },
  });
};

export const useCourseCategories = () => {
  useRealtimeSubscription('courses', ['course_categories']);
  return useQuery({
    queryKey: ["course_categories"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("category").eq("status", "active");
      if (data && data.length > 0) {
        const cats = [...new Set(data.map(c => c.category))];
        return cats;
      }
      return fallbackCategories;
    },
  });
};

export const useMentors = () => {
  useRealtimeSubscription('mentors', ['mentors']);
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data } = await supabase.from("mentors").select("*").order("name");
      if (data && data.length > 0) return data.map(m => ({ id: m.id, name: m.name, designation: m.designation, bio: m.bio, image: m.image }));
      return fallbackMentors;
    },
  });
};

export const useGalleryItems = () => {
  useRealtimeSubscription('gallery_items', ['gallery_items']);
  return useQuery({
    queryKey: ["gallery_items"],
    queryFn: async () => {
      const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) return data.map(g => ({ id: g.id, title: g.title, category: g.category as "events" | "campus" | "seminars" | "counseling", image: g.image }));
      return fallbackGallery;
    },
  });
};

export const useTestimonials = () => {
  useRealtimeSubscription('testimonials', ['testimonials']);
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) return data.map(t => ({ id: t.id, name: t.name, course: t.course, university: t.university, quote: t.quote }));
      return fallbackTestimonials;
    },
  });
};

export const useBranches = () => {
  useRealtimeSubscription('branches', ['branches']);
  return useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const { data } = await supabase.from("branches").select("*").order("city");
      if (data && data.length > 0) return data.map(b => ({ id: b.id, city: b.city, state: b.state, address: b.address, phone: b.phone, email: b.email, mapUrl: b.map_url }));
      return fallbackBranches;
    },
  });
};