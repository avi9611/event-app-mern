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
    methods: ["GET", "POST"],
    credentials: true
  }
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