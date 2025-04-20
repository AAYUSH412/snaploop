import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, TrendingUp, Award, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="mb-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 text-sm font-medium rounded-full mb-3">
            WHY CHOOSE SNAPLOOP
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 px-4">
            The platform designed for <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">creative expression</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Join millions of creators and viewers in a vibrant community sharing moments that matter
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Feature 1 */}
          <motion.div 
            className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-hidden transform transition-all hover:-translate-y-1 duration-300"
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <User className="text-purple-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Easy Content Creation</h3>
              <p className="text-gray-300">
                Intuitive tools that make creating polished videos simple, even for beginners. Add filters, effects, and music with just a few taps.
              </p>
              <div className="mt-6 flex">
                <Link 
                  to="/upload" 
                  className="text-purple-400 hover:text-purple-300 inline-flex items-center font-medium text-sm"
                >
                  Start creating
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div 
            className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-hidden transform transition-all hover:-translate-y-1 duration-300"
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <TrendingUp className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Powerful Discovery</h3>
              <p className="text-gray-300">
                Our intelligent algorithm helps your content reach the right audience, maximizing your visibility and engagement.
              </p>
              <div className="mt-6 flex">
                <Link 
                  to="/explore" 
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center font-medium text-sm"
                >
                  Explore content
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div 
            className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-hidden transform transition-all hover:-translate-y-1 duration-300"
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
                <Award className="text-pink-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Creator Community</h3>
              <p className="text-gray-300">
                Connect with other creators, collaborate on projects, and build your audience with our supportive community features.
              </p>
              <div className="mt-6 flex">
                <Link 
                  to="/feed" 
                  className="text-pink-400 hover:text-pink-300 inline-flex items-center font-medium text-sm"
                >
                  Join community
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;