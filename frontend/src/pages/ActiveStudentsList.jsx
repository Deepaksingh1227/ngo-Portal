import React, { useState, useEffect } from "react";
import API from "../services/Api";

function ActiveStudentsList() {
  const [students, setStudents] = useState([]);

  const fetchActiveStudents = async () => {
    try {
      const { data } = await API.get("/active-students"); // public route
      setStudents(data);
    } catch {
      alert("Error loading active students");
    }
  };

  useEffect(() => {
    fetchActiveStudents();
  }, []);

  return (
    <div className="mt-4">
      <h5>Active Students</h5>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>Year</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveStudentsList;
