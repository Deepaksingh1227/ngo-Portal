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
      <h5 className="mb-3 text-center">Active Students</h5>

      {/* ✅ Table with responsive wrapper */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle text-center active-students-table">
          <thead className="table-dark">
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Mobile</th>
              <th>class</th>
              <th>school</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s._id}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.fathername}</td>
                <td>{s.mobile}</td>
                <td>{s.class}</td>
                <td>{s.school}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Embedded CSS */}
      <style jsx="true">{`
        /* Desktop default table same rahega */
        .active-students-table {
          font-size: 14px;
        }

        /* ✅ Only Mobile Fix */
        @media (max-width: 768px) {
          .active-students-table {
            font-size: 12px;   /* chhota text */
            display: block;    /* responsive block */
            overflow-x: auto;  /* sideways scroll enable */
            white-space: nowrap; /* text ek line me */
          }
          .active-students-table thead {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default ActiveStudentsList;
