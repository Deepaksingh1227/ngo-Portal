import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  contact: String,
  address: String,
  gender: String,
  amount: { type: Number, required: true },
  message: String
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);
