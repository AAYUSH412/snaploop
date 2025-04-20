import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, ChevronDown, Search, BookmarkIcon, PlayCircle,
  Share2, Heart, MessageCircle, Eye, ArrowLeft, Globe, 
  Home, Upload, User,Play
} from 'lucide-react';

const AppDownloadSection = () => {
  return (
    <section className="mb-32">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
                  TAKE SNAPLOOP ANYWHERE
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Download the SnapLoop app
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Create, share and discover videos from anywhere with our mobile app. Available on iOS and Android.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="flex items-center justify-center space-x-2 bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.566 11.996c-.308-3.129 2.544-4.664 2.661-4.743-1.447-2.114-3.702-2.408-4.506-2.445-1.922-.19-3.751 1.128-4.725 1.128-.973 0-2.477-1.098-4.069-1.07-2.092.03-4.021 1.218-5.097 3.096-2.178 3.767-.559 9.36 1.564 12.428 1.032 1.496 2.272 3.176 3.894 3.116 1.559-.06 2.15-1.008 4.035-1.008 1.887 0 2.418 1.008 4.072 .977 1.681-.03 2.742-1.529 3.774-3.024 1.19-1.743 1.679-3.43 1.679-3.518-.036-.014-3.22-1.236-3.244-4.895l.962-.016zm-3.276-8.99c.857-1.040 1.436-2.478 1.279-3.916-1.237.05-2.728.823-3.609 1.863-.794.92-1.489 2.387-1.305 3.812 1.38.107 2.787-.705 3.635-1.759z"/>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on the</span>
                      <span className="font-bold">App Store</span>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center justify-center space-x-2 bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.191 23.452C1.404 21.625 0 18.605 0 15C0 11.395 1.404 8.375 3.191 6.548L12 15L3.191 23.452ZM12 15L20.809 23.452C22.596 21.625 24 18.605 24 15C24 11.395 22.596 8.375 20.809 6.548L12 15ZM12 15L3.191 6.548C4.507 4.875 6.2 3.526 7.939 2.59C9.743 1.622 10.846 1.5 12 1.5C13.154 1.5 14.257 1.622 16.061 2.59C17.8 3.527 19.493 4.875 20.809 6.548L12 15Z"/>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="font-bold">Google Play</span>
                    </div>
                  </motion.button>
                </div>
                
                {/* Stats */}
                <div className="mt-10 flex items-center space-x-8">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                    <div>
                      <div className="text-white font-bold">4.8/5</div>
                      <div className="text-gray-400 text-xs">App Store</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                    <div>
                      <div className="text-white font-bold">4.7/5</div>
                      <div className="text-gray-400 text-xs">Play Store</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Image/Visual */}
            <motion.div 
              className="md:w-1/2 relative flex items-center justify-center py-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative flex justify-center">
                {/* Phone mock - offset 1 - Enhanced with Music content and interactive UI */}
                <motion.div 
                  className="absolute transform rotate-[-15deg] translate-x-[-40px] md:translate-x-[-70px] scale-[0.85]"
                  whileHover={{ rotate: '-12deg', scale: 0.88, translateX: '-65px' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-[220px] h-[440px] rounded-[32px] bg-gray-900 border-8 border-gray-800 shadow-2xl overflow-hidden">
                    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-950">
                      {/* App header */}
                      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                        <span className="text-purple-400 font-bold text-sm">Music</span>
                        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                          <Search size={12} className="text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Now playing section */}
                      <div className="px-4 py-3">
                        <p className="text-gray-400 text-xs">NOW PLAYING</p>
                        <div className="flex items-center mt-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-700 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src="https://cdn.pixabay.com/photo/2021/09/14/15/39/music-6624662_1280.jpg" 
                              alt="Album cover" 
                              className="w-full h-full object-cover mix-blend-overlay opacity-70" 
                            />
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-white text-xs font-medium truncate">Lo-Fi Background Music</p>
                            <p className="text-gray-400 text-xs truncate">@music_creator</p>
                          </div>
                          <div className="ml-2">
                            <Play size={16} className="text-white" fill="white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content section */}
                      <div className="flex-1 overflow-y-auto px-3 py-2">
                        <div className="bg-gray-800/50 rounded-xl p-3 mb-3">
                          <p className="text-white text-xs font-medium mb-2">Suggested for you</p>
                          <div className="flex flex-col space-y-2">
                            {[
                              { title: "Creating Lo-Fi Music", creator: "@music_creator", duration: "2:14" },
                              { title: "Piano Ambient Mix", creator: "@piano_vibes", duration: "3:45" }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-purple-700 mr-2 flex-shrink-0"></div>
                                  <div>
                                    <p className="text-white text-xs truncate">{item.title}</p>
                                    <p className="text-gray-400 text-xs">{item.creator}</p>
                                  </div>
                                </div>
                                <span className="text-gray-400 text-xs">{item.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-xs font-medium mb-2">Popular this week</p>
                        {[1, 2, 3].map((_, idx) => (
                          <div key={idx} className="flex items-center mb-3">
                            <span className="text-gray-500 text-xs mr-2">{idx + 1}</span>
                            <div className="w-8 h-8 bg-gray-800 rounded-md mr-2"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-xs truncate">Top Track {idx + 1}</p>
                              <p className="text-gray-400 text-xs truncate">Artist {idx + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Media controls */}
                      <div className="px-3 py-2 border-t border-gray-800">
                        <div className="flex justify-between items-center">
                          <ChevronDown size={16} className="text-gray-400" />
                          <div className="flex items-center space-x-3">
                            <button className="text-gray-400 hover:text-white">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="19 20, 9 12, 19 4"></polygon>
                              </svg>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2">
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 4, 15 12, 5 20"></polygon>
                              </svg>
                            </button>
                          </div>
                          <BookmarkIcon size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Phone mock - center (top) - Enhanced with Travel content */}
                <motion.div 
                  className="relative w-[240px] h-[480px] rounded-[36px] bg-gray-900 border-8 border-gray-800 shadow-2xl overflow-hidden z-20"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative h-full">
                    {/* Status bar */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-black/40 backdrop-blur-sm z-30 flex items-center justify-between px-4">
                      <span className="text-white text-xs font-medium">9:41</span>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-3.5 h-3.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                            <path d="M12.008 21.996c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zm0-1.5c-4.689 0-8.5-3.812-8.5-8.5s3.811-8.5 8.5-8.5c4.687 0 8.5 3.812 8.5 8.5s-3.813 8.5-8.5 8.5z" />
                          </svg>
                        </div>
                        <div className="w-3.5 h-3.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <img 
                      src="https://cdn.pixabay.com/photo/2020/01/20/19/08/waterfall-4781719_1280.jpg" 
                      alt="SnapLoop App Screen" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* App UI overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10">
                      {/* App header */}
                      <div className="absolute top-7 inset-x-0 flex items-center justify-between px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <ArrowLeft size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <BookmarkIcon size={16} className="text-white" />
                          </div>
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <Share2 size={16} className="text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-5">
                        {/* Location badge */}
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-3">
                          <div className="flex items-center space-x-1">
                            <Globe size={12} className="text-white" />
                            <span className="text-white text-xs font-medium">Bali, Indonesia</span>
                          </div>
                        </div>
                        
                        <h3 className="text-white text-lg font-semibold mb-1">Hidden Paradise Waterfall</h3>
                        
                        <div className="flex items-center mb-4">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mr-2 ring-2 ring-white/10">
                            <span className="text-white text-xs font-bold">TR</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">@travel_explorer</p>
                          </div>
                          <motion.button 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1.5 rounded-full text-xs text-white font-medium"
                            whileTap={{ scale: 0.95 }}
                          >
                            Follow
                          </motion.button>
                        </div>
                        
                        <p className="text-white text-sm mb-3">Found this hidden gem during my Bali trip! One of the most magical places 🏝️ #travel #bali #waterfall</p>
                        
                        <div className="flex justify-between">
                          <div className="flex space-x-4">
                            <motion.div className="flex items-center text-white text-sm"
                              whileTap={{ scale: 1.2 }}
                            >
                              <Heart size={14} className="mr-1 fill-red-500 text-red-500" /> 
                              <span>24.5K</span>
                            </motion.div>
                            <div className="flex items-center text-white text-sm">
                              <MessageCircle size={14} className="mr-1" /> 
                              <span>643</span>
                            </div>
                            <div className="flex items-center text-white text-sm">
                              <Eye size={14} className="mr-1" /> 
                              <span>473K</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress bar at bottom */}
                        <div className="mt-4 h-0.5 bg-white/20 rounded-full">
                          <motion.div 
                            className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                            initial={{ width: "0%" }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 8, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Phone mock - offset 2 - Enhanced with Food content */}
                <motion.div 
                  className="absolute transform rotate-[15deg] translate-x-[40px] md:translate-x-[70px] scale-[0.85]"
                  whileHover={{ rotate: '12deg', scale: 0.88, translateX: '65px' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-[220px] h-[440px] rounded-[32px] bg-gray-900 border-8 border-gray-800 shadow-2xl overflow-hidden">
                    <div className="h-full flex flex-col">
                      {/* App header */}
                      <div className="px-4 py-3 bg-gray-900 border-b border-gray-800 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mr-3 flex items-center justify-center">
                          <span className="text-white font-bold text-xs">CD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">@culinary_delights</p>
                          <p className="text-gray-400 text-xs">Food Creator</p>
                        </div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <MessageCircle size={16} className="text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Main image */}
                      <div className="relative flex-1">
                        <img 
                          src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" 
                          alt="Dessert" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                          <h3 className="text-white text-sm font-medium mb-1">5-min Chocolate Dessert</h3>
                          <p className="text-white text-xs">Quick simple recipe that will impress everyone! #dessert #chocolate</p>
                          
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white">02:48</span>
                            <div className="flex space-x-3">
                              <span className="flex items-center text-white text-xs">
                                <Heart size={10} className="mr-0.5" fill="white" /> 32.7K
                              </span>
                              <span className="flex items-center text-white text-xs">
                                <MessageCircle size={10} className="mr-0.5" /> 421
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom navigation */}
                      <div className="bg-gray-900 py-3 px-6 flex justify-between items-center">
                        <Home size={20} className="text-gray-400" />
                        <Search size={20} className="text-gray-400" />
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center -mt-5 shadow-lg shadow-orange-500/20">
                          <Upload size={18} className="text-white" />
                        </div>
                        <PlayCircle size={20} className="text-gray-400" />
                        <User size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-600/30 via-violet-600/20 to-fuchsia-600/10 rounded-full blur-3xl animate-pulse-glow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/30 via-cyan-600/20 to-teal-600/10 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }}></div>
              <motion.div
                className="absolute left-20 top-16 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 hidden md:flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="text-purple-400 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <span className="text-white text-xs">150M+ Downloads</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;