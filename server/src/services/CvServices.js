const CV = require('../models/CV');

// Create a new CV
const createCV = async (cvData) => {
  try {
    const newCV = new CV(cvData);
    return await newCV.save();
  } catch (error) {
    throw new Error('Failed to create CV');
  }
};

// Get all CVs with optional filters
const getAllCVs = async (filters = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc' } = options;
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const skip = (page - 1) * limit;

    const cvs = await CV.find(filters).sort(sort).skip(skip).limit(parseInt(limit));
    const total = await CV.countDocuments(filters);

    return { cvs, total, page, limit };
  } catch (error) {
    throw new Error('Failed to fetch CVs');
  }
};

// Get a CV by ID
const getCVById = async (cvId) => {
  try {
    return await CV.findById(cvId).populate('user');
  } catch (error) {
    throw new Error('Failed to fetch CV');
  }
};

// Update a CV by ID
const updateCV = async (cvId, cvData) => {
  try {
    return await CV.findByIdAndUpdate(cvId, cvData, { new: true });
  } catch (error) {
    throw new Error('Failed to update CV');
  }
};

// Delete a CV by ID
const deleteCV = async (cvId) => {
  try {
    return await CV.findByIdAndDelete(cvId);
  } catch (error) {
    throw new Error('Failed to delete CV');
  }
};

module.exports = {
  createCV,
  getAllCVs,
  getCVById,
  updateCV,
  deleteCV,
};
