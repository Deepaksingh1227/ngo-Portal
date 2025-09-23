import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Sardar kartar Singh Jhabbar Trust. All rights reserved.
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link to="/about" className="text-white text-decoration-none">
              About
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/donate" className="text-white text-decoration-none">
              Donate
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/results" className="text-white text-decoration-none">
              Results
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/contact" className="text-white text-decoration-none">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
