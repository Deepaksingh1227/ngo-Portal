import Student from "../models/Student.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

// Multer for file handling
const storage = multer.memoryStorage();
export const upload = multer({ storage });
export const getResults = async (req, res) => {
  try {
    const results = await Student.find({ /* filter as needed */ });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
};
export const applyStudent = async (req, res) => {
  try {
    const { name, email, education } = req.body;
    const files = req.files;

    // Upload each file to Cloudinary
    const uploads = {};
    for (const key in files) {
      const result = await cloudinary.uploader.upload_stream({
        folder: "students",
        resource_type: "auto",
      });
    }

    // Upload with Promise
    const uploadToCloudinary = (fileBuffer, filename) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "students", resource_type: "auto", public_id: filename },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const documents = {
      aadhaar: files.aadhaar
        ? await uploadToCloudinary(files.aadhaar[0].buffer, "aadhaar")
        : "",
      reportCards: files.reportCards
        ? await uploadToCloudinary(files.reportCards[0].buffer, "reportCards")
        : "",
      marksheet: files.marksheet
        ? await uploadToCloudinary(files.marksheet[0].buffer, "marksheet")
        : "",
      granthiProof: files.granthiProof
        ? await uploadToCloudinary(files.granthiProof[0].buffer, "granthiProof")
        : "",
      parentAadhaar: files.parentAadhaar
        ? await uploadToCloudinary(files.parentAadhaar[0].buffer, "parentAadhaar")
        : "",
      cv: files.cv
        ? await uploadToCloudinary(files.cv[0].buffer, "cv")
        : "",
    };

    const student = await Student.create({
      name,
      email,
      education,
      documents,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Application failed", error });
  }
};
