import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Phone, PhoneOff, ArrowLeft, Bot, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Vapi from '@vapi-ai/web';

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// System prompt for Gridline's AI assistant
const GRIDLINE_SYSTEM_PROMPT = `Kamu adalah asisten AI profesional dari Gridline Digital, sebuah agensi digital yang berbasis di Indonesia.

## Tentang Gridline Digital
Gridline Digital adalah agensi spesialis pembuatan website, aplikasi web, dan solusi digital profesional. Kami membantu bisnis bertransformasi secara digital.

## Layanan Kami & Harga
1. **Website Design** — Desain antarmuka (UI/UX) modern, mobile responsive. Mulai dari Rp 1.500.000
2. **Web Development** — Pengembangan website full-stack, cepat, aman, dan SEO-friendly. Mulai dari Rp 2.500.000
3. **E-Commerce** — Toko online lengkap dengan katalog produk, keranjang belanja, payment gateway, dan integrasi WhatsApp. Mulai dari Rp 4.000.000
4. **SEO Optimization** — Riset keyword, on-page SEO, dan audit performa. Mulai dari Rp 1.000.000
5. **Digital Marketing** — Kampanye Meta Ads, Google Ads, A/B Testing. Mulai dari Rp 1.500.000
6. **Brand Identity** — Desain logo, brand guideline, dan sosmed kit. Mulai dari Rp 2.000.000

## Paket Harga
- **Starter** (Rp 2.500.000/bulan): Cocok untuk UKM dan startup. Termasuk website 5 halaman, domain, hosting, SEO dasar.
- **Business** (Rp 7.500.000/bulan): Untuk bisnis berkembang. Website premium, dashboard analitik, integrasi CRM, dukungan prioritas.
- **Enterprise** (Custom): Solusi kustom untuk perusahaan besar. Konsultasi gratis.

## Kontak
- Email: halo@gridlinedigital.site
- Website: gridlinedigital.site

## Instruksi
- Jawab dalam bahasa yang digunakan pengguna (jika mereka pakai Bahasa Indonesia, jawab dalam Bahasa Indonesia. Jika Inggris, jawab Inggris).
- Bersikaplah ramah, profesional, dan membantu.
- Jika pengguna bertanya hal di luar konteks layanan Gridline, arahkan kembali ke topik layanan Gridline dengan sopan.
- Jangan terlalu panjang menjawab. Maksimal 3-4 kalimat kecuali diminta penjelasan detail.
- Jika pengguna tampaknya sudah siap untuk memulai proyek, arahkan mereka untuk mengisi formulir di halaman Contact atau mengirim email ke halo@gridlinedigital.site.
- Selalu tunjukkan antusiasme dan kepercayaan diri terhadap layanan Gridline.`;

