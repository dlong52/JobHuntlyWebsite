const notificationService = require("../services/NotificationServices");
const User = require("../models/UserModel");
const admin = require("../configs/firebase/firebaseAdmin");
const Notification = require("../models/Notification");

const sendNotificationToUser = async (req, res) => {
  const { userId, title, body, type } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user || !user.fcmToken) {
      return res
        .status(200)
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
    // Lấy user có fcmToken hợp lệ và populate role
    const users = await User.find({
      fcmToken: { $exists: true, $ne: null },
    }).populate("role");

    // Lấy tất cả users để lưu notification, bao gồm cả ADMIN
    const allUsersForDB = await User.find({});
    
    if (!users.length) {
      return res.status(400).json({ error: "No users found with valid FCM tokens" });
    }

    // Chỉ gửi FCM notification cho non-admin users
    const nonAdminUsers = users.filter(user => user.role?.name !== "ADMIN");
    
    const messages = nonAdminUsers.map((user) => ({
      token: user.fcmToken,
      notification: { title, body },
    }));

    // Gửi thông báo đến non-admin users
    const responses = await Promise.all(messages.map((msg) => admin.messaging().send(msg)));

    // Lưu thông báo vào DB cho TẤT CẢ users (bao gồm cả admin)
    const notificationsToSave = allUsersForDB.map(user => ({
      user_id: user._id,
      type: "system",
      title,
      body,
    }));

    await Notification.insertMany(notificationsToSave);

    return res.status(200).json({
      status: "success",
      message: "Notifications sent and saved successfully",
      responses,
    });
  } catch (error) {
    console.error("Error sending notifications to all users:", error);
    return res.status(500).json({ error: "Failed to send notifications to all users" });
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
      unreadCount: result.unreadCount,
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
const getAllNotifications = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || "created_at",
      order: order || "desc",
    };
    const result = await notificationService.getAllNotifications(
      filters,
      options
    );

    res.status(200).json({
      status: "success",
      message: "Notifications retrieved successfully",
      data: result.notifications,
      unreadCount: result.unreadCount,
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
    const { userId } = req.params;
    const notification = await notificationService.markNotificationAsRead(
      userId
    );
    res.status(200).json({
      status: "success",
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const markAllNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await notificationService.markAllNotificationsAsRead(userId);

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "No unread notifications found." });
    }
    return res
      .status(200)
      .json({ message: "All notifications marked as read." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
  markAllNotifications,
  createNotification,
  markNotificationAsRead,
  getNotifications,
  deleteNotification,
  sendNotificationToUser,
  sendNotificationToAllUsers,
  getAllNotifications,
};
