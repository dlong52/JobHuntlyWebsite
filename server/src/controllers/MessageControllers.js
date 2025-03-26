const messageService = require("../services/MessageServices");

const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, content, attachments } = req.body;
    const message = await messageService.sendMessage(
      conversationId,
      senderId,
      content,
      attachments
    );
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessagesByConversationId = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await messageService.getMessagesByConversationId(
      conversationId
    );
    res.status(200).json({
      status: "success",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessagesByConversationId,
};
