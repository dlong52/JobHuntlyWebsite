const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  cv_name: { type: String, require: true },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvTheme",
    required: true,
  },
  profile: {
    avatar: { type: String },
    birthday: { type: String },
    name: { type: String },
    email: { type: String },
    phone_number: { type: String },
    address: { type: String },
    website: { type: String },
  },
  position: { type: String },
  objective: { type: String },
  work_experiences: [
    {
      company: { type: String },
      from_date: { type: String },
      to_date: { type: String },
      position: { type: String },
      experience_des: { type: String },
    },
  ],
  projects: [
    {
      project_name: { type: String },
      from_date: { type: String },
      to_date: { type: String },
      customer_name: { type: String },
      team_size: { type: Number },
      position_project: { type: String },
      technology_des: { type: String },
    },
  ],
  education: [
    {
      school_name: { type: String },
      from_date: { type: String },
      to_date: { type: String },
      courses: { type: String },
      education_des: { type: String },
    },
  ],
  skills: [
    {
      skill_name: { type: String },
      skill_des: { type: String },
    },
  ],
  interests: { type: String },
  certifications: [
    {
      time: { type: String },
      certification_name: { type: String },
    },
  ],
  honors_awards: [
    {
      time: { type: String },
      award_name: { type: String },
    },
  ],
  // created_at: { type: Date, default: Date.now },
  // updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CV", cvSchema);
