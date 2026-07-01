import { useState, useMemo } from 'react';
import { Calculator, Check } from 'lucide-react';

const SERVICES = [
  { id: 'web-design', label: 'Website Design', basePrice: 1500000 },
  { id: 'web-dev', label: 'Web Development', basePrice: 2500000 },
  { id: 'ecommerce', label: 'E-Commerce', basePrice: 4000000 },
  { id: 'seo', label: 'SEO Optimization', basePrice: 1000000 },
  { id: 'marketing', label: 'Digital Marketing', basePrice: 1500000 },
  { id: 'branding', label: 'Brand Identity', basePrice: 2000000 },
];

const ADDONS = [
  { id: 'copywriting', label: 'Copywriting Profesional', price: 500000 },
  { id: 'assets', label: 'Custom Asset & Ilustrasi', price: 1000000 },
  { id: 'support', label: 'Priority Support (1 Bulan)', price: 750000 },
  { id: 'language', label: 'Multi-bahasa (Bilingual)', price: 1200000 },
  { id: 'analytics', label: 'Advanced Analytics Setup', price: 800000 },
];

const TIMELINES = [
  { id: 'standard', label: 'Standard (Sesuai Antrean)', price: 0, desc: 'Estimasi normal' },
  { id: 'express', label: 'Express (Dipercepat)', price: 1000000, desc: 'Lebih cepat 30%' },
  { id: 'kilat', label: 'Kilat (Prioritas Utama)', price: 2500000, desc: 'Pengerjaan tercepat' },
];

export default function CostPlanner() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[0].id);

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const currentService = SERVICES.find(s => s.id === selectedService);
  const currentTimeline = TIMELINES.find(t => t.id === selectedTimeline);
  
  const totalPrice = useMemo(() => {
    let total = currentService.basePrice;
    selectedAddons.forEach(addonId => {
      const addon = ADDONS.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    total += currentTimeline.price;
    return total;
  }, [selectedService, selectedAddons, selectedTimeline, currentService, currentTimeline]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
          Interactive Project <span className="text-cyan-accent italic">Cost Planner</span>
        </h2>
        <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
          Hitung estimasi biaya proyek Anda secara transparan dengan kalkulator interaktif kami. Sesuaikan kebutuhan dan dapatkan harga langsung.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Options */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-cyan-accent/20 text-cyan-accent flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="text-xl font-bold">Pilih Layanan Utama</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {SERVICES.map(service => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
                    selectedService === service.id
                      ? 'bg-cyan-accent/10 border-cyan-accent text-cyan-accent'
                      : 'bg-bg-card border-border-card text-text-secondary hover:border-text-secondary'
                  }`}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-cyan-accent/20 text-cyan-accent flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="text-xl font-bold">Fitur Tambahan (Opsional)</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {ADDONS.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-cyan-accent/10 border-cyan-accent text-white'
                        : 'bg-bg-card border-border-card text-text-secondary hover:border-text-secondary'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-cyan-accent border-cyan-accent' : 'border-zinc-500'}`}>
                      {isSelected && <Check size={12} className="text-bg-primary" />}
                    </div>
                    {addon.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-cyan-accent/20 text-cyan-accent flex items-center justify-center font-bold text-sm">3</div>
              <h3 className="text-xl font-bold">Target Waktu Pengerjaan</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {TIMELINES.map(timeline => (
                <button
                  key={timeline.id}
                  onClick={() => setSelectedTimeline(timeline.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedTimeline === timeline.id
                      ? 'bg-cyan-accent/10 border-cyan-accent'
                      : 'bg-bg-card border-border-card hover:border-text-secondary'
                  }`}
                >
                  <div className={`font-bold mb-1 ${selectedTimeline === timeline.id ? 'text-cyan-accent' : 'text-white'}`}>
                    {timeline.label}
                  </div>
                  <div className="text-xs text-text-secondary">{timeline.desc}</div>
                </button>
              ))}
            </div>
          </div>
          
        </div>

        {/* Right Side: Summary Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <div className="bg-bg-card border border-border-card rounded-3xl p-8 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="text-cyan-accent" size={20} />
              Total Estimasi
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-start pb-4 border-b border-border-card">
                <div className="text-sm text-text-secondary">Layanan Utama</div>
                <div className="text-sm font-medium text-right">
                  <div>{currentService.label}</div>
                  <div className="text-text-tertiary text-xs mt-1">{formatPrice(currentService.basePrice)}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-start pb-4 border-b border-border-card">
                <div className="text-sm text-text-secondary">Add-ons</div>
                <div className="text-sm font-medium text-right">
                  {selectedAddons.length > 0 ? (
                    <div className="text-cyan-accent">{selectedAddons.length} Fitur Dipilih</div>
                  ) : (
                    <div className="text-text-tertiary">-</div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-start pb-4 border-b border-border-card">
                <div className="text-sm text-text-secondary">Timeline</div>
                <div className="text-sm font-medium text-right">
                  <div>{currentTimeline.label}</div>
                  {currentTimeline.price > 0 && (
                    <div className="text-text-tertiary text-xs mt-1">+{formatPrice(currentTimeline.price)}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-sm text-text-secondary mb-2">Estimasi Biaya Total:</div>
              <div className="text-3xl font-bold text-cyan-accent">{formatPrice(totalPrice)}</div>
            </div>

            {/* Dynamically build Gmail URL */}
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=halo@gridlinedigital.site&su=Proposal%20Proyek%20Baru&body=${encodeURIComponent(
                `Halo Tim Gridline,\n\nSaya tertarik untuk mendiskusikan proposal proyek dengan rincian estimasi yang telah saya pilih di website:\n\n` +
                `1. Layanan Utama: ${currentService?.label || '-'}\n` +
                `2. Fitur Tambahan: ${selectedAddons.length > 0 ? selectedAddons.map(id => ADDONS.find(a => a.id === id)?.label).join(', ') : 'Tidak ada'}\n` +
                `3. Target Waktu: ${currentTimeline?.label || '-'}\n` +
                `4. Estimasi Biaya Total: ${formatPrice(totalPrice)}\n\n` +
                `Bersama email ini, saya lampirkan dokumen proposal proyek/TOR. Mohon segera di-review.\n\nTerima kasih.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full bg-cyan-accent text-bg-primary py-4 rounded-xl font-bold hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition-all active:scale-95"
            >
              Kirim Proposal Proyek
            </a>
            <p className="text-xs text-center text-text-tertiary mt-4">
              *Harga ini adalah estimasi awal. Harga final dapat menyesuaikan dengan detail kebutuhan spesifik Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
