// models/Result.js
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    name: String, 
    exam: String,
    score: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
