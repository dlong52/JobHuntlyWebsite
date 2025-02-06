const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  sender_id: mongoose.Schema.Types.ObjectId,
  content: String,
  attachments: [
    {
      file_url: String,
      file_name: String,
    },
  ],
  is_read: { type: Boolean, default: false },
  sent_at: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
