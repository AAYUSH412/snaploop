import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Check, Globe, MapPin, AtSign, User, AlertCircle, Loader2, ChevronLeft, Sparkles } from 'lucide-react';
import { userData } from '../mock';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: userData.displayName,
    username: userData.username,
    bio: userData.bio,
    website: userData.website,
    location: userData.location
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('profile'); // 'profile' or 'appearance'
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef(null);
  
  // Track scroll position for floating header effect
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrolled(position > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file uploads
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'avatar') {
        setAvatar(URL.createObjectURL(file));
      } else {
        setCoverImage(URL.createObjectURL(file));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.displayName.trim()) newErrors.displayName = 'Display name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);
      
      // Reset success state and navigate after a short delay
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/profile');
      }, 1500);
    }, 800);
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
  };

  return (
    <div className="pb-24 sm:pb-12 relative min-h-screen">
      {/* Background elements - Enhanced with more subtle animated gradients */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-[#0A0A0A] to-gray-900"></div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
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
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </div>
      
      {/* Fixed header that appears when scrolling */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            className="fixed top-0 inset-x-0 z-30 py-3 px-4 sm:px-6 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-gray-800/50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => navigate('/profile')}
                  className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={18} className="text-white" />
                </motion.button>
                <h2 className="text-lg font-semibold text-white">Edit Profile</h2>
              </div>
              
              <motion.button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-1 shadow-lg ${
                  isLoading ? 'bg-gray-700 text-gray-300' : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                }`}
                whileHover={!isLoading ? { scale: 1.03 } : {}}
                whileTap={!isLoading ? { scale: 0.97 } : {}}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-1" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} className="mr-1" />
                    <span>Save</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header with navigation and save button */}
        <div className="flex items-center justify-between py-6 mb-6">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              onClick={() => navigate('/profile')}
              className="mr-4 p-2 rounded-full bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 transition-colors shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={18} className="text-white" />
            </motion.button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Edit Profile</h1>
          </motion.div>
          
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg ${
              isLoading ? 'bg-gray-700 text-gray-300' : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-purple-900/20'
            }`}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Saving...</span>
              </div>
            ) : saveSuccess ? (
              <div className="flex items-center">
                <Check size={18} className="mr-1 text-green-300" />
                <span>Saved!</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Check size={18} className="mr-1" />
                <span>Save Changes</span>
              </div>
            )}
          </motion.button>
        </div>
        
        {/* Section tabs - Profile/Appearance */}
        <motion.div 
          className="flex space-x-2 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'profile' 
                ? 'bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-white border border-purple-500/30' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-800'
            }`}
          >
            <span>Profile Info</span>
          </button>
          
          <button
            onClick={() => setActiveSection('appearance')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'appearance' 
                ? 'bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-white border border-purple-500/30' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-800'
            }`}
          >
            <span>Appearance</span>
          </button>
        </motion.div>
        
        {/* Media edit section with glass effect */}
        <AnimatePresence mode="wait">
        {activeSection === 'profile' ? (
          <motion.div 
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden shadow-lg mb-8 border border-white/10 backdrop-blur-sm transition-all hover:border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ boxShadow: "0 10px 30px -15px rgba(138, 92, 246, 0.2)" }}
            >
              {/* Cover Image Section */}
              <div className="h-40 sm:h-56 md:h-64 bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-blue-500/40 relative overflow-hidden">
                {coverImage ? (
                  <motion.img 
                    src={coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <motion.div 
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"
                    initial={{ scale: 1.05 }}
                    animate={{ 
                      scale: [1.05, 1.08, 1.05],
                      opacity: [0.4, 0.45, 0.4] 
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  ></motion.div>
                )}
                
                {/* Gradient Overlay - Enhanced */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/90"></div>
                
                {/* Upload overlay with enhanced interaction */}
                <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 transition-opacity group flex items-center justify-center hover:bg-black/30">
                  <motion.div
                    initial={{ opacity: 0.7, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                  >
                    <motion.label 
                      className="cursor-pointer p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all backdrop-blur-sm border border-white/20 sm:border-white/30 group/btn inline-block shadow-xl"
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.3)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'cover')}
                      />
                      <Camera size={24} className="text-white group-hover/btn:text-purple-300 transition-colors" />
                    </motion.label>
                    <motion.p 
                      className="text-white/70 mt-3 text-sm backdrop-blur-sm px-3 py-1 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0 }} 
                      whileHover={{ opacity: 1 }}
                    >
                      Change cover image
                    </motion.p>
                  </motion.div>
                </div>
              </div>
              
              {/* Avatar Edit Section - With improved styling */}
              <div className="px-6 py-5 relative">
                <motion.div 
                  className="absolute -top-16 sm:-top-20 left-6 w-28 sm:w-32 h-28 sm:h-32 rounded-full p-[3px] group overflow-hidden"
                  style={{
                    background: "linear-gradient(120deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.7))"
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0px 0px 25px rgba(139, 92, 246, 0.5)" 
                  }}
                >
                  <div className="relative w-full h-full bg-gray-900 p-1 rounded-full overflow-hidden">
                    {avatar ? (
                      <motion.img 
                        src={avatar} 
                        alt="Avatar" 
                        className="w-full h-full rounded-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">
                          {userData.displayName.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-full cursor-pointer backdrop-blur-sm">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'avatar')}
                      />
                      <div className="flex flex-col items-center">
                        <Camera size={24} className="text-white mb-1" />
                        <span className="text-xs text-white/80 font-medium">Upload</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              ref={formRef}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-[#121212]/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl space-y-7 border border-white/10"
                variants={itemVariants}
              >
                {/* Form title with sparkle effect */}
                <div className="flex items-center mb-2">
                  <motion.div 
                    className="mr-3 p-2 rounded-full bg-purple-500/20"
                    whileHover={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles size={20} className="text-purple-400" />
                  </motion.div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Personal Information</h2>
                </div>
                
                {/* Display Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="displayName" className="block text-white font-medium mb-2 flex items-center">
                    <User size={16} className="mr-2 text-purple-400" />
                    Display Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className={`w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                        errors.displayName ? 'border-red-500' : 'border-gray-700/50'
                      } transition-all hover:border-gray-600 focus:scale-[1.01]`}
                      placeholder="Your display name"
                    />
                    {errors.displayName && (
                      <motion.div 
                        className="flex items-center space-x-1 mt-2 text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertCircle size={14} />
                        <span>{errors.displayName}</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                
                {/* Username - with @ symbol for better visual cue */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="username" className="block text-white font-medium mb-2 flex items-center">
                    <AtSign size={16} className="mr-2 text-blue-400" />
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-400">@</span>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username.replace('@', '')}
                      onChange={handleChange}
                      className={`w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                        errors.username ? 'border-red-500' : 'border-gray-700/50'
                      } transition-all hover:border-gray-600 focus:scale-[1.01]`}
                      placeholder="username"
                    />
                  </div>
                  {errors.username && (
                    <motion.div 
                      className="flex items-center space-x-1 mt-2 text-red-400 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle size={14} />
                      <span>{errors.username}</span>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Bio - with dynamic character count */}
                <motion.div variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="bio" className="block text-white font-medium flex items-center">
                      <User size={16} className="mr-2 text-green-400" />
                      Bio
                    </label>
                    <span className={`text-xs flex items-center px-2 py-1 rounded-full ${
                      formData.bio.length >= 150 
                        ? 'text-amber-400 bg-amber-900/20' 
                        : 'text-gray-400 bg-gray-800/50'
                    }`}>
                      {formData.bio.length}/160
                    </span>
                  </div>
                  <motion.textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50 min-h-[120px] resize-none transition-all hover:border-gray-600 focus:scale-[1.01]"
                    placeholder="Tell the world about yourself"
                    maxLength={160}
                  />
                </motion.div>
                
                {/* Website */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="website" className="block text-white font-medium mb-2 flex items-center">
                    <Globe size={16} className="mr-2 text-cyan-400" />
                    Website
                  </label>
                  <motion.input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50 transition-all hover:border-gray-600 focus:scale-[1.01]"
                    placeholder="https://example.com"
                  />
                </motion.div>
                
                {/* Location */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="location" className="block text-white font-medium mb-2 flex items-center">
                    <MapPin size={16} className="mr-2 text-red-400" />
                    Location
                  </label>
                  <motion.input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50 transition-all hover:border-gray-600 focus:scale-[1.01]"
                    placeholder="City, Country"
                  />
                </motion.div>
              </motion.div>
              
              {/* Improved Mobile Submit Button with Interactive Effects */}
              <motion.div
                className="pt-6 sm:hidden"
                variants={itemVariants}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center ${
                    isLoading || saveSuccess
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-900/20'
                  } transition-all`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving Changes...</span>
                    </div>
                  ) : saveSuccess ? (
                    <div className="flex items-center">
                      <Check size={20} className="mr-2 text-green-400" />
                      <span>Profile Saved!</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check size={20} className="mr-2" />
                      <span>Save Profile</span>
                    </div>
                  )}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        ) : (
          <motion.div 
            key="appearance"
            className="bg-[#121212]/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="py-8">
              <motion.div 
                className="w-16 h-16 bg-gray-800/80 rounded-full mx-auto mb-4 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Sparkles size={24} className="text-purple-400" />
              </motion.div>
              <h3 className="text-lg font-medium text-white mb-2">Appearance settings coming soon</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We're working on letting you customize your profile's appearance, themes, and layout. Stay tuned!
              </p>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
        
        {/* Enhanced Feedback Toast */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div 
              className="fixed bottom-5 right-5 bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white px-5 py-4 rounded-xl shadow-lg border border-green-400/50 backdrop-blur-sm z-50 flex items-center"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <div className="mr-3 bg-white/20 p-1.5 rounded-full">
                <Check size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium">Profile updated!</h4>
                <p className="text-xs text-white/80">Changes saved successfully</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditProfilePage;