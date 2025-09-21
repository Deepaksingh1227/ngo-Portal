import React, { useState, useEffect } from "react";
import API from "../services/Api";
import { isLoggedIn, getUserRole } from "../services/Auth";

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!isLoggedIn() || getUserRole() !== "student") {
      alert("Only logged-in students can view results.");
      window.location.href = "/login";
    } else {
      const fetchResults = async () => {
        try {
          const { data } = await API.get("/students/results");
          setResults(data);
        } catch {
          alert("Error fetching results");
        }
      };
      fetchResults();
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2>Published Results</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
