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
    query["location.province.name"] = {
      $regex: filters.location,
      $options: "i",
    };
  }
  if (filters.employment_type) {
    query.employment_type = filters.employment_type;
  }
  if (filters.level) {
    query.level = filters.level;
  }
  if (filters.min_salary == 0 && filters.max_salary == 0) {
    query["salary.min"] = null;
    query["salary.max"] = null;
  } else if (filters.min_salary || filters.max_salary) {
    query["$or"] = [
      {
        "salary.min": { $lte: filters.max_salary || Infinity },
        "salary.max": { $gte: filters.min_salary || 0 },
      },
    ];
  }

  if (filters.posted_by) {
    query.posted_by = filters.posted_by;
  }
  const mongoose = require("mongoose");

  if (filters.category) {
    if (mongoose.Types.ObjectId.isValid(filters.category)) {
      query.categories = filters.category; // Nếu categories là một mảng ObjectId, thì lọc theo chính giá trị đó
    } else {
      console.error("Invalid category ID:", filters.category);
    }
  }

  if (filters.company) {
    query.company = filters.company;
  }

  // 🔹 Thêm lọc theo kinh nghiệm
  if (filters.min_experience == 0 && filters.max_experience == 0) {
    query.experience = null; // Chỉ lấy những job có experience = null
  } else {
    if (filters.min_experience) {
      query.experience = { ...query.experience, $gte: filters.min_experience };
    }
    if (filters.max_experience) {
      query.experience = { ...query.experience, $lte: filters.max_experience };
    }
  }

  const skip = (page - 1) * limit;

  const jobs = await Job.find(query)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("posted_by")
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
