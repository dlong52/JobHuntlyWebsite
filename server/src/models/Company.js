const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  website: { type: String },
  logo: { type: String },
  cover: { type: String }, 
  description: { type: String },
  active: { type: Boolean, default: true },
  introduce: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  staff_quantity: {
    min: { type: Number },
    max: { type: Number },
  },
  address: {
    province: {
      id: { type: String },
      name: { type: String },
    },
    district: {
      id: { type: String },
      name: { type: String },
    },
    ward: {
      id: { type: String },
      name: { type: String },
    },
    additional_info: { type: String },
  },
  is_featured: { type: Boolean, default: false },
  phone: { type: String },
  isVerifiedPhone: { type: Boolean },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
