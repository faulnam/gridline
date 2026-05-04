import { Compass, Scissors, Code, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import { use3DScroll } from '../hooks/useScrollEffects';

function ProcessStep({ number, icon: Icon, title, description, isLast }) {
  const stepRef = useRef(null);
  use3DScroll(stepRef, { rotateX: 5, rotateY: 5, scale: 1.05 });

  return (
    <div className="flex flex-col items-center text-center relative reveal">
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 border-t-2 border-dashed border-border-card"></div>
      )}
      
      {/* Icon Circle */}
      <div 
        ref={stepRef}
        className="bg-bg-card border-2 border-cyan-accent rounded-full w-24 h-24 flex items-center justify-center mb-6 relative z-10 group-hover:shadow-lg group-hover:shadow-cyan-accent/30 transition-all duration-300"
        style={{ transition: 'transform 0.3s ease-out, box-shadow 0.3s' }}
      >
        <Icon className="text-cyan-accent group-hover:scale-110 transition-transform duration-300" size={36} strokeWidth={1.5} />
      </div>

      {/* Number */}
      <div className="text-5xl font-bold text-cyan-accent/20 mb-2 group-hover:text-cyan-accent/40 transition-colors duration-300">{number}</div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-accent transition-colors duration-300">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed max-w-xs">{description}</p>
    </div>
  );
}

export default function Process() {
  return (
    <section className="px-6 py-20 bg-bg-card/30 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">HOW WE WORK</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple process. Powerful results.</h2>
          <p className="text-text-tertiary max-w-2xl mx-auto">
            We follow a proven process to deliver exceptional results on time and on budget.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 group">
          <ProcessStep 
            number="01"
            icon={Compass}
            title="Discover"
            description="We learn about your business, goals, and target audience to create the perfect strategy."
          />
          <ProcessStep 
            number="02"
            icon={Scissors}
            title="Design"
            description="We create beautiful designs that reflect your brand and engage your audience."
          />
          <ProcessStep 
            number="03"
            icon={Code}
            title="Build"
            description="We develop your website with clean code, fast performance, and seamless functionality."
          />
          <ProcessStep 
            number="04"
            icon={TrendingUp}
            title="Launch & Grow"
            description="We launch your site and provide ongoing support to help your business grow."
            isLast
          />
        </div>
      </div>
    </section>
  );
}
