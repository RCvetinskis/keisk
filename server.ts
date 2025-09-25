import { createServer } from "http";
import { Server } from "socket.io";
import db from "./lib/db";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("message", async (msg) => {
    try {
      const message = await db.message.create({
        data: {
          content: msg.content,
          conversationId: msg.conversationId,
          userId: msg.senderId,
          parentId: msg.parentId || null,
        },
        include: { user: true },
      });

      io.emit("message", message);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.SOCKET_IO_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
