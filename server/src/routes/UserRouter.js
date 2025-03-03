const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

userRouter.put("/:id", userController.updateUser);
userRouter.delete("/delete/:id", authMiddleware, userController.deleteUser);
userRouter.get("", userController.getAllUsers);
userRouter.get("/details", userController.getUserDetails);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/push-fcm-token", userController.updateFCMToken);
userRouter.post("", userController.createUser);

module.exports = userRouter;
