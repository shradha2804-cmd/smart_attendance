import React from 'react';

const GuestFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>
        {`
        /* --- Refined Slate Footer Styles --- */
        .footer-section {
          background-color: #0f172a; /* Sophisticated Deep Slate Blue */
          color: #94a3b8;
          padding: 40px 0;
          font-family: "Inter", -apple-system, sans-serif;
          border-top: 1px solid #1e293b;
        }

        .footer-section .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        /* Platform Branding */
        .footer-logo {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        /* Unified Link Configurations */
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          gap: 24px;
        }

        .footer-links li a {
          color: #94a3b8;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links li a:hover {
          color: #38bdf8; /* Bright Interactive Azure Blue tint */
        }

        /* Copyright Typography */
        .copyright-text {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        .copyright-text a {
          color: #cbd5e1;
          text-decoration: none;
          font-weight: 500;
        }

        .copyright-text a:hover {
          color: #38bdf8;
        }

        /* Social Navigation Grid */
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 4px;
        }

        .social-icon {
          color: #64748b;
          font-size: 1.1rem;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .social-icon:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* Responsive Flow Adjustments */
        @media (max-width: 640px) {
          .footer-links {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .footer-content {
            gap: 24px;
          }
        }
        `}
      </style>

      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            {/* Core Framework Branding */}
            <div className="footer-logo">
              Smart Verification Infrastructure
            </div>

            {/* Quick Internal Reference Links */}
            <ul className="footer-links">
              <li><a href="/about">System Architecture</a></li>
              <li><a href="/security">Privacy Policy</a></li>
              <li><a href="/contact">Support Center</a></li>
            </ul>

            {/* Platform Direct Social Anchors */}
            <div className="social-icons">
              <a href="https://github.com" className="social-icon" aria-label="GitHub Repository" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-github"></i>
              </a>
              <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="https://twitter.com" className="social-icon" aria-label="Twitter Updates" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter"></i>
              </a>
            </div>

            {/* Formal Copyright Details */}
            <div className="copyright-text">
              <p>
                Copyright &copy; {currentYear} All rights reserved | Deployment Framework managed by{" "}
                <a href="/dashboard">Attendance Control Panel</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GuestFooter;