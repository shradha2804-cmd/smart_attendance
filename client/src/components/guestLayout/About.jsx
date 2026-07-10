import React from "react";

const About = () => {
  return (
    <>
      <style>
        {`
        /* About Section Styles */
        .about-section {
          padding: 80px 0;
          background: #ffffff;
          color: #2d3748;
        }

        .about-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Section Title */
        .section-title h2 {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1a202c;
          text-align: center;
        }

        .section-title .f-para {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 1.1rem;
          color: #4a5568;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 60px auto;
          line-height: 1.7;
        }

        /* --- New CSS System Status Panel Style --- */
        .status-panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02);
          font-family: "Inter", -apple-system, sans-serif;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 14px;
          margin-bottom: 20px;
        }

        .panel-title {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
        }

        .live-indicator {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: #0d9488;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #0d9488;
          border-radius: 50px;
          margin-right: 8px;
          box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7);
          animation: pulse 1.6s infinite;
        }

        /* Metric Grid Row */
        .metrics-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: #ffffff;
          border: 1px solid #edf2f7;
          border-radius: 8px;
          padding: 14px;
          text-align: center;
        }

        .metric-val {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a202c;
        }

        .metric-lbl {
          font-size: 0.75rem;
          color: #718096;
          margin-top: 4px;
        }

        /* Live Activity Log Mock */
        .log-container {
          background: #1e293b;
          border-radius: 8px;
          padding: 16px;
          font-family: monospace;
          font-size: 0.8rem;
          color: #cbd5e1;
        }

        .log-line {
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }
        
        .log-line:last-child {
          margin-bottom: 0;
        }

        .log-time { color: #38bdf8; }
        .log-status { color: #34d399; }

        /* About Text Details */
        .about-text {
          padding-left: 30px;
        }

        .about-text h3 {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #2b6cb0; 
        }

        .about-text p {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 24px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }

        .features-list li {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 15px;
          color: #4a5568;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
        }

        .features-list li::before {
          content: "✓";
          color: #0d9488; 
          font-weight: bold;
          margin-right: 12px;
          font-size: 16px;
        }

        .cta-wrapper {
          text-align: center;
          margin-top: 40px;
        }

        .cta-button {
          display: inline-block;
          padding: 14px 28px;
          background-color: #0d9488; 
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 6px;
          text-decoration: none;
          box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.2);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .cta-button:hover {
          background-color: #0f766e;
          transform: translateY(-1px);
          color: white;
        }

        /* Keyframe Animations */
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(13, 148, 136, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .section-title h2 { font-size: 28px; }
          .about-text { padding-left: 0; margin-top: 40px; }
          .metrics-row { grid-template-columns: 1fr; }
        }
        `}
      </style>

      <section className="about-section">
        <div className="container">
          {/* Main Title Setup */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Intelligent Workforce & Time Management</h2>
                <p className="f-para">
                  Streamlining administrative overhead through state-of-the-art authentication frameworks. We eliminate proxy check-ins, manual ledger errors, and missing timestamps.
                </p>
              </div>
            </div>
          </div>

          {/* New Grid Layout: Status Panel replacing Video */}
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="status-panel">
                <div className="panel-header">
                  <span className="panel-title">System Monitor</span>
                  <div className="live-indicator">
                    <div className="pulse-dot"></div> Live Stream
                  </div>
                </div>
                
                <div className="metrics-row">
                  <div className="metric-card">
                    <div className="metric-val">142</div>
                    <div className="metric-lbl">Active Today</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-val">0</div>
                    <div className="metric-lbl">Failures</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-val">99.8%</div>
                    <div className="metric-lbl">Uptime</div>
                  </div>
                </div>

                <div className="log-container">
                  <div className="log-line">
                    <span className="log-time">[12:44:12]</span>
                    <span>ID #8491 Face Verified</span>
                    <span className="log-status">SUCCESS</span>
                  </div>
                  <div className="log-line">
                    <span className="log-time">[12:45:01]</span>
                    <span>ID #2204 Geofence Match</span>
                    <span className="log-status">SUCCESS</span>
                  </div>
                  <div className="log-line">
                    <span className="log-time">[12:45:30]</span>
                    <span>ID #9311 RFID Synced</span>
                    <span className="log-status">SUCCESS</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="about-text">
                <h3>High-Precision Recognition Infrastructure</h3>
                <p>
                  Our system relies on cutting-edge verification technology to process check-ins dynamically in under a single second. Engineered to adapt flawlessly to variable lighting environments and high-traffic entrance points.
                </p>
                <ul className="features-list">
                  <li>Biometric & Facial Spoofing Prevention</li>
                  <li>Real-time automated payroll sync architecture</li>
                  <li>Instant cloud backups and localized offline recovery</li>
                  <li>Granular administrative configuration management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Clean Call To Action Block */}
          <div className="row">
            <div className="col-lg-12 cta-wrapper">
              <a href="/contact" className="cta-button">
                Request Deployment Documentation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;