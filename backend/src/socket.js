const socketIo = require("socket.io");
const captainModel = require("./models/captain.model.js");
const userModel = require("./models/user.model");

let io = null;

function initializeSocket(server) {
  if (io) return io;

  io = socketIo(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://mdhn7345-5173.inc1.devtunnels.ms",
      ], // ✅ no trailing slash
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        result = await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        result = await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
      if (!result) {
        console.warn(`⚠️ No ${userType} found with ID ${userId}`);
      } else {
        console.log(`✅ ${userType} socket updated: ${socket.id}`);
      }
    });
    socket.on("disconnect", (reason) => {
      console.log("Client disconnected: ", socket.id, reason);
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !userId || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      const captain = await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });
    return io;
  });
}
const sendMessageToSocketId = (socketId, messageObject) => {
  if (!io) {
    console.warn(
      "Socket.io not initialized. Call initializeSocket(server) first."
    );
    return false;
  }

  io.to(socketId).emit(messageObject.event, messageObject.data);

  return true;
};

module.exports = { initializeSocket, sendMessageToSocketId };
