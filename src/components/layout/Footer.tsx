import { Link } from "react-router-dom";
import { useBranches } from "@/hooks/useDbData";
import { navLinks } from "@/data/siteData";
import { GraduationCap, Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const { data: branches = [] } = useBranches();

  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center"><GraduationCap className="w-6 h-6 text-accent-foreground" /></div>
              <div><span className="text-lg font-heading font-bold block">BGHE Education</span><span className="text-[10px] uppercase tracking-widest text-primary-foreground/60">Higher Education</span></div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-3">DRCC के माध्यम से ₹4 लाख तक के Student Credit Card से कॉलेज में एडमिशन करवाएं।</p>
            <p className="text-primary-foreground/60 text-xs leading-relaxed">Trusted education guidance for college admissions through DRCC student credit card scheme in Bihar.</p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (<li key={link.path}><Link to={link.path} className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">{link.label}</Link></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Head Office</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />Near T.V. Tower, Block Road, Forbesganj, Bihar</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent shrink-0" /><a href="tel:7546935196" className="hover:text-accent transition-colors">7546935196</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent shrink-0" /><a href="mailto:bgheofficial@zohomail.in" className="hover:text-accent transition-colors">bgheofficial@zohomail.in</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent shrink-0" /><a href="mailto:hr.bghe104k@gmail.com" className="hover:text-accent transition-colors">hr.bghe104k@gmail.com</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Our Branches</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {branches.map((b) => (<li key={b.id} className="flex items-center gap-2"><MapPin className="w-3 h-3 text-accent shrink-0" />{b.city}, {b.state}</li>))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 items-center gap-3 text-xs text-primary-foreground/50">
          <p className="text-center md:text-left">© {new Date().getFullYear()} BGHE Education (Bharat Group of Higher Education). All rights reserved.</p>
          <div className="flex justify-center">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-primary-foreground/90 text-sm md:text-base">
              Designed by <span className="text-accent font-semibold">Sandeep Kumar</span> (Software Engineer)
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 flex-wrap">
            <a href="https://wa.me/917070422574" target="_blank" rel="noopener noreferrer" className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-emerald-300 font-semibold hover:bg-emerald-500/25 transition-colors">
              WhatsApp: +91 7070422574
            </a>
            <div className="flex items-center gap-2">
              <a href="https://www.instagram.com/mr_sandeep2_/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></a>
              <a href="https://www.linkedin.com/in/sandeepk-cse/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin className="w-4 h-4 md:w-5 md:h-5" /></a>
              <a href="https://www.facebook.com/sandeep.kalwar.90" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Facebook className="w-4 h-4 md:w-5 md:h-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
