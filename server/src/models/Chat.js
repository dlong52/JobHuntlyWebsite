const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', ChatSchema);
