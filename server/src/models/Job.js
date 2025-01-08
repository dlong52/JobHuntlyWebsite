const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  experience: { type: String, required: true},
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  salary: {
    min: Number,
    max: Number
  },
  status: { type: Boolean, required: true, default: false },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  employment_type: { type: String, enum: ['full-time', 'part-time', 'internship'] },
  posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Tham chiếu đến Category
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
