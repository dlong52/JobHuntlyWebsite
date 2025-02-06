const Job = require("../models/Job");

const createJob = async (jobData) => {
  const job = new Job(jobData);
  return await job.save();
};

const getAllJobs = async (filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    order = "desc",
  } = options;

  const sort = { [sortBy]: order === "desc" ? -1 : 1 };

  const query = {};
  if (filters.title) {
    query.title = { $regex: filters.title, $options: "i" };
  }
  if (filters.location) {
    query["location.province"] = { $regex: filters.location, $options: "i" };
  }
  if (filters.employment_type) {
    query.employment_type = filters.employment_type;
  }
  if (filters.min_salary && filters.max_salary) {
    query["salary.min"] = { $gte: filters.min_salary };
    query["salary.max"] = { $lte: filters.max_salary };
  }
  if (filters.posted_by) {
    query.posted_by = filters.posted_by;
  }
  if (filters.company) {
    query.company = filters.company;
  }
  const skip = (page - 1) * limit;

  const jobs = await Job.find(query)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate({
      path: "posted_by",
    })
    .populate("applications")
    .populate("company")
    .populate("categories");

  const total = await Job.countDocuments(query);
  return { jobs, total, page, limit };
};

const getJobById = async (id) => {
  return await Job.findById(id)
    .populate({
      path: "posted_by",
      populate: {
        path: "company",
        model: "Company",
      },
    })
    .populate("applications")
    .populate("categories")
    .populate("level");
};

const updateJob = async (id, jobData) => {
  jobData.updated_at = Date.now();
  return await Job.findByIdAndUpdate(id, jobData, { new: true });
};

const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
