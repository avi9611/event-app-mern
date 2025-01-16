import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import { app, server, io } from "./lib/socket.js";

dotenv.config();

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import eventRoutes from "./routes/event.route.js";

const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

// Dynamically set the allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://event-app-mern-front.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Your routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/events", eventRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
server.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
