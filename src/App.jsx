import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatModal from './components/ChatModal';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Services from './pages/Services';
import { MessageCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Add reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, [currentPage]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} onOpenChat={() => setChatOpen(true)} />;
      case 'services':
        return <Services onNavigate={handleNavigate} onOpenChat={() => setChatOpen(true)} />;
      case 'portfolio':
        return <Portfolio onNavigate={handleNavigate} onOpenChat={() => setChatOpen(true)} />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigate} onOpenChat={() => setChatOpen(true)} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} onOpenChat={() => setChatOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} onOpenChat={() => setChatOpen(true)} />
      
      <main>
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} onOpenChat={() => setChatOpen(true)} />

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-8 right-8 bg-cyan-accent text-bg-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-accent/50 hover:scale-110 transition-all duration-300 z-40 animate-float"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Modal */}
      <ChatModal 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
