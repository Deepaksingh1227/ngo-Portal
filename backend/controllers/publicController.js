import ActiveStudent from "../models/ActiveStudent.js";

export const getActiveStudents = async (req, res) => {
  try {
    const students = await ActiveStudent.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active students", error });
  }
};
