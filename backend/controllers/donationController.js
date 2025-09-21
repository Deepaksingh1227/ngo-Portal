import Donation from "../models/Donation.js";

export const createDonation = async (req, res) => {
  try {
    const { name, amount, message } = req.body;
    const donation = await Donation.create({ name, amount, message });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Donation failed", error });
  }
};
