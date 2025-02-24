const express = require('express');
const levelRouter = express.Router();
const levelController = require('../controllers/LevelControllers');

levelRouter.get('', levelController.getAllLevels);
levelRouter.get('/:id', levelController.getLevelById);
levelRouter.post('', levelController.createLevel);
levelRouter.put('/:id', levelController.updateLevel);
levelRouter.delete('/:id', levelController.deleteLevel);

module.exports = levelRouter;
