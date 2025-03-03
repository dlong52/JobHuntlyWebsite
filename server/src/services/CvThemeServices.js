const CvTheme = require("../models/CvTheme");

const createCvTheme = async (data) => {
  return await CvTheme.create(data);
};

const getAllCvThemes = async (filters = {}, options = {}) => {
  const { page = 1, limit = 10, sortBy = "created_at", order = "desc" } = options;
  const sort = { [sortBy]: order === "desc" ? -1 : 1 };

  const query = {};
  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }
  if (filters.active !== undefined) {
    query.active = filters.active === "true";
  }

  const skip = (page - 1) * limit;
  const cvThemes = await CvTheme.find(query).sort(sort).skip(skip).limit(parseInt(limit));
  const total = await CvTheme.countDocuments(query);

  return { cvThemes, total, page, limit };
};

const getCvThemeById = async (id) => {
  return await CvTheme.findById(id);
};

const updateCvTheme = async (id, data) => {
  return await CvTheme.findByIdAndUpdate(id, data, { new: true });
};

const deleteCvTheme = async (id) => {
  const result = await CvTheme.findByIdAndDelete(id);
  return result !== null;
};

module.exports = {
  createCvTheme,
  getAllCvThemes,
  getCvThemeById,
  updateCvTheme,
  deleteCvTheme,
};
