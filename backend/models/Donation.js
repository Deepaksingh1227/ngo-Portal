import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  message: String
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);
