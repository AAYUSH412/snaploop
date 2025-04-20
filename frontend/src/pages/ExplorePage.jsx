import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight, Bookmark, BookmarkCheck, Play, Eye, Heart, LayoutGrid, LayoutList } from 'lucide-react';
import { exploreCategories, exploreVideos } from '../mock'; // Import from centralized mock data
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import VideoFeed from '../components/video/VideoFeed';


const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'vertical'
  
  // Filter videos based on category and search term
  const filteredVideos = exploreVideos.filter(video => {
    return (
      (activeCategory === 'all' || video.category === activeCategory) &&
      (searchTerm === '' || 
       video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       video.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Toggle saved video status
  const toggleSaved = (videoId) => {
    setSavedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 100 } 
    }
  };

  // Page header animations
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  // Background gradient elements
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pb-12 relative">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl animate-pulse" 
          style={{ animationDelay: "1s", transform: `translateY(${scrollY * -0.01}px)` }}
        ></div>
      </div>
      
      {/* Page Header */}
      <motion.div 
        className="mb-8"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Explore</h1>
        <p className="text-gray-400">Discover trending videos and creators from around the world</p>
      </motion.div>
      
      {/* Featured Section - New Addition */}
      <motion.div 
        className="mb-10 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/5 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="flex items-center space-x-2 mb-4">
          <ArrowTrendingUpIcon className="text-purple-400 h-6 w-6" />
          <h2 className="text-xl font-semibold text-white">Featured Today</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredVideos.slice(0, 3).map((video) => (
            <motion.div
              key={`featured-${video.id}`}
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium line-clamp-1 mb-1">{video.title}</h3>
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>{video.username}</span>
                    <div className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <motion.button 
                    className="w-14 h-14 bg-purple-600/80 hover:bg-purple-600 text-white rounded-full flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Search and Filter Bar */}
      <motion.div 
        className="bg-[#121212]/80 backdrop-blur-md rounded-2xl p-5 mb-8 shadow-lg border border-gray-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] text-white rounded-lg pl-10 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-800 group-hover:border-purple-500/50 transition-all"
            />
            {searchTerm && (
              <motion.button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchTerm('')}
              >
                ✕
              </motion.button>
            )}
          </div>
          
          <motion.button 
            className={`flex items-center space-x-2 px-5 py-3.5 rounded-lg transition-all ${
              showFilters 
                ? 'bg-purple-600 text-white' 
                : 'bg-[#1A1A1A] hover:bg-[#252525] text-white border border-gray-800'
            }`}
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={18} />
            <span>{showFilters ? 'Hide Filters' : 'Filters'}</span>
          </motion.button>
        </div>
        
        {/* Expanded Filters (toggle visibility) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5 pt-5 border-t border-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Sort By</label>
                  <div className="bg-[#1A1A1A] rounded-lg p-1 grid grid-cols-3 gap-1">
                    {['Popular', 'Recent', 'Trending'].map((option) => (
                      <motion.button
                        key={option}
                        className={`py-2 px-3 rounded-md text-sm ${option === 'Popular' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Time Frame</label>
                  <div className="bg-[#1A1A1A] rounded-lg p-1 grid grid-cols-4 gap-1">
                    {['Today', 'Week', 'Month', 'All Time'].map((option) => (
                      <motion.button
                        key={option}
                        className={`py-2 px-1 rounded-md text-sm ${option === 'Week' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Categories */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-lg font-medium text-white mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-full transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg shadow-purple-500/20'
                : 'bg-[#1A1A1A]/80 text-gray-300 hover:bg-[#252525] border border-gray-800/80 hover:border-gray-700'
            }`}
            whileHover={activeCategory !== 'all' ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.97 }}
          >
            All
          </motion.button>
          
          {exploreCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg shadow-purple-500/20'
                  : 'bg-[#1A1A1A]/80 text-gray-300 hover:bg-[#252525] border border-gray-800/80 hover:border-gray-700'
              }`}
              whileHover={activeCategory !== category.id ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.97 }}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Results Header */}
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
          <h2 className="text-2xl font-medium text-white">
            {activeCategory !== 'all' 
              ? `${exploreCategories.find(c => c.id === activeCategory)?.name} Videos` 
              : 'All Videos'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Showing {filteredVideos.length} results</p>
        </div>
        
        <div className="flex space-x-2">
          <motion.button 
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg ${
              viewMode === 'vertical' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                : 'bg-[#1A1A1A]/70 hover:bg-[#252525] text-white border border-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(viewMode === 'grid' ? 'vertical' : 'grid')}
          >
            {viewMode === 'grid' ? <LayoutList size={18} className="mr-2" /> : <LayoutGrid size={18} className="mr-2" />}
            <span>{viewMode === 'grid' ? 'Vertical View' : 'Grid View'}</span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Videos Grid or Vertical Feed */}
      {filteredVideos.length > 0 ? (
        viewMode === 'grid' ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredVideos.map((video) => (
              <motion.div 
                key={video.id} 
                className="bg-[#121212]/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border border-gray-800/50 hover:border-purple-500/30"
                variants={itemVariants}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                whileHover={{ y: -8 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button 
                      className="bg-purple-600/80 hover:bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={24} />
                    </motion.button>
                  </div>
                  
                  {/* Bookmark Button */}
                  <motion.button
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                    onClick={() => toggleSaved(video.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredVideo === video.id || savedVideos.includes(video.id) ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {savedVideos.includes(video.id) ? (
                      <BookmarkCheck size={18} className="text-purple-400" />
                    ) : (
                      <Bookmark size={18} className="text-white" />
                    )}
                  </motion.button>
                  
                  {/* Video Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                    {video.duration || '3:42'}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <motion.div 
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-2 border-2 border-[#121212]"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-white font-medium text-xs">{video.username[1].toUpperCase()}</span>
                    </motion.div>
                    <div>
                      <h3 className="text-white font-medium mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">{video.title}</h3>
                      <span className="text-blue-400 text-sm">{video.username}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        {video.views}
                      </span>
                      <span className="flex items-center">
                        <Heart size={12} className="mr-1" />
                        {video.likes}
                      </span>
                    </div>
                    <span>2 days ago</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="h-[80vh] md:ml-[-76px]">
            <VideoFeed videos={filteredVideos} useShortCards={true} />
          </div>
        )
      ) : (
        <motion.div 
          className="text-center py-16 bg-[#121212]/60 backdrop-blur-sm rounded-2xl border border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="mx-auto w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center mb-6"
          >
            <Search size={40} className="text-gray-500" />
          </motion.div>
          <h3 className="text-2xl font-medium text-white mb-3">No results found</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">We couldn't find any videos matching your search. Try adjusting your filters or search terms.</p>
          <motion.button 
            onClick={() => {setActiveCategory('all'); setSearchTerm('');}}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}
      
      {/* Load More Button */}
      {filteredVideos.length > 0 && (
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            className="bg-[#1A1A1A] hover:bg-[#252525] text-white font-medium px-8 py-3 rounded-lg border border-gray-800 hover:border-purple-500/30 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Load More Videos
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ExplorePage;