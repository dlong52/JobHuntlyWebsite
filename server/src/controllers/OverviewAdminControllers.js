const Job = require('../models/Job');
const User = require('../models/UserModel');
const Company = require('../models/Company');
const mongoose = require('mongoose');
const Application = require('../models/Application');
const { default: moment } = require('moment');
const overviewAdmin = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Calculate current month start and end dates
      const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      
      // Calculate previous month start and end dates
      const previousMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const previousMonthEnd = new Date(currentMonthStart);
      previousMonthEnd.setDate(previousMonthEnd.getDate() - 1);
  
      // Get active jobs count for today (status = true and end_date > current date)
      const activeJobsToday = await Job.countDocuments({
        status: true,
        end_date: { $gte: today }
      });
  
      // Get active jobs count for yesterday
      const activeJobsYesterday = await Job.countDocuments({
        status: true,
        end_date: { $gte: yesterday },
        created_at: { $lt: today }
      });
  
      // Calculate job growth percentage
      const jobGrowthPercentage = activeJobsYesterday > 0 
        ? ((activeJobsToday - activeJobsYesterday) / activeJobsYesterday * 100).toFixed(2)
        : 100;
  
      // Get users created in current month
      const usersCurrentMonth = await User.countDocuments({
        created_at: { $gte: currentMonthStart, $lt: nextMonthStart }
      });
      
      // Get users created in previous month
      const usersPreviousMonth = await User.countDocuments({
        created_at: { $gte: previousMonthStart, $lt: currentMonthStart }
      });
  
      // Calculate user growth percentage
      const userGrowthPercentage = usersPreviousMonth > 0
        ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth * 100).toFixed(2)
        : 100;
  
      // Get companies created in current month
      const companiesCurrentMonth = await Company.countDocuments({
        created_at: { $gte: currentMonthStart, $lt: nextMonthStart }
      });
      
      // Get companies created in previous month
      const companiesPreviousMonth = await Company.countDocuments({
        created_at: { $gte: previousMonthStart, $lt: currentMonthStart }
      });
  
      // Calculate company growth percentage
      const companyGrowthPercentage = companiesPreviousMonth > 0
        ? ((companiesCurrentMonth - companiesPreviousMonth) / companiesPreviousMonth * 100).toFixed(2)
        : 100;
  
      res.status(200).json({
        success: true,
        data: {
          jobs: {
            count: activeJobsToday,
            growthPercentage: parseFloat(jobGrowthPercentage),
            isIncrease: parseFloat(jobGrowthPercentage) >= 0
          },
          users: {
            count: usersCurrentMonth,
            growthPercentage: parseFloat(userGrowthPercentage),
            isIncrease: parseFloat(userGrowthPercentage) >= 0
          },
          companies: {
            count: companiesCurrentMonth,
            growthPercentage: parseFloat(companyGrowthPercentage),
            isIncrease: parseFloat(companyGrowthPercentage) >= 0
          }
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard statistics',
        error: error.message
      });
    }
  }

module.exports = { overviewAdmin };