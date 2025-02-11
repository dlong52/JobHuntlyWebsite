const mongoose = require("mongoose");
const { EmploymentType } = require("../constants/enum");
const mongooseElasticsearch = require("mongoose-elasticsearch-xp");
const { client } = require("../configs/elasticsearch");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  experience: { type: Number, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  job_benefit: { type: String, required: true },
  quantity: { type: Number, required: true },
  work_time: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"] },
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
  salary: {
    min: Number,
    max: Number,
  },
  status: { type: Boolean, required: true, default: false },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  location: {
    province: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
    district: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
    ward: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
    additional_info: { type: String, required: true },
  },
  employment_type: {
    type: String,
    enum: [EmploymentType.FULL_TIME, EmploymentType.PART_TIME],
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

// JobSchema.plugin(mongooseElasticsearch, {
//   client,
//   index: "jobs",
//   op_type: "job",
// });

module.exports = mongoose.model("Job", JobSchema);
