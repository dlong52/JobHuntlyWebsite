const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const sendMessage = async (conversationId, senderId, content, attachments) => {
  const message = new Message({
    conversation_id: conversationId,
    sender_id: senderId,
    content,
    attachments,
    sent_at: new Date()
  });

  const savedMessage = await message.save();

  // Update last message in conversation
  await Conversation.findByIdAndUpdate(conversationId, {
    last_message: {
      content,
      sender_id: senderId,
      timestamp: new Date()
    },
    updated_at: new Date()
  });

  return savedMessage;
};

const getMessagesByConversationId = async (conversationId) => {
  return await Message.find({ conversation_id: conversationId })
    .sort({ sent_at: 1 });
};

module.exports = {
  sendMessage,
  getMessagesByConversationId
};
