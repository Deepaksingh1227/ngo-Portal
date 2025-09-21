import express from "express";
import multer from "multer";
import { applyStudent, getResults } from "../controllers/studentController.js";

const router = express.Router();

// store uploaded files in "uploads/" folder with random names
const upload = multer({ dest: "uploads/" });

// route: POST /apply → accepts a single file with field name "file"
router.post("/apply", upload.single("file"), applyStudent);

// route: GET /results → fetch student results
router.get("/results", getResults);

export default router;
