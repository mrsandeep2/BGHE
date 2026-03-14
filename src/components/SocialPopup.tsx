import { useEffect, useState, type SVGProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type SocialItem = {
  name: string;
  href: string;
  className: string;
  iconClassName: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.7-1.6h1.2V4.8c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3V11H9v3h2.5v7h2Z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.75" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 4.25a7.75 7.75 0 0 0-6.74 11.57L4.1 19.9l4.19-1.11A7.75 7.75 0 1 0 12 4.25Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9.16 8.96c-.24-.52-.5-.53-.73-.54h-.62c-.21 0-.55.08-.83.4-.28.32-1.08 1.06-1.08 2.58s1.11 2.98 1.26 3.19c.16.21 2.18 3.49 5.39 4.75 2.66 1.04 3.2.83 3.78.78.58-.05 1.86-.76 2.12-1.49.27-.73.27-1.35.19-1.48-.08-.13-.29-.21-.61-.37-.32-.16-1.86-.92-2.15-1.03-.29-.11-.5-.16-.71.16-.21.32-.81 1.03-.99 1.24-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.58-1.6-.95-.85-1.59-1.91-1.77-2.23-.19-.32-.02-.49.14-.64.15-.15.32-.4.48-.61.16-.21.21-.37.32-.61.11-.24.05-.45-.03-.61-.08-.16-.73-1.79-1.01-2.41Z"
      fill="currentColor"
    />
  </svg>
);

const socialItems: SocialItem[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/p/Bharat-Group-Of-Higher-Education-61581101728651/",
    className: "from-blue-100 via-blue-50 to-white text-blue-600 shadow-blue-200/70",
    iconClassName: "text-blue-600",
    Icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bgheofficial/",
    className: "from-orange-100 via-rose-50 to-white text-rose-500 shadow-orange-200/70",
    iconClassName: "text-rose-500",
    Icon: InstagramIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/917546935196",
    className: "from-emerald-100 via-green-50 to-white text-emerald-500 shadow-emerald-200/70",
    iconClassName: "text-emerald-500",
    Icon: WhatsAppIcon,
  },
];

const SocialPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-[0_32px_120px_rgba(15,23,42,0.35)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(30,64,175,0.10),_transparent_30%)]" />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close social popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative grid gap-10 px-6 py-14 sm:px-10 md:px-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div className="max-w-xl">
                <div className="mb-5 inline-flex items-center rounded-full border border-[hsl(var(--gold))/0.24] bg-[hsl(var(--gold))/0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--navy))]">
                  Bharat Group Of Higher Education
                </div>
                <h2 className="text-4xl font-heading font-bold leading-tight text-[hsl(var(--navy-dark))] sm:text-5xl">
                  Stay Connected!
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600 sm:text-xl">
                  Follow BGHE on our social channels to get the latest updates, announcements, and admission information.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {socialItems.map(({ name, href, className, iconClassName, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex flex-col items-center rounded-[1.75rem] border border-slate-200/80 bg-white/75 px-5 py-6 text-center shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.16)]"
                  >
                    <span className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl transition duration-300 group-hover:scale-105 sm:h-28 sm:w-28 ${className}`}>
                      <Icon className={`h-11 w-11 sm:h-12 sm:w-12 ${iconClassName}`} />
                    </span>
                    <span className="mt-5 text-xl font-semibold text-[hsl(var(--navy))]">{name}</span>
                    <span className="mt-1 text-sm text-slate-500">
                      {name === "Instagram" ? "@bgheofficial" : name === "WhatsApp" ? "Chat with BGHE" : "Official Page"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialPopup;