import { useState } from 'react';
import { CheckCircle, AlertCircle, Mail, MessageSquare, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';

const SERVICES = [
  "Website Design",
  "Web Development",
  "E-Commerce",
  "SEO Optimization",
  "Digital Marketing",
  "Brand Identity"
];

export default function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: '',
    needs: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    }
    
    if (!formData.service) {
      newErrors.service = 'Pilih salah satu layanan';
    }
    
    if (!formData.needs.trim()) {
      newErrors.needs = 'Ceritakan gambaran proyek Anda';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setSubmitError(null);
    
    try {
      // Insert data to Supabase (mapping 'service' to 'business_type' to match existing schema)
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            business_type: formData.service, // Mapped to existing column
            needs: formData.needs,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        throw error;
      }
      
      // Also save to localStorage as backup
      const leads = JSON.parse(localStorage.getItem('gridline_leads') || '[]');
      leads.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      });
      localStorage.setItem('gridline_leads', JSON.stringify(leads));
      
      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitError(error.message || 'Gagal mengirim form. Silakan coba lagi.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceSelect = (service) => {
    setFormData(prev => ({ ...prev, service }));
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <SEO 
          title="Terima Kasih - Gridline Digital"
          description="Pesan Anda telah kami terima."
          url="https://gridlinedigital.site/contact"
        />
        <div className="max-w-2xl w-full text-center">
          <CheckCircle className="text-cyan-accent mx-auto mb-6" size={64} />
          <h1 className="text-4xl font-bold mb-4">Terima Kasih! Formulir Diterima.</h1>
          <p className="text-text-tertiary text-lg mb-8">
            Tim kami sedang meninjau rencana proyek Anda dan akan menghubungi Anda melalui WhatsApp atau Email dalam 1x24 jam untuk diskusi lebih lanjut.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onNavigate('home')}
              className="bg-cyan-accent text-bg-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition"
            >
              Kembali ke Beranda
            </button>
            <button 
              onClick={() => onNavigate('portfolio')}
              className="border-2 border-cyan-accent text-cyan-accent px-8 py-3 rounded-full font-bold hover:bg-cyan-accent hover:text-bg-primary transition"
            >
              Lihat Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-0">
      <SEO 
        title="Hubungi Kami | Konsultasi Proyek Digital - Gridline"
        description="Punya rencana besar untuk bisnis Anda? Konsultasikan pembuatan website atau aplikasi Anda bersama tim ahli Gridline."
        url="https://gridlinedigital.site/contact"
      />
      
      {/* Header Section */}
      <div className="text-center px-6 mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Hubungi <span className="text-cyan-accent italic">Kami</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Punya ide besar yang ingin diwujudkan atau pertanyaan seputar layanan kami? Kirim pesan Anda, kami siap berkolaborasi.
        </p>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-6 mb-20 grid md:grid-cols-3 gap-6">
        <div className="bg-bg-card border border-border-card rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-accent/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-cyan-accent/10 text-cyan-accent flex items-center justify-center flex-shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <div className="text-xs text-text-tertiary tracking-wider mb-1 uppercase font-semibold">Kirim Email</div>
            <div className="font-bold">halo@gridlinedigital.site</div>
          </div>
        </div>
        <div className="bg-bg-card border border-border-card rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-accent/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-cyan-accent/10 text-cyan-accent flex items-center justify-center flex-shrink-0">
            <MessageSquare size={24} />
          </div>
          <div>
            <div className="text-xs text-text-tertiary tracking-wider mb-1 uppercase font-semibold">Mulai Chat Whatsapp</div>
            <div className="font-bold">+62 812 3456 7890</div>
          </div>
        </div>
        <div className="bg-bg-card border border-border-card rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-accent/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-cyan-accent/10 text-cyan-accent flex items-center justify-center flex-shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <div className="text-xs text-text-tertiary tracking-wider mb-1 uppercase font-semibold">Kunjungi Lokasi</div>
            <div className="font-bold">Jakarta, Indonesia</div>
          </div>
        </div>
      </div>

      {/* Main Content: Left (Text/Commitment) & Right (Form) */}
      <div className="max-w-6xl mx-auto px-6 mb-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side */}
        <div className="lg:col-span-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Ceritakan Rencana Besar <span className="text-cyan-accent italic">Bisnis Anda</span>
          </h2>
          <p className="text-text-secondary mb-10 leading-relaxed">
            Kami percaya produk digital yang hebat berawal dari pemahaman yang mendalam tentang masalah yang ingin diselesaikan. Isi formulir konsultasi ini dan tim kami akan segera menghubungi Anda.
          </p>

          <div className="bg-bg-card-alt border border-border-card rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-accent"></div>
              OUR SERVICE COMMITMENT
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-cyan-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold mb-1 text-white">Waktu Respon Cepat</h4>
                  <p className="text-sm text-text-secondary">Balasan via WhatsApp dalam waktu kurang dari 2 jam kerja.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="text-cyan-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold mb-1 text-white">Estimasi Biaya Transparan</h4>
                  <p className="text-sm text-text-secondary">Rincian biaya sesuai modul fitur tanpa markup akal-akalan.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="text-cyan-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold mb-1 text-white">Kerahasiaan Ide Terjamin</h4>
                  <p className="text-sm text-text-secondary">Kami menghormati kerahasiaan konsep dengan menanda-tangani kesepakatan NDA.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7">
          <div className="bg-bg-card border border-border-card rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <h3 className="text-2xl font-bold mb-2">Formulir Konsultasi Proyek</h3>
            <p className="text-text-secondary text-sm mb-8">Mohon diisi detail di bawah ini agar kami dapat memetakan rencana proyek Anda.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-3 text-text-tertiary">
                  REQUIRED SERVICE <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceSelect(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        formData.service === service
                          ? 'bg-cyan-accent text-bg-primary border-cyan-accent shadow-[0_0_10px_rgba(0,200,255,0.2)]'
                          : 'bg-bg-card-alt text-text-secondary border-border-card hover:border-text-secondary'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-xs">
                    <AlertCircle size={14} />
                    {errors.service}
                  </div>
                )}
              </div>

              {/* Name & WhatsApp Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold tracking-widest uppercase mb-2 text-text-tertiary">
                    FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-bg-card-alt border ${errors.name ? 'border-red-500' : 'border-border-card'} rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-accent transition`}
                    placeholder="Cth: Budi Santoso"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-2 mt-1.5 text-red-500 text-xs">
                      <AlertCircle size={14} /> {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-xs font-bold tracking-widest uppercase mb-2 text-text-tertiary">
                    NOMOR WHATSAPP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={`w-full bg-bg-card-alt border ${errors.whatsapp ? 'border-red-500' : 'border-border-card'} rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-accent transition`}
                    placeholder="Cth: 08123456xxxx"
                  />
                  {errors.whatsapp && (
                    <div className="flex items-center gap-2 mt-1.5 text-red-500 text-xs">
                      <AlertCircle size={14} /> {errors.whatsapp}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase mb-2 text-text-tertiary">
                  ALAMAT EMAIL <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-bg-card-alt border ${errors.email ? 'border-red-500' : 'border-border-card'} rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-accent transition`}
                  placeholder="Cth: email@perusahaan.com"
                />
                {errors.email && (
                  <div className="flex items-center gap-2 mt-1.5 text-red-500 text-xs">
                    <AlertCircle size={14} /> {errors.email}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="needs" className="block text-xs font-bold tracking-widest uppercase mb-2 text-text-tertiary">
                  GAMBARAN RENCANA PROYEK <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="needs"
                  name="needs"
                  value={formData.needs}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-bg-card-alt border ${errors.needs ? 'border-red-500' : 'border-border-card'} rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-accent transition resize-none`}
                  placeholder="Ceritakan singkat produk digital yang ingin Anda buat, target rilis, dan estimasi dana jika ada..."
                />
                {errors.needs && (
                  <div className="flex items-center gap-2 mt-1.5 text-red-500 text-xs">
                    <AlertCircle size={14} /> {errors.needs}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-red-500 font-semibold">Gagal Mengirim</p>
                    <p className="text-red-400 text-sm mt-1">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-accent text-bg-primary py-4 rounded-xl font-bold hover:brightness-110 shadow-lg hover:shadow-cyan-accent/50 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Mengirim...' : 'Kirim Formulir Konsultasi'}
              </button>
              
              <p className="text-center text-xs text-text-tertiary mt-4">
                * Data Anda aman. Kami tidak akan membagikannya ke pihak ketiga.
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
