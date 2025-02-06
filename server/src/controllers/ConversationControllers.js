const conversationService = require('../services/ConversationServices');

const createConversation = async (req, res) => {
  try {
    const { participants } = req.body;
    const conversation = await conversationService.createConversation(participants);
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConversationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await conversationService.getConversationsByUserId(userId);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createConversation,
  getConversationsByUserId
};
