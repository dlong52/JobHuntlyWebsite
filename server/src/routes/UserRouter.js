const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

userRouter.put("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", authMiddleware, userController.deleteUser);
userRouter.get("", userController.getAllUsers);
userRouter.get("/details", userController.getUserDetails);
userRouter.post("/push-fcm-token", userController.updateFCMToken);

module.exports = userRouter;
