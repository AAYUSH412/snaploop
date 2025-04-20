import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be longer than 100 characters']
  },
  videoUrl: {
    type: String,
    required: [true, 'Please add a video URL']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Please add a thumbnail URL']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  hashtags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Please specify a category']
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: [true, 'Please add a comment']
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  shares: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be longer than 500 characters']
  },
  imageKit: {
    fileId: String,
    filePath: String
  },
  duration: {
    type: Number  // in seconds
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add text index for search functionality
VideoSchema.index({ title: 'text', hashtags: 'text', description: 'text' });

const Video = mongoose.model('Video', VideoSchema);
export default Video;