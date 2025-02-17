const express = require("express");
const wishListRouter = express.Router();
const WishListController = require("../controllers/WishListController");

wishListRouter.get("/:userId", WishListController.getWishListByUser);
wishListRouter.get("/:userId/:jobId", WishListController.isJobInWishList);
wishListRouter.post("", WishListController.addToWishList);
wishListRouter.delete("/:userId/:jobId", WishListController.removeFromWishList);

module.exports = wishListRouter;
