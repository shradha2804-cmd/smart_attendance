import React from "react";

const Services = () => {
  return (
    <>
      <style>
        {`
        /* --- Refined System Services Panel --- */
        .services-section {
          padding: 80px 0;
          background-color: #f8fafc; /* Crisp, ultra-clean off-white background */
          font-family: "Inter", -apple-system, sans-serif;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Module Header Typography */
        .services-header {
          text-align: center;
          margin-bottom: 54px;
        }

        .services-header h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a; /* Deep Slate Blue text */
          margin: 0 0 12px 0;
          letter-spacing: -0.75px;
        }

        .services-header p {
          font-size: 1.05rem;
          color: #64748b;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Native Clean CSS Grid System (Replacing Bootstrap Row/Col) */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* System Feature Cards */
        .service-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -8px rgba(15, 23, 42, 0.08);
          border-color: #cbd5e1;
        }

        .service-icon {
          font-size: 2.25rem;
          margin-bottom: 20px;
          display: inline-block;
          line-height: 1;
        }

        .service-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }

        .service-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }

        /* --- Comprehensive Responsive Adjustments --- */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .services-section {
            padding: 60px 0;
          }
          
          .services-header h2 {
            font-size: 1.85rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .service-card {
            padding: 24px;
          }
        }
        `}
      </style>

      <section className="services-section">
        <div className="services-container">
          
          {/* Main Informational Header */}
          <div className="services-header">
            <h2>Core Infrastructure Modules</h2>
            <p>
              An integrated framework offering real-time streaming, identity validation, and automated log analysis for high-precision institutional operations.
            </p>
          </div>

          {/* Infrastructure Grid System */}
          <div className="services-grid">
            
            {/* Service Module 1 */}
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3>Automated Detection</h3>
              <p>
                Utilizes localized machine learning and pattern optimization pipelines to achieve rapid object extraction and feature isolation.
              </p>
            </div>

            {/* Service Module 2 */}
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Stream Analytics</h3>
              <p>
                Processes telemetry flows and real-time operational metrics with clean dashboard aggregations for comprehensive analysis.
              </p>
            </div>

            {/* Service Module 3 */}
            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>Access Control</h3>
              <p>
                Manages multi-tier credential authorization states and encryption protocols to secure critical organization network perimeters.
              </p>
            </div>

            {/* Service Module 4 */}
            <div className="service-card">
              <div className="service-icon">⚙️</div>
              <h3>System Integration</h3>
              <p>
                Integrates into existing database setups seamlessly via clean, highly-documented, custom internal REST configurations.
              </p>
            </div>

            {/* Service Module 5 */}
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Instant Validation</h3>
              <p>
                Provides sub-second credential processing times, completely removing wait intervals and minimizing operational delay bottlenecks.
              </p>
            </div>

            {/* Service Module 6 */}
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Reporting Engine</h3>
              <p>
                Compiles fully auditable operational logs, verification checks, and platform metrics into downloadable summaries.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Services;