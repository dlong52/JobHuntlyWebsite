const express = require('express')
const messageRouter = express.Router()
const MessageController = require('../controllers/MessageControllers')

messageRouter.post('', MessageController.sendMessage)
messageRouter.get('/:conversationId', MessageController.getMessagesByConversationId)

module.exports = messageRouter