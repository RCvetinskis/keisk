import { createServer } from "http";
import { Server } from "socket.io";
import db from "./lib/db";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
});


const activeUsers = new Map<number, { socketId: string; conversationId?: number }>();
// TODO: Add online/offline status for users, if user online and jonied send notifications
io.on("connection", (socket) => {
  const userId = Number(socket.handshake.query.userId);
  console.log("User connected:", userId);


  activeUsers.set(userId, { socketId: socket.id });


  socket.on("joinConversation", (conversationId: number) => {
    const user = activeUsers.get(userId);
    if (user) user.conversationId = conversationId;
    console.log(`User ${userId} joined conversation ${conversationId}`);
  });


  socket.on("message", (msg) => {

    const result = {
      ...msg,
      activeUsers: Array.from(activeUsers.keys()),
    };
    io.emit("message", result);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(userId);
    console.log("User disconnected:", userId);
  });
});

const PORT = process.env.SOCKET_IO_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
