const Application = require("../models/Application");

const createApplication = async (data) => {
  try {
    const application = new Application(data);
    return await application.save();
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
  } = options;
  const sort = { [sortBy]: order === "desc" ? -1 : 1 };

  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.candidate) query.candidate = filters.candidate;
  if (filters.job) query.job = filters.job;

  const skip = (page - 1) * limit;

  const applications = await Application.find(query)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("candidate", "profile email")
    .populate("job", "title company");

  const total = await Application.countDocuments(query);
  return { applications, total, page, limit };
};

const getApplicationById = async (id) => {
  try {
    return await Application.findById(id)
      .populate("candidate", "name email")
      .populate("job", "title company");
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
};
