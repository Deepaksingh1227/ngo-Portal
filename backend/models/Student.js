import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    education: String,
    documents: {
      aadhaar: String,
      reportCards: String,
      marksheet: String,
      granthiProof: String,
      parentAadhaar: String,
      cv: String,
    },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
