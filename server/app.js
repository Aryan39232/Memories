import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

dns.setServers(["8.8.8.8", "8.8.4.4"]);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://memories-rho-pink.vercel.app',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

app.get("/", (req, res) => res.json({ status: "ok", service: "memories-api" }));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// Unknown route -> clean 404 JSON (never an HTML error page).
app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Centralised error handler -> always returns JSON with a friendly message.
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong on the server." });
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(async () => {
    // Drop the stale username_1 unique index left over from an old schema version.
    // It causes E11000 duplicate key errors for every new user because username is null.
    try {
      await mongoose.connection.collection("users").dropIndex("username_1");
      console.log("Dropped stale username_1 index");
    } catch (_) {}
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error.message));
