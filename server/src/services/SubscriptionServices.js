const Subscription = require('../models/Subscription');

// Create a new subscription
const createSubscription = async (subscriptionData) => {
  try {
    const newSubscription = new Subscription(subscriptionData);
    return await newSubscription.save();
  } catch (error) {
    throw new Error('Failed to create subscription');
  }
};

// Get all subscriptions with optional filters
const getAllSubscriptions = async (filters = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc' } = options;
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const skip = (page - 1) * limit;

    const subscriptions = await Subscription.find(filters)
      .populate('employer_id')
      .populate('package_id')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Subscription.countDocuments(filters);

    return { subscriptions, total, page, limit };
  } catch (error) {
    throw new Error('Failed to fetch subscriptions');
  }
};

// Get a subscription by ID
const getSubscriptionById = async (subscriptionId) => {
  try {
    return await Subscription.findById(subscriptionId)
      .populate('employer_id')
      .populate('package_id');
  } catch (error) {
    throw new Error('Failed to fetch subscription');
  }
};

// Update a subscription by ID
const updateSubscription = async (subscriptionId, subscriptionData) => {
  try {
    return await Subscription.findByIdAndUpdate(subscriptionId, subscriptionData, { new: true });
  } catch (error) {
    throw new Error('Failed to update subscription');
  }
};

// Delete a subscription by ID
const deleteSubscription = async (subscriptionId) => {
  try {
    return await Subscription.findByIdAndDelete(subscriptionId);
  } catch (error) {
    throw new Error('Failed to delete subscription');
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
