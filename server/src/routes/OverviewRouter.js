const express = require("express");
const overviewRouter = express.Router();
const OverviewController = require("../controllers/OverviewControllers");

overviewRouter.get("/:id", OverviewController.OverviewHr);
overviewRouter.get("", OverviewController.countJobByPackage);

module.exports = overviewRouter;
