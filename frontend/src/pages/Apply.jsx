import React, { useState, useEffect } from "react";
import API from "../services/Api";
import { isLoggedIn, getUserRole } from "../services/Auth";

function Apply() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    file: null,
  });

  useEffect(() => {
    if (!isLoggedIn() || getUserRole() !== "student") {
      alert("Only logged-in students can apply.");
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("education", formData.education);
      data.append("file", formData.file);

      await API.post("/students/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application submitted successfully!");
    } catch {
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
        <input type="file" className="form-control mb-3" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Apply;
