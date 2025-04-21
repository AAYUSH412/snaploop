import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import categoryService from '../../services/categoryService';

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const scrollRef = useRef(null);
  
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getCategories();
        
        // Add 'All' category at the beginning if it doesn't exist
        const allCategory = {
          id: 'all', 
          name: 'For You',
          iconName: 'Hash',
          iconSize: 20
        };
        
        const categoriesData = response.data.data;
        if (!categoriesData.find(cat => cat.id === 'all')) {
          setCategories([allCategory, ...categoriesData]);
        } else {
          setCategories(categoriesData);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
        // Fallback to empty array with just 'all' category
        setCategories([{
          id: 'all', 
          name: 'For You',
          iconName: 'Hash',
          iconSize: 16
        }]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Check scroll position for showing/hiding scroll arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Check initial scroll state
      checkScroll();
      // Check after content might have changed size
      setTimeout(checkScroll, 500);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
    };
  }, [categories]); // Re-check when categories change
  
  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Function to get icon component based on iconName string
  const getIconComponent = (iconName, size = 16) => {
    // This is a simplified version - you may need to import more icons or use a more dynamic approach
    return <Hash size={size} />;
  };

  if (loading && categories.length === 0) {
    return (
      <div className="fixed top-0 left-0 right-0 z-40 md:left-[76px] bg-[#0A0A0A]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 w-24 bg-gray-800/60 animate-pulse rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 md:left-[76px] bg-[#0A0A0A]/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center justify-between py-3">
          {/* Title - Hidden on mobile screens due to the navbar */}
          <h2 className="text-xl font-semibold text-white hidden md:block">Explore</h2>
          
          {/* Categories - Takes full width on mobile, partial width on desktop */}
          <div className="flex-1 md:flex-initial md:ml-8 relative flex items-center">
            {/* Left Scroll Button */}
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent pl-1 pr-4 h-full flex items-center"
                onClick={scrollLeft}
              >
                <div className="flex items-center justify-center w-6 h-6 bg-gray-700/70 rounded-full">
                  <ChevronLeft size={16} className="text-white" />
                </div>
              </motion.button>
            )}

            {/* Scrollable Categories */}
            <div 
              ref={scrollRef}
              className="flex items-center space-x-2 overflow-x-auto scrollbar-hide mx-6 md:mx-0"
            >
              {categories.map((category) => {
                const IconComponent = () => getIconComponent(category.iconName, category.iconSize);
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium border border-transparent'
                        : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700/50'
                    }`}
                  >
                    <span className="flex-shrink-0">
                      <IconComponent />
                    </span>
                    <span>{category.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Scroll Button */}
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent pr-1 pl-4 h-full flex items-center"
                onClick={scrollRight}
              >
                <div className="flex items-center justify-center w-6 h-6 bg-gray-700/70 rounded-full">
                  <ChevronRight size={16} className="text-white" />
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;