import { useEffect, useRef } from "react";
import { Megaphone } from "lucide-react";

const notices = [
  "🎓 Admissions Open 2026-27 – DRCC के माध्यम से ₹4 लाख तक का Student Credit Card पाएं!",
  "📢 BGHE Education, Forbesganj – B.Tech, BCA, MBA, Nursing एडमिशन के लिए संपर्क करें: 7546935196",
  "🏆 Private Universities के साथ Collaboration – DRCC Scheme से एडमिशन करवाएं!",
  "📅 Free Career Counseling – आज ही Visit करें: Near T.V. Tower, Block Road, Forbesganj",
  "🌟 DRCC Student Credit Card – Bihar Government Scheme for Higher Education",
];

const NoticeTicker = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 1;
    const animate = () => {
      pos -= speed;
      if (pos <= -el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const content = notices.join("   •   ");

  return (
    <div className="bg-accent text-accent-foreground overflow-hidden whitespace-nowrap relative">
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-2 bg-accent px-3 pr-4 border-r border-accent-foreground/10">
        <Megaphone className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Notice</span>
      </div>
      <div className="py-2 pl-24 sm:pl-28">
        <div ref={scrollRef} className="inline-flex gap-0 text-sm font-medium">
          <span className="whitespace-nowrap">{content}   •   {content}</span>
        </div>
      </div>
    </div>
  );
};

export default NoticeTicker;
