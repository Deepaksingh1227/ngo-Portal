import Student from "../models/Student.js";
import Donation from "../models/Donation.js";
import ActiveStudent from "../models/ActiveStudent.js";
import Result from "../models/Result.js";
import xlsx from "xlsx";

// -------------------- Students --------------------
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    student.status = req.body.status || student.status;
    await student.save();
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

// -------------------- Donors --------------------
export const getDonations = async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
};

export const deleteDonation = async (req, res) => {
  try {
    const donor = await Donation.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    await donor.deleteOne();
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting donor", error });
  }
};

// -------------------- Bulk Upload Results --------------------
export const bulkUploadResults = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Read from memory buffer
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Expected: [{ name, mobile,exam, score, status }]
    const results = [];
    for (let row of data) {
      const { name, exam, score, status } = row;
      if (!mobile) continue;

      // Save directly into Result collection
      results.push({ name, mobile, exam, score, status });
    }

    await Result.insertMany(results);

    res.json({ message: "Bulk upload finished", count: results.length });
  } catch (error) {
    console.error("❌ Bulk upload error:", error);
    res.status(500).json({ message: "Bulk upload failed", error: error.message });
  }
};

// -------------------- Active Students --------------------
export const addActiveStudent = async (req, res) => {
  try {
    const { name, rollNumber, mobile, course, year } = req.body;
    const student = await ActiveStudent.create({
      name,
      rollNumber,
      mobile,
      course,
      year,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding active student", error });
  }
};

export const bulkUploadActiveStudents = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const students = await ActiveStudent.insertMany(data);
    res.json({ message: "Active students uploaded successfully", students });
  } catch (error) {
    res.status(500).json({ message: "Bulk upload failed", error: error.message });
  }
};

export const getActiveStudents = async (req, res) => {
  try {
    const students = await ActiveStudent.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active students", error });
  }
};

export const deleteActiveStudent = async (req, res) => {
  try {
    const student = await ActiveStudent.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Active student not found" });
    }
    await student.deleteOne();
    res.json({ message: "Active student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting active student", error });
  }
};
