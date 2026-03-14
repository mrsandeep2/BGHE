import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import InquiryForm from "./InquiryForm";
import { MessageCircle, X, Sparkles } from "lucide-react";

const InquiryModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating pulsing button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
          <span className="absolute -inset-1 rounded-full bg-accent/20 animate-pulse" />
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            className="relative rounded-full shadow-2xl bg-accent text-accent-foreground hover:bg-accent/90 h-14 w-14 md:w-auto md:px-6 gap-2 font-semibold text-base"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden md:inline">Inquire Now</span>
          </Button>
        </div>
      </motion.div>

      {/* Slide-in inquiry panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-card z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <h2 className="text-xl font-heading font-bold text-foreground">Start Your Journey</h2>
                  </div>
                  <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted transition-colors">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-muted-foreground text-sm mb-6">Fill in your details and our counselors will reach out to you within 24 hours.</p>
                <InquiryForm />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InquiryModal;
