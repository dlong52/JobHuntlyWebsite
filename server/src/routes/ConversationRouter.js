const express = require('express')
const conversationRouter = express.Router()
const ConversationController = require('../controllers/ConversationControllers')

conversationRouter.post('', ConversationController.createConversation)
conversationRouter.get('/:conversationId/messages', ConversationController.getMessageByConversation)
conversationRouter.post('/message', ConversationController.sendMessage)

module.exports = conversationRouter