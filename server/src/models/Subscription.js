const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date },
  job_post_remaining: { type: Number, required: true },
  status: { type: String, enum: ['active', 'expired'], default: 'active' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
