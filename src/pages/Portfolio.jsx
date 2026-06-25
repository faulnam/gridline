import { ArrowLeft, ArrowUpRight, Laptop, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';

const projects = [
  {
    id: 1,
    company: "NORTHLINE",
    industry: "Industrial Equipment",
    headline: "From unknown to industry leader",
    description: "Branding, website, and SEO that drove a 215% increase in leads.",
    gradient: "from-orange-900 to-yellow-800",
    stats: [
      { value: '215%', label: 'More Leads' },
      { value: '140%', label: 'Organic Traffic' },
      { value: '2.6x', label: 'Conversion Rate' }
    ],
    problem: "Northline Equipment was invisible online. Despite offering premium industrial equipment, they had no brand presence, an outdated website, and zero organic traffic.",
    solution: "We built a bold industrial brand identity, designed a conversion-focused website, and implemented a technical SEO strategy targeting high-intent keywords.",
    result: "Within 12 months, Northline became a recognized name in their industry, with leads up 215% and organic traffic growing 140%."
  },
  {
    id: 2,
    company: "LUMEN",
    industry: "Home Lighting",
    headline: "Scaling a DTC brand",
    description: "Paid media and CRO that scaled revenue from $0 to $4M in 18 months.",
    gradient: "from-amber-700 to-orange-600",
    stats: [
      { value: '$4.2M+', label: 'Revenue' },
      { value: '3.1x', label: 'ROAS' },
      { value: '68%', label: 'Increase in AOV' }
    ],
    problem: "Lumen had a great product but no customers. They needed to launch their DTC brand and scale profitably from day one.",
    solution: "We launched targeted paid media campaigns across Meta and Google, optimized their website for conversions, and implemented a retention strategy.",
    result: "Lumen scaled from $0 to $4.2M in revenue in 18 months, maintaining a 3.1x ROAS while increasing average order value by 68%."
  },
  {
    id: 3,
    company: "PRAIRIE",
    industry: "Finance Co.",
    headline: "Modern brand. More trust.",
    description: "Rebrand and website that grew demo requests by 176%.",
    gradient: "from-blue-900 to-cyan-800",
    stats: [
      { value: '176%', label: 'More Demo Requests' },
      { value: '92%', label: 'Trust Score' },
      { value: '1.9x', label: 'Pipeline Growth' }
    ],
    problem: "Prairie Finance looked outdated and untrustworthy. Their brand didn't reflect their expertise, and their website wasn't converting visitors into leads.",
    solution: "We rebranded Prairie with a modern, professional identity and built a trust-focused website designed to convert visitors into qualified demo requests.",
    result: "Demo requests increased 176%, trust scores hit 92%, and their sales pipeline grew 1.9x within 6 months."
  },
  {
    id: 4,
    company: "VERTEX",
    industry: "SaaS Platform",
    headline: "Product-led growth at scale",
    description: "Website redesign and content strategy that tripled signups.",
    gradient: "from-purple-900 to-indigo-800",
    stats: [
      { value: '3x', label: 'Signups' },
      { value: '45%', label: 'Trial-to-Paid' },
      { value: '2.1x', label: 'MRR Growth' }
    ],
    problem: "Vertex had a powerful SaaS product but struggled to communicate its value. Their website was confusing, and signup rates were low.",
    solution: "We redesigned their website with clear messaging, built a content hub to educate prospects, and optimized the signup flow.",
    result: "Signups tripled, trial-to-paid conversion hit 45%, and monthly recurring revenue grew 2.1x."
  },
  {
    id: 5,
    company: "SUMMIT",
    industry: "Outdoor Gear",
    headline: "E-commerce that converts",
    description: "Shopify redesign and email marketing that doubled revenue.",
    gradient: "from-green-900 to-teal-800",
    stats: [
      { value: '2x', label: 'Revenue' },
      { value: '85%', label: 'Email Open Rate' },
      { value: '3.8x', label: 'LTV' }
    ],
    problem: "Summit Outdoor had loyal customers but a clunky e-commerce experience. Cart abandonment was high, and email marketing was non-existent.",
    solution: "We rebuilt their Shopify store with a focus on UX, implemented abandoned cart flows, and launched a retention email strategy.",
    result: "Revenue doubled, email open rates hit 85%, and customer lifetime value increased 3.8x."
  },
  {
    id: 6,
    company: "NEXUS",
    industry: "B2B Consulting",
    headline: "Thought leadership that drives leads",
    description: "Content strategy and LinkedIn campaigns that generated 500+ qualified leads.",
    gradient: "from-slate-800 to-gray-700",
    stats: [
      { value: '500+', label: 'Qualified Leads' },
      { value: '12%', label: 'Engagement Rate' },
      { value: '4.2x', label: 'Pipeline Value' }
    ],
    problem: "Nexus Consulting had expertise but no visibility. They needed to establish thought leadership and generate high-quality B2B leads.",
    solution: "We built a content strategy around their expertise, launched LinkedIn campaigns, and created lead magnets to capture interest.",
    result: "Generated 500+ qualified leads, achieved 12% engagement rates, and increased pipeline value 4.2x."
  }
];

function ProjectCard({ project, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-bg-card border border-border-card rounded-xl overflow-hidden hover:border-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/20 transition-all duration-300 cursor-pointer group"
    >
      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative`}>
        <div className="absolute top-4 left-4 bg-bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-lg">
          <div className="font-bold text-sm">{project.company}</div>
          <div className="text-xs text-text-secondary">{project.industry}</div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-accent transition">{project.headline}</h3>
        <p className="text-text-secondary text-sm">{project.description}</p>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, onContact, onOpenChat }) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <SEO 
        title={`${project.company} - Portfolio | Gridline`}
        description={project.description}
        url={`https://gridlinedigital.site/portfolio`}
      />
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-accent hover:underline mb-8"
        >
          <ArrowLeft size={20} /> Back to all work
        </button>

        {/* Hero */}
        <div className={`h-96 bg-gradient-to-br ${project.gradient} rounded-2xl mb-12 relative`}>
          <div className="absolute bottom-8 left-8 bg-bg-primary/80 backdrop-blur-sm px-6 py-3 rounded-lg">
            <div className="font-bold text-2xl">{project.company}</div>
            <div className="text-sm text-text-secondary">{project.industry}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {project.stats.map((stat, idx) => (
            <div key={idx} className="bg-bg-card border border-border-card rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-cyan-accent mb-2">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Problem</h2>
            <p className="text-text-tertiary text-lg leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">The Solution</h2>
            <p className="text-text-tertiary text-lg leading-relaxed">{project.solution}</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">The Result</h2>
            <p className="text-text-tertiary text-lg leading-relaxed">{project.result}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-bg-card border border-border-card rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready for results like these?</h3>
          <p className="text-text-tertiary mb-8">Let's build a strategy that drives real growth for your business.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={onContact}
              className="bg-cyan-accent text-bg-primary px-8 py-4 rounded-full font-bold hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition"
            >
              Start Your Project →
            </button>
            <button 
              onClick={onOpenChat}
              className="border-2 border-cyan-accent text-cyan-accent px-8 py-4 rounded-full font-bold hover:bg-cyan-accent hover:text-bg-primary transition"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ onNavigate, onOpenChat }) {
  const [selectedProject, setSelectedProject] = useState(null);

  if (selectedProject) {
    return (
      <ProjectDetail 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)}
        onContact={() => onNavigate('contact')}
        onOpenChat={onOpenChat}
      />
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <SEO 
        title="Portfolio Pembuatan Website & Aplikasi - Gridline"
        description="Lihat hasil kerja terbaik kami dalam merancang antarmuka yang memukau dan sistem yang andal untuk klien kami."
        url="https://gridlinedigital.site/portfolio"
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">OUR WORK</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Real results for real businesses.</h1>
          <p className="text-text-tertiary text-lg max-w-3xl">
            We partner with ambitious brands to build digital experiences that drive measurable growth. Here's a look at some of our recent work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}
