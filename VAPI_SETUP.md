# VAPI Voice Call Setup Guide

## 🎙️ Overview
Integrasi VAPI untuk fitur voice call dengan AI assistant di website Gridline Digital.

## 📋 Prerequisites
- Akun VAPI (https://vapi.ai)
- Assistant sudah dibuat dan dikonfigurasi di VAPI Dashboard
- Public API Key dari VAPI

## 🔑 Mendapatkan Credentials

### 1. Public Key
1. Login ke https://dashboard.vapi.ai
2. Klik **Account** (pojok kanan atas)
3. Pilih **API Keys**
4. Copy **Public Key** (bukan Private Key!)
5. Public Key format: biasanya dimulai dengan huruf/angka random

### 2. Assistant ID
- Assistant ID Anda: `2ed6bf7d-5740-4be1-9e0c-781c3f3b3286`
- Ini sudah dikonfigurasi di `.env` file

## ⚙️ Konfigurasi

### Update .env File
```env
# VAPI Configuration
VITE_VAPI_PUBLIC_KEY=your_public_key_here
VITE_VAPI_ASSISTANT_ID=2ed6bf7d-5740-4be1-9e0c-781c3f3b3286
```

**PENTING:** 
- Ganti `your_public_key_here` dengan Public Key dari VAPI Dashboard
- Jangan gunakan Private Key!
- Restart dev server setelah update `.env`

## 🚀 Cara Kerja

### Flow Voice Call:
1. User klik tombol "Voice Call" di modal "Let's Talk"
2. VAPI Web SDK di-load dari CDN
3. SDK diinisialisasi dengan Public Key
4. Call dimulai dengan Assistant ID
5. User bisa bicara langsung dengan AI assistant
6. Pertanyaan dan response sesuai setup di VAPI Dashboard
7. User klik "End Call" untuk mengakhiri

### Event Listeners:
- `call-start` - Call berhasil dimulai
- `call-end` - Call berakhir
- `speech-start` - User mulai bicara
- `speech-end` - User selesai bicara
- `message` - Pesan dari/ke assistant
- `error` - Error handling

## 🎯 Setup Assistant di VAPI Dashboard

### Recommended Settings:
1. **Model**: GPT-4 atau Claude untuk response quality
2. **Voice**: Pilih voice yang natural (misal: Alloy, Nova)
3. **First Message**: "Hi! I'm Gridline's AI assistant. How can I help you today?"
4. **System Prompt**: 
```
You are a helpful AI assistant for Gridline Digital, a digital agency. 
Help potential clients with:
- Information about services (web development, e-commerce, branding)
- Pricing packages (Starter $2,500, Business $5,000, Enterprise custom)
- Project timelines and process
- Booking consultations

Be friendly, professional, and concise. Guide users to book a consultation if interested.
```

## 🐛 Troubleshooting

### Error: "Failed to connect"
**Penyebab:**
- Public Key salah atau tidak valid
- Public Key belum diset di `.env`
- Dev server belum di-restart setelah update `.env`

**Solusi:**
1. Cek Public Key di VAPI Dashboard
2. Pastikan format di `.env` benar: `VITE_VAPI_PUBLIC_KEY=xxx`
3. Restart dev server: `npm run dev`

### Error: "VAPI SDK not loaded"
**Penyebab:**
- CDN blocked atau slow connection
- Browser compatibility issue

**Solusi:**
1. Cek koneksi internet
2. Coba browser lain (Chrome/Edge recommended)
3. Clear browser cache

### Call connects but no audio
**Penyebab:**
- Microphone permission tidak diberikan
- Assistant tidak dikonfigurasi dengan benar

**Solusi:**
1. Allow microphone access di browser
2. Cek assistant settings di VAPI Dashboard
3. Test assistant di VAPI Dashboard dulu

### Assistant tidak merespon
**Penyebab:**
- System prompt kosong atau tidak jelas
- Model tidak dikonfigurasi
- Credits VAPI habis

**Solusi:**
1. Cek assistant configuration di VAPI Dashboard
2. Test assistant langsung di dashboard
3. Cek billing/credits di account settings

## 📱 Testing

### Test di Browser:
1. Buka website: `http://localhost:5173`
2. Klik tombol chat (pojok kanan bawah)
3. Pilih "Voice Call"
4. Allow microphone access
5. Tunggu "Connected - Speak now"
6. Mulai bicara dengan AI assistant

### Console Logs:
Buka browser DevTools (F12) untuk melihat:
- "Starting call with assistant: xxx"
- "Call started"
- "User started speaking"
- "User stopped speaking"

## 🔒 Security Notes

- **Public Key** aman digunakan di frontend
- **Private Key** JANGAN pernah diexpose di frontend
- Public Key hanya bisa start calls, tidak bisa modify settings
- Rate limiting otomatis diterapkan oleh VAPI

## 📊 Monitoring

### VAPI Dashboard:
- Lihat call history di **Calls** tab
- Monitor usage di **Analytics**
- Check credits di **Billing**

### Metrics to Track:
- Total calls
- Average call duration
- Success rate
- User satisfaction

## 💰 Pricing

VAPI pricing berdasarkan:
- Minutes used
- Model yang dipilih (GPT-4 lebih mahal dari GPT-3.5)
- Voice synthesis

Check: https://vapi.ai/pricing

## 🎨 Customization

### Mengubah Voice:
1. VAPI Dashboard → Assistant → Voice
2. Pilih dari library atau upload custom voice

### Mengubah Behavior:
1. Edit System Prompt di assistant settings
2. Tambahkan function calling untuk actions
3. Integrate dengan tools (calendar, CRM, etc)

## 📚 Resources

- VAPI Docs: https://docs.vapi.ai
- Web SDK: https://docs.vapi.ai/sdk/web
- Examples: https://github.com/VapiAI/web-sdk-examples
- Support: support@vapi.ai

---

**Status:** ✅ Assistant ID configured, waiting for Public Key

**Next Steps:**
1. Get Public Key from VAPI Dashboard
2. Add to `.env` file
3. Restart dev server
4. Test voice call feature
