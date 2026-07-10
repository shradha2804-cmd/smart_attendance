import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://smart-attendance-62f6.onrender.com/api/users";

const ForgotPassword = () => {
  // --- Form State Variables ---
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- Theme UI Inline Styles ---
  const containerStyle = {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    maxWidth: '520px',
    margin: '60px auto',
    padding: '0 20px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '36px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)',
  };

  const titleStyle = {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px',
    textAlign: 'center',
    letterSpacing: '-0.5px',
  };

  const subtitleStyle = {
    fontSize: '0.9rem',
    color: '#718096',
    textAlign: 'center',
    marginBottom: '28px',
    lineHeight: '1.5',
  };

  const formGroupStyle = {
    marginBottom: '24px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    color: '#2d3748',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: loading ? '#64748b' : '#2b6cb0', // Matching Slate Blue
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    fontSize: '0.95rem',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: loading ? 'not-allowed' : 'pointer',
    boxShadow: '0 4px 6px -1px rgba(43, 108, 176, 0.1)',
    transition: 'background-color 0.2s ease',
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) return setError("Please enter your email address.");

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/forgot-password`, { email });
      setSuccess(res.data?.message || "Temporary password sent to your email.");
      setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to send temporary password. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h4 style={titleStyle}>Account Recovery</h4>
        <p style={subtitleStyle}>
          Enter your registered email address below to receive a temporary recovery password.
        </p>

        {success && <div style={alertStyle('success')}>{success}</div>}
        {error && <div style={alertStyle('error')}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@organization.com"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            style={buttonStyle} 
            disabled={loading}
            onMouseOver={(e) => { if(!loading) e.target.style.backgroundColor = '#2c5282'; }}
            onMouseOut={(e) => { if(!loading) e.target.style.backgroundColor = '#2b6cb0'; }}
          >
            {loading ? "Sending Recovery Email..." : "Send Temporary Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;