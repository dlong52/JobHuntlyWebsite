const { default: mongoose } = require("mongoose");
const { client } = require("../configs/elasticsearch");
const {
  syncCategoryToElastic,
} = require("../elastic_services/CategoryServices");
const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newCategory = await category.save();
    // await syncCategoryToElastic(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        updated_at: Date.now(),
      },
      { new: true }
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const search = async (req, res) => {
  const { q } = req.query;
  try {
    const body = await client.search({
      index: "categories",
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ["name", "description"],
          },
        },
      },
    });

    const hits = body.hits.hits;
    const results = hits.map((hit) => hit._source);

    res.status(200).json({
      status: "success",
      message: "Tìm kiếm thành công",
      data: results,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const searchInDatabase = async (req, res) => {
  const { q } = req.query; // Lấy query từ request
  if (!q || q.trim() === "") {
    return res
      .status(400)
      .json({ status: "fail", message: "Query tìm kiếm không được để trống" });
  }

  try {
    const regex = new RegExp(q, "i"); // Tạo regex để tìm kiếm không phân biệt chữ hoa/chữ thường
    const categories = await Category.find({
      $or: [
        { name: regex }, // Tìm trong trường name
        { description: regex }, // Tìm trong trường description
      ],
    });

    if (categories.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Không tìm thấy kết quả phù hợp" });
    }

    res.status(200).json({
      status: "success",
      message: "Tìm kiếm thành công",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  search,
  searchInDatabase
};
