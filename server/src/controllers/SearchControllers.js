const Category = require("../models/Category");
const Level = require("../models/Level");
const Company = require("../models/Company");
const Job = require("../models/Job");
const suggest = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    
    // Create regex pattern for case-insensitive search
    const searchPattern = new RegExp(query, "i");
    
    // Find matching categories
    const categories = await Category.find({
      name: searchPattern,
      active: true,
    })
      .select("name")
      .limit(5);
    
    // Find matching levels
    const levels = await Level.find({
      name: searchPattern,
      active: true,
    })
      .select("name")
      .limit(5);
    
    // Find matching companies
    const companies = await Company.find({
      name: searchPattern,
      active: true,
    })
      .select("name")
      .limit(5);
    
    // Find matching jobs using aggregation pipeline similar to getAllJobs
    const jobsPipeline = [
      // Lookup company
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "companyData",
        },
      },
      // Lookup categories
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      // Lookup level
      {
        $lookup: {
          from: "levels",
          localField: "level",
          foreignField: "_id",
          as: "levelData",
        },
      },
      // Search across multiple fields
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { "companyData.name": { $regex: query, $options: "i" } },
            { "categoryData.name": { $regex: query, $options: "i" } },
            { "levelData.name": { $regex: query, $options: "i" } },
          ],
          // Only include active jobs
          status: "approve",
          end_date: { $gte: new Date() },
        },
      },
      // Sort by creation date (newest first)
      { $sort: { created_at: -1 } },
      // Limit to 5 results
      { $limit: 5 },
      // Project only the requested fields: title, location, and company (name and logo)
      {
        $project: {
          _id: 1,
          title: 1,
          location: 1,
          company: {
            _id: { $arrayElemAt: ["$companyData._id", 0] },
            name: { $arrayElemAt: ["$companyData.name", 0] },
            logo: { $arrayElemAt: ["$companyData.logo", 0] },
          },
        },
      },
    ];
    
    const jobs = await Job.aggregate(jobsPipeline);
    
    // Prepare suggestions by combining all sources and limiting to 5 total
    const allSuggestions = [
      ...categories.map(cat => ({ type: 'category', name: cat.name })),
      ...levels.map(level => ({ type: 'level', name: level.name })),
      ...companies.map(company => ({ type: 'company', name: company.name }))
    ];
    
    // Shuffle and limit to 5 items
    const suggests = allSuggestions
      .sort(() => 0.5 - Math.random()) // Simple shuffle
      .slice(0, 5)
      .map(item => item.name);
    
    return res.status(200).json({
      success: true,
      data: {
        suggests,
        jobs,
      },
    });
  } catch (error) {
    console.error("Error in suggestion API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
module.exports = {
  suggest,
};
