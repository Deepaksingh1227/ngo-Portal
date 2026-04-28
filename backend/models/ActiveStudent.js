// models/ActiveStudent.js
import mongoose from "mongoose";

const activeStudentSchema = new mongoose.Schema({
  name: String,
  fathername: String,
  mobile: String,
  class: String,
  school: String,
}, { timestamps: true });

export default mongoose.model("ActiveStudent", activeStudentSchema);
