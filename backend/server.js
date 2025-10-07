import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "https://sardarkartarsinghjhabbartrust.org", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
// ✅ Correct route paths
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donations", donationRoutes);

// 👇 simplified public API
app.use("/api", publicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
