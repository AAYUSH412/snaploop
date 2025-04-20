// User mock data for various components

// Profile page user data
export const userData = {
    username: '@design_wizard',
    displayName: 'Alex Morgan',
    bio: 'Digital designer & creative technologist. Making videos about UI/UX and animation.',
    followers: '24.5K',
    following: '843',
    location: 'San Francisco, CA',
    joinedDate: 'June 2023',
    website: 'designwizard.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Added avatar image URL
  };
  
  // Current user data (for avatar, etc.)
  export const currentUser = {
    id: 'u1',
    username: '@aayushv',
    displayName: 'Aayush Vaghela',
    avatarInitial: 'A', // Kept as fallback or initial display
    avatarUrl: 'https://aayush-vaghela.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.b805c3ae.jpeg&w=256&q=75', // Added avatar image URL
    isPro: true
  };
  
  // Suggested users to follow
  export const suggestedUsers = [
    {
      id: 'u2',
      username: '@motion.master',
      displayName: 'Motion Master',
      avatarInitial: 'M',
      avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Added avatar image URL
      followers: '456K',
      category: 'Animation'
    },
    {
      id: 'u3',
      username: '@photo_visionary',
      displayName: 'Photo Visionary',
      avatarInitial: 'P',
      avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Added avatar image URL
      followers: '299K',
      category: 'Photography'
    },
    {
      id: 'u4',
      username: '@webdev_pro',
      displayName: 'Web Dev Pro',
      avatarInitial: 'W',
      avatarUrl: 'https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Added avatar image URL
      followers: '125K',
      category: 'Development'
    },
    {
      id: 'u5',
      username: '@design_master',
      displayName: 'Design Master',
      avatarInitial: 'D',
      avatarUrl: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Added avatar image URL
      followers: '532K',
      category: 'UI/UX Design'
    }
  ];
  
  // User videos for profile page (already includes thumbnail images)
  // User videos for profile page (Updated Data)
// Current Date: April 19, 2025

export const userProfileVideos = [
    {
      id: 1, // Renumbered for clarity
      title: 'Quick Figma Tip: Auto Layout Magic',
      views: '88.1K',
      timestamp: '3 days ago', // Relative to April 19, 2025
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*u0omXpajLVfOhwnLgkM5-g.png' // Placeholder relevant image
    },
    {
      id: 2,
      title: 'Creating Liquid SVG Animations Loop',
      views: '65.7K',
      timestamp: '1 week ago', // Relative to April 19, 2025
      thumbnail: 'https://i.ytimg.com/vi/8ipFyy7HpqQ/maxresdefault.jpg' // Placeholder relevant image
    },
    {
      id: 3,
      title: 'Micro-interaction Showcase #3: Button Fun',
      views: '42.0K',
      timestamp: '2 weeks ago', // Relative to April 19, 2025
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Zl1Mxtux3MKRZ_jO.gif' // Placeholder relevant image
    },
    {
      id: 4,
      title: 'Color Palette Generator Hack (Short)',
      views: '30.5K',
      timestamp: '3 weeks ago', // Relative to April 19, 2025
      thumbnail: 'https://miro.medium.com/v2/resize:fit:2000/format:webp/1*lBQP2fpNi0htYnW8_nhcPQ.png' // Placeholder relevant image
    },
    {
      id: 5,
      title: 'Webflow Smooth Scroll Effect Tutorial',
      views: '25.9K',
      timestamp: '1 month ago', // Relative to April 19, 2025
      thumbnail: 'https://i.ytimg.com/vi/qnlqVhI5EqI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCPlMt3Jq6Klx6RaMYm8frWc5AO7g' // Placeholder relevant image
    },
    {
      id: 6,
      title: 'Design Critique: Landing Page Flow Analysis',
      views: '19.2K',
      timestamp: '1 month ago', // Relative to April 19, 2025
      thumbnail: 'https://www.apexure.com/uploads/what-is-landing-page-analysis-9c6cd0.webp' // Placeholder relevant image
    },
    {
      id: 7,
      title: 'Accessibility Check: Contrast Ratios Matter!',
      views: '15.8K',
      timestamp: '2 months ago', // Relative to April 19, 2025
      thumbnail: 'https://www.getxray.app/hubfs/Marketing/Blog/Blog%20images/Images%202024/Accessibility%20Testing/Accessibility-Testing-Xray-Blog.png' // Placeholder relevant image
    },
     {
      id: 8,
      title: 'Animated Icon Loop - Process Snippet',
      views: '55.3K',
      timestamp: '2 months ago', // Relative to April 19, 2025
      thumbnail: 'https://cdn-icons-gif.flaticon.com/15578/15578417.gif' // Placeholder relevant image
    }
  ];
  
  // User liked videos for profile page (already includes thumbnail images)
  export const userLikedVideos = [
    { 
      id: 7, 
      title: 'Advanced CSS Animations', 
      views: '56.7K',
      timestamp: '1 week ago',
      thumbnail: 'https://blog.pixelfreestudio.com/wp-content/uploads/2024/07/maxresdefault-46-1-1024x576.jpg',
      creator: '@css_master'
    },
    { 
      id: 8, 
      title: 'React Hooks Deep Dive', 
      views: '42.3K',
      timestamp: '2 weeks ago',
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*ApTMX9RC1bv6gd4_AfmDlg.jpeg',
      creator: '@react_ninja'
    },
    { 
      id: 9, 
      title: 'UI/UX Design Process', 
      views: '38.9K',
      timestamp: '3 weeks ago',
      thumbnail: 'https://cdn.sanity.io/images/r115idoc/production/3ce2ddaa4c818644d0191e9e57beabb6524bb734-1000x470.webp?w=3840&q=80&fit=clip&auto=format',
      creator: '@ux_simplified'
    },
    { 
      id: 10, 
      title: 'Design Trends 2025', 
      views: '29.4K',
      timestamp: '1 month ago',
      thumbnail: 'https://media.licdn.com/dms/image/v2/D4E12AQFQDfPpBhTc1Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1735416864260?e=2147483647&v=beta&t=r8uWymmngM4sRGMCg1ePk9_CGSofQL1vDM8tg-D5peY',
      creator: '@future_designer'
    }
  ];