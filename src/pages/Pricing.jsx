import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';

const CATEGORIES = [
  "Website Design",
  "Web Development",
  "E-Commerce",
  "SEO Optimization",
  "Digital Marketing",
  "Brand Identity"
];

const PRICING_DATA = {
  "Website Design": [
    {
      name: "Basic",
      price: "Rp 1.500.000",
      description: "Sempurna untuk personal brand atau landing page produk tunggal.",
      features: [
        "1 Halaman Landing Page",
        "Desain Responsif",
        "Form Kontak",
        "Optimasi Kecepatan Dasar",
        "Revisi 2 Kali"
      ]
    },
    {
      name: "Professional",
      price: "Rp 3.500.000",
      description: "Company profile profesional untuk bisnis yang sedang berkembang.",
      features: [
        "Hingga 5 Halaman Web",
        "Desain UI/UX Kustom",
        "Integrasi Media Sosial",
        "Optimasi SEO Dasar",
        "Dukungan Teknis 1 Bulan"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Solusi desain spesifik dan tak terbatas untuk perusahaan besar.",
      features: [
        "Halaman Tak Terbatas",
        "Prototyping & Wireframing",
        "Animasi Kustom (Micro-interactions)",
        "Sistem Desain (Design System)",
        "Prioritas Dukungan VIP"
      ]
    }
  ],
  "Web Development": [
    {
      name: "Starter",
      price: "Rp 2.500.000",
      description: "Pengembangan website statis dengan performa tinggi.",
      features: [
        "Website Statis Modern",
        "Hosting & Domain 1 Tahun",
        "Keamanan SSL",
        "Setup Google Analytics",
        "Maintenance Dasar"
      ]
    },
    {
      name: "Business",
      price: "Rp 5.500.000",
      description: "Website dinamis dengan sistem manajemen konten (CMS).",
      features: [
        "Website Dinamis (CMS)",
        "Panel Admin Kustom",
        "Integrasi API Dasar",
        "Optimasi Database",
        "Maintenance 3 Bulan"
      ],
      highlighted: true
    },
    {
      name: "Custom WebApp",
      price: "Mulai Rp 10.000.000",
      description: "Pengembangan web application kompleks sesuai kebutuhan.",
      features: [
        "Arsitektur Full-Stack",
        "Integrasi API Pihak Ketiga",
        "Manajemen Pengguna Kompleks",
        "Infrastruktur Cloud Berjenjang",
        "SLA & Dukungan Penuh"
      ]
    }
  ],
  "E-Commerce": [
    {
      name: "Basic Store",
      price: "Rp 4.000.000",
      description: "Toko online standar untuk mulai berjualan digital.",
      features: [
        "Katalog Hingga 50 Produk",
        "Integrasi Payment Gateway Dasar",
        "Keranjang Belanja",
        "Manajemen Pesanan Dasar",
        "Desain Responsif"
      ]
    },
    {
      name: "Pro Store",
      price: "Rp 7.500.000",
      description: "Platform e-commerce lengkap dengan fitur analitik.",
      features: [
        "Katalog Produk Tak Terbatas",
        "Multi-Payment & Logistik Otomatis",
        "Fitur Diskon & Kupon",
        "Sistem Inventaris",
        "Integrasi Pixel (Meta/Google)"
      ],
      highlighted: true
    },
    {
      name: "Marketplace",
      price: "Custom",
      description: "Solusi e-commerce skala besar atau sistem multi-vendor.",
      features: [
        "Sistem Multi-Vendor",
        "Aplikasi Mobile E-Commerce",
        "Loyalty & Reward Program",
        "Analitik Penjualan Lanjut",
        "Arsitektur Skala Besar"
      ]
    }
  ],
  "SEO Optimization": [
    {
      name: "Audit & Fix",
      price: "Rp 1.000.000",
      description: "Pemeriksaan dan perbaikan dasar teknis SEO website Anda.",
      features: [
        "Audit Teknis SEO Menyeluruh",
        "Perbaikan Meta Tags & Title",
        "Optimasi Kecepatan Laman",
        "Sitemap & Robots.txt Setup",
        "Laporan Audit 1 Kali"
      ]
    },
    {
      name: "Growth",
      price: "Rp 2.500.000/bln",
      description: "Optimasi berkelanjutan untuk mendominasi kata kunci.",
      features: [
        "Riset Keyword Mendalam",
        "Optimasi On-Page & Off-Page",
        "Pembuatan 4 Artikel SEO/Bulan",
        "Backlink Building Organik",
        "Laporan Peringkat Bulanan"
      ],
      highlighted: true
    },
    {
      name: "Dominance",
      price: "Rp 5.000.000/bln",
      description: "Strategi SEO agresif untuk ceruk pasar kompetitif.",
      features: [
        "Segala Fitur Paket Growth",
        "Pembuatan 10 Artikel SEO/Bulan",
        "Premium Guest Post & PR",
        "Audit Kompetitor Lanjut",
        "Konsultasi Strategi Mingguan"
      ]
    }
  ],
  "Digital Marketing": [
    {
      name: "Social Media",
      price: "Rp 1.500.000/bln",
      description: "Manajemen dan pertumbuhan media sosial organik.",
      features: [
        "12 Konten Feed/Bulan",
        "Desain Grafis Profesional",
        "Copywriting & Hashtag",
        "Penjadwalan Posting",
        "Laporan Engagement"
      ]
    },
    {
      name: "Performance Ads",
      price: "Rp 3.500.000/bln",
      description: "Kampanye iklan berbayar (Ads) yang berfokus pada konversi.",
      features: [
        "Setup Google Ads & Meta Ads",
        "A/B Testing Iklan",
        "Retargeting Audience",
        "Manajemen Anggaran Optimal",
        "Laporan ROAS Bulanan"
      ],
      highlighted: true
    },
    {
      name: "Omnichannel",
      price: "Custom",
      description: "Integrasi seluruh saluran pemasaran digital Anda.",
      features: [
        "Social Media + Performance Ads",
        "Email Marketing Automation",
        "Influencer/KOL Outreach",
        "Strategi Kampanye 360 Derajat",
        "Dashboard Analitik Terpusat"
      ]
    }
  ],
  "Brand Identity": [
    {
      name: "Logo Pack",
      price: "Rp 1.000.000",
      description: "Desain logo profesional untuk identitas awal bisnis Anda.",
      features: [
        "2 Konsep Logo Unik",
        "Revisi 3 Kali",
        "File Master Vector (AI/EPS)",
        "Palet Warna Dasar",
        "Tipografi Primer"
      ]
    },
    {
      name: "Brand Guideline",
      price: "Rp 2.500.000",
      description: "Buku pedoman identitas visual lengkap perusahaan.",
      features: [
        "Segala Fitur Logo Pack",
        "Buku Panduan Brand (PDF)",
        "Aturan Penggunaan Logo",
        "Desain Kartu Nama & Kop Surat",
        "Desain Template Sosmed"
      ],
      highlighted: true
    },
    {
      name: "Full Rebrand",
      price: "Mulai Rp 5.000.000",
      description: "Perombakan total atau penciptaan identitas visual dari nol.",
      features: [
        "Riset & Strategi Brand",
        "Identitas Visual Menyeluruh",
        "Desain Kemasan (Packaging)",
        "Desain Merchandise/Seragam",
        "Panduan Suara (Tone of Voice)"
      ]
    }
  ]
};

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
        {price.toLowerCase() === 'custom' || price.startsWith('Mulai') ? (
          <div className="text-3xl font-bold text-cyan-accent">{price}</div>
        ) : (
          <div className="text-3xl font-bold text-cyan-accent">{price}</div>
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
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  
  const currentPricing = PRICING_DATA[activeCategory] || PRICING_DATA["Website Design"];

  return (
    <div className="min-h-screen pt-24 pb-0">
      <SEO 
        title="Harga & Paket Layanan Digital - Gridline"
        description="Temukan paket layanan digital yang paling sesuai untuk kebutuhan startup, bisnis kecil, maupun perusahaan besar. Transparan dan kompetitif."
        url="https://gridlinedigital.site/pricing"
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">PRICING</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, transparent pricing.</h1>
          <p className="text-text-tertiary text-lg max-w-3xl mx-auto">
            Pilih paket yang paling sesuai dengan target bisnis Anda. Semua paket dirancang dengan fokus pada kualitas dan hasil (ROI) yang terukur.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? 'bg-cyan-accent text-bg-primary border-cyan-accent shadow-[0_0_15px_rgba(0,200,255,0.3)]'
                  : 'bg-bg-card text-text-secondary border-border-card hover:border-text-secondary hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {currentPricing.map((pkg, idx) => (
            <PricingCard 
              key={idx}
              name={pkg.name}
              price={pkg.price}
              description={pkg.description}
              features={pkg.features}
              highlighted={pkg.highlighted}
              onGetStarted={() => onNavigate('contact')}
              onLetsTalk={onOpenChat}
            />
          ))}
        </div>
      </div>
      
      
    </div>
  );
}
