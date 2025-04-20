import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Eye, BookmarkIcon, Heart, 
  MessageCircle, Share2, PlayCircle
} from 'lucide-react';

const TrendingVideosSection = () => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", duration: 0.8 }
    }
  };

  // Mock video thumbnails for explore section
  const exploreThumbnails = [
    {
      id: 1,
      image: "https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg",
      title: "Gaming Setup Tips",
      creator: "@indie_dev",
      views: "352K"
    },
    {
      id: 2,
      image: "https://cdn.pixabay.com/photo/2020/04/08/08/08/laptop-5016117_1280.jpg",
      title: "UX Design Tutorial",
      creator: "@design_master",
      views: "128K"
    },
    {
      id: 3,
      image: "https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_1280.jpg",
      title: "Mobile Photography",
      creator: "@photo_expert",
      views: "98K"
    },
    {
      id: 4,
      image: "https://cdn.pixabay.com/photo/2021/09/14/15/39/music-6624662_1280.jpg",
      title: "Creating Lo-Fi Music",
      creator: "@music_creator",
      views: "214K"
    },
    {
      id: 5,
      image: "https://cdn.pixabay.com/photo/2020/01/20/19/08/waterfall-4781719_1280.jpg",
      title: "Travel Vlog: Bali",
      creator: "@adventure_seeker",
      views: "473K"
    },
    {
      id: 6,
      image: "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
      title: "Baking Masterclass",
      creator: "@culinary_delights",
      views: "187K"
    }
  ];

  return (
    <section className="mb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-900/30 to-purple-500/20 text-purple-300 text-sm font-medium rounded-full mb-3">
              TRENDING NOW
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-gray-300 bg-clip-text text-transparent">Explore Trending Videos</h2>
            <p className="text-gray-300 max-w-2xl">
              Check out the most popular content on SnapLoop from creators around the world
            </p>
          </motion.div>
          
          <Link 
            to="/explore" 
            className="group relative inline-flex items-center justify-center px-4 py-2 mt-4 md:mt-0 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-medium rounded-lg border border-white/10 transition-all transform overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center">
              <span>View All Categories</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {exploreThumbnails.map((item) => (
            <motion.div 
              key={item.id}
              className="group relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-xl overflow-hidden shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border border-gray-800/50 hover:border-purple-500/30"
              variants={scaleUp}
              whileHover={{ y: -8 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <motion.img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <motion.button 
                    className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-sm text-white rounded-full w-14 h-14 flex items-center justify-center transform -translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={22} />
                  </motion.button>
                </motion.div>
                
                {/* Video duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                  0:{Math.floor(Math.random() * 59) + 10}
                </div>
                
                {/* Views count */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs text-white">
                  <Eye size={12} className="mr-1" />
                  {item.views}
                </div>
                
                {/* Category tag */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600/70 to-blue-600/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.id % 3 === 0 ? 'Tech' : item.id % 3 === 1 ? 'Design' : 'Lifestyle'}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-3 ring-1 ring-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-medium text-xs">{item.creator[1].toUpperCase()}</span>
                  </motion.div>
                  <div>
                    <h3 className="text-white font-medium mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                    <p className="text-blue-400 text-sm">{item.creator}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <motion.span 
                      className="text-gray-400 text-xs flex items-center"
                      whileHover={{ scale: 1.1, color: 'rgb(255, 255, 255)' }}
                    >
                      <Eye size={12} className="mr-1" /> {item.views} views
                    </motion.span>
                    <span className="text-gray-400 text-xs">
                      {Math.floor(Math.random() * 6) + 1} days ago
                    </span>
                  </div>
                  
                  <motion.button 
                    className="text-purple-400 hover:text-purple-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <BookmarkIcon size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <Link 
            to="/feed" 
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-500/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <PlayCircle size={20} className="mr-2" />
            Watch Feed
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingVideosSection;