import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessType: '',
    needs: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    }
    
    if (!formData.businessType.trim()) {
      newErrors.businessType = 'Business type is required';
    }
    
    if (!formData.needs.trim()) {
      newErrors.needs = 'Please tell us about your needs';
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
    
    // Simulate API call - replace with actual backend integration
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const leads = JSON.parse(localStorage.getItem('gridline_leads') || '[]');
      const newLead = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      leads.push(newLead);
      localStorage.setItem('gridline_leads', JSON.stringify(leads));
      
      // In production, this would:
      // 1. Send data to backend API
      // 2. Save to database (Supabase/Firebase/etc)
      // 3. Send email notification to team
      // 4. Send confirmation email to customer
      
      console.log('New lead submitted:', newLead);
      console.log('Total leads:', leads.length);
      
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <CheckCircle className="text-cyan-accent mx-auto mb-6" size={64} />
          <h1 className="text-4xl font-bold mb-4">Thank you! We'll contact you soon.</h1>
          <p className="text-text-tertiary text-lg mb-8">
            Your project request has been received. Our team will review your information and reach out within 24 hours via email or WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onNavigate('home')}
              className="bg-cyan-accent text-bg-primary px-8 py-3 rounded-full font-bold hover:brightness-110 transition"
            >
              Back to Home
            </button>
            <button 
              onClick={() => onNavigate('portfolio')}
              className="border-2 border-cyan-accent text-cyan-accent px-8 py-3 rounded-full font-bold hover:bg-cyan-accent hover:text-bg-primary transition"
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-cyan-accent text-xs font-bold tracking-widest uppercase mb-4">START YOUR PROJECT</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's build something great together.</h1>
          <p className="text-text-tertiary text-lg">
            Tell us about your business and goals. We'll get back to you within 24 hours with a custom strategy.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-bg-card border ${errors.name ? 'border-red-500' : 'border-border-card'} rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-accent transition`}
              placeholder="John Doe"
            />
            {errors.name && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-bg-card border ${errors.email ? 'border-red-500' : 'border-border-card'} rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-accent transition`}
              placeholder="john@company.com"
            />
            {errors.email && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.email}
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-semibold mb-2">
              WhatsApp Number *
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className={`w-full bg-bg-card border ${errors.whatsapp ? 'border-red-500' : 'border-border-card'} rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-accent transition`}
              placeholder="+1 (604) 555-0199"
            />
            {errors.whatsapp && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.whatsapp}
              </div>
            )}
          </div>

          {/* Business Type */}
          <div>
            <label htmlFor="businessType" className="block text-sm font-semibold mb-2">
              Business Type *
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className={`w-full bg-bg-card border ${errors.businessType ? 'border-red-500' : 'border-border-card'} rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-accent transition`}
            >
              <option value="">Select your business type</option>
              <option value="startup">Startup</option>
              <option value="small-business">Small Business</option>
              <option value="medium-business">Medium Business</option>
              <option value="enterprise">Enterprise</option>
              <option value="agency">Agency</option>
              <option value="ecommerce">E-commerce</option>
              <option value="saas">SaaS</option>
              <option value="other">Other</option>
            </select>
            {errors.businessType && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.businessType}
              </div>
            )}
          </div>

          {/* Needs */}
          <div>
            <label htmlFor="needs" className="block text-sm font-semibold mb-2">
              Tell us about your project *
            </label>
            <textarea
              id="needs"
              name="needs"
              value={formData.needs}
              onChange={handleChange}
              rows={6}
              className={`w-full bg-bg-card border ${errors.needs ? 'border-red-500' : 'border-border-card'} rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-accent transition resize-none`}
              placeholder="What are your goals? What challenges are you facing? What services are you interested in?"
            />
            {errors.needs && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                {errors.needs}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-accent text-bg-primary py-4 rounded-full font-bold hover:brightness-110 hover:shadow-lg hover:shadow-cyan-accent/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Project Request →'}
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-12 bg-bg-card border border-border-card rounded-xl p-8">
          <h3 className="font-bold mb-4">What happens next?</h3>
          <ul className="space-y-3 text-text-secondary text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-cyan-accent flex-shrink-0 mt-0.5" size={20} />
              <span>We'll review your information within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-cyan-accent flex-shrink-0 mt-0.5" size={20} />
              <span>Our team will reach out via email or WhatsApp to discuss your project</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-cyan-accent flex-shrink-0 mt-0.5" size={20} />
              <span>We'll create a custom proposal with timeline and pricing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-cyan-accent flex-shrink-0 mt-0.5" size={20} />
              <span>Once approved, we'll start building your digital solution</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
