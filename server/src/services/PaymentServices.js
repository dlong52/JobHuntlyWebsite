const Payment = require('../models/Payment');

// Create a new payment
const createPayment = async (paymentData) => {
  try {
    const newPayment = new Payment(paymentData);
    return await newPayment.save();
  } catch (error) {
    throw new Error('Failed to create payment');
  }
};

// Get all payments with optional filters
const getAllPayments = async (filters = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc' } = options;
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const skip = (page - 1) * limit;

    const payments = await Payment.find(filters)
      .populate('user_id')
      .populate('subscription_id')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Payment.countDocuments(filters);

    return { payments, total, page, limit };
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

// Get a payment by ID
const getPaymentById = async (paymentId) => {
  try {
    return await Payment.findById(paymentId)
      .populate('user_id')
      .populate('subscription_id');
  } catch (error) {
    throw new Error('Failed to fetch payment');
  }
};

// Update a payment by ID
const updatePayment = async (paymentId, paymentData) => {
  try {
    return await Payment.findByIdAndUpdate(paymentId, paymentData, { new: true });
  } catch (error) {
    throw new Error('Failed to update payment');
  }
};

// Delete a payment by ID
const deletePayment = async (paymentId) => {
  try {
    return await Payment.findByIdAndDelete(paymentId);
  } catch (error) {
    throw new Error('Failed to delete payment');
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
