// src/config/mongodb.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URL;

const connect = async () => {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ MongoDB Connected Successfully');
    return client;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = { connect };