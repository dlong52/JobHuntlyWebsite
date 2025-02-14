const express = require("express");
const paymentRouter = express.Router();
const PaymentController = require("../controllers/PaymentControllers");

paymentRouter.post("", PaymentController.createPayment);
paymentRouter.put("/:id", PaymentController.updatePayment);
paymentRouter.get("", PaymentController.getAllPayments);
paymentRouter.get("/:id", PaymentController.getPaymentById);
paymentRouter.delete("/:id", PaymentController.deletePayment);

module.exports = paymentRouter;
