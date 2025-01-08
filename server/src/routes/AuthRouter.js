const express = require('express')
const authRouter = express.Router()
const AuthController = require('../controllers/AuthControllers')

authRouter.post('/sign-up', AuthController.signUp)
authRouter.post('/sign-in', AuthController.signIn)
authRouter.post('/sign-in-google', AuthController.signInWithGoogle)
authRouter.post('/log-out', AuthController.signOut)
authRouter.post('/refresh-token', AuthController.refreshToken)

module.exports = authRouter