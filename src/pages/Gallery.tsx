import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGalleryItems } from "@/hooks/useDbData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";

const categories = [
  { key: "all", label: "All" },
  { key: "events", label: "Events" },
  { key: "campus", label: "Campus Visits" },
  { key: "seminars", label: "Seminars" },
  { key: "counseling", label: "Counseling" },
];

const Gallery = () => {
  const { data: galleryItems = [] } = useGalleryItems();
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = activeTab === "all" ? galleryItems : galleryItems.filter((g) => g.category === activeTab);

  return (
    <div className="min-h-screen">
      <section className="bg-navy-gradient pt-32 pb-20 relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/5 rounded-full" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Camera className="w-4 h-4 text-accent" /><span className="text-accent text-sm font-medium">Photo Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Our Gallery</h1>
            <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">A glimpse into our events, campus visits, seminars, and counseling sessions.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <Button key={cat.key} variant={activeTab === cat.key ? "default" : "outline"} size="sm" onClick={() => setActiveTab(cat.key)}
                className={`transition-all ${activeTab === cat.key ? "bg-primary text-primary-foreground shadow-lg" : "hover:-translate-y-0.5"}`}>{cat.label}</Button>
            ))}
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
              {filtered.map((item, i) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <div className="relative group overflow-hidden rounded-xl cursor-pointer aspect-[4/3] shadow-md hover:shadow-2xl transition-shadow" onClick={() => setLightbox(item.image)}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(213,56%,13%,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div><p className="text-primary-foreground font-semibold text-sm">{item.title}</p><p className="text-primary-foreground/70 text-xs capitalize">{item.category}</p></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <button onClick={() => setLightbox(null)} className="absolute top-2 right-2 z-10 p-2 rounded-full bg-foreground/20 text-primary-foreground hover:bg-foreground/40"><X className="w-5 h-5" /></button>
          {lightbox && <img src={lightbox} alt="Gallery" className="w-full rounded-lg" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
