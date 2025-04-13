const { default: mongoose } = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");
const Package = require('../models/Package');
const { STATUS_APPLICANT } = require("../constants/enum");

// Get all packages
const OverviewHr = async (req, res) => {
  const companyId = req.params.id;
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Đếm số lượng đơn có status = "accept"
    const acceptedCount = await Application.countDocuments({
      status: STATUS_APPLICANT.ACCEPT,
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
const countJobByPackage = async (req, res) => {
  try {
    const { posted_by } = req.query;
    
    // Build match criteria
    const matchCriteria = {};
    if (posted_by) {
      matchCriteria.posted_by = new mongoose.Types.ObjectId(posted_by);
    }
    
    // Aggregate pipeline to join jobs with subscriptions and packages
    const jobCountsByPackage = await Job.aggregate([
      // Match jobs based on filter criteria
      { $match: matchCriteria },
      
      // Join with subscription data
      {
        $lookup: {
          from: 'subscriptions',
          localField: 'subscription_id',
          foreignField: '_id',
          as: 'subscription'
        }
      },
      { $unwind: '$subscription' },
      
      // Join with package data
      {
        $lookup: {
          from: 'packages',
          localField: 'subscription.package_id',
          foreignField: '_id',
          as: 'package'
        }
      },
      { $unwind: '$package' },
      
      // Group by package to count jobs
      {
        $group: {
          _id: '$package._id',
          package_name: { $first: '$package.name' },
          package_code: { $first: '$package.package_code' },
          job_count: { $sum: 1 }
        }
      },
      
      // Add additional package information
      {
        $lookup: {
          from: 'packages',
          localField: '_id',
          foreignField: '_id',
          as: 'packageDetails'
        }
      },
      { $unwind: '$packageDetails' },
      
      // Project only needed fields
      {
        $project: {
          _id: 1,
          package_name: 1,
          package_code: 1,
          job_count: 1,
          price: '$packageDetails.price',
          job_post_limit: '$packageDetails.job_post_limit',
          duration_in_days: '$packageDetails.duration_in_days'
        }
      },
      
      // Sort by job count descending
      { $sort: { job_count: -1 } }
    ]);
    
    // Get total count of jobs matching criteria
    const totalJobs = await Job.countDocuments(matchCriteria);
    
    // Get all packages to include those with zero jobs
    const allPackages = await Package.find({}, {
      name: 1,
      package_code: 1,
      price: 1,
      job_post_limit: 1,
      duration_in_days: 1
    });
    
    // Create a map of existing job counts
    const jobCountMap = {};
    jobCountsByPackage.forEach(pkg => {
      jobCountMap[pkg._id.toString()] = pkg;
    });
    
    // Add packages with zero jobs
    const completeResults = allPackages.map(pkg => {
      const pkgId = pkg._id.toString();
      if (jobCountMap[pkgId]) {
        return jobCountMap[pkgId];
      } else {
        return {
          _id: pkg._id,
          package_name: pkg.name,
          package_code: pkg.package_code,
          job_count: 0,
          price: pkg.price,
          job_post_limit: pkg.job_post_limit,
          duration_in_days: pkg.duration_in_days
        };
      }
    });
    
    // Return response
    return res.status(200).json({
      success: true,
      data: {
        total_jobs: totalJobs,
        packages: completeResults
      }
    });
    
  } catch (error) {
    console.error('Error getting job counts by package:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve job counts by package',
      error: error.message
    });
  }
}
module.exports = { OverviewHr, countJobByPackage };

