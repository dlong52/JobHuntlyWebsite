const { default: mongoose } = require("mongoose");
const Payment = require("../models/Payment");

// Create a new payment
const createPayment = async (paymentData) => {
  try {
    const newPayment = new Payment(paymentData);
    const res =  await newPayment.save();
  } catch (error) {
    throw new Error("Failed to create payment");
  }
};

// Get all payments with optional filters
const getAllPayments = async (filters = {}, options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      order = "desc",
    } = options;

    const sort = { [sortBy]: order === "desc" ? -1 : 1 };
    const skip = (page - 1) * limit;

    // Process filter conditions
    const filterConditions = { ...filters };

    // Handle date range filtering
    if (filters.from_date || filters.to_date) {
      filterConditions.created_at = {};

      if (filters.from_date) {
        filterConditions.created_at.$gte = new Date(filters.from_date);
        delete filterConditions.from_date;
      }

      if (filters.to_date) {
        // Set time to end of day for to_date
        const toDate = new Date(filters.to_date);
        toDate.setHours(23, 59, 59, 999);
        filterConditions.created_at.$lte = toDate;
        delete filterConditions.to_date;
      }
    }

    // Handle searchName filter for name, email, and transaction_id
    if (filters.searchName) {
      // Remove searchName from original filters
      delete filterConditions.searchName;

      // Create aggregation pipeline for search
      const payments = await Payment.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "subscriptions",
            localField: "subscription_id",
            foreignField: "_id",
            as: "subscription",
          },
        },
        {
          $lookup: {
            from: "packages",
            localField: "subscription.package_id",
            foreignField: "_id",
            as: "package",
          },
        },
        {
          $match: {
            $and: [
              filterConditions,
              {
                $or: [
                  {
                    transaction_id: {
                      $regex: filters.searchName,
                      $options: "i",
                    },
                  },
                  {
                    "user.email": { $regex: filters.searchName, $options: "i" },
                  },
                  {
                    "user.profile.name": {
                      $regex: filters.searchName,
                      $options: "i",
                    },
                  },
                ],
              },
            ],
          },
        },
        { $sort: sort },
        { $skip: skip },
        { $limit: parseInt(limit) },
        // Reshape the output to match the original structure
        {
          $project: {
            _id: 1,
            user_id: 1,
            subscription_id: 1,
            amount: 1,
            payment_method: 1,
            transaction_id: 1,
            status: 1,
            created_at: 1,
            user: { $arrayElemAt: ["$user", 0] },
            subscription: { $arrayElemAt: ["$subscription", 0] },
            package: { $arrayElemAt: ["$package", 0] },
          },
        },
      ]);

      // Count total matching documents
      const countPipeline = [
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $match: {
            $and: [
              filterConditions,
              {
                $or: [
                  {
                    transaction_id: {
                      $regex: filters.searchName,
                      $options: "i",
                    },
                  },
                  {
                    "user.email": { $regex: filters.searchName, $options: "i" },
                  },
                  {
                    "user.profile.name": {
                      $regex: filters.searchName,
                      $options: "i",
                    },
                  },
                ],
              },
            ],
          },
        },
      ];

      const totalResults = await Payment.aggregate([
        ...countPipeline,
        { $count: "total" },
      ]);

      const total = totalResults.length > 0 ? totalResults[0].total : 0;

      return {
        payments: payments.map((payment) => ({
          ...payment,
          user_id: payment.user,
          subscription_id: {
            ...payment.subscription,
            package_id: payment.package,
          },
        })),
        total,
        page,
        limit,
      };
    }
    // Handle package_id filter
    else if (filters.package_id) {
      // Remove package_id from original filters to avoid conflicts
      delete filterConditions.package_id;

      // Find subscriptions with the specified package_id
      const subscriptions = await mongoose
        .model("Subscription")
        .find({
          package_id: new mongoose.Types.ObjectId(filters.package_id),
        })
        .select("_id");

      // Get the IDs of matching subscriptions
      const subscriptionIds = subscriptions.map((sub) => sub._id);

      // Add subscription filter to conditions
      filterConditions.subscription_id = { $in: subscriptionIds };

      const payments = await Payment.find(filterConditions)
        .populate({
          path: "user_id",
          populate: {
            path: "company",
            select: "name",
          },
        })
        .populate({
          path: "subscription_id",
          populate: {
            path: "package_id",
            select: "name price",
          },
        })
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Payment.countDocuments(filterConditions);

      return { payments, total, page, limit };
    }
    // Default case - no special filters
    else {
      const payments = await Payment.find(filterConditions)
        .populate({
          path: "user_id",
          populate: {
            path: "company",
            select: "name",
          },
        })
        .populate({
          path: "subscription_id",
          populate: {
            path: "package_id",
            select: "name price",
          },
        })
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Payment.countDocuments(filterConditions);

      return { payments, total, page, limit };
    }
  } catch (error) {
    throw new Error(`Failed to fetch payments: ${error.message}`);
  }
};

// Get a payment by ID
const getPaymentById = async (paymentId) => {
  try {
    return await Payment.findById(paymentId)
      .populate({
        path: "user_id",
        select: "-password",
        populate: {
          path: "company",
          select: "name", 
        },
      })
      .populate({
        path: "subscription_id",
        populate: {
          path: "package_id",
        },
      });
  } catch (error) {
    throw new Error("Failed to fetch payment");
  }
};

// Update a payment by ID
const updatePayment = async (paymentId, paymentData) => {
  try {
    return await Payment.findByIdAndUpdate(paymentId, paymentData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Failed to update payment");
  }
};

// Delete a payment by ID
const deletePayment = async (paymentId) => {
  try {
    return await Payment.findByIdAndDelete(paymentId);
  } catch (error) {
    throw new Error("Failed to delete payment");
  }
};
const getPaymentSummary = async () => {
  try {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);

    const result = await Payment.aggregate([
      {
        $match: {
          created_at: { $gte: startDate, $lte: today },
          status: "success",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return result;
  } catch (error) {
    console.error("Error fetching payment summary:", error);
    throw new Error("Internal Server Error");
  }
};

const getRevenueByPackage = async () => {
  try {
    const result = await Payment.aggregate([
      {
        $match: { status: "success" }, // Chỉ lấy các giao dịch thành công
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "subscription_id",
          foreignField: "_id",
          as: "subscription",
        },
      },
      {
        $unwind: "$subscription", // Giải nén subscription
      },
      {
        $lookup: {
          from: "packages",
          localField: "subscription.package_id",
          foreignField: "_id",
          as: "package",
        },
      },
      {
        $unwind: "$package", // Giải nén package
      },
      {
        $group: {
          _id: "$package.name", // Nhóm theo tên gói dịch vụ
          totalRevenue: { $sum: "$amount" }, // Tính tổng doanh thu
        },
      },
      {
        $sort: { totalRevenue: -1 }, // Sắp xếp giảm dần theo doanh thu
      },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching revenue by package:", error);
    throw new Error("Internal Server Error");
  }
};
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentSummary,
  getRevenueByPackage,
};
