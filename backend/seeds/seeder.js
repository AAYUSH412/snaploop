import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: '../.env' });

// Load models
import User from '../models/User.js';
import Video from '../models/Video.js';
import Category from '../models/Category.js';

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import frontend mock data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Video.deleteMany();
    await Category.deleteMany();

    console.log('Data cleared...');

    // Create default user
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const adminUser = await User.create({
      username: '@aayushv',
      displayName: 'Aayush Vaghela',
      email: 'aayush@example.com',
      password,
      avatarInitial: 'A',
      avatarUrl: 'https://i.pravatar.cc/150?u=u1',
      bio: 'Digital designer & creative technologist',
      location: 'San Francisco, CA',
      website: 'designwizard.com',
      followers: 24500,
      following: 843,
      isPro: true,
      joinedDate: new Date('2023-06-01')
    });

    // Create additional users from mock data
    const suggestedUsersData = [
      {
        username: '@motion.master',
        displayName: 'Motion Master',
        email: 'motion@example.com',
        password,
        avatarInitial: 'M',
        avatarUrl: 'https://i.pravatar.cc/150?u=u2',
        followers: 456000,
        category: 'Animation'
      },
      {
        username: '@photo_visionary',
        displayName: 'Photo Visionary',
        email: 'photo@example.com',
        password,
        avatarInitial: 'P',
        avatarUrl: 'https://i.pravatar.cc/150?u=u3',
        followers: 299000,
        category: 'Photography'
      },
      {
        username: '@webdev_pro',
        displayName: 'Web Dev Pro',
        email: 'webdev@example.com',
        password,
        avatarInitial: 'W',
        avatarUrl: 'https://i.pravatar.cc/150?u=u4',
        followers: 125000,
        category: 'Development'
      },
      {
        username: '@design_master',
        displayName: 'Design Master',
        email: 'design@example.com',
        password,
        avatarInitial: 'D',
        avatarUrl: 'https://i.pravatar.cc/150?u=u5',
        followers: 532000,
        category: 'UI/UX Design'
      }
    ];

    const users = await User.insertMany(suggestedUsersData);
    console.log(`${users.length + 1} users created...`);

    // Import categories
    const categoriesData = [
      { id: 'all', name: 'All', iconName: 'Hash', iconSize: 14 },
      { id: 'trending', name: 'Trending', iconName: 'Zap', iconSize: 14 },
      { id: 'music', name: 'Music', iconName: 'Music', iconSize: 14 },
      { id: 'tech', name: 'Tech', iconName: 'Code', iconSize: 14 },
      { id: 'gaming', name: 'Gaming', iconName: 'Gamepad', iconSize: 14 },
      { id: 'comedy', name: 'Comedy', iconName: 'Smile', iconSize: 14 },
      { id: 'movies', name: 'Movies', iconName: 'Film', iconSize: 14 },
      { id: 'photography', name: 'Photography', iconName: 'Camera', iconSize: 14 },
      { id: 'sports', name: 'Sports', iconName: 'Zap', iconSize: 14 },
      { id: 'food', name: 'Food', iconName: 'Zap', iconSize: 14 },
      { id: 'fashion', name: 'Fashion', iconName: 'Zap', iconSize: 14 },
      { id: 'travel', name: 'Travel', iconName: 'Zap', iconSize: 14 },
      { id: 'design', name: 'Design', iconName: 'Camera', iconSize: 20 }
    ];

    await Category.insertMany(categoriesData);
    console.log(`${categoriesData.length} categories created...`);

    // Import videos
    const allUsers = await User.find();
    const allUsersMap = allUsers.reduce((map, user) => {
      map[user.username] = user._id;
      return map;
    }, {});

    // Sample videos data
    const videosData = [
      {
        title: 'Delicious Food Preparation - Professional Chef Tips',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-table-with-food-being-served-33999-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg',
        user: allUsersMap['@aayushv'],
        username: '@aayushv',
        hashtags: ['food', 'cooking', 'chef'],
        category: 'food',
        views: 45800,
        likes: [],
        comments: [],
        shares: 3400
      },
      {
        title: 'Exploring Hidden Waterfalls in Tropical Rainforests',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2020/01/20/19/08/waterfall-4781719_1280.jpg',
        user: allUsersMap['@photo_visionary'],
        username: '@photo_visionary',
        hashtags: ['travel', 'nature', 'waterfall'],
        category: 'travel',
        views: 78300,
        likes: [],
        comments: [],
        shares: 5900
      },
      {
        title: 'Creative Portrait Photography Techniques for Modern Looks',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-makeup-39875-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/08/01/09/44/ux-2563648_1280.jpg',
        user: allUsersMap['@photo_visionary'],
        username: '@photo_visionary',
        hashtags: ['photography', 'portrait', 'creative'],
        category: 'photography',
        views: 32500,
        likes: [],
        comments: [],
        shares: 1700
      },
      {
        title: 'Sketch Journey: From Concept to Final Illustration',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-drawing-in-a-notebook-with-a-pen-28991-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2019/07/14/16/29/pen-4337524_1280.jpg',
        user: allUsersMap['@design_master'],
        username: '@design_master',
        hashtags: ['drawing', 'art', 'creative', 'design'],
        category: 'design',
        views: 26700,
        likes: [],
        comments: [],
        shares: 1500
      },
      {
        title: 'Sunset Yoga: Finding Peace in Daily Practice',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-practicing-yoga-at-sunset-39885-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/01/29/13/21/mobile-devices-2017980_1280.png',
        user: allUsersMap['@aayushv'],
        username: '@aayushv',
        hashtags: ['yoga', 'fitness', 'mindfulness', 'sunset'],
        category: 'sports',
        views: 52400,
        likes: [],
        comments: [],
        shares: 2800
      },
      {
        title: 'Creating smooth UI animations with Framer Motion',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-drawing-in-a-notebook-with-a-pen-28991-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2019/01/28/22/35/designer-3961587_1280.jpg',
        user: allUsersMap['@motion.master'],
        username: '@motion.master',
        hashtags: ['webdev', 'uiux', 'animation'],
        category: 'tech',
        views: 45200,
        likes: [],
        comments: [],
        shares: 1400
      },
      {
        title: 'Exploring hidden waterfalls in Bali - A journey into paradise',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2020/01/20/19/08/waterfall-4781719_1280.jpg',
        user: allUsersMap['@photo_visionary'],
        username: '@photo_visionary',
        hashtags: ['travel', 'bali', 'adventure', 'nature'],
        category: 'travel',
        views: 78100,
        likes: [],
        comments: [],
        shares: 5200
      },
      {
        title: '5-minute chocolate dessert that will impress everyone',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-putting-icing-on-a-cake-with-a-spoon-3511-large.mp4',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg',
        user: allUsersMap['@aayushv'],
        username: '@aayushv',
        hashtags: ['cooking', 'dessert', 'quickrecipes', 'chocolate'],
        category: 'food',
        views: 32700,
        likes: [],
        comments: [],
        shares: 2800
      }
    ];

    // Add likes to videos (randomly)
    for (const video of videosData) {
      // Random selection of users who liked the video
      const likedUsers = allUsers
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * allUsers.length));
      
      video.likes = likedUsers.map(user => ({ user: user._id }));
    }

    await Video.insertMany(videosData);
    console.log(`${videosData.length} videos created...`);

    console.log('Data Import Success');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Video.deleteMany();
    await Category.deleteMany();

    console.log('Data Destroyed');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Determine action based on command line args
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use -i to import or -d to delete data');
  process.exit();
}