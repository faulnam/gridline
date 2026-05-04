import { ArrowUpRight } from 'lucide-react';

function ProjectCard({ company, industry, headline, description, stats, gradient }) {
  return (
    <div className="bg-bg-card border border-border-card rounded-xl overflow-hidden hover:border-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/20 transition-all duration-300 group">
      {/* Image Placeholder */}
      <div className={`h-64 bg-gradient-to-br ${gradient} relative`}>
        <div className="absolute top-4 left-4 bg-bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-lg">
          <div className="font-bold text-sm">{company}</div>
          <div className="text-xs text-text-secondary">{industry}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-bg-primary">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-accent transition">{headline}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-card">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-cyan-accent font-bold text-lg">{stat.value}</div>
              <div className="text-text-secondary text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork({ onNavigate }) {
  return (
    <section className="px-6 py-20 bg-bg-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">FEATURED WORK</div>
            <h2 className="text-4xl md:text-5xl font-bold">Real results for real businesses.</h2>
          </div>
          <button 
            onClick={() => onNavigate('portfolio')}
            className="text-cyan-accent hover:underline flex items-center gap-2 text-sm font-semibold"
          >
            View all work <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            company="NORTHLINE"
            industry="Industrial Equipment"
            headline="From unknown to industry leader"
            description="Branding, website, and SEO that drove a 215% increase in leads."
            gradient="from-orange-900 to-yellow-800"
            stats={[
              { value: '215%', label: 'More Leads' },
              { value: '140%', label: 'Organic Traffic' },
              { value: '2.6x', label: 'Conversion Rate' }
            ]}
          />
          <ProjectCard 
            company="LUMEN"
            industry="Home Lighting"
            headline="Scaling a DTC brand"
            description="Paid media and CRO that scaled revenue from $0 to $4M in 18 months."
            gradient="from-amber-700 to-orange-600"
            stats={[
              { value: '$4.2M+', label: 'Revenue' },
              { value: '3.1x', label: 'ROAS' },
              { value: '68%', label: 'Increase in AOV' }
            ]}
          />
          <ProjectCard 
            company="PRAIRIE"
            industry="Finance Co."
            headline="Modern brand. More trust."
            description="Rebrand and website that grew demo requests by 176%."
            gradient="from-blue-900 to-cyan-800"
            stats={[
              { value: '176%', label: 'More Demo Requests' },
              { value: '92%', label: 'Trust Score' },
              { value: '1.9x', label: 'Pipeline Growth' }
            ]}
          />
        </div>
      </div>
    </section>
  );
}
