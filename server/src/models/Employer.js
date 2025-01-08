// models/Employer.js
const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true
  },
  industry: {
    type: String
  },
  address: {
    province: { type: String },
    district: { type: String },
    ward: { type: String },
    specific_address: { type: String }
  },
  description: { type: String },
  website: { type: String },
  contact_email: { type: String },
  jobs_posted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employer', employerSchema);
