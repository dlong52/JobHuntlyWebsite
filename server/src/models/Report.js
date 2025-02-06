const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reported_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  report_type: { type: String, enum: ["company", "job"], required: true },
  report_company_target_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  report_job_target_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  reason: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Validate report_type logic
reportSchema.pre("save", function (next) {
  if (this.report_type === "company" && !this.report_company_target_id) {
    return next(new Error("Company target ID is required for report type 'company'"));
  }
  if (this.report_type === "job" && !this.report_job_target_id) {
    return next(new Error("Job target ID is required for report type 'job'"));
  }
  next();
});

module.exports = mongoose.model("Report", reportSchema);
