import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, Upload, ChevronDown, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import section components
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TrendingVideosSection from '../components/home/TrendingVideosSection';
import AppDownloadSection from '../components/home/AppDownloadSection';

const HomePage = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showRedirectPrompt, setShowRedirectPrompt] = useState(false);
  const pageEndRef = useRef(null);
  const navigate = useNavigate();

  // Function to check if user has scrolled to the bottom
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setIsAtBottom(true);
      // Show redirect prompt after a short delay when reaching bottom
      setTimeout(() => {
        setShowRedirectPrompt(true);
      }, 500);
    } else {
      setIsAtBottom(false);
      setShowRedirectPrompt(false);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle redirect to explore page
  const handleRedirectToExplore = () => {
    navigate('/explore');
  };

  // Function to scroll to page bottom
  const scrollToBottom = () => {
    pageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-12 overflow-x-hidden relative">
      {/* Hero Section */}
      <HeroSection />
      
      {/* App Features/Benefits Section */}
      <FeaturesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Trending Videos/Explore Section */}
      <TrendingVideosSection />
      
      {/* App Download Section */}
      <AppDownloadSection />
      
      {/* CTA Section - Enhanced */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <div 
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-sm shadow-2xl border border-white/10"
          >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-600/30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-600/30 blur-3xl translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center py-16 px-6">
              <div>
                <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  JOIN THE COMMUNITY
                </span>
              </div>
              
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Ready to <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">create</span> and <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">inspire</span>?
              </h2>
              
              <p 
                className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
              >
                Join millions of creators and viewers sharing moments that matter through short videos. Start your SnapLoop journey today.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link 
                  to="/feed" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1"
                >
                  <Play size={20} className="mr-2" />
                  Start Watching
                </Link>
                
                <Link 
                  to="/upload" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all transform hover:-translate-y-1"
                >
                  <Upload size={20} className="mr-2" />
                  Create Content
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to explore section */}
      <div className="text-center mb-8">
        <motion.button
          onClick={scrollToBottom}
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm mb-2">Scroll to explore more</span>
          <ChevronDown size={20} />
        </motion.button>
      </div>
      
      {/* Explore page redirect prompt - Appears when at bottom */}
      <AnimatePresence>
        {showRedirectPrompt && (
          <motion.div 
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.button
              onClick={handleRedirectToExplore}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-6 py-3 rounded-full flex items-center shadow-lg shadow-purple-500/20 border border-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Continue to Explore</span>
              <ArrowRight size={18} className="ml-2" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom reference div */}
      <div ref={pageEndRef} className="h-1" />
    </div>
  );
};

export default HomePage;