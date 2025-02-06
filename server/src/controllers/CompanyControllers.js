const companyService = require('../services/CompanyServices');

// Create a new company
const createCompany = async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Company created successfully',
      data: company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = { page: parseInt(page) || 1, limit: parseInt(limit) || 10, sortBy, order };
    
    const result = await companyService.getAllCompanies(filters, options);
    res.status(200).json({
      status: 'success',
      message: 'Companies retrieved successfully',
      data: result.companies,
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

// Get a company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Company retrieved successfully',
      data: company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a company by ID
const updateCompany = async (req, res) => {
  try {
    const company = await companyService.updateCompany(req.params.id, req.body);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Company updated successfully',
      data: company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a company by ID
const deleteCompany = async (req, res) => {
  try {
    const company = await companyService.deleteCompany(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Company deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
