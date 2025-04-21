import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Upload, User, Menu, X, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(() => {
    const savedState = localStorage.getItem('sidebarExpanded');
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isPermanentlyExpanded, setIsPermanentlyExpanded] = useState(() => {
    const savedState = localStorage.getItem('sidebarPermanent');
    return savedState ? JSON.parse(savedState) : false;
  });
  const location = useLocation();

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));
    localStorage.setItem('sidebarPermanent', JSON.stringify(isPermanentlyExpanded));
  }, [isExpanded, isPermanentlyExpanded]);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (!isPermanentlyExpanded) {
      setIsExpanded(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isPermanentlyExpanded) {
      setIsExpanded(false);
    }
  };
  
  const togglePermanentExpand = () => {
    setIsPermanentlyExpanded(!isPermanentlyExpanded);
    setIsExpanded(!isPermanentlyExpanded);
  };

  const navItems = [
    { 
      path: '/', 
      icon: <Home />, 
      label: 'Home',
      exact: true 
    },
    { 
      path: '/explore', 
      icon: <Compass />, 
      label: 'Explore' 
    },
    { 
      path: '/upload', 
      icon: <Upload />, 
      label: 'Upload' 
    },
    { 
      path: '/profile', 
      icon: <User />, 
      label: 'Profile' 
    },
    { 
      path: '/feed', 
      icon: <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="flex items-center justify-center"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
          <img src="/logo.png" alt="SnapLoop" className="w-9 h-8 object-contain border rounded-4xl" />
        </div>
      </motion.div>, 
      label: 'Shorts' 
    },
  ];

  // Sidebar variants for animation
  const sidebarVariants = {
    hidden: { x: -70, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    expanded: {
      width: "200px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 36
      }
    },
    collapsed: {
      width: "76px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 36
      }
    }
  };

  // Mobile sidebar variants
  const mobileSidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div 
        className="fixed left-0 top-0 h-full hidden md:flex flex-col items-center bg-[#121212]/95 border-r border-gray-800/50 z-50 sidebar-container backdrop-blur-sm shadow-lg shadow-purple-900/5"
        initial="hidden"
        animate={isExpanded ? ["visible", "expanded"] : ["visible", "collapsed"]}
        variants={sidebarVariants}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Toggle button for permanent expand/collapse */}
        <motion.button
          className={`absolute -right-3 top-20 bg-gray-800 border border-gray-700 rounded-full p-1.5 shadow-md hover:shadow-purple-500/20 ${isExpanded ? 'rotate-180' : ''} transition-transform`}
          onClick={togglePermanentExpand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={14} className="text-gray-400" />
        </motion.button>
        {/* Logo */}
        <NavLink to="/" className="w-full flex items-center justify-center py-5 mb-8 relative overflow-hidden">
          <div className={`flex items-center ${isExpanded ? "justify-start pl-4" : "justify-center"} w-full transition-all duration-300`}>
            <motion.div 
              className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.png" alt="SnapLoop" className="w-6 h-6 object-contain" />
            </motion.div>
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span 
                  className="text-white font-bold ml-3 text-xl tracking-wide"
                  initial={{ opacity: 0, x: -15, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -15, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  SnapLoop
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </NavLink>

        {/* Nav Items */}
        <div className="flex flex-col space-y-1 items-center w-full px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => `
                relative w-full flex items-center ${isExpanded ? "justify-start" : "justify-center"} py-3 px-3 group rounded-xl 
                transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10
                ${isActive 
                  ? 'text-white bg-gradient-to-r from-purple-600/40 to-blue-600/40 backdrop-blur-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: '100%' }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Icon */}
                  <motion.div 
                    className={`${isExpanded ? "mr-4" : ""} flex items-center justify-center w-6 h-6`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  {/* Label - Show directly in expanded mode */}
                  <AnimatePresence mode="wait">
                    {isExpanded ? (
                      <motion.span
                        initial={{ opacity: 0, x: -10, width: 0 }}
                        animate={{ opacity: 1, x: 0, width: 'auto' }}
                        exit={{ opacity: 0, x: -10, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap font-medium"
                      >
                        {item.label}
                      </motion.span>
                    ) : (
                      // Tooltip for collapsed mode
                      <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-800/95 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-gray-700/50 backdrop-blur-sm">
                        {item.label}
                      </div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* User Profile at bottom */}
        <div className="mt-auto mb-6 w-full flex flex-col items-center px-3">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="w-full p-2.5 rounded-xl flex items-center bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700/40 backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-3 border-2 border-gray-900 shadow-md shadow-purple-500/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-medium">A</span>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">Aayush V.</div>
                  <div className="text-gray-400 text-xs truncate">@aayushv</div>
                </div>
                <motion.button 
                  className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10"
                  whileHover={{ rotate: 180, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate('/settings')}
                >
                  <Settings size={16} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer group relative border-2 border-gray-900 shadow-md shadow-purple-500/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-medium">A</span>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-800/95 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-gray-700/50 backdrop-blur-sm">
                  Your Profile
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Navigation Toggle */}
      <motion.button
        className="fixed bottom-5 left-5 z-50 p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg shadow-purple-500/20 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isMobileMenuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#121212]/95 backdrop-blur-sm shadow-xl border-l border-gray-800/50"
              variants={mobileSidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <motion.div 
                  className="flex items-center justify-between p-5 border-b border-gray-800/50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <img src="/logo.png" alt="SnapLoop" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-wide">SnapLoop</span>
                  </div>
                  <motion.button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-800/60"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} className="text-gray-400" />
                  </motion.button>
                </motion.div>
                
                <div className="flex flex-col py-4 overflow-y-auto px-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        end={item.exact}
                        className={({ isActive }) => `
                          flex items-center space-x-4 px-4 py-3.5 my-1 rounded-xl transition-all duration-300
                          ${isActive 
                            ? 'text-white bg-gradient-to-r from-purple-600/40 to-blue-600/40 shadow-md shadow-purple-500/10' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.div
                                layoutId="mobile-active"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )}
                            <div className="w-6 h-6 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-auto p-4 border-t border-gray-800/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700/40 flex items-center space-x-3 shadow-lg">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center border-2 border-gray-900 shadow-md shadow-purple-500/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-white font-medium">A</span>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">Aayush Vaghela</div>
                      <div className="text-gray-400 text-sm truncate">@aayushv</div>
                    </div>
                    <motion.button 
                      className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10"
                      whileHover={{ rotate: 180, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      transition={{ duration: 0.3 }}
                      onClick={() => navigate('/settings')}
                    >
                      <Settings size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;