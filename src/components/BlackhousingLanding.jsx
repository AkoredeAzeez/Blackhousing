import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MessageSquare, Send, MessageCircle, Home, Shield, Zap, Users, Star, CheckCircle, ArrowRight, Globe, Clock, Award, Sparkles, MapPin } from "lucide-react";

export default function BlackHousingLanding() {
  const [waitEmail, setWaitEmail] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ wait: null, contact: null });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

  const WHATSAPP_GROUP = "https://chat.whatsapp.com/KKB2uxJN58CAQuqka4wvs6";

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const testimonials = [
    { name: "Adebayo Johnson", course: "Computer Science", text: "Found my perfect bedspace in just 2 days! Zero stress, zero scam.", rating: 5 },
    { name: "Fatima Abdullahi", course: "Electrical Engineering", text: "Best platform for UNILAG students. Direct contact with owners is a game changer!", rating: 5 },
    { name: "Kemi Okafor", course: "Law", text: "No middlemen, no extra fees. Exactly what students need!", rating: 5 }
  ];

  const stats = [
    { number: "2,500+", label: "Happy Students", icon: Users },
    { number: "800+", label: "Verified Properties", icon: Home },
    { number: "98%", label: "Success Rate", icon: Award },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  async function submitWaitlist(e) {
    e.preventDefault();
    if (!waitEmail) return setStatus(prev => ({ ...prev, wait: "Please enter an email" }));
    
    setStatus(prev => ({ ...prev, wait: "loading" }));
    
    setTimeout(() => {
      setStatus(prev => ({ ...prev, wait: "success" }));
      setWaitEmail("");
    }, 1000);
  }

  async function submitContact(e) {
    e.preventDefault();
    if (!contact.email || !contact.message) return setStatus(prev => ({ ...prev, contact: 'Please fill required fields' }));
    
    setStatus(prev => ({ ...prev, contact: 'loading' }));
    
    setTimeout(() => {
      setStatus(prev => ({ ...prev, contact: 'success' }));
      setContact({ name: '', email: '', message: '' });
    }, 1000);
  }

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isLoaded) return;
      
      const startTime = Date.now();
      const endNum = parseInt(end.replace(/[^0-9]/g, ''));
      
      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        setCount(Math.floor(progress * endNum));
        
        if (progress === 1) {
          clearInterval(timer);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [end, duration, isLoaded]);
    
    return <span>{count}{end.includes('%') ? '%' : end.includes('+') ? '+' : ''}</span>;
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden relative">
      {/* Dynamic cursor - hidden on mobile */}
      <div
        className="hidden lg:block fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-300"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'scale(1.2)'
        }}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
              </div>
              <div className="text-lg sm:text-xl font-bold">BLACKHOUSING</div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
              <a href="#how" className="hover:text-emerald-400 transition-colors">How It Works</a>
              <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
              
              <a 
                href={WHATSAPP_GROUP} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Community</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-emerald-400 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-gray-800 py-4">
              <div className="flex flex-col gap-4 px-4">
                <a href="#features" className="hover:text-emerald-400 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#how" className="hover:text-emerald-400 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>How It Works</a>
                <a href="#testimonials" className="hover:text-emerald-400 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Reviews</a>
                <a href="#contact" className="hover:text-emerald-400 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
                
                <a 
                  href={WHATSAPP_GROUP} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Community</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen relative overflow-hidden pt-16 sm:pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Student hostel accommodation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-black/40 to-gray-900/60" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/5 via-transparent to-orange-500/5 opacity-60" />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div 
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            top: '10%', 
            left: '10%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }} 
        />
        <div 
          className="absolute w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            bottom: '20%', 
            right: '10%',
            transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`
          }} 
        />

        {/* Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20">
          {/* Logo */}
          <div className={`mb-8 sm:mb-12 relative transform transition-all duration-1000 ${isLoaded ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center">
              <Home className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-black" />
            </div>
          </div>

          {/* Main Heading */}
          <div className={`mb-6 sm:mb-8 max-w-6xl transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-wider mb-3 sm:mb-4">
              BLACKHOUSING
            </h1>
            
            <div className={`h-0.5 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4 sm:mb-6 transform transition-all duration-1000 delay-500 ${isLoaded ? 'scale-x-100' : 'scale-x-0'}`} />

            <p className={`text-sm sm:text-lg lg:text-xl font-light tracking-widest opacity-80 transform transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Fastest & Easiest Way to Secure Hostel Accommodation in UNILAG
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 lg:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-thin tracking-wider mb-6 sm:mb-8">
              Why Choose Us
            </h2>
            <div className="w-16 sm:w-24 lg:w-32 h-0.5 bg-white mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { title: "Safe & Secure", icon: Shield, description: "100% verified listings and direct contact with property owners" },
              { title: "Fast & Easy", icon: Zap, description: "Find your perfect accommodation in minutes, not days" },
              { title: "24/7 Support", icon: MessageCircle, description: "Always here to help with any questions or issues" }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 sm:mb-6 inline-block">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 group-hover:text-emerald-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <section className="space-y-6 sm:space-y-8">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="font-semibold text-gray-100">UNILAG's #1 Trusted Housing Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 sm:mb-8 tracking-tight text-white">
                <span className="block">Find Your Perfect</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Student Home
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  in UNILAG
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl leading-relaxed mb-6 sm:mb-8">
                The fastest, safest way to find hostel bedspace and private rooms. Connect directly with verified property owners, zero fees, and say goodbye to accommodation scams forever.
              </p>

              {/* CTA Section */}
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <form onSubmit={submitWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <div className="flex-1">
                    <input 
                      value={waitEmail} 
                      onChange={(e) => setWaitEmail(e.target.value)} 
                      type="email" 
                      placeholder="Enter your email address"
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-gray-700 bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:border-emerald-500 transition-colors duration-200 text-sm sm:text-base"
                      disabled={status.wait === 'loading'}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status.wait === 'loading'}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {status.wait === 'loading' ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span>Join Waitlist</span>
                  </button>
                </form>

                {status.wait === 'success' && (
                  <div className="flex items-center gap-3 text-green-400 bg-green-900/20 px-4 py-3 rounded-lg border border-green-500/20 text-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>You're in! We'll notify you when we launch.</span>
                  </div>
                )}
                {status.wait && status.wait !== 'success' && status.wait !== 'loading' && (
                  <div className="text-red-400 text-sm bg-red-900/20 px-4 py-3 rounded-lg border border-red-500/20">{status.wait}</div>
                )}

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={WHATSAPP_GROUP} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-200 font-semibold text-sm sm:text-base"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Join WhatsApp Group</span>
                  </a>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 sm:p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm sm:text-lg">100% Scam-Free</div>
                      <div className="text-xs sm:text-sm text-gray-400">Verified listings only</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm sm:text-lg">Zero Fees</div>
                      <div className="text-xs sm:text-sm text-gray-400">No hidden charges</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Section */}
          <section className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative">
              <div className="relative bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700 shadow-lg">                  
                <div className="relative grid grid-cols-1 gap-4 sm:gap-6">
                  {/* Property Card 1 */}
                  <div className="group bg-gray-700 rounded-lg p-4 sm:p-6 border border-gray-600 hover:border-emerald-500 transition-colors duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Home className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                        <div className="bg-emerald-500/20 text-emerald-300 px-2 sm:px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
                          VERIFIED
                        </div>
                        <div className="bg-amber-500/20 text-amber-300 px-2 sm:px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
                          PREMIUM
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2 text-white group-hover:text-emerald-300 transition-colors duration-300">Private Room Near Faculty of Science</h3>
                    <div className="flex items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                      <span className="font-semibold text-emerald-400">₦25,000/month</span>
                      <span className="hidden sm:inline">•</span>
                      <span>1 room available</span>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>2min walk</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400 font-medium">(4.9) 127 reviews</span>
                    </div>
                  </div>

                  {/* Property Card 2 */}
                  <div className="group bg-gray-700 rounded-lg p-4 sm:p-6 border border-gray-600 hover:border-teal-500 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                        <div className="bg-teal-500/20 text-teal-300 px-2 sm:px-3 py-1 rounded-full text-xs font-bold border border-teal-400/30">
                          POPULAR
                        </div>
                        <div className="bg-rose-500/20 text-rose-300 px-2 sm:px-3 py-1 rounded-full text-xs font-bold border border-rose-400/30">
                          HOT
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2 text-white group-hover:text-teal-300 transition-colors duration-300">Bedspace at Akoka</h3>
                    <div className="flex items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                      <span className="font-semibold text-teal-400">₦12,000/month</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Close to shuttle</span>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>5min walk</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        ))}
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400 font-medium">(4.2) 89 reviews</span>
                    </div>