const Payment = require("../models/Payment");

// Create a new payment
const createPayment = async (paymentData) => {
  try {
    const newPayment = new Payment(paymentData);
    return await newPayment.save();
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

    const payments = await Payment.find(filters)
      .populate({
        path: "user_id",
        populate: {
          path: "company",
          select: "name", // Chỉ lấy trường name trong company
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

    const total = await Payment.countDocuments(filters);

    return { payments, total, page, limit };
  } catch (error) {
    throw new Error("Failed to fetch payments");
  }
};

// Get a payment by ID
const getPaymentById = async (paymentId) => {
  try {
    return await Payment.findById(paymentId)
      .populate("user_id")
      .populate("subscription_id");
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
