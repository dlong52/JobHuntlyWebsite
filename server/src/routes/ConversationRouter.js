const express = require('express')
const conversationRouter = express.Router()
const ConversationController = require('../controllers/ConversationControllers')

conversationRouter.post('', ConversationController.createConversation)
conversationRouter.get('/:userId', ConversationController.getConversationsByUserId)

module.exports = conversationRouter