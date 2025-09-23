import express from "express";
import { getStudents, updateStudent, getDonations, deleteDonation,addActiveStudent, bulkUploadActiveStudents, getActiveStudents } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import multer from "multer";
import { bulkUploadResults } from "../controllers/adminController.js";
import { deleteActiveStudent } from "../controllers/adminController.js";



const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/results/bulk", protect, adminOnly, upload.single("file"), bulkUploadResults);

router.get("/students", protect, adminOnly, getStudents);
router.put("/students/:id", protect, adminOnly, updateStudent);

// Donors
router.get("/donations", protect, adminOnly, getDonations);
router.delete("/donations/:id", protect, adminOnly, deleteDonation); // ✅ NEW

// Admin-only
router.post("/active-students", protect, adminOnly, addActiveStudent);
router.post("/active-students/bulk", protect, adminOnly, upload.single("file"), bulkUploadActiveStudents);

// Public
router.get("/active-students", getActiveStudents);
// Delete by ID
router.delete("/active-students/:id", deleteActiveStudent);

export default router;
