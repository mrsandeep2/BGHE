import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import InquiryForm from "@/components/InquiryForm";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageSquare, Sparkles } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Visit Us", text: "Near T.V. Tower, Block Road, Forbesganj, Bihar", color: "bg-accent/10 text-accent" },
  { icon: Phone, title: "Call Us", text: "7546935196", href: "tel:7546935196", color: "bg-emerald-100 text-emerald-600" },
  { icon: Mail, title: "Email Us", text: "bgheofficial@zohomail.in", href: "mailto:bgheofficial@zohomail.in", color: "bg-orange-100 text-orange-500" },
  { icon: Mail, title: "HR Email", text: "hr.bghe104kgmail.com", color: "bg-orange-100 text-orange-500" },
  { icon: Clock, title: "Working Hours", text: "Mon – Sat: 9:00 AM – 6:00 PM", color: "bg-primary/10 text-primary" },
];

const Contact = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact BGHE Education",
    description: "Contact BGHE Education Forbesganj for DRCC admission help and college counseling.",
    url: "https://bghe.in/contact",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact Us – DRCC Admission Help Forbesganj"
        description="Contact BGHE Education near T.V. Tower, Block Road, Forbesganj, Bihar for DRCC student credit card admission help. Call: 7546935196, Email: bgheofficial@zohomail.in"
        keywords="contact BGHE Education, DRCC admission center Forbesganj, admission consultant Araria district, college admission help Forbesganj Bihar"
        canonical="/contact"
        structuredData={contactSchema}
      />

      <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-72 h-72 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">संपर्क करें</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-base sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto px-2">DRCC एडमिशन और काउंसलिंग के लिए आज ही संपर्क करें</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                            {(item as any).href ? (
                              <a href={(item as any).href} className="text-sm text-muted-foreground hover:text-accent transition-colors">{item.text}</a>
                            ) : (
                              <p className="text-sm text-muted-foreground">{item.text}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Map - Forbesganj */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                  className="mt-6 rounded-xl overflow-hidden shadow-lg border h-[250px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28598.4!2d87.2669!3d26.3066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5b7e0e3b87b47%3A0x4ef1f7b2a3c91b2c!2sForbesganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BGHE Education Forbesganj Location"
                  />
                </motion.div>
              </motion.div>
            </div>

            <div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <Card className="shadow-2xl border-none overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-heading font-bold text-foreground">Send us a Message</h2>
                        <p className="text-sm text-muted-foreground">अपनी जानकारी भरें, हम 24 घंटे में संपर्क करेंगे</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <InquiryForm />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
