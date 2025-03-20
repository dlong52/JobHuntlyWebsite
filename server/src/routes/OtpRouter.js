const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/OtpControllers");

const otpRouter = express.Router();

otpRouter.post("/send", sendOTP);
otpRouter.post("/verify", verifyOTP);

module.exports = otpRouter;
