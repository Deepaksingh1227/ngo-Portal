import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} <span className="fw-bold text-warning">Sardar Kartar Singh Jhabbar Trust</span>. All rights reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item"><Link to="/about" className="text-light text-decoration-none hover-warning">About</Link></li>
          <li className="list-inline-item"><Link to="/donate" className="text-light text-decoration-none hover-warning">Donate</Link></li>
          <li className="list-inline-item"><Link to="/results" className="text-light text-decoration-none hover-warning">Results</Link></li>
          <li className="list-inline-item"><Link to="/contact" className="text-light text-decoration-none hover-warning">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
