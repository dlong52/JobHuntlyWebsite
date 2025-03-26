const express = require("express");
const jobRouter = express.Router();
const JobController = require("../controllers/JobControllers");
const JobSearchController = require("../elasticControllers/JobControllers");
const { client } = require("../configs/elasticsearch");

const jobSearchController = new JobSearchController(client);
// 
jobRouter.get('/search', jobSearchController.searchJobs.bind(jobSearchController));
jobRouter.get('/suggest', jobSearchController.suggestJobs.bind(jobSearchController));
// MongoDB routes
jobRouter.get("", JobController.getAllJobs); 
jobRouter.get("/count", JobController.getJobCounts); 
jobRouter.get("/:id", JobController.getJobById); 
jobRouter.post("", JobController.createJob);
jobRouter.put("/:id", JobController.updateJob);
jobRouter.delete("/:id", JobController.deleteJob);

module.exports = jobRouter;
