import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const servicesData = [
  {
    id: 'web-design',
    label: 'Website Design',
    title: 'Website Design',
    description: 'Beautiful, modern websites that capture attention and convert visitors into customers. Mobile-first and user-focused.',
    price: 'Rp 1.500.000',
    features: [
      'Custom UI/UX Design',
      'Mobile Responsive Layout',
      'Interactive Animations',
      'Figma Source File',
      '3x Revisions'
    ]
  },
  {
    id: 'web-dev',
    label: 'Web Development',
    title: 'Web Development',
    description: 'Fast, secure, and scalable websites built with the latest technologies. Optimized for performance and SEO.',
    price: 'Rp 2.500.000',
    features: [
      'Full-stack Development',
      'Custom CMS Integration',
      'Fast Loading Speed',
      'Secure Architecture',
      '1 Year Free Maintenance'
    ]
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    title: 'E-commerce Solutions',
    description: 'Complete online stores that drive sales. From product pages to checkout, we build shopping experiences that convert.',
    price: 'Rp 4.000.000',
    features: [
      'Product Management System',
      'Payment Gateway Integration',
      'Order Tracking & Notification',
      'Sales Dashboard',
      'Scalable Database'
    ]
  },
  {
    id: 'seo',
    label: 'SEO Optimization',
    title: 'SEO Optimization',
    description: 'Get found on Google. We optimize your website to rank higher and attract more qualified organic traffic.',
    price: 'Rp 1.000.000',
    features: [
      'Comprehensive Keyword Research',
      'On-page & Off-page SEO',
      'Technical SEO Audit',
      'Competitor Analysis',
      'Monthly Performance Report'
    ]
  },
  {
    id: 'marketing',
    label: 'Digital Marketing',
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that reach your target audience and drive measurable results across all channels.',
    price: 'Rp 1.500.000',
    features: [
      'Meta & Google Ads Management',
      'Target Audience Profiling',
      'A/B Testing Campaigns',
      'Conversion Rate Optimization',
      'Weekly Analytics Report'
    ]
  },
  {
    id: 'branding',
    label: 'Brand Identity',
    title: 'Brand Identity',
    description: 'Stand out from the competition with a unique brand identity that resonates with your target audience.',
    price: 'Rp 2.000.000',
    features: [
      'Professional Logo Design',
      'Comprehensive Brand Guidelines',
      'Color Palette & Typography',
      'Social Media Kit',
      'Business Card & Stationery'
    ]
  }
];

export default function ServiceTabs({ onNavigate, onOpenChat }) {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  const activeService = servicesData.find(s => s.id === activeTab);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20 px-4">
      {/* Tabs Header */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {servicesData.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveTab(service.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeTab === service.id
                ? 'bg-cyan-accent text-bg-primary border-cyan-accent shadow-[0_0_15px_rgba(0,200,255,0.3)]'
                : 'bg-transparent text-text-secondary border-border-card hover:border-text-secondary hover:text-white'
            }`}
          >
            {service.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content Card */}
      <div className="bg-bg-card border border-border-card rounded-3xl p-6 md:p-10 relative overflow-hidden transition-all duration-500">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 relative z-10">
          {/* Left Side: Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-bg-card-alt border border-border-card flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-accent to-blue-500 opacity-80"></div>
              </div>
              <h3 className="text-3xl font-bold mb-4">{activeService.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {activeService.description}
              </p>
            </div>
            
            <div>
              <div className="text-text-tertiary text-sm mb-1">Mulai Dari</div>
              <div className="text-3xl font-bold text-cyan-accent mb-8">{activeService.price}</div>
              
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={() => onNavigate && onNavigate('contact')} className="bg-cyan-accent text-bg-primary px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition-all hover:scale-105">
                  Mulai Proyek
                </button>
                <button onClick={() => onOpenChat && onOpenChat()} className="bg-transparent border border-border-card text-white px-6 py-3 rounded-full font-bold text-sm hover:border-cyan-accent hover:text-cyan-accent transition-all">
                  Konsultasi Gratis
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Features Box */}
          <div className="bg-bg-card-alt border border-border-card rounded-2xl p-6 md:p-8 flex flex-col justify-center">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              Yang Anda Dapatkan
            </h4>
            <ul className="space-y-4">
              {activeService.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-accent shrink-0 mt-0.5" size={18} />
                  <span className="text-text-secondary text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
