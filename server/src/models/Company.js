const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  website: { type: String },
  logo: { type: String },
  description: { type: String },
  address: {
    province: { type: String },
    district: { type: String },
    ward: { type: String },
    specific_address: { type: String },
  },
  phone: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);   
