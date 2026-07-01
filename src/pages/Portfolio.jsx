import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';

const CATEGORIES = [
  "Semua",
  "Website Design",
  "Web Development",
  "E-Commerce",
  "SEO Optimization",
  "Digital Marketing",
  "Brand Identity"
];

const projects = [
  {
    id: 1,
    company: "Desa Digital",
    category: "Website Design",
    tags: ["Figma", "UI/UX", "Tailwind CSS"],
    gradient: "from-blue-600 to-cyan-500",
    headline: "Profil Desa Modern",
    description: "Proyek desain website profil desa yang dirancang untuk meningkatkan transparansi, layanan informasi, dan branding publik.",
    stats: [
      { value: '120%', label: 'Peningkatan Akses' },
      { value: '95%', label: 'Kepuasan Warga' },
      { value: '3x', label: 'Lebih Cepat' }
    ],
    problem: "Pemerintah desa kesulitan menyebarkan informasi publik secara cepat dan modern, sehingga banyak warga tertinggal informasi penting.",
    solution: "Kami merancang antarmuka (UI/UX) website desa yang ramah pengguna, mudah diakses di smartphone, dan menampilkan potensi desa dengan visual yang memukau.",
    result: "Meningkatkan engagement warga secara signifikan dan mempercepat proses distribusi informasi dari hari menjadi hitungan menit."
  },
  {
    id: 2,
    company: "FinTrack",
    category: "Web Development",
    tags: ["Laravel", "React", "MySQL"],
    gradient: "from-indigo-600 to-purple-500",
    headline: "Expense Management System",
    description: "Sistem aplikasi berbasis web (SaaS) internal yang dirancang untuk mengelola arus kas dan melacak pengeluaran perusahaan secara real-time.",
    stats: [
      { value: '100%', label: 'Akurasi Data' },
      { value: '45j', label: 'Hemat Waktu/Bulan' },
      { value: 'Zero', label: 'Data Loss' }
    ],
    problem: "Klien menggunakan spreadsheet manual untuk melacak pengeluaran, yang sering menyebabkan kesalahan pencatatan dan memakan banyak waktu rekonsiliasi.",
    solution: "Membangun sistem manajemen keuangan kustom dengan dashboard analitik real-time, manajemen otorisasi berjenjang, dan pencatatan terenkripsi.",
    result: "Tim finansial menghemat 45 jam kerja setiap bulannya dengan tingkat akurasi laporan keuangan mencapai 100%."
  },
  {
    id: 3,
    company: "EduSmart",
    category: "Web Development",
    tags: ["Node.js", "Vue", "MongoDB"],
    gradient: "from-emerald-600 to-teal-500",
    headline: "Smart School Attendance",
    description: "Aplikasi absensi sekolah pintar untuk mencatat kehadiran siswa secara digital berbasis scan QR code dan dashboard pantauan guru.",
    stats: [
      { value: '2000+', label: 'Siswa Aktif' },
      { value: '99%', label: 'Uptime' },
      { value: 'Real-time', label: 'Notifikasi' }
    ],
    problem: "Sistem absensi manual di sekolah memakan waktu belajar efektif dan menyulitkan orang tua untuk mengetahui status kehadiran anak.",
    solution: "Mengembangkan aplikasi berbasis PWA (Progressive Web App) dengan sistem QR Code dinamis untuk absensi instan di gerbang sekolah.",
    result: "Absensi selesai 4x lebih cepat dan orang tua langsung menerima notifikasi WhatsApp saat anak tiba di sekolah."
  },
  {
    id: 4,
    company: "GlowUp",
    category: "E-Commerce",
    tags: ["Shopify", "Liquid", "JS"],
    gradient: "from-pink-600 to-rose-500",
    headline: "Toko Online Kosmetik",
    description: "Transformasi pengalaman belanja brand kecantikan (skincare) dengan fitur kustom bundle produk dan integrasi logistik otomatis.",
    stats: [
      { value: '2x', label: 'Kenaikan Omzet' },
      { value: '68%', label: 'Repeat Order' },
      { value: '3.1x', label: 'ROAS' }
    ],
    problem: "Tingginya tingkat cart abandonment dan proses operasional pengiriman barang yang masih direkap secara manual.",
    solution: "Mendesain ulang perjalanan belanja pengguna, menambahkan fitur upsell produk bundle, dan mengotomatiskan pencetakan resi.",
    result: "Meningkatkan omzet bulanan hingga 2 kali lipat dan menekan kesalahan pengiriman barang menjadi 0%."
  },
  {
    id: 5,
    company: "Dimsumcuy",
    category: "Brand Identity",
    tags: ["Illustrator", "Photoshop"],
    gradient: "from-orange-500 to-red-500",
    headline: "Rebranding F&B Lokal",
    description: "Proyek pembaruan identitas visual untuk brand F&B Dimsumcuy, menciptakan tampilan yang lebih segar, modern, dan appetizing.",
    stats: [
      { value: '35%', label: 'Brand Awareness' },
      { value: 'New', label: 'Packaging' },
      { value: 'Viral', label: 'Sosmed' }
    ],
    problem: "Identitas visual brand yang lama terlihat kusam dan tidak mencerminkan kualitas premium dari rasa produk dimsum yang ditawarkan.",
    solution: "Mendesain ulang logo, merumuskan color palette baru (merah-oranye cerah), dan merancang guidelines untuk packaging serta feed media sosial.",
    result: "Packaging baru sukses menarik perhatian pelanggan baru, meningkatkan penjualan offline, dan membuat konten organik lebih viral."
  },
  {
    id: 6,
    company: "Nexus B2B",
    category: "Digital Marketing",
    tags: ["Google Ads", "Meta Ads", "Analytics"],
    gradient: "from-slate-600 to-gray-500",
    headline: "B2B Lead Generation",
    description: "Kampanye pemasaran digital komprehensif menggunakan LinkedIn Ads dan Google Search untuk menghasilkan prospek berkualitas (B2B leads).",
    stats: [
      { value: '500+', label: 'Qualified Leads' },
      { value: '12%', label: 'Konversi' },
      { value: '4.2x', label: 'ROI' }
    ],
    problem: "Perusahaan konsultan kesulitan menemukan klien B2B baru melalui metode pemasaran tradisional dan pameran luring.",
    solution: "Merancang funnel iklan tertarget di platform profesional, membuat landing page khusus yang konvertif, dan menyusun strategi retargeting.",
    result: "Menghasilkan lebih dari 500 leads perusahaan dalam 3 bulan, dengan Return on Investment (ROI) mencapai 4.2x."
  }
];

