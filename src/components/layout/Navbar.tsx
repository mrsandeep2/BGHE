import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { navLinks } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NoticeTicker from "@/components/NoticeTicker";

const Navbar = () => {
  const { user, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const adminLink = user && role ? "/admin" : "/admin/login";

  useEffect(() => setIsOpen(false), [location]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--navy-dark))] backdrop-blur-md shadow-lg border-b border-primary-foreground/10 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + Organization name */}
            <Link to="/" className="flex items-center gap-[10px] group min-w-0">
              <img
                src="/bghe-logo.png"
                alt="Bharat Group Of Higher Education"
                className="h-[45px] w-auto object-contain shrink-0"
              />
              <h1 className="font-heading font-bold leading-tight text-white text-[13px] sm:text-[16px] md:text-[22px] max-w-[180px] sm:max-w-[320px] md:max-w-none">
                Bharat <span className="text-[#f4c542]">Group Of Higher Education</span>
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
                    location.pathname === link.path
                      ? "text-accent font-semibold"
                      : "text-primary-foreground/80 hover:text-accent"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path ? (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full"
                    />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent/60 rounded-full transition-all duration-300 group-hover:w-6" />
                  )}
                </Link>
              ))}
              <Link to={adminLink}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2 text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
                >
                  <LogIn className="w-4 h-4" />
                </Button>
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md transition-colors text-primary-foreground hover:bg-primary-foreground/10"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4 pb-4">
                <nav className="flex flex-col gap-1 bg-[hsl(var(--navy))] rounded-lg p-4 shadow-xl border border-primary-foreground/10">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                          location.pathname === link.path
                            ? "bg-accent/15 text-accent font-semibold"
                            : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Notice ticker - below navbar */}
      <div className="fixed left-0 right-0 z-40 top-16 md:top-20 transition-all duration-300">
        <NoticeTicker />
      </div>
    </>
  );
};

export default Navbar;

