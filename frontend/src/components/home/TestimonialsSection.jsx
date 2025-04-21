import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, Quote, Sparkles, MessageSquare } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  // Extended testimonials data
  const testimonials = [
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "SnapLoop has revolutionized the way I share my travel adventures. My audience has grown by 300% since I started posting here!",
      stars: 5,
      highlight: "300% audience growth",
      location: "Los Angeles, CA",
      followers: "245K",
      views: "2.1M"
    },
    {
      name: "Mark Chen",
      role: "Music Producer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "The reach I get with my music snippets on SnapLoop is incredible. The platform's algorithm really helps creators get discovered.",
      stars: 5,
      highlight: "10x more engagement",
      location: "New York, NY",
      followers: "189K",
      views: "1.8M"
    },
    {
      name: "Sophia Williams",
      role: "Dance Instructor",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Teaching dance moves through short videos has never been easier. SnapLoop's editing tools are perfect for tutorials.",
      stars: 4,
      highlight: "Easy tutorial creation",
      location: "London, UK",
      followers: "312K",
      views: "3.4M"
    },
    {
      name: "Jamal Baker",
      role: "Fitness Coach",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      text: "I've been able to reach a whole new audience with my workout routines. The engagement analytics help me understand what content works best.",
      stars: 5,
      highlight: "Detailed analytics",
      location: "Toronto, Canada",
      followers: "276K",
      views: "2.7M"
    }
  ];
  
  // Go to next/previous testimonial
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-rotate testimonials when in view
  useEffect(() => {
    let interval;
    
    if (isInView) {
      interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    
    return () => clearInterval(interval);
  }, [testimonials.length, isInView]);
  
  // Animation variants with improved springs
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    },
    exit: { 
      opacity: 0, 
      y: -60,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
      id="testimonials"
    >
      {/* Enhanced Background Elements with parallax effect */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px]"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
            x: useTransform(scrollYProgress, [0, 1], [0, 20]),
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [50, 0]),
            x: useTransform(scrollYProgress, [0, 1], [-20, 0]),
          }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
          style={{ opacity, y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-purple-500/20 backdrop-blur-sm shadow-xl shadow-purple-500/5">
              <Sparkles size={14} className="text-purple-400 mr-1.5" />
              TESTIMONIALS
            </span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Hear From Our <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Creators</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Discover why creators choose SnapLoop as their platform of choice to share their passion and build their audience
          </p>
        </motion.div>
        
        {/* Enhanced Testimonial Slider with better mobile view */}
        <div className="max-w-4xl mx-auto relative px-2">
          {/* Testimonial Cards with improved layout */}
          <div className="relative min-h-[300px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl relative"
                style={{
                  willChange: "transform, opacity"
                }}
              >
                {/* Quote icon */}
                <div className="absolute -top-4 -left-2 sm:-top-5 sm:-left-5">
                  <Quote size={36} className="text-purple-500/20" />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                  {/* Enhanced avatar with glow effect */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-sm opacity-70"></div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 shadow-lg shadow-purple-500/10 relative">
                      <img 
                        src={testimonials[activeTestimonial].avatar} 
                        alt={testimonials[activeTestimonial].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Floating badges */}
                    <motion.div 
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white flex items-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <Star fill="white" size={8} className="mr-0.5" />
                      <span>{testimonials[activeTestimonial].stars}.0</span>
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-col text-center sm:text-left">
                    {/* Star rating */}
                    <div className="flex mb-2 sm:mb-3 justify-center sm:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonials[activeTestimonial].stars 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "fill-gray-600 text-gray-600"
                          } 
                        />
                      ))}
                    </div>
                    
                    {/* Highlight badge with enhanced styling */}
                    <div className="flex justify-center sm:justify-start mb-3">
                      <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30 flex items-center">
                        <Sparkles size={10} className="mr-1" />
                        {testimonials[activeTestimonial].highlight}
                      </span>
                    </div>
                    
                    <blockquote className="text-white text-base sm:text-lg mb-4 font-light italic">
                      "{testimonials[activeTestimonial].text}"
                    </blockquote>
                    
                    <div>
                      <h4 className="text-white font-semibold">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <div className="flex items-center justify-center sm:justify-start mt-1 space-x-2">
                        <p className="text-purple-300 text-sm">
                          {testimonials[activeTestimonial].role}
                        </p>
                        <span className="text-gray-600">•</span>
                        <p className="text-gray-400 text-xs">
                          {testimonials[activeTestimonial].location}
                        </p>
                      </div>
                      
                      {/* Stats badges */}
                      <div className="flex items-center justify-center sm:justify-start mt-3 space-x-3">
                        <motion.div 
                          className="flex items-center text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        >
                          <MessageSquare size={10} className="mr-1 text-purple-400" />
                          <span>{testimonials[activeTestimonial].followers} followers</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        >
                          <Star size={10} className="mr-1 text-blue-400" />
                          <span>{testimonials[activeTestimonial].views} views</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons - better positioned for mobile */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between pointer-events-none z-10 px-2 sm:px-4">
            <motion.button
              onClick={prevTestimonial}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} className="text-white" />
            </motion.button>
            
            <motion.button
              onClick={nextTestimonial}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight size={16} className="text-white" />
            </motion.button>
          </div>
          
          {/* Enhanced Testimonial Navigation Dots with interactive animation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeTestimonial === index 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8" 
                    : "bg-white/30 w-2 hover:bg-white/50"
                }`}
                whileHover={{
                  scale: 1.2,
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Highlighted stats card with improved responsive design */}
          <motion.div 
            className="mt-10 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Creators", value: "2M+", icon: "👤" },
                { label: "User rating", value: "4.9/5", icon: "⭐" },
                { label: "Countries", value: "150+", icon: "🌎" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(255,255,255,0.1)",
                    boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1)"
                  }}
                >
                  <span className="text-2xl mb-1">{stat.icon}</span>
                  <p className="text-purple-300 font-semibold text-2xl sm:text-3xl mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;