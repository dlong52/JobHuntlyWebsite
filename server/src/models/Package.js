const mongoose = require("mongoose");
const { PACKAGE_CODE } = require("../constants/enum");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  package_code: {
    type: String,
    required: true,
    enum: [
      PACKAGE_CODE.ECO,
      PACKAGE_CODE.PRO,
      PACKAGE_CODE.MAX,
      PACKAGE_CODE.MAX_PLUS,
    ],
  }, 
  introduce: { type: String },
  discount: { type: Number },
  description: { type: String },
  price: { type: Number, required: true },
  job_post_limit: { type: Number, required: true },
  duration_in_days: { type: Number, required: true },
  is_featured: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  features: [{ type: String }],
  icon: { type: String },
  image_description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

packageSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Package", packageSchema);
