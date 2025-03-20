const jobService = require("../services/JobServices");

// Create a new job
const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json({
      status: "success",
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || "created_at",
      order: order || "desc",
    };

    const result = await jobService.getAllJobs(filters, options);

    return res.status(200).json({
      status: "success",
      message: "Job list was successfully retrieved",
      data: result.jobs,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Job was successfully retrieved",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await jobService.deleteJob(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getJobCounts = async (req, res) => {
  try {
    const jobCounts = await jobService.getJobCountLast20Days();
    res.status(200).json({
      status: "success",
      message: "Job was successfully retrieved",
      data: jobCounts,
    });
  } catch (error) {
    console.error("Error fetching jobs count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobCounts
};
