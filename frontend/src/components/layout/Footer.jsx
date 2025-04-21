import React from 'react';
import { Github, Twitter, Instagram, Linkedin, Youtube, Heart, Mail, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Community", href: "/community" },
        { label: "Creators", href: "/creators" },
        { label: "Advertise", href: "/advertise" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
        { label: "Licenses", href: "/licenses" }
      ]
    }
  ];

  return (
    <footer className="border-t border-gray-800/50 bg-gradient-to-b from-[#0A0A0A] to-[#121212] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter signup section */}
        <motion.div 
          className="mb-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold text-white mb-2">Join Our Newsletter</h3>
              <p className="text-gray-300 text-sm">Get the latest updates, news and special offers.</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full md:w-64 px-4 py-3 rounded-l-lg bg-gray-900/70 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-r-lg"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company info column */}
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-6 group">
              <motion.div 
                className="font-bold text-2xl flex items-center"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="h-9 w-9 mr-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="SnapLoop" className="h-8 w-8" />
                </div>
                <span>
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Snap</span>
                  <span className="text-white">Loop</span>
                </span>
              </motion.div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">Share your moments in short loops. Connect with creators worldwide through engaging content.</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={16} className="text-purple-400 mr-2" />
                <a href="mailto:hello@snaploop.com" className="text-gray-300 text-sm hover:text-white transition-colors">hello@snaploop.com</a>
              </div>
              <div className="flex space-x-3">
                <motion.a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-purple-600/30 flex items-center justify-center border border-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={16} className="text-gray-300" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600/30 flex items-center justify-center border border-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter size={16} className="text-gray-300" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600/30 flex items-center justify-center border border-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={16} className="text-gray-300" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600/30 flex items-center justify-center border border-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Youtube size={16} className="text-gray-300" />
                </motion.a>
              </div>
            </div>
          </div>
          
          {/* Footer link columns */}
          {footerLinks.map((section, i) => (
            <div key={section.title} className="col-span-1">
              <motion.h4 
                className="text-white font-bold text-lg mb-6"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {section.title}
              </motion.h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (i * 0.1) + (j * 0.07) }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm flex items-center group"
                    >
                      <ChevronRight size={14} className="mr-1.5 text-purple-500 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* App download section */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-6 sm:mb-0">
              <motion.a 
                href="#"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.84 1.5.1 2.63.64 3.36 1.62-2.88 1.57-2.4 5.5.78 6.58-.8 1.78-1.88 3.56-2.8 4.8zm-3.12-16.4c-.02-1.61 1.43-3.12 3.07-3.88.21 1.97-.59 3.16-1.49 4.13-.96.97-2.14 1.56-1.58-.25z"/>
                </svg>
                <div>
                  <div className="text-[10px] text-gray-400">Download on</div>
                  <div className="text-sm text-white font-medium">App Store</div>
                </div>
              </motion.a>
              <motion.a 
                href="#"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M3.79 2.62c-.17.43-.3.88-.37 1.32l13.76 13.76c.57-.33 1.05-.71 1.4-1.12L3.79 2.62zm14.9 2.33c-.96-1.66-2.3-2.32-3.66-2.62L3.8 13.56c.21 1.9 1.03 3.26 2.42 3.89l12.48-12.48v-.02zM5.91 3.45c-.94.69-1.71 1.7-2.21 2.87L18.15 20.8c.43-.22.79-.45 1.09-.69.56-.43.94-.89 1.21-1.32L5.91 3.45z"/>
                </svg>
                <div>
                  <div className="text-[10px] text-gray-400">GET IT ON</div>
                  <div className="text-sm text-white font-medium">Google Play</div>
                </div>
              </motion.a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm flex items-center group transition-colors">
                <span>Privacy Policy</span>
                <ExternalLink size={14} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm flex items-center group transition-colors">
                <span>Terms of Service</span>
                <ExternalLink size={14} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm flex items-center group transition-colors">
                <span>Cookie Settings</span>
                <ExternalLink size={14} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
          
          {/* Copyright section with animation */}
          <motion.div 
            className="mt-8 pt-6 border-t border-gray-800/30 flex flex-col sm:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm flex items-center">
              © 2025 SnapLoop. All rights reserved.
              <motion.span 
                className="inline-flex items-center ml-2 text-purple-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 2,
                  repeatDelay: 1
                }}
              >
                <Heart size={12} className="mr-1 text-pink-500" /> Made with love
              </motion.span>
            </p>
            
            <p className="text-gray-500 text-xs mt-3 sm:mt-0">
              Designed and developed by the SnapLoop team in San Francisco, CA
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;