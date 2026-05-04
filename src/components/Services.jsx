import { Target, Monitor, Code, Search, Megaphone, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { use3DScroll } from '../hooks/useScrollEffects';

function ServiceCard({ icon: Icon, title, description, delay }) {
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
        className="bg-bg-card border border-border-card rounded-xl p-8 hover:border-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/20 transition-all duration-500 group h-full"
        style={{ transition: 'transform 0.3s ease-out, border-color 0.3s, box-shadow 0.3s' }}
      >
        <Icon className="text-cyan-accent mb-4 group-hover:scale-110 transition-transform duration-300" size={32} strokeWidth={1.5} />
        <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-accent transition-colors duration-300">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="px-6 py-20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-accent/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 text-center reveal">
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
            delay={0}
          />
          <ServiceCard 
            icon={Code}
            title="Web Development"
            description="Fast, secure, and scalable websites built with the latest technologies. Optimized for performance and SEO."
            delay={100}
          />
          <ServiceCard 
            icon={Target}
            title="E-commerce Solutions"
            description="Complete online stores that drive sales. From product pages to checkout, we build shopping experiences that convert."
            delay={200}
          />
          <ServiceCard 
            icon={Search}
            title="SEO Optimization"
            description="Get found on Google. We optimize your website to rank higher and attract more qualified organic traffic."
            delay={300}
          />
          <ServiceCard 
            icon={Megaphone}
            title="Digital Marketing"
            description="Data-driven campaigns that reach your target audience and drive measurable results across all channels."
            delay={400}
          />
          <ServiceCard 
            icon={FileText}
            title="Brand Identity"
            description="Stand out from the competition with a unique brand identity that resonates with your target audience."
            delay={500}
          />
        </div>
      </div>
    </section>
  );
}
