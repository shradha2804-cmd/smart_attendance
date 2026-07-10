import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/users";

const ChangePassword = () => {
  // --- Form State Variables ---
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- Theme UI Inline Styles ---
  const containerStyle = {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    maxWidth: '600px',
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
  };

  const formGroupStyle = {
    marginBottom: '20px',
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

  const rowStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  };

  const colStyle = {
    flex: '1',
    minWidth: '240px',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: loading ? '#64748b' : '#2b6cb0', // Sophisticated Slate Blue
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    fontSize: '0.95rem',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: loading ? 'not-allowed' : 'pointer',
    boxShadow: '0 4px 6px -1px rgba(43, 108, 176, 0.1)',
    transition: 'background-color 0.2s ease',
    marginTop: '10px',
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { currentPassword, newPassword, confirmPassword } = formData;

    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const email = parsedUser?.email;

    if (!email) {
      return setError("Could not determine your email. Please sign in and try again.");
    }
    if (!currentPassword || !newPassword) {
      return setError("Please fill all required fields.");
    }
    if (newPassword.length < 6) {
      return setError("New password should be at least 6 characters.");
    }
    if (newPassword !== confirmPassword) {
      return setError("New password and confirmation do not match.");
    }

    setLoading(true);
    try {
      const payload = { email, currentPassword, newPassword };
      const res = await axios.post(`${API_BASE}/change-password`, payload);
      setSuccess(res.data?.message || "Password changed successfully.");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to change password. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h4 style={titleStyle}>Security Configuration</h4>
        <p style={subtitleStyle}>Update your account authentication credentials below.</p>

        {success && <div style={alertStyle('success')}>{success}</div>}
        {error && <div style={alertStyle('error')}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Current Password</label>
            <input
              name="currentPassword"
              type="password"
              placeholder="Enter current password"
              style={inputStyle}
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div style={rowStyle}>
            <div style={colStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>New Password</label>
                <input
                  name="newPassword"
                  type="password"
                  placeholder="Min. 6 characters"
                  style={inputStyle}
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div style={colStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Confirm New Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat new password"
                  style={inputStyle}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            style={buttonStyle} 
            disabled={loading}
            onMouseOver={(e) => { if(!loading) e.target.style.backgroundColor = '#2c5282'; }}
            onMouseOut={(e) => { if(!loading) e.target.style.backgroundColor = '#2b6cb0'; }}
          >
            {loading ? "Updating Credentials..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;