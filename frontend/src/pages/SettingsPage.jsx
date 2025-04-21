import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Shield, Bell, Moon, Monitor, Lock, Eye, 
  HardDrive, LogOut, Save, Trash2, Globe, User, 
  Check, ChevronRight, AlertTriangle
} from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const settingsRef = useRef(null);

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [dataDownloaded, setDataDownloaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  // Handle settings save
  const handleSave = () => {
    // TODO: Implement API call to save settings
    console.log('Settings saved');
    setSaveSuccess(true);
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
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
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="pb-24 sm:pb-12 relative">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
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
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
      </div>

      {/* Fixed header that shows when scrolling */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            className="fixed top-0 inset-x-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-white/10"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <motion.button
                  onClick={() => navigate('/profile')}
                  className="mr-4 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={18} className="text-white" />
                </motion.button>
                <h2 className="text-lg font-semibold text-white">Settings</h2>
              </div>
              
              <motion.button
                onClick={handleSave}
                disabled={saveSuccess}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  saveSuccess 
                    ? 'bg-green-500/80 text-white' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
                } font-medium transition-colors shadow-lg border border-white/10`}
                whileHover={saveSuccess ? {} : { scale: 1.05 }}
                whileTap={saveSuccess ? {} : { scale: 0.95 }}
              >
                {saveSuccess ? (
                  <>
                    <Check size={18} />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        ref={settingsRef}
      >
        <div className="flex items-center justify-between mb-8">
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => navigate('/profile')}
              className="mr-4 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors shadow-md border border-gray-700/30"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="text-white" />
            </motion.button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Settings</h1>
          </motion.div>
          
          <motion.button
            onClick={handleSave}
            disabled={saveSuccess}
            className={`hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-lg ${
              saveSuccess 
                ? 'bg-green-500/80 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
            } font-medium transition-colors shadow-lg border border-white/10`}
            whileHover={saveSuccess ? {} : { scale: 1.05 }}
            whileTap={saveSuccess ? {} : { scale: 0.95 }}
            variants={itemVariants}
          >
            {saveSuccess ? (
              <>
                <Check size={18} />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </motion.button>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Settings Navigation - Enhanced with mobile friendly design */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            {/* Desktop Navigation */}
            <div className="hidden sm:block bg-[#121212]/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-800/50">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'account' 
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 shadow-md border border-purple-500/20' 
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <User size={18} />
                <span>Account</span>
                {activeTab === 'account' && (
                  <ChevronRight size={16} className="ml-auto text-purple-400" />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'privacy' 
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 shadow-md border border-purple-500/20' 
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Shield size={18} />
                <span>Privacy & Security</span>
                {activeTab === 'privacy' && (
                  <ChevronRight size={16} className="ml-auto text-purple-400" />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'notifications' 
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 shadow-md border border-purple-500/20' 
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Bell size={18} />
                <span>Notifications</span>
                {activeTab === 'notifications' && (
                  <ChevronRight size={16} className="ml-auto text-purple-400" />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'appearance' 
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 shadow-md border border-purple-500/20' 
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Monitor size={18} />
                <span>Appearance</span>
                {activeTab === 'appearance' && (
                  <ChevronRight size={16} className="ml-auto text-purple-400" />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('data')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'data' 
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 shadow-md border border-purple-500/20' 
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <HardDrive size={18} />
                <span>Your Data</span>
                {activeTab === 'data' && (
                  <ChevronRight size={16} className="ml-auto text-purple-400" />
                )}
              </button>
            </div>
            
            {/* Mobile Tab Navigation */}
            <div className="sm:hidden overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 pb-4">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                    activeTab === 'account' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                  }`}
                >
                  <User size={16} className="inline mr-2" />
                  Account
                </button>
                
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                    activeTab === 'privacy' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                  }`}
                >
                  <Shield size={16} className="inline mr-2" />
                  Privacy
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                    activeTab === 'notifications' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                  }`}
                >
                  <Bell size={16} className="inline mr-2" />
                  Alerts
                </button>
                
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                    activeTab === 'appearance' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                  }`}
                >
                  <Monitor size={16} className="inline mr-2" />
                  Display
                </button>
                
                <button
                  onClick={() => setActiveTab('data')}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                    activeTab === 'data' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                  }`}
                >
                  <HardDrive size={16} className="inline mr-2" />
                  Data
                </button>
              </div>
            </div>
            
            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(220, 38, 38, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex w-full mt-4 items-center justify-center space-x-2 py-3 px-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/20 backdrop-blur-sm shadow-lg"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </motion.button>
          </motion.div>
          
          {/* Settings Content */}
          <motion.div 
            className="lg:col-span-3"
            variants={itemVariants}
          >
            <div className="bg-[#121212]/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-800/50">
              <AnimatePresence mode="wait">
                {activeTab === 'account' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="account"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <User size={20} className="text-purple-400 mr-2" />
                      Account Settings
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Email</label>
                        <div className="flex items-center">
                          <input
                            type="email"
                            value="user@example.com"
                            readOnly
                            className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm text-white rounded-xl px-4 py-3 focus:outline-none border border-gray-700/50 hover:border-purple-500/30 transition-colors shadow-inner"
                          />
                          <div className="ml-2 p-1 rounded-full bg-green-500/20 border border-green-500/30">
                            <Check size={14} className="text-green-400" />
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">Verified email address</p>
                      </div>
                      
                      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/30 shadow-inner">
                        <label className="block text-white font-medium mb-3">Password</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="flex-1 text-gray-400 text-sm">
                            Last updated 2 months ago
                          </div>
                          <motion.button 
                            className="px-4 py-2 bg-gray-700/80 backdrop-blur-sm hover:bg-gray-600/80 text-white rounded-lg transition-colors border border-gray-600/50 flex items-center"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Lock size={16} className="mr-2 text-gray-300" />
                            Update Password
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800/70">
                        <h3 className="text-white font-medium mb-2 flex items-center">
                          <motion.div 
                            className="mr-2 text-yellow-500"
                            animate={{ rotate: [0, -10, 0, 10, 0] }}
                            transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
                          >
                            <AlertTriangle size={16} />
                          </motion.div>
                          Deactivate Account
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Temporarily disable your account. You can reactivate it anytime.
                        </p>
                        <motion.button 
                          className="px-4 py-2 bg-gray-700/80 backdrop-blur-sm hover:bg-gray-600/80 text-white rounded-lg transition-colors border border-gray-600/50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Deactivate Account
                        </motion.button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800/70">
                        <h3 className="text-red-400 font-medium mb-2 flex items-center">
                          <Trash2 size={16} className="mr-2 text-red-400" />
                          Delete Account
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Permanently delete your account and all your data. This action cannot be undone.
                        </p>
                        <motion.button 
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center space-x-2 border border-red-500/30"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowConfirmDialog(true)}
                        >
                          <Trash2 size={16} />
                          <span>Delete Account</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'privacy' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="privacy"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Shield size={20} className="text-purple-400 mr-2" />
                      Privacy & Security
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-inner">
                        <div>
                          <h3 className="text-white font-medium">Private Account</h3>
                          <p className="text-gray-400 text-sm">
                            When enabled, only approved followers can see your content.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={privateAccount}
                            onChange={() => setPrivateAccount(!privateAccount)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600 shadow-inner"></div>
                        </label>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-inner">
                        <div>
                          <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                          <p className="text-gray-400 text-sm">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={twoFactorAuth}
                            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600 shadow-inner"></div>
                        </label>
                      </div>
                      
                      <div className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 transition-all duration-300 shadow-inner">
                        <h3 className="text-white font-medium mb-3">Account Privacy</h3>
                        <div className="space-y-3">
                          <motion.div 
                            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700/30 transition-all"
                            whileHover={{ x: 5 }}
                          >
                            <input 
                              type="radio" 
                              id="public" 
                              name="privacy" 
                              className="text-purple-600 focus:ring-purple-500 bg-gray-700 border-gray-600" 
                              defaultChecked={!privateAccount}
                              onChange={() => setPrivateAccount(false)}
                            />
                            <label htmlFor="public" className="text-white cursor-pointer flex-1">
                              <div className="font-medium">Public</div>
                              <div className="text-gray-400 text-sm">Anyone can view your profile</div>
                            </label>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700/30 transition-all"
                            whileHover={{ x: 5 }}
                          >
                            <input 
                              type="radio" 
                              id="private" 
                              name="privacy" 
                              className="text-purple-600 focus:ring-purple-500 bg-gray-700 border-gray-600" 
                              defaultChecked={privateAccount}
                              onChange={() => setPrivateAccount(true)}
                            />
                            <label htmlFor="private" className="text-white cursor-pointer flex-1">
                              <div className="font-medium">Private</div>
                              <div className="text-gray-400 text-sm">Only approved followers can view</div>
                            </label>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800/70">
                        <h3 className="text-white font-medium mb-3">Login Activity</h3>
                        <motion.button 
                          className="px-4 py-2 bg-gray-700/80 backdrop-blur-sm hover:bg-gray-600/80 text-white rounded-lg transition-colors flex items-center space-x-2 border border-gray-600/50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Eye size={16} />
                          <span>View Login Activity</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'notifications' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="notifications"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Bell size={20} className="text-purple-400 mr-2" />
                      Notification Settings
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-inner">
                        <div>
                          <h3 className="text-white font-medium">Push Notifications</h3>
                          <p className="text-gray-400 text-sm">
                            Receive notifications when you're not using the app.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600 shadow-inner"></div>
                        </label>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800/70">
                        <h3 className="text-white font-medium mb-4">Email Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <span className="text-gray-300">New followers</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <span className="text-gray-300">Likes on your content</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <span className="text-gray-300">Comments on your content</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <span className="text-gray-300">New features and updates</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'appearance' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="appearance"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Monitor size={20} className="text-purple-400 mr-2" />
                      Appearance Settings
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-inner">
                        <div>
                          <h3 className="text-white font-medium">Dark Mode</h3>
                          <p className="text-gray-400 text-sm">
                            Use dark theme for SnapLoop interface.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600 shadow-inner"></div>
                        </label>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-inner">
                        <div>
                          <h3 className="text-white font-medium">Auto-play Videos</h3>
                          <p className="text-gray-400 text-sm">
                            Videos will play automatically when scrolling.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={autoplay}
                            onChange={() => setAutoplay(!autoplay)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600 shadow-inner"></div>
                        </label>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800/70">
                        <h3 className="text-white font-medium mb-3">Language</h3>
                        <div className="relative">
                          <select className="w-full bg-[#1A1A1A]/80 text-white rounded-lg px-4 py-3 focus:outline-none border border-gray-700/50 hover:border-purple-500/30 transition-colors appearance-none shadow-inner">
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Chinese (Simplified)</option>
                            <option>Japanese</option>
                          </select>
                          <ChevronRight size={16} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'data' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="data"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <HardDrive size={20} className="text-purple-400 mr-2" />
                      Your Data
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="p-5 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 transition-all duration: 300 shadow-inner">
                        <h3 className="text-white font-medium mb-3">Download Your Data</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Get a copy of all your SnapLoop data, including videos, comments, and account information.
                        </p>
                        <motion.button 
                          className={`px-5 py-2.5 ${
                            dataDownloaded ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-700/80 hover:bg-gray-600/80 text-white border-gray-600/50'
                          } rounded-lg transition-colors flex items-center space-x-2 border shadow-md`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDataDownloaded(true)}
                        >
                          <HardDrive size={16} className={dataDownloaded ? "text-green-400" : ""} />
                          <span>{dataDownloaded ? 'Download Ready' : 'Request Download'}</span>
                        </motion.button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800/70">
                        <h3 className="text-white font-medium mb-3">Data Sharing</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Control how your data is used and shared.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <span className="text-gray-300">Share usage data to improve SnapLoop</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <span className="text-gray-300">Personalized ads</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Mobile sticky actions bar */}
      <motion.div 
        className="sm:hidden fixed bottom-0 inset-x-0 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 py-3 px-4 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="flex justify-between items-center gap-4">
          <motion.button
            onClick={() => navigate('/profile')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gray-800/80 text-gray-400"
          >
            <ArrowLeft size={20} />
            <span className="text-xs mt-1">Back</span>
          </motion.button>
          
          <motion.button
            onClick={handleSave}
            disabled={saveSuccess}
            className={`flex-1 py-3 rounded-xl ${
              saveSuccess 
                ? 'bg-green-500/80 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
            } font-medium flex items-center justify-center shadow-lg`}
            whileHover={saveSuccess ? {} : { scale: 1.02 }}
            whileTap={saveSuccess ? {} : { scale: 0.98 }}
          >
            {saveSuccess ? (
              <>
                <Check size={18} className="mr-2" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                <span>Save Changes</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-400"
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Exit</span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmDialog(false)}
          >
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-6 w-full max-w-md border border-red-500/30 shadow-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start mb-4">
                <div className="mr-3 p-2 bg-red-500/20 rounded-full border border-red-500/30">
                  <AlertTriangle size={24} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Delete Account?</h3>
                  <p className="text-gray-400 mt-1 text-sm">This will permanently delete your account and all your data. This action cannot be undone.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.button
                  className="py-2.5 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors border border-gray-600/50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  className="py-2.5 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Delete Account
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage;