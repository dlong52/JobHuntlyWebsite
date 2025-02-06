const notificationService = require("../services/NotificationServices");
const User = require("../models/UserModel");
const admin = require("../configs/firebase/firebaseAdmin");
const Notification = require("../models/Notification");

const sendNotificationToUser = async (req, res) => {
  const { userId, title, body, type } = req.body;
  try {
    // Tìm kiếm người dùng trong database
    const user = await User.findById(userId);
    if (!user || !user.fcmToken) {
      return res
        .status(400)
        .json({ error: "User not found or token is missing" });
    }

    // Lưu thông báo vào MongoDB
    const notification = new Notification({
      user_id: userId,
      type: type || "new_message", // Loại thông báo mặc định là 'new_message'
      title: title,
      body: body,
    });

    await notification.save();

    // Gửi thông báo qua Firebase Cloud Messaging
    const fcmToken = user.fcmToken;
    const message = {
      token: fcmToken,
      notification: {
        title: title,
        body: body,
      },
    };

    const response = await admin.messaging().send(message);
    return res.status(200).json({
      status: "success",
      message: "Notification sent and saved successfully",
      response: response,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res
      .status(500)
      .json({ error: "Failed to send and save notification" });
  }
};

const sendNotificationToAllUsers = async (req, res) => {
  const { title, body } = req.body;
  try {
    const users = await User.find({ fcmToken: { $exists: true, $ne: null } });

    if (!users.length) {
      return res
        .status(400)
        .json({ error: "No users found with valid FCM tokens" });
    }

    const messages = users.map((user) => ({
      token: user.fcmToken,
      notification: {
        title: title,
        body: body,
      },
    }));

    const responses = await Promise.all(
      messages.map((message) => admin.messaging().send(message))
    );

    console.log("Notifications sent successfully:", responses);

    return res.status(200).json({
      status: "success",
      message: "Notifications sent to all users successfully",
      responses: responses,
    });
  } catch (error) {
    console.error("Error sending notifications to all users:", error);

    return res
      .status(500)
      .json({ error: "Failed to send notifications to all users" });
  }
};

// Create new notification
const createNotification = async (req, res) => {
  try {
    const notification = await notificationService.createNotification(req.body);
    res.status(201).json({
      status: "success",
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notifications for a user
const getNotifications = async (req, res) => {
  try {
    const { page, limit, isRead } = req.query;
    const filters = isRead ? { isRead: isRead === "true" } : {};
    const options = { page: parseInt(page) || 1, limit: parseInt(limit) || 10 };

    const result = await notificationService.getNotifications(
      req.params.userId,
      filters,
      options
    );

    res.status(200).json({
      status: "success",
      message: "Notifications retrieved successfully",
      data: result.notifications,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationService.markNotificationAsRead(id);
    res.status(200).json({
      status: "success",
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await notificationService.deleteNotification(id);
    res.status(200).json({
      status: "success",
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotification,
  markNotificationAsRead,
  getNotifications,
  deleteNotification,
  sendNotificationToUser,
  sendNotificationToAllUsers,
};
