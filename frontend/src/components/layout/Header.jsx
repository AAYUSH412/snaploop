import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Upload, Compass, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/90 backdrop-blur-md border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="group flex items-center">
          <motion.div 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="font-bold flex items-center"
          >
            <img src="/logo.png" alt="SnapLoop" className="h-8 w-8 mr-2" />
            <span className="text-2xl">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Snap</span>
              <span className="text-white">Loop</span>
            </span>
          </motion.div>
        </Link>
        
        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-purple-500/10 text-purple-400 font-medium' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`
            }
            end
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/upload" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-purple-500/10 text-purple-400 font-medium' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Upload size={18} />
            <span>Upload</span>
          </NavLink>
          
          <NavLink 
            to="/explore" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-purple-500/10 text-purple-400 font-medium' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Compass size={18} />
            <span>Explore</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-purple-500/10 text-purple-400 font-medium' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <User size={18} />
            <span>Profile</span>
          </NavLink>
        </nav>

        {/* User Avatar - Right side */}
        <div className="flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            <span className="text-white font-medium">A</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;