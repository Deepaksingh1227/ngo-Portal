import Donation from "../models/Donation.js";

export const createDonation = async (req, res) => {
  try {
    const { name, email, contact, address, gender, amount, message } = req.body;
    const donation = await Donation.create({ name, email, contact, address, gender, amount, message });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Donation failed", error });
  }
};
