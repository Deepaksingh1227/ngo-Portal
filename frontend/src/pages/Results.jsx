import React, { useState, useEffect } from "react";
import API from "../services/Api";
import { isLoggedIn, getUserRole } from "../services/Auth";

function Results() {
  const [results, setResults] = useState([]);
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
          setResults(data || []);
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

  if (!results.length) {
    return <p className="text-center mt-5">No result uploaded yet.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Exam Results</h2>
      {results.map((result, index) => (
        <div className="card p-3 mb-3" key={index}>
          <p><strong>Exam:</strong> {result.exam || "N/A"}</p>
          <p><strong>Score:</strong> {result.score || "N/A"}</p>
          <p><strong>Status:</strong> {result.status || "N/A"}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;
