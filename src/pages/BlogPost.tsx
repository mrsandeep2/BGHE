import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Calendar, ArrowLeft, User } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog_post", slug],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .single();
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 bg-background">
        <div className="container mx-auto px-4 max-w-3xl animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-64 bg-muted rounded-xl" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 bg-background text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Back to Blog</Button></Link>
        </div>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    author: { "@type": "Organization", name: "BGHE Education" },
    publisher: { "@type": "Organization", name: "BGHE Education", logo: { "@type": "ImageObject", url: "https://bghe.in/favicon.png" } },
    datePublished: post.published_at,
    dateModified: post.updated_at,
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.cover_image || undefined}
        structuredData={articleSchema}
      />

      <div className="bg-navy-gradient pt-24 sm:pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent text-sm mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag: string) => (
                <Badge key={tag} className="bg-accent/20 text-accent border-accent/30">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} className="w-full rounded-xl shadow-lg mb-8 max-h-[400px] object-cover" loading="lazy" />
          )}
          <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
          </article>

          {/* CTA */}
          <Card className="mt-12 border-none shadow-xl bg-gradient-to-r from-accent/10 to-primary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">DRCC योजना से एडमिशन चाहिए?</h3>
              <p className="text-muted-foreground mb-4">BGHE Education से संपर्क करें और ₹4 लाख तक का Student Credit Card पाएं</p>
              <Link to="/contact">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                  Contact Us Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
