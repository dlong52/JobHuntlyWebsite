const Message = require("../../models/Message");

let io;

const initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinRoom", ({ chatRoomId }) => {
      socket.join(chatRoomId);
    });

    socket.on("sendMessage", async ({ chatRoomId, senderId, message }) => {
      const newMessage = await Message.create({
        chatRoomId,
        senderId,
        message,
      });
      io.to(chatRoomId).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  console.log("Socket Connected");
};

module.exports = { initSocket };
