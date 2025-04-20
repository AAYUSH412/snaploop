import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { sampleVideos } from '../mock'; // Import from mock data
import VideoCard from '../components/video/VideoCard';

const VideoFeedPage = () => {
  const [videos] = useState(sampleVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showCommentOverlay, setShowCommentOverlay] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const feedContainerRef = useRef(null);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't navigate when comments overlay is open
      if (showCommentOverlay) return;
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        navigateToIndex(currentIndex - 1);
      }
      else if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        navigateToIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, showCommentOverlay]);
  
  // Handle wheel scrolling with smooth snapping
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't navigate when comments overlay is open
      if (showCommentOverlay || isNavigating) return;
      
      if (e.deltaY > 0 && currentIndex < videos.length - 1) {
        navigateToIndex(currentIndex + 1);
      } 
      else if (e.deltaY < 0 && currentIndex > 0) {
        navigateToIndex(currentIndex - 1);
      }
    };
    
    const feedContainer = feedContainerRef.current;
    if (feedContainer) {
      feedContainer.addEventListener('wheel', handleWheel);
    }
    
    return () => {
      if (feedContainer) {
        feedContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentIndex, videos.length, isNavigating, showCommentOverlay]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || showCommentOverlay || isNavigating) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50; // Minimum swipe distance
    
    if (isSignificantSwipe) {
      if (distance > 0 && currentIndex < videos.length - 1) {
        // Swipe up - go to next video
        navigateToIndex(currentIndex + 1);
      } 
      else if (distance < 0 && currentIndex > 0) {
        // Swipe down - go to previous video
        navigateToIndex(currentIndex - 1);
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  const navigateToIndex = (index) => {
    setIsNavigating(true);
    setCurrentIndex(index);
    
    // Cooldown period to prevent rapid scrolling
    setTimeout(() => {
      setIsNavigating(false);
    }, 800);
  };
  
  const handleCommentClick = (video) => {
    setActiveVideo(video);
    setShowCommentOverlay(true);
  };
  
  const closeComments = () => {
    setShowCommentOverlay(false);
    setActiveVideo(null);
  };

  // Calculate heights for proper snapping
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--video-height', `${vh}px`);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Navigation indicators */}
      <div className="fixed z-20 right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
        <motion.button 
          className={`p-2 rounded-full ${
            currentIndex > 0 ? 'bg-white/20 hover:bg-white/30' : 'bg-white/10 text-gray-500 cursor-not-allowed'
          } backdrop-blur-sm`}
          onClick={() => currentIndex > 0 && navigateToIndex(currentIndex - 1)}
          whileHover={currentIndex > 0 ? { scale: 1.2 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
          disabled={currentIndex === 0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowUp size={20} className="text-white" />
        </motion.button>
        
        <div className="py-2">
          {videos.map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-1.5 h-${
                idx === currentIndex ? '6' : '1.5'
              } rounded-full my-1.5 ${
                idx === currentIndex ? 'bg-white' : 'bg-white/30'
              } transition-all duration-300`}
              onClick={() => navigateToIndex(idx)}
              whileHover={{ backgroundColor: idx !== currentIndex ? 'rgba(255,255,255,0.5)' : '' }}
              initial={{ scale: idx === currentIndex ? 1 : 0.8 }}
              animate={{ scale: idx === currentIndex ? 1 : 0.8 }}
            ></motion.div>
          ))}
        </div>
        
        <motion.button 
          className={`p-2 rounded-full ${
            currentIndex < videos.length - 1 ? 'bg-white/20 hover:bg-white/30' : 'bg-white/10 text-gray-500 cursor-not-allowed'
          } backdrop-blur-sm`}
          onClick={() => currentIndex < videos.length - 1 && navigateToIndex(currentIndex + 1)}
          whileHover={currentIndex < videos.length - 1 ? { scale: 1.2 } : {}}
          whileTap={currentIndex < videos.length - 1 ? { scale: 0.9 } : {}}
          disabled={currentIndex === videos.length - 1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowDown size={20} className="text-white" />
        </motion.button>
      </div>

      {/* Main video feed container - using CSS snap for smooth transitions */}
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
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {videos.map((video, index) => (
            <div 
              key={video.id || index}
              className="h-[var(--video-height)] w-full" 
            >
              <VideoCard 
                video={video} 
                onCommentClick={handleCommentClick}
                className={index !== currentIndex ? 'opacity-60 scale-[0.98]' : ''}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
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
        }
      `}</style>
    </div>
  );
};

export default VideoFeedPage;