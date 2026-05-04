export default function Hero({ onNavigate, onOpenChat }) {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Build Your Digital Presence That <span className="text-cyan-accent">Converts.</span>
            </h1>
            
            <p className="text-lg text-text-tertiary leading-relaxed">
              We create stunning websites and digital solutions that help your business grow. From design to development, we handle everything.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('portfolio')}
                className="bg-cyan-accent text-bg-primary px-8 py-3.5 rounded-full font-bold hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition"
              >
                View Our Work
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="border-2 border-cyan-accent text-cyan-accent px-8 py-3.5 rounded-full font-semibold hover:bg-cyan-accent hover:text-bg-primary transition"
              >
                Start Project
              </button>
              <button 
                onClick={onOpenChat}
                className="border-2 border-text-tertiary text-text-primary px-8 py-3.5 rounded-full font-semibold hover:border-cyan-accent hover:text-cyan-accent transition"
              >
                Let's Talk
              </button>
            </div>
            
            {/* Pricing CTA */}
            <div className="pt-4">
              <button 
                onClick={() => onNavigate('pricing')}
                className="text-cyan-accent hover:underline text-sm font-semibold"
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

          {/* Right Illustration */}
          <div className="relative h-[500px] flex items-center justify-center">
            <svg viewBox="0 0 400 500" className="w-full h-full animate-glow-pulse">
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E1E1E" strokeWidth="0.5"/>
                </pattern>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C8FF" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
              </defs>
              
              <rect width="400" height="500" fill="url(#grid)" opacity="0.3"/>
              
              {/* Diagonal Lines */}
              <line x1="120" y1="100" x2="180" y2="400" stroke="url(#lineGradient)" strokeWidth="20" strokeLinecap="round" opacity="0.9"/>
              <line x1="180" y1="100" x2="240" y2="400" stroke="url(#lineGradient)" strokeWidth="20" strokeLinecap="round" opacity="0.9"/>
              <line x1="240" y1="100" x2="300" y2="400" stroke="url(#lineGradient)" strokeWidth="20" strokeLinecap="round" opacity="0.9"/>
              
              {/* Connection Dots */}
              <circle cx="150" cy="150" r="4" fill="#00C8FF" className="animate-pulse"/>
              <circle cx="210" cy="200" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
              <circle cx="270" cy="250" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
              <circle cx="150" cy="350" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
              <circle cx="210" cy="300" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '1.2s'}}/>
              <circle cx="270" cy="350" r="4" fill="#00C8FF" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
