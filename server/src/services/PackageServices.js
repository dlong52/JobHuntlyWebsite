const Package = require('../models/Package');

// Create a new package
const createPackage = async (packageData) => {
  try {
    const newPackage = new Package(packageData);
    return await newPackage.save();
  } catch (error) {
    throw new Error('Failed to create package');
  }
};

// Get all packages with optional filters
const getAllPackages = async (filters = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc' } = options;
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const skip = (page - 1) * limit;

    const packages = await Package.find(filters).sort(sort).skip(skip).limit(parseInt(limit));
    const total = await Package.countDocuments(filters);

    return { packages, total, page, limit };
  } catch (error) {
    throw new Error('Failed to fetch packages');
  }
};

// Get a package by ID
const getPackageById = async (packageId) => {
  try {
    return await Package.findById(packageId);
  } catch (error) {
    throw new Error('Failed to fetch package');
  }
};

// Update a package by ID
const updatePackage = async (packageId, packageData) => {
  try {
    return await Package.findByIdAndUpdate(packageId, packageData, { new: true });
  } catch (error) {
    throw new Error('Failed to update package');
  }
};

// Delete a package by ID
const deletePackage = async (packageId) => {
  try {
    return await Package.findByIdAndDelete(packageId);
  } catch (error) {
    throw new Error('Failed to delete package');
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
