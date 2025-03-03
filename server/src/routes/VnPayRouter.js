const express = require("express");
const {
  createPayment,
  vnPayReturn,
} = require("../controllers/VnPayControllers");

const vnPayRouter = express.Router();

vnPayRouter.post("/create-payment", createPayment);
vnPayRouter.get("/return", vnPayReturn);

module.exports = vnPayRouter;
