const Notification = require('../models/Notification');

// Create new notification
const createNotification = async (notificationData) => {
  try {
    const notification = new Notification(notificationData);
    await notification.save();
    return notification;
  } catch (error) {
    throw new Error('Failed to create notification');
  }
};

// Get all notifications with filters and pagination
const getNotifications = async (userId, filters = {}, options = {}) => {
  const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc' } = options;
  
  const query = { user_id: userId, ...filters };
  const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
  const skip = (page - 1) * limit;

  try {
    const notifications = await Notification.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Notification.countDocuments(query);

    return { notifications, total, page, limit };
  } catch (error) {
    throw new Error('Failed to fetch notifications');
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
    throw new Error('Failed to mark notification as read');
  }
};

// Delete notification by ID
const deleteNotification = async (notificationId) => {
  try {
    await Notification.findByIdAndDelete(notificationId);
    return { message: 'Notification deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete notification');
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
};
