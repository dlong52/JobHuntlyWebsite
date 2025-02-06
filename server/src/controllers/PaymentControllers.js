const paymentService = require('../services/PaymentServices');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const newPayment = await paymentService.createPayment(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Payment created successfully',
      data: newPayment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || 'created_at',
      order: order || 'desc',
    };

    const result = await paymentService.getAllPayments(filters, options);
    res.status(200).json({
      status: 'success',
      message: 'Payments retrieved successfully',
      data: result.payments,
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

// Get a payment by ID
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await paymentService.getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Payment retrieved successfully',
      data: payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const updatedPayment = await paymentService.updatePayment(paymentId, req.body);
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Payment updated successfully',
      data: updatedPayment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const deletedPayment = await paymentService.deletePayment(paymentId);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
