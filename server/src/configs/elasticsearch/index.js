const { Client } = require("@elastic/elasticsearch");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  node: process.env.ELASTIC_URL,
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID || '',
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const createElasticsearchClient = () => {
  return new Client({
    node: process.env.ELASTIC_URL,
    cloud: {
      id: process.env.ELASTIC_CLOUD_ID || '',
    },
    auth: {

      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const checkElastic = async () => {
  try {
    const health = await client.cluster.health();
    console.log("✅Elasticsearch connected");
    return health
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
    return error
  }
};

module.exports = { client, checkElastic, createElasticsearchClient };
