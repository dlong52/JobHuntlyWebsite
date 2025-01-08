const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  CV: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
  cover_letter: { type: String },
  applied_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['under_review', 'accepted', 'rejected'], default: 'under_review' }
});

module.exports = mongoose.model('Application', applicationSchema);
