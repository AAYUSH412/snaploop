import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config({path:'./.env.local'});

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourproductiondomain.com' // Replace with your production domain
    : ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite's default development ports
  credentials: true
}));
app.use(cookieParser()); // Add cookie parser middleware
app.use(express.json({ limit: '50mb' }));  // Increased limit for video uploads
app.use(express.urlencoded({ extended: false }));

// Routes
import usersRoutes from './routes/users.js';
import videosRoutes from './routes/videos.js';
import categoriesRoutes from './routes/categories.js';

app.use('/api/users', usersRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/categories', categoriesRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('SnapLoop API is running...');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});