export default function CTA({ onNavigate }) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-bg-card border border-border-card rounded-2xl p-12 md:p-16 relative overflow-hidden">
          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to <span className="text-cyan-accent">transform</span> your digital presence?
            </h2>
            <p className="text-text-tertiary text-lg mb-8">
              Let's create a website that drives real results for your business. Start your project today.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-cyan-accent text-bg-primary px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition"
              >
                Start Your Project →
              </button>
              <button 
                onClick={() => onNavigate('portfolio')}
                className="border-2 border-text-tertiary text-text-primary px-8 py-4 rounded-full font-bold text-lg hover:border-cyan-accent hover:text-cyan-accent transition"
              >
                View Our Work
              </button>
            </div>
          </div>

          {/* Background Illustration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10">
            <svg viewBox="0 0 300 400" className="w-full h-full">
              <defs>
                <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C8FF" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
              </defs>
              <line x1="80" y1="0" x2="140" y2="400" stroke="url(#ctaGradient)" strokeWidth="30" strokeLinecap="round"/>
              <line x1="140" y1="0" x2="200" y2="400" stroke="url(#ctaGradient)" strokeWidth="30" strokeLinecap="round"/>
              <line x1="200" y1="0" x2="260" y2="400" stroke="url(#ctaGradient)" strokeWidth="30" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
