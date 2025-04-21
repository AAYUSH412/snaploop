import React, { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Volume2, VolumeX, BookmarkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ShortVideoCard = ({ video = {}, isActive = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const attemptedPlayRef = useRef(false);

  // Handle video visibility and playback with improved threshold
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5, 0.7, 0.9] // Multiple thresholds for better detection
    };

    let observer = null;

    if (videoRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Set visibility based on higher intersection threshold for better detection
          const isNowVisible = entry.isIntersecting && entry.intersectionRatio > 0.5;
          setIsVisible(isNowVisible);
          
          if (isNowVisible && videoRef.current && isActive) {
            attemptedPlayRef.current = true;
            videoRef.current.play().catch(error => {
              console.log("Playback error:", error);
              // If autoplay was blocked, set up a click handler to play
              const handleUserInteraction = () => {
                if (videoRef.current) {
                  videoRef.current.play().catch(e => console.log("Play on interaction failed:", e));
                  document.removeEventListener('click', handleUserInteraction);
                }
              };
              document.addEventListener('click', handleUserInteraction, { once: true });
            });
            setIsPlaying(true);
          } else if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      }, options);
      
      observer.observe(videoRef.current);
      
      // Add loading event listeners
      const handleLoadStart = () => setIsLoading(true);
      const handleLoaded = () => setIsLoading(false);
      
      videoRef.current.addEventListener('loadstart', handleLoadStart);
      videoRef.current.addEventListener('loadeddata', handleLoaded);
      videoRef.current.addEventListener('canplay', handleLoaded);
      
      return () => {
        // Check if observer and video element still exist before cleanup
        if (observer) {
          if (videoRef.current) {
            observer.unobserve(videoRef.current);
            
            // Clean up event listeners
            videoRef.current.removeEventListener('loadstart', handleLoadStart);
            videoRef.current.removeEventListener('loadeddata', handleLoaded);
            videoRef.current.removeEventListener('canplay', handleLoaded);
          }
          
          // Disconnect the observer regardless
          observer.disconnect();
        }
      };
    }
  }, [isActive]);

  // Handle active state changes with forced play attempt
  useEffect(() => {
    if (isActive && isVisible && videoRef.current) {
      // Reset the attempted play flag when active state changes
      attemptedPlayRef.current = true;
      
      // Try to play the video
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Playback error on active change:", error);
          setIsPlaying(false);
        });
      }
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, isVisible]);

  // Force-check play state when video becomes active
  useEffect(() => {
    if (isActive && videoRef.current) {
      // Additional timeout to ensure the video plays after DOM updates
      const timer = setTimeout(() => {
        if (!isPlaying && attemptedPlayRef.current && videoRef.current) {
          videoRef.current.play().catch(e => console.log("Delayed play attempt failed:", e));
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, isPlaying]);

  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (!isActive) return; // Only allow play/pause if this card is active
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(e => console.log(e));
        setIsPlaying(true);
      }
    }
  };

  const videoSrc = video?.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-table-with-food-being-served-33999-large.mp4";
  const username = video?.username || "@snapshot_creator";
  const title = video?.title || "Check out this amazing video #trending";
  const likes = video?.likes || "45.2K";
  const comments = video?.comments || "215";

  return (
    <div className="relative h-full w-full max-w-md mx-auto bg-black overflow-hidden snap-start snap-always flex items-center justify-center">
      {/* Video Element */}
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onClick={togglePlay}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 to-pink-900/5 mix-blend-overlay z-10"></div>

      {/* Loading spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-10 h-10 border-2 border-t-transparent border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause Indicator - shows briefly when toggled */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute Button - Top Right */}
      <motion.button
        onClick={toggleMute}
        className="absolute top-4 right-4 rounded-full bg-black/30 backdrop-blur-sm z-20 p-2"
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {isMuted ? 
          <VolumeX className="w-4 h-4 text-white" /> : 
          <Volume2 className="w-4 h-4 text-white" />
        }
      </motion.button>

      {/* Controls and Info - Improved positioning to ensure visibility */}
      <div className="absolute bottom-4 sm:bottom-8 left-3 sm:left-4 right-14 sm:right-16 z-20 flex flex-col">
        {/* Username and title */}
        <div>
          <motion.h3 
            className="text-white font-semibold text-sm sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {username}
          </motion.h3>
          <motion.p 
            className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-2" 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {title}
          </motion.p>
        </div>
      </div>

      {/* Right Side Action Buttons - Adjusted position for better visibility */}
      <div className="absolute right-2 bottom-20 sm:bottom-24 flex flex-col items-center gap-5 z-20">
        {/* Like Button */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="bg-black/20 backdrop-blur-sm rounded-full p-2"
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} 
            />
          </motion.button>
          <span className="text-xs text-white mt-1">{likes}</span>
        </motion.div>
        
        {/* Comment Button */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button 
            className="bg-black/20 backdrop-blur-sm rounded-full p-2"
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </motion.button>
          <span className="text-xs text-white mt-1">{comments}</span>
        </motion.div>
        
        {/* Share Button */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button 
            className="bg-black/20 backdrop-blur-sm rounded-full p-2"
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
          <span className="text-xs text-white mt-1">Share</span>
        </motion.div>
        
        {/* Save Button */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="bg-black/20 backdrop-blur-sm rounded-full p-2"
            whileTap={{ scale: 0.9 }}
          >
            <BookmarkIcon 
              className={`w-5 h-5 ${isSaved ? "fill-purple-500 text-purple-500" : "text-white"}`}
            />
          </motion.button>
          <span className="text-xs text-white mt-1">Save</span>
        </motion.div>
      </div>

      {/* Active/inactive indicator - helpful for debugging */}
      {!isActive && (
        <div className="absolute top-4 left-4 z-30 hidden">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">Inactive</span>
        </div>
      )}
      
      {/* Custom styles to ensure proper sizing */}
      <style jsx>{`
        video {
          object-fit: contain;
          max-height: 100vh;
          max-width: 100vw;
        }
      `}</style>
    </div>
  );
};

export default ShortVideoCard;