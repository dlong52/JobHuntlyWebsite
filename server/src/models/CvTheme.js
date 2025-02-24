const mongoose = require("mongoose");

const CvThemeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  active: { type: Boolean, default: true },
  preview_image: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
CvThemeSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("CvTheme", CvThemeSchema);
