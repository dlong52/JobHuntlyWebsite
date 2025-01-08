const { Client } = require("@elastic/elasticsearch");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  node: process.env.ELASTIC_URL, // Elasticsearch URL
  auth: {
    // apiKey: "", //Your API key
    username: process.env.ELASTIC_USERNAME, // Username
    password: process.env.ELASTIC_PASSWORD, // Password
  },
  tls: {
    rejectUnauthorized: false, // Chấp nhận chứng chỉ tự ký
  },
});

// Test the connection
const checkElastic = async () => {
    try {
        const health = await client.cluster.health();
        console.log('Elasticsearch connected:', health);
    } catch (error) {
        console.error('Error connecting to Elasticsearch:', error);
    }
};

module.exports = { client, checkElastic };
