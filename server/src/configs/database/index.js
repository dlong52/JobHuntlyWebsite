const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect successfully');
    } catch (e) {
        console.error('Connect failure', e);
    }
}

module.exports = { connect };
  