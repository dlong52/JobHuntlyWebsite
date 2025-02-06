const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      user_id: mongoose.Schema.Types.ObjectId,
      username: String,
      role: String,
    },
  ],
  last_message: {
    content: String,
    sender_id: mongoose.Schema.Types.ObjectId,
    timestamp: Date,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);
