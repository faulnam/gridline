import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer({ onNavigate, onOpenChat }) {
  return (
    <footer className="bg-bg-primary border-t border-border-card px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Column 1 - Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start mb-4">
              <div className="text-xl font-bold">
                GRID<span className="text-cyan-accent">//</span>LINE
              </div>
              <div className="text-[10px] tracking-widest text-text-secondary">D I G I T A L</div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              We build brands, websites, and marketing systems that drive measurable growth.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('home')} className="text-text-secondary hover:text-cyan-accent text-sm transition">Home</button></li>
              <li><button onClick={() => onNavigate('portfolio')} className="text-text-secondary hover:text-cyan-accent text-sm transition">Portfolio</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="text-text-secondary hover:text-cyan-accent text-sm transition">Pricing</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-text-secondary hover:text-cyan-accent text-sm transition">Start Project</button></li>
              <li><button onClick={() => onOpenChat()} className="text-text-secondary hover:text-cyan-accent text-sm transition">Let's Talk</button></li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="font-bold text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              <li><span className="text-text-secondary text-sm">Website Design</span></li>
              <li><span className="text-text-secondary text-sm">Web Development</span></li>
              <li><span className="text-text-secondary text-sm">E-commerce Solutions</span></li>
              <li><span className="text-text-secondary text-sm">Brand Identity</span></li>
              <li><span className="text-text-secondary text-sm">Digital Marketing</span></li>
              <li><span className="text-text-secondary text-sm">SEO Optimization</span></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href="mailto:hello@gridline.digital" className="text-text-secondary hover:text-cyan-accent text-sm transition">hello@gridline.digital</a></li>
              <li><a href="tel:6045550199" className="text-text-secondary hover:text-cyan-accent text-sm transition">(604) 555-0199</a></li>
              <li className="text-text-secondary text-sm">Vancouver, BC<br/>Canada</li>
            </ul>
          </div>

          {/* Column 5 - Follow Us */}
          <div>
            <h4 className="font-bold text-sm mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 border border-border-card rounded-full flex items-center justify-center hover:border-cyan-accent hover:text-cyan-accent transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-border-card rounded-full flex items-center justify-center hover:border-cyan-accent hover:text-cyan-accent transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-border-card rounded-full flex items-center justify-center hover:border-cyan-accent hover:text-cyan-accent transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-border-card rounded-full flex items-center justify-center hover:border-cyan-accent hover:text-cyan-accent transition">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border-card flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">© 2024 Gridline Digital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-text-secondary hover:text-cyan-accent text-sm transition">Privacy Policy</a>
            <a href="#" className="text-text-secondary hover:text-cyan-accent text-sm transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
