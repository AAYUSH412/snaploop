import User from '../models/User.js';
import Video from '../models/Video.js';
import imagekit from '../middleware/imagekit.js';

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { username, displayName, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or username already exists'
      });
    }

    // Create user
    const user = await User.create({
      username,
      displayName,
      email,
      password,
      avatarInitial: displayName.charAt(0)
    });

    // Generate token
    const token = user.getSignedJwtToken();
    
    // Default token expiry - 30 days
    const tokenExpiry = 30 * 24 * 60 * 60 * 1000;
    const cookieExpiry = new Date(Date.now() + tokenExpiry);
    
    // Set cookie options
    const cookieOptions = {
      expires: cookieExpiry,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    };
    
    // Set token as an HTTP-only cookie
    res.cookie('token', token, cookieOptions);

    res.status(201).json({
      success: true,
      token,
      expiresIn: cookieExpiry.getTime(),
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        avatarInitial: user.avatarInitial
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = user.getSignedJwtToken();
    
    // Set token expiry based on "remember me" option
    const tokenExpiry = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 1 day
    const cookieExpiry = new Date(Date.now() + tokenExpiry);
    
    // Set cookie options
    const cookieOptions = {
      expires: cookieExpiry,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict'
    };
    
    // Set token as an HTTP-only cookie
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      token,
      expiresIn: cookieExpiry.getTime(),
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        avatarInitial: user.avatarInitial,
        isPro: user.isPro
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/users/logout
// @access  Public
export const logoutUser = async (req, res) => {
  try {
    // Clear the cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      displayName: req.body.displayName,
      bio: req.body.bio,
      location: req.body.location,
      website: req.body.website
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/users/avatar
// @access  Private
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.body.file) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a file'
      });
    }

    // Upload file to ImageKit
    const { file, fileName } = req.body;
    const uploadResponse = await imagekit.upload({
      file: file, // base64 encoded string
      fileName: fileName || `avatar-${req.user.id}-${Date.now()}`,
      folder: '/snaploop/avatars'
    });

    // Update user with new avatar URL
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: uploadResponse.url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        avatarUrl: uploadResponse.url,
        user
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user by username
// @route   GET /api/users/:username
// @access  Public
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ 
      username: req.params.username.startsWith('@') 
        ? req.params.username 
        : `@${req.params.username}` 
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get videos by user
// @route   GET /api/users/:username/videos
// @access  Public
export const getUserVideos = async (req, res) => {
  try {
    const username = req.params.username.startsWith('@') 
      ? req.params.username 
      : `@${req.params.username}`;
      
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const videos = await Video.find({ user: user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get liked videos by user
// @route   GET /api/users/:username/liked-videos
// @access  Public
export const getLikedVideos = async (req, res) => {
  try {
    const username = req.params.username.startsWith('@') 
      ? req.params.username 
      : `@${req.params.username}`;
      
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const videos = await Video.find({ 'likes.user': user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get suggested users
// @route   GET /api/users/suggested
// @access  Public
export const getSuggestedUsers = async (req, res) => {
  try {
    // Get top 5 users with most followers
    const users = await User.find()
      .sort({ followers: -1 })
      .limit(5)
      .select('username displayName avatarUrl avatarInitial followers category');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};