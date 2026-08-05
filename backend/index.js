import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ==========================
// Database
// ==========================
await connectDb();

// ==========================
// CORS
// ==========================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ==========================
// Middlewares
// ==========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================
// Health Check
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Server Running 🚀",
  });
});

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ==========================
// 404
// ==========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==========================
// Start Server
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});