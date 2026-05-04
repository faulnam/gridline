import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Phone } from 'lucide-react';

export default function ChatModal({ isOpen, onClose, onNavigate }) {
  const [mode, setMode] = useState(null); // 'chat' or 'voice'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setMessages([{
        type: 'bot',
        text: "Hi there! 👋 I'm here to help you find the perfect digital solution for your business. What type of business do you have?"
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes('website') || lowerInput.includes('web')) {
        botResponse = "Great choice! We build high-performance websites that convert visitors into customers. What's your main goal with the website?";
      } else if (lowerInput.includes('ecommerce') || lowerInput.includes('online store') || lowerInput.includes('shop')) {
        botResponse = "Perfect! E-commerce is our specialty. We can help you build a store that drives sales. What products are you selling?";
      } else if (lowerInput.includes('startup') || lowerInput.includes('new business')) {
        botResponse = "Exciting! For startups, we recommend our Starter package which includes branding and a professional website. Would you like to see our pricing or discuss your specific needs?";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing') || lowerInput.includes('budget')) {
        botResponse = "Our packages start at $2,500/month for startups. We also have Business and Custom Enterprise solutions. Would you like to view our detailed pricing page?";
      } else if (lowerInput.includes('yes') || lowerInput.includes('sure') || lowerInput.includes('okay')) {
        botResponse = "Awesome! Based on what you've shared, I think we can create something amazing for you. Would you like to start your project now or see our pricing options first?";
      } else if (messages.length === 2) {
        // Second message - ask about needs
        botResponse = "Thanks for sharing! What are you looking to achieve? (e.g., more customers, better branding, online sales, etc.)";
      } else if (messages.length === 4) {
        // Fourth message - ask about target
        botResponse = "That sounds great! What's your target timeline and budget range for this project?";
      } else {
        botResponse = "I understand. To help you better, could you tell me more about what you're looking for? Or would you prefer to speak with our team directly?";
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);

      // Add CTA after a few exchanges
      if (messages.length >= 6) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: "Based on our conversation, I think you'd benefit from a detailed consultation. Ready to start your project?",
            cta: true
          }]);
        }, 1000);
      }
    }, 1500);
  };

  const handleVoiceCall = () => {
    alert('Voice call feature would integrate with VAPI here. For demo purposes, this would initiate a voice conversation.');
  };

  if (!isOpen) return null;

  if (!mode) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-bg-card border border-border-card rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">Let's Talk</h2>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
              <X size={24} />
            </button>
          </div>

          <p className="text-text-tertiary mb-8">
            Choose how you'd like to connect with us:
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setMode('chat')}
              className="w-full bg-bg-primary border border-border-card rounded-xl p-6 hover:border-cyan-accent transition text-left group"
            >
              <MessageCircle className="text-cyan-accent mb-3" size={32} />
              <h3 className="font-bold mb-2 group-hover:text-cyan-accent transition">Chat with AI Assistant</h3>
              <p className="text-text-secondary text-sm">Get instant answers about our services and pricing</p>
            </button>

            <button
              onClick={handleVoiceCall}
              className="w-full bg-bg-primary border border-border-card rounded-xl p-6 hover:border-cyan-accent transition text-left group"
            >
              <Phone className="text-cyan-accent mb-3" size={32} />
              <h3 className="font-bold mb-2 group-hover:text-cyan-accent transition">Voice Call</h3>
              <p className="text-text-secondary text-sm">Speak directly with our AI assistant</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-bg-card border border-border-card rounded-2xl max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border-card">
          <div>
            <h2 className="text-xl font-bold">Chat with Gridline</h2>
            <p className="text-text-secondary text-sm">We typically reply instantly</p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.type === 'user' 
                  ? 'bg-cyan-accent text-bg-primary' 
                  : 'bg-bg-primary border border-border-card'
              }`}>
                <p className="text-sm">{msg.text}</p>
                {msg.cta && (
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('contact');
                      }}
                      className="w-full bg-cyan-accent text-bg-primary px-4 py-2 rounded-full text-sm font-semibold hover:brightness-110 transition"
                    >
                      Start Your Project →
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('pricing');
                      }}
                      className="w-full border border-cyan-accent text-cyan-accent px-4 py-2 rounded-full text-sm font-semibold hover:bg-cyan-accent hover:text-bg-primary transition"
                    >
                      View Pricing
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-bg-primary border border-border-card rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-cyan-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-border-card">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-bg-primary border border-border-card rounded-full px-6 py-3 focus:outline-none focus:border-cyan-accent transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-cyan-accent text-bg-primary w-12 h-12 rounded-full flex items-center justify-center hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
