const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  password: {
    type: String,
    required: function () {
      return this.account_type === "default"; // Required nếu account_type là 'default'
    },
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  gender: { type: String, enum: ["male", "female"] },
  account_type: {
    type: String,
    enum: ["google", "default"],
    default: "default",
    required: true,
  },
  firebaseUid: {
    type: String,
    required: function () {
      return this.account_type === "google"; // Required nếu account_type là 'google'
    },
    unique: true,
    sparse: true, // Unique nhưng chỉ áp dụng với non-null values
  },
  profile: {
    name: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    address: {
      province: { type: String },
      district: { type: String },
      ward: { type: String },
      specific_address: { type: String },
    },
    applied_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    created_cvs: [{ type: mongoose.Schema.Types.ObjectId, ref: "CV" }],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware để cập nhật 'updated_at' trước khi lưu tài liệu
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
