const cvService = require('../services/CvServices');

// Create a new CV
const createCV = async (req, res) => {
  try {
    const newCV = await cvService.createCV(req.body);
    res.status(201).json({
      status: 'success',
      message: 'CV created successfully',
      data: newCV,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all CVs
const getAllCVs = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || 'created_at',
      order: order || 'desc',
    };

    const result = await cvService.getAllCVs(filters, options);
    res.status(200).json({
      status: 'success',
      message: 'CVs retrieved successfully',
      data: result.cvs,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a CV by ID
const getCVById = async (req, res) => {
  try {
    const cvId = req.params.id;
    const cv = await cvService.getCVById(cvId);
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'CV retrieved successfully',
      data: cv,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a CV by ID
const updateCV = async (req, res) => {
  try {
    const cvId = req.params.id;
    const updatedCV = await cvService.updateCV(cvId, req.body);
    if (!updatedCV) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'CV updated successfully',
      data: updatedCV,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a CV by ID
const deleteCV = async (req, res) => {
  try {
    const cvId = req.params.id;
    const deletedCV = await cvService.deleteCV(cvId);
    if (!deletedCV) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'CV deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCV,
  getAllCVs,
  getCVById,
  updateCV,
  deleteCV,
};
