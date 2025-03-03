const cvThemeService = require("../services/CvThemeServices");

const createCvTheme = async (req, res) => {
  try {
    const cvTheme = await cvThemeService.createCvTheme(req.body);
    res.status(201).json({ status: "success", message: "CvTheme created", data: cvTheme });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getAllCvThemes = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || "created_at",
      order: order || "desc",
    };

    const result = await cvThemeService.getAllCvThemes(filters, options);
    res.status(200).json({
      status: "success",
      message: "CvThemes retrieved",
      data: result.cvThemes,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getCvThemeById = async (req, res) => {
  try {
    const cvTheme = await cvThemeService.getCvThemeById(req.params.id);
    if (!cvTheme) {
      return res.status(404).json({ status: "error", message: "CvTheme not found" });
    }
    res.status(200).json({ status: "success", data: cvTheme });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateCvTheme = async (req, res) => {
  try {
    const cvTheme = await cvThemeService.updateCvTheme(req.params.id, req.body);
    if (!cvTheme) {
      return res.status(404).json({ status: "error", message: "CvTheme not found" });
    }
    res.status(200).json({ status: "success", message: "CvTheme updated", data: cvTheme });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteCvTheme = async (req, res) => {
  try {
    const deleted = await cvThemeService.deleteCvTheme(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "CvTheme not found" });
    }
    res.status(200).json({ status: "success", message: "CvTheme deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createCvTheme,
  getAllCvThemes,
  getCvThemeById,
  updateCvTheme,
  deleteCvTheme,
};
