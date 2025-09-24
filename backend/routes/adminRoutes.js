import express from "express";
import multer from "multer";
import {
  getStudents,
  updateStudent,
  getDonations,
  deleteDonation,
  addActiveStudent,
  bulkUploadActiveStudents,
  getActiveStudents,
  deleteActiveStudent,
  bulkUploadResults,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Results
router.post("/results/bulk", protect, adminOnly, upload.single("file"), bulkUploadResults);

// Students
router.get("/students", protect, adminOnly, getStudents);
router.put("/students/:id", protect, adminOnly, updateStudent);

// Donors
router.get("/donations", protect, adminOnly, getDonations);
router.delete("/donations/:id", protect, adminOnly, deleteDonation);

// Active Students
router.post("/active-students", protect, adminOnly, addActiveStudent);
router.post("/active-students/bulk", protect, adminOnly, upload.single("file"), bulkUploadActiveStudents);
router.get("/active-students", getActiveStudents);
router.delete("/active-students/:id", protect, adminOnly, deleteActiveStudent);

export default router;
