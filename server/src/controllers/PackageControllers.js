const packageService = require('../services/PackageServices');

// Create a new package
const createPackage = async (req, res) => {
  try {
    const newPackage = await packageService.createPackage(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Package created successfully',
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || "created_at",
      order: order || "desc",
    };

    const result = await packageService.getAllPackages(filters, options);
    res.status(200).json({
      status: "success",
      data: result.packages,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a package by ID
const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    const package = await packageService.getPackageById(packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Package retrieved successfully',
      data: package,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a package by ID
const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const updatedPackage = await packageService.updatePackage(packageId, req.body);
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Package updated successfully',
      data: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a package by ID
const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const deletedPackage = await packageService.deletePackage(packageId);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Package deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
