import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Eye, BookmarkIcon, Heart, 
  MessageCircle, Share2, PlayCircle, Flame,
  Sparkles, TrendingUp, Filter, ChevronRight
} from 'lucide-react';

const TrendingVideosSection = () => {
  const sectionRef = useRef(null);
  const categoryRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  // Animation variants with improved springs
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };
  
  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Mock categories for filter buttons
  const categories = [
    { name: "All", icon: <Sparkles size={14} /> },
    { name: "Gaming", icon: null },
    { name: "Music", icon: null },
    { name: "Design", icon: null },
    { name: "Tech", icon: null },
    { name: "Travel", icon: null }
  ];

  // Enhanced mock video thumbnails for explore section
  const exploreThumbnails = [
    {
      id: 1,
      image: "https://savingsgrove.com/cdn/shop/articles/cheap-gaming-pc-build_35c97830-b67e-476d-9fb4-e509852db75d.jpg?v=1734632171",
      title: "Gaming Setup Tips & Tricks for Budget Builds in 2025",
      creator: "@indie_dev",
      views: "352K",
      likes: "24.3K",
      category: "Gaming",
      trending: true
    },
    {
      id: 2,
      image: "https://www.aufaitux.com/wp-content/uploads/2024/09/unnamed-1.jpg",
      title: "UX Design Tutorial: Creating Responsive Interfaces",
      creator: "@design_master",
      views: "128K",
      likes: "18.5K",
      category: "Design",
      trending: true
    },
    {
      id: 3,
      image: "https://redoctoberfirm.com/wp-content/uploads/2023/11/mobile-photography-1200x800.jpg",
      title: "Mobile Photography: Pro Techniques Using Just Your Phone",
      creator: "@photo_expert",
      views: "98K",
      likes: "12.7K",
      category: "Lifestyle",
      trending: false
    },
    {
      id: 4,
      image: "https://ocl-steinberg-live.steinberg.net/_storage/asset/178453/storage/master/How%20to%20Create%20LoFi%20Hip%20Hop%20Music-open_graph-1200x630.png",
      title: "Creating Lo-Fi Music: My Studio Setup Revealed",
      creator: "@music_creator",
      views: "214K",
      likes: "32.1K", 
      category: "Music",
      trending: true
    },
    {
      id: 5,
      image: "https://res.klook.com/image/upload/q_85/c_fill,w_750/v1655423560/blog/psclqf0x4kqzqezfay06.jpg",
      title: "Travel Vlog: Hidden Gems in Bali You Must Visit",
      creator: "@adventure_seeker",
      views: "473K",
      likes: "45.2K",
      category: "Travel",
      trending: false
    },
    {
      id: 6,
      image: "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
      title: "Baking Masterclass: 5-Minute Chocolate Lava Cake",
      creator: "@culinary_delights",
      views: "187K",
      likes: "27.8K",
      category: "Food",
      trending: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
          style={{ opacity, y }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-3"
            >
              <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium border border-red-500/20 backdrop-blur-sm shadow-xl shadow-red-500/5 flex items-center">
                <Flame size={14} className="mr-1.5 text-red-400" />
                TRENDING NOW
              </span>
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
              Explore <span className="bg-gradient-to-r from-white via-purple-100 to-gray-300 bg-clip-text text-transparent">Trending Videos</span>
            </h2>
            <p className="text-gray-300 max-w-2xl text-sm sm:text-base">
              Check out the most popular content on SnapLoop from creators around the world
            </p>
          </div>
        </motion.div>
        
        {/* Category filter buttons - Scrollable on mobile with improved responsive design */}
        <motion.div 
          ref={categoryRef}
          className="mb-8 relative mt-25"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.1 }}
        >
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            <div className={`flex space-x-2 md:flex-wrap md:gap-2 ${showAllCategories ? 'md:justify-start' : 'md:justify-center'}`}>
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  className={`py-1.5 px-3 sm:px-4 rounded-full text-sm whitespace-nowrap flex items-center flex-shrink-0 ${
                    index === 0 
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" 
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon && <span className="mr-1.5">{category.icon}</span>}
                  {category.name}
                </motion.button>
              ))}
              <motion.button
                className="py-1.5 px-3 sm:px-4 rounded-full text-sm whitespace-nowrap flex items-center bg-white/10 text-white hover:bg-white/15 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={14} className="mr-1.5" />
                Filters
              </motion.button>
            </div>
          </div>
          
          {/* Shadow indicators for horizontal scroll */}
          <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none md:hidden"></div>
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none md:hidden"></div>
        </motion.div>
        
        {/* Video grid with improved responsive layout */}
        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {exploreThumbnails.map((item) => (
            <motion.div 
              key={item.id}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-800/50 hover:border-purple-500/30"
              variants={fadeInUp}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              style={{
                willChange: "transform"
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Enhanced play button with better transition */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button 
                    className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-sm text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg shadow-purple-500/30"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Play size={22} />
                  </motion.button>
                </div>
                
                {/* Video duration badge */}
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                  0:{Math.floor(Math.random() * 59) + 10}
                </div>
                
                {/* Views count */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs text-white">
                  <Eye size={12} className="mr-1" />
                  {item.views}
                </div>
                
                {/* Enhanced category tag with icon */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-purple-600/70 to-blue-600/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-white font-medium flex items-center">
                  {item.category === 'Gaming' && <Sparkles size={10} className="mr-1" />}
                  {item.category === 'Music' && <Sparkles size={10} className="mr-1" />}
                  {item.category === 'Design' && <Sparkles size={10} className="mr-1" />}
                  {item.category}
                </div>
                
                {/* Trending indicator */}
                {item.trending && (
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-gradient-to-r from-red-500/70 to-amber-500/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-white font-medium flex items-center">
                    <TrendingUp size={10} className="mr-1" />
                    Trending
                  </div>
                )}
              </div>
              
              <div className="p-3 sm:p-4">
                <div className="flex items-start mb-3">
                  <motion.div 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-3 ring-1 ring-white/10 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-medium text-[10px] sm:text-xs">{item.creator[1].toUpperCase()}</span>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm sm:text-base font-medium mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                    <p className="text-blue-400 text-xs">{item.creator}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <motion.span 
                      className="text-gray-400 text-xs flex items-center"
                      whileHover={{ scale: 1.1, color: 'rgb(255, 255, 255)' }}
                    >
                      <Heart size={11} className="mr-1 text-red-400" fill="#f87171" /> {item.likes}
                    </motion.span>
                    <span className="text-gray-400 text-xs">
                      {Math.floor(Math.random() * 6) + 1}d ago
                    </span>
                  </div>
                  
                  <motion.button 
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <BookmarkIcon size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA Section */}
        <motion.div 
          className="flex justify-center mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/feed" 
            className="group inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/20 overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cpolygon fill=%22%23ffffff%22 fill-opacity=%220.1%22 points=%220,0 0,100 50,50%22/%3E%3C/svg%3E')] bg-[length:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity animate-shine"></span>
            <span className="relative z-10 flex items-center">
              <PlayCircle size={18} className="mr-2" />
              <span className="text-sm sm:text-base">Watch Feed</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingVideosSection;