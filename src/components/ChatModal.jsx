import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Phone, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

export default function ChatModal({ isOpen, onClose, onNavigate }) {
  const [mode, setMode] = useState(null); // 'chat' or 'voice'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('');
  const messagesEndRef = useRef(null);
  const vapiRef = useRef(null);

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

  const handleVoiceCall = async () => {
    setMode('voice');
    setCallStatus('Connecting...');
    
    try {
      // Validate credentials
      if (!VAPI_PUBLIC_KEY || VAPI_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
        throw new Error('VAPI Public Key not configured');
      }

      if (!VAPI_ASSISTANT_ID) {
        throw new Error('VAPI Assistant ID not configured');
      }

      console.log('Initializing VAPI...');
      console.log('Public Key:', VAPI_PUBLIC_KEY.substring(0, 8) + '...');
      console.log('Assistant ID:', VAPI_ASSISTANT_ID);
      
      // Initialize VAPI instance
      if (!vapiRef.current) {
        vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
        console.log('✅ VAPI instance created');
      }

      const vapi = vapiRef.current;

      // Set up event listeners
      vapi.on('call-start', () => {
        console.log('✅ Call started successfully');
        setIsCallActive(true);
        setCallStatus('Connected - Speak now');
      });

      vapi.on('call-end', () => {
        console.log('📞 Call ended');
        setIsCallActive(false);
        setCallStatus('Call ended');
      });

      vapi.on('speech-start', () => {
        console.log('🎤 User started speaking');
        setCallStatus('Listening...');
      });

      vapi.on('speech-end', () => {
        console.log('🎤 User stopped speaking');
        setCallStatus('Processing...');
      });

      vapi.on('message', (message) => {
        console.log('📨 Message:', message);
      });

      vapi.on('error', (error) => {
        console.error('❌ VAPI Error:', error);
        console.error('Error type:', typeof error);
        console.error('Error keys:', Object.keys(error || {}));
        console.error('Error stringified:', JSON.stringify(error, null, 2));
        
        let errorMsg = 'Connection failed';
        
        if (error) {
          if (error.error && error.error.message) {
            errorMsg = error.error.message;
          } else if (error.message) {
            errorMsg = error.message;
          } else if (error.statusCode) {
            errorMsg = `Status ${error.statusCode}: ${error.statusMessage || 'Request failed'}`;
          } else if (typeof error === 'string') {
            errorMsg = error;
          } else {
            errorMsg = 'Check console for details';
          }
        }
        
        setCallStatus('Error: ' + errorMsg);
        setIsCallActive(false);
      });

      // Start call with assistant
      console.log('🚀 Starting call with assistant:', VAPI_ASSISTANT_ID);
      console.log('VAPI instance:', vapi);
      console.log('VAPI methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(vapi)));
      setCallStatus('Starting call...');
      
      try {
        const result = await vapi.start(VAPI_ASSISTANT_ID);
        console.log('📞 Call start result:', result);
      } catch (startError) {
        console.error('Start call error:', startError);
        console.error('Start error type:', typeof startError);
        console.error('Start error details:', {
          message: startError?.message,
          name: startError?.name,
          stack: startError?.stack,
          response: startError?.response,
          status: startError?.status,
          statusText: startError?.statusText
        });
        throw startError;
      }

    } catch (error) {
      console.error('❌ Failed to start voice call:', error);
      console.error('Error name:', error?.name);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      
      let errorMsg = 'Unknown error';
      if (error?.message) {
        errorMsg = error.message;
      } else if (typeof error === 'string') {
        errorMsg = error;
      }
      
      setCallStatus('Failed: ' + errorMsg);
      setIsCallActive(false);
    }
  };

  const handleEndCall = () => {
    try {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      setIsCallActive(false);
      setCallStatus('Call ended');
      setTimeout(() => setMode(null), 2000);
    } catch (error) {
      console.error('Error ending call:', error);
      setIsCallActive(false);
      setMode(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (vapiRef.current && isCallActive) {
        vapiRef.current.stop();
      }
    };
  }, [isCallActive]);

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

  if (mode === 'voice') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-bg-card border border-border-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">Voice Call</h2>
            <button onClick={() => { handleEndCall(); onClose(); }} className="text-text-secondary hover:text-text-primary">
              <X size={24} />
            </button>
          </div>

          <div className="my-12">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              isCallActive ? 'bg-cyan-accent/20 animate-pulse' : 'bg-bg-primary'
            }`}>
              <Phone className="text-cyan-accent" size={48} />
            </div>
            
            <p className="text-xl font-semibold mb-2">{callStatus}</p>
            <p className="text-text-secondary text-sm mb-4">
              {isCallActive ? 'Speak naturally with our AI assistant' : 'Initializing voice connection...'}
            </p>

            {/* Debug Info */}
            <div className="text-xs text-text-tertiary mt-4 p-3 bg-bg-primary rounded-lg text-left">
              <p>Public Key: {VAPI_PUBLIC_KEY ? '✅ Set' : '❌ Missing'}</p>
              <p>Assistant ID: {VAPI_ASSISTANT_ID ? '✅ Set' : '❌ Missing'}</p>
              <p className="mt-2 text-cyan-accent">Check browser console (F12) for detailed logs</p>
            </div>
          </div>

          {isCallActive && (
            <button
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition flex items-center gap-2 mx-auto"
            >
              <PhoneOff size={20} />
              End Call
            </button>
          )}

          {!isCallActive && callStatus.includes('Failed') && (
            <button
              onClick={() => { setMode(null); setCallStatus(''); }}
              className="bg-cyan-accent text-bg-primary px-8 py-3 rounded-full font-semibold hover:brightness-110 transition"
            >
              Try Again
            </button>
          )}
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
