import { Target, Monitor, Code, Search, Megaphone, FileText, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function ServiceCard({ icon: Icon, title, description }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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
      className={`bg-bg-card border border-border-card rounded-xl p-8 hover:border-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/20 hover:scale-105 transition-all duration-300 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <Icon className="text-cyan-accent mb-4" size={32} strokeWidth={1.5} />
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">WHAT WE DO</div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Services that drive real results.
          </h2>
          <p className="text-text-tertiary leading-relaxed max-w-3xl mx-auto">
            From design to development, we create digital solutions that help your business grow and succeed online.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            icon={Monitor}
            title="Website Design"
            description="Beautiful, modern websites that capture attention and convert visitors into customers. Mobile-first and user-focused."
          />
          <ServiceCard 
            icon={Code}
            title="Web Development"
            description="Fast, secure, and scalable websites built with the latest technologies. Optimized for performance and SEO."
          />
          <ServiceCard 
            icon={Target}
            title="E-commerce Solutions"
            description="Complete online stores that drive sales. From product pages to checkout, we build shopping experiences that convert."
          />
          <ServiceCard 
            icon={Search}
            title="SEO Optimization"
            description="Get found on Google. We optimize your website to rank higher and attract more qualified organic traffic."
          />
          <ServiceCard 
            icon={Megaphone}
            title="Digital Marketing"
            description="Data-driven campaigns that reach your target audience and drive measurable results across all channels."
          />
          <ServiceCard 
            icon={FileText}
            title="Brand Identity"
            description="Stand out from the competition with a unique brand identity that resonates with your target audience."
          />
        </div>
      </div>
    </section>
  );
}
