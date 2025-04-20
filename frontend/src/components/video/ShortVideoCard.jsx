import React, { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react";

const ShortVideoCard = ({ video = {} }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Handle video visibility and playback
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(error => console.log("Playback error:", error));
          setIsPlaying(true);
        } else if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(e => console.log(e));
        setIsPlaying(true);
      }
    }
  };

  const videoSrc = video?.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-table-with-food-being-served-33999-large.mp4";
  const username = video?.username || "@snapshot_creator";
  const title = video?.title || "Check out this amazing video #trending";

  return (
    <div className="relative h-screen w-full max-w-md mx-auto bg-black overflow-hidden snap-start snap-always">
      {/* Video Element */}
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10"></div>

      {/* Controls */}
      <div className="absolute bottom-6 left-4 right-4 z-20 flex justify-between items-end">
        <div>
          <h3 className="text-white font-semibold text-lg">{username}</h3>
          <p className="text-white/80 text-sm mt-1">{title}</p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="bg-black/30 rounded-full p-2.5 backdrop-blur-sm"
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} 
            />
          </button>
          
          <button className="bg-black/30 rounded-full p-2.5 backdrop-blur-sm">
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
          
          <button className="bg-black/30 rounded-full p-2.5 backdrop-blur-sm">
            <Share2 className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={toggleMute}
            className="bg-black/30 rounded-full p-2.5 backdrop-blur-sm"
          >
            {isMuted ? 
              <VolumeX className="w-6 h-6 text-white" /> : 
              <Volume2 className="w-6 h-6 text-white" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortVideoCard;