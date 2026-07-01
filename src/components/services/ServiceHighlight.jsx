import { CheckCircle2, Monitor } from 'lucide-react';

export default function ServiceHighlight({ onNavigate }) {
  const features = [
    {
      title: 'Desain Responsif (Mobile-First)',
      description: 'Tampilan yang sempurna dan konsisten di semua ukuran layar, mulai dari smartphone hingga monitor ultrawide.'
    },
    {
      title: 'Performa Cepat & Optimal',
      description: 'Optimasi kode, gambar, dan server caching untuk memastikan website Anda dimuat dalam hitungan detik.'
    },
    {
      title: 'Keamanan Data Tingkat Tinggi',
      description: 'Implementasi SSL, proteksi anti-DDoS, dan arsitektur database yang aman untuk melindungi data bisnis Anda.'
    },
    {
      title: 'Sistem Manajemen Konten (CMS)',
      description: 'Panel admin yang mudah digunakan untuk mengelola konten website Anda tanpa perlu pengetahuan coding.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Pembuatan <span className="text-cyan-accent italic">Website</span> & Aplikasi Berbasis Web
        </h2>
        <p className="text-text-secondary mt-4 max-w-2xl">
          Dari website perusahaan hingga sistem informasi kompleks, kami membangun solusi web cerdas yang siap membantu digitalisasi bisnis Anda.
        </p>
      </div>

      <div className="bg-bg-card border border-border-card rounded-3xl p-6 md:p-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Side: Text and Features */}
          <div>
            <div className="space-y-6 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-cyan-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border-card">
              <div>
                <div className="text-text-tertiary text-xs mb-1 uppercase tracking-wider">Mulai Dari</div>
                <div className="text-2xl font-bold text-cyan-accent">Rp 2.500.000</div>
              </div>
              <button onClick={() => onNavigate && onNavigate('contact')} className="bg-cyan-accent text-bg-primary px-8 py-3 rounded-full font-bold text-sm hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition-all hover:scale-105 ml-auto">
                Mulai Proyek
              </button>
            </div>
          </div>

          {/* Right Side: Laptop Mockup (CSS only) */}
          <div className="flex justify-center items-center h-full pt-10 lg:pt-0">
            <div className="relative w-full max-w-[500px]">
              {/* Laptop Screen */}
              <div className="relative w-full aspect-[16/10] bg-black border-[12px] border-zinc-800 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Webcam dot */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-900 z-20"></div>
                
                {/* Browser Top Bar */}
                <div className="w-full h-6 bg-zinc-900 border-b border-zinc-700 flex items-center px-3 gap-1.5 z-10">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="mx-auto w-1/2 h-3 bg-zinc-800 rounded text-[6px] text-center text-zinc-400 flex items-center justify-center">
                    gridlinedigital.site
                  </div>
                </div>
                
                {/* Web Content Mockup */}
                <div className="flex-1 bg-bg-primary relative overflow-hidden flex flex-col p-4">
                  {/* Fake Nav */}
                  <div className="w-full flex justify-between items-center mb-6">
                    <div className="w-16 h-3 bg-zinc-800 rounded"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-2 bg-zinc-800 rounded"></div>
                      <div className="w-8 h-2 bg-zinc-800 rounded"></div>
                      <div className="w-8 h-2 bg-zinc-800 rounded"></div>
                    </div>
                  </div>
                  {/* Fake Hero */}
                  <div className="w-3/4 h-6 bg-cyan-accent/20 rounded mb-3"></div>
                  <div className="w-1/2 h-6 bg-cyan-accent/20 rounded mb-6"></div>
                  <div className="w-full h-2 bg-zinc-800 rounded mb-2"></div>
                  <div className="w-full h-2 bg-zinc-800 rounded mb-2"></div>
                  <div className="w-2/3 h-2 bg-zinc-800 rounded mb-6"></div>
                  <div className="w-20 h-6 bg-cyan-accent rounded-full mt-auto"></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-cyan-accent/10 rounded-full blur-xl"></div>
                </div>
              </div>
              {/* Laptop Base */}
              <div className="relative w-[115%] -left-[7.5%] h-4 bg-zinc-700 rounded-b-xl shadow-xl flex justify-center">
                <div className="w-24 h-2 bg-zinc-800 rounded-b-md"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
