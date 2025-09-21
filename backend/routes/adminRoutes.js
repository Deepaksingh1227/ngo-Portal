import express from "express";
import { getStudents, updateStudent } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/students", protect, adminOnly, getStudents);
router.put("/students/:id", protect, adminOnly, updateStudent);

export default router;
