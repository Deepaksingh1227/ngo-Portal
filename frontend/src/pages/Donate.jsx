import React, { useState } from "react";
import API from "../services/Api";

function Donate() {
  const [donor, setDonor] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    amount: "",
    message: ""
  });

  const handleChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/donations", donor);
      alert("Your details have been submitted! Our team will contact you soon.");
      setDonor({
        name: "",
        email: "",
        contact: "",
        address: "",
        gender: "",
        amount: "",
        message: ""
      });
    } catch {
      alert("Error submitting your details. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Donation Form</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">

        <input
          type="text"
          name="name"
          value={donor.name}
          placeholder="Full Name"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={donor.email}
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          value={donor.contact}
          placeholder="Contact Number"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          value={donor.address}
          placeholder="Full Address"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={donor.gender}
          className="form-control mb-3"
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="amount"
          value={donor.amount}
          placeholder="Donation Amount (INR)"
          className="form-control mb-1"
          onChange={handleChange}
          min="500"          // Minimum donation is 1000
          required
        />
        

        <textarea
          name="message"
          value={donor.message}
          placeholder="Message (Optional)"
          className="form-control mb-3"
          rows="3"
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="btn btn-success w-100">
          Submit Details
        </button>
      </form>
    </div>
  );
}

export default Donate;
