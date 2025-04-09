const express = require("express");
const subscriptionRouter = express.Router();
const SubscriptionController = require("../controllers/SubscriptionControllers");

subscriptionRouter.post("", SubscriptionController.createSubscription);
subscriptionRouter.put("/:id", SubscriptionController.updateSubscription);
subscriptionRouter.get("", SubscriptionController.getAllSubscriptions);
subscriptionRouter.get("/active/:employer_id", SubscriptionController.employerActivePackage);
subscriptionRouter.get("/:id", SubscriptionController.getSubscriptionById);
subscriptionRouter.delete("/:id", SubscriptionController.deleteSubscription);

module.exports = subscriptionRouter;
