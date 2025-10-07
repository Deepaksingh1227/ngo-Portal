import React, { useState, useEffect } from "react";
import API from "../services/Api";
import { isLoggedIn, getUserRole } from "../services/Auth";

function Results() {
  const [studentsResults, setStudentsResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in or not a student
    if (!isLoggedIn() || getUserRole() !== "student") {
      alert("Only logged-in students can view results.");
      window.location.href = "/login";
    } else {
      const fetchResults = async () => {
        try {
          const { data } = await API.get("/students/results");
          setStudentsResults(data || []);
        } catch (error) {
          console.error(error);
          alert("Error fetching results");
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading results...</p>;
  }

  if (!studentsResults.length || !studentsResults[0].results.length) {
    return <p className="text-center mt-5">No results uploaded yet.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Complete Report</h2>
      {studentsResults.map((student, idx) => (
        <div className="card p-3 mb-4" key={idx}>
          <h4>{student.studentName || "Student Name"}</h4>
          <p><strong>Email:</strong> {student.email}</p>
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {student.results.map((res, i) => (
                <tr key={i}>
                  <td>{res.exam || "N/A"}</td>
                  <td>{res.score || "N/A"}</td>
                  <td>{res.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Results;
