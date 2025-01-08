const express = require('express')
const roleRouter = express.Router()
const RoleController = require('../controllers/RoleControllers')

roleRouter.post('', RoleController.createRole)
roleRouter.put('/:id', RoleController.updateRole)
roleRouter.get('', RoleController.getAllRole)
roleRouter.get('/:id', RoleController.getRole)
roleRouter.delete('/:id', RoleController.deleteRole)

module.exports = roleRouter