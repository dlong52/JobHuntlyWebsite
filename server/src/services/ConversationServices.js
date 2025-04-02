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

const getConversationsByUserId = async (userId, searchName) => {
  // Start with the base query
  let query = { "participants.user_id": userId };
  
  // If searchName is provided, add search conditions
  if (searchName) {
    // Find conversations where any participant matches the search criteria
    query = {
      $and: [
        { "participants.user_id": userId },
        {
          $or: [
            // Search by participant username (case insensitive)
            { "participants.username": { $regex: searchName, $options: 'i' } },
            // The below conditions will be applied during population
          ]
        }
      ]
    };
  }
  
  // Build the base query
  const baseQuery = Conversation.find(query)
    .populate({
      path: "participants.user_id",
      select: "username email role company profile",
      populate: {
        path: "company",
        select: "name logo",
      },
    })
    .sort({ updated_at: -1 });
  
  // Execute the query to get conversations
  let conversations = await baseQuery;
  
  // If searchName is provided, filter the results after population
  if (searchName && conversations.length > 0) {
    return conversations.filter(conversation => {
      // Check if any participant's email, name, or company name matches the search
      return conversation.participants.some(participant => {
        // Check username from conversation (already checked in the query but keeping it for completeness)
        if (participant.username && 
            participant.username.toLowerCase().includes(searchName.toLowerCase())) {
          return true;
        }
        
        // Check user fields after population
        const user = participant.user_id;
        if (!user) return false;
        
        // Check email
        if (user.email && 
            user.email.toLowerCase().includes(searchName.toLowerCase())) {
          return true;
        }
        
        // Check profile name
        if (user.profile && user.profile.name && 
            user.profile.name.toLowerCase().includes(searchName.toLowerCase())) {
          return true;
        }
        
        // Check company name
        if (user.company && user.company.name && 
            user.company.name.toLowerCase().includes(searchName.toLowerCase())) {
          return true;
        }
        
        return false;
      });
    });
  }
  
  return conversations;
};

module.exports = {
  createConversation,
  getConversationsByUserId,
};
