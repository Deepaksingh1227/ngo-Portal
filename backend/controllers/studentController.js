import Student from "../models/Student.js";

// Student applies
export const applyStudent = async (req, res) => {
  try {
    const { name, email, education } = req.body;
    const document = req.file?.filename || null;
    const student = await Student.create({ name, email, education, document });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Application failed", error });
  }
};

// Public results
export const getResults = async (req, res) => {
  const results = await Student.find({ status: "Selected" });
  res.json(results);
};
