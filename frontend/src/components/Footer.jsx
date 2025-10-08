import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()}{" "}
          <span className="fw-bold text-warning">
            Sardar Kartar Singh Jhabbar Trust
          </span>
          . All rights reserved.
        </p>

        <ul className="list-inline mb-0">
          <li className="list-inline-item mx-2">
            <Link
              to="/login"
              className="text-light text-decoration-none footer-link"
            >
              Login
            </Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link
              to="/active-students"
              className="text-light text-decoration-none footer-link"
            >
              Active Students
            </Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link
              to="/results"
              className="text-light text-decoration-none footer-link"
            >
              Results
            </Link>
          </li>
        </ul>
      </div>

      <style>{`
        .footer {
          width: 100%;
          position: relative;
          bottom: 0;
          background: linear-gradient(90deg, #1a1a1a, #2c3e50);
        }

        .footer-link:hover {
          color: #f1c40f !important;
          text-decoration: underline;
        }

        /* Ensure footer sticks to bottom on short pages */
        html, body {
          height: 100%;
        }
        body {
          display: flex;
          flex-direction: column;
        }
        #root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .footer {
          margin-top: auto;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
