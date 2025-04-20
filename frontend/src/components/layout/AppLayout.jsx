import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
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
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area with dynamic padding for sidebar */}
      <motion.div 
        className="transition-all duration-300"
        animate={{ 
          marginLeft: sidebarExpanded ? '200px' : '76px',
        }}
      >
        {/* Show CategoryBar only on the Explore page */}
        {showCategories && <CategoryBar />}
        
        {/* Main Content with Animation */}
        <motion.main 
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ 
            paddingTop: showCategories ? '7rem' : '2rem',
          }}
        >
          <Outlet />
        </motion.main>
        
        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default AppLayout;