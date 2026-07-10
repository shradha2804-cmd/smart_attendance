import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const GuestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>
        {`
        /* --- Clean Slate Navigation Styles --- */
        .system-navbar {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 16px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: "Inter", -apple-system, sans-serif;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Branding Panel */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-logo-img {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #e2e8f0;
        }

        .brand-text {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a202c;
          letter-spacing: -0.3px;
        }

        .brand-accent {
          color: #2b6cb0; /* Highlight Slate Blue */
        }

        /* Menu Navigation Links */
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-link-item {
          text-decoration: none;
          color: #4a5568;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .nav-link-item:hover {
          color: #2b6cb0;
          background-color: #f7fafc;
        }

        /* Active Route Indicator */
        .nav-link-item.active {
          color: #2b6cb0;
          background-color: #ebf8ff;
          font-weight: 600;
        }

        /* Custom Responsive Hamburger Toggle */
        .nav-toggle-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .toggle-bar {
          width: 22px;
          height: 2px;
          background-color: #4a5568;
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .nav-toggle-btn {
            display: flex;
          }

          .nav-menu {
            display: ${isMenuOpen ? "flex" : "none"};
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            padding: 16px 20px;
            box-sizing: border-box;
            gap: 12px;
            align-items: stretch;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          }

          .nav-link-item {
            padding: 10px 14px;
          }
        }
        `}
      </style>

      <nav className="system-navbar">
        <div className="nav-container">
          {/* Logo & Platform Name */}
          <NavLink to="/home" className="nav-brand">
            <img
              src="https://t4.ftcdn.net/jpg/06/58/52/67/240_F_658526752_reKZ5XIBNmCwlkeeAJS5lS1RMUxw6VWV.jpg"
              alt="System Logo"
              className="brand-logo-img"
            />
            <span className="brand-text">
              Smart<span className="brand-accent">Verification</span>
            </span>
          </NavLink>

          {/* Mobile Menu Action Trigger */}
          <button 
            className="nav-toggle-btn" 
            onClick={toggleMenu}
            aria-label="Toggle navigation configuration menu"
          >
            <div className="toggle-bar"></div>
            <div className="toggle-bar"></div>
            <div className="toggle-bar"></div>
          </button>

          {/* Action Link Grid */}
          <ul className="nav-menu">
            <li>
              <NavLink to="/home" className="nav-link-item">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link-item">About</NavLink>
            </li>
            <li>
              <NavLink to="/services" className="nav-link-item">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link-item">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-link-item">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav-link-item">Login</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default GuestNavbar;