const express = require("express");
const cvThemeRouter = express.Router();
const CvThemeController = require("../controllers/CvThemeControllers");

cvThemeRouter.get("", CvThemeController.getAllCvThemes);
cvThemeRouter.get("/:id", CvThemeController.getCvThemeById);
cvThemeRouter.post("", CvThemeController.createCvTheme);
cvThemeRouter.put("/:id", CvThemeController.updateCvTheme);
cvThemeRouter.delete("/:id", CvThemeController.deleteCvTheme);

module.exports = cvThemeRouter;
