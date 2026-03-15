import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { seoLandingPages } from "@/data/seoLandingPages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, FileText, GraduationCap, MapPin, MessageSquare } from "lucide-react";

interface SeoLandingPageProps {
  pageKey: keyof typeof seoLandingPages;
}

const SeoLandingPage = ({ pageKey }: SeoLandingPageProps) => {
  const page = seoLandingPages[pageKey];

  const hindiFaqs = [
    {
      question: "BGHE बिहार में एडमिशन में कैसे मदद करता है?",
      answer: "BGHE छात्रों को सही कोर्स चुनने, यूनिवर्सिटी शॉर्टलिस्ट करने, दस्तावेज़ तैयार करने और एडमिशन प्रक्रिया को आसान बनाने में चरणबद्ध मार्गदर्शन देता है।",
    },
    {
      question: "क्या BGHE DRCC और BSCC से जुड़ी जानकारी भी देता है?",
      answer: "हां, BGHE DRCC और BSCC/MNSSBY से जुड़ी समझ, तैयारी और एडमिशन प्लानिंग के लिए उपयोगी मार्गदर्शन देता है ताकि छात्र सही निर्णय ले सकें।",
    },
    {
      question: "अगर मैं कोर्स को लेकर कन्फ्यूज हूं तो क्या करना चाहिए?",
      answer: "पहले अपने लक्ष्य के अनुसार कोर्स विकल्प देखें, फिर यूनिवर्सिटी तुलना करें। जरूरत होने पर BGHE टीम से संपर्क करके व्यक्तिगत काउंसलिंग लें।",
    },
    {
      question: "क्या दूरी शिक्षा (Distance Education) के लिए भी मार्गदर्शन मिलता है?",
      answer: "बिलकुल, BGHE नियमित और दूरी शिक्षा दोनों विकल्पों के लिए मार्गदर्शन देता है ताकि छात्र अपनी परिस्थिति के अनुसार सही मोड चुन सकें।",
    },
    {
      question: "BGHE से संपर्क करने का सही समय कब है?",
      answer: "जैसे ही आपको कोर्स, यूनिवर्सिटी, दस्तावेज़ या एडमिशन प्रक्रिया में कन्फ्यूजन हो, तुरंत संपर्क करें। जल्दी मार्गदर्शन लेने से गलतियां और देरी दोनों कम होती हैं।",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bghe.in/" },
      { "@type": "ListItem", position: 2, name: page.h1, item: `https://bghe.in/${page.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hindiFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.description,
    url: `https://bghe.in/${page.slug}`,
    about: ["BGHE", "Bihar", "Higher Education", "Admission Support"],
    audience: {
      "@type": "Audience",
      audienceType: "Students and parents in Bihar",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={page.title}
        description={page.description}
        keywords={page.keywords}
        canonical={`/${page.slug}`}
        structuredData={[webPageSchema, breadcrumbSchema, faqSchema]}
      />

      <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute -top-24 -right-24 w-80 h-80 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">{page.eyebrow}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-5">{page.h1}</h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/75 max-w-3xl mx-auto">{page.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {page.heroPills.map((pill) => (
                <Badge key={pill} className="bg-white/10 text-primary-foreground border-white/10 hover:bg-white/10 px-3 py-1">{pill}</Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link to="/contact">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-semibold">Get Admission Help <ArrowRight className="w-4 h-4" /></Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" className="border-accent/40 text-accent hover:bg-accent/10 gap-2">Read Related Guides <FileText className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div className="space-y-5">
              {page.intro.map((paragraph) => (
                <p key={paragraph} className="text-base md:text-lg leading-8 text-muted-foreground">{paragraph}</p>
              ))}
            </div>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-accent/10 via-background to-primary/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-foreground text-lg">Bihar-Focused Support</h2>
                    <p className="text-sm text-muted-foreground">Built for local intent, branded search, and conversion-focused SEO.</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-accent shrink-0" />Bihar admission guidance language throughout the page</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-accent shrink-0" />Internal links to courses, universities, contact, and blog</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-accent shrink-0" />Structured data for WebPage, FAQ, and breadcrumbs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/45">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {page.sections.map((section, index) => (
              <motion.div key={section.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 md:p-7">
                    <h2 className="text-xl font-heading font-bold text-foreground mb-4">{section.title}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-muted-foreground">{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets && (
                      <div className="mt-5 space-y-2">
                        {section.bullets.map((bullet) => (
                          <p key={bullet} className="flex items-start gap-2 text-sm text-foreground"><CheckCircle2 className="w-4 h-4 mt-0.5 text-accent shrink-0" />{bullet}</p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-1.5 mb-4">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">सामान्य प्रश्न</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">अक्सर पूछे जाने वाले प्रश्न</h2>
          </div>
          <Card className="border shadow-sm">
            <CardContent className="p-2 sm:p-4">
              <Accordion type="single" collapsible className="w-full">
                {hindiFaqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`} className="border-border/70 px-3 sm:px-4">
                    <AccordionTrigger className="text-left font-heading font-semibold text-foreground text-base hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-muted-foreground leading-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-14 md:py-18 bg-muted/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-3">Related BGHE Resources</h2>
            <p className="text-muted-foreground">These links strengthen internal SEO structure and help students move to the next useful page without getting stuck.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {page.relatedLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Card className="h-full border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2 flex items-center gap-2">{link.label} <ArrowRight className="w-4 h-4 text-accent" /></h3>
                    <p className="text-sm text-muted-foreground leading-6">{link.description}</p>
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

export default SeoLandingPage;