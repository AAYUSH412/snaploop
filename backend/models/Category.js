import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  iconName: {
    type: String,
    default: 'Hash' // Default icon name corresponding to Lucide React icons
  },
  iconSize: {
    type: Number,
    default: 14
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;