import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, MessageCircle, Home, Shield, Zap, Users, Star, CheckCircle, ArrowRight, Globe, Clock, Award, Sparkles, MapPin } from "lucide-react";

export default function BlackHousingLanding() {
  const [waitEmail, setWaitEmail] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ wait: null, contact: null });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const isInView = useInView(heroRef, { once: true });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const WHATSAPP_GROUP = "https://chat.whatsapp.com/KKB2uxJN58CAQuqka4wvs6";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "2,500+", label: "Happy Students", icon: Users },
    { number: "800+", label: "Verified Properties", icon: Home },
    { number: "98%", label: "Success Rate", icon: Award },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  const testimonials = [
    { name: "Adebayo Johnson", course: "Computer Science", text: "Found my perfect bedspace in just 2 days! Zero stress, zero scam.", rating: 5 },
    { name: "Fatima Abdullahi", course: "Electrical Engineering", text: "Best platform for UNILAG students. Direct contact with owners is a game changer!", rating: 5 },
    { name: "Kemi Okafor", course: "Law", text: "No middlemen, no extra fees. Exactly what students need!", rating: 5 }
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

  return (
    <div className="min-h-screen bg-white text-black antialiased overflow-x-hidden relative">
      {/* Dynamic cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-black rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Hero section */}
      <motion.section
        ref={heroRef}
        className="h-screen relative overflow-hidden"
        style={{ scale }}
      >
        {/* Navigation */}
        <motion.nav
          className="fixed w-full z-50 px-6 py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">BLACKHOUSING</div>
                <div className="text-sm text-gray-600">Premium Living</div>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors duration-200">
                Features
              </a>
              <a href="#how" className="text-gray-600 hover:text-black transition-colors duration-200">
                How it works
              </a>
              <a href="#contact" className="text-gray-600 hover:text-black transition-colors duration-200">
                Contact
              </a>
              <a
                href={WHATSAPP_GROUP}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
              >
                Join Community
              </a>
            </div>
          </div>
        </motion.nav>

        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"
          style={{ y: yBg }}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_50%)]" />
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.03), transparent 40%)`
              }}
            />
          </div>
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
          style={{ y: yText }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-thin mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Find Your Perfect
            <br />
            <span className="font-medium">Student Home</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            The fastest, safest way to find bedspace and private rooms.
            Direct contact with verified property owners.
          </motion.p>

          {/* Search form */}
          <motion.form
            onSubmit={submitWaitlist}
            className="w-full max-w-2xl mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="flex gap-4">
              <input
                type="email"
                value={waitEmail}
                onChange={(e) => setWaitEmail(e.target.value)}
                placeholder="Enter your email to join waitlist"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center gap-2"
                disabled={status.wait === "loading"}
              >
                {status.wait === "loading" ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Join Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            {status.wait === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-600"
              >
                Thank you! We'll notify you when we launch.
              </motion.div>
            )}
          </motion.form>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-black to-transparent" />
        </motion.div>
      </motion.section>

      {/* Features section */}
      <motion.section
        className="py-32 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-thin mb-8">Why Choose Us</h2>
            <div className="w-32 h-0.5 bg-black mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Verified Listings", icon: Shield, description: "Every property is verified to ensure your safety and peace of mind" },
              { title: "Direct Contact", icon: MessageCircle, description: "Connect directly with property owners, no middlemen involved" },
              { title: "Fast & Easy", icon: Zap, description: "Find and secure your accommodation in record time" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-8 rounded-lg border border-gray-100 hover:border-black transition-colors duration-200">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-thin mb-8">What Students Say</h2>
            <div className="w-32 h-0.5 bg-black mx-auto" />
          </motion.div>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 ${
                  currentTestimonial === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transition-all duration-500`}
                style={{ display: currentTestimonial === index ? "block" : "none" }}
              >
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-xl md:text-2xl mb-8">"{testimonial.text}"</p>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.course}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? "bg-black w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}