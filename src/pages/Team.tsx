import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMentors } from "@/hooks/useDbData";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Facebook, Instagram, Twitter } from "lucide-react";

const Team = () => {
  const { data: mentors = [] } = useMentors();
  const [hoveredMentor, setHoveredMentor] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Users className="w-4 h-4 text-accent" /><span className="text-accent text-sm font-medium">Our Mentors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Our Mentors</h1>
            <p className="text-base sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto px-2">Experienced academic counselors dedicated to guiding your educational journey.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {mentors.map((mentor, i) => {
              const isHovered = hoveredMentor === mentor.id;
              const socials = [
                { icon: Facebook, color: "text-blue-600 hover:bg-blue-50", url: (mentor as any).facebook_url },
                { icon: Instagram, color: "text-pink-500 hover:bg-pink-50", url: (mentor as any).instagram_url },
                { icon: Twitter, color: "text-sky-500 hover:bg-sky-50", url: (mentor as any).twitter_url },
              ].filter(s => s.url);

              return (
                <motion.div key={mentor.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <Card
                    className="overflow-hidden group text-center h-full border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    onMouseEnter={() => setHoveredMentor(mentor.id)}
                    onMouseLeave={() => setHoveredMentor(null)}
                    onTouchStart={() => setHoveredMentor(isHovered ? null : mentor.id)}
                  >
                    <div className="pt-8 px-6">
                      <motion.div whileHover={{ scale: 1.05 }} className="w-32 h-32 rounded-full overflow-hidden mx-auto ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all">
                        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover object-top" />
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-xl mb-1 text-foreground group-hover:text-accent transition-colors">{mentor.name}</h3>
                      <p className="text-sm font-medium text-accent mb-3">{mentor.designation}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{mentor.bio}</p>
                      <AnimatePresence>
                        {isHovered && socials.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center gap-3 mt-4"
                          >
                            {socials.map((social, si) => (
                              <motion.a key={si} href={social.url} target="_blank" rel="noopener noreferrer"
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: si * 0.08, type: "spring" }}
                                className={`w-9 h-9 rounded-full border border-border/60 bg-card flex items-center justify-center ${social.color} transition-all duration-200 shadow-sm hover:shadow-md`}
                              >
                                <social.icon className="w-4 h-4" />
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
