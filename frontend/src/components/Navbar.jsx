import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { isLoggedIn, getUserRole, getUser, logoutUser } from "../services/Auth";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { lang, toggleLanguage, t } = useLanguage();

  const handleLinkClick = () => setIsOpen(false);
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = "/";
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
  color: #ffffff !important; /* always white */
  transition: color 0.3s ease-in-out;
}
.nav-link:hover {
  color: #f1c40f !important; /* gold on hover */
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
.nav-link:hover::after {
  width: 100%;
}
  .logout-link {
  cursor: pointer;
  color: #ffffff !important;
}
.logout-link:hover {
  color: #f1c40f !important;
}

        .lang-toggle-btn {
          background: linear-gradient(135deg, #f1c40f, #e67e22);
          color: #000;
          font-weight: 700;
          border: none;
          border-radius: 20px;
          padding: 4px 14px;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }
        .lang-toggle-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(241, 196, 15, 0.4);
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
              {t("brandName")}
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
            <ul className="navbar-nav ms-auto text-center text-lg-start align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/" onClick={handleLinkClick}>
                  {t("home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about" onClick={handleLinkClick}>
                  {t("about")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/student-target" onClick={handleLinkClick}>
                  {t("students")}
                </Link>
              </li>

              {/* Student links */}
              {isLoggedIn() && (role === "student" || role === "admin") && (
                <>
                  {role === "student" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/apply" onClick={handleLinkClick}>
                        {t("apply")}
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" to="/results" onClick={handleLinkClick}>
                      {t("results")}
                    </Link>
                  </li>
                  {/* ✅ Active Students visible for students */}
                  {role === "student" && (
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/active-students"
                        onClick={handleLinkClick}
                      >
                        {t("activeStudents")}
                      </Link>
                    </li>
                  )}
                </>
              )}

              <li className="nav-item">
                <Link className="nav-link text-light" to="/donate" onClick={handleLinkClick}>
                  {t("donate")}
                </Link>
              </li>

              {isLoggedIn() && role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/admin" onClick={handleLinkClick}>
                    {t("dashboard")}
                  </Link>
                </li>
              )}

              {!isLoggedIn() ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/login" onClick={handleLinkClick}>
                      {t("login")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/register" onClick={handleLinkClick}>
                      {t("register")}
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="nav-link text-light logout-link"
                  >
                    {t("logout")} {user?.name ? `(${user.name})` : ""}
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link text-light" to="/contact" onClick={handleLinkClick}>
                  {t("contact")}
                </Link>
              </li>

              {/* Language Switcher Button */}
              <li className="nav-item ms-lg-2 my-2 my-lg-0">
                <button
                  className="lang-toggle-btn"
                  onClick={toggleLanguage}
                  title="Switch Language"
                >
                  🌐 {t("languageToggle")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
