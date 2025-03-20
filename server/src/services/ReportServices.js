const Report = require("../models/Report");

const createReport = async (data) => {
  try {
    const existingReport = await Report.findOne({
      reported_by: data.reported_by,
      report_type: data.report_type,
      ...(data.report_type === "company"
        ? { report_company_target_id: data.report_company_target_id }
        : { report_job_target_id: data.report_job_target_id }),
    });

    if (existingReport) {
      throw new Error("Báo cáo của bạn đã được ghi nhận rồi");
    }

    const report = new Report(data);
    return await report.save();
  } catch (error) {
    throw new Error(error.message);
  }
};


const getReports = async (filters = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sortBy = "created_at", order = "desc" } = options;
    const sort = { [sortBy]: order === "desc" ? -1 : 1 };
    const skip = (page - 1) * limit;

    const query = {};
    if (filters.status) query.status = filters.status;
    if (filters.report_type) query.report_type = filters.report_type;

    const reports = await Report.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("reported_by", "profile email")
      .populate("report_company_target_id", "name")
      .populate({
        path: "report_job_target_id",
        select: "title posted_by",
        populate: { path: "company", select: "name _id" }, // Lấy cả name và _id của company trong Job
      });

    const total = await Report.countDocuments(query);
    return { reports, total, page, limit };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getReportById = async (id) => {
  try {
    return await Report.findById(id)
      .populate("reported_by", "name email")
      .populate("report_company_target_id", "name")
      .populate("report_job_target_id", "title");
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateReport = async (id, data) => {
  try {
    return await Report.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReport = async (id) => {
  try {
    return await Report.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
};
