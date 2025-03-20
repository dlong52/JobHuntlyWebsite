const Job = require("../models/Job");
const moment = require("moment");
const mongoose = require("mongoose");
const Subscription = require("../models/Subscription");
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
  if (filters.status) {
    query.status = filters.status;
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
  if (filters.category) {
    if (mongoose.Types.ObjectId.isValid(filters.category)) {
      query.categories = filters.category;
    } else {
      console.error("Invalid category ID:", filters.category);
    }
  }
  if (filters.company) {
    query.company = filters.company;
  }
  if (filters.min_experience == 0 && filters.max_experience == 0) {
    query.experience = null;
  } else {
    if (filters.min_experience) {
      query.experience = { ...query.experience, $gte: filters.min_experience };
    }
    if (filters.max_experience) {
      query.experience = { ...query.experience, $lte: filters.max_experience };
    }
  }

  if (filters.package_code) {
    const subscriptions = await Subscription.find()
      .populate("package_id") // Populate để lấy đầy đủ thông tin
      .select("_id package_id");
    const filteredSubscriptions = subscriptions.filter(
      (sub) => sub.package_id?.package_code === filters.package_code
    );

    query.subscription_id = {
      $in: filteredSubscriptions.map((sub) => sub._id),
    };
  }

  const skip = (page - 1) * limit;
  const jobs = await Job.find(query)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("posted_by")
    .populate("applications")
    .populate("company")
    .populate("categories")
    .populate({
      path: "subscription_id",
      populate: { path: "package_id" },
    });

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
    .populate("level")
    .populate("company")
    .populate({
      path: "subscription_id",
      populate: {
        path: "package_id",
        select: "name",
      },
    });
};

const updateJob = async (id, jobData) => {
  jobData.updated_at = Date.now();
  return await Job.findByIdAndUpdate(id, jobData, { new: true });
};

const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};
const getJobCountLast20Days = async () => {
  const today = moment().startOf("day");
  const startDate = today.clone().subtract(19, "days");

  // Lấy danh sách job có end_date chưa quá hạn, status = true, và có create_at hợp lệ
  const jobs = await Job.find({
    end_date: { $gte: startDate.toDate() },
    status: true,
  }).select("end_date created_at");

  // Tạo danh sách ngày và đếm số lượng job
  const jobCounts = [];

  for (let i = 0; i < 20; i++) {
    const date = startDate.clone().add(i, "days").format("YYYY-MM-DD");

    // Lọc job có end_date >= date và create_at <= date
    const count = jobs.filter(
      (job) =>
        moment(job.end_date).isSameOrAfter(date, "day") &&
        moment(job.created_at).isSameOrBefore(date, "day")
    ).length;

    jobCounts.push({ date, jobs: count });
  }

  return jobCounts;
};
module.exports = {
  getJobCountLast20Days,
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
