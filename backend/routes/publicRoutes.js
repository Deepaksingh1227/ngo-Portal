import express from "express";
import { getActiveStudents } from "../controllers/publicController.js";

const router = express.Router();

// GET /api/active-students
router.get("/active-students", getActiveStudents);

export default router;
