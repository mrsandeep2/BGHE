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
      d="M19.05 4.94A9.8 9.8 0 0 0 12.07 2a9.93 9.93 0 0 0-8.6 14.9L2 22l5.26-1.38a9.93 9.93 0 0 0 4.76 1.2h.01a9.96 9.96 0 0 0 9.97-9.91 9.8 9.8 0 0 0-2.95-6.97Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.63 13.77c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.61.77-.74.93-.14.16-.27.18-.51.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.27.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.54-1.31-.74-1.8-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.17.86 2.31.98 2.47.12.16 1.69 2.58 4.09 3.61.57.25 1.02.4 1.37.52.58.18 1.11.16 1.53.1.47-.07 1.4-.57 1.6-1.12.2-.56.2-1.04.14-1.12-.06-.08-.22-.12-.46-.24Z"
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
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-slate-950/70 px-3 py-3 sm:items-center sm:px-4 sm:py-6 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[1.5rem] sm:rounded-[2rem] border border-white/70 bg-white/95 shadow-[0_32px_120px_rgba(15,23,42,0.35)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(30,64,175,0.10),_transparent_30%)]" />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close social popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative grid gap-8 px-5 py-12 sm:px-10 sm:py-14 md:px-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
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