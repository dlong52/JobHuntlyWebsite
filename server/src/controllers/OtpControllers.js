const otpService = require("../services/OtpServices");

const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  const response = await otpService.sendOTP(phoneNumber);
  return res.status(response.success ? 200 : 500).json(response);
};

const verifyOTP = async (req, res) => {
  const { phoneNumber, otpCode } = req.body;
  const response = await otpService.verifyOTP(phoneNumber, otpCode);
  return res.status(response.success ? 200 : 400).json(response);
};

module.exports = { sendOTP, verifyOTP };
