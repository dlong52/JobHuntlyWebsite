const express = require("express");
const paymentRouter = express.Router();
const PaymentController = require("../controllers/PaymentControllers");

paymentRouter.post("", PaymentController.createPayment);
paymentRouter.put("/:id", PaymentController.updatePayment);
paymentRouter.get("", PaymentController.getAllPayments);
paymentRouter.get("/summary", PaymentController.getPaymentSummary);
paymentRouter.get("/revenue-by-package", PaymentController.getRevenueByPackage);
paymentRouter.get("/:id", PaymentController.getPaymentById);
paymentRouter.delete("/:id", PaymentController.deletePayment);

module.exports = paymentRouter;