function ProjectCard({ project, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-bg-card border border-border-card rounded-2xl overflow-hidden hover:border-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/20 transition-all duration-300 cursor-pointer group flex flex-col h-full"
    >
      {/* Visual Mockup Section */}
      <div className="flex justify-center items-center bg-zinc-900/50 pt-10 pb-6 border-b border-border-card relative overflow-hidden">
        {/* Glow effect behind laptop */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
        
        {/* Laptop Mockup */}
        <div className="relative w-4/5 max-w-[260px] z-10 group-hover:scale-105 transition-transform duration-500">
          <div className="relative w-full aspect-[16/10] bg-black border-[8px] border-zinc-800 rounded-t-xl shadow-2xl overflow-hidden flex flex-col">
            <div className="w-full h-3 bg-zinc-900 border-b border-zinc-700 flex items-center px-1.5 gap-1 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80"></div>
            </div>
            {/* Screen Content */}
            <div className={`flex-1 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex flex-col p-3 opacity-90`}>
              <div className="w-full flex justify-between items-center mb-4">
                <div className="w-8 h-1.5 bg-white/40 rounded"></div>
                <div className="flex gap-1">
                  <div className="w-4 h-1 bg-white/30 rounded"></div>
                  <div className="w-4 h-1 bg-white/30 rounded"></div>
                </div>
              </div>
              <div className="w-3/4 h-2 bg-white/50 rounded mb-2"></div>
              <div className="w-1/2 h-2 bg-white/30 rounded mb-4"></div>
              <div className="w-full h-1 bg-white/20 rounded mb-1"></div>
              <div className="w-5/6 h-1 bg-white/20 rounded"></div>
            </div>
          </div>
          {/* Base */}
          <div className="relative w-[115%] -left-[7.5%] h-3 bg-zinc-700 rounded-b-lg shadow-xl flex justify-center">
            <div className="w-16 h-1 bg-zinc-800 rounded-b"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-accent/10 text-cyan-accent text-[10px] font-bold tracking-wider uppercase mb-4 self-start border border-cyan-accent/20">
          {project.category}
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-accent transition-colors">{project.headline}</h3>
        <p className="text-text-secondary text-sm mb-6 flex-1">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 rounded bg-zinc-800/50 text-text-tertiary text-[11px] border border-zinc-700/50">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center text-cyan-accent text-sm font-bold group-hover:translate-x-1 transition-transform border-t border-border-card pt-4 mt-auto">
          Lihat Detail <ArrowRight size={16} className="ml-2" />
        </div>
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
          <ArrowLeft size={20} /> Kembali ke Portfolio
        </button>

        {/* Hero */}
        <div className={`h-96 bg-gradient-to-br ${project.gradient} rounded-3xl mb-12 relative overflow-hidden flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center px-4">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-4">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.company}</h1>
            <p className="text-white/80 text-lg">{project.headline}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-16">
          {project.stats.map((stat, idx) => (
            <div key={idx} className="bg-bg-card border border-border-card rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-accent mb-2">{stat.value}</div>
              <div className="text-text-secondary text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-accent"></div>
              Masalah
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed bg-bg-card border border-border-card p-6 rounded-2xl">
              {project.problem}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-accent"></div>
              Solusi Kami
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed bg-bg-card border border-border-card p-6 rounded-2xl">
              {project.solution}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-accent"></div>
              Hasil Akhir
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed bg-bg-card border border-border-card p-6 rounded-2xl">
              {project.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ onNavigate, onOpenChat }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua");

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

  const filteredProjects = activeCategory === "Semua" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-0">
      <SEO 
        title="Works & Portfolio - Gridline Digital"
        description="Lihat hasil kerja terbaik kami dalam merancang antarmuka yang memukau dan sistem yang andal untuk klien kami."
        url="https://gridlinedigital.site/portfolio"
      />
      
      {/* Header */}
      <div className="text-center px-6 mt-10 mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Works & <span className="text-cyan-accent italic">Portfolio</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Eksplorasi studi kasus produk digital yang telah kami kerjakan. Kami memadukan kualitas kode tingkat tinggi dengan pengalaman visual yang memikat.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
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

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-text-tertiary">
            Belum ada portfolio untuk kategori ini.
          </div>
        )}
      </div>

    </div>
  );
}
