const { Client } = require("@elastic/elasticsearch");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  node: process.env.ELASTIC_URL, // Elasticsearch URL
  auth: {
    apiKey: process.env.ELASTIC_API_KEY, //Your API key
    username: process.env.ELASTIC_USERNAME, // Username
    password: process.env.ELASTIC_PASSWORD, // Password
  },
  tls: {
    rejectUnauthorized: false, // Chấp nhận chứng chỉ tự ký
  },
});
const createElasticsearchClient = () => {
  return new Client({
    node: process.env.ELASTIC_URL,
    auth: {
      apiKey: process.env.ELASTIC_API_KEY,
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};
// Test the connection
const checkElastic = async () => {
  try {
    const health = await client.cluster.health();
    console.log("✅Elasticsearch connected");
    return true
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
  }
};

module.exports = { client, checkElastic, createElasticsearchClient };
