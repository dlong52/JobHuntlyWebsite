const express = require("express");
const overviewAdminRouter = express.Router();
const OverviewController = require("../controllers/OverviewAdminControllers");

overviewAdminRouter.get("", OverviewController.overviewAdmin);

module.exports = overviewAdminRouter;
