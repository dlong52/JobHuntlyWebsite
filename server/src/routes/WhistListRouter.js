const express = require("express");
const jobRouter = express.Router();
const WhistListController = require("../controllers/WhistListController");

jobRouter.get("/:userId", WhistListController.getWishListByUser); 
jobRouter.post("", WhistListController.addToWishList);
jobRouter.delete("/:id", WhistListController.removeFromWishList);

module.exports = jobRouter;
