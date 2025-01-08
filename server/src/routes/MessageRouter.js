const express = require('express')
const messageRouter = express.Router()
const MessageController = require('../controllers/MessageControllers')

messageRouter.post('/sign-up', MessageController.signUp)
messageRouter.post('/sign-in', MessageController.signIn)
messageRouter.post('/sign-in-google', MessageController.signInWithGoogle)
messageRouter.post('/log-out', MessageController.signOut)
messageRouter.post('/refresh-token', MessageController.refreshToken)

module.exports = messageRouter