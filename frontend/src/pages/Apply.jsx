import React, { useState, useEffect } from "react";
import API from "../services/Api";
import { isLoggedIn, getUserRole } from "../services/Auth";

function Apply() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    aadhaar: null,
    reportCard: null,
    marksheet: null,
    granthiProof: null,
    parentAadhaar: null,
    cv: null,
  });

  useEffect(() => {
    if (!isLoggedIn() || getUserRole() !== "student") {
      alert("Only logged-in students can apply.");
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const res = await API.post("/students/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ " + res.data.message);
    } catch (err) {
      console.error("❌ Upload error:", err.response?.data || err.message);
      alert("Error submitting application");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Student Application Form</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <input type="text" name="name" placeholder="Full Name" className="form-control mb-3" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control mb-3" onChange={handleChange} required />
        <textarea name="education" placeholder="Educational Background" className="form-control mb-3" rows="3" onChange={handleChange}></textarea>

        <label>Aadhaar Card</label>
        <input type="file" name="aadhaar" className="form-control mb-3" onChange={handleChange} required />


        <label>Report Card</label>

        <label>Report Card (Last 3 years)</label>

        <input type="file" name="reportCard" className="form-control mb-3" onChange={handleChange} required />

        <label>10th/12th Marksheet</label>
        <input type="file" name="marksheet" className="form-control mb-3" onChange={handleChange} required />

        <label>Proof Parent is Granthi</label>
        <input type="file" name="granthiProof" className="form-control mb-3" onChange={handleChange} required />

        <label>Parent Aadhaar</label>
        <input type="file" name="parentAadhaar" className="form-control mb-3" onChange={handleChange} required />

        <label>CV</label>
        <input type="file" name="cv" className="form-control mb-3" onChange={handleChange} required />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Apply;
