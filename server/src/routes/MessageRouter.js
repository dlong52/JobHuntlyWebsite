const express = require('express')
const messageRouter = express.Router()
const MessageController = require('../controllers/MessageControllers')

messageRouter.post('', MessageController.sendMessage)
messageRouter.post('/:conversationId', MessageController.getMessagesByConversationId)

module.exports = messageRouter