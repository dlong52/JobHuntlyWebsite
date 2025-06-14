const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  employer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  start_date: { type: Date, default: Date.now, required: true },
  end_date: { type: Date, required: true },
  job_post_remaining: { type: Number, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

subscriptionSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  if (
    (this.end_date && this.end_date < Date.now()) ||
    this.job_post_remaining === 0
  ) {
    this.status = "expired";
  }
  next();
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
