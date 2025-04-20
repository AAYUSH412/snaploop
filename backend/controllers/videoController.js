import Video from '../models/Video.js';
import User from '../models/User.js';
import imagekit from '../middleware/imagekit.js';

// @desc    Get all videos with pagination
// @route   GET /api/videos
// @access  Public
export const getVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Video.countDocuments({});

    // Query with pagination
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: videos.length,
      pagination,
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

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Increment view count
    video.views += 1;
    await video.save();

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new video
// @route   POST /api/videos
// @access  Private
export const createVideo = async (req, res) => {
  try {
    // Get file from request body
    const { title, description, category, hashtags, file, fileName } = req.body;

    if (!title || !category || !file) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title, category and video file'
      });
    }

    // Upload video to ImageKit
    const uploadResponse = await imagekit.upload({
      file: file, // base64 encoded string
      fileName: fileName || `video-${req.user.id}-${Date.now()}`,
      folder: '/snaploop/videos'
    });

    // Create thumbnail using ImageKit transformations
    const thumbnailUrl = imagekit.url({
      src: uploadResponse.url,
      transformation: [{ height: '480', width: '720', focus: 'auto' }]
    });

    // Create new video
    const video = await Video.create({
      title,
      description,
      category,
      hashtags: hashtags ? hashtags.split(',').map(tag => tag.trim()) : [],
      videoUrl: uploadResponse.url,
      thumbnailUrl,
      user: req.user.id,
      username: req.user.username,
      imageKit: {
        fileId: uploadResponse.fileId,
        filePath: uploadResponse.filePath
      }
    });

    res.status(201).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private
export const updateVideo = async (req, res) => {
  try {
    let video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Make sure user owns the video
    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this video'
      });
    }

    // Fields to update
    const fieldsToUpdate = {
      title: req.body.title,
      description: req.body.description,
      hashtags: req.body.hashtags ? req.body.hashtags.split(',').map(tag => tag.trim()) : video.hashtags,
      category: req.body.category,
      isPrivate: req.body.isPrivate
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    // Update video
    video = await Video.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Make sure user owns the video
    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this video'
      });
    }

    // Delete file from ImageKit
    if (video.imageKit && video.imageKit.fileId) {
      await imagekit.deleteFile(video.imageKit.fileId);
    }

    // Delete video from database
    await video.remove();

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

// @desc    Like/Unlike video
// @route   PUT /api/videos/:id/like
// @access  Private
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Check if video has already been liked by this user
    const isLiked = video.likes.some(like => like.user.toString() === req.user.id);

    if (isLiked) {
      // Unlike the video
      video.likes = video.likes.filter(
        like => like.user.toString() !== req.user.id
      );
    } else {
      // Like the video
      video.likes.unshift({ user: req.user.id });
    }

    await video.save();

    res.status(200).json({
      success: true,
      liked: !isLiked,
      likesCount: video.likes.length,
      data: video.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add comment to video
// @route   POST /api/videos/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Comment text is required'
      });
    }

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Add comment to video
    video.comments.unshift({
      user: req.user.id,
      username: req.user.username,
      text
    });

    await video.save();

    res.status(201).json({
      success: true,
      data: video.comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete comment from video
// @route   DELETE /api/videos/:id/comments/:commentId
// @access  Private
export const deleteComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Find the comment
    const comment = video.comments.find(
      comment => comment.id === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    // Check if user is owner of comment or video
    if (
      comment.user.toString() !== req.user.id &&
      video.user.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this comment'
      });
    }

    // Remove comment
    video.comments = video.comments.filter(
      ({ id }) => id !== req.params.commentId
    );

    await video.save();

    res.status(200).json({
      success: true,
      data: video.comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get trending videos
// @route   GET /api/videos/trending
// @access  Public
export const getTrendingVideos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    
    // Get videos with most likes and views in the past week
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const videos = await Video.find({
      createdAt: { $gte: oneWeekAgo }
    })
      .sort({ views: -1, 'likes.length': -1 })
      .limit(limit);

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

// @desc    Get videos by category
// @route   GET /api/videos/category/:categoryId
// @access  Public
export const getVideosByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const videos = await Video.find({ category: req.params.categoryId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

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

// @desc    Share video (increment share count)
// @route   PUT /api/videos/:id/share
// @access  Public
export const shareVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Increment share count
    video.shares += 1;
    await video.save();

    res.status(200).json({
      success: true,
      data: {
        shares: video.shares
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

// @desc    Generate ImageKit upload signature
// @route   GET /api/videos/upload-signature
// @access  Private
export const getUploadSignature = async (req, res) => {
  try {
    const token = req.query.token || '';
    const expire = parseInt(req.query.expire, 10) || Math.floor(Date.now() / 1000) + 3600; // Default 1 hour

    const signature = imagekit.getAuthenticationParameters(token, expire);

    res.status(200).json({
      success: true,
      data: signature
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};