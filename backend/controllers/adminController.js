import Student from "../models/Student.js";
import Donation from "../models/Donation.js";
import ActiveStudent from "../models/ActiveStudent.js";
import xlsx from "xlsx";

// Get all students
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// Update student status
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

// ✅ Get all donors
export const getDonations = async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
};
// Delete donor by ID
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


// Bulk upload results from CSV/Excel
export const bulkUploadResults = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // data = array of rows like [{ mobile: "98765", exam: "2025", score: 80, status: "Pass" }, ...]

    const results = [];
    for (let row of data) {
      const { mobile, exam, score, status } = row;

      if (!mobile) continue;

      const student = await Student.findOne({ mobile });
      if (student) {
        student.result = { exam, score, status };
        await student.save();
        results.push({ mobile, updated: true });
      } else {
        results.push({ mobile, updated: false, error: "Student not found" });
      }
    }

    res.json({ message: "Bulk upload finished", results });
  } catch (error) {
    res.status(500).json({ message: "Bulk upload failed", error });
  }
};

// controllers/adminController.js


// Upload single active student
export const addActiveStudent = async (req, res) => {
  try {
    const { name, rollNumber, mobile, course, year } = req.body;
    const student = await ActiveStudent.create({ name, rollNumber, mobile, course, year });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding active student", error });
  }
};

// Bulk upload active students (CSV/Excel)
export const bulkUploadActiveStudents = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const students = await ActiveStudent.insertMany(data);
    res.json({ message: "Active students uploaded successfully", students });
  } catch (error) {
    res.status(500).json({ message: "Bulk upload failed", error });
  }
};

//Public route to fetch active students
export const getActiveStudents = async (req, res) => {
  try {
    const students = await ActiveStudent.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active students", error });
  }
};



// Delete active student by ID (Admin only)
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







