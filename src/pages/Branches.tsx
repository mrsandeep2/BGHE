import { motion } from "framer-motion";
import { useBranches } from "@/hooks/useDbData";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

const Branches = () => {
  const { data: branches = [] } = useBranches();

  return (
    <div className="min-h-screen">
      <section className="bg-navy-gradient pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Building2 className="w-4 h-4 text-accent" /><span className="text-accent text-sm font-medium">Our Locations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Our Branches</h1>
            <p className="text-base sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto px-2">Find a Bharat Group office near you for personalized academic counseling.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {branches.map((branch, i) => (
              <motion.div key={branch.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Card className="h-full border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group">
                  <div className="h-1.5 bg-accent" />
                  <CardContent className="p-6">
                    <motion.div whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <MapPin className="w-7 h-7 text-accent" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-2xl mb-1 text-foreground group-hover:text-accent transition-colors">{branch.city}</h3>
                    <p className="text-sm text-accent font-medium mb-4">{branch.state}</p>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent/60 shrink-0" /><span>{branch.address}</span></div>
                      <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent/60 shrink-0" /><a href={`tel:${branch.phone}`} className="hover:text-accent transition-colors">{branch.phone}</a></div>
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent/60 shrink-0" /><a href={`mailto:${branch.email}`} className="hover:text-accent transition-colors">{branch.email}</a></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Branches;
