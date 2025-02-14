const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fcmToken: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  password: {
    type: String,
    required: function () {
      return this.account_type === "default";
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
      return this.account_type === "google";
    },
    unique: true,
    sparse: true,
  },
  profile: {
    name: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    description: {
      type: String,
    },
    birthday: { type: Date },
    avatar_url: { type: String },
    address: {
      province: {
        id: { type: String },
        name: { type: String },
      },
      district: {
        id: { type: String },
        name: { type: String },
      },
      ward: {
        id: { type: String },
        name: { type: String },
      },
      additional_info: { type: String },
    },
    applied_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    created_cvs: [{ type: mongoose.Schema.Types.ObjectId, ref: "CV" }],
  },
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
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

userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
