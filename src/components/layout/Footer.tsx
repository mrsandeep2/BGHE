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
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent shrink-0" /><span>hr.bghe104kgmail.com</span></li>
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
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} BGHE Education (Bharat Group of Higher Education). All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Designed by <span className="text-primary-foreground/70 font-medium">Sandeep Kumar</span> (Software Engineer) +91 7070422574</span>
            <div className="flex items-center gap-1.5 ml-1">
              <a href="https://www.instagram.com/mr_sandeep2_/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="https://www.linkedin.com/in/sandeepk-cse/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href="https://www.facebook.com/sandeep.kalwar.90" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
