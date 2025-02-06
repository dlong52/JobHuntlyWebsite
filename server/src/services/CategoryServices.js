const Category = require('../models/Category');

// Create a new category
const createCategory = async (data) => {
    try {
        const category = new Category(data);
        return await category.save();
    } catch (error) {
        throw new Error('Failed to create category');
    }
};

// Get all categories with pagination and filter
const getAllCategories = async (filters = {}, options = {}) => {
    const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc' } = options;

    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const skip = (page - 1) * limit;
    const query = {};

    if (filters.name) {
        query.name = { $regex: filters.name, $options: 'i' };
    }

    const categories = await Category.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Category.countDocuments(query);

    return { categories, total, page, limit };
};

// Get category by ID
const getCategoryById = async (categoryId) => {
    try {
        return await Category.findById(categoryId);
    } catch (error) {
        throw new Error('Category not found');
    }
};

// Update category by ID
const updateCategory = async (categoryId, updateData) => {
    try {
        return await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
    } catch (error) {
        throw new Error('Failed to update category');
    }
};

// Delete category by ID
const deleteCategory = async (categoryId) => {
    try {
        return await Category.findByIdAndDelete(categoryId);
    } catch (error) {
        throw new Error('Failed to delete category');
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
