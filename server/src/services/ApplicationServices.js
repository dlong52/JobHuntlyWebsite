const Application = require("../models/Application");
const Job = require("../models/Job");

const createApplication = async (data) => {
  try {
    const application = new Application(data);
    await application.save();

    await Job.findByIdAndUpdate(
      data.job,
      { $push: { applications: application._id } },
      { new: true }
    );

    return application;
  } catch (error) {
    throw new Error("Failed to create application");
  }
};

const getAllApplications = async (filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "applied_date",
    order = "desc",
    isDuplicate = true,
  } = options;

  const sort = { [sortBy]: order === "desc" ? -1 : 1 };

  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.candidate) query.candidate = filters.candidate;
  if (filters.company) query.company = filters.company;
  if (filters.job) query.job = filters.job;

  const skip = (page - 1) * limit;

  let applications;
  let total;

  if (isDuplicate) {
    applications = await Application.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("candidate", "profile email")
      .populate({
        path: "job",
        select: "title company posted_by",
        populate: {
          path: "company",
          select: "name logo",
        },
      });

    total = await Application.countDocuments(query);
  } else {
    applications = await Application.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $group: {
          _id: "$job",
          application: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$application" } },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ]);

    total = applications.length;
  }

  return { applications, total, page, limit };
};

const getUserAppliedJobs = async (userId, options) => {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  const jobIds = await Application.find({ candidate: userId })
    .sort({ applied_date: -1 })
    .distinct("job");

  const total = jobIds.length;

  const jobs = await Job.find({
    _id: { $in: jobIds.slice(skip, skip + limit) },
  })
    .select("title company posted_by")
    .populate({
      path: "company",
      select: "name logo",
    });
  return { jobs, total, page, limit };
};

const getApplicationById = async (id) => {
  try {
    return await Application.findById(id)
      .populate("candidate", "profile email")
      .populate("job", "title company")
      .populate({
        path: "cv",
        populate: {
          path: "theme",
          select: "preview_image",
        },
      });
  } catch (error) {
    throw new Error("Application not found");
  }
};

const updateApplication = async (id, updateData) => {
  try {
    return await Application.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error("Failed to update application");
  }
};

const deleteApplication = async (id) => {
  try {
    return await Application.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete application");
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getUserAppliedJobs,
};
