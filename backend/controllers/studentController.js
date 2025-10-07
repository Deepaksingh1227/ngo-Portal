import Student from "../models/Student.js";
import cloudinary from "../config/cloudinary.js";
import Result from "../models/Result.js";
import multer from "multer";

// ✅ Multer memory storage (so we can stream to Cloudinary)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// 🔹 Helper to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "students", resource_type: "auto", public_id: filename },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

// 🔹 Apply as student (with file uploads)
export const applyStudent = async (req, res) => {
  try {
    const { name, email, education } = req.body;
    const files = req.files || {};

    console.log("📩 Body:", req.body);
    console.log("📂 Files received:", Object.keys(files));

    const documents = {};

    if (files.aadhaar) {
      documents.aadhaar = await uploadToCloudinary(
        files.aadhaar[0].buffer,
        "aadhaar"
      );
    }
    if (files.reportCard) {
      documents.reportCard = await uploadToCloudinary(
        files.reportCard[0].buffer,
        "reportCard"
      );
    }
    if (files.marksheet) {
      documents.marksheet = await uploadToCloudinary(
        files.marksheet[0].buffer,
        "marksheet"
      );
    }
    if (files.granthiProof) {
      documents.granthiProof = await uploadToCloudinary(
        files.granthiProof[0].buffer,
        "granthiProof"
      );
    }
    if (files.parentAadhaar) {
      documents.parentAadhaar = await uploadToCloudinary(
        files.parentAadhaar[0].buffer,
        "parentAadhaar"
      );
    }
    if (files.cv) {
      documents.cv = await uploadToCloudinary(files.cv[0].buffer, "cv");
    }

    const student = await Student.create({
      name,
      email,
      education,
      documents,
    });

    res.status(201).json({ message: "✅ Application submitted", student });
  } catch (error) {
    console.error("❌ applyStudent failed:", error);
    res
      .status(500)
      .json({ message: "Application failed", error: error.message });
  }
};

// 🔹 Get results for logged-in student
export const getResults = async (req, res) => {
  try {
    const email = req.user?.email || req.query?.email; // depends on JWT
    const results = await Result.find({ studentEmail: email });
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching results", error: error.message });
  }
};
