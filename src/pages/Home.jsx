import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Services from '../components/Services';
import FeaturedWork from '../components/FeaturedWork';
import Process from '../components/Process';
import Testimonial from '../components/Testimonial';
import CTA from '../components/CTA';

export default function Home({ onNavigate, onOpenChat }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} onOpenChat={onOpenChat} />
      <Services />
      <Process />
      <FeaturedWork onNavigate={onNavigate} />
      <StatsBar />
      <Testimonial />
      <CTA onNavigate={onNavigate} />
    </div>
  );
}
