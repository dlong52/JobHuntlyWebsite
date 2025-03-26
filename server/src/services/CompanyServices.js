const Company = require("../models/Company");

// Create a new company
const createCompany = async (companyData) => {
  try {
    const company = new Company(companyData);
    return await company.save();
  } catch (error) {
    throw new Error("Failed to create company: " + error.message);
  }
};

// Get all companies with pagination & filtering
const getAllCompanies = async (filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    order = "desc",
  } = options;
  const sort = { [sortBy]: order === "desc" ? -1 : 1 };

  const query = {};
  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }
  if (filters.province) {
    query["address.province.name"] = { $regex: filters.province, $options: "i" };
  }
  // Add filter by province ID
  if (filters.provinceId) {
    query["address.province.id"] = filters.provinceId;
  }

  const skip = (page - 1) * limit;
  const companies = await Company.find(query)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
  const total = await Company.countDocuments(query);

  return { companies, total, page, limit };
};

// Get a company by ID
const getCompanyById = async (companyId) => {
  try {
    return await Company.findById(companyId).populate("categories");
  } catch (error) {
    throw new Error("Company not found");
  }
};

// Update a company by ID
const updateCompany = async (companyId, updateData) => {
  try {
    return await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Failed to update company");
  }
};

// Delete a company by ID
const deleteCompany = async (companyId) => {
  try {
    return await Company.findByIdAndDelete(companyId);
  } catch (error) {
    throw new Error("Failed to delete company");
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
