const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  province: { type: String, required: true },
  dictrict: { type: String, required: true },
  ward: { type: String, required: true },
  additional_info: { type: String },
});

module.exports = mongoose.model("Address", addressSchema);
