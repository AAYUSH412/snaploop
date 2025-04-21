import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, TrendingUp, Award, ArrowRight, Code, Smartphone, Zap } from 'lucide-react';

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Animation variants with improved springs
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  // Features data for better maintainability
  const features = [
    {
      icon: <User className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />,
      bgClass: "from-purple-600/20 to-blue-600/20",
      iconBgClass: "bg-purple-500/20 group-hover:bg-purple-500/30",
      textClass: "text-purple-400 hover:text-purple-300",
      title: "Easy Content Creation",
      description: "Intuitive tools that make creating polished videos simple, even for beginners. Add filters, effects, and music with just a few taps.",
      linkText: "Start creating",
      linkPath: "/upload"
    },
    {
      icon: <TrendingUp className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />,
      bgClass: "from-blue-600/20 to-cyan-600/20",
      iconBgClass: "bg-blue-500/20 group-hover:bg-blue-500/30",
      textClass: "text-blue-400 hover:text-blue-300",
      title: "Powerful Discovery",
      description: "Our intelligent algorithm helps your content reach the right audience, maximizing your visibility and engagement.",
      linkText: "Explore content",
      linkPath: "/explore"
    },
    {
      icon: <Award className="text-pink-400 w-5 h-5 sm:w-6 sm:h-6" />,
      bgClass: "from-pink-600/20 to-rose-600/20",
      iconBgClass: "bg-pink-500/20 group-hover:bg-pink-500/30",
      textClass: "text-pink-400 hover:text-pink-300",
      title: "Creator Community",
      description: "Connect with other creators, collaborate on projects, and build your audience with our supportive community features.",
      linkText: "Join community",
      linkPath: "/feed"
    },
    {
      icon: <Zap className="text-amber-400 w-5 h-5 sm:w-6 sm:h-6" />,
      bgClass: "from-amber-600/20 to-yellow-600/20",
      iconBgClass: "bg-amber-500/20 group-hover:bg-amber-500/30",
      textClass: "text-amber-400 hover:text-amber-300",
      title: "Lightning Fast",
      description: "Optimized for speed and performance. Upload, edit, and share your videos with minimal loading time and maximum quality.",
      linkText: "Learn more",
      linkPath: "/upload"
    },
    {
      icon: <Smartphone className="text-emerald-400 w-5 h-5 sm:w-6 sm:h-6" />,
      bgClass: "from-emerald-600/20 to-teal-600/20",
      iconBgClass: "bg-emerald-500/20 group-hover:bg-emerald-500/30",
      textClass: "text-emerald-400 hover:text-emerald-300",
      title: "Mobile Optimized",
      description: "Create and share content anywhere with our fully responsive platform designed for both mobile and desktop experiences.",
      linkText: "Get the app",
      linkPath: "/"
    },
    {
      icon: <Code className="text-indigo-400 w-5 h-5 sm:w-6 sm:h-6" />,
      bgClass: "from-indigo-600/20 to-violet-600/20",
      iconBgClass: "bg-indigo-500/20 group-hover:bg-indigo-500/30",
      textClass: "text-indigo-400 hover:text-indigo-300",
      title: "Developer API",
      description: "Integrate SnapLoop's features into your own apps and websites with our comprehensive developer tools and documentation.",
      linkText: "View docs",
      linkPath: "/"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium border border-purple-500/20 backdrop-blur-sm shadow-xl shadow-purple-500/5">
              WHY CHOOSE SNAPLOOP
            </span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2 sm:px-4">
            The platform designed for <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">creative expression</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            Join millions of creators and viewers in a vibrant community sharing moments that matter
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden transform transition-all hover:-translate-y-1 duration-300 border border-gray-700/30"
              variants={fadeIn}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              }}
              style={{
                willChange: "transform"
              }}
            >
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Feature content */}
              <div className="relative z-10">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.iconBgClass} rounded-lg flex items-center justify-center mb-5 sm:mb-6 transition-colors`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {feature.description}
                </p>
                <div className="mt-5 sm:mt-6 flex">
                  <Link 
                    to={feature.linkPath} 
                    className={`${feature.textClass} inline-flex items-center font-medium text-sm group/link`}
                  >
                    <span>{feature.linkText}</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </motion.div>
                  </Link>
                </div>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className={`absolute transform rotate-45 translate-x-8 -translate-y-8 w-8 h-16 ${feature.iconBgClass} opacity-30`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action section */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            to="/explore" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20"
          >
            See all features
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;