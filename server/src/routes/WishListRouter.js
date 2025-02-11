const express = require("express");
const wishListRouter = express.Router();
const WishListController = require("../controllers/WishListController");

wishListRouter.get("/:userId", WishListController.getWishListByUser); 
wishListRouter.post("", WishListController.addToWishList);
wishListRouter.delete("/:id", WishListController.removeFromWishList);

module.exports = wishListRouter;
