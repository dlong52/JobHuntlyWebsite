const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Company = require("../models/Company");
const { default: mongoose } = require("mongoose");
dotenv.config();

const createUser = async (userData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      email,
      password,
      role,
      account_type,
      companyName,
      staff_quantity,
      website,
      categories,
      address,
      description,
      created_by,
    } = userData;

    // Kiểm tra email trước khi làm bất cứ điều gì
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let companyId = null;

    if (companyName) {
      // Kiểm tra xem công ty đã tồn tại chưa
      const existingCompany = await Company.findOne({
        name: companyName,
      }).session(session);
      if (existingCompany) {
        throw new Error("Tên công ty đã tồn tại");
      }

      const newCompany = new Company({
        name: companyName,
        staff_quantity,
        website,
        categories,
        address,
        description,
        created_by,
      });

      const savedCompany = await newCompany.save({ session }); // Lưu trong transaction
      companyId = savedCompany._id;
    }

    const payload = {
      email,
      password: hashedPassword,
      role,
      account_type,
    };

    if (companyId) {
      payload.company = companyId;
    }

    const newUser = new User(payload);
    await newUser.save({ session }); // Lưu trong transaction

    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      message: "User created successfully",
      data: newUser._id,
    };
  } catch (error) {
    await session.abortTransaction(); // Rollback nếu có lỗi
    session.endSession();
    throw error;
  }
};

const getUserById = async (id) => {
  return await User.findById(id).populate("role").populate("company");
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

  // Tách searchName từ filters (nếu có)
  const { searchName, ...restFilters } = filters;

  // Tạo điều kiện tìm kiếm nếu searchName được cung cấp
  if (searchName) {
    restFilters.$or = [
      { "profile.name": { $regex: searchName, $options: "i" } }, // Tìm kiếm theo name (không phân biệt hoa thường)
      { email: { $regex: searchName, $options: "i" } }, // Tìm kiếm theo email (không phân biệt hoa thường)
    ];
  }

  const users = await User.find(restFilters)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("role", "name")
    .select("-password");

  const total = await User.countDocuments(restFilters);

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
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateFCMToken,
  getUserById,
};
