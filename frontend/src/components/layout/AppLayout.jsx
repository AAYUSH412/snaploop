import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import CategoryBar from './CategoryBar';
import Footer from './Footer';

const AppLayout = () => {
  const location = useLocation();
  const showCategories = location.pathname === '/explore';
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  // Track sidebar hover state
  const handleSidebarMouseEnter = () => setSidebarExpanded(true);
  const handleSidebarMouseLeave = () => setSidebarExpanded(false);
  
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar-container');
    if (sidebar) {
      sidebar.addEventListener('mouseenter', handleSidebarMouseEnter);
      sidebar.addEventListener('mouseleave', handleSidebarMouseLeave);
      
      return () => {
        sidebar.removeEventListener('mouseenter', handleSidebarMouseEnter);
        sidebar.removeEventListener('mouseleave', handleSidebarMouseLeave);
      };
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Navigation */}
      <MobileNavbar />
      
      {/* Main Content Area with responsive layout */}
      <div className={`transition-all duration-300 md:ml-[76px] ${sidebarExpanded ? 'md:ml-[200px]' : ''}`}>
        {/* Show CategoryBar only on the Explore page */}
        {showCategories && <CategoryBar />}
        
        {/* Main Content with Animation */}
        <motion.main 
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 md:pb-12" // Added more bottom padding on mobile for the navigation bar
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ 
            paddingTop: showCategories ? '7rem' : '1rem', // Adjusted for mobile top navbar
          }}
        >
          <Outlet />
        </motion.main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;