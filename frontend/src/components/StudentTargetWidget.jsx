import React from "react";
import { useLanguage } from "../context/LanguageContext";

function StudentTargetWidget({ yearlyTarget = 100, applied = 24, currentYear = 2026 }) {
  const { t } = useLanguage();
  const percentage = Math.min(Math.round((applied / yearlyTarget) * 100), 100);
  const remaining = Math.max(yearlyTarget - applied, 0);

  return (
    <div className="student-target-container my-4 text-white p-4 p-md-5 rounded-4 shadow-lg">
      <style>{`
        .student-target-container {
          background: linear-gradient(145deg, #0b132b, #1c2541);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .academic-badge {
          background: #007bff;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 6px 16px;
          border-radius: 50px;
          display: inline-block;
          letter-spacing: 0.5px;
        }

        .target-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #4895ef;
          letter-spacing: -0.5px;
        }

        .progress-bar-wrapper {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          height: 28px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #4cc9f0, #4361ee);
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          transition: width 1s ease-in-out;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px 16px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-top: 8px;
        }

        .stat-unit {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        .val-target { color: #3b82f6; }
        .val-enrolled { color: #10b981; }
        .val-remaining { color: #f59e0b; }
      `}</style>

      {/* Header Badge */}
      <div className="text-center mb-3">
        <span className="academic-badge shadow-sm">
          {t("academicYear")}
        </span>
      </div>

      {/* Title & Description */}
      <div className="text-center mb-4">
        <h2 className="target-title mb-2">{t("studentOnboardingTarget")}</h2>
        <p className="text-secondary opacity-75 mb-0 fs-6">
          {t("targetDescription")}
        </p>
      </div>

      {/* Progress Bar Section */}
      <div className="mb-4 px-md-3">
        <div className="d-flex justify-content-between align-items-center mb-2 font-monospace">
          <span className="text-uppercase text-secondary fw-semibold small" style={{ letterSpacing: '1px' }}>{t("overallProgress")}</span>
          <span className="fw-bold" style={{ color: '#38bdf8' }}>{percentage}% {t("achieved")}</span>
        </div>
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.max(percentage, 10)}%` }}
          >
            {applied} / {yearlyTarget}
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="row g-3 px-md-2 mt-2">
        <div className="col-12 col-md-4">
          <div className="stat-card text-center">
            <div className="stat-label">{t("yearlyTarget")}</div>
            <div className="stat-value val-target">{yearlyTarget}</div>
            <div className="stat-unit">{t("studentsCountLabel")}</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card text-center">
            <div className="stat-label">{t("enrolledTaken")}</div>
            <div className="stat-value val-enrolled">{applied}</div>
            <div className="stat-unit">{t("studentsCountLabel")}</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card text-center">
            <div className="stat-label">{t("remainingTarget")}</div>
            <div className="stat-value val-remaining">{remaining}</div>
            <div className="stat-unit">{t("studentsCountLabel")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentTargetWidget;
