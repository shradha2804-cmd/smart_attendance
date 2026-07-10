import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry received! Our systems integration team will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <style>
        {`
        /* Contact Section Styles */
        .contact-section {
          padding: 80px 0;
          background: #f8fafc;
          color: #2d3748;
        }

        .contact-section .container {
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

        .section-title p {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 1.1rem;
          color: #4a5568;
          text-align: center;
          max-width: 600px;
          margin: 0 auto 40px auto;
          line-height: 1.6;
        }

        /* Contact Form Layout */
        .contact-form {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #4a5568;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 0.95rem;
          color: #2d3748;
          background-color: #ffffff;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-control:focus {
          border-color: #2b6cb0;
          outline: none;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 130px;
        }

        /* Professional Action Button */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background-color: #2b6cb0; /* Slate Blue Theme */
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(43, 108, 176, 0.1);
          transition: background-color 0.2s ease;
        }

        .submit-btn:hover {
          background-color: #2c5282;
        }

        /* Contact Metadata Block */
        .contact-info {
          margin-top: 50px;
          border-top: 1px solid #e2e8f0;
          padding-top: 40px;
        }

        .contact-info h3 {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #1a202c;
          text-align: center;
        }

        .contact-details {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .contact-details li {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 0.95rem;
          color: #4a5568;
          display: flex;
          align-items: center;
        }

        .contact-details li .icon {
          margin-right: 10px;
          font-size: 1.2rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .contact-form {
            padding: 24px;
          }
          .contact-details {
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }
        }
        `}
      </style>

      <section className="contact-section">
        <div className="container">
          {/* Section Heading */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>System Support & Inquiries</h2>
                <p>
                  Need assistance with installation, custom hardware integrations, or scale deployments? Get in touch with our engineering team.
                </p>
              </div>
            </div>
          </div>

          {/* Form Container Wrapper */}
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Work Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="john@organization.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject Area</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    placeholder="e.g., Hardware deployment, API integrations"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message Details</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder="Provide details about your project architecture or issue..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Submit Support Ticket
                </button>
              </form>

              {/* Direct Channels */}
              <div className="contact-info">
                <h3>Direct Escalation Channels</h3>
                <ul className="contact-details">
                  <li>
                    <span className="icon">📧</span> systems@attendance-io.com
                  </li>
                  <li>
                    <span className="icon">📞</span> +1 (555) 872-2500
                  </li>
                  <li>
                    <span className="icon">📍</span> Tech Center Quad, Floor 4
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;