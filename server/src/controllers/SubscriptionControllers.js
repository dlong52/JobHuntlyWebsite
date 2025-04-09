const mongoose  = require('mongoose');
const subscriptionService = require('../services/SubscriptionServices');
const Subscription = require('../models/Subscription');

// Create a new subscription
const createSubscription = async (req, res) => {
  try {
    const newSubscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Subscription created successfully',
      data: newSubscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || 'created_at',
      order: order || 'desc',
    };

    const result = await subscriptionService.getAllSubscriptions(filters, options);
    res.status(200).json({
      status: 'success',
      message: 'Subscriptions retrieved successfully',
      data: result.subscriptions,
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

// Get a subscription by ID
const getSubscriptionById = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const subscription = await subscriptionService.getSubscriptionById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Subscription retrieved successfully',
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subscription by ID
const updateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const updatedSubscription = await subscriptionService.updateSubscription(subscriptionId, req.body);
    if (!updatedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Subscription updated successfully',
      data: updatedSubscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a subscription by ID
const deleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const deletedSubscription = await subscriptionService.deleteSubscription(subscriptionId);
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Subscription deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const employerActivePackage = async (req, res) => {
  try {
    const { employer_id } = req.params;
    
    // Kiểm tra định dạng ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(employer_id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid employer ID format" 
      });
    }

    const currentDate = new Date();
    
    // Tìm các subscription còn hiệu lực và lấy thông tin package tương ứng
    const activeSubscriptions = await Subscription.aggregate([
      {
        $match: {
          employer_id: new mongoose.Types.ObjectId(employer_id),
          job_post_remaining: { $gt: 0 },
          end_date: { $gt: currentDate },
          status: "active"
        }
      },
      {
        $lookup: {
          from: "packages",
          localField: "package_id",
          foreignField: "_id",
          as: "package"
        }
      },
      {
        $unwind: "$package"
      },
      {
        $project: {
          package_code: "$package.package_code",
          job_post_remaining: 1,
          end_date: 1
        }
      }
    ]);

    // Trả về danh sách các package_code
    return res.status(200).json({
      success: true,
      data: activeSubscriptions.map(sub => ({
        package_code: sub.package_code,
        job_post_remaining: sub.job_post_remaining,
        expire_date: sub.end_date
      }))
    });
    
  } catch (error) {
    console.error("Error fetching active packages:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}
module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  employerActivePackage
};
