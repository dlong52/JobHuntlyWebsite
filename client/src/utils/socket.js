import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Thay bằng URL thực tế

const socket = io(SOCKET_SERVER_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
