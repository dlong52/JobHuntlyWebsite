const express = require("express");
const applicationRouter = express.Router();
const ApplicationController = require("../controllers/ApplicationControllers");

applicationRouter.get("", ApplicationController.getAllApplications);
applicationRouter.get(
  "/report/:companyId",
  ApplicationController.getReportApplication
);
applicationRouter.get("/:id", ApplicationController.getApplicationById);
applicationRouter.post("", ApplicationController.createApplication);
applicationRouter.put("/:id", ApplicationController.updateApplication);
applicationRouter.delete("/:id", ApplicationController.deleteApplication);
applicationRouter.get(
  "/applied-job/:userId",
  ApplicationController.getAppliedJobs
);

module.exports = applicationRouter;
