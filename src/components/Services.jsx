import { Monitor, Code, ShoppingCart, Search, Megaphone, FileText, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { use3DScroll } from '../hooks/useScrollEffects';

const servicesData = [
  {
    id: 'web-design',
    icon: Monitor,
    title: 'Website Design',
    description: 'Beautiful, modern websites that capture attention and convert visitors into customers.',
    tags: ['UI/UX Design', 'Mobile Responsive', 'Figma Source'],
    price: 'Rp 1.500.000',
  },
  {
    id: 'web-dev',
    icon: Code,
    title: 'Web Development',
    description: 'Fast, secure, and scalable websites built with the latest technologies and optimized for SEO.',
    tags: ['Full-stack', 'CMS Custom', 'Fast Loading'],
    price: 'Rp 2.500.000',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Toko online modern dengan sistem belanja terstruktur, lengkap dengan katalog produk dan checkout.',
    tags: ['Katalog Produk', 'Payment Gateway', 'Integrasi WA'],
    price: 'Rp 4.000.000',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO Optimization',
    description: 'Tingkatkan peringkat website Anda di Google dan datangkan lebih banyak traffic organik berkualitas.',
    tags: ['Keyword Research', 'On-page SEO', 'Audit Report'],
    price: 'Rp 1.000.000',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Kampanye berbasis data yang menjangkau target audiens dan mendorong hasil terukur di berbagai channel.',
    tags: ['Meta Ads', 'Google Ads', 'A/B Testing'],
    price: 'Rp 1.500.000',
  },
  {
    id: 'branding',
    icon: FileText,
    title: 'Brand Identity',
    description: 'Tampil menonjol dari kompetitor dengan identitas visual merek yang unik dan mudah diingat.',
    tags: ['Logo Design', 'Brand Guideline', 'Sosmed Kit'],
    price: 'Rp 2.000.000',
  }
];

function ServiceCard({ icon: Icon, title, description, tags, price, delay, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const cardRef = useRef(null);
  
  use3DScroll(cardRef, { rotateX: 8, rotateY: 8, scale: 1.05 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`reveal ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        ref={cardRef}
        className="bg-bg-card border border-border-card rounded-2xl p-6 md:p-8 hover:border-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/20 transition-all duration-500 group flex flex-col h-full"
        style={{ transition: 'transform 0.3s ease-out, border-color 0.3s, box-shadow 0.3s' }}
      >
        <div className="w-12 h-12 rounded-xl bg-bg-card-alt border border-border-card flex items-center justify-center mb-6 group-hover:border-cyan-accent/50 transition-colors duration-300">
          <Icon className="text-cyan-accent group-hover:scale-110 transition-transform duration-300" size={24} strokeWidth={2} />
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        
        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-bg-card-alt border border-border-card text-text-tertiary text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md group-hover:border-cyan-accent/30 group-hover:text-cyan-accent transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Footer: Price & Button */}
        <div className="mt-auto pt-6 border-t border-border-card/50 space-y-4">
          <div>
            <div className="text-xs text-text-tertiary mb-1">Starting from</div>
            <div className="text-xl font-bold text-cyan-accent">{price}</div>
          </div>
          
          <button 
            onClick={() => onNavigate && onNavigate('services')}
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-border-card text-white py-3 rounded-xl font-bold text-sm hover:bg-cyan-accent hover:text-bg-primary hover:border-cyan-accent transition-all duration-300 group/btn"
          >
            Learn More <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Services({ onNavigate }) {
  return (
    <section id="services" className="px-6 py-20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-accent/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">WHAT WE DO</div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Services that drive real results.
          </h2>
          <p className="text-text-tertiary leading-relaxed max-w-3xl mx-auto">
            Dari desain web hingga strategi pemasaran digital, kami menciptakan solusi digital cerdas yang siap membantu digitalisasi bisnis Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tags={service.tags}
              price={service.price}
              delay={index * 100}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
