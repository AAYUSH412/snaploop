import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Upload
} from 'lucide-react';

// Import section components
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TrendingVideosSection from '../components/home/TrendingVideosSection';
import AppDownloadSection from '../components/home/AppDownloadSection';

const HomePage = () => {
  return (
    <div className="pb-12 overflow-x-hidden">
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
    </div>
  );
};

export default HomePage;