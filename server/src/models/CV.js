const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvTheme",
    required: true,
  },
  profile: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
  },
  objective: { type: String },
  work_experiences: [
    {
      company: { type: String, required: true },
      from_date: { type: Date, required: true },
      to_date: { type: Date },
      position: { type: String, required: true },
      experience_des: { type: String },
    },
  ],
  projects: [
    {
      project_name: { type: String, required: true },
      from_date: { type: Date, required: true },
      to_date: { type: Date },
      customer_name: { type: String },
      team_size: { type: Number },
      position_project: { type: String },
      technology_des: { type: String },
    },
  ],
  education: [
    {
      school_name: { type: String, required: true },
      from_date: { type: Date, required: true },
      to_date: { type: Date },
      courses: { type: String },
      education_des: { type: String },
    },
  ],
  skills: [
    {
      skill_name: { type: String, required: true },
      skill_des: { type: String },
    },
  ],
  interests: { type: String },
  references: [
    {
      references_des: { type: String },
    },
  ],
  activities: [
    {
      organization_name: { type: String, required: true },
      from_date: { type: Date, required: true },
      to_date: { type: Date },
      position: { type: String },
      activity_des: { type: String },
    },
  ],
  certifications: [
    {
      time: { type: Date, required: true },
      certification_name: { type: String, required: true },
    },
  ],
  honors_awards: [
    {
      time: { type: Date, required: true },
      award_name: { type: String, required: true },
    },
  ],
  additional_information: [{ type: String }],
});

const CV = mongoose.model("CV", cvSchema);

module.exports = CV;
