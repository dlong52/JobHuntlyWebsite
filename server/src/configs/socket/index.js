const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");

let io;

const initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS || "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinConversation", ({ conversationId }) => {
      if (!conversationId) {
        console.error("joinConversation: Missing conversationId");
        return;
      }
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });

    socket.on("sendMessage", async ({ conversationId, senderId, content }) => {
      if (!conversationId || !senderId || !content) {
        console.error("sendMessage: Invalid data received");
        return;
      }

      try {
        // Save message to the database
        const message = new Message({
          conversation_id: conversationId,
          sender_id: senderId,
          content,
          is_read: false,
          sent_at: new Date(),
        });

        await message.save();

        // Update last message in the conversation
        await Conversation.findByIdAndUpdate(conversationId, {
          last_message: {
            content,
            sender_id: senderId,
            timestamp: new Date(),
          },
          updated_at: new Date(),
        });

        // Emit the message to all participants
        io.to(conversationId).emit("receiveMessage", {
          conversationId,
          message,
        });
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  console.log("Socket Connected");
};

module.exports = { initSocket };
