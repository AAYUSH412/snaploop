import React from 'react';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 bg-[#0A0A0A] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="font-bold text-xl flex items-center">
              <img src="/logo.png" alt="SnapLoop" className="h-7 w-7 mr-2" />
              <span>
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Snap</span>
                <span className="text-white">Loop</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Share your moments in short loops.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 SnapLoop. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;