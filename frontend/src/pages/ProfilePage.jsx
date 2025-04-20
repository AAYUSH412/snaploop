import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Link as LinkIcon, Grid, Heart, Edit, Share2, Clock, Play, BookmarkIcon, MessageCircle, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { userData, userProfileVideos, userLikedVideos } from '../mock'; // Updated import name

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const navigate = useNavigate();
  
  // Trigger stats counter animation when page loads
  useEffect(() => {
    setAnimateStats(true);
  }, []);
  
  // Handle share profile functionality
  const handleShareProfile = () => {
    // In a real app, this would use the Web Share API or copy to clipboard
    // For now, we'll simulate by showing a toast message
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 }
    }
  };
  
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <div className="pb-12 relative">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/15 to-blue-900/15"></div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-3/4 right-1/3 w-40 h-40 rounded-full bg-cyan-600/5 blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
      </div>
      
      {/* Profile Header - Enhanced */}
      <motion.div 
        className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl mb-8 border border-white/10 hover:border-white/15 transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Cover Image with Parallax Effect */}
        <div className="h-48 sm:h-56 bg-gradient-to-r from-purple-600/60 to-blue-500/60 relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1 }}
          ></motion.div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/80"></div>
          
          {/* Edit Cover Button */}
          <motion.button 
            className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-black/60 transition-colors border border-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/edit-profile')}
          >
            <Edit size={16} />
          </motion.button>
          
          {/* Username Badge on Cover */}
          <motion.div 
            className="absolute bottom-4 right-6 bg-black/40 backdrop-blur-lg px-3 py-1.5 rounded-full border border-white/10 hidden sm:flex items-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-blue-400">{userData.username}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </motion.div>
        </div>
        
        {/* User Info Section - Enhanced */}
        <div className="px-6 py-6 relative">
          {/* Avatar - Enhanced */}
          <motion.div 
            className="absolute -top-16 left-6 w-28 h-28 rounded-full p-1.5 bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/20 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-full h-full rounded-full bg-gray-900 p-1 overflow-hidden">
              {userData.avatarUrl ? (
                <img 
                  src={userData.avatarUrl}
                  alt={userData.displayName} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">{userData.displayName.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Edit size={20} className="text-white" />
              </div>
            </div>
            {/* Verified Badge */}
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
          
          {/* Profile Actions - Enhanced */}
          <div className="flex justify-end space-x-2 mb-8">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 transition-colors text-white backdrop-blur-sm border border-white/5"
              onClick={handleShareProfile}
            >
              <Share2 size={16} />
              <span>Share</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/90 to-blue-500/90 hover:from-purple-700 hover:to-blue-600 transition-colors text-white shadow-md shadow-purple-500/20 backdrop-blur-sm"
              onClick={() => navigate('/edit-profile')}
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95, rotate: 0 }}
              className="p-2.5 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 transition-colors text-white border border-white/5 backdrop-blur-sm"
              onClick={() => navigate('/settings')}
            >
              <Settings size={16} />
            </motion.button>
          </div>
          
          {/* User Details - Enhanced */}
          <div className="pt-2 mt-4">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {userData.displayName}
            </motion.h1>
            
            <motion.div className="flex flex-wrap gap-x-3 items-center mb-3 mt-1">
              <span className="text-blue-400">{userData.username}</span>
              
              {/* Category badge */}
              <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                {userData.category || 'Creator'}
              </span>
              
              {/* Join date badge */}
              <span className="text-xs flex items-center text-gray-400">
                <Clock size={12} className="mr-1" /> Joined {userData.joinedDate}
              </span>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 mb-6 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {userData.bio}
            </motion.p>
            
            {/* Stats Cards - New Enhanced Design */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
              variants={containerVariants}
              initial="hidden"
              animate={animateStats ? "visible" : "hidden"}
            >
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-1 duration-300"
                variants={statsVariants}
              >
                <div className="text-xs text-gray-400 mb-1">Followers</div>
                <div className="text-xl font-bold text-white">{userData.followers}</div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 duration-300"
                variants={statsVariants}
              >
                <div className="text-xs text-gray-400 mb-1">Following</div>
                <div className="text-xl font-bold text-white">{userData.following}</div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all hover:-translate-y-1 duration-300"
                variants={statsVariants}
              >
                <div className="text-xs text-gray-400 mb-1">Total Views</div>
                <div className="text-xl font-bold text-white">1.2M</div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-white/5 hover:border-yellow-500/30 transition-all hover:-translate-y-1 duration-300"
                variants={statsVariants}
              >
                <div className="text-xs text-gray-400 mb-1">Videos</div>
                <div className="text-xl font-bold text-white">{userProfileVideos.length}</div>
              </motion.div>
            </motion.div>
            
            {/* Additional User Info - Collapsible */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
              {/* Website Link */}
              {userData.website && (
                <motion.a 
                  href={userData.website.startsWith('http') ? userData.website : `https://${userData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <LinkIcon size={14} />
                  <span className="underline decoration-dotted">
                    {userData.website.replace(/(^\w+:|^)\/\//, '')}
                  </span>
                </motion.a>
              )}
              
              {/* Location */}
              <motion.div 
                className="flex items-center space-x-2 text-sm text-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                <span>📍</span>
                <span>{userData.location}</span>
              </motion.div>
              
              <motion.button 
                onClick={() => setShowUserInfo(!showUserInfo)}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{showUserInfo ? 'Less info' : 'More info'}</span>
                <motion.span
                  animate={{ rotate: showUserInfo ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>
            </div>
            
            {/* Additional User Info - Collapsible */}
            <AnimatePresence>
              {showUserInfo && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mt-4 border-t border-gray-800/70"
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Additional profile fields could go here */}
                  <div className="bg-gray-800/30 backdrop-blur-md rounded-lg p-4 border border-white/5">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">About Me</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-400 text-sm">Content Type</span>
                        <span className="text-white text-sm">UI/UX Design</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400 text-sm">Languages</span>
                        <span className="text-white text-sm">English, Spanish</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400 text-sm">Age</span>
                        <span className="text-white text-sm">28</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/30 backdrop-blur-md rounded-lg p-4 border border-white/5">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Creator Stats</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-400 text-sm">Avg. Engagement</span>
                        <span className="text-white text-sm">24.5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400 text-sm">Content Posted</span>
                        <span className="text-white text-sm">132 videos</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400 text-sm">Account Status</span>
                        <span className="text-green-400 text-sm flex items-center">
                          Verified
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      
      {/* Tabs Navigation - Enhanced */}
      <motion.div 
        className="flex border-b border-gray-800/70 mb-8 relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          className={`flex items-center space-x-2 px-6 py-4 font-medium border-b-2 transition-all ${
            activeTab === 'videos'
              ? 'text-white border-purple-500 bg-gradient-to-b from-purple-500/10 to-transparent'
              : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('videos')}
        >
          <Grid size={18} />
          <span>Videos</span>
        </button>
        
        <button
          className={`flex items-center space-x-2 px-6 py-4 font-medium border-b-2 transition-all ${
            activeTab === 'liked'
              ? 'text-white border-purple-500 bg-gradient-to-b from-purple-500/10 to-transparent'
              : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('liked')}
        >
          <Heart size={18} />
          <span>Liked</span>
        </button>
        
        <div className="ml-auto flex items-center pr-4">
          <select className="bg-gray-800/70 text-gray-300 text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <option>Recent</option>
            <option>Popular</option>
            <option>Oldest</option>
          </select>
        </div>
      </motion.div>
      
      {/* Tab Content - Enhanced */}
      <AnimatePresence mode="wait">
        {activeTab === 'videos' && (
          <motion.div
            key="videos"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {userProfileVideos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/5 hover:border-purple-500/30"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="aspect-video relative overflow-hidden group">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      className="bg-purple-600/80 hover:bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="ml-1" />
                    </motion.button>
                  </div>
                  
                  {/* Video duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs text-white font-medium">
                    0:42
                  </div>
                  
                  {/* Views badge */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs text-white">
                    <Eye size={12} className="mr-1" />
                    {video.views}
                  </div>
                  
                  {/* Interactive buttons */}
                  <div className="absolute bottom-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                      whileHover={{ scale: 1.2, backgroundColor: 'rgba(139, 92, 246, 0.5)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart size={14} />
                    </motion.button>
                    <motion.button
                      className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                      whileHover={{ scale: 1.2, backgroundColor: 'rgba(59, 130, 246, 0.5)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MessageCircle size={14} />
                    </motion.button>
                    <motion.button
                      className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                      whileHover={{ scale: 1.2, backgroundColor: 'rgba(16, 185, 129, 0.5)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <BookmarkIcon size={14} />
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-medium text-base mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">{video.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">{video.timestamp}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs flex items-center">
                        <Heart size={10} className="mr-1" /> 24.5K
                      </span>
                      <span className="text-gray-400 text-xs flex items-center">
                        <MessageCircle size={10} className="mr-1" /> 482
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {activeTab === 'liked' && (
          <motion.div
            key="liked"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {userLikedVideos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/5 hover:border-blue-500/30"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="aspect-video relative overflow-hidden group">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      className="bg-blue-600/80 hover:bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="ml-1" />
                    </motion.button>
                  </div>
                  
                  {/* Video duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs text-white font-medium">
                    1:15
                  </div>
                  
                  {/* Views badge */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs text-white">
                    <Eye size={12} className="mr-1" />
                    {video.views}
                  </div>
                  
                  {/* Creator badge */}
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-blue-400">{video.creator}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-medium text-base mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">{video.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 text-xs">{video.creator}</span>
                    <span className="text-gray-400 text-xs">{video.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* No content state */}
        {((activeTab === 'videos' && userProfileVideos.length === 0) || 
          (activeTab === 'liked' && userLikedVideos.length === 0)) && (
          <motion.div 
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              {activeTab === 'videos' ? (
                <Grid size={32} className="text-gray-500" />
              ) : (
                <Heart size={32} className="text-gray-500" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {activeTab === 'videos' ? 'No videos yet' : 'No liked videos yet'}
            </h3>
            <p className="text-gray-400 max-w-md mb-8">
              {activeTab === 'videos' 
                ? 'Upload your first video to start building your profile.'
                : 'Videos you like will appear here. Start exploring to find content you enjoy!'}
            </p>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === 'videos' ? 'Upload a Video' : 'Explore Content'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Success Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div 
            className="fixed bottom-5 right-5 bg-green-500/90 text-white px-4 py-3 rounded-lg shadow-lg border border-green-400 backdrop-blur-sm z-50 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Profile link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;