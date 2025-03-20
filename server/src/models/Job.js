const mongoose = require("mongoose");
const Subscription = require("./Subscription");
const Category = require("./Category");
const { EmploymentType } = require("../constants/enum");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  experience: { type: Number },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  job_benefit: { type: String, required: true },
  quantity: { type: Number, required: true },
  work_time: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"] },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  education: {
    type: String,
    enum: [
      "intermediate",
      "college",
      "university",
      "engineer",
      "master",
      "doctor",
    ],
  },
  level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
  end_date: { type: Date, required: true },
  salary: { min: Number, max: Number },
  status: { type: Boolean, required: true, default: false },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  location: {
    province: { id: String, name: String },
    district: { id: String, name: String },
    ward: { id: String, name: String },
    additional_info: { type: String, required: true },
  },
  employment_type: {
    type: String,
    enum: [
      EmploymentType.FULL_TIME,
      EmploymentType.PART_TIME,
      EmploymentType.CONTRACT,
    ],
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

JobSchema.pre("save", async function (next) {
  if (this.isNew) {
    if (this.categories && this.categories.length > 0) {
      await Category.updateMany(
        { _id: { $in: this.categories } },
        { $inc: { job_count: 1 } }
      );
    }

    if (this.subscription_id) {
      const subscription = await Subscription.findById(this.subscription_id);
      if (subscription) {
        subscription.job_post_remaining -= 1;
        if (subscription.job_post_remaining <= 0) {
          subscription.status = "expired";
        }
        await subscription.save();
      }
    }
  }
  next();
});
JobSchema.pre("remove", async function (next) {
  if (this.categories && this.categories.length > 0) {
    await Category.updateMany(
      { _id: { $in: this.categories } },
      { $inc: { job_count: -1 } }
    );
  }
  next();
});

module.exports = mongoose.model("Job", JobSchema);
