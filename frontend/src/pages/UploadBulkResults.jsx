import React, { useState } from "react";
import API from "../services/Api";

function UploadBulkResults() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/admin/results/bulk", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Bulk results uploaded successfully");
      setFile(null);
    } catch {
      alert("Error uploading bulk results");
    }
  };

  return (
    <div className="card p-3 mt-4">
      <h5>Bulk Upload Student Results (CSV/Excel)</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          className="form-control mb-2"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary w-100">
          Upload
        </button>
      </form>
      <p className="mt-2 text-muted">
        File must contain columns: <b>mobile, exam, score, status</b>
      </p>
    </div>
  );
}

export default UploadBulkResults;
