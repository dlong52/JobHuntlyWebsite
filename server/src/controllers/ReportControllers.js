const reportService = require("../services/ReportServices");

const createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);
    res.status(201).json({
      status: "success",
      message: "Report created successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = { page, limit, sortBy, order };
    const result = await reportService.getReports(filters, options);
    res.status(200).json({
      status: "success",
      message: "Reports retrieved successfully",
      data: result.reports,
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

const getReportById = async (req, res) => {
  try {
    const report = await reportService.getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ status: "error", message: "Report not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Report retrieved successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateReport = async (req, res) => {
  try {
    const report = await reportService.updateReport(req.params.id, req.body);
    if (!report) {
      return res.status(404).json({ status: "error", message: "Report not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Report updated successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await reportService.deleteReport(req.params.id);
    if (!report) {
      return res.status(404).json({ status: "error", message: "Report not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
};
