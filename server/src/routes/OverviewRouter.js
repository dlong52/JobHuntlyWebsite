const express = require("express");
const overviewRouter = express.Router();
const OverviewController = require("../controllers/OverviewControllers");

overviewRouter.get("/:id", OverviewController.OverviewHr);

module.exports = overviewRouter;
