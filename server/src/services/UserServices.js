const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const updateUser = async (userId, data) => {
    try {
        const checkUser = await User.findOne({ _id: userId });
        if (checkUser === null) {
            return {
                status: 'error',
                message: 'Tài khoản này không tồn tại'
            }
        }
        const updateUser = await User.findByIdAndUpdate({ _id: userId }, data, { new: true });
        return {
            status: 'success',
            message: 'Cập nhật tài khoản thành công!',   
            data: updateUser
        }
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}
const deleteUser = async (userId) => {
    try {
        const checkUser = await User.findOne({ _id: userId });
        if (checkUser === null) {
            return {
                status: 'error',
                message: 'Tài khoản này không tồn tại'
            }
        }
        const deleteUser = await User.findByIdAndDelete({ _id: userId }, { new: true });
        return {
            status: 'success',
            message: 'Đã xóa thành công!',
            data: deleteUser
        }
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}
const getAllUsers = async () => {
    try {
        const allUsers = await User.find()
        .populate("role", "name")
        .select("-password");

        return {
            status: 'success',
            message: 'Đã lấy toàn bộ thông tin người dùng thành công!',
            data: allUsers
        }
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}

const getUserDetails = async (token) => {
    try {

        // Verify the token and extract user ID
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN); // Replace 'your_secret_key' with your actual secret
        const userId = decoded.id;

        // Fetch the user details using the user ID
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return {
                status: 'error',
                message: 'Tài khoản này không tồn tại'
            };
        }

        return {
            status: 'success',
            message: 'Lấy thông tin người dùng thành công!',
            data: user
        };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};
module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserDetails
}
