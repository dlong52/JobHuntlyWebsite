const UserServices = require("../services/UserServices");

const createUser = async (req, res) => {
  try {
    const user = await UserServices.createUser(req.body);
    res.status(201).json({ status: "success", message: "User created", data: user });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserServices.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "User was successfully retrieved",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(404).json({
        status: "error",
        message: "Tài khoản không tồn tại!",
      });
    }
    const response = await UserServices.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const token = req.headers;
    if (!userId) {
      return res.status(404).json({
        status: "error",
        message: "Tài khoản không tồn tại!",
      });
    }
    const response = await UserServices.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy,
      order,
    };
    const result = await UserServices.getAllUsers(filters, options);

    res.status(200).json({
      status: "success",
      message: "Đã lấy toàn bộ thông tin người dùng thành công!",
      data: result.users,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        status: "error",
        message: "Token không được cung cấp!",
      });
    }
    const response = await UserServices.getUserDetails(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
const updateFCMToken = async (req, res) => {
  const { email, fcmToken } = req.body;
  if (!email || !fcmToken) {
    return res.status(400).json({ error: "Email và fcmToken là bắt buộc" });
  }
  try {
    const message = await UserServices.updateFCMToken(email, fcmToken);
    return res.status(200).json({
      status: "success",
      message: "Updated fcmToken successfully",
      data: message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateFCMToken,
  getUserById,
  createUser
};
