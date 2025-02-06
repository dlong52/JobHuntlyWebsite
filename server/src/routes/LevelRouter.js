const express = require('express');
const jobRouter = express.Router();
const levelController = require('../controllers/LevelControllers');

jobRouter.get('', levelController.getAllLevels);
jobRouter.get('/:id', levelController.getLevelById);
jobRouter.post('', levelController.createLevel);
jobRouter.put('/:id', levelController.updateLevel);
jobRouter.delete('/:id', levelController.deleteLevel);

module.exports = jobRouter;
