const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  last_message: {
    message_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    text: String,
    sent_at: Date
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
