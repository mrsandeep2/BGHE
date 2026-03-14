import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, Eye, Heart, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const values = [
  { icon: Heart, title: "Student-First Approach", desc: "Every decision we make is centered around the student's best interest and academic aspirations." },
  { icon: Eye, title: "Transparency", desc: "We provide clear, honest information about universities, courses, and the admission process." },
  { icon: Target, title: "Integrity", desc: "We uphold the highest standards of ethical conduct in all our advisory services." },
  { icon: CheckCircle, title: "Quality Guidance", desc: "Our counselors are trained professionals with deep knowledge of the higher education landscape." },
];

const process = [
  { step: "01", title: "Initial Consultation", desc: "Understanding your academic background, interests, and career goals." },
  { step: "02", title: "Course & University Matching", desc: "Identifying the best-fit courses and universities based on your profile." },
  { step: "03", title: "Application Support", desc: "Guiding you through the application and documentation process." },
  { step: "04", title: "Admission & Enrollment", desc: "Supporting you until successful admission and enrollment at your chosen institution." },
];

const About = () => (
  <div className="min-h-screen">
    <SEOHead
      title="About Bharat Group of Higher Education Admission India"
      description="Learn how Bharat Group of Higher Education supports university admission India, higher education counseling, and DRCC-focused admission guidance for students."
      keywords="about Bharat Group of Higher Education, university admission India support, higher education admission counseling, DRCC admission support"
      canonical="/about"
    />
    {/* Hero */}
    <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
      <div className="container mx-auto px-4 text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-accent" />
           <span className="text-accent text-sm font-medium">About BGHE Education</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">हमारे बारे में</h1>
          <p className="text-base sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto px-2">BGHE Education – Forbesganj, Bihar में DRCC एडमिशन सहायता केंद्र</p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop" alt="Team counseling" className="rounded-2xl shadow-xl w-full hover:shadow-2xl transition-shadow duration-300" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionHeading title="Who We Are" centered={false} />
            <p className="text-muted-foreground leading-relaxed mb-4">BGHE Education (Bharat Group of Higher Education) is a trusted education guidance organization located near T.V. Tower, Block Road, Forbesganj, Bihar. We help students get admission into recognized private universities and professional colleges through the DRCC student credit card scheme.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">हमारा संगठन छात्रों को सही कोर्स और कॉलेज चुनने में मार्गदर्शन करता है, DRCC के माध्यम से ₹4 लाख तक की वित्तीय सहायता के साथ। BGHE Education कई Private Universities के साथ सहयोग करता है।</p>
            <p className="text-muted-foreground leading-relaxed">Students can apply for courses such as B.Tech, BCA, BBA, MBA, Polytechnic, Nursing, and other professional programs. Our experienced team supports students from application to final admission.</p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Eye, title: "Our Vision", color: "accent", text: "To be a trusted and accessible bridge between aspiring students and quality higher education institutions, empowering every student to make well-informed academic choices." },
            { icon: Target, title: "Our Mission", color: "primary", text: "To provide transparent, professional, and personalized higher education counseling services that help students identify the right courses and universities aligned with their abilities and aspirations." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }}>
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className={`h-1.5 ${i === 0 ? "bg-accent" : "bg-primary"}`} />
                <CardContent className="p-8">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className={`w-14 h-14 rounded-2xl ${i === 0 ? "bg-accent/10" : "bg-primary/10"} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-7 h-7 ${i === 0 ? "text-accent" : "text-primary"}`} />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading title="Our Core Values" subtitle="The principles that guide everything we do" />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="text-center h-full border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <CardContent className="p-6">
                  <motion.div whileHover={{ scale: 1.15, rotate: 10 }} className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <v.icon className="w-7 h-7 text-accent" />
                  </motion.div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-24 bg-navy-gradient relative overflow-hidden">
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -left-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
      <div className="container mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading title="How We Help Students" subtitle="Our structured approach to guiding your academic journey" light />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {process.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
              <div className="text-center group">
                <motion.div whileHover={{ scale: 1.1 }} className="text-5xl font-heading font-bold text-accent/30 mb-3 group-hover:text-accent/60 transition-colors">{p.step}</motion.div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-primary-foreground">{p.title}</h3>
                <p className="text-sm text-primary-foreground/70">{p.desc}</p>
                {i < process.length - 1 && <ArrowRight className="w-5 h-5 text-accent/40 mx-auto mt-4 hidden lg:block" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      <div className="container mx-auto px-4 text-center relative">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Reach out to our academic counselors and take the first step toward your higher education goals.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all hover:-translate-y-0.5">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  </div>
);

export default About;
