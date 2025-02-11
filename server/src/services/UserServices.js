const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const getUserById = async (id) => {
  return await User.findById(id);
};
const updateUser = async (userId, data) => {
  try {
    const checkUser = await User.findOne({ _id: userId });
    if (checkUser === null) {
      return {
        status: "error",
        message: "Tài khoản này không tồn tại",
      };
    }
    const updateUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      new: true,
    });
    return {
      status: "success",
      message: "Cập nhật tài khoản thành công!",
      data: updateUser,
    };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
const deleteUser = async (userId) => {
  try {
    const checkUser = await User.findOne({ _id: userId });
    if (checkUser === null) {
      return {
        status: "error",
        message: "Tài khoản này không tồn tại",
      };
    }
    const deleteUser = await User.findByIdAndDelete(
      { _id: userId },
      { new: true }
    );
    return {
      status: "success",
      message: "Đã xóa thành công!",
      data: deleteUser,
    };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
const getAllUsers = async (filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    order = "desc",
  } = options;
  const sort = { [sortBy]: order === "desc" ? -1 : 1 };
  const skip = (page - 1) * limit;

  const users = await User.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("role", "name")
    .select("-password");

  const total = await User.countDocuments(filters);
  return { users, total, page, limit };
};
const getUserDetails = async (token) => {
  try {
    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN); // Replace 'your_secret_key' with your actual secret
    const userId = decoded.id;

    // Fetch the user details using the user ID
    const user = await User.findOne({ _id: userId })
      .populate("company")
      .select("-password")
      .populate("role", "name -_id");
    if (!user) {
      return {
        status: "error",
        message: "Tài khoản này không tồn tại",
      };
    }
    return {
      status: "success",
      message: "Lấy thông tin người dùng thành công!",
      data: user,
    };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
const updateFCMToken = async (email, fcmToken) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    user.fcmToken = fcmToken;
    await user.save();
    return "fcmToken đã được cập nhật thành công!";
  } catch (error) {
    throw new Error(error.message || "Đã có lỗi xảy ra.");
  }
};
module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateFCMToken,
  getUserById,
};
