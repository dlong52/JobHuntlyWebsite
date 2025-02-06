const express = require("express");
const nodemailerRouter = express.Router();
const nodemailerController = require("../controllers/NodemailerControllers");

nodemailerRouter.post("/cv-viewed", nodemailerController.cvViewed);
  
module.exports = nodemailerRouter;
