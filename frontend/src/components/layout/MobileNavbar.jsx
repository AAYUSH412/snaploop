import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, Upload, User } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileNavbar = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/', 
      icon: <Home size={20} />, 
      label: 'Home',
      exact: true 
    },
    { 
      path: '/explore', 
      icon: <Compass size={20} />, 
      label: 'Explore' 
    },
    { 
      path: '/upload', 
      icon: <Upload size={20} />, 
      label: 'Upload',
      isCenter: true
    },
    { 
      path: '/feed', 
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
        <img src="/logo.png" alt="SnapLoop" className="w-4 h-4 object-contain" />
      </div>, 
      label: 'Shorts' 
    },
    { 
      path: '/profile', 
      icon: <User size={20} />, 
      label: 'Profile' 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-4 mb-4">
        <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800/60 rounded-2xl shadow-lg shadow-purple-900/20 overflow-hidden">
          <div className="flex justify-around items-center px-2 py-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.exact && location.pathname === item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className="flex flex-col items-center relative"
                >
                  {/* Upload button special styling */}
                  {item.isCenter ? (
                    <div className="px-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg shadow-purple-600/30 -mt-1"
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-xs text-gray-300 mt-1">{item.label}</span>
                    </div>
                  ) : (
                    <div className="px-3">
                      <motion.div
                        className="p-2 rounded-xl relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {item.icon}
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="navIndicator"
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.div>
                      <span className={`text-xs mt-1 ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>
                        {item.label}
                      </span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;