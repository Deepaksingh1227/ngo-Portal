import Student from "../models/Student.js";

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
