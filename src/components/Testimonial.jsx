import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { use3DScroll } from '../hooks/useScrollEffects';

const testimonials = [
  {
    quote: "Gridline Digital transformed our brand and website—and the results speak for themselves. Their team is strategic, creative, and relentlessly focused on growth.",
    name: "Sarah Mitchell",
    role: "CMO, Northline Equipment",
    avatar: "from-orange-500 to-red-500"
  },
  {
    quote: "Working with Gridline was a game-changer. They didn't just build us a website—they built us a growth engine. Our revenue has tripled since launch.",
    name: "Michael Chen",
    role: "Founder, Lumen Lighting",
    avatar: "from-amber-500 to-orange-500"
  },
  {
    quote: "The rebrand and website exceeded our expectations. Demo requests are up 176%, and our sales team finally has the tools they need to close deals.",
    name: "Jennifer Park",
    role: "VP Marketing, Prairie Finance",
    avatar: "from-cyan-500 to-blue-500"
  }
];

export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef(null);
  
  use3DScroll(cardRef, { rotateX: 3, rotateY: 3, scale: 1.01 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 py-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-cyan-accent/5 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyan-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div 
          ref={cardRef}
          className="glass rounded-2xl p-12 md:p-16 relative reveal border border-border-card"
          style={{ transition: 'transform 0.3s ease-out' }}
        >
          {/* Quote Icon */}
          <Quote className="text-cyan-accent absolute top-8 left-8 opacity-20" size={64} strokeWidth={1.5} />

          {/* Testimonial Content */}
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-text-primary transition-all duration-500">
              "{testimonials[current].quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[current].avatar} transition-all duration-500`}></div>
              <div>
                <div className="font-bold text-lg">{testimonials[current].name}</div>
                <div className="text-text-secondary text-sm">{testimonials[current].role}</div>
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex gap-2 mt-8 justify-end">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current ? 'bg-cyan-accent w-8' : 'bg-border-card hover:bg-text-secondary w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
