const subscriptionService = require('../services/SubscriptionServices');

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

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
