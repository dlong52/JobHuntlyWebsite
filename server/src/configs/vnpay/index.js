// config/vnpayConfig.js
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  VNP_URL: process.env.VNP_URL, // URL sandbox
  VNP_HASH_SECRET: process.env.VNP_HASH_SECRET,
  VNP_MERCHANT_ID: process.env.VNP_TMN_CODE,
  VNP_RETURN_URL: process.env.VNP_URL,
};
