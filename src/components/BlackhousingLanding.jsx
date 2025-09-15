import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Send, MessageCircle, Home, Shield, Zap, Users, Star, CheckCircle, ArrowRight, Globe, Clock, Award, Sparkles, MapPin } from "lucide-react";

// Premium redesigned landing page for BLACKHOUSING
// Sophisticated emerald & cream color palette with modern aesthetics

export default function BlackHousingLanding() {
  const [waitEmail, setWaitEmail] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ wait: null, contact: null });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    { name: "Fatima Abdullahi", course: "Medicine", text: "Best platform for UNILAG students. Direct contact with owners is a game changer!", rating: 5 },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-slate-100 antialiased overflow-x-hidden relative">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-slate-900 to-teal-900/10" />
        
        {/* Floating orbs with mouse interaction */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            top: '10%', 
            left: '20%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }} 
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            bottom: '20%', 
            right: '10%',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }} 
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ 
            top: '60%', 
            left: '60%',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }} 
        />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/5 via-transparent to-orange-500/5 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 via-transparent to-pink-500/5 opacity-40" />
      </div>

      <div className="relative z-10">
        {/* Sophisticated Header */}
        <header className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-3xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-emerald-400/20">
                  <Home className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  BLACKHOUSING
                </div>
                <div className="text-sm text-emerald-400 font-medium">Premium Student Accommodation</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="relative text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium group">
                <span>Features</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#how" className="relative text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium group">
                <span>How it works</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#testimonials" className="relative text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium group">
                <span>Reviews</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#contact" className="relative text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium group">
                <span>Contact</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full"></div>
              </a>

              <a 
                href={WHATSAPP_GROUP} 
                target="_blank" 
                rel="noreferrer" 
                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl overflow-hidden font-bold transition-all duration-300 hover:shadow-green-500/30 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Join Community</span>
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section with Enhanced Visual Hierarchy */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <section className="space-y-8">
              <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {/* Status Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full border border-emerald-500/20 backdrop-blur-xl mb-8 hover:border-emerald-400/30 transition-colors duration-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">UNILAG's #1 Trusted Housing Platform</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-black leading-[0.9] mb-8 tracking-tight">
                  <span className="block bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text text-transparent drop-shadow-sm">
                    Find Your Perfect
                  </span>
                  <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                    Student Home
                  </span>
                  <span className="block text-4xl md:text-5xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                    in UNILAG
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-8 font-light">
                  The fastest, safest way to find bedspace and private rooms. Connect directly with verified property owners, eliminate middlemen, and say goodbye to accommodation scams forever.
                </p>

                {/* Enhanced CTA Section */}
                <div className="space-y-6 mb-12">
                  <form onSubmit={submitWaitlist} className="flex gap-3 max-w-lg group">
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <input 
                        value={waitEmail} 
                        onChange={(e) => setWaitEmail(e.target.value)} 
                        type="email" 
                        placeholder="Enter your email address"
                        className="relative w-full px-6 py-4 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 placeholder-slate-400 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-100 hover:border-slate-500/60"
                        disabled={status.wait === 'loading'}
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={status.wait === 'loading'}
                      className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold flex items-center gap-3 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {status.wait === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin relative z-10" />
                      ) : (
                        <Send className="w-5 h-5 relative z-10" />
                      )}
                      <span className="relative z-10">Join Waitlist</span>
                    </button>
                  </form>

                  {status.wait === 'success' && (
                    <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                      <CheckCircle className="w-5 h-5" />
                      <span>You're in! We'll notify you when we launch.</span>
                    </div>
                  )}
                  {status.wait && status.wait !== 'success' && status.wait !== 'loading' && (
                    <div className="text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20">{status.wait}</div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={WHATSAPP_GROUP} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-600/30 hover:bg-slate-700/40 hover:border-slate-500/40 hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:text-emerald-400 transition-colors duration-300" />
                      <span>Join WhatsApp Group</span>
                    </a>
                  </div>
                </div>

                {/* Feature Pills with Enhanced Design */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group p-4 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/10 backdrop-blur-sm hover:border-emerald-400/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-emerald-300 text-lg">100% Scam-Free</div>
                        <div className="text-sm text-slate-400">Verified listings only</div>
                      </div>
                    </div>
                  </div>
                  <div className="group p-4 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10 backdrop-blur-sm hover:border-amber-400/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-amber-300 text-lg">Lightning Fast</div>
                        <div className="text-sm text-slate-400">Find homes in minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enhanced Visual Section with Sophisticated Cards */}
            <section className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="relative">
                {/* Main Container */}
                <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-3xl p-8 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-60"></div>
                  
                  <div className="relative grid grid-cols-1 gap-6">
                    {/* Premium Property Card 1 */}
                    <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-slate-600/30 hover:border-emerald-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Home className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30 backdrop-blur-sm">
                            VERIFIED
                          </div>
                          <div className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30 backdrop-blur-sm">
                            PREMIUM
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-slate-100 group-hover:text-emerald-300 transition-colors duration-300">Private Room Near Faculty of Science</h3>
                      <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                        <span className="font-semibold text-emerald-400">₦25,000/month</span>
                        <span>•</span>
                        <span>1 room available</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>2min walk</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-slate-400 font-medium">(4.9) 127 reviews</span>
                      </div>
                    </div>

                    {/* Premium Property Card 2 */}
                    <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-slate-600/30 hover:border-teal-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-400/30 backdrop-blur-sm">
                            POPULAR
                          </div>
                          <div className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-bold border border-rose-400/30 backdrop-blur-sm">
                            HOT
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-slate-100 group-hover:text-teal-300 transition-colors duration-300">Bedspace at Akoka</h3>
                      <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                        <span className="font-semibold text-teal-400">₦12,000/month</span>
                        <span>•</span>
                        <span>Close to shuttle</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>5min walk</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                          <Star className="w-4 h-4 text-slate-500" />
                        </div>
                        <span className="text-sm text-slate-400 font-medium">(4.2) 89 reviews</span>
                      </div>
                    </div>

                    {/* Enhanced Features Grid */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="group bg-slate-800/40 rounded-xl p-3 text-center border border-slate-600/30 hover:border-emerald-500/30 transition-colors duration-300 backdrop-blur-sm">
                        <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-xs font-bold text-slate-300">Verified</div>
                      </div>
                      <div className="group bg-slate-800/40 rounded-xl p-3 text-center border border-slate-600/30 hover:border-teal-500/30 transition-colors duration-300 backdrop-blur-sm">
                        <MessageCircle className="w-6 h-6 text-teal-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-xs font-bold text-slate-300">Direct Chat</div>
                      </div>
                      <div className="group bg-slate-800/40 rounded-xl p-3 text-center border border-slate-600/30 hover:border-amber-500/30 transition-colors duration-300 backdrop-blur-sm">
                        <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-xs font-bold text-slate-300">No Fees</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sophisticated Floating Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl animate-pulse opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 -right-4 w-24 h-24 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse opacity-40" style={{ animationDelay: '4s' }}></div>
              </div>
            </section>
          </div>
        </main>

        {/* Enhanced Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-3xl p-12 backdrop-blur-xl border border-slate-700/40 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/5 via-transparent to-orange-500/5 opacity-60"></div>
            
            <div className="relative text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-slate-400 font-light">Join the fastest-growing student housing community in UNILAG</p>
            </div>
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="group text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-emerald-500/20 group-hover:scale-110 group-hover:border-emerald-400/40 transition-all duration-500">
                        <IconComponent className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors duration-500">
                      <AnimatedCounter end={stat.number} />
                    </div>
                    <div className="text-slate-400 font-medium group-hover:text-slate-300 transition-colors duration-300">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full border border-emerald-500/20 backdrop-blur-xl mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300">Why Choose BLACKHOUSING</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-6">
              Premium Features
            </h2>
            <p className="text-2xl text-slate-400 max-w-4xl mx-auto font-light">
              Everything you need to find the perfect student accommodation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Scam-Free Zone",
                description: "AI-powered verification system ensures every listing is genuine. Your safety is our priority.",
                gradient: "from-emerald-500 to-teal-600",
                bgGradient: "from-emerald-500/5 to-teal-500/5",
                borderColor: "border-emerald-500/10",
                hoverBorder: "hover:border-emerald-500/30",
                features: ["ID Verification", "Background Checks", "Secure Payments", "24/7 Monitoring"]
              },
              {
                icon: Zap,
                title: "Lightning Fast Matching",
                description: "Advanced algorithms match you with perfect properties instantly. Real-time notifications.",
                gradient: "from-amber-500 to-orange-600",
                bgGradient: "from-amber-500/5 to-orange-500/5",
                borderColor: "border-amber-500/10",
                hoverBorder: "hover:border-amber-500/30",
                features: ["Instant Matching", "Real-time Alerts", "Smart Filters", "Quick Booking"]
              },
              {
                icon: MessageCircle,
                title: "Direct Connection",
                description: "Chat directly with verified property owners. No middlemen, no extra fees, pure convenience.",
                gradient: "from-rose-500 to-pink-600",
                bgGradient: "from-rose-500/5 to-pink-500/5",
                borderColor: "border-rose-500/10",
                hoverBorder: "hover:border-rose-500/30",
                features: ["Direct Chat", "Video Calls", "No Middlemen", "Transparent Pricing"]
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 backdrop-blur-xl ${feature.borderColor} ${feature.hoverBorder} transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 mx-auto bg-gradient-to-br ${feature.gradient} shadow-2xl transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-100 mb-6 text-center group-hover:text-emerald-300 transition-colors duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-center leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-slate-300 text-sm font-medium group-hover:text-slate-200 transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-2xl text-slate-400 font-light">Simple steps to find your perfect home</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Search & Filter", description: "Browse verified listings by faculty, price, distance to campus, and amenities.", icon: Globe, color: "emerald" },
              { step: "02", title: "Direct Chat", description: "Message property owners directly via in-app chat or WhatsApp. No middlemen involved.", icon: MessageCircle, color: "teal" },
              { step: "03", title: "Move In Safely", description: "Secure your space with verified documentation and community-backed trust.", icon: CheckCircle, color: "amber" }
            ].map((step, index) => {
              const IconComponent = step.icon;
              const colorMap = {
                emerald: { bg: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/50", text: "text-emerald-400" },
                teal: { bg: "from-teal-500 to-teal-600", shadow: "shadow-teal-500/50", text: "text-teal-400" },
                amber: { bg: "from-amber-500 to-amber-600", shadow: "shadow-amber-500/50", text: "text-amber-400" }
              };
              const colors = colorMap[step.color];
              
              return (
                <div key={index} className="relative group text-center">
                  <div className={`w-24 h-24 bg-gradient-to-br ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ${colors.shadow} group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-8xl font-black text-slate-800/30 mb-4 group-hover:text-slate-700/40 transition-colors duration-300">{step.step}</div>
                  <h3 className={`text-2xl font-bold text-slate-100 mb-4 group-hover:${colors.text} transition-colors duration-300`}>{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{step.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent transform translate-x-4"></div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full border border-emerald-500/20 backdrop-blur-xl mb-8">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-emerald-300">Student Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-6">
              Success Stories
            </h2>
            <p className="text-2xl text-slate-400 font-light">Hear from students who found their perfect home</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-12">
                    <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-3xl p-12 backdrop-blur-xl border border-slate-700/40 text-center shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-60"></div>
                      
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        
                        <div className="flex justify-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                          ))}
                        </div>
                        
                        <p className="text-2xl text-slate-300 mb-8 italic leading-relaxed font-light">
                          "{testimonial.text}"
                        </p>
                        <h4 className="text-2xl font-bold text-slate-100 mb-2">{testimonial.name}</h4>
                        <p className="text-emerald-300 font-medium">{testimonial.course} Student</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-12 space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    currentTestimonial === index 
                      ? 'bg-emerald-500 scale-125 shadow-lg shadow-emerald-500/50' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Premium Contact Section */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
          <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-3xl p-12 backdrop-blur-xl border border-slate-700/40 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/5 via-transparent to-orange-500/5 opacity-60"></div>
            
            <div className="relative text-center mb-12">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full border border-emerald-500/20 backdrop-blur-xl mb-8">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Get In Touch</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-6">
                Contact Us
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
                Have questions or want to list your property? We're here to help students find their perfect home.
              </p>
            </div>
            
            <div className="relative grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {[
                    { icon: Mail, title: "Email Us", detail: "hello@blackhousing.ng", gradient: "from-blue-500 to-cyan-600" },
                    { icon: Phone, title: "Call Us", detail: "+234 800 000 0000", gradient: "from-emerald-500 to-teal-600" },
                    { icon: MessageCircle, title: "WhatsApp", detail: "Join our community chat", gradient: "from-purple-500 to-pink-600" }
                  ].map((contact, idx) => {
                    const IconComponent = contact.icon;
                    return (
                      <div key={idx} className="group flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-600/30 hover:border-emerald-500/30 backdrop-blur-sm transition-all duration-300">
                        <div className={`w-12 h-12 bg-gradient-to-br ${contact.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors duration-300">{contact.title}</div>
                          <div className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{contact.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
                  <h3 className="font-bold text-emerald-300 mb-3 text-lg">Office Hours</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                      { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                      { day: "Sunday", hours: "Closed" }
                    ].map((schedule, idx) => (
                      <div key={idx} className="flex justify-between hover:text-emerald-300 transition-colors duration-300">
                        <span className="text-slate-400">{schedule.day}</span>
                        <span className="text-slate-200 font-medium">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={submitContact} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    value={contact.name} 
                    onChange={(e) => setContact({ ...contact, name: e.target.value })} 
                    placeholder="Your name"
                    className="px-6 py-4 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-600/30 placeholder-slate-400 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-100 hover:border-slate-500/40"
                  />
                  <input 
                    value={contact.email} 
                    onChange={(e) => setContact({ ...contact, email: e.target.value })} 
                    placeholder="Your email *"
                    type="email"
                    required
                    className="px-6 py-4 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-600/30 placeholder-slate-400 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-100 hover:border-slate-500/40"
                  />
                </div>
                
                <textarea 
                  value={contact.message} 
                  onChange={(e) => setContact({ ...contact, message: e.target.value })} 
                  placeholder="Your message *"
                  required
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-600/30 placeholder-slate-400 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-100 resize-none hover:border-slate-500/40"
                />

                <button 
                  type="submit" 
                  disabled={status.contact === 'loading'}
                  className="group relative w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold flex items-center justify-center gap-3 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {status.contact === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin relative z-10" />
                  ) : (
                    <Send className="w-5 h-5 relative z-10" />
                  )}
                  <span className="relative z-10">Send Message</span>
                </button>

                {status.contact === 'success' && (
                  <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent! We'll reply within 24 hours.</span>
                  </div>
                )}
                {status.contact === 'error' && (
                  <div className="text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20 backdrop-blur-sm">
                    Error sending message. Please try again or contact us directly.
                  </div>
                )}
                {status.contact && status.contact !== 'success' && status.contact !== 'error' && status.contact !== 'loading' && (
                  <div className="text-amber-400 text-sm bg-amber-500/10 px-4 py-3 rounded-xl border border-amber-500/20 backdrop-blur-sm">
                    {status.contact}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-16 backdrop-blur-xl border border-emerald-500/20 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-60"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-emerald-500/5 to-transparent opacity-60"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-8">🏠</div>
                <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-8 leading-tight">
                  Ready to Find Your Perfect Home?
                </h2>
                <p className="text-2xl text-slate-400 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
                  Join thousands of UNILAG students who have transformed their accommodation experience with BLACKHOUSING
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <a 
                    href={WHATSAPP_GROUP} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-2xl font-black text-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-110"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <MessageCircle className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">Join Community Now</span>
                    <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  
                  <div className="inline-flex items-center gap-4 px-12 py-6 bg-slate-800/30 backdrop-blur-xl rounded-full border border-slate-600/30 font-bold text-lg hover:border-emerald-500/30 transition-colors duration-300">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <span>100% Free to Join</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {[
                    { color: "emerald", text: "Zero Scam Guarantee" },
                    { color: "teal", text: "Instant Matching" },
                    { color: "amber", text: "24/7 Support" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-center space-x-3 text-slate-300 hover:text-slate-100 transition-colors duration-300">
                      <div className={`w-3 h-3 bg-${item.color}-500 rounded-full animate-pulse`}></div>
                      <span className="font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sophisticated Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-75"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black bg-gradient-to-r from-slate-100 to-emerald-200 bg-clip-text text-transparent">
                    BLACKHOUSING
                  </div>
                  <div className="text-sm text-emerald-400 font-medium">Premium Student Housing Platform</div>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md mb-8 font-light">
                Connecting UNILAG students with verified, safe, and affordable accommodation. No middlemen, no scams, just pure convenience.
              </p>
              <div className="flex space-x-4">
                {[
                  { href: WHATSAPP_GROUP, icon: MessageCircle, gradient: "from-green-500 to-emerald-600" },
                  { href: "mailto:hello@blackhousing.ng", icon: Mail, gradient: "from-blue-500 to-cyan-600" }
                ].map((social, idx) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={idx}
                      href={social.href} 
                      target={social.href.includes('http') ? '_blank' : undefined}
                      rel={social.href.includes('http') ? 'noreferrer' : undefined}
                      className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { href: "#features", text: "Features" },
                  { href: "#how", text: "How It Works" },
                  { href: "#testimonials", text: "Reviews" },
                  { href: "#contact", text: "Contact" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      className="text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 transform inline-block font-medium"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-6">Support</h3>
              <ul className="space-y-4">
                {[
                  { href: "#", text: "Help Center" },
                  { href: "#", text: "Safety Tips" },
                  { href: "#", text: "Property Owners" },
                  { href: "#", text: "Terms & Privacy" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      className="text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 transform inline-block font-medium"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-slate-400 text-sm font-light">
                © 2024 BLACKHOUSING. All rights reserved. Made with ❤️ for UNILAG students.
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Platform Status: Online</span>
                </div>
                <div className="text-slate-400">
                  🇳🇬 Proudly Nigerian
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}