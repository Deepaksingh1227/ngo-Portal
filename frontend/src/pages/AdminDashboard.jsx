import React, { useState, useEffect } from "react";
import API from "../services/Api";
import UploadBulkResults from "./UploadBulkResults";
import UploadActiveStudents from "./UploadActiveStudents";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [view, setView] = useState("students");

  // Fetch students
  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/admin/students");
      setStudents(data);
    } catch {
      alert("Error loading students");
    }
  };

  // Fetch donors
  const fetchDonations = async () => {
    try {
      const { data } = await API.get("/admin/donations");
      setDonations(data);
    } catch {
      alert("Error loading donors");
    }
  };

  useEffect(() => {
    if (view === "students") fetchStudents();
    if (view === "donations") fetchDonations();
  }, [view]);

  // Update student status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/students/${id}`, { status });
      fetchStudents();
    } catch {
      alert("Error updating status");
    }
  };

  // Delete donor
  const deleteDonor = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await API.delete(`/admin/donations/${id}`);
        fetchDonations();
      } catch {
        alert("Error deleting donor");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Toggle */}
      <div className="mb-4">
        <button
          className={`btn ${view === "donations" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setView("donations")}
        >
          Manage Donors
        </button>
      </div>
      <div className="mb-4">
        <button
          className={`btn me-2 ${view === "students" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setView("students")}
        >
          Manage Students
        </button>
        <button
          className={`btn ${view === "active" ? "btn-info" : "btn-outline-info"}`}
          onClick={() => setView("active")}
        >
          Active Students
        </button>
      </div>

      {/* Active Students Management */}
      {view === "active" && <UploadActiveStudents />}

      {/* Student Management */}
      {view === "students" && (
        <>
          {/* Upload Bulk Results */}
          <UploadBulkResults />

          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Education</th>
                <th>Status</th>
                <th>Documents</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.education}</td>
                  <td>{s.status}</td>

                  {/* ✅ Updated: Only ONE Report Card */}
                  <td>
                    {s.documents?.aadhaar && (
                      <a href={s.documents.aadhaar} target="_blank" rel="noopener noreferrer">
                        Aadhaar
                      </a>
                    )}{" | "}
                    {s.documents?.reportCard && (
                      <a href={s.documents.reportCard} target="_blank" rel="noopener noreferrer">
                        Report Card
                      </a>
                    )}{" | "}
                    {s.documents?.marksheet && (
                      <a href={s.documents.marksheet} target="_blank" rel="noopener noreferrer">
                        Marksheet
                      </a>
                    )}{" | "}
                    {s.documents?.granthiProof && (
                      <a href={s.documents.granthiProof} target="_blank" rel="noopener noreferrer">
                        Granthi Proof
                      </a>
                    )}{" | "}
                    {s.documents?.parentAadhaar && (
                      <a href={s.documents.parentAadhaar} target="_blank" rel="noopener noreferrer">
                        Parent Aadhaar
                      </a>
                    )}{" | "}
                    {s.documents?.cv && (
                      <a href={s.documents.cv} target="_blank" rel="noopener noreferrer">
                        CV
                      </a>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => updateStatus(s._id, "Shortlisted")}
                    >
                      Shortlist
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateStatus(s._id, "Selected")}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Donor Management */}
      {view === "donations" && (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Amount</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d, i) => (
              <tr key={d._id}>
                <td>{i + 1}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.contact}</td>
                <td>{d.address}</td>
                <td>{d.gender}</td>
                <td>₹{d.amount}</td>
                <td>{d.message || "—"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteDonor(d._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
