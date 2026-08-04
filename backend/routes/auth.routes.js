import express from "express";
import { Login, Logout, signUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

// ==========================
// Authentication Routes
// ==========================

// Register User
authRouter.post("/signup", signUp);

// Login User
authRouter.post("/signin", Login);

// Logout User
authRouter.get("/logout", Logout);

export default authRouter;