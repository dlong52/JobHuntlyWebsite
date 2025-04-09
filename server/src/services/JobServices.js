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

  // Handle searchName parameter (searching across title, company name, and category name)
  if (filters.searchName) {
    // We'll need to use aggregation for this kind of complex search
    const pipeline = [];
    
    // Match stage for basic filters
    const matchStage = {};
    
    // Add existing filters to the match stage
    if (filters.title) {
      matchStage.title = { $regex: filters.title, $options: "i" };
    }
    if (filters.location) {
      matchStage["location.province.name"] = {
        $regex: filters.location,
        $options: "i",
      };
    }
    if (filters.employment_type) {
      matchStage.employment_type = filters.employment_type;
    }
    if (filters.status) {
      matchStage.status = filters.status;
    }
    if (filters.level) {
      matchStage.level = filters.level;
    }
    if (filters.min_salary == 0 && filters.max_salary == 0) {
      matchStage["salary.min"] = null;
      matchStage["salary.max"] = null;
    } else if (filters.min_salary || filters.max_salary) {
      matchStage["$or"] = [
        {
          "salary.min": { $lte: filters.max_salary || Infinity },
          "salary.max": { $gte: filters.min_salary || 0 },
        },
      ];
    }
    if (filters.posted_by) {
      matchStage.posted_by = mongoose.Types.ObjectId(filters.posted_by);
    }
    if (filters.category) {
      if (mongoose.Types.ObjectId.isValid(filters.category)) {
        matchStage.categories = mongoose.Types.ObjectId(filters.category);
      } else {
        console.error("Invalid category ID:", filters.category);
      }
    }
    if (filters.company) {
      matchStage.company = mongoose.Types.ObjectId(filters.company);
    }
    if (filters.min_experience == 0 && filters.max_experience == 0) {
      matchStage.experience = null;
    } else {
      if (filters.min_experience) {
        matchStage.experience = { ...matchStage.experience, $gte: filters.min_experience };
      }
      if (filters.max_experience) {
        matchStage.experience = { ...matchStage.experience, $lte: filters.max_experience };
      }
    }
    
    if (filters.package_code) {
      const subscriptions = await Subscription.find()
        .populate("package_id")
        .select("_id package_id");
      const filteredSubscriptions = subscriptions.filter(
        (sub) => sub.package_id?.package_code === filters.package_code
      );
      
      matchStage.subscription_id = {
        $in: filteredSubscriptions.map((sub) => sub._id),
      };
    }
    
    pipeline.push({ $match: matchStage });
    
    // Lookup stages to get related documents for searching
    pipeline.push(
      // Lookup company
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "companyData"
        }
      },
      // Lookup categories
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categoryData"
        }
      }
    );
    
    // Search stage
    pipeline.push({
      $match: {
        $or: [
          { title: { $regex: filters.searchName, $options: "i" } },
          { "companyData.name": { $regex: filters.searchName, $options: "i" } },
          { "categoryData.name": { $regex: filters.searchName, $options: "i" } }
        ]
      }
    });
    
    // Add pagination
    pipeline.push(
      { $sort: sort },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) }
    );
    
    // Populate required fields through lookups
    pipeline.push(
      // Lookup posted_by
      {
        $lookup: {
          from: "users",
          localField: "posted_by",
          foreignField: "_id",
          as: "posted_by"
        }
      },
      { $unwind: { path: "$posted_by", preserveNullAndEmptyArrays: true } },
      
      // Lookup applications
      {
        $lookup: {
          from: "applications",
          localField: "applications",
          foreignField: "_id",
          as: "applications"
        }
      },
      
      // Lookup subscription and package
      {
        $lookup: {
          from: "subscriptions",
          localField: "subscription_id",
          foreignField: "_id",
          as: "subscription_id"
        }
      },
      { $unwind: { path: "$subscription_id", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "packages",
          localField: "subscription_id.package_id",
          foreignField: "_id",
          as: "subscription_id.package_id"
        }
      },
      { $unwind: { path: "$subscription_id.package_id", preserveNullAndEmptyArrays: true } }
    );
    
    // Rename fields to match expected output
    pipeline.push({
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        requirements: 1,
        job_benefit: 1,
        quantity: 1,
        work_time: 1,
        gender: 1,
        subscription_id: 1,
        education: 1,
        level: 1,
        end_date: 1,
        salary: 1,
        status: 1,
        company: { $arrayElemAt: ["$companyData", 0] },
        location: 1,
        employment_type: 1,
        posted_by: 1,
        applications: 1,
        categories: "$categoryData",
        created_at: 1,
        updated_at: 1,
        experience: 1
      }
    });
    
    const jobs = await Job.aggregate(pipeline);
    
    // Count total results for pagination
    const countPipeline = [...pipeline];
    // Remove sort, skip, limit, and project stages for counting
    countPipeline.splice(countPipeline.length - 5); // Remove the last 5 stages
    countPipeline.push({ $count: "total" });
    
    const countResult = await Job.aggregate(countPipeline);
    const total = countResult.length > 0 ? countResult[0].total : 0;
    
    return { jobs, total, page, limit };
  } else {
    // Original implementation for when searchName is not provided
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
        .populate("package_id")
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
  }
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
    .populate({
      path: "company",
      populate: {
        path: "categories",
        select: "name",
      },
    })
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
    status: "approve",
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
