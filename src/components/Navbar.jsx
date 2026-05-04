import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg-primary border-b border-border-card' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex flex-col items-start group">
            <div className="text-xl font-bold">
              GRID<span className="text-cyan-accent">//</span>LINE
            </div>
            <div className="text-[10px] tracking-widest text-text-secondary">D I G I T A L</div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('home')} className="text-sm text-text-tertiary hover:text-text-primary transition">Home</button>
            <button onClick={() => onNavigate('portfolio')} className="text-sm text-text-tertiary hover:text-text-primary transition">Portfolio</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm text-text-tertiary hover:text-text-primary transition">Pricing</button>
            <button onClick={() => onNavigate('contact')} className="text-sm text-text-tertiary hover:text-text-primary transition">Start Project</button>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => onNavigate('contact')}
            className="hidden md:block bg-cyan-accent text-bg-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition"
          >
            Let's Talk →
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-border-card pt-6 space-y-4">
            <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-text-tertiary hover:text-text-primary transition">Home</button>
            <button onClick={() => { onNavigate('portfolio'); setMobileMenuOpen(false); }} className="block w-full text-left text-text-tertiary hover:text-text-primary transition">Portfolio</button>
            <button onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }} className="block w-full text-left text-text-tertiary hover:text-text-primary transition">Pricing</button>
            <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="block w-full text-left text-text-tertiary hover:text-text-primary transition">Start Project</button>
            <button 
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="w-full bg-cyan-accent text-bg-primary px-6 py-2.5 rounded-full font-semibold text-sm"
            >
              Let's Talk →
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
