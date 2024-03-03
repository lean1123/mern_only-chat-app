import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDB from "./db/connectDB.js";
import { app, server } from "./socket/Socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/FrontEnd/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd", "dist", "index.html"));
});

// app.get("/", (req, res) => {
//   // root route http://localhost:5000/
//   res.send("Hello world! 123");
// });

server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
