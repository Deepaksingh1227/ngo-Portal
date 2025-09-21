import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";

dotenv.config();
connectDB();

 const app = express();
 app.use(cors());
 app.use(express.json());

 //routes
 app.use("/api/auth", authRoutes);
 app.use("api/student", studentRoutes);
 app.use("api/admin", adminRoutes);
 app.use("api/donation", donationRoutes);

 const PORT = process.env.PORT ||5000;

 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));