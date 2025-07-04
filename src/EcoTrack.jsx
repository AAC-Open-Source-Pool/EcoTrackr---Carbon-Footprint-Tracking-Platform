import React, { useState } from 'react';
import './EcoTrack.css';
import { Link } from 'react-router-dom';

function EcoTrack() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="eco-track-body">
      <button className="hamburger" onClick={toggleSidebar}>☰</button>

      <div className="container">
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul>
            <li>Control center</li>
            <li>Impact center</li>
            <li>Rewards</li>
            <li>Community</li>
            <li>Settings</li>
          </ul>
          <div className="logo">🌱 ECOTRACK</div>
        </div>

        <div className={`main ${sidebarOpen ? 'shifted' : ''}`}>
          <h1>Knowledge Hub</h1>
          <p className="subtitle">Learn eco-tips and Knowledge</p>

          <div className="card-grid">
            <div className="card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 4v16h18V4H3zm16 14H5V6h14v12zM7 8h10v2H7V8zm0 4h6v2H7v-2z" />
              </svg>
              <p>Articles</p>
            </div>
            <div className="card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5 3v18h14V3H5zm12 16H7V5h10v14z" />
              </svg>
              <p>Infographics</p>
            </div>
            <div className="card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10 16.5l6-4.5-6-4.5v9zM4 3h16v18H4V3z" />
              </svg>
              <p>Short videos</p>
            </div>
            <div className="card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M11 17h2v2h-2v-2zm0-10h2v8h-2V7zm1-7C5.93 0 1 4.93 1 11s4.93 11 11 11 11-4.93 11-11S18.07 0 12 0z" />
              </svg>
              <p>Tips of the day</p>
            </div>
          </div>

          <div className="share-row">
            <p>Share your ideas</p>
            <button className="share-button">🔄</button>
          </div>

          {/* ✅ Navigation Link to Community Page */}
          <div style={{ marginTop: '20px' }}>
            <Link to="/community" className="nav-link">Go to Community</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcoTrack;
