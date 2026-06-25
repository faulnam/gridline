import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    question: "How long does development take?",
    answer: "Timeline depends on project complexity. A landing page takes 3-7 days, a company profile website 1-2 weeks, a web application 4-8 weeks, and a mobile app 6-12 weeks. We'll provide a detailed timeline during the planning phase."
  },
  {
    question: "How much does a website cost?",
    answer: "Costs vary based on features and complexity. A simple website starts around $1,500, while complex web applications can range from $5,000 to $20,000+. We provide transparent pricing after understanding your needs."
  },
  {
    question: "Can you redesign existing websites?",
    answer: "Yes, we frequently redesign outdated websites to improve performance, user experience, and visual appeal while keeping your existing content intact."
  },
  {
    question: "Do you provide maintenance?",
    answer: "Absolutely. We offer ongoing maintenance and support packages to keep your website secure, updated, and performing optimally after launch."
  },
  {
    question: "What technologies do you use?",
    answer: "We specialize in modern web technologies including React, Next.js, Tailwind CSS, Node.js, and various modern CMS platforms to ensure scalable and fast solutions."
  }
];

export default function FAQ({ onNavigate }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-6 py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 sticky top-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ada yang Ingin <br/>
              <span className="text-cyan-accent font-style-italic text-glow">Ditanyakan?</span>
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-md">
              The most frequent questions we receive from potential clients. Can't find the answer you're looking for? Contact us directly.
            </p>
            <button 
              onClick={() => onNavigate && onNavigate('contact')}
              className="bg-cyan-accent text-bg-primary px-8 py-4 rounded-full font-bold hover:brightness-110 shadow-lg hover:shadow-cyan-accent/50 transition-all duration-300 flex items-center gap-2"
            >
              Contact Us <span className="text-xl leading-none ml-1">↗</span>
            </button>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const number = String(index + 1).padStart(2, '0');
                
                return (
                  <div key={index} className={`border-b border-border-card pb-4 ${isOpen ? '' : ''}`}>
                    <button
                      className="w-full py-4 flex items-center justify-between text-left group"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <div className="flex items-center gap-6">
                        <span className={`text-sm font-bold w-6 transition-colors duration-300 ${isOpen ? 'text-cyan-accent' : 'text-cyan-accent/50'}`}>
                          {number}
                        </span>
                        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-cyan-accent' : 'text-text-primary group-hover:text-cyan-accent/80'}`}>
                          {faq.question}
                        </span>
                      </div>
                      
                      <div className={`flex-shrink-0 ml-4 transition-all duration-300 rounded-full p-1.5 ${isOpen ? 'bg-cyan-accent text-bg-primary' : 'border border-border-card text-text-secondary group-hover:border-cyan-accent group-hover:text-cyan-accent'}`}>
                        {isOpen ? <X size={16} strokeWidth={3} /> : <Plus size={16} />}
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="bg-bg-card border border-border-card rounded-2xl p-6 md:p-8 ml-12">
                        <p className="text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
