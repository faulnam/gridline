import { Quote } from 'lucide-react';

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
  },
  {
    quote: "Their attention to detail and design is unparalleled. They delivered exactly what we needed, on time and on budget.",
    name: "David Kim",
    role: "CEO, TechNova",
    avatar: "from-purple-500 to-pink-500"
  },
  {
    quote: "We've seen a 50% increase in user engagement since launching the new site. The team is fantastic to work with.",
    name: "Emma Wilson",
    role: "Product Manager, GrowthFlow",
    avatar: "from-emerald-500 to-teal-500"
  }
];

export default function Testimonial() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 relative overflow-hidden bg-bg-primary">
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-marquee {
          animation: scrollLeft 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-cyan-accent/5 rounded-full blur-2xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyan-accent/5 rounded-full blur-2xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 text-center reveal">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our <span className="text-cyan-accent text-glow font-style-italic">Clients Say</span></h2>
      </div>

      <div className="relative w-full overflow-hidden flex">
        <div className="flex animate-marquee gap-6 px-3">
          {marqueeItems.map((t, idx) => (
            <div 
              key={idx}
              className="bg-bg-card rounded-2xl p-8 relative flex-shrink-0 w-[350px] md:w-[450px] border border-border-card hover:border-cyan-accent/50 hover:shadow-lg hover:shadow-cyan-accent/10 transition-all group"
            >
              {/* Quote Icon */}
              <Quote className="text-cyan-accent absolute top-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity" size={40} strokeWidth={1.5} />

              {/* Testimonial Content */}
              <div className="relative z-10 h-full flex flex-col">
                <p className="text-lg font-medium leading-relaxed mb-8 text-text-primary flex-grow pr-8">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatar}`}></div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-text-secondary text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
