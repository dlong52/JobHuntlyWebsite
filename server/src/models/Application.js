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
  CV: { type: mongoose.Schema.Types.ObjectId, ref: "CV" },
  cv_url: { type: String },
  cover_letter: { type: String },
  isViewed: { type: Boolean, default: false },
  applied_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      STATUS_APPLICANT.UNDER_REVIEW,
      STATUS_APPLICANT.SUITABLE,
      STATUS_APPLICANT.ACCEPT,
      STATUS_APPLICANT.REJECTED,
    ],
    default: "under_review",
  },
});

module.exports = mongoose.model("Application", applicationSchema);
