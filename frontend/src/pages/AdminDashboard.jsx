import React, { useState, useEffect } from "react";
import API from "../services/Api";

function AdminDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await API.get("/admin/students");
        setStudents(data);
      } catch {
        alert("Error loading students");
      }
    };
    fetchStudents();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/students/${id}`, { status });
      setStudents(students.map(s => (s._id === id ? { ...s, status } : s)));
    } catch {
      alert("Error updating status");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.status}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => updateStatus(s._id, "Shortlisted")}>Shortlist</button>
                <button className="btn btn-success btn-sm" onClick={() => updateStatus(s._id, "Selected")}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
