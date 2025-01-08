const { client } = require("../configs/elasticsearch");

const syncCategoryToElastic = async (category) => {
    try {
      const res = await client.index({
        index: "categories",  
        id: category._id.toString(),
        body: {
          name: category.name,
          description: category.description,
          created_at: category.created_at,
          updated_at: category.updated_at
        },
      });
      console.log(`Category indexed to Elasticsearch: ${res._id} - Result: ${res.result}`);
    } catch (error) {
      console.error("Error indexing category to Elasticsearch:", error);
      throw new Error("Failed to index category to Elasticsearch");
    }
  }

module.exports = {
    syncCategoryToElastic,
};
