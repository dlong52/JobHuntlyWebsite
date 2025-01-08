const UserServices = require('../services/UserServices')

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Tài khoản không tồn tại!'
            })
        }
        const response = await UserServices.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const token = req.headers
        if (!userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Tài khoản không tồn tại!'
            })
        }
        const response = await UserServices.deleteUser(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        const response = await UserServices.getAllUsers()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}

const getUserDetails = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];        
        if (!token) {
            return res.status(404).json({
                status: 'error',
                message: 'Token không được cung cấp!'
            })
        }
        const response = await UserServices.getUserDetails(token)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserDetails,
}
