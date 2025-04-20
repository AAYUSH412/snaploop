# SnapLoop - Social Video Sharing Platform

<div align="center">
  <img src="frontend/public/logo.png" alt="SnapLoop Logo" width="100" />
</div>

## Overview

SnapLoop is a modern short-format video sharing platform that allows users to discover and share creative content. Built with a React frontend and Node.js backend, it provides a seamless user experience for browsing, uploading, and engaging with short videos.

## Features

- **User Authentication** - Secure login and registration system
- **Video Feed** - Algorithmic feed of short videos
- **Content Creation** - Upload and edit videos with filters and effects
- **Social Engagement** - Like, comment, and share videos
- **User Profiles** - Customizable profiles with video collections
- **Explore Page** - Discover trending content and creators
- **Category Filtering** - Browse videos by interest categories
- **Responsive Design** - Optimized for mobile and desktop devices

## Tech Stack

### Frontend
- React 19
- React Router v7
- Framer Motion
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- ImageKit (for media storage)

## Installation and Setup

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env.local file (see .env.example for required variables)

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

See `.env.example` for required environment variables.

## Deployment

The frontend is configured for deployment on Vercel, and the backend can be deployed to any Node.js hosting service like Heroku, Railway, or DigitalOcean.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- Aayush Vaghela - Initial work and maintainer

## Acknowledgments

- Design inspiration from TikTok, Instagram Reels, and YouTube Shorts
- Icons provided by Lucide React