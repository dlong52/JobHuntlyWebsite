const { default: mongoose } = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");

// Get all packages
const OverviewHr = async (req, res) => {
  const companyId = req.params.id;
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Đếm số lượng đơn có status = "accept"
    const acceptedCount = await Application.countDocuments({
      status: "accept",
      company: companyId,
    });

    // Đếm số lượng đơn có applied_date trong 7 ngày gần đây
    const recentApplicationsCount = await Application.countDocuments({
      applied_date: { $gte: thirtyDaysAgo },
      company: companyId,
    });

    // Đếm số lượng job đang được xem
    const jobViewingCount = await Job.countDocuments({
      status: "approve",
      company: companyId,
    });

    // Thống kê số lượng application theo từng ngày trong 30 ngày gần nhất
    const applicationsPerDay = await Application.aggregate([
      {
        $match: {
          applied_date: { $gte: thirtyDaysAgo },
          company: new mongoose.Types.ObjectId(companyId), // Chuyển companyId thành ObjectId
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$applied_date" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sắp xếp theo ngày tăng dần
      },
    ]);

    return res.json({
      status: "success",
      message: "Get data successfully",
      data: {
        accepted_count: acceptedCount,
        recent_applications_count: recentApplicationsCount,
        job_viewing_count: jobViewingCount,
        applications_per_day: applicationsPerDay, // Mảng chứa dữ liệu theo từng ngày
      },
    });
  } catch (error) {
    console.error("Error fetching application stats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { OverviewHr };

