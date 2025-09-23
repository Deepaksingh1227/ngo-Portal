import React, { useState, useEffect } from "react";
import API from "../services/Api";

function UploadActiveStudents() {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    mobile: "",
    course: "",
    year: "",
  });
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);

  // fetch active students
  const fetchActiveStudents = async () => {
    try {
      const { data } = await API.get("/admin/active-students");
      setStudents(data);
    } catch {
      alert("Error loading active students");
    }
  };

  useEffect(() => {
    fetchActiveStudents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/active-students", form);
      alert("Active student added");
      setForm({ name: "", rollNumber: "", mobile: "", course: "", year: "" });
      fetchActiveStudents();
    } catch {
      alert("Error adding active student");
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");
    const fd = new FormData();
    fd.append("file", file);
    try {
      await API.post("/admin/active-students/bulk", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Bulk upload successful");
      setFile(null);
      fetchActiveStudents();
    } catch {
      alert("Error uploading file");
    }
  };

  const deleteActiveStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await API.delete(`/admin/active-students/${id}`);
        fetchActiveStudents();
      } catch {
        alert("Error deleting student");
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="card p-3 mb-3">
        <h5>Add Single Active Student</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={form.rollNumber}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary w-100">
            Add Student
          </button>
        </form>
      </div>

      <div className="card p-3 mb-3">
        <h5>Bulk Upload Active Students</h5>
        <form onSubmit={handleBulkUpload}>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="form-control mb-2"
            onChange={handleFileChange}
          />
          <button type="submit" className="btn btn-success w-100">
            Upload File
          </button>
        </form>
        <p className="text-muted mt-2">
          File must contain: <b>name, rollNumber, mobile, course, year</b>
        </p>
      </div>

      <div className="mt-4">
        <h5>Active Students List</h5>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Mobile</th>
              <th>Course</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s._id}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.rollNumber}</td>
                <td>{s.mobile}</td>
                <td>{s.course}</td>
                <td>{s.year}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteActiveStudent(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UploadActiveStudents;
