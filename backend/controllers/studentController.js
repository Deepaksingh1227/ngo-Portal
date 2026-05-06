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



// GET: /students/results
export const getResults = async (req, res) => {
  try {
    const email = req.user?.email || req.query?.email; // From JWT for student

    // Fetch results for this student
    const results = await Result.find({ studentEmail: email });

    // Group by student (you can skip this if it's always 1 student)
    const groupedResults = {
      studentName: results[0]?.studentName || "N/A",
      email: email,
      results: results.map(r => ({
        exam: r.exam,
        score: r.score,
        status: r.status
      }))
    };

    res.status(200).json([groupedResults]); // return as array for frontend mapping
  } catch (error) {
    console.error("❌ Error fetching results:", error);
    res.status(500).json({
      message: "Error fetching student results",
      error: error.message,
    });
  }
};
