import { Check, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

function PricingCard({ name, price, description, features, highlighted, onGetStarted, onLetsTalk }) {
  return (
    <div className={`bg-bg-card border rounded-2xl p-8 ${highlighted ? 'border-cyan-accent shadow-lg shadow-cyan-accent/20 scale-105' : 'border-border-card'} transition-all duration-300 hover:scale-105`}>
      {highlighted && (
        <div className="bg-cyan-accent text-bg-primary text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
          MOST POPULAR
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
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
            <Check className="text-cyan-accent flex-shrink-0 mt-0.5" size={20} />
            <span className="text-sm text-text-tertiary">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        <button 
          onClick={onGetStarted}
          className={`w-full py-3 rounded-full font-semibold transition ${
            highlighted 
              ? 'bg-cyan-accent text-bg-primary hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50' 
              : 'border-2 border-text-tertiary text-text-primary hover:border-cyan-accent hover:text-cyan-accent'
          }`}
        >
          Get Started →
        </button>
        <button 
          onClick={onLetsTalk}
          className="w-full py-3 rounded-full font-semibold border border-border-card text-text-tertiary hover:border-cyan-accent hover:text-cyan-accent transition"
        >
          Let's Talk
        </button>
      </div>
    </div>
  );
}

export default function Pricing({ onNavigate, onOpenChat }) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <SEO 
        title="Harga Pembuatan Website & Aplikasi - Gridline"
        description="Temukan paket layanan digital yang paling sesuai untuk kebutuhan startup, bisnis kecil, maupun perusahaan besar."
        url="https://gridlinedigital.site/pricing"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">PRICING</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Simple, transparent pricing.</h1>
          <p className="text-text-tertiary text-lg max-w-3xl mx-auto">
            Choose the plan that fits your business. All plans include our proven process, dedicated support, and a focus on measurable results.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <PricingCard 
            name="Starter"
            price="$2,500"
            description="Perfect for startups and small businesses looking to establish their digital presence."
            features={[
              "Brand identity design",
              "5-page website design & development",
              "Mobile responsive",
              "Basic SEO setup",
              "1 month of support",
              "Analytics integration"
            ]}
            onGetStarted={() => onNavigate('contact')}
            onLetsTalk={onOpenChat}
          />

          <PricingCard 
            name="Business"
            price="$5,000"
            description="For growing businesses ready to scale with advanced marketing and optimization."
            features={[
              "Everything in Starter",
              "10-page website with CMS",
              "Advanced SEO strategy",
              "Conversion optimization",
              "Paid media setup (Google/Meta)",
              "3 months of support & optimization",
              "Monthly performance reports"
            ]}
            highlighted
            onGetStarted={() => onNavigate('contact')}
            onLetsTalk={onOpenChat}
          />

          <PricingCard 
            name="Enterprise"
            price="Custom"
            description="Tailored solutions for established brands with complex needs and ambitious goals."
            features={[
              "Everything in Business",
              "Custom website (unlimited pages)",
              "Full-scale digital strategy",
              "Multi-channel campaigns",
              "Dedicated account manager",
              "Ongoing optimization & scaling",
              "Priority support",
              "Custom integrations & automation"
            ]}
            onGetStarted={() => onNavigate('contact')}
            onLetsTalk={onOpenChat}
          />
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-bg-card border border-border-card rounded-xl p-6">
              <h3 className="font-bold mb-2">What's included in the monthly price?</h3>
              <p className="text-text-secondary text-sm">All plans include design, development, and ongoing support. Business and Enterprise plans also include optimization, reporting, and campaign management.</p>
            </div>
            <div className="bg-bg-card border border-border-card rounded-xl p-6">
              <h3 className="font-bold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-text-secondary text-sm">Yes! You can change your plan at any time. We'll work with you to ensure a smooth transition.</p>
            </div>
            <div className="bg-bg-card border border-border-card rounded-xl p-6">
              <h3 className="font-bold mb-2">Do you offer custom packages?</h3>
              <p className="text-text-secondary text-sm">Absolutely. If none of our standard plans fit your needs, we'll create a custom package tailored to your goals and budget.</p>
            </div>
            <div className="bg-bg-card border border-border-card rounded-xl p-6">
              <h3 className="font-bold mb-2">What's your refund policy?</h3>
              <p className="text-text-secondary text-sm">We offer a 30-day satisfaction guarantee. If you're not happy with our work, we'll make it right or provide a full refund.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-text-tertiary mb-6">Let's talk about your project and find the right solution for you.</p>
          <button 
            onClick={onOpenChat}
            className="bg-cyan-accent text-bg-primary px-8 py-4 rounded-full font-bold hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition"
          >
            Let's Talk →
          </button>
        </div>
      </div>
    </div>
  );
}
