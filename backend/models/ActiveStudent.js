// models/ActiveStudent.js
import mongoose from "mongoose";

const activeStudentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  mobile: String,
  course: String,
  year: String,
}, { timestamps: true });

export default mongoose.model("ActiveStudent", activeStudentSchema);
