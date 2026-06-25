import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${scrolled ? 'pt-6 px-4' : 'pt-0 px-0'}`}>
      <nav 
        className={`pointer-events-auto transition-all duration-500 w-full ${
          scrolled 
            ? 'max-w-4xl bg-bg-card/70 backdrop-blur-xl border border-border-card rounded-full shadow-2xl py-3 px-6 md:px-8' 
            : 'max-w-7xl bg-bg-primary/0 border-transparent rounded-none py-6 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex flex-col items-start group">
            <div className={`font-bold transition-all ${scrolled ? 'text-lg' : 'text-xl'}`}>
              GRID<span className="text-cyan-accent">//</span>LINE
            </div>
            <div className={`tracking-widest text-text-secondary transition-all ${scrolled ? 'text-[8px]' : 'text-[10px]'}`}>
              D I G I T A L
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="text-sm px-5 py-2.5 rounded-full bg-white/10 text-white font-medium transition-colors">Home</button>
            <button onClick={() => onNavigate('services')} className="text-sm px-5 py-2.5 rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors">Services</button>
            <button onClick={() => onNavigate('portfolio')} className="text-sm px-5 py-2.5 rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors">Portfolio</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm px-5 py-2.5 rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors">Pricing</button>
            <button onClick={() => onNavigate('contact')} className="text-sm px-5 py-2.5 rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors">Contact</button>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => onNavigate('contact')}
            className="hidden md:flex items-center gap-2 bg-cyan-accent text-bg-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition-all hover:scale-105"
          >
            Free Consultation <ArrowUpRight size={16} strokeWidth={2.5} />
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
          <div className="md:hidden mt-4 pt-4 border-t border-border-card space-y-2">
            <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg bg-white/5 text-white font-medium transition">Home</button>
            <button onClick={() => { onNavigate('services'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition">Services</button>
            <button onClick={() => { onNavigate('portfolio'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition">Portfolio</button>
            <button onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition">Pricing</button>
            <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition">Contact</button>
            <div className="pt-2">
              <button 
                onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
                className="w-full flex justify-center items-center gap-2 bg-cyan-accent text-bg-primary px-6 py-3 rounded-xl font-bold text-sm"
              >
                Free Consultation <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
