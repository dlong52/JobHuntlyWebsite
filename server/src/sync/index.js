const { client } = require("../configs/elasticsearch");
const Category = require("../models/Category");

const syncCategories = async () => {
  const categories = await Category.find();
  for (let category of categories) {
    await client.index({
      index: "categories",
      id: category._id.toString(),
      document: category.toObject(),
    });
    console.log("✅ Synced category:", category.name);
  }
};

module.exports = syncCategories;
