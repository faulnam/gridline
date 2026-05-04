import { Check, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { use3DScroll } from '../hooks/useScrollEffects';

function PricingCard({ name, price, description, features, highlighted, onGetStarted, delay }) {
  const cardRef = useRef(null);
  use3DScroll(cardRef, { rotateX: 5, rotateY: 5, scale: 1.03 });

  return (
    <div 
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        ref={cardRef}
        className={`bg-bg-card border rounded-2xl p-8 h-full ${
          highlighted 
            ? 'border-cyan-accent shadow-lg shadow-cyan-accent/20 scale-105' 
            : 'border-border-card'
        } transition-all duration-500 hover:scale-105 group`}
        style={{ transition: 'transform 0.3s ease-out, border-color 0.3s, box-shadow 0.3s' }}
      >
        {highlighted && (
          <div className="bg-cyan-accent text-bg-primary text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
            MOST POPULAR
          </div>
        )}
        
        <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-accent transition-colors duration-300">{name}</h3>
        <div className="mb-4">
          {price === 'Custom' ? (
            <div className="text-4xl font-bold text-cyan-accent">Custom</div>
          ) : (
            <div className="text-4xl font-bold text-cyan-accent">{price}<span className="text-lg text-text-secondary">/month</span></div>
          )}
        </div>
        <p className="text-text-secondary text-sm mb-8">{description}</p>

        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="text-cyan-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" size={20} />
              <span className="text-sm text-text-tertiary">{feature}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={onGetStarted}
          className={`w-full py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
            highlighted 
              ? 'bg-cyan-accent text-bg-primary hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50' 
              : 'border-2 border-text-tertiary text-text-primary hover:border-cyan-accent hover:text-cyan-accent'
          }`}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default function PricingPreview({ onNavigate }) {
  return (
    <section className="px-6 py-16 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">PRICING</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing.</h2>
          <p className="text-text-tertiary text-lg max-w-3xl mx-auto">
            Choose the plan that fits your business. All plans include our proven process and dedicated support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <PricingCard 
            name="Starter"
            price="$2,500"
            description="Perfect for startups and small businesses."
            features={[
              "Brand identity design",
              "5-page website",
              "Mobile responsive",
              "Basic SEO setup",
              "1 month support"
            ]}
            onGetStarted={() => onNavigate('contact')}
            delay={0}
          />

          <PricingCard 
            name="Business"
            price="$5,000"
            description="For growing businesses ready to scale."
            features={[
              "Everything in Starter",
              "10-page website with CMS",
              "Advanced SEO strategy",
              "Paid media setup",
              "3 months support"
            ]}
            highlighted
            onGetStarted={() => onNavigate('contact')}
            delay={100}
          />

          <PricingCard 
            name="Enterprise"
            price="Custom"
            description="Tailored solutions for established brands."
            features={[
              "Everything in Business",
              "Unlimited pages",
              "Full digital strategy",
              "Dedicated manager",
              "Priority support"
            ]}
            onGetStarted={() => onNavigate('contact')}
            delay={200}
          />
        </div>

        {/* View All Pricing CTA */}
        <div className="text-center reveal">
          <button 
            onClick={() => onNavigate('pricing')}
            className="text-cyan-accent hover:underline text-sm font-semibold inline-flex items-center gap-2 group transition-all duration-300"
          >
            View detailed pricing <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
