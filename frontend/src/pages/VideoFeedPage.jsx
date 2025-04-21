import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, MessageCircle, RefreshCcw, Info, X, Volume2, VolumeX } from 'lucide-react';
import { sampleVideos } from '../mock'; // Import from mock data
import VideoCard from '../components/video/VideoCard';

const VideoFeedPage = () => {
  const [videos] = useState(sampleVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showCommentOverlay, setShowCommentOverlay] = useState(false);
  const [showInfoOverlay, setShowInfoOverlay] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showLoopNotification, setShowLoopNotification] = useState(false);
  const feedContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressInterval = useRef(null);
  
  // Handle keyboard navigation with loop functionality
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't navigate when overlays are open
      if (showCommentOverlay || showInfoOverlay) return;
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        navigateToIndex(currentIndex - 1);
      }
      else if (e.key === 'ArrowDown') {
        // If we're at the last video, loop to the first one
        if (currentIndex === videos.length - 1) {
          handleLoopToStart();
        } else {
          navigateToIndex(currentIndex + 1);
        }
      }
      // Add mute toggle with 'm' key
      else if (e.key === 'm') {
        setIsMuted(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, showCommentOverlay, showInfoOverlay]);
  
  // Handle wheel scrolling with smooth snapping and looping
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't navigate when overlays are open
      if (showCommentOverlay || showInfoOverlay || isNavigating) return;
      
      if (e.deltaY > 0) {
        if (currentIndex === videos.length - 1) {
          handleLoopToStart();
        } else {
          navigateToIndex(currentIndex + 1);
        }
      } 
      else if (e.deltaY < 0 && currentIndex > 0) {
        navigateToIndex(currentIndex - 1);
      }
    };
    
    const feedContainer = feedContainerRef.current;
    if (feedContainer) {
      feedContainer.addEventListener('wheel', handleWheel, { passive: true });
    }
    
    return () => {
      if (feedContainer) {
        feedContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentIndex, videos.length, isNavigating, showCommentOverlay, showInfoOverlay]);

  // Handle touch events for mobile swipe with looping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || showCommentOverlay || showInfoOverlay || isNavigating) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50; // Minimum swipe distance
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe up - go to next video with loop
        if (currentIndex === videos.length - 1) {
          handleLoopToStart();
        } else {
          navigateToIndex(currentIndex + 1);
        }
      } 
      else if (distance < 0 && currentIndex > 0) {
        // Swipe down - go to previous video
        navigateToIndex(currentIndex - 1);
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  const handleLoopToStart = () => {
    setIsNavigating(true);
    setShowLoopNotification(true);
    
    // Briefly show loop notification
    setTimeout(() => {
      setShowLoopNotification(false);
      navigateToIndex(0);
    }, 800);
  };
  
  const navigateToIndex = (index) => {
    setIsNavigating(true);
    setCurrentIndex(index);
    
    // Reset and start progress bar for new video
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%';
    }
    startProgressBar();
    
    // Cooldown period to prevent rapid scrolling
    setTimeout(() => {
      setIsNavigating(false);
    }, 800);
  };
  
  const handleCommentClick = (video) => {
    setActiveVideo(video);
    setShowCommentOverlay(true);
    
    // Pause progress when showing comments
    clearProgressInterval();
  };
  
  const handleInfoClick = (video) => {
    setActiveVideo(video);
    setShowInfoOverlay(true);
    
    // Pause progress when showing info
    clearProgressInterval();
  };
  
  const closeOverlay = () => {
    setShowCommentOverlay(false);
    setShowInfoOverlay(false);
    setActiveVideo(null);
    
    // Resume progress when overlay closes
    startProgressBar();
  };

  // Progress bar for video duration indication
  const startProgressBar = () => {
    clearProgressInterval();
    
    // Simulate video progress (can be replaced with actual video duration)
    const duration = 15000; // 15 seconds default duration
    const interval = 50; // update interval in ms
    const increment = (interval / duration) * 100;
    let progress = 0;
    
    progressInterval.current = setInterval(() => {
      progress += increment;
      
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
      
      if (progress >= 100) {
        clearProgressInterval();
        
        // Auto-advance to next video or loop to first
        if (currentIndex === videos.length - 1) {
          handleLoopToStart();
        } else {
          navigateToIndex(currentIndex + 1);
        }
      }
    }, interval);
  };
  
  const clearProgressInterval = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  // Calculate heights for proper snapping and ensure full visibility
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--video-height', `${vh}px`);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Force video at current index to play and start progress bar
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Update active state for all videos
      const videoContainers = document.querySelectorAll('.video-container');
      videoContainers.forEach((container, idx) => {
        if (idx === currentIndex) {
          container.dataset.active = 'true';
        } else {
          container.dataset.active = 'false';
        }
      });
      
      // Start progress bar for current video
      startProgressBar();
    }, 150);
    
    return () => {
      clearTimeout(timer);
      clearProgressInterval();
    };
  }, [currentIndex]);
  
  // Cleanup intervals on unmount
  useEffect(() => {
    return () => clearProgressInterval();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-black to-gray-900/95">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/20 z-50">
        <motion.div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          initial={{ width: '0%' }}
        />
      </div>
      
      

      {/* Loop notification */}
      <AnimatePresence>
        {showLoopNotification && (
          <motion.div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-md px-5 py-3 rounded-full flex items-center space-x-2 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <RefreshCcw size={20} className="text-white animate-spin" />
            <span className="text-white font-medium">Looping back to start</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side navigation indicators with modern style */}
      <div className="fixed z-20 right-5 sm:right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
        <motion.div
          className="bg-black/20 backdrop-blur-md p-2 rounded-full flex flex-col items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            className={`p-2 rounded-full ${
              currentIndex > 0 ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => currentIndex > 0 && navigateToIndex(currentIndex - 1)}
            whileHover={currentIndex > 0 ? { scale: 1.2 } : {}}
            whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
            disabled={currentIndex === 0}
          >
            <ArrowUp size={18} className="text-white" />
          </motion.button>
          
          <div className="py-2 space-y-1.5">
            {videos.map((_, idx) => (
              <motion.div
                key={idx}
                className={`w-1 h-${
                  idx === currentIndex ? '5' : '1'
                } rounded-full ${
                  idx === currentIndex ? 'bg-purple-500' : 'bg-white/30'
                } transition-all duration-300`}
                onClick={() => navigateToIndex(idx)}
                whileHover={{ backgroundColor: idx !== currentIndex ? 'rgba(255,255,255,0.5)' : '' }}
                initial={{ scale: idx === currentIndex ? 1 : 0.8 }}
                animate={{ scale: idx === currentIndex ? 1 : 0.8 }}
              ></motion.div>
            ))}
          </div>
          
          <motion.button 
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => {
              if (currentIndex === videos.length - 1) {
                handleLoopToStart();
              } else {
                navigateToIndex(currentIndex + 1);
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowDown size={18} className="text-white" />
          </motion.button>
        </motion.div>
      </div>

      {/* Additional interaction buttons */}
      <div className="fixed left-5 top-1/2 transform -translate-y-1/2 z-20">
        <motion.div 
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="bg-black/30 backdrop-blur-sm p-3 rounded-full text-white"
            onClick={() => handleCommentClick(videos[currentIndex])}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={20} />
          </motion.button>
          
          <motion.button
            className="bg-black/30 backdrop-blur-sm p-3 rounded-full text-white"
            onClick={() => handleInfoClick(videos[currentIndex])}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.9 }}
          >
            <Info size={20} />
          </motion.button>
        </motion.div>
      </div>

      {/* Main video feed container */}
      <div 
        ref={feedContainerRef}
        className="h-full w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div 
          className="h-full w-full"
          animate={{ y: `-${currentIndex * 100}%` }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            mass: 1 
          }}
        >
          {videos.map((video, index) => (
            <div 
              key={video.id || index}
              className="h-[var(--video-height)] w-full video-container"
              data-active={index === currentIndex ? 'true' : 'false'}
              data-index={index}
            >
              <VideoCard 
                video={video} 
                onCommentClick={handleCommentClick}
                isActive={index === currentIndex}
                className={index !== currentIndex ? 'opacity-60 scale-[0.98]' : ''}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Comment overlay */}
      <AnimatePresence>
        {showCommentOverlay && activeVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white">Comments</h2>
              <motion.button
                className="p-2 rounded-full bg-gray-800 text-white"
                onClick={closeOverlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {/* Sample comments - would be dynamic in a real app */}
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium">U{item}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">user_{item*123}</p>
                      <span className="text-gray-400 text-sm">{item} hr ago</span>
                    </div>
                    <p className="text-gray-300 mt-1">
                      This is an amazing video! The content is so engaging.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Comment input */}
            <div className="p-4 border-t border-gray-800 bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">ME</span>
                </div>
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 px-4 text-white focus:outline-none focus:border-purple-500"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 font-medium">Post</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Video info overlay */}
      <AnimatePresence>
        {showInfoOverlay && activeVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOverlay}
          >
            <motion.div 
              className="bg-gray-900/90 rounded-2xl p-6 max-w-lg w-full border border-gray-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Video Details</h2>
                <motion.button
                  className="p-2 rounded-full bg-gray-800 text-white"
                  onClick={closeOverlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{activeVideo.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{activeVideo.views || "1.2M"} views</span>
                    <span>•</span>
                    <span>Posted 3 days ago</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 py-3 border-y border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">{activeVideo.username?.substring(1, 3).toUpperCase() || "CR"}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activeVideo.username || "@creator"}</p>
                    <p className="text-sm text-gray-400">12.5K followers</p>
                  </div>
                  <motion.button
                    className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Follow
                  </motion.button>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-white font-medium mb-2">Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {(activeVideo.hashtags || ["trending", "viral", "fyp"]).map((tag, i) => (
                      <span key={i} className="bg-gray-800 px-3 py-1 rounded-full text-sm text-blue-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS Variables */}
      <style jsx global>{`
        :root {
          --video-height: 100vh;
        }
        
        html, body {
          overflow: hidden;
          overscroll-behavior: none;
          height: 100%;
          width: 100%;
          position: fixed;
          width: 100vw;
        }
        
        .video-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Custom gradient animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bg-gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default VideoFeedPage;