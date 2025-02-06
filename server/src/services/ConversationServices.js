const Conversation = require('../models/Conversation');

const createConversation = async (participants) => {
  const conversation = new Conversation({ participants });
  return await conversation.save();
};

const getConversationsByUserId = async (userId) => {
  return await Conversation.find({ 'participants.user_id': userId })
    .sort({ updated_at: -1 });
};

module.exports = {
  createConversation,
  getConversationsByUserId
};
