const { client } = require("../configs/elasticsearch");

const syncCategoryToElastic = async (doc) => {
  try {
    await client.index({
      index: "categories",
      id: doc._id.toString(),
      document: doc.toObject(),
    });
    console.log(`✅ Category ${doc.name} synced to Elasticsearch`);
  } catch (error) {
    console.error("❌ Error syncing to Elasticsearch:", error);
  }
};

const updateCategoryInElastic = async (doc) => {
  try {
    await client.index({
      index: "categories",
      id: doc._id.toString(),
      document: doc.toObject(),
    });
    console.log(`✅ Category ${doc.name} updated in Elasticsearch`);
  } catch (error) {
    console.error("❌ Error updating in Elasticsearch:", error);
  }
};

const deleteCategoryFromElastic = async (doc) => {
  try {
    await client.delete({
      index: "categories",
      id: doc._id.toString(),
    });
    console.log(`✅ Category ${doc.name} deleted from Elasticsearch`);
  } catch (error) {
    console.error("❌ Error deleting from Elasticsearch:", error);
  }
};

module.exports = { syncCategoryToElastic, updateCategoryInElastic, deleteCategoryFromElastic };
