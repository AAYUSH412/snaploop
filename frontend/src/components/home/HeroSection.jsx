import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, Upload, Heart, MessageCircle, Share2, 
  ChevronDown, BookmarkIcon, PlayCircle, Sparkles, CheckCircle
} from 'lucide-react';
import CountUp from 'react-countup';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // Handle scroll events for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Track scroll progress for animations
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // You can use this to trigger animations based on scroll position
  });

  // Stats data
  const statsData = [
    { value: "100M+", label: "Active Users" },
    { value: "2M+", label: "Creators" },
    { value: "500M+", label: "Daily Views" },
    { value: "150+", label: "Countries" }
  ];
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center mb-16 sm:mb-20 md:mb-32 overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-blue-900/40"></div>
        <motion.div 
          className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2020/04/08/08/08/laptop-5016117_1280.jpg')] opacity-10 bg-cover bg-center"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        
        {/* Enhanced animated gradient orbs with glow effect */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gradient-to-br from-purple-600/30 via-fuchsia-600/20 to-pink-600/10 blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "mirror"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-gradient-to-br from-blue-600/30 via-cyan-600/20 to-teal-600/10 blur-[120px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1
          }}
        ></motion.div>
        
        {/* Subtle floating particles effect - enhanced with more particles on larger screens */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen overflow-hidden">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-5 sm:px-6 py-8 sm:py-12 md:py-24 relative z-10 flex flex-col md:flex-row items-center">
        {/* Hero Content - Enhanced with better mobile responsiveness */}
        <motion.div
          className="w-full md:w-1/2 md:pr-6 lg:pr-8 mb-12 md:mb-0"
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center mb-6"
          >
            <motion.div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-purple-500/20"
              whileHover={{ scale: 1.05, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.png" alt="SnapLoop Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </motion.div>
            <span className="text-xl sm:text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Snap</span>
              <span className="text-white">Loop</span>
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium border border-purple-500/20 backdrop-blur-sm shadow-xl shadow-purple-500/5">
              The #1 Short Video Platform
            </span>
          </motion.div>
          
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
            >
              Create, share & <br />
              discover <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">short videos</span>
                <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-blue-500/20 blur-sm -z-10"></span>
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg leading-relaxed"
            >
              SnapLoop connects you with creators worldwide through engaging short-form videos that inspire, entertain, and educate.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link 
                to="/feed" 
                className="group relative inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/30 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cpolygon fill=%22%23ffffff%22 fill-opacity=%220.1%22 points=%220,0 0,100 50,50%22/%3E%3C/svg%3E')] bg-[length:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity animate-shine"></span>
                <span className="relative z-10 flex items-center">
                  <Play size={16} className="mr-2" />
                  Watch Now
                </span>
              </Link>
              
              <Link 
                to="/upload" 
                className="group relative inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg border border-white/10 transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">
                  <Upload size={16} className="mr-2" />
                  Start Creating
                </span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Stats Row with Animations - Better mobile layout */}
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {statsData.map((stat, index) => (
              <motion.div 
                key={index} 
                className="flex items-center" 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-2"></div>
                <span className="font-bold text-white text-sm sm:text-base">
                  <CountUp end={parseInt(stat.value)} duration={2.5} separator="," />
                  {stat.value.includes('+') ? '+' : ''}
                </span>
                <span className="ml-1 text-gray-400 text-xs sm:text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Hero Mockups - Enhanced Mobile & Desktop with better responsiveness */}
        <div className="w-full md:w-1/2 relative flex justify-center">
          {/* Mobile Mockup - Enhanced with 3D effects and better mobile display */}
          <motion.div
            className="relative z-20 w-[200px] xs:w-[230px] sm:w-[250px] md:w-[280px] h-[400px] xs:h-[460px] sm:h-[500px] mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            whileHover={{ y: -5 }}
            style={{
              willChange: "transform"
            }}
          >
            {/* Phone frame with advanced gradient border */}
            <div className="absolute inset-0 rounded-[30px] sm:rounded-[40px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 p-[1.5px] shadow-2xl shadow-purple-500/30">
              <div className="absolute inset-0 rounded-[30px] sm:rounded-[40px] bg-black"></div>
            </div>

            {/* Phone inner content */}
            <div className="relative w-full h-full border-[8px] sm:border-[10px] border-gray-900 rounded-[30px] sm:rounded-[38px] overflow-hidden shadow-2xl">
              {/* Status bar */}
              <div className="absolute top-0 inset-x-0 h-6 sm:h-7 bg-gray-900/90 backdrop-blur-sm z-30 rounded-b-md flex items-center justify-center space-x-1 px-4">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-700"></div>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-700"></div>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500"></div>
              </div>

              {/* App content */}
              <div className="w-full h-full bg-black">
                {/* Video playing */}
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="https://ik.imagekit.io/r9naagwrj/snaploop/videos/5561375-hd_1080_1920_30fps.mp4"
                ></video>
                
                {/* Mobile UI Overlay - Enhanced Video Controls with better mobile scaling */}
                <div className="absolute bottom-0 inset-x-0 h-48 sm:h-56 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  {/* Creator info */}
                  <div className="flex items-center mb-2 sm:mb-3">
                    <motion.div 
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white/10"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-white text-[10px] sm:text-xs font-bold">JD</span>
                    </motion.div>
                    <div className="ml-2 flex-1 min-w-0">
                      <span className="text-white text-xs sm:text-sm font-medium block">@yoga_journey</span>
                      <span className="text-gray-400 text-[10px] sm:text-xs">Yoga Instructor</span>
                    </div>
                    <motion.button 
                      className="ml-auto bg-white/20 text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Follow
                    </motion.button>
                  </div>

                  {/* Video caption */}
                  <p className="text-white text-[10px] sm:text-xs mb-2 sm:mb-3">Finding peace in evening yoga ✨ #mindfulness #sunset #wellness</p>
                  
                  {/* Engagement metrics */}
                  <div className="flex justify-between mb-3 sm:mb-4">
                    <div className="flex space-x-2 sm:space-x-3">
                      <motion.div 
                        className="flex items-center text-[10px] sm:text-xs text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart size={10} className="mr-1 text-red-500" fill="#ef4444" />
                        <span>24.5K</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-[10px] sm:text-xs text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle size={10} className="mr-1" />
                        <span>482</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-[10px] sm:text-xs text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 size={10} className="mr-1" />
                        <span>129</span>
                      </motion.div>
                    </div>
                    <div className="flex items-center text-[10px] sm:text-xs text-white">
                      <BookmarkIcon size={10} className="mr-1" />
                      <span>Save</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-0.5 w-full bg-gray-700/50 rounded overflow-hidden">
                    <motion.div 
                      className="h-full w-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded"
                      animate={{ width: '70%' }}
                      transition={{ duration: 10, repeat: Infinity }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect under the phone */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 sm:h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl rounded-full"></div>

            {/* App UI elements popping out of the phone for 3D effect - Responsive for mobile */}
            <motion.div 
              className="absolute -right-4 sm:-right-6 top-20 bg-white/10 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-white/10 shadow-lg"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 20 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-1">
                <PlayCircle size={12} className="text-purple-400" />
                <span className="text-white text-[10px] sm:text-xs">Trending</span>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -left-3 sm:-left-4 top-40 flex space-y-1 flex-col items-center"
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -20 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {i === 0 && <Heart size={12} className="text-white" />}
                  {i === 1 && <MessageCircle size={12} className="text-white" />}
                  {i === 2 && <Share2 size={12} className="text-white" />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Floating badges - Hidden on mobile, visible on larger screens with better positioning */}
          <motion.div
            className="absolute -left-4 xs:-left-6 sm:-left-10 top-1/4 bg-white/10 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-white/10 shadow-lg hidden xs:flex items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <Sparkles size={12} className="text-yellow-400 mr-1 sm:mr-2" />
            <span className="text-white text-[10px] sm:text-sm">Trending now</span>
          </motion.div>
          
          <motion.div
            className="absolute right-4 sm:right-10 bottom-4 sm:bottom-10 bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-lg sm:rounded-xl border border-white/10 shadow-lg hidden xs:block"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
                <CheckCircle size={12} className="text-white" />
              </div>
              <div>
                <p className="text-white text-[10px] sm:text-xs">Verified Creator</p>
                <p className="text-gray-400 text-[8px] sm:text-xs">2.5M Followers</p>
              </div>
            </div>
          </motion.div>

          {/* Abstract design elements - Responsive sizes */}
          <div className="absolute -bottom-10 -right-10 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-br from-purple-600/30 via-fuchsia-600/20 to-pink-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/4 -left-5 md:-left-10 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-teal-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
      
      {/* Scroll indicator - Improved visibility on mobile */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</span>
        <ChevronDown size={16} className="text-gray-400" />
      </motion.div>
    </section>
  );
};

export default HeroSection;