import { useRef } from 'react';
import { use3DScroll, useParallax } from '../hooks/useScrollEffects';

export default function Hero({ onNavigate, onOpenChat }) {
  const heroRef = useRef(null);
  const illustrationRef = useRef(null);
  const parallaxOffset = useParallax(0.3);
  
  use3DScroll(illustrationRef, { rotateX: 5, rotateY: 5, scale: 1.01 });

  return (
    <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translateY(${parallaxOffset}px)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 reveal" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Websites that elevate your brand <span className="text-cyan-accent text-glow">Result.</span>
            </h1>
            
            <p className="text-lg text-text-tertiary leading-relaxed">
              We create stunning websites and digital solutions that help your business grow. From design to development, we handle everything.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('portfolio')}
                className="bg-cyan-accent text-bg-primary px-8 py-3.5 rounded-full font-bold hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition-all duration-300 hover:scale-105"
              >
                View Our Work
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="border-2 border-cyan-accent text-cyan-accent px-8 py-3.5 rounded-full font-semibold hover:bg-cyan-accent hover:text-bg-primary transition-all duration-300 hover:scale-105"
              >
                Start Project
              </button>
              <button 
                onClick={onOpenChat}
                className="border-2 border-text-tertiary text-text-primary px-8 py-3.5 rounded-full font-semibold hover:border-cyan-accent hover:text-cyan-accent transition-all duration-300 hover:scale-105"
              >
                Let's Talk
              </button>
            </div>
            
            {/* Pricing CTA */}
            <div className="pt-4">
              <button 
                onClick={() => onNavigate('pricing')}
                className="text-cyan-accent hover:underline text-sm font-semibold transition-all duration-300 hover:translate-x-2 inline-block"
              >
                View Pricing →
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-accent to-blue-500 border-2 border-bg-primary"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-bg-primary"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-bg-primary"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 border-2 border-bg-primary"></div>
              </div>
              <div>
                <div className="text-cyan-accent text-sm">⭐⭐⭐⭐⭐</div>
                <p className="text-xs text-text-secondary mt-1">Trusted by founders and marketing teams across North America.</p>
              </div>
            </div>
          </div>

          {/* Right 3D Illustration */}
          <div 
            ref={illustrationRef}
            className="relative h-[600px] flex items-center justify-center"
            style={{ transition: 'transform 0.3s ease-out' }}
          >
            {/* 3D SVG Illustration */}
            <svg viewBox="0 0 400 500" className="w-full h-full animate-float">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E1E1E" strokeWidth="0.5"/>
                </pattern>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C8FF" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <rect width="400" height="500" fill="url(#grid)" opacity="0.3"/>
              
              {/* Diagonal Lines with 3D effect */}
              <g filter="url(#glow)">
                <line x1="120" y1="100" x2="180" y2="400" stroke="url(#lineGradient)" strokeWidth="20" strokeLinecap="round" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
                </line>
                <line x1="180" y1="100" x2="240" y2="400" stroke="url(#lineGradient)" strokeWidth="20" strokeLinecap="round" opacity="0.9">
                  <animate attributeName="opacity" values="1;0.9;1" dur="3s" repeatCount="indefinite"/>
                </line>
                <line x1="240" y1="100" x2="300" y2="400" stroke="url(#lineGradient)" strokeWidth="20" strokeLinecap="round" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
                </line>
              </g>
              
              {/* Connection Dots with pulse */}
              <circle cx="150" cy="150" r="4" fill="#00C8FF" className="animate-pulse"/>
              <circle cx="210" cy="200" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
              <circle cx="270" cy="250" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
              <circle cx="150" cy="350" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
              <circle cx="210" cy="300" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '1.2s'}}/>
              <circle cx="270" cy="350" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
              
              {/* Floating particles */}
              <circle cx="100" cy="200" r="2" fill="#00C8FF" opacity="0.5">
                <animate attributeName="cy" values="200;180;200" dur="4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="320" cy="300" r="2" fill="#00C8FF" opacity="0.5">
                <animate attributeName="cy" values="300;280;300" dur="5s" repeatCount="indefinite"/>
              </circle>
            </svg>
            
            {/* 3D Floating Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-accent/10 rounded-lg animate-float" style={{ animationDelay: '0.5s', transform: 'rotateX(45deg) rotateY(45deg)' }}></div>
            <div className="absolute bottom-20 left-10 w-16 h-16 bg-cyan-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating particles around */}
            <div className="absolute top-10 right-10 w-3 h-3 bg-cyan-accent rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-accent/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 right-20 w-2 h-2 bg-cyan-accent/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-10 left-20 w-3 h-3 bg-cyan-accent rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
