const Role = require('../models/Role'); // Import model Role

// Tạo mới một Role
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Tên vai trò là bắt buộc.' });
    }
    const newRole = new Role({ name, description });
    const savedRole = await newRole.save();

    res.status(201).json({
      status: "success",
      message: "Tạo vai trò thành công!",
      role: savedRole,
    });
  } catch (error) {
    console.error('Lỗi khi tạo vai trò:', error);
    res.status(500).json({ message: 'Lỗi hệ thống.' });
  }
}

// Lấy danh sách tất cả các Role
const getAllRole = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({
      status: "success",
      message: "Lấy dữ liệu thành công!",
      data: roles
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách vai trò:', error);
    res.status(500).json({ message: 'Lỗi hệ thống.' });
  }
}

// Lấy thông tin chi tiết của một Role theo ID
const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ message: 'Không tìm thấy vai trò.' });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error('Lỗi khi lấy vai trò:', error);
    res.status(500).json({ message: 'Lỗi hệ thống.' });
  }
}

// Cập nhật Role theo ID
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Tìm và cập nhật vai trò
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, description, updated_at: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: 'Không tìm thấy vai trò để cập nhật.' });
    }

    res.status(200).json({
      message: 'Vai trò được cập nhật thành công.',
      role: updatedRole,
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật vai trò:', error);
    res.status(500).json({ message: 'Lỗi hệ thống.' });
  }
}

// Xóa Role theo ID
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm và xóa vai trò
    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: 'Không tìm thấy vai trò để xóa.' });
    }

    res.status(200).json({
      message: 'Vai trò được xóa thành công.',
      role: deletedRole,
    });
  } catch (error) {
    console.error('Lỗi khi xóa vai trò:', error);
    res.status(500).json({ message: 'Lỗi hệ thống.' });
  }
}

module.exports = {
    createRole,
    updateRole,
    getAllRole,
    getRole,
    deleteRole,
}
