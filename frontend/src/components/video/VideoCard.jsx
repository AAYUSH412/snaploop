"use client"

import { useState, useRef, useEffect } from "react"
import { BookmarkIcon, Heart, MessageCircle, Share2, Music, Volume2, VolumeX, Loader } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoCard({ video = {}, onCommentClick, className = "", isActive = false }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showCommentOverlay, setShowCommentOverlay] = useState(false)
  const [showShareOverlay, setShowShareOverlay] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef(null)
  const attemptedPlayRef = useRef(false)

  // Handle video visibility and playback with improved threshold
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5, 0.75, 0.9] // Multiple thresholds for better visibility detection
    }

    let observer = null;
    
    // Create observer only if we have a valid video element
    if (videoRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Set visibility based on intersection
          const isNowVisible = entry.isIntersecting && entry.intersectionRatio > 0.5;
          setIsVisible(isNowVisible);
          
          // Only play if this is the active card and it's in view
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
            
            // Also clean up the event listeners
            videoRef.current.removeEventListener('loadstart', handleLoadStart);
            videoRef.current.removeEventListener('loadeddata', handleLoaded);
            videoRef.current.removeEventListener('canplay', handleLoaded);
          }
          
          // Disconnect the observer regardless
          observer.disconnect();
        }
      }
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

  // Update video progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (videoRef.current) {
            return (videoRef.current.currentTime / videoRef.current.duration) * 100 || prev;
          }
          return prev >= 100 ? 0 : prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  }

  const togglePlay = () => {
    if (!isActive) return; // Only allow play/pause if active
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(e => console.log(e));
        setIsPlaying(true);
      }
    }
  }

  const handleCommentClick = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (!isActive) return; // Only show comments if active
    
    if (onCommentClick) {
      onCommentClick(video);
    } else {
      setShowCommentOverlay(true);
      // Pause video when showing comments
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }

  const handleShareClick = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (!isActive) return; // Only show share if active
    setShowShareOverlay(true);
  }

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (!isActive) return; // Only allow like if active
    setIsLiked(!isLiked);
  }

  const handleSaveClick = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (!isActive) return; // Only allow save if active
    setIsSaved(!isSaved);
  }

  const videoSrc = video?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  const username = video?.username || "@motion.master"
  const title = video?.title || "Epic mountain biking adventure through the forest 🚵‍♂️🌲 #adventure"
  const hashtags = video?.hashtags || ["adventure", "mountainbiking", "outdoors"]
  const likes = isLiked ? (parseFloat(video?.likes || "23.4") + 0.1).toFixed(1) + "K" : video?.likes || "23.4K"
  const comments = video?.comments || "1.2K"

  return (
    <div className={`relative h-full w-full max-w-md mx-auto bg-black overflow-hidden snap-center ${className}`} data-video-card={true}>
      {/* Progress bar with animated gradient */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 background-animate" 
          style={{ width: `${progress}%` }} 
        />
      </motion.div>

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
        <source
          src={videoSrc}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Overlay Gradients - Improved for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-pink-900/10 mix-blend-overlay z-10"></div>

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

      {/* Mute/Unmute Button - More compact for mobile */}
      <motion.button
        onClick={toggleMute}
        className="absolute top-4 right-4 rounded-full bg-black/30 backdrop-blur-sm p-2 z-30"
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX className="w-4 h-4 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Interaction Bar - Right Side with more compact buttons for mobile */}
      <div className="absolute right-2 bottom-24 sm:bottom-32 flex flex-col items-center gap-5 z-20">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className={`rounded-full ${
              isLiked ? "bg-black/20 text-pink-500" : "bg-black/20 text-white"
            } backdrop-blur-sm p-2`}
            onClick={handleLikeClick}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isLiked ? (
                <motion.div
                  key="liked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                </motion.div>
              ) : (
                <motion.div key="not-liked">
                  <Heart className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.span 
            className={`text-xs font-medium ${isLiked ? "text-pink-400" : "text-white"} mt-1`}
            animate={{ y: isLiked ? [0, -5, 0] : 0 }}
            transition={{ duration: 0.3 }}
          >
            {likes}
          </motion.span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="rounded-full bg-black/20 backdrop-blur-sm p-2"
            onClick={handleCommentClick}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </motion.button>
          <span className="text-xs font-medium text-white mt-1">{comments}</span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="rounded-full bg-black/20 backdrop-blur-sm p-2"
            onClick={handleShareClick}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
          <span className="text-xs font-medium text-white mt-1">Share</span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className={`rounded-full bg-black/20 backdrop-blur-sm p-2 ${
              isSaved ? "text-purple-500" : "text-white"
            }`}
            onClick={handleSaveClick}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isSaved ? (
                <motion.div
                  key="saved"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookmarkIcon className="w-5 h-5 fill-purple-500 text-purple-500" />
                </motion.div>
              ) : (
                <motion.div key="not-saved">
                  <BookmarkIcon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <span className={`text-xs font-medium ${isSaved ? "text-purple-400" : "text-white"} mt-1`}>
            Save
          </span>
        </motion.div>
      </div>

      {/* User Info and Video Details - Bottom with better layout for mobile */}
      <motion.div 
        className="absolute left-3 right-14 bottom-6 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="relative group">
            <motion.div 
              className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            ></motion.div>
            <motion.div 
              className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white relative rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white text-xs font-bold">{username.substring(1, 3).toUpperCase()}</span>
            </motion.div>
          </div>
          <div className="flex items-center justify-between flex-1">
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold">{username}</span>
              <span className="text-xs text-white/70">Pro Creator</span>
            </div>
            <motion.button
              className="h-7 px-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none shadow-md rounded-full text-xs font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Follow
            </motion.button>
          </div>
        </div>

        <motion.h3 
          className="text-white font-medium mb-2 text-sm sm:text-base line-clamp-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h3>

        <motion.div 
          className="flex flex-wrap gap-1.5 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {hashtags.slice(0, 3).map((tag, index) => (
            <motion.span 
              key={index} 
              className="text-xs bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-white font-medium transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              whileTap={{ scale: 0.95 }}
            >
              #{typeof tag === 'string' ? tag : tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Music info - more compact for mobile */}
        <motion.div 
          className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 w-fit"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-4 h-4 flex-shrink-0">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            ></motion.div>
            <Music className="w-3 h-3 text-white absolute inset-0 m-auto" />
          </div>
          <div className="overflow-hidden max-w-[120px]">
            <p className="text-[10px] text-white whitespace-nowrap animate-marquee">
              Original Sound • 4.2M views
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Comment Overlay - More mobile friendly */}
      <AnimatePresence>
        {showCommentOverlay && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-800">
              <h3 className="text-white font-semibold text-sm">Comments ({comments})</h3>
              <motion.button 
                className="rounded-full p-1.5 bg-gray-800 text-white"
                onClick={() => setShowCommentOverlay(false)}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-3 space-y-3">
              {/* Sample comments */}
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div 
                  key={item}
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U{item}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-medium text-xs">user_{item*123}</p>
                      <span className="text-gray-500 text-[10px]">{item} hr</span>
                    </div>
                    <p className="text-gray-300 text-xs">Amazing video! The scenery is breathtaking. I wish I could go there too!</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-800 bg-black/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ME</span>
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-full py-1.5 px-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <motion.button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 px-1.5 font-medium text-xs"
                    whileTap={{ scale: 0.9 }}
                  >
                    Post
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Overlay - More compact for mobile */}
      <AnimatePresence>
        {showShareOverlay && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareOverlay(false)}
          >
            <motion.div 
              className="bg-gray-900 rounded-xl p-4 w-[85%] max-w-xs"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-semibold text-center mb-3 text-sm">Share to</h3>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                {['Instagram', 'Twitter', 'Facebook', 'WhatsApp', 'TikTok', 'Email', 'Link', 'More'].map((platform, index) => (
                  <motion.div 
                    key={platform}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-1 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{platform.charAt(0)}</span>
                    </div>
                    <span className="text-white text-[10px]">{platform}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.button 
                className="w-full py-2 rounded-full bg-gray-800 text-white font-medium text-sm"
                onClick={() => setShowShareOverlay(false)}
                whileTap={{ scale: 0.97 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add a style tag for custom animation */}
      <style jsx>{`
        .background-animate {
          background-size: 200%;
          animation: AnimateGradient 3s ease infinite;
        }
        
        @keyframes AnimateGradient {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        .animate-marquee {
          animation: Marquee 8s linear infinite;
        }
        
        @keyframes Marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
