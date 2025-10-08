import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { isLoggedIn, getUserRole, getUser, logoutUser } from "../services/Auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => setIsOpen(false);
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const role = getUserRole();
  const user = getUser();

  return (
    <>
      <style>{`
        .navbar {
          background: linear-gradient(90deg, #1a1a1a, #2c3e50);
        }
        .brand-text {
          white-space: normal !important;
          line-height: 1.2;
        }
        .navbar-brand span {
          font-family: "Poppins", sans-serif;
          letter-spacing: 0.5px;
        }
        .nav-link {
          position: relative;
          font-weight: 500;
          transition: color 0.3s ease-in-out;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: #f1c40f;
          transition: width 0.3s ease-in-out;
        }
        .nav-link:hover {
          color: #f1c40f !important;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        /* ✅ Mobile tweaks */
        @media (max-width: 768px) {
          .brand-text {
            font-size: 14px;
            max-width: 200px;
          }
          .navbar-brand img {
            width: 38px;
            height: 38px;
          }
        }
        @media (max-width: 576px) {
          .brand-text {
            font-size: 12px;
            max-width: 150px;
          }
          .navbar-brand img {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>

      {/* ✅ container-fluid makes background full width */}
      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container-fluid px-3">
          {/* Brand */}
          <Link
            className="navbar-brand d-flex align-items-center fw-bold fs-6 text-wrap"
            to="/"
            onClick={handleLinkClick}
          >
            <img
              src="logo.jpeg"
              alt="Logo"
              width="45"
              height="45"
              className="rounded-circle border border-warning me-2 p-1 bg-white"
            />
            <span className="brand-text text-light">
              Sardar Kartar Singh Jhabbar Trust
            </span>
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto text-center text-lg-start">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about" onClick={handleLinkClick}>
                  About
                </Link>
              </li>

            {/*Activ student*/}
             <li className="nav-item">
              <Link className="nav-link" to="/active-students" onClick={handleLinkClick}>
                Active Students
              </Link>
            </li>

            {/* Student links */}
            {isLoggedIn() && role === "student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/apply" onClick={handleLinkClick}>
                    Apply
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/results" onClick={handleLinkClick}>
                    Results
                  </Link>
                </li>
                {/* ✅ Active Students visible for students */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/active-students"
                    onClick={handleLinkClick}
                  >
                    Active Students
                  </Link>
                </li>
              </>
            )}

            {/* Donator links */}
            {isLoggedIn() && role === "donator" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/active-students"
                    onClick={handleLinkClick}
                  >
                    Active Students
                  </Link>
                </li>
              </>
            )}

              <li className="nav-item">
                <Link className="nav-link text-light" to="/donate" onClick={handleLinkClick}>
                  Donate
                </Link>
              </li>

              {isLoggedIn() && role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/admin" onClick={handleLinkClick}>
                    Dashboard
                  </Link>
                </li>
              )}

              {!isLoggedIn() ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/login" onClick={handleLinkClick}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/register" onClick={handleLinkClick}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-warning"
                    onClick={handleLogout}
                  >
                    Logout {user?.name ? `(${user.name})` : ""}
                  </button>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link text-light" to="/contact" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
