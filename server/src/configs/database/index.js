const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (e) {
    console.error("❌ MongoDB connection failed", e);
    process.exit(1); // Thoát chương trình nếu kết nối thất bại
  }
};

module.exports = { connect };
