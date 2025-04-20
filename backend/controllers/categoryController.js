import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (admin only)
export const createCategory = async (req, res) => {
  try {
    const { id, name, iconName, iconSize } = req.body;

    if (!id || !name) {
      return res.status(400).json({
        success: false,
        error: 'Please provide id and name'
      });
    }

    // Check if category already exists
    const categoryExists = await Category.findOne({ id });
    if (categoryExists) {
      return res.status(400).json({
        success: false,
        error: 'Category with this id already exists'
      });
    }

    const category = await Category.create({
      id,
      name,
      iconName: iconName || 'Hash',
      iconSize: iconSize || 14
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (admin only)
export const updateCategory = async (req, res) => {
  try {
    const { name, iconName, iconSize, isActive } = req.body;

    // Fields to update
    const fieldsToUpdate = {
      name,
      iconName,
      iconSize,
      isActive
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    // Find and update category
    const category = await Category.findOneAndUpdate(
      { id: req.params.id },
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (admin only)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ id: req.params.id });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

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