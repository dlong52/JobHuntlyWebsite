const express = require("express");
const jobRouter = express.Router();
const JobController = require("../controllers/JobControllers");

jobRouter.get("", JobController.getAllJobs); 
jobRouter.get("/:id", JobController.getJobById); 
jobRouter.post("", JobController.createJob);
jobRouter.put("/:id", JobController.updateJob);
jobRouter.delete("/:id", JobController.deleteJob);

module.exports = jobRouter;
