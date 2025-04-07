const mongoose = require("mongoose");
const { STATUS_APPLICANT } = require("../constants/enum");

const applicationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  cv: { type: mongoose.Schema.Types.ObjectId, ref: "CV" },
  cv_url: { type: String },
  cover_letter: { type: String },
  isViewed: { type: Boolean, default: false },
  applied_date: { type: Date, default: Date.now },
  recruiters_viewed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: {
    type: String,
    enum: [
      STATUS_APPLICANT.UNDER_REVIEW,
      STATUS_APPLICANT.SUITABLE,
      STATUS_APPLICANT.ACCEPT,
      STATUS_APPLICANT.REJECTED,
      STATUS_APPLICANT.INTERVIEW
    ],
    default: STATUS_APPLICANT.UNDER_REVIEW,
  },
});

// Custom validation: cv hoặc cv_url phải có giá trị
applicationSchema.pre("validate", function (next) {
  if (!this.cv && !this.cv_url) {
    return next(new Error("Ứng viên phải cung cấp CV hoặc đường dẫn CV (cv_url)"));
  }
  next();
});

module.exports = mongoose.model("Application", applicationSchema);
