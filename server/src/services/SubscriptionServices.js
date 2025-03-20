const Subscription = require("../models/Subscription");
const moment = require("moment");
// Create a new subscription
const createSubscription = async (subscriptionData) => {
  try {
    const newSubscription = new Subscription(subscriptionData);
    return await newSubscription.save();
  } catch (error) {
    throw new Error("Failed to create subscription");
  }
};

// Get all subscriptions with optional filters
const getAllSubscriptions = async (filters = {}, options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      order = "desc",
    } = options;
    const sort = { [sortBy]: order === "desc" ? -1 : 1 };
    const skip = (page - 1) * limit;

    let query = { ...filters };

    // Chỉ lọc subscription còn hạn và job_post_remaining > 0 nếu activeOnly = true
    if (filters.activeOnly && JSON.parse(filters.activeOnly)) {
      const now = new Date();
      query.end_date = { $gt: now }; // Chắc chắn end_date là kiểu Date
      query.job_post_remaining = { $gt: 0 };

      console.log("Applying activeOnly filter:");
      console.log("Current Date:", now);
      console.log("Query before removing activeOnly:", JSON.stringify(query, null, 2));
    }

    // Xóa `activeOnly` khỏi query vì MongoDB không có cột này
    delete query.activeOnly;

    console.log("Final Query:", JSON.stringify(query, null, 2));

    const subscriptions = await Subscription.find(query)
      .populate("package_id") 
      .populate({ path: "employer_id", select: "profile" }) // Chỉ lấy field profile
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Subscription.countDocuments(query);

    return { subscriptions, total, page, limit };
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw new Error("Failed to fetch subscriptions");
  }
};



// Get a subscription by ID
const getSubscriptionById = async (subscriptionId) => {
  try {
    return await Subscription.findById(subscriptionId)
      .populate("employer_id profile email")
      .populate("package_id name");
  } catch (error) {
    throw new Error("Failed to fetch subscription");
  }
};

// Update a subscription by ID
const updateSubscription = async (subscriptionId, subscriptionData) => {
  try {
    return await Subscription.findByIdAndUpdate(
      subscriptionId,
      subscriptionData,
      { new: true }
    );
  } catch (error) {
    throw new Error("Failed to update subscription");
  }
};

// Delete a subscription by ID
const deleteSubscription = async (subscriptionId) => {
  try {
    return await Subscription.findByIdAndDelete(subscriptionId);
  } catch (error) {
    throw new Error("Failed to delete subscription");
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
