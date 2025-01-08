const express = require("express");
const cvRouter = express.Router();
const CvController = require("../controllers/CvControllers");

cvRouter.get("", CvController.getAllCVs); // get all categories
cvRouter.get("/:id", CvController.getCVById); // get category
cvRouter.post("", CvController.createCV);
cvRouter.put("/:id", CvController.updateCV);
cvRouter.delete("/:id", CvController.deleteCV);

module.exports = cvRouter;
