import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedWork from '../components/FeaturedWork';
import PricingPreview from '../components/PricingPreview';
import Testimonial from '../components/Testimonial';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

export default function Home({ onNavigate, onOpenChat }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} onOpenChat={onOpenChat} />
      <Services />
      <FeaturedWork onNavigate={onNavigate} />
      <Testimonial />
      <PricingPreview onNavigate={onNavigate} />
      <FAQ onNavigate={onNavigate} />
      <CTA onNavigate={onNavigate} />
    </div>
  );
}
