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
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm ">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-5" to="/" onClick={handleLinkClick}>
          <img
            src="logo.jpeg"
            alt="Logo"
            width="45"
            height="45"
            className="rounded-circle border border-warning me-2 p-1 bg-white" />
          <span className="text-light">Sardar Kartar Singh Jhabbar Trust</span>
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

        {/* Collapsible Menu */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {/* Always visible */}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleLinkClick}>
                About
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
              </>
            )}

            {/* Donator links */}
            {isLoggedIn() && role === "donator" && (
              <li className="nav-item">
                <Link className="nav-link" to="/donate" onClick={handleLinkClick}>
                  Donate
                </Link>
              </li>
            )}

            {/* Admin links */}
            {isLoggedIn() && role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={handleLinkClick}>
                  Dashboard
                </Link>
              </li>
            )}

            {/* Auth links */}
            {!isLoggedIn() ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLinkClick}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={handleLinkClick}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout {user?.name ? `(${user.name})` : ""}
                </button>
              </li>
            )}

            {/* Always visible */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
