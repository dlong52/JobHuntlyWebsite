const express = require("express");
const applicationRouter = express.Router();
const ApplicationController = require("../controllers/ApplicationControllers");

applicationRouter.get("", ApplicationController.getAllApplications); // get all categories
applicationRouter.get("/:id", ApplicationController.getApplicationById); // get category
applicationRouter.post("", ApplicationController.createApplication);
applicationRouter.put("/:id", ApplicationController.updateApplication);
applicationRouter.delete("/:id", ApplicationController.deleteApplication);

module.exports = applicationRouter;
