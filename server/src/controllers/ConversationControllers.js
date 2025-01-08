const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const createConversation = async (req, res) => {
  const { participants, job_id } = req.body;

  try {
    let conversation = await Conversation.findOne({ participants, job_id });
    if (!conversation) {
      conversation = await Conversation.create({ participants, job_id });
    }
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMessageByConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({
      conversation_id: conversationId,
    }).sort({ sent_at: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, conversation_id, job_id, message } = req.body;

  try {
    const newMessage = await Message.create({
      sender_id,
      receiver_id,
      conversation_id,
      job_id,
      message,
      sent_at: new Date(),
    });

    // Cập nhật tin nhắn cuối cùng của cuộc trò chuyện
    await Conversation.findByIdAndUpdate(conversation_id, {
      last_message: {
        message_id: newMessage._id,
        text: newMessage.message,
        sent_at: newMessage.sent_at,
      },
      updated_at: new Date(),
    });

    res.status(201).json(newMessage);

    // Emit tin nhắn tới client qua Socket.io
    io.to(conversation_id).emit("newMessage", newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createConversation,
    getMessageByConversation,
    sendMessage,
}