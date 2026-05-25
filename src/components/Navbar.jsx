import { useState } from "react";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" className="brand">Beach Resort</Link>
          <button
            type="button"
            className="nav-btn"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/rooms" onClick={() => setIsOpen(false)}>Rooms</Link></li>
        </ul>
      </div>
    </nav>
  );
}
