const express = require("express");
const nodemailerRouter = express.Router();
const nodemailerController = require("../controllers/NodemailerControllers");

nodemailerRouter.post("/cv-viewed", nodemailerController.cvViewed);
nodemailerRouter.post("/send-verify", nodemailerController.sendEmailVerification);
nodemailerRouter.post("/send-change-password", nodemailerController.sendEmailChangePassword);
nodemailerRouter.get("/verify-account", nodemailerController.verifyAccount);
nodemailerRouter.get("/send-invoice", nodemailerController.sendInvoice);
  
module.exports = nodemailerRouter;
