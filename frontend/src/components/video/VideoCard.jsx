"use client"

import { useState, useRef, useEffect } from "react"
import { BookmarkIcon, Heart, MessageCircle, Share2, Music, Volume2, VolumeX, Loader } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoCard({ video = {}, onCommentClick, className = "" }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showCommentOverlay, setShowCommentOverlay] = useState(false)
  const [showShareOverlay, setShowShareOverlay] = useState(false)
  const videoRef = useRef(null)

  // Handle video visibility and playback with better threshold for smoother experience
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8 // Increased threshold for better visibility detection
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(error => console.log("Playback error:", error))
          setIsPlaying(true)
        } else if (videoRef.current) {
          videoRef.current.pause()
          setIsPlaying(false)
        }
      })
    }, options)

    if (videoRef.current) {
      observer.observe(videoRef.current)
      
      // Add loading event listeners
      videoRef.current.addEventListener('loadstart', () => setIsLoading(true))
      videoRef.current.addEventListener('loadeddata', () => setIsLoading(false))
      videoRef.current.addEventListener('canplay', () => setIsLoading(false))
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
        videoRef.current.removeEventListener('loadstart', () => setIsLoading(true))
        videoRef.current.removeEventListener('loadeddata', () => setIsLoading(false))
        videoRef.current.removeEventListener('canplay', () => setIsLoading(false))
      }
    }
  }, [])

  // Simulate video progress
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (videoRef.current) {
            return (videoRef.current.currentTime / videoRef.current.duration) * 100 || prev
          }
          return prev >= 100 ? 0 : prev + 0.5
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().catch(e => console.log(e))
        setIsPlaying(true)
      }
    }
  }

  const handleCommentClick = (e) => {
    e.stopPropagation(); // Prevent video play/pause
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
    setShowShareOverlay(true);
  }

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    setIsLiked(!isLiked);
  }

  const handleSaveClick = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    setIsSaved(!isSaved);
  }

  const videoSrc = video?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  const username = video?.username || "@motion.master"
  const title = video?.title || "Epic mountain biking adventure through the forest 🚵‍♂️🌲 #adventure"
  const hashtags = video?.hashtags || ["adventure", "mountainbiking", "outdoors"]

  return (
    <div className={`relative h-full w-full max-w-md mx-auto bg-black overflow-hidden snap-center ${className}`}>
      {/* Progress bar with animated gradient */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1.5 bg-black/20 z-30"
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
        muted 
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
              <Loader className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Overlay Filters with improved aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10"></div>
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
              className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute/Unmute Button with animations */}
      <motion.button
        onClick={toggleMute}
        className="absolute top-4 right-4 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-all duration-300 z-30 w-12 h-12 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Interaction Bar - Right Side with enhanced animations */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-7 z-20">
        <motion.div 
          className="flex flex-col items-center gap-1 group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.button
            className={`rounded-full ${
              isLiked ? "bg-pink-500/30 shadow-lg shadow-pink-500/20" : "bg-black/30 hover:bg-black/50"
            } backdrop-blur-md transition-all duration-300 w-14 h-14 flex items-center justify-center`}
            onClick={handleLikeClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isLiked ? (
                <motion.div
                  key="liked"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  <Heart
                    className="w-7 h-7 fill-pink-500 text-pink-500"
                  />
                </motion.div>
              ) : (
                <motion.div key="not-liked">
                  <Heart className="w-7 h-7 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.span 
            className={`text-sm font-medium ${isLiked ? "text-pink-400" : "text-white"} transition-colors`}
            animate={{ y: isLiked ? [0, -5, 0] : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLiked ? "23.5K" : "23.4K"}
          </motion.span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-1 group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-all duration-300 w-14 h-14 flex items-center justify-center"
            onClick={handleCommentClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.button>
          <span className="text-sm font-medium text-white">1.2K</span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-1 group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-all duration-300 w-14 h-14 flex items-center justify-center"
            onClick={handleShareClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-7 h-7 text-white" />
          </motion.button>
          <span className="text-sm font-medium text-white">Share</span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-1 group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className={`rounded-full ${
              isSaved ? "bg-purple-500/30 shadow-lg shadow-purple-500/20" : "bg-black/30 hover:bg-black/50"
            } backdrop-blur-md transition-all duration-300 w-14 h-14 flex items-center justify-center`}
            onClick={handleSaveClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isSaved ? (
                <motion.div
                  key="saved"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  <BookmarkIcon
                    className="w-7 h-7 fill-purple-500 text-purple-500"
                  />
                </motion.div>
              ) : (
                <motion.div key="not-saved">
                  <BookmarkIcon className="w-7 h-7 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <span className={`text-sm font-medium ${isSaved ? "text-purple-400" : "text-white"} transition-colors`}>
            Save
          </span>
        </motion.div>
      </div>

      {/* User Info and Video Details - Bottom with better animations and layout */}
      <motion.div 
        className="absolute left-4 right-20 bottom-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative group">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin-slow blur-sm opacity-70 group-hover:opacity-100"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            ></motion.div>
            <motion.div 
              className="w-12 h-12 border-2 border-white relative rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white text-sm font-bold">{username.substring(1, 3).toUpperCase()}</span>
            </motion.div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold">{username}</span>
            <span className="text-xs text-white/70">Pro Creator</span>
          </div>
          <motion.button
            className="ml-auto h-9 px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none shadow-lg shadow-purple-700/20 hover:shadow-purple-700/40 transition-all duration-300 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow
          </motion.button>
        </div>

        <motion.h3 
          className="text-white font-medium mb-3 text-base leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h3>

        <motion.div 
          className="flex flex-wrap gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {hashtags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="text-sm bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-medium hover:bg-white/20 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              #{typeof tag === 'string' ? tag : tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Music info with animated gradient */}
        <motion.div 
          className="flex items-center gap-2 mb-1 bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 w-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-6 h-6 flex-shrink-0">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            ></motion.div>
            <Music className="w-4 h-4 text-white absolute inset-0 m-auto" />
          </div>
          <div className="overflow-hidden max-w-[180px]">
            <p className="text-xs text-white whitespace-nowrap animate-marquee">
              Original Sound - Mountain Adventures • 4.2M views
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Comment Overlay */}
      <AnimatePresence>
        {showCommentOverlay && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-white font-semibold">Comments (1.2K)</h3>
              <motion.button 
                className="rounded-full p-2 bg-gray-800 text-white"
                onClick={() => setShowCommentOverlay(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {/* Sample comments - would be dynamic in real implementation */}
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div 
                  key={item}
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U{item}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium text-sm">user_{item*123}</p>
                      <span className="text-gray-500 text-xs">{item} hour{item > 1 ? 's' : ''} ago</span>
                    </div>
                    <p className="text-gray-300 text-sm">Amazing video! The scenery is breathtaking. I wish I could go there too!</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-800 bg-black/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ME</span>
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 px-2 font-medium"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Post
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Overlay */}
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
              className="bg-gray-900 rounded-xl p-5 w-[80%] max-w-xs"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-semibold text-center mb-4">Share to</h3>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                {['Instagram', 'Twitter', 'Facebook', 'WhatsApp', 'TikTok', 'Email', 'Link', 'More'].map((platform, index) => (
                  <motion.div 
                    key={platform}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-1 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{platform.charAt(0)}</span>
                    </div>
                    <span className="text-white text-xs">{platform}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.button 
                className="w-full py-2.5 rounded-full bg-gray-800 text-white font-medium"
                onClick={() => setShowShareOverlay(false)}
                whileHover={{ backgroundColor: "#374151" }}
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
      `}</style>
    </div>
  )
}
