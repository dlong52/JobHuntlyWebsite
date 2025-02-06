const express = require("express");
const notificationRouter = express.Router();
const notificationController = require("../controllers/NotificationControllers");

notificationRouter.put("/:id", notificationController.markNotificationAsRead);
notificationRouter.delete("/:id", notificationController.deleteNotification);
notificationRouter.get("/:userId", notificationController.getNotifications);
notificationRouter.post("/send-to-user", notificationController.sendNotificationToUser);
notificationRouter.post("/send-to-all", notificationController.sendNotificationToAllUsers);

module.exports = notificationRouter;
