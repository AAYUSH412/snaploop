import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Star, ChevronDown, Search, BookmarkIcon, PlayCircle,
  Share2, Heart, MessageCircle, Eye, ArrowLeft, Globe, 
  Home, Upload, User, Play, Download, Smartphone, QrCode
} from 'lucide-react';

const AppDownloadSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Enhanced background elements with parallax effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-blue-900/25"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-purple-600/10 blur-[80px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
            x: useTransform(scrollYProgress, [0, 1], [0, -30]),
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-blue-600/10 blur-[100px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1
          }}
          style={{
            y: useTransform(scrollYProgress, [0, 1], [50, 0]),
            x: useTransform(scrollYProgress, [0, 1], [30, 0]),
          }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div 
          className="bg-gradient-to-r from-gray-900/80 via-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Content */}
            <div className="lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <span className="inline-flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/20 shadow-xl text-white">
                    <Smartphone size={14} className="text-purple-400 mr-1.5" />
                    TAKE SNAPLOOP ANYWHERE
                  </span>
                </motion.div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Download the <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">SnapLoop app</span>
                </h2>
                
                <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg max-w-lg leading-relaxed">
                  Create, share and discover videos from anywhere with our mobile app. Available on iOS and Android devices with a seamless experience.
                </p>
                
                <div className="flex flex-col xs:flex-row gap-4 w-full">
                  <motion.button
                    className="group relative inline-flex items-center justify-center space-x-2 w-full xs:w-auto bg-white text-black font-medium px-5 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-purple-500/20 border border-white/80 overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                      <path d="M17.566 11.996c-.308-3.129 2.544-4.664 2.661-4.743-1.447-2.114-3.702-2.408-4.506-2.445-1.922-.19-3.751 1.128-4.725 1.128-.973 0-2.477-1.098-4.069-1.07-2.092.03-4.021 1.218-5.097 3.096-2.178 3.767-.559 9.36 1.564 12.428 1.032 1.496 2.272 3.176 3.894 3.116 1.559-.06 2.15-1.008 4.035-1.008 1.887 0 2.418 1.008 4.072 .977 1.681-.03 2.742-1.529 3.774-3.024 1.19-1.743 1.679-3.43 1.679-3.518-.036-.014-3.22-1.236-3.244-4.895l.962-.016zm-3.276-8.99c.857-1.040 1.436-2.478 1.279-3.916-1.237.05-2.728.823-3.609 1.863-.794.92-1.489 2.387-1.305 3.812 1.38.107 2.787-.705 3.635-1.759z"/>
                    </svg>
                    <div className="flex flex-col items-start relative z-10">
                      <span className="text-xs">Download on the</span>
                      <span className="font-bold text-sm">App Store</span>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    className="group relative inline-flex items-center justify-center space-x-2 w-full xs:w-auto bg-white text-black font-medium px-5 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-blue-500/20 border border-white/80 overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                      <path d="M3.191 23.452C1.404 21.625 0 18.605 0 15C0 11.395 1.404 8.375 3.191 6.548L12 15L3.191 23.452ZM12 15L20.809 23.452C22.596 21.625 24 18.605 24 15C24 11.395 22.596 8.375 20.809 6.548L12 15ZM12 15L3.191 6.548C4.507 4.875 6.2 3.526 7.939 2.59C9.743 1.622 10.846 1.5 12 1.5C13.154 1.5 14.257 1.622 16.061 2.59C17.8 3.527 19.493 4.875 20.809 6.548L12 15Z"/>
                    </svg>
                    <div className="flex flex-col items-start relative z-10">
                      <span className="text-xs">GET IT ON</span>
                      <span className="font-bold text-sm">Google Play</span>
                    </div>
                  </motion.button>
                </div>
                
                {/* QR Code - on larger screens */}
                <div className="hidden sm:flex items-center mt-8 space-x-4">
                  <motion.div
                    className="relative p-2 bg-white rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white p-1">
                      <img 
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMyAzMyIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxwYXRoIGQ9Ik0wIDBoOXY5aC05ek0xMiAwaDN2M2gtM3pNMTggMGgzdjNoLTN6TTI0IDBoOXY5aC05ek0wIDEyaDN2M2gtM3pNNiAxMmgzdjNoLTN6TTEyIDEyaDN2M2gtM3pNMTggMTJoM3YzaC0zek0yNCAxMmgzdjNoLTN6TTMwIDEyaDN2M2gtM3pNMCAxOGgzdjNoLTN6TTYgMThoM3YzaC0zek0xMiAxOGgzdjNoLTN6TTE4IDE4aDN2M2gtM3pNMjQgMThoM3YzaC0zek0zMCAyNGgzdjNoLTN6TTYgMjRoM3YzaC0zek0xMiAyNGgzdjNoLTN6TTE4IDI0aDN2M2gtM3pNMjQgMjRoOXY5aC05ek0xMiAzMGgzdjNoLTN6TTE4IDMwaDN2M2gtM3oiIGZpbGw9IiMwMDAiLz48L3N2Zz4=" 
                        alt="QR Code for app download" 
                        className="w-full h-full"
                      />
                    </div>
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>
                  </motion.div>
                  <div>
                    <p className="text-white text-sm font-medium">Scan to download</p>
                    <p className="text-gray-400 text-xs">Or find 'SnapLoop' in app stores</p>
                  </div>
                </div>
                
                {/* Stats - Improved mobile layout with animations */}
                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                  <motion.div 
                    className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-2 pl-3 border border-white/10"
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      scale: 1.03
                    }}
                  >
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={i < 5 ? 13 : 12} 
                          className={i < 5 ? "text-yellow-400 fill-yellow-400 -ml-0.5" : "text-gray-400"} 
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">4.8/5</div>
                      <div className="text-gray-400 text-xs">App Store</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-2 pl-3 border border-white/10"
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      scale: 1.03
                    }}
                  >
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={i < 4 ? 13 : 12} 
                          className={i < 4 ? "text-yellow-400 fill-yellow-400 -ml-0.5" : "text-gray-400"} 
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">4.7/5</div>
                      <div className="text-gray-400 text-xs">Play Store</div>
                    </div>
                  </motion.div>
                
                  <motion.div 
                    className="bg-white/10 backdrop-blur-md rounded-xl border border-white/5 px-3 py-2 flex items-center"
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.15)', 
                      scale: 1.03
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 shadow-lg shadow-blue-500/20">
                      <Download size={14} className="text-white" />
                    </div>
                    <span className="text-white text-xs sm:text-sm">500K+ Downloads</span>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/10 backdrop-blur-md rounded-xl border border-white/5 px-3 py-2 flex items-center"
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.15)', 
                      scale: 1.03
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mr-2 shadow-lg shadow-amber-500/20">
                      <Globe size={14} className="text-white" />
                    </div>
                    <span className="text-white text-xs sm:text-sm">150+ Countries</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Image/Visual - Enhanced for mobile with responsive sizing */}
            <motion.div 
              className="lg:w-1/2 relative flex items-center justify-center py-8 sm:py-10 md:py-12 px-0 sm:px-2 md:px-6 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative flex justify-center transform scale-[0.6] xs:scale-[0.7] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95] xl:scale-[1]">
                {/* Phone mock - offset 1 - Enhanced with Music content and interactive UI */}
                <motion.div 
                  className="absolute transform -rotate-[15deg] -translate-x-[10px] xs:-translate-x-[20px] sm:-translate-x-[40px] md:-translate-x-[60px] lg:-translate-x-[80px] opacity-80 sm:opacity-90 z-10"
                  whileHover={{ 
                    rotate: '-12deg', 
                    scale: 1.03, 
                    translateX: '-65px', 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  style={{ willChange: "transform" }}
                >
                  <div className="w-[170px] sm:w-[180px] md:w-[220px] h-[360px] sm:h-[380px] md:h-[440px] rounded-[32px] bg-gray-900 border-[6px] sm:border-8 border-gray-800 shadow-2xl shadow-purple-900/30 overflow-hidden">
                    {/* Phone content remains similar with better scaling */}
                    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-950">
                      {/* App header */}
                      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-800/90 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
                        <span className="text-purple-400 font-bold text-[10px] sm:text-sm">Music</span>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-800 flex items-center justify-center">
                          <Search size={10} className="text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Now playing section */}
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-b from-gray-800/50 to-transparent">
                        <p className="text-gray-400 text-[8px] sm:text-xs">NOW PLAYING</p>
                        <div className="flex items-center mt-1 sm:mt-2">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-700 rounded-md overflow-hidden flex-shrink-0 shadow-lg shadow-purple-900/20">
                            <img 
                              src="https://cdn.pixabay.com/photo/2021/09/14/15/39/music-6624662_1280.jpg" 
                              alt="Album cover" 
                              className="w-full h-full object-cover mix-blend-overlay opacity-70" 
                            />
                          </div>
                          <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                            <p className="text-white text-[8px] sm:text-xs font-medium truncate">Lo-Fi Background Music</p>
                            <p className="text-gray-400 text-[8px] sm:text-xs truncate">@music_creator</p>
                          </div>
                          <div className="ml-2">
                            <Play size={14} className="text-white" fill="white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content section - Adjusted for better responsiveness */}
                      <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-2">
                        <div className="bg-gray-800/50 rounded-xl p-2 sm:p-3 mb-3">
                          <p className="text-white text-[8px] sm:text-xs font-medium mb-2">Suggested for you</p>
                          <div className="flex flex-col space-y-2">
                            {[
                              { title: "Creating Lo-Fi Music", creator: "@music_creator", duration: "2:14" },
                              { title: "Piano Ambient Mix", creator: "@piano_vibes", duration: "3:45" }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-gradient-to-br from-indigo-600 to-purple-700 mr-2 flex-shrink-0"></div>
                                  <div>
                                    <p className="text-white text-[8px] sm:text-xs truncate">{item.title}</p>
                                    <p className="text-gray-400 text-[8px] sm:text-xs">{item.creator}</p>
                                  </div>
                                </div>
                                <span className="text-gray-400 text-[8px] sm:text-xs">{item.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-[8px] sm:text-xs font-medium mb-2">Popular this week</p>
                        {[1, 2, 3].map((_, idx) => (
                          <div key={idx} className="flex items-center mb-2 sm:mb-3">
                            <span className="text-gray-500 text-[8px] sm:text-xs mr-2">{idx + 1}</span>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-md mr-2"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-[8px] sm:text-xs truncate">Top Track {idx + 1}</p>
                              <p className="text-gray-400 text-[8px] sm:text-xs truncate">Artist {idx + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Media controls - Improved for better mobile display */}
                      <div className="px-2 sm:px-3 py-2 border-t border-gray-800">
                        <div className="flex justify-between items-center">
                          <ChevronDown size={14} className="text-gray-400" />
                          <div className="flex items-center space-x-3">
                            <button className="text-gray-400 hover:text-white">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="19 20, 9 12, 19 4"></polygon>
                              </svg>
                            </button>
                            <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2">
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 4, 15 12, 5 20"></polygon>
                              </svg>
                            </button>
                          </div>
                          <BookmarkIcon size={14} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Phone mock - center (top) - Enhanced with Travel content and better responsiveness */}
                <motion.div 
                  className="relative w-[170px] xs:w-[180px] sm:w-[200px] md:w-[240px] h-[330px] xs:h-[360px] sm:h-[400px] md:h-[480px] rounded-[36px] bg-gradient-to-b from-gray-900 to-black border-[6px] xs:border-[8px] border-gray-800 shadow-2xl shadow-purple-800/20 overflow-hidden z-20"
                  whileHover={{ 
                    scale: 1.03,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  style={{ willChange: "transform" }}
                >
                  {/* Phone content with better sizing for mobile */}
                  <div className="relative h-full">
                    {/* Modern notch design scaled for mobile */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-4 sm:h-6 bg-black rounded-b-xl z-50"></div>
                    
                    {/* Status bar */}
                    <div className="absolute top-0 inset-x-0 h-5 sm:h-7 bg-black/70 rounded-tr-3xl rounded-tl-3xl backdrop-blur-sm z-30 flex items-center justify-between px-4 sm:px-6">
                      <span className="text-white text-[10px] sm:text-xs font-medium">9:41</span>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                            <path d="M12.008 21.996c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zm0-1.5c-4.689 0-8.5-3.812-8.5-8.5s3.811-8.5 8.5-8.5c4.687 0 8.5 3.812 8.5 8.5s-3.813 8.5-8.5 8.5z" />
                          </svg>
                        </div>
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main content - Modernized video player UI */}
                    <div className="h-full w-full relative">
                      <img 
                        src="https://ik.imagekit.io/r9naagwrj/snaploop/videos/videoframe_8619.png" 
                        alt="SnapLoop App Screen" 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* App UI overlay with improved gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20">
                        {/* App header */}
                        <div className="absolute top-7 sm:top-9 inset-x-0 flex items-center justify-between px-3 sm:px-4">
                          <div className="flex items-center">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                              <ArrowLeft size={14} className="text-white" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                              <BookmarkIcon size={14} className="text-white" />
                            </div>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                              <Share2 size={14} className="text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Content overlay - Improved styling and responsiveness */}
                        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5">
                          {/* Location badge */}
                          <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-md rounded-full mb-2 sm:mb-3 border border-white/10">
                            <div className="flex items-center space-x-1">
                              <Globe size={10} className="text-white" />
                              <span className="text-white text-[8px] sm:text-xs font-medium">Bali, Indonesia</span>
                            </div>
                          </div>
                          
                          <h3 className="text-white text-sm sm:text-lg font-semibold mb-1">Hidden Paradise Waterfall</h3>
                          
                          <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mr-2 ring-1 ring-white/10 shadow-lg shadow-green-900/20">
                              <span className="text-white text-[8px] sm:text-xs font-bold">TR</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-[10px] sm:text-sm truncate">@travel_explorer</p>
                            </div>
                            <motion.button 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-xs text-white font-medium shadow-md shadow-blue-900/30"
                              whileTap={{ scale: 0.95 }}
                            >
                              Follow
                            </motion.button>
                          </div>
                          
                          <p className="text-white text-[8px] sm:text-sm mb-2 sm:mb-3">Found this hidden gem during my Bali trip! One of the most magical places 🏝️ #travel #bali</p>
                          
                          <div className="flex justify-between">
                            <div className="flex space-x-3 sm:space-x-4">
                              <motion.div className="flex items-center text-white text-[8px] sm:text-sm"
                                whileTap={{ scale: 1.2 }}
                              >
                                <Heart size={12} className="mr-1 fill-red-500 text-red-500" /> 
                                <span>24.5K</span>
                              </motion.div>
                              <div className="flex items-center text-white text-[8px] sm:text-sm">
                                <MessageCircle size={12} className="mr-1" /> 
                                <span>643</span>
                              </div>
                              <div className="flex items-center text-white text-[8px] sm:text-sm">
                                <Eye size={12} className="mr-1" /> 
                                <span>473K</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress bar at bottom with animated gradient */}
                          <div className="mt-3 sm:mt-4 h-0.5 bg-white/20 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full w-3/4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full" 
                              initial={{ width: "0%" }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 8, repeat: Infinity }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Modern phone home indicator at bottom */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/80 rounded-full z-40"></div>
                </motion.div>
                
                {/* Phone mock - offset 2 - Enhanced with Food content and better responsiveness */}
                <motion.div 
                  className="absolute transform rotate-[15deg] translate-x-[10px] xs:translate-x-[20px] sm:translate-x-[40px] md:translate-x-[60px] lg:translate-x-[80px] opacity-80 sm:opacity-90 z-10"
                  whileHover={{ 
                    rotate: '12deg', 
                    scale: 1.03, 
                    translateX: '65px', 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  style={{ willChange: "transform" }}
                >
                  <div className="w-[170px] sm:w-[180px] md:w-[220px] h-[360px] sm:h-[380px] md:h-[440px] rounded-[32px] bg-gray-900 border-[6px] sm:border-8 border-gray-800 shadow-2xl shadow-orange-800/20 overflow-hidden">
                    <div className="h-full flex flex-col">
                      {/* App header - Enhanced styling scaled for mobile */}
                      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800/90 flex items-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mr-2 sm:mr-3 flex items-center justify-center shadow-md shadow-amber-900/30">
                          <span className="text-white font-bold text-[8px] sm:text-xs">CD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[10px] sm:text-sm font-medium">@culinary_delights</p>
                          <p className="text-gray-400 text-[8px] sm:text-xs">Food Creator</p>
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <MessageCircle size={14} className="text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Main image */}
                      <div className="relative flex-1">
                        <img 
                          src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" 
                          alt="Dessert" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 sm:p-4">
                          <h3 className="text-white text-[10px] sm:text-sm font-medium mb-1">5-min Chocolate Dessert</h3>
                          <p className="text-white text-[8px] sm:text-xs">Quick simple recipe that will impress everyone! #dessert #chocolate</p>
                          
                          <div className="flex justify-between items-center mt-2 sm:mt-3">
                            <span className="text-[8px] sm:text-xs bg-white/20 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-full text-white">02:48</span>
                            <div className="flex space-x-2 sm:space-x-3">
                              <span className="flex items-center text-white text-[8px] sm:text-xs">
                                <Heart size={10} className="mr-0.5" fill="white" /> 32.7K
                              </span>
                              <span className="flex items-center text-white text-[8px] sm:text-xs">
                                <MessageCircle size={10} className="mr-0.5" /> 421
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom navigation - Scaled for mobile */}
                      <div className="bg-gray-900 py-2 sm:py-3 px-4 sm:px-6 flex justify-between items-center">
                        <Home size={16} className="text-gray-400" />
                        <Search size={16} className="text-gray-400" />
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center -mt-4 sm:-mt-5 shadow-lg shadow-orange-500/20">
                          <Upload size={14} className="text-white" />
                        </div>
                        <PlayCircle size={16} className="text-gray-400" />
                        <User size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced decorative elements with better animation and responsive sizing */}
              <motion.div 
                className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-600/30 via-violet-600/20 to-fuchsia-600/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-600/30 via-cyan-600/20 to-teal-600/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 2
                }}
              ></motion.div>
              
              {/* Enhanced UI badges - Responsive visibility with improved positions */}
              <motion.div
                className="absolute left-0 xs:left-4 sm:left-8 lg:left-16 top-8 sm:top-16 bg-white/10 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 hidden xs:flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="text-purple-400 mr-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <span className="text-white text-[10px] sm:text-xs">150M+ Downloads</span>
              </motion.div>
              
              {/* New badge - Responsive sizing */}
              <motion.div
                className="absolute right-0 xs:right-4 sm:right-8 lg:right-16 bottom-8 sm:bottom-16 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 hidden xs:flex items-center shadow-lg shadow-purple-900/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white text-[10px] sm:text-xs font-medium">New version 2.5</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDownloadSection;