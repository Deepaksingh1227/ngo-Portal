import express from "express";
import multer from "multer";
import { applyStudent, getResults } from "../controllers/studentController.js";

const router = express.Router();

// store uploaded files in "uploads/" folder with random names
const upload = multer({ dest: "uploads/" });


// Multiple file fields
router.post(
  "/apply",
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "reportCard", maxCount: 1 },
    { name: "marksheet", maxCount: 1 },
    { name: "granthiProof", maxCount: 1 },
    { name: "parentAadhaar", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  applyStudent
);

// route: GET /results → fetch student results
router.get("/results", getResults);

export default router;
