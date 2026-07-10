import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- Theme UI Inline Styles ---
  const containerStyle = {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    maxWidth: '500px',
    margin: '80px auto',
    padding: '0 20px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '40px 36px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)',
  };

  const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '6px',
    textAlign: 'center',
    letterSpacing: '-0.5px',
  };

  const subtitleStyle = {
    fontSize: '0.9rem',
    color: '#718096',
    textAlign: 'center',
    marginBottom: '32px',
  };

  const formGroupStyle = {
    marginBottom: '20px',
    position: 'relative',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '8px',
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '12px 16px',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: hasError ? '1px solid #ef4444' : '1px solid #cbd5e1',
    backgroundColor: '#fff',
    color: '#2d3748',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  });

  const errorTextStyle = {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginTop: '5px',
    display: 'block',
  };

  const helperRowStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '6px',
  };

  const linkStyle = {
    fontSize: '0.85rem',
    color: '#2b6cb0',
    textDecoration: 'none',
    fontWeight: '500',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: isLoading ? '#64748b' : '#2b6cb0',
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    fontSize: '0.95rem',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    boxShadow: '0 4px 6px -1px rgba(43, 108, 176, 0.1)',
    transition: 'background-color 0.2s ease',
    marginTop: '10px',
  };

  const footerTextStyle = {
    fontSize: '0.9rem',
    color: '#718096',
    textAlign: 'center',
    marginTop: '24px',
  };

  const alertStyle = (type) => ({
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    marginBottom: '24px',
    lineHeight: '1.5',
    border: '1px solid',
    backgroundColor: type === 'success' ? '#f0fdf4' : '#fef2f2',
    color: type === 'success' ? '#166534' : '#991b1b',
    borderColor: type === 'success' ? '#bbf7d0' : '#fecaca',
  });

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
    
    // Custom clean validation check
    const errors = {};
    if (!formData.email) errors.email = "Please provide a valid email.";
    if (!formData.password) errors.password = "Please provide your password.";
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/users/login", formData);
      setMessage({ text: res.data.message, type: "success" });
      
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      
      if (res.data.user.role === "admin") {
  navigate("/admin");
} else if (res.data.user.role === "teacher") {
  navigate("/teacher");
} else if (res.data.user.role === "student") {
  navigate("/student");
}
      
      setFormData({ email: "", password: "" });
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
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header Block */}
        <div style={{ textCenter: 'center' }}>
          <h2 style={titleStyle}>Welcome Back</h2>
          <p style={subtitleStyle}>Please sign in to your authenticated profile</p>
        </div>

        {/* Dynamic Context Messages */}
        {message && (
          <div style={alertStyle(message.type === "success" ? "success" : "error")}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Form Entry */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@organization.com"
              style={inputStyle(!!validationErrors.email)}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {validationErrors.email && (
              <span style={errorTextStyle}>{validationErrors.email}</span>
            )}
          </div>

          {/* Password Form Entry */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter credentials"
              style={inputStyle(!!validationErrors.password)}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {validationErrors.password && (
              <span style={errorTextStyle}>{validationErrors.password}</span>
            )}
            
            <div style={helperRowStyle}>
              <a href="/forgot-password" style={linkStyle}>Forgot password?</a>
            </div>
          </div>

          {/* Access Trigger */}
          <button
            type="submit"
            style={buttonStyle}
            disabled={isLoading}
            onMouseOver={(e) => { if(!isLoading) e.target.style.backgroundColor = '#2c5282'; }}
            onMouseOut={(e) => { if(!isLoading) e.target.style.backgroundColor = '#2b6cb0'; }}
          >
            {isLoading ? 'Verifying Account...' : 'Sign In'}
          </button>
        </form>

        {/* Secondary Navigation Alternative */}
        <div style={footerTextStyle}>
          <p style={{ margin: 0 }}>
            Don't have an account? <a href="/register" style={linkStyle}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;