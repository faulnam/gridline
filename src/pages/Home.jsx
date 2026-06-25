import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedWork from '../components/FeaturedWork';
import PricingPreview from '../components/PricingPreview';
import Testimonial from '../components/Testimonial';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

export default function Home({ onNavigate, onOpenChat }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gridline Digital",
    "image": "https://gridlinedigital.site/og-image.jpg",
    "url": "https://gridlinedigital.site/",
    "telephone": "+6281234567890",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jakarta",
      "addressLocality": "Jakarta",
      "addressRegion": "Jakarta",
      "postalCode": "10000",
      "addressCountry": "ID"
    }
  };

  return (
    <div>
      <SEO 
        title="Jasa Pembuatan Website & Aplikasi Mobile Terbaik - Gridline"
        description="Gridline Digital adalah agensi spesialis pembuatan website, aplikasi mobile, dan sistem informasi profesional untuk perkembangan bisnis Anda."
        url="https://gridlinedigital.site/"
        structuredData={structuredData}
      />
      <Hero onNavigate={onNavigate} onOpenChat={onOpenChat} />
      <Services />
      <FeaturedWork onNavigate={onNavigate} />
      <Testimonial />
      <PricingPreview onNavigate={onNavigate} />
      <CTA onNavigate={onNavigate} />
      <FAQ onNavigate={onNavigate} />
    </div>
  );
}
