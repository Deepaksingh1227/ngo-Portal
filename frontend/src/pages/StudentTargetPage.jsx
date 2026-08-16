import React, { useState, useEffect } from "react";
import StudentTargetWidget from "../components/StudentTargetWidget";
import API from "../services/Api";

function StudentTargetPage() {
  const [targetData, setTargetData] = useState({
    yearlyTarget: 100,
    applied: 24,
    currentYear: 2026,
  });

  useEffect(() => {
    // Optionally fetch dynamic count if active-students API exists
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/active-students");
        if (Array.isArray(data) && data.length > 0) {
          setTargetData((prev) => ({
            ...prev,
            applied: data.length,
          }));
        }
      } catch (e) {
        // Fallback default 24
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <StudentTargetWidget
        yearlyTarget={targetData.yearlyTarget}
        applied={targetData.applied}
        currentYear={targetData.currentYear}
      />
    </div>
  );
}

export default StudentTargetPage;
