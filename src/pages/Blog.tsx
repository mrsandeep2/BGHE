import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import SEOHead from "@/components/SEOHead";
import { Calendar, Clock, ArrowRight, BookOpen, Newspaper } from "lucide-react";

const useBlogPosts = () =>
  useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      return data || [];
    },
  });

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "BGHE Education Blog",
    description: "Latest news and guides on DRCC admissions, student credit card, and higher education in Bihar.",
    url: "https://bghe.in/blog",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="BGHE Blog | University Admission India & DRCC Guides"
        description="Read practical guides on university admission India, UG PG admission 2026, distance education universities, and DRCC support for higher education students."
        keywords="university admission India blog, UG PG admission guide India, distance education universities India, DRCC admission support articles"
        canonical="/blog"
        structuredData={blogSchema}
      />

      {/* Hero */}
      <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Newspaper className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Our Blog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Education News & Guides
            </h1>
            <p className="text-base sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto">
              शिक्षा से जुड़ी ताज़ा जानकारी और DRCC योजना के बारे में पढ़ें
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any, i: number) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full group border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                      {post.cover_image && (
                        <div className="h-48 overflow-hidden">
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags?.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <h2 className="font-heading font-bold text-lg mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">{post.title}</h2>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                          <span className="text-accent font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Coming Soon!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                हम जल्द ही शिक्षा और DRCC योजना से जुड़े लेख यहाँ प्रकाशित करेंगे।<br />
                We'll be publishing education guides and DRCC admission articles soon.
              </p>
              <Link to="/contact" className="mt-6 inline-block">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                  Get Notified <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
