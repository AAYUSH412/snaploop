import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Testimonials data
  const testimonials = [
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "SnapLoop has revolutionized the way I share my travel adventures. My audience has grown by 300% since I started posting here!",
      stars: 5
    },
    {
      name: "Mark Chen",
      role: "Music Producer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "The reach I get with my music snippets on SnapLoop is incredible. The platform's algorithm really helps creators get discovered.",
      stars: 5
    },
    {
      name: "Sophia Williams",
      role: "Dance Instructor",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Teaching dance moves through short videos has never been easier. SnapLoop's editing tools are perfect for tutorials.",
      stars: 4
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="mb-32 py-16 bg-gradient-to-br from-purple-900/30 to-blue-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-600/10 blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-3">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hear From Our Creators
          </h2>
          <p className="text-gray-300">
            Discover why creators choose SnapLoop as their platform of choice to share their passion and build their audience
          </p>
        </motion.div>
        
        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col text-center md:text-left">
                  <div className="flex mb-3 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < testimonials[activeTestimonial].stars ? "fill-yellow-400 text-yellow-400" : "fill-gray-600 text-gray-600"} 
                      />
                    ))}
                  </div>
                  <blockquote className="text-white text-lg mb-4 italic">
                    "{testimonials[activeTestimonial].text}"
                  </blockquote>
                  <div>
                    <h4 className="text-white font-semibold">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Testimonial Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTestimonial === index 
                    ? "bg-white w-8" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;