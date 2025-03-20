const Notification = require("../models/Notification");

// Create new notification
const createNotification = async (notificationData) => {
  try {
    const notification = new Notification(notificationData);
    await notification.save();
    return notification;
  } catch (error) {
    throw new Error("Failed to create notification");
  }
};

// Get all notifications with filters and pagination
const getNotifications = async (userId, filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    order = "desc",
  } = options;

  const query = { user_id: userId, ...filters };
  const sort = { [sortBy]: order === "desc" ? -1 : 1 };
  const skip = (page - 1) * limit;

  try {
    const notifications = await Notification.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({
      ...query,
      isRead: false,
    });

    return { notifications, total, unreadCount, page, limit };
  } catch (error) {
    throw new Error("Failed to fetch notifications");
  }
};

const getAllNotifications = async (filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    order = "desc",
  } = options;

  // Đảm bảo chỉ lấy field hợp lệ
  const query = { ...filters };
  if (query.type) query.type = { $regex: new RegExp(`^${query.type}$`, "i") };

  const sort = { [sortBy]: order === "desc" ? -1 : 1 };
  const skip = (page - 1) * limit;
  console.log(query);

  try {
    const notifications = await Notification.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({
      ...query,
      isRead: false,
    });

    return { notifications, total, unreadCount, page, limit };
  } catch (error) {
    throw new Error("Failed to fetch notifications");
  }
};

// Mark notification as read
const markNotificationAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    return notification;
  } catch (error) {
    throw new Error("Failed to mark notification as read");
  }
};
const markAllNotificationsAsRead = async (userId) => {
  try {
    const result = await Notification.updateMany(
      { user_id: userId, isRead: false },
      { $set: { isRead: true } }
    );
    return result;
  } catch (error) {
    throw new Error(
      "Error while marking notifications as read: " + error.message
    );
  }
};

// Delete notification by ID
const deleteNotification = async (notificationId) => {
  try {
    await Notification.findByIdAndDelete(notificationId);
    return { message: "Notification deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete notification");
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getAllNotifications,
};
