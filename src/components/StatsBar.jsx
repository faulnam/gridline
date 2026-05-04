import { Target, TrendingUp, BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function StatCard({ icon: Icon, number, label, description }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const target = number.includes('+') ? parseInt(number) : parseInt(number);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  return (
    <div ref={ref} className="flex items-start gap-4 p-6">
      <Icon className="text-cyan-accent mt-1" size={28} strokeWidth={1.5} />
      <div>
        <div className="text-4xl font-bold text-text-primary mb-1">
          {count}{number.includes('+') && '+'}{number.includes('x') && 'x'}
        </div>
        <div className="text-sm font-semibold text-text-primary mb-1">{label}</div>
        <div className="text-xs text-text-secondary">{description}</div>
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-bg-card border border-border-card rounded-2xl grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-card">
          <StatCard 
            icon={Target}
            number="50+"
            label="Brands launched"
            description="From startups to enterprise."
          />
          <StatCard 
            icon={TrendingUp}
            number="3x"
            label="Average conversion lift"
            description="Across website and campaigns."
          />
          <StatCard 
            icon={BarChart3}
            number="7"
            label="7-figure campaigns managed"
            description="Driving scalable growth."
          />
        </div>
      </div>
    </section>
  );
}
