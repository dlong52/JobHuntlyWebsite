const express = require('express')
const reportRouter = express.Router()
const ReportController = require('../controllers/ReportControllers')

reportRouter.post('', ReportController.createReport)
reportRouter.put('/:id', ReportController.updateReport)
reportRouter.get('', ReportController.getReports)
reportRouter.get('/:id', ReportController.getReportById)
reportRouter.delete('/:id', ReportController.deleteReport)

module.exports = reportRouter