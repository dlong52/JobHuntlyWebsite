const categoryService = require("../services/CategoryServices");
const { default: mongoose } = require("mongoose");
const { client } = require("../configs/elasticsearch");
const {
  syncCategoryToElastic,
} = require("../elastic_services/CategoryServices");
const Category = require("../models/Category");

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
  const { q } = req.query;
  if (!q || q.trim() === "") {
    return res
      .status(400)
      .json({ status: "fail", message: "Query tìm kiếm không được để trống" });
  }

  try {
    const regex = new RegExp(q, "i");
    const categories = await Category.find({
      $or: [{ name: regex }, { description: regex }],
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

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const { page, limit, sortBy, order, ...filters } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order,
    };
    const result = await categoryService.getAllCategories(filters, options);

    res.status(200).json({
      status: "success",
      message: "Categories retrieved successfully",
      data: result.categories,
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

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  search,
  searchInDatabase,
};
