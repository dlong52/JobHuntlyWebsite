const express = require("express");
const packageRouter = express.Router();
const PackageController = require("../controllers/PackageControllers");

packageRouter.get("", PackageController.getAllPackages);
packageRouter.get("/:id", PackageController.getPackageById);
packageRouter.post("", PackageController.createPackage);
packageRouter.put("/:id", PackageController.updatePackage);
packageRouter.delete("/:id", PackageController.deletePackage);

module.exports = packageRouter;
