import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // --- Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    
    // Explicit Validation Tracking
    const errors = {};
    if (!formData.name.trim()) errors.name = "Please provide your name.";
    if (!formData.email.trim()) errors.email = "Please provide a valid email.";
    if (!formData.contact.trim()) errors.contact = "Please provide your contact number.";
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/users/register", formData);
      setMessage({ text: res.data.message, type: "success" });
      setFormData({ name: "", email: "", contact: "", password: "" });
      setValidationErrors({});
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong ❌",
        type: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
        /* --- Component Architecture --- */
        .register-page {
          font-family: "Inter", -apple-system, sans-serif;
          max-width: 500px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .register-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 40px 36px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02);
        }

        .register-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .register-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a; /* Deep Slate Blue */
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .register-header p {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
        }

        /* --- Forms & Entry Layouts --- */
        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          font-size: 0.95rem;
          border-radius: 6px;
          background-color: #fff;
          color: #1e293b;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }

        .input-normal {
          border: 1px solid #cbd5e1;
        }

        .input-normal:focus {
          outline: none;
          border-color: #64748b;
        }

        .input-error {
          border: 1px solid #ef4444;
        }

        .input-error:focus {
          outline: none;
          border-color: #ef4444;
        }

        /* Messaging and Context Blocks */
        .hint-text {
          display: block;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-top: 6px;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.8rem;
          margin-top: 6px;
          display: block;
        }

        .system-alert {
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          margin-bottom: 24px;
          line-height: 1.5;
          border: 1px solid;
        }

        .alert-success {
          background-color: #f0fdf4;
          color: #166534;
          border-color: #bbf7d0;
        }

        .alert-danger {
          background-color: #fef2f2;
          color: #991b1b;
          border-color: #fecaca;
        }

        /* Interactive Elements */
        .submit-btn {
          width: 100%;
          color: #ffffff;
          border: none;
          padding: 14px;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 6px;
          transition: background-color 0.2s ease;
          margin-top: 12px;
        }

        .btn-active {
          background-color: #334155; /* Slate Blue Theme Selection */
          cursor: pointer;
        }

        .btn-active:hover {
          background-color: #1e293b;
        }

        .btn-loading {
          background-color: #64748b;
          cursor: not-allowed;
        }

        .register-footer {
          font-size: 0.9rem;
          color: #64748b;
          text-align: center;
          margin-top: 24px;
        }

        .register-link {
          color: #475569;
          text-decoration: none;
          font-weight: 600;
        }

        .register-link:hover {
          text-decoration: underline;
        }
        `}
      </style>

      <div className="register-page">
        <div className="register-card">
          
          <div className="register-header">
            <h2>Create Account</h2>
            <p>Please fill in your details to register</p>
          </div>

          {/* Context Response Message Alert */}
          {message && (
            <div className={`system-alert alert-${message.type === "success" ? "success" : "danger"}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            
            {/* Full Name field */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={validationErrors.name ? "input-error" : "input-normal"}
                value={formData.name}
                onChange={handleChange}
                required
              />
              {validationErrors.name && (
                <span className="error-text">{validationErrors.name}</span>
              )}
            </div>

            {/* Email Address field */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={validationErrors.email ? "input-error" : "input-normal"}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {validationErrors.email && (
                <span className="error-text">{validationErrors.email}</span>
              )}
            </div>

            {/* Contact Number field */}
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="contact"
                placeholder="Enter your contact number"
                className={validationErrors.contact ? "input-error" : "input-normal"}
                value={formData.contact}
                onChange={handleChange}
                required
              />
              {validationErrors.contact && (
                <span className="error-text">{validationErrors.contact}</span>
              )}
            </div>

            {/* Password Entry field */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className={validationErrors.password ? "input-error" : "input-normal"}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {!validationErrors.password && (
                <span className="hint-text">Must be at least 6 characters long.</span>
              )}
              {validationErrors.password && (
                <span className="error-text">{validationErrors.password}</span>
              )}
            </div>

            {/* Form Execution Interaction Trigger */}
            <button
              type="submit"
              className={`submit-btn ${isLoading ? "btn-loading" : "btn-active"}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="register-footer">
            <p style={{ margin: 0 }}>
              Already have an account? <a href="/login" className="register-link">Sign in</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Register;