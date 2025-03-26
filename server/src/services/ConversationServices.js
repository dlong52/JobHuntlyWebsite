const Conversation = require("../models/Conversation");

const createConversation = async (participants) => {
  // Sắp xếp các user_id trong participants để so sánh
  const sortedUserIds = participants.map((p) => p.user_id.toString()).sort();

  // Tìm tất cả các conversation có chứa các user_id này
  const existingConversations = await Conversation.find({
    "participants.user_id": { $all: sortedUserIds },
  });

  for (const conversation of existingConversations) {
    const existingUserIds = conversation.participants
      .map((p) => p.user_id.toString())
      .sort();
    if (JSON.stringify(existingUserIds) === JSON.stringify(sortedUserIds)) {
      return {
        status: "error",
        message: "Conversation already exists",
        data: conversation,
      };
    }
  }

  const newConversation = new Conversation({ participants });
  return await newConversation.save();
};

const getConversationsByUserId = async (userId) => {
  return await Conversation.find({ "participants.user_id": userId })
    .populate({
      path: "participants.user_id",
      select: "username email role company profile", // Lấy các trường từ User
      populate: {
        path: "company", // Populate tiếp company nếu nó là ObjectId
        select: "name logo", // Lấy các trường từ Company
      },
    })
    .sort({ updated_at: -1 });
};

module.exports = {
  createConversation,
  getConversationsByUserId,
};
