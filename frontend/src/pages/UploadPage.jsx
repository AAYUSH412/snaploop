import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, X, Play, Pause, Hash, Info, 
  Check, AlertTriangle, Sparkles, Camera, 
  ArrowRight, CheckCircle, Clock
} from 'lucide-react';
import { suggestedTags } from '../mock'; // Import from centralized mock data

const UploadPage = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState(null); // null, 'uploading', 'success', 'error'
  const [errors, setErrors] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [activeTip, setActiveTip] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip(prev => (prev + 1) % 4);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.includes('video/')) {
        setErrors({ file: 'Please select a valid video file' });
        return;
      }
      
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setErrors({ file: 'File size exceeds 50MB limit' });
        return;
      }
      
      setFileSelected(true);
      setErrors({});
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!fileSelected) newErrors.file = 'Please select a video file';
    if (!title.trim()) newErrors.title = 'Title is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Mock upload process
    setUploadState('uploading');
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('success');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  }
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('video/')) {
      setFileSelected(true);
      setErrors({});
    } else {
      setErrors({ file: 'Please select a valid video file' });
    }
  };
  
  // Handle file removal
  const removeFile = () => {
    setFileSelected(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Toggle play/pause in preview
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  
  const addHashtag = (tag) => {
    const currentTags = hashtags.split(' ').filter(t => t !== '');
    if (!currentTags.includes(tag)) {
      setHashtags(prev => prev ? `${prev} ${tag}` : tag);
    }
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const radioVariants = {
    unchecked: { scale: 0.8 },
    checked: { 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  return (
    <div className="pb-12 relative">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl animate-pulse" 
          style={{ animationDelay: "1s", transform: `translateY(${scrollY * -0.01}px)` }}
        ></motion.div>
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="max-w-7xl mx-auto px-4"
      >
        {/* Page Header with Animation */}
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex items-center mb-2">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera size={20} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Upload New Video</h1>
          </div>
          <p className="text-gray-300 ml-14">Share your creative moments with the SnapLoop community</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Upload Form */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="bg-[#121212]/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/5">
              {/* File Upload Section */}
              <div className="mb-8">
                <motion.label 
                  className="block text-white text-lg font-medium mb-3 flex items-center"
                  variants={itemVariants}
                >
                  <Sparkles size={16} className="text-purple-400 mr-2" />
                  Video File
                </motion.label>
                
                {!fileSelected ? (
                  <motion.div 
                    className={`border-2 border-dashed ${
                      errors.file 
                        ? 'border-red-500'
                        : isDragging 
                          ? 'border-purple-500 bg-purple-500/10' 
                          : 'border-gray-600 hover:border-purple-500/70 hover:bg-purple-500/5'
                    } rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    variants={itemVariants}
                  >
                    <input 
                      type="file"
                      ref={fileInputRef}
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Upload size={48} className="text-purple-400 mb-5" />
                    </motion.div>
                    
                    <h3 className="text-white font-medium text-lg mb-2">Drag and drop your video here</h3>
                    <p className="text-gray-400 text-center mb-5">MP4, WebM or MOV files up to 50MB</p>
                    
                    <motion.button
                      type="button"
                      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-7 py-3 rounded-lg transition-colors shadow-lg shadow-purple-900/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Select Video File
                    </motion.button>
                    
                    {errors.file && (
                      <motion.div 
                        className="flex items-center space-x-2 mt-4 text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertTriangle size={16} />
                        <span>{errors.file}</span>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Video Preview */}
                    <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden shadow-lg border border-white/10">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-500/10"
                        animate={{ 
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      ></motion.div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <video 
                          ref={videoRef} 
                          className="absolute inset-0 w-full h-full object-contain opacity-80"
                          loop
                        >
                          {/* Could use an actual preview here */}
                        </video>
                      
                        <div className="relative z-10 text-center">
                          <p className="text-white font-medium mb-4">video_preview.mp4</p>
                          
                          <motion.button 
                            type="button"
                            onClick={togglePlay}
                            className="bg-white text-purple-600 hover:bg-gray-100 rounded-full p-4 transition-colors shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                          </motion.button>
                        </div>
                      </div>
                      
                      <motion.button 
                        type="button" 
                        className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                        onClick={removeFile}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Video Details */}
              <div className="space-y-6">
                {/* Title */}
                <motion.div variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="title" className="block text-white font-medium">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <span className="text-gray-400 text-sm">{title.length}/100</span>
                  </div>
                  
                  <motion.input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                      errors.title ? 'border-red-500' : 'border-gray-700/60'
                    } transition-colors`}
                    placeholder="Add a title that describes your video"
                    maxLength={100}
                    whileFocus={{ scale: 1.005 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {errors.title && (
                    <motion.div 
                      className="flex items-center space-x-1 mt-2 text-red-400 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertTriangle size={14} />
                      <span>{errors.title}</span>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Description */}
                <motion.div variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="description" className="block text-white font-medium">
                      Description
                    </label>
                    <span className="text-gray-400 text-sm">{description.length}/500</span>
                  </div>
                  
                  <motion.textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/60 min-h-28 transition-colors"
                    placeholder="Tell viewers about your video"
                    maxLength={500}
                    whileFocus={{ scale: 1.005 }}
                    transition={{ duration: 0.2 }}
                  ></motion.textarea>
                </motion.div>
                
                {/* Hashtags */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="hashtags" className="block text-white font-medium mb-2">
                    Hashtags
                  </label>
                  <div className="relative">
                    <Hash size={18} className="absolute left-3 top-3.5 text-purple-400" />
                    <motion.input
                      type="text"
                      id="hashtags"
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/60 transition-colors"
                      placeholder="Add hashtags to help people find your video"
                      whileFocus={{ scale: 1.005 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <p className="text-gray-400 text-sm w-full mb-1">Suggested Tags:</p>
                    {suggestedTags.map(tag => (
                      <motion.button
                        key={tag}
                        type="button"
                        onClick={() => addHashtag(tag)}
                        className="bg-[#1A1A1A]/60 hover:bg-purple-500/20 text-gray-300 hover:text-white text-sm px-3 py-1 rounded-full transition-colors border border-gray-700/60 hover:border-purple-500/50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        #{tag}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
                
                {/* Visibility */}
                <motion.div variants={itemVariants}>
                  <label className="block text-white font-medium mb-3">
                    Visibility
                  </label>
                  <div className="space-y-3">
                    <motion.label 
                      className={`flex items-center space-x-3 p-4 rounded-lg ${
                        visibility === 'public' 
                          ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30' 
                          : 'bg-[#1A1A1A]/60 hover:bg-[#252525]/60'
                      } backdrop-blur-sm border border-gray-700/60 cursor-pointer transition-colors`}
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                    >
                      <motion.div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          visibility === 'public'
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-500'
                        }`}
                        variants={radioVariants}
                        animate={visibility === 'public' ? "checked" : "unchecked"}
                      >
                        {visibility === 'public' && <Check size={12} className="text-white" />}
                      </motion.div>
                      
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={visibility === 'public'}
                        onChange={() => setVisibility('public')}
                        className="hidden"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="block text-white font-medium">Public</span>
                          <motion.div 
                            className="ml-2 px-2 py-0.5 bg-green-500/20 rounded text-xs text-green-400 font-medium"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                          >
                            Recommended
                          </motion.div>
                        </div>
                        <span className="block text-gray-400 text-sm mt-1">Anyone can see this video</span>
                      </div>
                    </motion.label>
                    
                    <motion.label 
                      className={`flex items-center space-x-3 p-4 rounded-lg ${
                        visibility === 'unlisted' 
                          ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30' 
                          : 'bg-[#1A1A1A]/60 hover:bg-[#252525]/60'
                      } backdrop-blur-sm border border-gray-700/60 cursor-pointer transition-colors`}
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                    >
                      <motion.div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          visibility === 'unlisted'
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-500'
                        }`}
                        variants={radioVariants}
                        animate={visibility === 'unlisted' ? "checked" : "unchecked"}
                      >
                        {visibility === 'unlisted' && <Check size={12} className="text-white" />}
                      </motion.div>
                      
                      <input
                        type="radio"
                        name="visibility"
                        value="unlisted"
                        checked={visibility === 'unlisted'}
                        onChange={() => setVisibility('unlisted')}
                        className="hidden"
                      />
                      
                      <div className="flex-1">
                        <span className="block text-white font-medium">Unlisted</span>
                        <span className="block text-gray-400 text-sm mt-1">Only people with the link can see this video</span>
                      </div>
                    </motion.label>
                  </div>
                </motion.div>
              </div>
            </form>
          </motion.div>
          
          {/* Right Side - Upload Info & Submit Button */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <motion.div 
              className="mb-6 bg-[#121212]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-500">
                <div className="bg-[#121212]/30 backdrop-blur-sm rounded p-1">
                  <div className="flex items-center space-x-2 px-3 py-1 text-sm">
                    <span className="h-2 w-2 bg-blue-400 rounded-full"></span>
                    <span className="text-white font-medium">Creator Pro Tips</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-5">
                  <Sparkles size={18} className="text-purple-400" />
                  <h2 className="text-lg font-medium text-white">Upload Tips</h2>
                </div>
                
                <div className="relative min-h-[180px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`tip-${activeTip}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-500/20 p-2 rounded-lg">
                          {activeTip === 0 && <Camera size={20} className="text-purple-400" />}
                          {activeTip === 1 && <Clock size={20} className="text-purple-400" />}
                          {activeTip === 2 && <Hash size={20} className="text-purple-400" />}
                          {activeTip === 3 && <CheckCircle size={20} className="text-purple-400" />}
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">
                            {activeTip === 0 && "Quality Matters"}
                            {activeTip === 1 && "Optimal Duration"}
                            {activeTip === 2 && "Use Smart Tags"}
                            {activeTip === 3 && "Content Rights"}
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {activeTip === 0 && "Use high-resolution videos for better engagement. Shoot in good lighting for professional results."}
                            {activeTip === 1 && "Keep your videos between 15-60 seconds for optimal engagement and higher completion rates."}
                            {activeTip === 2 && "Add relevant hashtags to help your content get discovered by the right audience."}
                            {activeTip === 3 && "Ensure you have rights to all content in your video including music, footage, and images."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Dots indicator */}
                <div className="flex justify-center space-x-1 mt-6">
                  {[0, 1, 2, 3].map(index => (
                    <button
                      key={index}
                      onClick={() => setActiveTip(index)}
                      className="focus:outline-none"
                      aria-label={`Tip ${index + 1}`}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${activeTip === index ? 'bg-purple-500' : 'bg-gray-600'}`}
                        animate={{ scale: activeTip === index ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Submit Button & Progress */}
            <motion.div 
              className="bg-[#121212]/90 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute inset-0 -z-10">
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
              </div>
              
              <AnimatePresence mode="wait">
                {uploadState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-4"
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Check size={36} className="text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">Upload Successful!</h3>
                    <p className="text-gray-300 mb-8">Your video is now processing and will be available shortly</p>
                    
                    <motion.button
                      type="button"
                      onClick={() => {
                        // Reset form
                        setFileSelected(false);
                        setTitle('');
                        setDescription('');
                        setHashtags('');
                        setUploadState(null);
                        setUploadProgress(0);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors shadow-lg shadow-purple-900/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center">
                        <Upload size={20} className="mr-2" />
                        <span>Upload Another Video</span>
                      </div>
                    </motion.button>
                  </motion.div>
                ) : uploadState === 'uploading' ? (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-medium text-white mb-6">Uploading Video...</h3>
                    
                    <div className="w-full bg-gray-700/50 rounded-full h-3 mb-3 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm mb-6">
                      <div>
                        <span className="text-purple-400 font-medium">{uploadProgress}%</span>
                        <span className="text-gray-400"> Complete</span>
                      </div>
                      <span className="text-gray-400">Please don't close this page</span>
                    </div>
                    
                    <div className="mt-8 bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 flex items-center">
                      <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                        <Clock size={20} className="text-purple-400" />
                      </div>
                      <div className="text-sm">
                        <p className="text-white font-medium">Processing Time</p>
                        <p className="text-gray-400">Your video will be available to view shortly after upload completes</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!fileSelected || !title.trim()}
                      className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center ${
                        fileSelected && title.trim()
                          ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-900/20'
                          : 'bg-gray-700/70 text-gray-400 cursor-not-allowed'
                      } transition-all`}
                      whileHover={fileSelected && title.trim() ? { scale: 1.03 } : {}}
                      whileTap={fileSelected && title.trim() ? { scale: 0.97 } : {}}
                    >
                      <Upload size={20} className="mr-2" />
                      <span>Upload Video</span>
                    </motion.button>
                    
                    <div className="mt-6 pt-5 border-t border-gray-800/50">
                      <div className="flex items-center space-x-3 bg-blue-900/10 border border-blue-500/20 rounded-lg p-4">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotateZ: [0, 10, 0, -10, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                          className="flex-shrink-0"
                        >
                          <Info size={20} className="text-blue-400" />
                        </motion.div>
                        <p className="text-blue-100 text-sm">
                          By uploading, you agree to our <span className="text-blue-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-400 hover:underline cursor-pointer">Community Guidelines</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-6 space-x-1">
                      <span className="text-gray-500 text-sm">Need help?</span>
                      <motion.button 
                        className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                        whileHover={{ scale: 1.03 }}
                      >
                        <span>View upload guide</span>
                        <ArrowRight size={14} className="ml-1" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;