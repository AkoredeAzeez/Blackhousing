import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, MessageCircle, Home, Shield, Zap, Users, Star, CheckCircle, ArrowRight, Globe, Clock, Award, Sparkles, MapPin } from "lucide-react";

export default function BlackHousingLanding() {
  const [waitEmail, setWaitEmail] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ wait: null, contact: null });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const isInView = useInView(heroRef, { once: true });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const WHATSAPP_GROUP = "https://chat.whatsapp.com/KKB2uxJN58CAQuqka4wvs6";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

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

  // Enhanced email validation from the second document
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  async function submitWaitlist(e) {
    e.preventDefault();
    
    if (!waitEmail) {
      setStatus(prev => ({ ...prev, wait: "Please enter an email address" }));
      return;
    }
    
    if (!isValidEmail(waitEmail)) {
      setStatus(prev => ({ ...prev, wait: "Please enter a valid email address" }));
      return;
    }
    
    setStatus(prev => ({ ...prev, wait: "loading" }));
    
    try {
      const response = await fetch(`${API_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: waitEmail,
          response: 'waitlist_signup',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(prev => ({ ...prev, wait: "success" }));
        setWaitEmail("");
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus(prev => ({ ...prev, wait: null }));
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Waitlist error:', error);
      setStatus(prev => ({ 
        ...prev, 
        wait: error.message.includes('fetch') 
          ? "Network error. Please check your connection and try again." 
          : error.message || "Something went wrong. Please try again."
      }));
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, wait: null }));
      }, 5000);
    }
  }

  async function submitContact(e) {
    e.preventDefault();
    
    if (!contact.email || !contact.message) {
      setStatus(prev => ({ ...prev, contact: 'Please fill in all required fields' }));
      return;
    }
    
    if (!isValidEmail(contact.email)) {
      setStatus(prev => ({ ...prev, contact: 'Please enter a valid email address' }));
      return;
    }
    
    setStatus(prev => ({ ...prev, contact: 'loading' }));
    
    try {
      const response = await fetch(`${API_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: contact.email,
          response: `contact_form: ${JSON.stringify({
            name: contact.name || 'Not provided',
            message: contact.message
          })}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(prev => ({ ...prev, contact: 'success' }));
        setContact({ name: '', email: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus(prev => ({ ...prev, contact: null }));
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact error:', error);
      setStatus(prev => ({ 
        ...prev, 
        contact: error.message.includes('fetch') 
          ? "Network error. Please check your connection and try again." 
          : error.message || "Something went wrong. Please try again."
      }));
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, contact: null }));
      }, 5000);
    }
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
      {/* Futuristic cursor */}
      <motion.div
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
              </div>
              <div className="text-lg sm:text-xl font-bold tracking-wider">BLACKHOUSING</div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#features" className="hover:text-white/70 transition-colors text-sm">Features</a>
              <a href="#how" className="hover:text-white/70 transition-colors text-sm">How It Works</a>
              <a href="#testimonials" className="hover:text-white/70 transition-colors text-sm">Reviews</a>
              <a href="#contact" className="hover:text-white/70 transition-colors text-sm">Contact</a>
              
              <a 
                href={WHATSAPP_GROUP} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden lg:inline">Join Community</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <a 
                href={WHATSAPP_GROUP} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-3 py-2 bg-white text-black rounded-lg text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero section - Mobile optimized */}
      <motion.section
        ref={heroRef}
        className="h-screen sm:h-screen relative overflow-hidden"
        style={{ scale }}
      >
        {/* Minimal background */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ y: yBg }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating geometric shapes */}
        <div 
          className="absolute w-32 h-32 sm:w-64 sm:h-64 border border-white/5 rounded-full transition-transform duration-1000 ease-out"
          style={{ 
            top: '20%', 
            left: '10%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }} 
        />
        <div 
          className="absolute w-24 h-24 sm:w-48 sm:h-48 border border-white/10 rounded-full transition-transform duration-1000 ease-out"
          style={{ 
            bottom: '30%', 
            right: '15%',
            transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`
          }} 
        />

        {/* Main content */}
        <motion.div
          className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
          style={{ y: yText }}
        >
          {/* Logo */}
          <motion.div
            className="mb-6 sm:mb-12 relative"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ duration: 2, type: "spring", stiffness: 100, delay: 0.5 }}
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center">
              <Home className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div className="mb-6 sm:mb-8 max-w-6xl">
            <motion.h1
              className="text-4xl sm:text-6xl md:text-8xl font-thin tracking-wider mb-2 sm:mb-4"
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.5, delay: 1 }}
            >
              BLACKHOUSING
            </motion.h1>
            
            <motion.div
              className="h-0.5 w-20 sm:w-32 bg-white mx-auto mb-4 sm:mb-6"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, delay: 2.5 }}
            />

            <motion.p
              className="text-sm sm:text-xl md:text-2xl font-light tracking-widest opacity-80"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.8 } : {}}
              transition={{ duration: 1, delay: 3 }}
            >
              Premium Student Accommodation
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section - Creative 2x2 Layout */}
      <motion.section
        id="features"
        className="py-12 sm:py-20 md:py-32 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Geometric background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white transform rotate-45"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white transform rotate-12"></div>
            <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-white rounded-full opacity-20"></div>
            <div className="absolute bottom-1/3 left-1/6 w-20 h-20 bg-white transform rotate-45 opacity-10"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-black tracking-wider mb-4 sm:mb-8 relative"
            >
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Why Choose Us
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white"></div>
            </motion.h2>
            <motion.div
              className="w-20 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            {[
              { 
                title: "Safe & Secure", 
                icon: Shield, 
                description: "100% verified listings with AI-powered fraud detection. Direct contact with property owners only.",
                pattern: "diagonal-lines",
                accent: "top-right"
              },
              { 
                title: "Lightning Fast", 
                icon: Zap, 
                description: "Advanced matching algorithms find your perfect accommodation in under 60 seconds.",
                pattern: "dots",
                accent: "top-left"
              },
              { 
                title: "24/7 Support", 
                icon: MessageCircle, 
                description: "Always-on community support with real-time assistance via WhatsApp and in-app chat.",
                pattern: "grid",
                accent: "bottom-right"
              },
              { 
                title: "Zero Fees", 
                icon: CheckCircle, 
                description: "No hidden charges, no agent fees, no commission. Connect directly and save money.",
                pattern: "circles",
                accent: "bottom-left"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Main card */}
                  <div className="relative bg-white text-black p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-black hover:scale-105 transition-all duration-500 overflow-hidden">
                    {/* Background patterns based on feature */}
                    <div className="absolute inset-0 opacity-5">
                      {feature.pattern === "diagonal-lines" && (
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, black, black 2px, transparent 2px, transparent 12px)`
                        }}></div>
                      )}
                      {feature.pattern === "dots" && (
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 25% 25%, black 2px, transparent 2px)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      )}
                      {feature.pattern === "grid" && (
                        <div className="absolute inset-0" style={{
                          backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      )}
                      {feature.pattern === "circles" && (
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 8px, black 8px, black 10px, transparent 10px)`,
                          backgroundSize: '30px 30px'
                        }}></div>
                      )}
                    </div>

                    {/* Accent corner */}
                    <div className={`absolute w-16 h-16 bg-black ${
                      feature.accent === "top-right" ? "top-0 right-0 rounded-bl-3xl" :
                      feature.accent === "top-left" ? "top-0 left-0 rounded-br-3xl" :
                      feature.accent === "bottom-right" ? "bottom-0 right-0 rounded-tl-3xl" :
                      "bottom-0 left-0 rounded-tr-3xl"
                    }`}></div>

                    {/* Icon container */}
                    <div className="relative mb-6">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        {/* Icon glow effect */}
                        <div className="absolute inset-0 bg-black rounded-full animate-pulse opacity-20"></div>
                      </div>
                      
                      {/* Floating accent shapes */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-black rounded-full opacity-60 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black transform rotate-45 opacity-40 group-hover:rotate-90 transition-transform duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="relative text-center">
                      <h3 className="text-xl sm:text-2xl font-black mb-4 tracking-wider group-hover:tracking-widest transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      {/* Separator line */}
                      <div className="w-12 h-0.5 bg-black mx-auto mb-4 group-hover:w-16 transition-all duration-300"></div>
                      
                      <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </div>

                  {/* Shadow card behind */}
                  <div className="absolute inset-0 bg-black rounded-3xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom accent */}
          <div className="flex justify-center mt-12 sm:mt-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-0.5 bg-white"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-16 h-0.5 bg-white"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-8 h-0.5 bg-white"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content Section - Mobile optimized */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <section className="space-y-6 sm:space-y-8">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-800 rounded-full mb-6 sm:mb-8">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-xs sm:text-sm font-semibold text-gray-100">UNILAG's #1 Trusted Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-6 sm:mb-8 tracking-tight text-white">
                <span className="block">
                  Find Your Perfect
                </span>
                <span className="block text-white">
                  Student Home
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl text-gray-400">
                  in UNILAG
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed mb-6 sm:mb-8">
                The fastest, safest way to find bedspace and private rooms. Connect directly with verified property owners.
              </p>

              {/* CTA Section */}
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <form onSubmit={submitWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <div className="flex-1">
                    <input 
                      value={waitEmail} 
                      onChange={(e) => setWaitEmail(e.target.value)} 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-lg border border-gray-700 bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:border-white transition-colors duration-200"
                      disabled={status.wait === 'loading'}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status.wait === 'loading'}
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status.wait === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    <span>Join Waitlist</span>
                  </button>
                </form>

                {status.wait && status.wait !== 'loading' && (
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                    status.wait === 'success'
                      ? 'text-white bg-gray-800 border-gray-600'
                      : 'text-red-400 bg-red-500/10 border-red-500/20'
                  }`}>
                    {status.wait === 'success' && <CheckCircle className="w-5 h-5" />}
                    <span>
                      {status.wait === 'success' 
                        ? "You're in! We'll notify you when we launch."
                        : status.wait
                      }
                    </span>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={WHATSAPP_GROUP} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-200 font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
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
                      <div className="font-bold text-white text-base sm:text-lg">100% Scam-Free</div>
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
                      <div className="font-bold text-white text-base sm:text-lg">Lightning Fast</div>
                      <div className="text-xs sm:text-sm text-gray-400">Find homes in minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Section - Mobile optimized */}
          <section className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative">
              <div className="relative bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700 shadow-lg">                  
                <div className="relative grid grid-cols-1 gap-4 sm:gap-6">
                  {/* Property Cards */}
                  <div className="group bg-gray-700 rounded-lg p-4 sm:p-6 border border-gray-600 hover:border-white transition-colors duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <Home className="w-5 h-5 sm:w-8 sm:h-8 text-black" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-600 text-gray-300 px-2 py-1 rounded-full text-xs font-bold">
                          VERIFIED
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">MOREMI HALL</h3>
                    <div className="flex items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                      <span className="font-semibold text-white">₦300,000</span>
                      <span>•</span>
                      <span>1 Bedspace available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-white">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400">(4.9) 127 reviews</span>
                    </div>
                  </div>

                  <div className="group bg-gray-700 rounded-lg p-4 sm:p-6 border border-gray-600 hover:border-white transition-colors duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="w-5 h-5 sm:w-8 sm:h-8 text-black" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-600 text-gray-300 px-2 py-1 rounded-full text-xs font-bold">
                          POPULAR
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">MAKAMA</h3>
                    <div className="flex items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                      <span className="font-semibold text-white">₦255,000</span>
                      <span>•</span>
                      <span>4 MAN ROOM BEDSPACE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-white">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        ))}
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400">(4.2) 89 reviews</span>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-4">
                    <div className="bg-gray-700 rounded-xl p-2 sm:p-3 text-center border border-gray-600">
                      <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto mb-1 sm:mb-2" />
                      <div className="text-xs font-bold text-gray-300">Verified</div>
                    </div>
                    <div className="bg-gray-700 rounded-xl p-2 sm:p-3 text-center border border-gray-600">
                      <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto mb-1 sm:mb-2" />
                      <div className="text-xs font-bold text-gray-300">Direct Chat</div>
                    </div>
                    <div className="bg-gray-700 rounded-xl p-2 sm:p-3 text-center border border-gray-600">
                      <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto mb-1 sm:mb-2" />
                      <div className="text-xs font-bold text-gray-300">No Fees</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Stats Section - Compact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="relative bg-gray-900 rounded-3xl p-6 sm:p-12 backdrop-blur-xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="relative text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 font-light">Join the fastest-growing community</p>
          </div>
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4">
                    <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-600">
                      <IconComponent className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2">
                    <AnimatedCounter end={stat.number} />
                  </div>
                  <div className="text-gray-400 font-medium text-sm sm:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Compact */}
      <section id="how" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            How It Works
          </h2>
          <p className="text-lg sm:text-2xl text-gray-400 font-light">Simple steps to find your home</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { step: "01", title: "Search & Filter", description: "Browse verified listings by location and price.", icon: Globe },
            { step: "02", title: "Direct Chat", description: "Message property owners directly. No middlemen.", icon: MessageCircle },
            { step: "03", title: "Move In Safely", description: "Secure your space with verified documentation and community trust.", icon: CheckCircle }
          ].map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                  <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
                </div>
                <div className="text-4xl sm:text-8xl font-black text-gray-800 mb-2 sm:mb-4">{step.step}</div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 sm:top-12 left-full w-4 sm:w-8 h-0.5 bg-white/20 transform translate-x-4"></div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials - Compact */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Success Stories
          </h2>
          <p className="text-lg sm:text-2xl text-gray-400 font-light">Hear from students who found their home</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-4 sm:p-12">
                  <div className="relative bg-gray-900 rounded-3xl p-6 sm:p-12 border border-gray-700 text-center shadow-2xl overflow-hidden">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-20 sm:h-20 bg-white rounded-full mx-auto mb-4 sm:mb-8 flex items-center justify-center shadow-2xl">
                        <Users className="w-6 h-6 sm:w-10 sm:h-10 text-black" />
                      </div>
                      
                      <div className="flex justify-center mb-4 sm:mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-lg sm:text-2xl text-gray-300 mb-4 sm:mb-8 italic leading-relaxed font-light">
                        "{testimonial.text}"
                      </p>
                      <h4 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">{testimonial.name}</h4>
                      <p className="text-gray-400 font-medium text-sm sm:text-base">{testimonial.course} Student</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 sm:mt-12 space-x-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 ${
                  currentTestimonial === index 
                    ? 'bg-white scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Compact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="relative bg-gray-900 rounded-3xl p-6 sm:p-12 border border-gray-700 shadow-2xl overflow-hidden">
          <div className="relative text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
              Contact Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light">
              Have questions or want to list your property? We're here to help.
            </p>
          </div>
          
          <div className="relative grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: Mail, title: "Email Us", detail: "blackhousing65@gmail.com" },
                  { icon: Phone, title: "Call Us", detail: "+2349161746356" },
                  { icon: MessageCircle, title: "WhatsApp", detail: "Join our community chat" }
                ].map((contact, idx) => {
                  const IconComponent = contact.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800 rounded-2xl border border-gray-600">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm sm:text-base">{contact.title}</div>
                        <div className="text-gray-400 text-xs sm:text-sm">{contact.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-600">
                <h3 className="font-bold text-white mb-3 text-base sm:text-lg">Office Hours</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                    { day: "Sunday", hours: "Closed" }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-400">{schedule.day}</span>
                      <span className="text-gray-200 font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={submitContact} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <input 
                  value={contact.name} 
                  onChange={(e) => setContact({ ...contact, name: e.target.value })} 
                  placeholder="Your name"
                  className="px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-gray-800 border border-gray-600 placeholder-gray-400 outline-none focus:border-white transition-all duration-300 text-white"
                />
                <input 
                  value={contact.email} 
                  onChange={(e) => setContact({ ...contact, email: e.target.value })} 
                  placeholder="Your email *"
                  type="email"
                  required
                  className="px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-gray-800 border border-gray-600 placeholder-gray-400 outline-none focus:border-white transition-all duration-300 text-white"
                />
              </div>
              
              <textarea 
                value={contact.message} 
                onChange={(e) => setContact({ ...contact, message: e.target.value })} 
                placeholder="Your message *"
                required
                rows={4}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-gray-800 border border-gray-600 placeholder-gray-400 outline-none focus:border-white transition-all duration-300 text-white resize-none"
              />

              <button 
                type="submit" 
                disabled={status.contact === 'loading'}
                className="w-full px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status.contact === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>Send Message</span>
              </button>

              {status.contact && status.contact !== 'loading' && (
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                  status.contact === 'success'
                    ? 'text-white bg-gray-800 border-gray-600'
                    : 'text-red-400 bg-red-500/10 border-red-500/20'
                }`}>
                  {status.contact === 'success' && <CheckCircle className="w-5 h-5" />}
                  <span>
                    {status.contact === 'success' 
                      ? "Message sent! We'll reply within 24 hours."
                      : status.contact
                    }
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Compact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center">
          <div className="relative bg-gray-900 rounded-3xl p-8 sm:p-16 border border-gray-700 shadow-2xl overflow-hidden">
            <div className="relative z-10">
              <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">🏠</div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight">
                Ready to Find Your Perfect Home?
              </h2>
              <p className="text-lg sm:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-4xl mx-auto font-light leading-relaxed">
                Join thousands of UNILAG students who have transformed their accommodation experience
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
                <a 
                  href={WHATSAPP_GROUP} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-3 sm:gap-4 px-8 py-4 sm:px-12 sm:py-6 bg-white text-black rounded-full shadow-2xl font-black text-lg sm:text-xl transition-all duration-300 hover:bg-gray-200 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Join Community Now</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                
                <div className="inline-flex items-center gap-3 sm:gap-4 px-8 py-4 sm:px-12 sm:py-6 bg-gray-800 rounded-full border border-gray-600 font-bold text-base sm:text-lg">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span>100% Free to Join</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
                {[
                  { text: "Zero Scam Guarantee" },
                  { text: "Instant Matching" },
                  { text: "24/7 Support" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-center space-x-3 text-gray-300">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                    <span className="font-semibold text-sm sm:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <Home className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  BLACKHOUSING
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Premium Student Housing Platform</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6 sm:mb-8 font-light text-sm sm:text-base">
              Connecting UNILAG students with verified, safe, and affordable accommodation. No middlemen, no scams.
            </p>
            <div className="flex space-x-4">
              {[
                { href: WHATSAPP_GROUP, icon: MessageCircle },
                { href: "mailto:hello@blackhousing.ng", icon: Mail }
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={idx}
                    href={social.href} 
                    target={social.href.includes('http') ? '_blank' : undefined}
                    rel={social.href.includes('http') ? 'noreferrer' : undefined}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-all duration-300 shadow-lg"
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { href: "#features", text: "Features" },
                { href: "#how", text: "How It Works" },
                { href: "#testimonials", text: "Reviews" },
                { href: "#contact", text: "Contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm sm:text-base"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Support</h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { href: "#", text: "Help Center" },
                { href: "#", text: "Safety Tips" },
                { href: "#", text: "Property Owners" },
                { href: "#", text: "Terms & Privacy" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm sm:text-base"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-gray-400 text-xs sm:text-sm font-light text-center md:text-left">
              © 2024 BLACKHOUSING. All rights reserved. Made with ❤️ for UNILAG students.
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Platform Status: Online</span>
              </div>
              <div className="text-gray-400">
                🇳🇬 Proudly Nigerian
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}