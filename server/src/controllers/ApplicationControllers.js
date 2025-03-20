const { default: mongoose } = require("mongoose");
const { STATUS_APPLICANT } = require("../constants/enum");
const Application = require("../models/Application");
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
const getAppliedJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    const result = await applicationService.getUserAppliedJobs(userId, options);

    res.status(200).json({
      status: "success",
      message: "Applied jobs retrieved successfully",
      data: result.jobs,
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
    const result = await applicationService.getAllApplications(
      filters,
      options
    );
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
    const application = await applicationService.getApplicationById(
      req.params.id
    );
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
    const application = await applicationService.updateApplication(
      req.params.id,
      req.body
    );
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
    const application = await applicationService.deleteApplication(
      req.params.id
    );
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
const getReportApplication = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { days } = req.query; // Lấy số ngày từ query params

    let matchCondition = { company: new mongoose.Types.ObjectId(companyId) };

    // Nếu có tham số days, lọc theo ngày
    if (days) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(days)); // Lấy ngày N ngày trước
      matchCondition.applied_date = { $gte: startDate };
    }

    const stats = await Application.aggregate([
      { $match: matchCondition },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const result = {
      total: 0,
      under_review: 0,
      accept: 0,
      rejected: 0,
      interview: 0,
    };

    stats.forEach((item) => {
      result.total += item.count;
      if (item._id === STATUS_APPLICANT.UNDER_REVIEW)
        result.under_review = item.count;
      if (item._id === STATUS_APPLICANT.ACCEPT) result.accept = item.count;
      if (item._id === STATUS_APPLICANT.REJECTED) result.rejected = item.count;
      if (item._id === STATUS_APPLICANT.INTERVIEW)
        result.interview = item.count;
    });

    res.status(200).json({
      status: "success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getAppliedJobs,
  getReportApplication,
};