export default function ChatModal({ isOpen, onClose, onNavigate }) {
  const [mode, setMode] = useState(null); // null, 'chat', 'voice'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('');
  const [chatError, setChatError] = useState(null);
  const messagesEndRef = useRef(null);
  const vapiRef = useRef(null);
  const chatSessionRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize Gemini chat session when entering chat mode
  useEffect(() => {
    if (mode === 'chat' && !chatSessionRef.current && GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-2.0-flash',
          systemInstruction: GRIDLINE_SYSTEM_PROMPT,
        });
        chatSessionRef.current = model.startChat({
          history: [],
        });
        setChatError(null);
      } catch (err) {
        console.error('Failed to initialize Gemini:', err);
        setChatError('Gagal menginisialisasi AI. Pastikan API Key sudah benar.');
      }
    }
  }, [mode]);

  // Initial greeting when chat mode is selected
  useEffect(() => {
    if (mode === 'chat' && messages.length === 0) {
      setMessages([{
        type: 'bot',
        text: "Halo! 👋 Saya asisten AI dari Gridline Digital. Saya siap membantu Anda menemukan solusi digital terbaik untuk bisnis Anda. Ada yang bisa saya bantu?"
      }]);
    }
  }, [mode]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (mode === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [mode]);

  // ─── TEXT CHAT (Gemini AI) ───────────────────────────────────
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);
    setChatError(null);

    // Check if Gemini API key is configured
    if (!GEMINI_API_KEY) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "Maaf, AI belum dikonfigurasi. Silakan hubungi tim kami melalui halaman Contact atau kirim email ke halo@gridlinedigital.site 😊",
        cta: true
      }]);
      setIsTyping(false);
      return;
    }

    try {
      // Initialize session if not exists
      if (!chatSessionRef.current) {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-2.0-flash',
          systemInstruction: GRIDLINE_SYSTEM_PROMPT,
        });
        chatSessionRef.current = model.startChat({ history: [] });
      }

      const result = await chatSessionRef.current.sendMessage(userMessage);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { type: 'bot', text: responseText }]);
    } catch (error) {
      console.error('Gemini API error:', error);
      
      let errorMsg = "Maaf, terjadi gangguan saat memproses pesan Anda. ";
      if (error?.message?.includes('API_KEY')) {
        errorMsg += "API Key tidak valid. Silakan hubungi admin.";
      } else if (error?.message?.includes('SAFETY')) {
        errorMsg += "Pesan tidak dapat diproses karena alasan keamanan.";
      } else if (error?.message?.includes('quota') || error?.message?.includes('429')) {
        errorMsg += "Kuota harian habis. Silakan coba lagi besok atau hubungi kami langsung.";
      } else {
        errorMsg += "Silakan coba lagi atau hubungi kami melalui halaman Contact.";
      }

      setMessages(prev => [...prev, { type: 'bot', text: errorMsg, cta: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  // ─── VOICE CALL (VAPI) ──────────────────────────────────────
  const handleVoiceCall = async () => {
    setMode('voice');
    setCallStatus('Menghubungkan...');
    
    try {
      if (!VAPI_PUBLIC_KEY || VAPI_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
        throw new Error('VAPI Public Key belum dikonfigurasi. Silakan isi VITE_VAPI_PUBLIC_KEY di file .env');
      }
      if (!VAPI_ASSISTANT_ID) {
        throw new Error('VAPI Assistant ID belum dikonfigurasi. Silakan isi VITE_VAPI_ASSISTANT_ID di file .env');
      }

      // Create fresh VAPI instance each time to avoid stale event listeners
      if (vapiRef.current) {
        try { vapiRef.current.stop(); } catch(e) { /* ignore */ }
      }
      vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
      const vapi = vapiRef.current;

      // Set up event listeners
      vapi.on('call-start', () => {
        setIsCallActive(true);
        setCallStatus('Terhubung — Silakan bicara');
      });

      vapi.on('call-end', () => {
        setIsCallActive(false);
        setCallStatus('Panggilan selesai');
      });

      vapi.on('speech-start', () => {
        setCallStatus('Mendengarkan...');
      });

      vapi.on('speech-end', () => {
        setCallStatus('Memproses...');
      });

      vapi.on('error', (error) => {
        console.error('VAPI Error:', error);
        let errorMsg = 'Koneksi gagal';
        if (error?.error?.message) errorMsg = error.error.message;
        else if (error?.message) errorMsg = error.message;
        else if (error?.statusCode) errorMsg = `Status ${error.statusCode}`;
        
        setCallStatus('Error: ' + errorMsg);
        setIsCallActive(false);
      });

      setCallStatus('Memulai panggilan...');
      await vapi.start(VAPI_ASSISTANT_ID);

    } catch (error) {
      console.error('Failed to start voice call:', error);
      const errorMsg = error?.message || 'Gagal memulai panggilan';
      setCallStatus('Gagal: ' + errorMsg);
      setIsCallActive(false);
    }
  };

  const handleEndCall = () => {
    try {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
      setIsCallActive(false);
      setCallStatus('Panggilan selesai');
    } catch (error) {
      console.error('Error ending call:', error);
      setIsCallActive(false);
    }
  };

  const handleBackFromMode = () => {
    if (mode === 'voice') handleEndCall();
    setMode(null);
  };

  // Reset chat when closing the modal entirely
  const handleClose = () => {
    if (mode === 'voice') handleEndCall();
    chatSessionRef.current = null;
    setMessages([]);
    setMode(null);
    setChatError(null);
    onClose();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (vapiRef.current && isCallActive) {
        try { vapiRef.current.stop(); } catch(e) { /* ignore */ }
      }
    };
  }, [isCallActive]);

  if (!isOpen) return null;

  // ─── MODE SELECTION SCREEN ──────────────────────────────────
  if (!mode) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
        <div className="bg-bg-card border border-border-card rounded-t-2xl sm:rounded-2xl p-8 max-w-md w-full animate-slide-up">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">Let's Talk</h2>
              <p className="text-text-tertiary text-sm mt-1">Pilih cara berkomunikasi:</p>
            </div>
            <button onClick={handleClose} className="text-text-secondary hover:text-text-primary transition p-1">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setMode('chat')}
              className="w-full bg-bg-primary border border-border-card rounded-xl p-6 hover:border-cyan-accent transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="text-cyan-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-cyan-accent transition">Chat dengan AI</h3>
                  <p className="text-text-secondary text-sm">Tanya langsung tentang layanan & harga kami</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleVoiceCall}
              className="w-full bg-bg-primary border border-border-card rounded-xl p-6 hover:border-cyan-accent transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-cyan-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-cyan-accent transition">Voice Call</h3>
                  <p className="text-text-secondary text-sm">Bicara langsung dengan AI assistant kami</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── VOICE CALL SCREEN ──────────────────────────────────────
  if (mode === 'voice') {
    const isFailed = callStatus.includes('Gagal') || callStatus.includes('Error') || callStatus.includes('Failed');
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
        <div className="bg-bg-card border border-border-card rounded-t-2xl sm:rounded-2xl p-8 max-w-md w-full text-center animate-slide-up">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <button onClick={handleBackFromMode} className="text-text-secondary hover:text-cyan-accent transition">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-bold">Voice Call</h2>
            </div>
            <button onClick={handleClose} className="text-text-secondary hover:text-text-primary transition">
              <X size={24} />
            </button>
          </div>

          {/* Visual */}
          <div className="my-8">
            <div className="relative mx-auto w-28 h-28">
              {isCallActive && (
                <>
                  <div className="absolute inset-0 rounded-full bg-cyan-accent/20 animate-ping"></div>
                  <div className="absolute -inset-2 rounded-full bg-cyan-accent/10 animate-pulse"></div>
                </>
              )}
              <div className={`relative w-full h-full rounded-full flex items-center justify-center ${
                isCallActive ? 'bg-cyan-accent/20' : isFailed ? 'bg-red-500/10' : 'bg-bg-primary border border-border-card'
              }`}>
                <Phone className={isCallActive ? 'text-cyan-accent' : isFailed ? 'text-red-400' : 'text-cyan-accent'} size={48} />
              </div>
            </div>
            
            <p className={`text-lg font-semibold mt-6 mb-2 ${isFailed ? 'text-red-400' : ''}`}>
              {callStatus}
            </p>
            <p className="text-text-secondary text-sm">
              {isCallActive ? 'Bicaralah secara alami dengan AI assistant kami' : 
               isFailed ? 'Terjadi kesalahan saat menghubungi AI' :
               'Menginisialisasi koneksi suara...'}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isCallActive && (
              <button
                onClick={handleEndCall}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition flex items-center gap-2 mx-auto"
              >
                <PhoneOff size={20} />
                Akhiri Panggilan
              </button>
            )}

            {!isCallActive && isFailed && (
              <div className="space-y-3">
                <button
                  onClick={handleVoiceCall}
                  className="bg-cyan-accent text-bg-primary px-8 py-3 rounded-full font-semibold hover:brightness-110 transition"
                >
                  Coba Lagi
                </button>
                <p className="text-text-tertiary text-xs">
                  Pastikan mikrofon browser sudah diizinkan dan koneksi internet stabil.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── CHAT SCREEN (Gemini AI) ────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="bg-bg-card border border-border-card rounded-t-2xl sm:rounded-2xl max-w-2xl w-full h-[85vh] sm:h-[600px] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-border-card flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={handleBackFromMode} className="text-text-secondary hover:text-cyan-accent transition">
              <ArrowLeft size={22} />
            </button>
            <div className="w-9 h-9 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center">
              <Bot className="text-cyan-accent" size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">Gridline AI</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <p className="text-text-tertiary text-xs">Online — Powered by Gemini</p>
              </div>
            </div>
          </div>
          <button onClick={handleClose} className="text-text-secondary hover:text-text-primary transition p-1">
            <X size={22} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.type === 'user' 
                  ? 'bg-cyan-accent text-bg-primary rounded-br-md' 
                  : 'bg-bg-primary border border-border-card rounded-bl-md'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                {msg.cta && (
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => {
                        handleClose();
                        onNavigate('contact');
                      }}
                      className="w-full bg-cyan-accent text-bg-primary px-4 py-2 rounded-full text-sm font-semibold hover:brightness-110 transition"
                    >
                      Mulai Proyek →
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        onNavigate('pricing');
                      }}
                      className="w-full border border-cyan-accent text-cyan-accent px-4 py-2 rounded-full text-sm font-semibold hover:bg-cyan-accent hover:text-bg-primary transition"
                    >
                      Lihat Harga
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-bg-primary border border-border-card rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 size={14} className="text-cyan-accent animate-spin" />
                  <span className="text-text-tertiary text-xs">Gridline AI sedang mengetik...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border-card flex-shrink-0">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ketik pesan Anda..."
              disabled={isTyping}
              className="flex-1 bg-bg-primary border border-border-card rounded-full px-5 py-3 text-sm focus:outline-none focus:border-cyan-accent transition disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-cyan-accent text-bg-primary w-11 h-11 rounded-full flex items-center justify-center hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
