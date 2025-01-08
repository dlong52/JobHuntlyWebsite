const Chat = require("../models/Chat");
const Message = require("../models/Message");

const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        const chatRoom = await Chat.create({ participants });
        res.status(201).json(chatRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getMessages = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const messages = await Message.find({ chatRoomId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    createChat,
    getMessages
}