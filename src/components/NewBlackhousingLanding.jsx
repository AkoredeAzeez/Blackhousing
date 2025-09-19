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

  // Enhanced email validation
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

      {/* Animated background gradient */}
      <motion.div 
        className="fixed inset-0 opacity-20"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.1),transparent_50%)]" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-white/30 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 backdrop-blur-sm bg-black/20 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                BlackHousing
              </span>
            </motion.div>
            
            <motion.a
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join Community</span>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-32 pb-20 px-6 min-h-screen flex items-center"
        style={{ scale }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            style={{ y: yText }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-3 mb-8">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-medium">Beta Launch Coming Soon</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-white via-amber-200 to-orange-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Student Housing
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              The first AI-powered platform connecting UNILAG students directly with verified property owners. 
              <span className="text-amber-400 font-semibold"> Zero middlemen, zero stress, zero scams.</span>
            </motion.p>

            {/* Waitlist Form */}
            <motion.div 
              className="max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <form onSubmit={submitWaitlist} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={waitEmail}
                    onChange={(e) => setWaitEmail(e.target.value)}
                    placeholder="Enter your email to get early access"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                    disabled={status.wait === 'loading'}
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status.wait === 'loading'}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: status.wait === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status.wait === 'loading' ? 1 : 0.98 }}
                >
                  {status.wait === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Early Access</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {status.wait && status.wait !== 'loading' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-center p-3 rounded-lg ${
                      status.wait === 'success' 
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                        : 'bg-red-500/20 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status.wait === 'success' ? (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Welcome to the waitlist! We'll notify you when we launch.</span>
                      </div>
                    ) : (
                      <span>{status.wait}</span>
                    )}
                  </motion.div>
                )}
              </form>

              <p className="text-sm text-gray-400 mt-4 text-center">
                🚀 Be among the first 100 users to get <span className="text-amber-400 font-semibold">3 months free premium</span>
              </p>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold text-black">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>1,247+ students already joined</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
                <span>4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-4xl font-black text-white mb-2">
                  <AnimatedCounter end={stat.number} />
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Why Students Choose Us
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We've eliminated every pain point in student housing search with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "100% Verified", desc: "Every property owner is verified. No fake listings, no scammers.", color: "from-green-400 to-emerald-500" },
              { icon: Zap, title: "AI-Powered Matching", desc: "Our AI finds your perfect match based on budget, preferences, and location.", color: "from-blue-400 to-cyan-500" },
              { icon: Users, title: "Direct Connection", desc: "Chat directly with property owners. No middlemen charging extra fees.", color: "from-purple-400 to-pink-500" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-20 px-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-red-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-black mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Student Success Stories
            </span>
          </motion.h2>

          <div className="relative h-64 mb-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: index === currentTestimonial ? 1 : 0.8,
                  opacity: index === currentTestimonial ? 1 : 0 
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-white mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-amber-400 font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-gray-400">{testimonial.course}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-amber-400 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Have questions? Want to partner with us? We'd love to hear from you!
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={submitContact} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contact.name}
                  onChange={(e) => setContact(prev => ({ ...prev, name: e.target.value }))}
                  className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={contact.email}
                  onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                  className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                  required
                />
              </div>
              
              <textarea
                placeholder="Your Message *"
                value={contact.message}
                onChange={(e) => setContact(prev => ({ ...prev, message: e.target.value }))}
                rows={6}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                required
              />
              
              <motion.button
                type="submit"
                disabled={status.contact === 'loading'}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: status.contact === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status.contact === 'loading' ? 1 : 0.98 }}
              >
                {status.contact === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Contact Status Messages */}
              {status.contact && status.contact !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-center p-3 rounded-lg ${
                    status.contact === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                      : 'bg-red-500/20 border border-red-500/30 text-red-400'
                  }`}
                >
                  {status.contact === 'success' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  ) : (
                    <span>{status.contact}</span>
                  )}
                </motion.div>
              )}
            </form>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-400">hello@blackhousing.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">WhatsApp</h3>
                <a 
                  href={WHATSAPP_GROUP} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Join Community
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-400">Lagos, Nigeria</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        className="py-20 px-6 bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-red-900/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Ready to Find Your Home?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of UNILAG students who've found their perfect housing through BlackHousing
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join WhatsApp Community</span>
              </motion.a>
              
              <motion.button
                onClick={() => document.querySelector('input[type="email"]').focus()}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-black px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-5 h-5" />
                <span>Get Early Access</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                BlackHousing
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <span className="text-sm">© 2025 BlackHousing. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
                <a 
                  href={WHATSAPP_GROUP} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}