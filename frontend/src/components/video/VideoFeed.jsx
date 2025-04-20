import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';
import ShortVideoCard from './ShortVideoCard';

/**
 * VideoFeed Component
 * 
 * A scrollable container that renders a list of VideoCard components with
 * snap scrolling behavior similar to YouTube Shorts or Instagram Reels.
 * 
 * @param {Object} props
 * @param {Array} props.videos - Array of video objects
 * @param {boolean} props.useShortCards - Whether to use ShortVideoCard instead of VideoCard
 */
const VideoFeed = ({ videos = [], useShortCards = false }) => {
  const feedContainerRef = useRef(null);

  // Transform videos to ensure they have the required properties
  const processedVideos = videos.map(video => {
    return {
      id: video.id,
      username: video.username || '@user',
      title: video.title || 'Untitled video',
      hashtags: video.hashtags || [],
      likes: video.likes || '0',
      comments: video.comments || '0',
      shares: video.shares || '0',
      videoUrl: video.videoUrl || video.video || video.src,
      thumbnailUrl: video.thumbnailUrl || video.thumbnail,
      views: video.views || '0',
      // Add any other properties needed
    };
  });

  useEffect(() => {
    // Ensure the initial video is centered properly on load
    if (feedContainerRef.current && processedVideos.length > 0) {
      const firstVideoCard = feedContainerRef.current.firstChild;
      if (firstVideoCard) {
        firstVideoCard.scrollIntoView({ behavior: 'instant' });
      }
    }

    // Add keyboard navigation for videos
    const handleKeyDown = (e) => {
      if (!feedContainerRef.current) return;
      
      const currentScroll = feedContainerRef.current.scrollTop;
      const videoHeight = window.innerHeight;
      
      if (e.key === 'ArrowDown' || e.key === 'j') {
        // Scroll to next video
        feedContainerRef.current.scrollTo({
          top: currentScroll + videoHeight,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        // Scroll to previous video
        feedContainerRef.current.scrollTo({
          top: currentScroll - videoHeight,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [processedVideos]);

  // Animate the container when it mounts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // If no videos provided and useShortCards is true, render the simplified version
  if (processedVideos.length === 0 && useShortCards) {
    return (
      <div className="h-screen w-full max-w-md mx-auto overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
        <ShortVideoCard />
        <ShortVideoCard />
        <ShortVideoCard />
      </div>
    );
  }

  return (
    <motion.div
      className="relative max-w-full max-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div 
        ref={feedContainerRef}
        className="snap-y snap-mandatory h-screen w-full overflow-y-scroll scrollbar-hide"
      >
        {processedVideos.map((video) => (
          <div 
            key={video.id} 
            className="h-screen w-full snap-start snap-always"
          >
            {useShortCards ? <ShortVideoCard video={video} /> : <VideoCard video={video} />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoFeed;