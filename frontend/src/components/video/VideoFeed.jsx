import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';
import ShortVideoCard from './ShortVideoCard';

/**
 * VideoFeed Component
 * 
 * A scrollable container that renders a list of VideoCard components with
 * snap scrolling behavior similar to Instagram Reels.
 * 
 * @param {Object} props
 * @param {Array} props.videos - Array of video objects
 * @param {boolean} props.useShortCards - Whether to use ShortVideoCard instead of VideoCard
 */
const VideoFeed = ({ videos = [], useShortCards = false }) => {
  const feedContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Transform videos to ensure they have the required properties
  const processedVideos = videos.map(video => {
    return {
      id: video.id || Math.random().toString(36).substring(7),
      username: video.username || '@user',
      title: video.title || 'Untitled video',
      hashtags: video.hashtags || [],
      likes: video.likes || '0',
      comments: video.comments || '0',
      shares: video.shares || '0',
      videoUrl: video.videoUrl || video.video || video.src,
      thumbnailUrl: video.thumbnailUrl || video.thumbnail,
      views: video.views || '0',
      // Add any other properties needed
    };
  });

  // Function to handle scroll events and determine current video
  const handleScroll = () => {
    if (!feedContainerRef.current || isScrolling) return;
    
    const container = feedContainerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const height = container.clientHeight;
    
    // Calculate index based on scroll position
    const index = Math.round(scrollTop / height);
    
    // Update current index if changed
    if (index !== currentIndex && index >= 0 && index < processedVideos.length) {
      setCurrentIndex(index);
    }
  };

  // Improved scroll handling with better performance
  useEffect(() => {
    const container = feedContainerRef.current;
    if (!container) return;

    // Use requestAnimationFrame for smoother performance
    let scrollTimeout;
    let ticking = false;
    
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
      
      // Reset scrolling state after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };
    
    container.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', scrollHandler);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, processedVideos.length]);
  
  // Handle manual scroll to specific video with improved animation
  const scrollToVideo = (index) => {
    if (!feedContainerRef.current) return;
    
    setIsScrolling(true);
    setCurrentIndex(index);
    
    // Scroll to the video with improved smoothness
    feedContainerRef.current.scrollTo({
      top: index * feedContainerRef.current.clientHeight,
      behavior: 'smooth'
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
      
      // Force recheck of scroll position after animation
      handleScroll();
    }, 500);
  };

  // Initialize proper heights and ensure first video plays on load
  useEffect(() => {
    // Ensure the initial video is centered properly on load
    if (feedContainerRef.current && processedVideos.length > 0) {
      // Set the scroll position to the first video without smooth scrolling
      feedContainerRef.current.scrollTop = 0;
      
      // Force a layout recalculation to ensure proper sizing
      setTimeout(() => {
        // Check if we need to adjust the container height
        const containerHeight = feedContainerRef.current.clientHeight;
        const videoContainers = feedContainerRef.current.querySelectorAll('.video-item');
        
        videoContainers.forEach(container => {
          container.style.height = `${containerHeight}px`;
        });
        
        // Force the current video to be active
        setCurrentIndex(0);
      }, 100);
    }

    // Add keyboard navigation for videos
    const handleKeyDown = (e) => {
      if (!feedContainerRef.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'j') {
        // Next video
        if (currentIndex < processedVideos.length - 1) {
          scrollToVideo(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        // Previous video
        if (currentIndex > 0) {
          scrollToVideo(currentIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [processedVideos, currentIndex]);

  // Enhanced touch handling for better mobile experience
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    if (isScrolling) return;
    setTouchEnd(e.targetTouches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    if (!feedContainerRef.current || isScrolling) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    // Only process if we have valid touch points
    if (touchStart && touchEnd && Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe up - go to next video
        if (currentIndex < processedVideos.length - 1) {
          scrollToVideo(currentIndex + 1);
        }
      } else {
        // Swipe down - go to previous video
        if (currentIndex > 0) {
          scrollToVideo(currentIndex - 1);
        }
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Update current video whenever the index changes
  useEffect(() => {
    // Force update the active state of videos
    const updateActiveVideo = () => {
      const videoContainers = document.querySelectorAll('.video-item');
      videoContainers.forEach((container, idx) => {
        if (idx === currentIndex) {
          container.setAttribute('data-active', 'true');
        } else {
          container.setAttribute('data-active', 'false');
        }
      });
    };
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateActiveVideo, 50);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Animate the container when it mounts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // If no videos provided and useShortCards is true, render the empty state
  if (processedVideos.length === 0 && useShortCards) {
    return (
      <div className="h-screen w-full max-w-md mx-auto bg-black flex items-center justify-center">
        <p className="text-white text-center px-4">
          No videos available. Videos you create will appear here.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="relative max-w-full h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div 
        ref={feedContainerRef}
        className="snap-y snap-mandatory h-full w-full overflow-y-scroll scrollbar-hide"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onScroll={!isScrolling ? handleScroll : undefined}
      >
        {processedVideos.map((video, index) => (
          <div 
            key={video.id} 
            className="h-screen w-full snap-start snap-always video-item flex items-center justify-center"
            data-index={index}
            data-active={index === currentIndex ? 'true' : 'false'}
          >
            {useShortCards ? (
              <ShortVideoCard 
                video={video} 
                isActive={index === currentIndex}
              />
            ) : (
              <VideoCard 
                video={video} 
                isActive={index === currentIndex}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Navigation indicators for desktop */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex flex-col items-center">
        {processedVideos.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-${idx === currentIndex ? '6' : '2'} rounded-full my-1 ${
              idx === currentIndex ? 'bg-white' : 'bg-white/30'
            } transition-all duration-300 hover:bg-white/80`}
            onClick={() => scrollToVideo(idx)}
            aria-label={`Go to video ${idx + 1}`}
          />
        ))}
      </div>
      
      {/* Add custom styles for better scrolling behavior */}
      <style jsx global>{`
        html, body {
          overscroll-behavior-y: contain;
          height: 100%;
          width: 100%;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Ensure videos fill the container properly */
        .video-item {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          position: relative;
        }
        
        .video-item > div {
          width: 100%;
          height: 100%;
          max-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </motion.div>
  );
};

export default VideoFeed;