import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://event-app-mern-front.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    transports: ['websocket', 'polling'] // Add explicit transports
  },
  allowEIO3: true, // Enable Engine.IO v3 compatibility
  pingTimeout: 60000, // Increase ping timeout
  pingInterval: 25000 // Increase ping interval
});

// Add middleware to handle authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  // Add your token verification logic here if needed
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  // Handle custom events (e.g., attendee updates)
  socket.on("attendeeUpdate", (data) => {
    console.log("Attendee update:", data);
    io.emit("attendeeUpdate", data);
  });
});

export { io, app, server };
