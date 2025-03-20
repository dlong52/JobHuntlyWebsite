const mongoose = require("mongoose");
const {
  syncCategoryToElastic,
  updateCategoryInElastic,
  deleteCategoryFromElastic,
} = require("../sync/syncCategories");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, unique: true },
  description: { type: String },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Middleware cập nhật thời gian
categorySchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Hook đồng bộ Elasticsearch
categorySchema.post("save", syncCategoryToElastic);
categorySchema.post("findOneAndUpdate", updateCategoryInElastic);
categorySchema.post("findOneAndDelete", deleteCategoryFromElastic);

module.exports = mongoose.model("Category", categorySchema);
