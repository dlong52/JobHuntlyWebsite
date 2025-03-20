const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: { type: String },
      role: { type: String },
    },
  ],
  last_message: {
    content: { type: String },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);
