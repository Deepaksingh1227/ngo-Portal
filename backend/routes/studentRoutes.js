import express from "express";
import { applyStudent, getResults, upload } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/apply",
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "reportCard", maxCount: 1 },
    { name: "granthiProof", maxCount: 1 },
    { name: "parentAadhaar", maxCount: 1 },

  ]),
  applyStudent
);

router.get("/results", protect, getResults);

export default router;
