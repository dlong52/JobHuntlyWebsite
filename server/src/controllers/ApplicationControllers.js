const applicationService = require("../services/ApplicationServices");

// Create new application
const createApplication = async (req, res) => {
  try {
    const application = await applicationService.createApplication(req.body);
    res.status(201).json({
      status: "success",
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications with pagination & filters
const getAllApplications = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || "applied_date",
      order: order || "desc",
    };
    const result = await applicationService.getAllApplications(filters, options);
    res.status(200).json({
      status: "success",
      message: "Applications retrieved successfully",
      data: result.applications,
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

// Get application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await applicationService.getApplicationById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Application retrieved successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application
const updateApplication = async (req, res) => {
  try {
    const application = await applicationService.updateApplication(req.params.id, req.body);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const application = await applicationService.deleteApplication(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
