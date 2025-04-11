const express = require('express')
const searchRouter = express.Router()
const SearchController = require('../controllers/SearchControllers')

searchRouter.get('', SearchController.suggest)

module.exports = searchRouter