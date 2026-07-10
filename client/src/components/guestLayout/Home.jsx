import React from 'react';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const Home = () => {
  // --- Modern, Light & Professional Styles ---
  const pageContainerStyle = {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    backgroundColor: '#ffffff',
    color: '#2d3748',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
  };

  const heroSectionStyle = {
    background: 'linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)',
    borderBottom: '1px solid #e2e8f0',
    padding: '100px 20px',
    textAlign: 'center',
  };

  const badgeStyle = {
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#0d9488', // Professional Teal
    backgroundColor: '#ccfbf1', // Ultra-light teal background
    padding: '6px 16px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '3.2rem', // Increased font size
    fontWeight: '800',
    color: '#1a202c',
    marginBottom: '20px',
    letterSpacing: '-1px',
    lineHeight: '1.2',
  };

  const textAccentStyle = {
    color: '#2b6cb0', // Sophisticated Slate Blue accent
  };

  const descriptionStyle = {
    fontSize: '1.25rem', // Slightly larger description text
    color: '#4a5568',
    maxWidth: '650px',
    margin: '0 auto 36px auto',
    lineHeight: '1.7',
  };

  const primaryButtonStyle = {
    backgroundColor: '#2b6cb0', // Rich slate blue
    color: '#ffffff',
    border: 'none',
    padding: '14px 32px',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(43, 108, 176, 0.2)',
    transition: 'all 0.2s ease',
  };

  const contentWrapperStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
  };

  return (
    <div style={pageContainerStyle}>
      {/* Refined Hero Section */}
      <section style={heroSectionStyle}>
        <span style={badgeStyle}>Next-Gen Tracking</span>
        <h1 style={headingStyle}>
          Smart Attendance, <span style={textAccentStyle}>Simplified.</span>
        </h1>
        <p style={descriptionStyle}>
          An automated, highly accurate platform designed for seamless real-time check-ins, intelligent logging, and instant analytics.
        </p>
        <button 
          style={primaryButtonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#2c5282';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#2b6cb0';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Open System Dashboard
        </button>
      </section>

      {/* Embedded Application Sections */}
      <main style={contentWrapperStyle}>
        <About />
        <Services />
        <Contact />
      </main>
    </div>
  );
};

export default Home;