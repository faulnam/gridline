import SEO from '../components/SEO';
import ServiceTabs from '../components/services/ServiceTabs';
import ServiceHighlight from '../components/services/ServiceHighlight';
import CostPlanner from '../components/services/CostPlanner';

export default function Services({ onNavigate, onOpenChat }) {
  return (
    <div className="pt-24 pb-10">
      <SEO 
        title="Layanan Kami - Gridline Digital"
        description="Jasa pembuatan website, aplikasi mobile, dan solusi digital lainnya dari Gridline."
      />

      {/* Header Section */}
      <div className="text-center px-6 mt-10 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Solutions & <span className="text-cyan-accent italic">Services</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Kami menyediakan solusi digital lengkap mulai dari desain, pengembangan sistem, hingga pemasaran digital untuk memaksimalkan potensi bisnis Anda.
        </p>
      </div>

      <ServiceTabs onNavigate={onNavigate} onOpenChat={onOpenChat} />
      
      <div className="border-t border-border-card/50"></div>
      
      <ServiceHighlight onNavigate={onNavigate} />
      
      <div className="border-t border-border-card/50"></div>
      
      <CostPlanner />
      
      <div className="border-t border-border-card/50"></div>
    </div>
  );
}
