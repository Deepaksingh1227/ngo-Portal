import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  document: String, // file path
  status: { type: String, enum: ["Pending", "Shortlisted", "Selected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
